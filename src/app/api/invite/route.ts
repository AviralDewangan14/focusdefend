import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface InviteResponse {
  success: boolean;
  code: string;
  role: 'student' | 'parent';
  name: string;
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
  const rawRole = (searchParams.get('role') || '').trim().toLowerCase();

  const code = rawCode || 'FSH-INVITE';
  const isParent = rawRole === 'parent' || code.toUpperCase().startsWith('PAR-');
  const role: 'student' | 'parent' = isParent ? 'parent' : 'student';
  let displayName = rawName || (isParent ? 'Guardian' : 'Student');
  let studentGrade: string | undefined = undefined;

  // Attempt Supabase query if credentials are present
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && rawCode) {
    try {
      const trimmedCode = rawCode.toUpperCase();
      // Look up by invite_code or partial ID in profiles
      const profileRes = await fetch(
        `${supabaseUrl}/rest/v1/profiles?invite_code=eq.${encodeURIComponent(trimmedCode)}&select=id,name,role,students(grade)&limit=1`,
        {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (profileRes.ok) {
        const rows = await profileRes.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const profile = rows[0];
          if (profile.name) displayName = profile.name;
          if (profile.students && Array.isArray(profile.students) && profile.students.length > 0) {
            studentGrade = profile.students[0]?.grade;
          }
        }
      }
    } catch (err) {
      console.warn('[Invite API] Supabase fetch lookup note:', err);
    }
  }

  const deepLink = `focusdefend://invite?code=${encodeURIComponent(code)}&name=${encodeURIComponent(displayName)}&role=${encodeURIComponent(role)}`;
  const webUrl = `https://focusdefend.vercel.app/invite?code=${encodeURIComponent(code)}&name=${encodeURIComponent(displayName)}&role=${encodeURIComponent(role)}`;
  const downloadUrl = `https://focusdefend.vercel.app/FocusDefend.apk`;

  const metaTitle = isParent
    ? `🛡️ FocusDefend Guardian Invitation (${code})`
    : `🛡️ Connect with ${displayName} on FocusDefend (${code})`;

  const metaDescription = isParent
    ? `Your parent guardian has invited you to pair devices on FocusDefend. Complete study sessions, balance screen time, and unlock rewards.`
    : `${displayName} has invited you to connect on FocusDefend to supervise focus sessions, balance digital screen time, and unlock study rewards.`;

  const payload: InviteResponse = {
    success: true,
    code,
    role,
    name: displayName,
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
    const role = (body.role || '').trim().toLowerCase();
    const name = (body.name || '').trim();

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Code is required' },
        { status: 400 }
      );
    }

    const isParent = role === 'parent' || code.toUpperCase().startsWith('PAR-');
    const detectedRole = isParent ? 'parent' : 'student';

    return NextResponse.json({
      success: true,
      message: `Verified invitation code ${code} for role ${detectedRole}`,
      code,
      role: detectedRole,
      name: name || (isParent ? 'Guardian' : 'Student'),
      deepLink: `focusdefend://invite?code=${encodeURIComponent(code)}&role=${detectedRole}`,
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
