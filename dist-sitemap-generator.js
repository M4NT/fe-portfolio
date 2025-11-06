// Simple sitemap generator for build process
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD para sitemap

const urls = [
  // Main pages - Prioridade máxima
  {
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily', // Aumentado para daily (mais frequente)
    priority: 1.0
  },
  {
    loc: `${baseUrl}/blog`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: `${baseUrl}/#services`,
    lastmod: currentDate,
    changefreq: 'weekly', // Aumentado para weekly
    priority: 0.9 // Aumentado de 0.8 para 0.9
  },
  {
    loc: `${baseUrl}/#projects`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: `${baseUrl}/#about`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/#contact`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8 // Aumentado de 0.7 para 0.8
  },
  // Blog posts - Prioridade alta para conteúdo
  ...blogPosts.map(post => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.date ? post.date.split('T')[0] : currentDate, // Formato YYYY-MM-DD
    changefreq: 'weekly', // Aumentado para weekly (conteúdo é importante)
    priority: 0.8 // Aumentado de 0.7 para 0.8
  })).sort((a, b) => {
    // Ordenar por data (mais recente primeiro)
    return new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime();
  }),
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

// Gerar sitemap XML válido e bem formatado (formato simplificado para compatibilidade máxima com Google)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => {
  // Garantir que a URL está corretamente formatada
  const loc = url.loc.trim();
  // Garantir formato de data correto (YYYY-MM-DD) - remover timestamp se houver
  let lastmod = '';
  if (url.lastmod) {
    const dateStr = url.lastmod.trim();
    // Se for formato ISO (com T e Z), extrair apenas a data
    if (dateStr.includes('T')) {
      lastmod = dateStr.split('T')[0];
    } else {
      lastmod = dateStr;
    }
  }
  const changefreq = url.changefreq || '';
  const priority = url.priority !== undefined ? url.priority.toString() : '';
  
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}${changefreq ? `
    <changefreq>${changefreq}</changefreq>` : ''}${priority ? `
    <priority>${priority}</priority>` : ''}
  </url>`;
}).join('\n')}
</urlset>`;

// Gerar também robots.txt melhorado
const robotsTxt = `# robots.txt for yanmantovani.com
# Optimized for Search Engines and AI Crawlers
# Desenvolvedor Frontend Freelancer | Landing Pages de Alta Conversão

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://yanmantovani.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 0

# Search Engine Bots
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Social Media Crawlers
User-agent: facebot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# AI Crawlers (ChatGPT, Claude, Gemini, etc.)
User-agent: GPTBot
Allow: /
Crawl-delay: 0

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /
Crawl-delay: 0

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Archive Bots
User-agent: ia_archiver
Allow: /

User-agent: archive.org_bot
Allow: /

# Disallow admin or private paths (if any in the future)
# Disallow: /admin/
# Disallow: /private/
`;

// Write sitemap to múltiplos locais para garantir acesso
const distClientPath = path.join(__dirname, 'dist', 'client', 'sitemap.xml');
const distPath = path.join(__dirname, 'dist', 'sitemap.xml');
const publicPath = path.join(__dirname, 'public', 'sitemap.xml');

// Criar diretórios se não existirem
const distClientDir = path.dirname(distClientPath);
const distDir = path.dirname(distPath);
const publicDir = path.dirname(publicPath);

[distClientDir, distDir, publicDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Escrever sitemap em todos os locais
fs.writeFileSync(distClientPath, sitemap);
fs.writeFileSync(distPath, sitemap);
fs.writeFileSync(publicPath, sitemap);

// Write robots.txt também
const robotsClientPath = path.join(__dirname, 'dist', 'client', 'robots.txt');
const robotsPublicPath = path.join(__dirname, 'public', 'robots.txt');

fs.writeFileSync(robotsClientPath, robotsTxt);
fs.writeFileSync(robotsPublicPath, robotsTxt);

console.log('✅ Sitemap gerado com sucesso em:');
console.log('   -', distClientPath);
console.log('   -', distPath);
console.log('   -', publicPath);
console.log('✅ Robots.txt atualizado em:');
console.log('   -', robotsClientPath);
console.log('   -', robotsPublicPath);
console.log(`📊 Total de URLs: ${urls.length}`);
console.log(`📅 Última atualização: ${currentDate}`);

