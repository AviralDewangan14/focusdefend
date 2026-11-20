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
    version_code: 76,
    version_name: '3.8.3',
    apk_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    download_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    apk_size_bytes: 95608335,
    size_bytes: 95608335,
    sha256: 'c2479809989f4086c8ee2c582ca912acadc35eb43a064f556ff0a797cb2bf751',
    mandatory: true,
    is_mandatory: true,
    release_notes:
      'FocusDefend v3.8.3 (Build 76): Native Heads-Up Push Notification Engine & React Hook Stability.\n' +
      '• React Hook Rule Resolution: Completely resolved "Rendered fewer hooks than expected" crash caused by premature early return in floating navigation.\n' +
      '• Native Heads-Up Push Engine: Redesigned Android notification architecture with high-priority heads-up banners, dedicated sound, vibration patterns, and action buttons.\n' +
      '• Interactive Push Composer: Added built-in notification composer form with custom titles, messages, category channels, and delivery timing.\n' +
      '• Android 14 Compatibility: Safe channel creation and removal of restricted fullScreenIntent barriers for seamless system-tray push delivery.',
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
