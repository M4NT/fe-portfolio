// Handler para Vercel Serverless Functions
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cache para o módulo SSR em produção
let render;
let template;

// Função de inicialização lazy
async function initialize() {
  if (!render || !template) {
    const { render: renderProd } = await import('../dist/server/entry-server.js');
    render = renderProd.render;
    template = fs.readFileSync(
      path.resolve(__dirname, '../dist/client/index.html'),
      'utf-8'
    );
  }
  return { render, template };
}

export default async function handler(req, res) {
  try {
    // Inicializar se necessário
    const { render: renderFn, template: htmlTemplate } = await initialize();
    
    const url = req.url || '/';
    
    // Log para debug
    console.log(`[SSR] Renderizando: ${url}`);

    // Renderizar o app no servidor com timeout
    let appHtml;
    try {
      appHtml = renderFn(url);
      
      // Verificar se o HTML foi gerado
      if (!appHtml || appHtml.trim().length === 0) {
        console.warn(`[SSR] HTML vazio para ${url}`);
        appHtml = '<div class="min-h-screen bg-black text-white flex items-center justify-center"><div class="text-center"><h1 class="text-2xl font-bold">Carregando...</h1></div></div>';
      }
    } catch (renderError) {
      console.error(`[SSR] Erro ao renderizar ${url}:`, renderError);
      // HTML de fallback
      appHtml = `
        <div class="min-h-screen bg-black text-white flex items-center justify-center">
          <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Yan Mantovani</h1>
            <p class="text-gray-400">Desenvolvedor Frontend Freelancer</p>
            <p class="text-gray-500 mt-4">Carregando conteúdo...</p>
          </div>
        </div>
      `;
    }

    // Injetar HTML renderizado
    const html = htmlTemplate.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    // Headers importantes para SEO
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    res.status(200).send(html);
  } catch (e) {
    console.error('[SSR] Erro crítico:', e);
    console.error('[SSR] Stack:', e.stack);
    
    // Tentar retornar HTML básico mesmo com erro
    try {
      const { template: htmlTemplate } = await initialize();
      const fallbackHtml = `
        <div class="min-h-screen bg-black text-white flex items-center justify-center">
          <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Yan Mantovani</h1>
            <p class="text-gray-400">Desenvolvedor Frontend Freelancer</p>
            <p class="text-gray-500 mt-4">Por favor, recarregue a página.</p>
          </div>
        </div>
      `;
      const html = htmlTemplate.replace(
        `<div id="root"></div>`,
        `<div id="root">${fallbackHtml}</div>`
      );
      res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    } catch (fallbackError) {
      console.error('[SSR] Erro no fallback:', fallbackError);
      res.status(500).setHeader('Content-Type', 'text/plain').send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }
}

