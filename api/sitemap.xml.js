// Handler específico para servir o sitemap.xml
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
  try {
    // Tentar ler o sitemap de dist/client primeiro (produção)
    let sitemapPath = path.resolve(__dirname, '../dist/client/sitemap.xml');
    
    // Se não existir, tentar public (fallback)
    if (!fs.existsSync(sitemapPath)) {
      sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    }
    
    // Se ainda não existir, tentar dist (outro fallback)
    if (!fs.existsSync(sitemapPath)) {
      sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml');
    }
    
    if (!fs.existsSync(sitemapPath)) {
      console.error('Sitemap não encontrado em:', sitemapPath);
      return res.status(404).send('Sitemap não encontrado');
    }
    
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    
    // Configurar headers corretos para XML
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Erro ao servir sitemap:', error);
    res.status(500).send('Erro ao carregar sitemap');
  }
}

