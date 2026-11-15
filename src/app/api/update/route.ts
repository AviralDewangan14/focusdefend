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
    version_code: 67,
    version_name: '3.7.4',
    apk_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    download_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    apk_size_bytes: 96178511,
    size_bytes: 96178511,
    sha256: 'ecf46a51aa5adfc13cdf81e8fa95ab828111f78602b09a07ac167bb061e7d384',
    mandatory: true,
    is_mandatory: true,
    release_notes: 'FocusDefend v3.7.4: Animated Sliding Capsule Navigation & Native Motion Transitions.\n• Sliding capsule indicator with spring translation physics\n• FocusDefend domain tabs: Today, Study, Analytics, Rewards, Profile\n• Real-Time Data Synchronization & Tactile feedback.',
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
