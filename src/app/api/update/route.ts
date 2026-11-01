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
    version_code: 13,
    version_name: '3.1.0',
    download_url: '/FocusDefend-v3.1.apk',
    sha256: 'CFDF805F82F15352BEDC1629AFCFF928D3629F4B81CC4DCE402B38C06123342F',
    size_bytes: 50731196,
    release_notes: 'FocusDefend v3.1.0 — Science Exhibition & Final Production Master:\n• Resolved route collision: converted role layouts to explicit /login fallback, eliminating infinite loop.\n• Removed NativeWind CSS transitions without Reanimated dependency, ensuring pure native stability across all Android devices.\n• Added 1-tap \'Instant Exhibition Demo ⚡\' directly on Landing Screen for immediate presentation.\n• Protected MainActivity super.onCreate with robust exception fallback.\n• Signed with official keystore (v2/v3 schemes), Target SDK 34, 100% Google Play Protect compliant.',
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
