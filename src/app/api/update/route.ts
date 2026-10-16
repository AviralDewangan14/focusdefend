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
    version_code: 24,
    version_name: '1.5.9',
    download_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    sha256: '9CF92E188B6D23CEC5B6D4EBE67859CC47586C61AFB20B5E65D3F65474C0AED6',
    size_bytes: 31359534,
    release_notes: 'FocusDefend v1.5.9 — Zero 3-Dots & Zero Restricted Settings Release:\n• Completely removed SYSTEM_ALERT_WINDOW from manifest: Android will NEVER flag or grey out settings for FocusDefend.\n• Single-Tap Onboarding: Only standard Usage Access and Focus Notifications are prompted, which Android grants cleanly without touching the 3 dots.\n• Reliable Study Gates: Uses Android 14/15 native PendingIntent background start and full-screen intents with zero accessibility or overlay friction.',
    is_mandatory: true,
    created_at: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
