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
    version_code: 65,
    version_name: '3.7.2',
    apk_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    download_url: 'https://focusdefend.vercel.app/FocusDefend.apk',
    apk_size_bytes: 96145636,
    size_bytes: 96145636,
    sha256: '5f6eca82e938ff41da4e7af828c4fd758361f5d2abaa5ffc578004c2d86cff7e',
    mandatory: true,
    is_mandatory: true,
    release_notes: 'FocusDefend v3.7.2: Obsidian Minimalist Bento Grid Architecture & Mobile Engine Hardening.\n• Complete App-Wide Unslopping\n• Centralized tactile haptics engine\n• Type-safe deep notification routing\n• Non-blocking guardian confirmations & accessible touch targets.',
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
