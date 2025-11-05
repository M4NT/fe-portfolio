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

    // Renderizar o app no servidor
    const appHtml = renderFn(url);

    // Injetar HTML renderizado
    const html = htmlTemplate.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    res.status(200).setHeader('Content-Type', 'text/html').send(html);
  } catch (e) {
    console.error('Erro SSR:', e);
    res.status(500).send('Erro interno do servidor');
  }
}

