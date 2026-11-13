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
    version_code: 62,
    version_name: '3.6.8',
    apk_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    download_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    apk_size_bytes: 96131984,
    size_bytes: 96131984,
    sha256: 'c3cee3542ce867afc4c6701ab841b465ce40165769d0822b14c804aeccae02e7',
    mandatory: true,
    is_mandatory: true,
    release_notes: 'FocusDefend v3.6.8: Production Health & Cloud Ledger Master. Realtime Supabase cloud replication for student focus credits & transaction ledger; diagnostic runtime crash boundary persistence; production demo authentication hardening; 8000ms AbortController timeout protection on AI wellbeing queries; and multi-tier live streaming distribution.',
    created_at: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
