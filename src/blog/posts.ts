export type BlogPost = {
  slug: string;
  title: { pt: string; en: string; es: string };
  excerpt: { pt: string; en: string; es: string };
  date: string; // ISO
  tags: string[];
  cover?: string;
  content: { pt: string; en: string; es: string };
};

export const posts: BlogPost[] = [
  {
    slug: 'quanto-custa-landing-page-2025',
    title: {
      pt: 'Quanto custa uma Landing Page em 2025? Guia de preço e valor',
      en: 'How much does a Landing Page cost in 2025? Price & value guide',
      es: '¿Cuánto cuesta una Landing Page en 2025? Guía de precio y valor',
    },
    excerpt: {
      pt: 'Entenda fatores que definem o investimento, faixas de preço e como medir ROI.',
      en: 'Understand factors that define investment, price ranges and how to measure ROI.',
      es: 'Entiende los factores que definen la inversión, rangos de precio y cómo medir ROI.',
    },
    date: new Date().toISOString(),
    tags: ['landing-page', 'preco', 'roi'],
    cover: '/og-image.png',
    content: {
      pt: `\n## Fatores que influenciam\nEscopo, prazo, copy, integrações e performance.\n\n## Faixas de preço (referenciais)\n- Essencial: R$ 1.500–2.500\n- Profissional: R$ 2.500–5.000\n- Performance: R$ 5.000+\n\n## Como medir valor/ROI\nConversões, ticket médio e tempo de payback.\n`,
      en: `\n## What affects price\nScope, deadline, copy, integrations and performance.\n\n## Price ranges\n- Essential: $300–$500\n- Professional: $500–$1k\n- Performance: $1k+\n\n## Measure value/ROI\nConversions, AOV and payback time.\n`,
      es: `\n## Factores de precio\nAlcance, plazo, copy, integraciones y rendimiento.\n\n## Rangos de precio\n- Esencial: $300–$500\n- Profesional: $500–$1k\n- Performance: $1k+\n\n## Medir el valor/ROI\nConversiones y tiempo de retorno.\n`,
    },
  },
  {
    slug: 'etapas-para-lancar-seu-site',
    title: {
      pt: 'Do rascunho à realidade: as 4 etapas para lançar seu site',
      en: 'From sketch to launch: the 4 steps to ship your site',
      es: 'Del boceto al lanzamiento: 4 pasos para publicar tu sitio',
    },
    excerpt: {
      pt: 'Descoberta, Proposta, Execução e Go‑live & Suporte — simples e transparente.',
      en: 'Discovery, Proposal, Execution and Go‑live & Support — simple and transparent.',
      es: 'Descubrimiento, Propuesta, Ejecución y Go‑live & Soporte — simple y transparente.',
    },
    date: new Date().toISOString(),
    tags: ['processo', 'metodologia'],
    cover: '/og-image.png',
    content: {
      pt: `\n## 1) Descoberta\nObjetivos, prazo e métricas.\n\n## 2) Proposta\nEscopo, cronograma e investimento.\n\n## 3) Execução\nDesign + dev com checkpoints.\n\n## 4) Go‑live & Suporte\nPublicação e 30 dias de suporte.\n`,
      en: `\n## 1) Discovery\nGoals, timeline and metrics.\n\n## 2) Proposal\nScope, schedule, budget.\n\n## 3) Execution\nDesign + dev with checkpoints.\n\n## 4) Go‑live & Support\nLaunch and 30‑day support.\n`,
      es: `\n## 1) Descubrimiento\nMetas, plazos y métricas.\n\n## 2) Propuesta\nAlcance, cronograma e inversión.\n\n## 3) Ejecución\nDiseño + dev con checkpoints.\n\n## 4) Go‑live y Soporte\nLanzamiento y 30 días de soporte.\n`,
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

