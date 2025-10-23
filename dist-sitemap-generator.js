// Simple sitemap generator for build process
const fs = require('fs');
const path = require('path');

// Simulate blog posts data (in production, this would be imported from posts.ts)
const blogPosts = [
  {
    slug: 'a-revolucao-silenciosa-por-que-o-futuro-do-wordpress-e-escrito-em-react',
    date: '2025-01-23T10:00:00.000Z'
  },
  {
    slug: 'seu-site-e-uma-vitrine-bonita-ou-uma-maquina-de-vendas',
    date: '2025-01-22T10:00:00.000Z'
  },
  {
    slug: 'por-que-seu-site-lento-esta-roubando-seus-clientes',
    date: '2025-01-22T10:00:00.000Z'
  },
  {
    slug: 'o-que-e-landing-page-melhores-ferramentas-gratuitas',
    date: '2025-01-21T10:00:00.000Z'
  },
  {
    slug: 'quanto-custa-landing-page-2025',
    date: '2025-01-20T10:00:00.000Z'
  },
  {
    slug: 'como-aumentar-conversoes-landing-page',
    date: '2025-01-18T10:00:00.000Z'
  },
  {
    slug: 'etapas-para-lancar-seu-site',
    date: '2025-01-17T10:00:00.000Z'
  },
  {
    slug: 'melhores-ferramentas-desenvolvimento-web-2025',
    date: '2025-01-15T10:00:00.000Z'
  }
];

const baseUrl = 'https://yanmantovani.com';
const currentDate = new Date().toISOString();

const urls = [
  // Main pages
  {
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: `${baseUrl}/#about`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/#services`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/#projects`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: `${baseUrl}/#contact`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.7
  },
  // Blog index
  {
    loc: `${baseUrl}/blog`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 0.9
  },
  // Blog posts
  ...blogPosts.map(post => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: 0.7
  })),
  // Legal pages
  {
    loc: `${baseUrl}/privacy-policy`,
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: `${baseUrl}/terms-of-use`,
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: `${baseUrl}/cookie-policy`,
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: 0.3
  }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to dist folder
const distPath = path.join(__dirname, 'dist', 'sitemap.xml');
fs.writeFileSync(distPath, sitemap);

console.log('✅ Sitemap gerado com sucesso:', distPath);
console.log(`📊 Total de URLs: ${urls.length}`);

