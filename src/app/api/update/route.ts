import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// High-performance in-memory cache to eliminate disk I/O bottlenecks during polling storms
let cachedManifest: Record<string, unknown> | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 15000; // 15-second TTL

export async function GET() {
  const now = Date.now();

  // 1. Resolve from in-memory cache if fresh
  if (cachedManifest && (now - lastCacheTime < CACHE_TTL_MS)) {
    return NextResponse.json(cachedManifest, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Cache-Lookup': 'HIT_MEMORY',
      },
    });
  }

  // 2. Asynchronous non-blocking disk read
  try {
    const filePath = path.join(process.cwd(), 'public', 'update.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(rawData);

    cachedManifest = parsed;
    lastCacheTime = now;

    return NextResponse.json(parsed, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Cache-Lookup': 'MISS_DISK_ASYNC',
      },
    });
  } catch (e) {
    console.warn('[Update API] Non-blocking read fallback notice:', e);
  }

  // 3. Fallback to cached manifest or default release constants
  const fallbackPayload = cachedManifest || {
    version_code: 77,
    version_name: '3.8.4',
    apk_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    download_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    apk_size_bytes: 95608330,
    size_bytes: 95608330,
    sha256: 'f78a94ebcd151c435f3581b18499d991d9ff46a625de1d26c2d7a45b317b28d8',
    mandatory: true,
    is_mandatory: true,
    release_notes:
      'FocusDefend v3.8.4 (Build 77): Production Engine Hardening & Autonomous OTA Release.\n' +
      '• Production Runtime Hardening: Eliminated Turbopack compilation syntax issues and refactored React 19 hydration state using useSyncExternalStore to eliminate cascading re-render warnings.\n' +
      '• High-Priority Heads-Up Push Notifications: Full native Android 14/15 system tray push integration with custom alert tones, vibration sequences, and action triggers.\n' +
      '• Interactive Notification Testing Console: Live in-app composer to dispatch academic, reminder, and emergency alerts directly.\n' +
      '• 100% NCERT 2024–2026 Question Database: Complete curriculum coverage with zero dropped syllabus topics across Classes 5 to 12.',
    created_at: new Date().toISOString(),
  };

  return NextResponse.json(fallbackPayload, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Cache-Lookup': 'FALLBACK_STATIC',
    },
  });
}
