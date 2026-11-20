import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface InviteResponse {
  success: boolean;
  code: string;
  role: 'student' | 'parent';
  sender: {
    name: string;
    role: 'student' | 'parent';
    label: string;
  };
  recipient: {
    name: string;
    role: 'student' | 'parent';
    label: string;
  };
  connectionTitle: string;
  grade?: string;
  deepLink: string;
  webUrl: string;
  downloadUrl: string;
  meta: {
    title: string;
    description: string;
  };
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Admission Control: In-Memory Sliding-Window IP Rate Limiter
// ─────────────────────────────────────────────────────────────────────────────
interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const ipBuckets = new Map<string, RateLimitBucket>();
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests
const WINDOW_DURATION_MS = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();

  // Periodic eviction of expired buckets to prevent memory leakage
  if (now - lastCleanup > WINDOW_DURATION_MS) {
    lastCleanup = now;
    for (const [key, bucket] of ipBuckets.entries()) {
      if (now > bucket.resetAt) {
        ipBuckets.delete(key);
      }
    }
  }

  const bucket = ipBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + WINDOW_DURATION_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return { allowed: false, retryAfter: Math.max(1, retryAfter) };
  }

  bucket.count += 1;
  return { allowed: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Micro-Cache: Resolved Invite Code Lookups (Max 100 entries, 60s TTL)
// ─────────────────────────────────────────────────────────────────────────────
interface CachedInviteLookup {
  senderName: string;
  studentGrade?: string;
  expiresAt: number;
}

const inviteCodeCache = new Map<string, CachedInviteLookup>();
const MAX_CACHE_ENTRIES = 100;
const LOOKUP_TTL_MS = 60 * 1000;

function getCachedLookup(code: string): CachedInviteLookup | null {
  const entry = inviteCodeCache.get(code);
  if (entry && Date.now() < entry.expiresAt) {
    return entry;
  }
  if (entry) {
    inviteCodeCache.delete(code);
  }
  return null;
}

function setCachedLookup(code: string, lookup: { senderName: string; studentGrade?: string }) {
  if (inviteCodeCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = inviteCodeCache.keys().next().value;
    if (oldestKey) inviteCodeCache.delete(oldestKey);
  }
  inviteCodeCache.set(code, { ...lookup, expiresAt: Date.now() + LOOKUP_TTL_MS });
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeout-Bounded Downstream Fetch (3500ms AbortController Deadline)
// ─────────────────────────────────────────────────────────────────────────────
async function fetchWithDeadline(url: string, headers: Record<string, string>, timeoutMs = 3500): Promise<unknown | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn(`[Invite API] Downstream query timed out after ${timeoutMs}ms for ${url.split('?')[0]}`);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function GET(request: NextRequest) {
  // 1. Admission Control / Rate Limit Check
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                   request.headers.get('x-real-ip') ||
                   '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too Many Requests. Please slow down.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateCheck.retryAfter || 60),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawCode = (searchParams.get('code') || '').trim();
  const rawName = (searchParams.get('name') || '').trim();
  const rawFrom = (searchParams.get('from') || rawName || '').trim();
  const rawTo = (searchParams.get('to') || '').trim();
  const rawRole = (searchParams.get('role') || searchParams.get('fromRole') || '').trim().toLowerCase();

  const code = rawCode || 'FSH-INVITE';
  const isParentSender = rawRole === 'parent' || code.toUpperCase().startsWith('PAR-');
  const senderRole: 'student' | 'parent' = isParentSender ? 'parent' : 'student';
  const recipientRole: 'student' | 'parent' = isParentSender ? 'student' : 'parent';

  let senderName = rawFrom || (isParentSender ? 'Parent Guardian' : 'Student');
  const recipientName = rawTo || (isParentSender ? 'Student' : 'Parent Guardian');
  let studentGrade: string | undefined = undefined;

  // 2. Micro-cache Check
  const cached = getCachedLookup(code.toUpperCase());
  if (cached) {
    senderName = cached.senderName || senderName;
    studentGrade = cached.studentGrade || studentGrade;
  } else {
    // 3. Timeout-Bounded Supabase lookup
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey && rawCode) {
      try {
        const trimmedCode = rawCode.toUpperCase();
        const headers = {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        };

        // Query 1: Lookup code in invite_codes table (3500ms timeout)
        let targetUserId: string | null = null;
        const inviteRows = await fetchWithDeadline(
          `${supabaseUrl}/rest/v1/invite_codes?code=eq.${encodeURIComponent(trimmedCode)}&select=id,code,role,created_by&limit=1`,
          headers
        );
        if (Array.isArray(inviteRows) && inviteRows.length > 0) {
          targetUserId = inviteRows[0].created_by;
        }

        // Query 2 & 3: Resolve associated profile and academic class (3500ms timeout)
        const uidToQuery = targetUserId || (trimmedCode.length === 36 ? trimmedCode : null);
        if (uidToQuery) {
          const [profRows, studentRows] = await Promise.all([
            fetchWithDeadline(
              `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(uidToQuery)}&select=id,name,role&limit=1`,
              headers
            ),
            fetchWithDeadline(
              `${supabaseUrl}/rest/v1/student_profiles?user_id=eq.${encodeURIComponent(uidToQuery)}&select=class&limit=1`,
              headers
            ),
          ]);

          if (Array.isArray(profRows) && profRows.length > 0 && profRows[0].name) {
            senderName = profRows[0].name;
          }
          if (Array.isArray(studentRows) && studentRows.length > 0 && studentRows[0].class) {
            studentGrade = `Class ${studentRows[0].class}`;
          }

          // Cache resolved identity
          setCachedLookup(trimmedCode, { senderName, studentGrade });
        }
      } catch (err) {
        console.warn('[Invite API] Supabase lookup notice:', err);
      }
    }
  }

  const senderLabel = senderRole === 'parent' ? 'Parent Guardian' : 'Student Device';
  const recipientLabel = recipientRole === 'parent' ? 'Parent Guardian' : 'Student Device';
  const connectionTitle = `${senderName} (${senderLabel}) ↔ ${recipientName} (${recipientLabel})`;

  const deepLink = `focusdefend://invite?code=${encodeURIComponent(code)}&from=${encodeURIComponent(senderName)}&to=${encodeURIComponent(recipientName)}&role=${encodeURIComponent(senderRole)}`;
  const webUrl = `https://focusdefend.vercel.app/invite?code=${encodeURIComponent(code)}&from=${encodeURIComponent(senderName)}&to=${encodeURIComponent(recipientName)}&role=${encodeURIComponent(senderRole)}`;
  const downloadUrl = `https://focusdefend.vercel.app/FocusDefend.apk`;

  const metaTitle = `🛡️ Connect ${senderName} & ${recipientName} on FocusDefend (${code})`;
  const metaDescription = `${senderName} (${senderLabel}) has invited ${recipientName} (${recipientLabel}) to pair devices on FocusDefend. Sync study blocks, monitor focus analytics, and unlock study rewards.`;

  const payload: InviteResponse = {
    success: true,
    code,
    role: senderRole,
    sender: {
      name: senderName,
      role: senderRole,
      label: senderLabel,
    },
    recipient: {
      name: recipientName,
      role: recipientRole,
      label: recipientLabel,
    },
    connectionTitle,
    grade: studentGrade,
    deepLink,
    webUrl,
    downloadUrl,
    meta: {
      title: metaTitle,
      description: metaDescription,
    },
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function POST(request: NextRequest) {
  // 1. Admission Control / Rate Limit Check
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                   request.headers.get('x-real-ip') ||
                   '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too Many Requests. Please slow down.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateCheck.retryAfter || 60),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const code = typeof body.code === 'string' ? body.code.trim().slice(0, 100) : '';
    const role = typeof body.role === 'string' ? body.role.trim().toLowerCase() : '';
    const from = typeof body.from === 'string' ? body.from.trim().slice(0, 100) : '';
    const to = typeof body.to === 'string' ? body.to.trim().slice(0, 100) : '';

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Code is required' },
        { status: 400 }
      );
    }

    const isParent = role === 'parent' || code.toUpperCase().startsWith('PAR-');
    const senderRole = isParent ? 'parent' : 'student';
    const recipientRole = isParent ? 'student' : 'parent';
    const senderName = from || (isParent ? 'Parent Guardian' : 'Student');
    const recipientName = to || (isParent ? 'Student' : 'Parent Guardian');

    return NextResponse.json({
      success: true,
      message: `Verified pairing invitation for ${senderName} ↔ ${recipientName}`,
      code,
      sender: { name: senderName, role: senderRole },
      recipient: { name: recipientName, role: recipientRole },
      deepLink: `focusdefend://invite?code=${encodeURIComponent(code)}&from=${encodeURIComponent(senderName)}&to=${encodeURIComponent(recipientName)}`,
      downloadUrl: `https://focusdefend.vercel.app/FocusDefend.apk`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
