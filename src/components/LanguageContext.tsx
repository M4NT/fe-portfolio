import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    en: string;
    pt: string;
    es: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.selectedWorks': {
    en: 'Works',
    pt: 'Trabalhos Selecionados',
    es: 'Trabajos Seleccionados'
  },
  'nav.sideProjects': {
    en: 'Projects',
    pt: 'Projetos Pessoais',
    es: 'Proyectos Personales'
  },
  'nav.services': {
    en: 'Services',
    pt: 'Serviços',
    es: 'Services'
  },
  'nav.affiliates': {
    en: 'Refer & Save',
    pt: 'Indique e ganhe',
    es: 'Indica y gana'
  },
  'nav.about': {
    en: 'About',
    pt: 'Sobre',
    es: 'Acerca'
  },
  'nav.faq': {
    en: 'FAQ',
    pt: 'FAQ',
    es: 'FAQ'
  },
  'nav.contact': {
    en: 'Contact',
    pt: 'Contato',
    es: 'Contacto'
  },
  'nav.getInTouch': {
    en: 'Get In Touch',
    pt: 'Entre em Contato',
    es: 'Ponte en Contacto'
  },

  // Hero Section
  'hero.title': {
    en: 'YAN.M',
    pt: 'YAN.M',
    es: 'YAN.M'
  },
  'hero.subtitle': {
    en: 'Frontend Developer & Digital Artist',
    pt: 'Desenvolvedor Frontend & Artista Digital criando experiências imersivas que ultrapassam os limites da tecnologia web e narrativa visual.',
    es: 'Desarrollador Frontend & Artista Digital creando experiencias inmersivas que empujan los límites de la tecnología web y la narrativa visual.'
  },
  'hero.cta': {
    en: 'View Selected Works',
    pt: 'Ver Trabalhos Selecionados',
    es: 'Ver Trabajos Seleccionados'
  },
  'hero.scroll': {
    en: 'Scroll',
    pt: 'Rolar',
    es: 'Desplazar'
  },
  'hero.creativeDeveloper': {
    en: 'Creative Developer',
    pt: 'Desenvolvedor Criativo',
    es: 'Desarrollador Creativo'
  },
  'hero.basedIn': {
    en: 'Based in Monte Alto, SP',
    pt: 'Baseado em Monte Alto, SP',
    es: 'Basado en Monte Alto, SP'
  },
  'hero.coordinates': {
    en: '21.2614°S, 48.4977°W',
    pt: '21.2614°S, 48.4977°W',
    es: '21.2614°S, 48.4977°W'
  },

  // Location & Time
  'location.city': {
    en: 'Monte Alto',
    pt: 'Monte Alto',
    es: 'Monte Alto'
  },
  'location.state': {
    en: 'São Paulo',
    pt: 'São Paulo',
    es: 'São Paulo'
  },
  'location.country': {
    en: 'Brazil',
    pt: 'Brasil',
    es: 'Brasil'
  },
  'location.timezone': {
    en: 'BRT (UTC-3)',
    pt: 'BRT (UTC-3)',
    es: 'BRT (UTC-3)'
  },
  'location.coordinates': {
    en: '21.2614°S, 48.4977°W',
    pt: '21.2614°S, 48.4977°W',
    es: '21.2614°S, 48.4977°W'
  },

  // Selected Works
  'works.title': {
    en: 'SELECTED WORKS',
    pt: 'TRABALHOS SELECIONADOS',
    es: 'TRABAJOS SELECCIONADOS'
  },
  'works.subtitle': {
    en: 'Portfolio — Selected Works',
    pt: 'Portfólio — Trabalhos Selecionados',
    es: 'Portafolio — Trabajos Seleccionados'
  },
  'works.description': {
    en: 'Experience frontend mastery through projects that highlight modern practices and measurable results.',
    pt: 'Experimente domínio de frontend por meio de projetos que destacam práticas modernas e resultados mensuráveis.',
    es: 'Experimenta dominio de frontend a través de proyectos que destacan prácticas modernas y resultados medibles.'
  },
  'works.liveProject': {
    en: 'Live Project',
    pt: 'Projeto Ao Vivo',
    es: 'Proyecto en Vivo'
  },
  'works.sourceCode': {
    en: 'Source Code',
    pt: 'Código Fonte',
    es: 'Código Fuente'
  },
  'works.technologies': {
    en: 'Technologies',
    pt: 'Tecnologias',
    es: 'Tecnologías'
  },
  'works.previous': {
    en: 'Previous',
    pt: 'Anterior',
    es: 'Anterior'
  },
  'works.next': {
    en: 'Next',
    pt: 'Próximo',
    es: 'Siguiente'
  },

  // Side Projects
  'projects.title': {
    en: 'SIDE PROJECTS',
    pt: 'PROJETOS PESSOAIS',
    es: 'PROYECTOS PERSONALES'
  },
  'projects.subtitle': {
    en: 'Exploration — Side Projects',
    pt: 'Exploração — Projetos Pessoais',
    es: 'Exploración — Proyectos Personales'
  },
  'projects.featured': {
    en: 'Featured',
    pt: 'Destaque',
    es: 'Destacado'
  },

  // About
  'about.title': {
    en: 'ABOUT',
    pt: 'SOBRE',
    es: 'ACERCA'
  },
  'about.subtitle': {
    en: 'About — YAN.M',
    pt: 'Sobre — YAN.M',
    es: 'Acerca — YAN.M'
  },
  'about.availableForWork': {
    en: 'Available for Work',
    pt: 'Disponível para Trabalho',
    es: 'Disponible para Trabajo'
  },
  'about.projectsCompleted': {
    en: 'Projects Completed',
    pt: 'Projetos Concluídos',
    es: 'Proyectos Completados'
  },
  'about.yearsExperience': {
    en: 'Years Experience',
    pt: 'Anos de Experiência',
    es: 'Años de Experiencia'
  },
  'about.cupsOfCoffee': {
    en: 'Cups of Coffee',
    pt: 'Xícaras de Café',
    es: 'Tazas de Café'
  },
  'about.basedIn': {
    en: 'Based in',
    pt: 'Baseado em',
    es: 'Basado en'
  },
  'about.creativeDeveloper': {
    en: 'Creative Developer & Digital Artist',
    pt: 'Desenvolvedor Criativo & Artista Digital',
    es: 'Desarrollador Creativo & Artista Digital'
  },
  'about.description1': {
    en: "I'm a frontend developer passionate about creating immersive digital experiences that push the boundaries of what's possible on the web. With a background in both computer science and digital arts, I bridge the gap between technology and creativity.",
    pt: "Sou um desenvolvedor frontend apaixonado por criar experiências digitais imersivas que ultrapassam os limites do que é possível na web. Com formação em ciência da computação e artes digitais, faço a ponte entre tecnologia e criatividade.",
    es: "Soy un desarrollador frontend apasionado por crear experiencias digitales inmersivas que empujan los límites de lo posible en la web. Con formación en ciencias de la computación y artes digitales, construyo puentes entre tecnología y creatividad."
  },
  'about.description2': {
    en: 'My work focuses on interactive installations, real-time graphics, and cutting-edge web technologies. I believe in the power of code as a creative medium and strive to create experiences that inspire and engage users on a deeper level.',
    pt: 'Meu trabalho foca em instalações interativas, gráficos em tempo real e tecnologias web de ponta. Acredito no poder do código como meio criativo e me esforço para criar experiências que inspirem e envolvam usuários em um nível mais profundo.',
    es: 'Mi trabajo se centra en instalaciones interactivas, gráficos en tiempo real y tecnologías web de vanguardia. Creo en el poder del código como medio creativo y me esfuerzo por crear experiencias que inspiren e involucren a los usuarios en un nivel más profundo.'
  },
  'about.description3': {
    en: "When I'm not coding, you can find me exploring new technologies, experimenting with generative art, or collaborating with other creatives on ambitious projects that challenge conventional thinking.",
    pt: "Quando não estou programando, você pode me encontrar explorando novas tecnologias, experimentando com arte generativa ou colaborando com outros criativos em projetos ambiciosos que desafiam o pensamento convencional.",
    es: "Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, experimentando con arte generativo o colaborando con otros creativos en proyectos ambiciosos que desafían el pensamiento convencional."
  },
  'about.coreCompetencies': {
    en: 'Core Competencies',
    pt: 'Competências Principais',
    es: 'Competencias Principales'
  },
  'about.letsCreate': {
    en: "Let's Create Something Amazing",
    pt: 'Vamos Criar Algo Incrível',
    es: 'Creemos Algo Increíble'
  },
  'about.availableForProjects': {
    en: 'Available for new projects and collaborations',
    pt: 'Disponível para novos projetos e colaborações',
    es: 'Disponible para nuevos proyectos y colaboraciones'
  },

  // FAQ
  'faq.title': {
    en: 'FAQ',
    pt: 'FAQ',
    es: 'FAQ'
  },
  'faq.subtitle': {
    en: 'Questions — Frequently Asked',
    pt: 'Perguntas — Frequentes',
    es: 'Preguntas — Frecuentes'
  },
  'faq.stillHaveQuestions': {
    en: 'Still have questions?',
    pt: 'Ainda tem perguntas?',
    es: '¿Aún tienes preguntas?'
  },
  'faq.discussProject': {
    en: "I'd love to discuss your project and explore how we can create something extraordinary together.",
    pt: 'Adoraria discutir seu projeto e explorar como podemos criar algo extraordinário juntos.',
    es: 'Me encantaría discutir tu proyecto y explorar cómo podemos crear algo extraordinario juntos.'
  },

  // Contact
  'contact.title': {
    en: 'GET IN TOUCH',
    pt: 'ENTRE EM CONTATO',
    es: 'PONTE EN CONTACTO'
  },
  'contact.subtitle': {
    en: 'Contact — Let\'s Connect',
    pt: 'Contato — Vamos Conectar',
    es: 'Contacto — Conectemos'
  },
  'contact.description': {
    en: 'Ready to bring your vision to life? Let\'s discuss your project and create something extraordinary together that pushes the boundaries of digital experience.',
    pt: 'Pronto para dar vida à sua visão? Vamos discutir seu projeto e criar algo extraordinário juntos que ultrapasse os limites da experiência digital.',
    es: '¿Listo para dar vida a tu visión? Discutamos tu proyecto y creemos algo extraordinario juntos que empuje los límites de la experiencia digital.'
  },
  'contact.sendMessage': {
    en: 'Send a Message',
    pt: 'Enviar Mensagem',
    es: 'Enviar Mensaje'
  },
  'contact.yourName': {
    en: 'Your Name',
    pt: 'Seu Nome',
    es: 'Tu Nombre'
  },
  'contact.email': {
    en: 'Email Address',
    pt: 'Endereço de Email',
    es: 'Dirección de Email'
  },
  'contact.subject': {
    en: 'Project Subject',
    pt: 'Assunto do Projeto',
    es: 'Asunto del Proyecto'
  },
  'contact.message': {
    en: 'Message',
    pt: 'Mensagem',
    es: 'Mensaje'
  },
  'contact.messagePlaceholder': {
    en: 'Tell me about your project, vision, and goals...',
    pt: 'Conte-me sobre seu projeto, visão e objetivos...',
    es: 'Cuéntame sobre tu proyecto, visión y objetivos...'
  },
  'contact.sendButton': {
    en: 'Send Message',
    pt: 'Enviar Mensagem',
    es: 'Enviar Mensaje'
  },
  'contact.contactInfo': {
    en: 'Contact Information',
    pt: 'Informações de Contato',
    es: 'Información de Contacto'
  },
  'contact.connectOnline': {
    en: 'Connect Online',
    pt: 'Conectar Online',
    es: 'Conectar Online'
  },
  'contact.availableForWork': {
    en: 'Available for work',
    pt: 'Disponível para trabalho',
    es: 'Disponible para trabajo'
  },
  'contact.availabilityDescription': {
    en: 'Currently accepting new projects for Q2 2025. Let\'s discuss your vision and create something that sets new standards in digital experience.',
    pt: 'Atualmente aceitando novos projetos para Q2 2025. Vamos discutir sua visão e criar algo que estabeleça novos padrões na experiência digital.',
    es: 'Actualmente aceptando nuevos proyectos para Q2 2025. Discutamos tu visión y creemos algo que establezca nuevos estándares en la experiencia digital.'
  },

  // Footer
  'footer.description': {
    en: 'Frontend Developer & Digital Artist creating award-winning digital experiences that push the boundaries of web technology.',
    pt: 'Desenvolvedor Frontend & Artista Digital criando experiências digitais premiadas que ultrapassam os limites da tecnologia web.',
    es: 'Desarrollador Frontend & Artista Digital creando experiencias digitales galardonadas que empujan los límites de la tecnología web.'
  },
  'footer.navigation': {
    en: 'Navigation',
    pt: 'Navegação',
    es: 'Navegación'
  },
  'footer.allRightsReserved': {
    en: 'All rights reserved',
    pt: 'Todos os direitos reservados',
    es: 'Todos los derechos reservados'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isInitialized, setIsInitialized] = useState(false);

  // Detecta idioma automaticamente na inicialização
  useEffect(() => {
    const detectLanguage = (): Language => {
      // 1. Verifica se é página legal - NÃO REDIRECIONA
      const path = window.location.pathname;
      const legalPages = ['/privacy-policy', '/terms-of-use', '/cookie-policy'];
      const isLegalPage = legalPages.some(page => path.startsWith(page));
      
      if (isLegalPage) {
        // Para páginas legais, força PT e NÃO altera URL
        return 'pt';
      }

      // 2. Verifica URL path
      const urlLang = path.split('/')[1];
      if (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') {
        return urlLang;
      }

      // 3. Verifica localStorage
      const savedLang = localStorage.getItem('preferred-language') as Language;
      if (savedLang && ['pt', 'en', 'es'].includes(savedLang)) {
        return savedLang;
      }

      // 4. Detecta idioma do navegador
      const browserLang = navigator.language || (navigator as any).userLanguage || 'pt-BR';

      // Mapeia códigos de idioma do navegador
      const langMap: { [key: string]: Language } = {
        'pt': 'pt',
        'pt-BR': 'pt',
        'pt-PT': 'pt',
        'en': 'en',
        'en-US': 'en',
        'en-GB': 'en',
        'es': 'es',
        'es-ES': 'es',
        'es-MX': 'es',
        'es-AR': 'es'
      };

      return langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'pt';
    };

    const detected = detectLanguage();
    setLanguage(detected);
    setIsInitialized(true);
    
    // Salva preferência APENAS se não for página legal
    const path = window.location.pathname;
    const legalPages = ['/privacy-policy', '/terms-of-use', '/cookie-policy'];
    const isLegalPage = legalPages.some(page => path.startsWith(page));
    
    if (!isLegalPage) {
      localStorage.setItem('preferred-language', detected);
    }
  }, []);

  // Atualiza URL quando idioma muda
  useEffect(() => {
    if (!isInitialized) return;

    const currentPath = window.location.pathname;
    const legalPages = ['/privacy-policy', '/terms-of-use', '/cookie-policy'];
    const isLegalPage = legalPages.some(page => currentPath.startsWith(page));
    
    // NUNCA altera URL para páginas legais - BLOQUEIA COMPLETAMENTE
    if (isLegalPage) {
      console.log('Legal page detected - blocking URL changes');
      return;
    }

    const currentLang = currentPath.split('/')[1];
    
    // Remove idioma atual da URL se existir
    let newPath = currentPath;
    if (['pt', 'en', 'es'].includes(currentLang)) {
      newPath = currentPath.replace(`/${currentLang}`, '');
    }
    
    // Adiciona novo idioma (exceto para português que é o padrão)
    if (language !== 'pt') {
      newPath = `/${language}${newPath || '/'}`;
    }
    
    // Atualiza URL sem recarregar a página
    if (newPath !== currentPath) {
      window.history.replaceState({}, '', newPath);
    }
    
    // Salva preferência
    localStorage.setItem('preferred-language', language);
  }, [language, isInitialized]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};