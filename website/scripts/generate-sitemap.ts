import { writeFileSync } from 'fs';
import { getStateIds } from '../src/utils/stateUtils';
import { PLAN_YEAR } from '../src/constants/planYear';
import path from 'path';

async function generateSitemap() {
  const baseUrl = 'https://ferien-planung.de';
  const date = new Date().toISOString();
  const stateIds = getStateIds();

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/app/', priority: '1.0', changefreq: 'daily' },
    { path: '/states/', priority: '0.9', changefreq: 'weekly' },
    { path: '/datenschutz/', priority: '0.3', changefreq: 'monthly' },
    { path: '/impressum/', priority: '0.3', changefreq: 'monthly' },
    ...stateIds.map(stateId => ({
      path: `/states/${stateId}/`,
      priority: '0.8',
      changefreq: 'weekly'
    })),
    ...stateIds.map(stateId => ({
      path: `/states/${stateId}/brueckentage-${PLAN_YEAR}/`,
      priority: '0.85',
      changefreq: 'weekly'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(route => `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const outPath = path.join(process.cwd(), 'out', 'sitemap.xml');

  writeFileSync(publicPath, sitemap);
  try {
    writeFileSync(outPath, sitemap);
  } catch {
    console.log('Note: out directory not found, skipping secondary sitemap write');
  }

  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
