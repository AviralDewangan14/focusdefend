import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'update.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
  } catch (e) {
    console.error('Failed to read update.json', e);
  }

  return NextResponse.json({
    version_code: 12,
    version_name: '3.0.0',
    download_url: '/FocusDefend-v3.0.apk',
    sha256: 'BF23F4FFE9265305C8A786F631322CA30E5F4763BD1C32C79C428BCCA9850B89',
    size_bytes: 50713674,
    release_notes: 'FocusDefend v3.0.0 — Science Exhibition & Production Master Release:\n• Resolved route resolution conflict: added explicit initialRouteName=\'index\' to root Stack to guarantee clean boot directly to landing screen.\n• Eliminated update-depth loop and blank screen placeholders in student/parent/teacher/admin layouts with declarative Redirect and branded ActivityIndicator.\n• Added global JS error protector (ErrorUtils) preventing unhandled async rejections from terminating the process.\n• Full dual-architecture support (arm64-v8a + armeabi-v7a) with official keystore signing (v2/v3 schemes).',
    is_mandatory: false,
    created_at: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
