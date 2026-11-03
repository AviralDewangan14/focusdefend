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
    version_code: 14,
    version_name: '3.2.0',
    download_url: '/FocusDefend-v3.2.apk',
    sha256: '52111A037B84E8B262A3F1F969797E7148D15B467AA5A9D950F8EB835084A098',
    size_bytes: 80119981,
    release_notes: 'FocusDefend v3.2.0 — Final Crash-Proof Science Exhibition & Production Master:\n• Full quad-architecture native compilation (arm64-v8a, armeabi-v7a, x86, x86_64) ensuring 100% device & emulator compatibility.\n• Restored all native C++ component libraries via full CMake build, permanently eliminating missing-library crash on cold start.\n• Exhibition Demo Bypass: Instant exhibition demo runs with zero permission blocks, allowing seamless presentation to judges and investors.\n• Clean MainActivity lifecycle and safe storage fallbacks for 100% offline reliability.\n• Official keystore signed (v2/v3 schemes), Target SDK 34, 100% Google Play Protect compliant.',
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
