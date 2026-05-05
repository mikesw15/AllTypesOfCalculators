import fs from 'fs';
import path from 'path';

// Define the site URL
const SITE_URL = 'https://alltypesofcalculators.com';

// We need to parse the calculators to get the IDs.
// Since we have a typescript file index.tsx with all the calculators, we can parse it roughly or import it.
// Since it's a build script, we can just use simple regex to extract IDs from src/calculators/index.tsx

const indexFile = fs.readFileSync(path.join(process.cwd(), 'src', 'calculators', 'index.tsx'), 'utf-8');

const idRegex = /id:\s*'([^']+)'/g;
let match;
const calculatorIds = [];

while ((match = idRegex.exec(indexFile)) !== null) {
  calculatorIds.push(match[1]);
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/categories</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

calculatorIds.forEach(id => {
  sitemap += `
  <url>
    <loc>${SITE_URL}/calculators/${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

sitemap += `
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
