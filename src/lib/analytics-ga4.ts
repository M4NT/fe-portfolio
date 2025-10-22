// Google Analytics 4 Implementation

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Substitua pelo seu ID do GA4

// Inicializar GA4
export const initGA4 = () => {
  if (typeof window === 'undefined') return;

  // Verifica se já foi inicializado
  if (window.gtag) return;

  // Cria o script do GA4
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Inicializa o dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  console.log('✅ Google Analytics 4 inicializado');
};

// Rastrear page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
  });

  console.log('📊 Page view tracked:', url);
};

// Eventos customizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });

  console.log('📊 Event tracked:', { action, category, label, value });
};

// Eventos específicos do portfolio
export const trackPortfolioEvents = {
  // Navegação
  clickNavLink: (linkName: string) => {
    trackEvent('click', 'navigation', linkName);
  },

  // Projetos
  viewProject: (projectName: string) => {
    trackEvent('view_project', 'projects', projectName);
  },

  clickProjectLink: (projectName: string, linkType: 'live' | 'github') => {
    trackEvent('click_project_link', 'projects', `${projectName} - ${linkType}`);
  },

  // Blog
  viewBlogPost: (postSlug: string, postTitle: string) => {
    trackEvent('view_blog_post', 'blog', postSlug);
  },

  clickBlogCTA: (ctaType: string) => {
    trackEvent('click_blog_cta', 'blog', ctaType);
  },

  shareBlogPost: (postSlug: string, platform: string) => {
    trackEvent('share_blog_post', 'blog', `${postSlug} - ${platform}`);
  },

  // Contato
  submitContactForm: (formType: string = 'contact') => {
    trackEvent('submit_form', 'contact', formType);
  },

  clickEmail: () => {
    trackEvent('click_email', 'contact', 'email_link');
  },

  clickWhatsApp: () => {
    trackEvent('click_whatsapp', 'contact', 'whatsapp_link');
  },

  clickSocial: (platform: string) => {
    trackEvent('click_social', 'social', platform);
  },

  // Downloads
  downloadCV: () => {
    trackEvent('download', 'documents', 'cv');
  },

  // Scroll
  scrollToSection: (section: string) => {
    trackEvent('scroll_to_section', 'navigation', section);
  },

  // Language
  changeLanguage: (fromLang: string, toLang: string) => {
    trackEvent('change_language', 'settings', `${fromLang}_to_${toLang}`);
  },

  // Chat/AI
  openAIChat: () => {
    trackEvent('open_ai_chat', 'engagement', 'ai_sales_chat');
  },

  sendAIChatMessage: () => {
    trackEvent('send_ai_message', 'engagement', 'ai_sales_chat');
  },

  // Engagement
  timeOnPage: (seconds: number, page: string) => {
    trackEvent('time_on_page', 'engagement', page, seconds);
  }
};

// Rastrear conversões
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: `${GA_MEASUREMENT_ID}/${conversionId}`,
    value: value,
    currency: 'BRL'
  });

  console.log('🎯 Conversion tracked:', conversionId);
};

// Rastrear erros
export const trackError = (error: Error, errorInfo?: any) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description: error.message,
    fatal: false,
    error_stack: error.stack,
    error_info: JSON.stringify(errorInfo)
  });

  console.error('❌ Error tracked:', error);
};

// User timing (performance)
export const trackTiming = (
  name: string,
  value: number,
  category: string = 'Performance'
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    name: name,
    value: value,
    event_category: category
  });

  console.log('⏱️ Timing tracked:', { name, value, category });
};

// Enhanced Ecommerce (se aplicável no futuro)
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'BRL',
    items: items
  });

  console.log('💰 Purchase tracked:', transactionId);
};

