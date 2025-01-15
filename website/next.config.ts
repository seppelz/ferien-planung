import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['ferien-planung.de', 'app.ferien-planung.de'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ferien-planung.de',
      },
      {
        protocol: 'https',
        hostname: 'app.ferien-planung.de',
      },
    ],
  },
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://app.ferien-planung.de',
        permanent: true,
      },
      {
        source: '/app/:path*',
        destination: 'https://app.ferien-planung.de/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
