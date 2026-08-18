import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['ferien-planung.de'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ferien-planung.de',
      },
    ],
  },
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
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '',
  assetPrefix: '',
  async rewrites() {
    // Local dev only: proxy /app to the Vite planner (production serves website/out/app).
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/app',
          destination: 'http://localhost:5173/app/',
        },
        {
          source: '/app/:path*',
          destination: 'http://localhost:5173/app/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
