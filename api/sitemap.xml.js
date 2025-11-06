// Handler específico para servir o sitemap.xml
// Este handler garante que o sitemap seja sempre acessível, mesmo se o arquivo estático não existir
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sitemap XML gerado dinamicamente (fallback se arquivo não existir)
function generateSitemap() {
  const baseUrl = 'https://yanmantovani.com';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  const blogPosts = [
    { slug: 'a-revolucao-silenciosa-por-que-o-futuro-do-wordpress-e-escrito-em-react', date: '2025-01-23' },
    { slug: 'seu-site-e-uma-vitrine-bonita-ou-uma-maquina-de-vendas', date: '2025-01-22' },
    { slug: 'por-que-seu-site-lento-esta-roubando-seus-clientes', date: '2025-01-22' },
    { slug: 'o-que-e-landing-page-melhores-ferramentas-gratuitas', date: '2025-01-21' },
    { slug: 'quanto-custa-landing-page-2025', date: '2025-01-20' },
    { slug: 'como-aumentar-conversoes-landing-page', date: '2025-01-18' },
    { slug: 'etapas-para-lancar-seu-site', date: '2025-01-17' },
    { slug: 'melhores-ferramentas-desenvolvimento-web-2025', date: '2025-01-15' }
  ];

  const urls = [
    { loc: baseUrl, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/#services`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/#projects`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/#about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/#contact`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    ...blogPosts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'weekly',
      priority: '0.8'
    })),
    { loc: `${baseUrl}/privacy-policy`, lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/terms-of-use`, lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/cookie-policy`, lastmod: currentDate, changefreq: 'yearly', priority: '0.3' }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export default async function handler(req, res) {
  try {
    // Tentar ler o sitemap de dist/client primeiro (produção)
    let sitemapPath = path.resolve(__dirname, '../dist/client/sitemap.xml');
    let sitemap = null;
    
    // Tentar ler arquivo estático
    if (fs.existsSync(sitemapPath)) {
      try {
        sitemap = fs.readFileSync(sitemapPath, 'utf-8');
      } catch (e) {
        console.warn('Erro ao ler sitemap de dist/client:', e.message);
      }
    }
    
    // Se não encontrou, tentar public (fallback)
    if (!sitemap) {
      sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        try {
          sitemap = fs.readFileSync(sitemapPath, 'utf-8');
        } catch (e) {
          console.warn('Erro ao ler sitemap de public:', e.message);
        }
      }
    }
    
    // Se ainda não encontrou, tentar dist (outro fallback)
    if (!sitemap) {
      sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        try {
          sitemap = fs.readFileSync(sitemapPath, 'utf-8');
        } catch (e) {
          console.warn('Erro ao ler sitemap de dist:', e.message);
        }
      }
    }
    
    // Se ainda não encontrou, gerar dinamicamente
    if (!sitemap) {
      console.log('Gerando sitemap dinamicamente (arquivo não encontrado)');
      sitemap = generateSitemap();
    }
    
    // Validar que o sitemap não está vazio
    if (!sitemap || sitemap.trim().length === 0) {
      console.error('Sitemap vazio, gerando dinamicamente');
      sitemap = generateSitemap();
    }
    
    // Configurar headers corretos para XML
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Sitemap servido com sucesso, tamanho:', sitemap.length, 'bytes');
    }
    
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Erro ao servir sitemap:', error);
    // Em caso de erro, tentar gerar dinamicamente
    try {
      const fallbackSitemap = generateSitemap();
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.status(200).send(fallbackSitemap);
    } catch (fallbackError) {
      console.error('Erro ao gerar sitemap de fallback:', fallbackError);
      res.status(500).send('Erro ao carregar sitemap');
    }
  }
}

