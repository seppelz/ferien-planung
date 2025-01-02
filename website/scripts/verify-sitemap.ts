import { readFileSync } from 'fs';
import { XMLValidator } from 'fast-xml-parser';
import fetch from 'node-fetch';

async function verifySitemap() {
  try {
    // Read the sitemap file
    const sitemap = readFileSync('public/sitemap.xml', 'utf-8');

    // Validate XML structure
    const validationResult = XMLValidator.validate(sitemap);
    if (validationResult !== true) {
      throw new Error(`Invalid XML structure: ${validationResult.err}`);
    }

    // Parse URLs from sitemap
    const urls = sitemap.match(/<loc>(.*?)<\/loc>/g)?.map(loc => 
      loc.replace(/<\/?loc>/g, '')
    ) || [];

    console.log(`Found ${urls.length} URLs in sitemap`);

    // Verify each URL is accessible
    const results = await Promise.all(
      urls.map(async url => {
        try {
          const response = await fetch(url);
          return {
            url,
            status: response.status,
            ok: response.ok
          };
        } catch (error: any) {
          return {
            url,
            status: 'error',
            ok: false,
            error: error?.message || 'Unknown error'
          };
        }
      })
    );

    // Log results
    const validUrls = results.filter(r => r.ok);
    const invalidUrls = results.filter(r => !r.ok);

    console.log(`\nSitemap Verification Results:`);
    console.log(`✅ Valid URLs: ${validUrls.length}`);
    
    if (invalidUrls.length > 0) {
      console.log(`\n❌ Invalid URLs: ${invalidUrls.length}`);
      invalidUrls.forEach(({ url, status, error }) => {
        console.log(`  - ${url}`);
        console.log(`    Status: ${status}`);
        if (error) console.log(`    Error: ${error}`);
      });
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error('Sitemap verification failed:', error.message);
    } else {
      console.error('Sitemap verification failed with unknown error');
    }
    process.exit(1);
  }
}

verifySitemap().catch(error => {
  if (error instanceof Error) {
    console.error('Unhandled error:', error.message);
  } else {
    console.error('Unhandled error of unknown type');
  }
  process.exit(1);
}); 