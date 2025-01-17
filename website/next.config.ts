import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
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
  // Add exportPathMap to explicitly define all static pages
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/planner': { page: '/planner' },
      '/states': { page: '/states' },
      '/datenschutz': { page: '/datenschutz' },
      '/impressum': { page: '/impressum' },
      '/app': { page: '/app-redirect' },
      '/states/berlin': { page: '/states/[state]', query: { state: 'berlin' } },
      '/states/bayern': { page: '/states/[state]', query: { state: 'bayern' } },
      '/states/baden-wuerttemberg': { page: '/states/[state]', query: { state: 'baden-wuerttemberg' } },
      '/states/brandenburg': { page: '/states/[state]', query: { state: 'brandenburg' } },
      '/states/bremen': { page: '/states/[state]', query: { state: 'bremen' } },
      '/states/hamburg': { page: '/states/[state]', query: { state: 'hamburg' } },
      '/states/hessen': { page: '/states/[state]', query: { state: 'hessen' } },
      '/states/mecklenburg-vorpommern': { page: '/states/[state]', query: { state: 'mecklenburg-vorpommern' } },
      '/states/niedersachsen': { page: '/states/[state]', query: { state: 'niedersachsen' } },
      '/states/nordrhein-westfalen': { page: '/states/[state]', query: { state: 'nordrhein-westfalen' } },
      '/states/rheinland-pfalz': { page: '/states/[state]', query: { state: 'rheinland-pfalz' } },
      '/states/saarland': { page: '/states/[state]', query: { state: 'saarland' } },
      '/states/sachsen': { page: '/states/[state]', query: { state: 'sachsen' } },
      '/states/sachsen-anhalt': { page: '/states/[state]', query: { state: 'sachsen-anhalt' } },
      '/states/schleswig-holstein': { page: '/states/[state]', query: { state: 'schleswig-holstein' } },
      '/states/thueringen': { page: '/states/[state]', query: { state: 'thueringen' } },
    };
  }
};

export default nextConfig;
