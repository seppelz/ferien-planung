import { writeFileSync } from 'fs';
import { getStateIds } from '../src/utils/stateUtils';
import path from 'path';

async function generateSitemap() {
  const baseUrl = 'https://ferien-planung.de';
  const date = new Date().toISOString();
  
  // Get all state IDs
  const stateIds = getStateIds();

  // Define static routes with their priorities and change frequencies
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/datenschutz', priority: '0.3', changefreq: 'monthly' },
    { path: '/impressum', priority: '0.3', changefreq: 'monthly' },
    ...stateIds.map(stateId => ({
      path: `/states/${stateId}`,
      priority: '0.8',
      changefreq: 'weekly'
    }))
  ];

  // Generate sitemap XML
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

  // Write sitemap to both public and out directories
  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const outPath = path.join(process.cwd(), 'out', 'sitemap.xml');
  
  writeFileSync(publicPath, sitemap);
  // Also write to out directory if it exists (for static export)
  try {
    writeFileSync(outPath, sitemap);
  } catch (error) {
    console.log('Note: out directory not found, skipping secondary sitemap write');
  }
  
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error); 