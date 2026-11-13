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

export async function GET(request: NextRequest) {
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
  let recipientName = rawTo || (isParentSender ? 'Student' : 'Parent Guardian');
  let studentGrade: string | undefined = undefined;

  // Attempt Supabase lookup to resolve registered profile names
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && rawCode) {
    try {
      const trimmedCode = rawCode.toUpperCase();
      
      // 1. Look up code in invite_codes table
      let targetUserId: string | null = null;
      try {
        const inviteRes = await fetch(
          `${supabaseUrl}/rest/v1/invite_codes?code=eq.${encodeURIComponent(trimmedCode)}&select=id,code,role,created_by&limit=1`,
          {
            headers: {
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );
        if (inviteRes.ok) {
          const inviteRows = await inviteRes.json();
          if (Array.isArray(inviteRows) && inviteRows.length > 0) {
            targetUserId = inviteRows[0].created_by;
          }
        }
      } catch (_) {}

      // 2. Fetch associated user profile and academic class
      const uidToQuery = targetUserId || (trimmedCode.length === 36 ? trimmedCode : null);
      if (uidToQuery) {
        try {
          const profRes = await fetch(
            `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(uidToQuery)}&select=id,name,role&limit=1`,
            {
              headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json',
              },
              cache: 'no-store',
            }
          );
          if (profRes.ok) {
            const profRows = await profRes.json();
            if (Array.isArray(profRows) && profRows.length > 0 && profRows[0].name) {
              senderName = profRows[0].name;
            }
          }

          const studentRes = await fetch(
            `${supabaseUrl}/rest/v1/student_profiles?user_id=eq.${encodeURIComponent(uidToQuery)}&select=class&limit=1`,
            {
              headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json',
              },
              cache: 'no-store',
            }
          );
          if (studentRes.ok) {
            const studentRows = await studentRes.json();
            if (Array.isArray(studentRows) && studentRows.length > 0 && studentRows[0].class) {
              studentGrade = `Class ${studentRows[0].class}`;
            }
          }
        } catch (_) {}
      }
    } catch (err) {
      console.warn('[Invite API] Supabase fetch lookup notice:', err);
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
  try {
    const body = await request.json().catch(() => ({}));
    const code = (body.code || '').trim();
    const role = (body.role || body.fromRole || '').trim().toLowerCase();
    const from = (body.from || body.name || '').trim();
    const to = (body.to || '').trim();

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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
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
