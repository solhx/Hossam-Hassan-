// next.config.ts
// ─── Next.js Configuration: Performance-Optimized (Turbopack Compatible) ───

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ─── Experimental Features ───
  experimental: {
    // Optimized package imports (tree-shaking for barrel exports)
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
  },

  // ─── Turbopack Configuration ───
  turbopack: {
    resolveAlias: {
      // Ensure Three.js resolves correctly
      three: 'three',
    },
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  // ─── Image Optimization ───
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── Headers (Security + Caching) ───
  async headers() {
    return [
      // Global security headers
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Static assets: aggressive immutable caching
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Next.js static chunks: immutable
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ─── Redirects ───
  async redirects() {
    return [];
  },

  // ─── Compiler Options ───
  compiler: {
    // Remove console.log in production (keep errors and warnings)
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },

  // ─── Misc ───
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;