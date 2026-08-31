import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables Gzip and Brotli compression
  compress: true,
  
  // Set aggressive Edge caching headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            // Cache at Edge (s-maxage) for 1 year (31536000 seconds)
            // Allow stale content to be served while revalidating in background
            value: "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
