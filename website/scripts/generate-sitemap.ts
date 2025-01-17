import { writeFileSync } from 'fs';
import { getStateIds } from '../src/utils/stateUtils';

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

  // Write sitemap to public directory
  writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error); 