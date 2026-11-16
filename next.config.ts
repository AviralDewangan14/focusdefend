import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
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
        // Global production security headers applied across all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
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
