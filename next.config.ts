import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  
  async rewrites() {
    return [
      { source: '/FocusDefend-Release.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusDefend-v3.4.4.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusDefend-v3.4.3.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusDefend-v3.2.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusDefend-v3.1.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusDefend-v3.0.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusShield.apk', destination: '/FocusDefend.apk' },
      { source: '/FocusDefend-Clean.apk', destination: '/FocusDefend.apk' },
      { source: '/app-release.apk', destination: '/FocusDefend.apk' },
      { source: '/focusdefend-latest.apk', destination: '/FocusDefend.apk' },
    ];
  },

  async headers() {
    return [
      {
        source: "/(api/update|.*\\.apk|update\\.json)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
        ],
      },
      {
        source: "/((?!api/update|.*\\.apk|update\\.json).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
