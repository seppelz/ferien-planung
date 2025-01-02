import { writeFileSync } from 'fs';
import { getStateIds } from '../src/utils/stateUtils';

async function generateSitemap() {
  const baseUrl = 'https://holiday-planner.de';
  const date = new Date().toISOString();
  
  // Get all state IDs
  const stateIds = getStateIds();

  // Define static routes with their priorities and change frequencies
  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily' },  // homepage
    { path: '/planner', priority: '0.9', changefreq: 'weekly' },
    { path: '/states', priority: '0.9', changefreq: 'weekly' },
    { path: '/datenschutz', priority: '0.3', changefreq: 'monthly' },
    { path: '/impressum', priority: '0.3', changefreq: 'monthly' }
  ];

  // Generate state routes
  const stateRoutes = stateIds.map(stateId => ({
    path: `/states/${stateId}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  // Combine all routes
  const allRoutes = [...staticRoutes, ...stateRoutes];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
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