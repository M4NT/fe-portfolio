// Handler específico para servir o sitemap.xml
// Este handler garante que o sitemap seja sempre acessível, mesmo se o arquivo estático não existir
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sitemap XML gerado dinamicamente (fallback se arquivo não existir)
function generateSitemap(req) {
  // Detectar se a requisição veio com www ou não-www
  const host = req?.headers?.host || 'yanmantovani.com';
  const protocol = req?.headers?.['x-forwarded-proto'] || 'https';
  const baseUrl = `${protocol}://${host}`;
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
    // REMOVIDAS as URLs com #
    // { loc: `${baseUrl}/#services`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    // { loc: `${baseUrl}/#projects`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    // { loc: `${baseUrl}/#about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    // { loc: `${baseUrl}/#contact`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
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
  // Permitir CORS para Googlebot
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    let sitemap = null;

    // Tentar ler arquivo estático de múltiplos locais
    const possiblePaths = [
      path.resolve(__dirname, '../dist/client/sitemap.xml'),
      path.resolve(__dirname, '../public/sitemap.xml'),
      path.resolve(__dirname, '../dist/sitemap.xml')
    ];

    for (const sitemapPath of possiblePaths) {
      if (fs.existsSync(sitemapPath)) {
        try {
          sitemap = fs.readFileSync(sitemapPath, 'utf-8');
          // Validar que não está vazio
          if (sitemap && sitemap.trim().length > 0) {
            break;
          }
        } catch (e) {
          // Continuar tentando outros caminhos
          continue;
        }
      }
    }

    // Se não encontrou arquivo válido, gerar dinamicamente
    if (!sitemap || sitemap.trim().length === 0) {
      sitemap = generateSitemap(req);
    }

    // Validar formato básico do XML
    if (!sitemap.includes('<?xml') || !sitemap.includes('<urlset')) {
      console.warn('Sitemap inválido detectado, regenerando...');
      sitemap = generateSitemap(req);
    }

    // Ajustar URLs no sitemap para corresponder ao domínio da requisição
    const host = req.headers?.host || 'yanmantovani.com';
    const protocol = req.headers?.['x-forwarded-proto'] || 'https';
    const requestBaseUrl = `${protocol}://${host}`;

    // Se o sitemap foi lido de arquivo, ajustar URLs para corresponder ao domínio da requisição
    if (sitemap && requestBaseUrl !== 'https://yanmantovani.com') {
      sitemap = sitemap.replace(/https:\/\/yanmantovani\.com/g, requestBaseUrl);
    }

    // Configurar headers corretos para XML (CRÍTICO: deve ser application/xml, não text/plain)
    // IMPORTANTE: Configurar headers ANTES de enviar resposta
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Length', Buffer.byteLength(sitemap, 'utf-8').toString());

    // Log para debug
    const userAgent = req.headers['user-agent'] || 'unknown';
    const isGooglebot = userAgent.includes('Googlebot') || userAgent.includes('Google');
    if (isGooglebot) {
      console.log('[SITEMAP] Requisição do Googlebot detectada');
    }

    // Enviar resposta com status 200 e garantir que Content-Type não seja sobrescrito
    res.status(200).setHeader('Content-Type', 'application/xml; charset=utf-8').send(sitemap);
  } catch (error) {
    console.error('[SITEMAP] Erro ao servir sitemap:', error);
    // Em caso de erro, sempre tentar gerar dinamicamente
    try {
      const fallbackSitemap = generateSitemap(req);
      // CRÍTICO: Garantir Content-Type correto no fallback também
      res.status(200)
        .setHeader('Content-Type', 'application/xml; charset=utf-8')
        .setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
        .setHeader('X-Content-Type-Options', 'nosniff')
        .send(fallbackSitemap);
    } catch (fallbackError) {
      console.error('[SITEMAP] Erro ao gerar sitemap de fallback:', fallbackError);
      res.status(500).setHeader('Content-Type', 'text/plain').send('Erro ao carregar sitemap');
    }
  }
}
