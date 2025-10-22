interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export const updateSEO = (config: SEOConfig) => {
  const {
    title,
    description,
    image = '/og-image.png',
    url = window.location.href,
    type = 'website',
    keywords = [],
    author = 'Yan Mantovani',
    publishedTime,
    modifiedTime,
    section,
    tags = []
  } = config;

  // Title
  document.title = title;

  // Meta tags básicas
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords.join(', '));
  updateMetaTag('author', author);

  // Open Graph (Facebook, LinkedIn)
  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:image', image.startsWith('http') ? image : `${window.location.origin}${image}`, 'property');
  updateMetaTag('og:url', url, 'property');
  updateMetaTag('og:type', type, 'property');
  updateMetaTag('og:site_name', 'Yan Mantovani - Web Developer', 'property');
  updateMetaTag('og:locale', 'pt_BR', 'property');

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image.startsWith('http') ? image : `${window.location.origin}${image}`);
  updateMetaTag('twitter:creator', '@yanmantovani');
  updateMetaTag('twitter:site', '@yanmantovani');

  // Article specific (para blog posts)
  if (type === 'article') {
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, 'property');
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, 'property');
    }
    if (section) {
      updateMetaTag('article:section', section, 'property');
    }
    if (tags.length > 0) {
      // Remove tags antigas
      document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());
      // Adiciona novas tags
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }
    updateMetaTag('article:author', author, 'property');
  }

  // Canonical URL
  updateLinkTag('canonical', url);

  // Robots
  updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Google Site Verification (se necessário)
  // updateMetaTag('google-site-verification', 'seu-codigo-aqui');
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
};

// Schema.org JSON-LD
export const generateJSONLD = (data: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  
  // Remove script antigo se existir
  const oldScript = document.querySelector('script[type="application/ld+json"]');
  if (oldScript) {
    oldScript.remove();
  }
  
  document.head.appendChild(script);
};

// Breadcrumb Schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// Person Schema
export const generatePersonSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yan Mantovani',
    url: 'https://yanmantovani.com',
    image: 'https://yanmantovani.com/og-image.png',
    sameAs: [
      'https://github.com/yanmantovani',
      'https://linkedin.com/in/yanmantovani',
      'https://twitter.com/yanmantovani'
    ],
    jobTitle: 'Full Stack Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelancer'
    }
  };
};

// Website Schema
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yan Mantovani - Web Developer',
    url: 'https://yanmantovani.com',
    description: 'Desenvolvedor Web Full Stack especializado em React, Node.js e soluções personalizadas',
    publisher: {
      '@type': 'Person',
      name: 'Yan Mantovani'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yanmantovani.com/blog?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
};

