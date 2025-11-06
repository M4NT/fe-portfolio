import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { posts } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ChevronDown } from 'lucide-react';

export default function BlogIndex() {
  const { language } = useLanguage();
  const [sortBy, setSortBy] = useState('newest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  // Força scroll ao topo quando a página carrega (apenas no cliente)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Scroll imediato
    window.scrollTo(0, 0);
    
    // Scroll suave adicional para garantir
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  // SEO Meta tags para Blog Index (apenas no cliente)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    try {
      const title = language === 'pt' ? 'Blog - Desenvolvimento Web e Design | Yan Mantovani' : 
                    language === 'en' ? 'Blog - Web Development and Design | Yan Mantovani' : 
                    'Blog - Desarrollo Web y Diseño | Yan Mantovani';
    
    const description = language === 'pt' ? 'Artigos sobre desenvolvimento web, design e landing pages. Dicas, tutoriais e insights para criar sites que convertem.' :
                        language === 'en' ? 'Articles about web development, design and landing pages. Tips, tutorials and insights to create converting websites.' :
                        'Artículos sobre desarrollo web, diseño y landing pages. Consejos, tutoriales e insights para crear sitios que convierten.';
    
    if (document.title !== undefined) {
      document.title = title;
    }
    
    if (!document.head) return;
    
    // Meta description
    let metaDesc = document.head.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
    
    // Open Graph tags
    const setMeta = (property: string, content: string) => {
      let m = document.head.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('property', property);
        document.head.appendChild(m);
      }
      m.content = content;
    };
    
    setMeta('og:type', 'website');
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', 'https://yanmantovani.com/blog');
    
    // Twitter Card
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    
    // Keywords
    const keywords = 'desenvolvimento web, frontend, design, landing page, blog, tutoriais, dicas, conversão, SEO, performance';
    let metaKeywords = document.head.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Structured Data (JSON-LD) para Blog Index
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: title,
      description: description,
      url: 'https://yanmantovani.com/blog',
      author: {
        '@type': 'Person',
        name: 'Yan Mantovani',
        url: 'https://yanmantovani.com',
        jobTitle: 'Frontend Developer & Digital Artist'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Yan Mantovani',
        url: 'https://yanmantovani.com'
      },
      inLanguage: language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES',
      blogPost: (() => {
        try {
          const sorted = [...posts];
          sorted.sort((a, b) => {
            try {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            } catch (e) {
              return 0;
            }
          });
          return sorted.slice(0, 5).map(post => ({
            '@type': 'BlogPosting',
            headline: post.title[language] || post.title.pt || '',
            description: post.excerpt[language] || post.excerpt.pt || '',
            datePublished: post.date,
            url: `https://yanmantovani.com/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Yan Mantovani'
            }
          }));
        } catch (error) {
          return [];
        }
      })()
    };
    
    // Remove existing structured data
    if (document.head) {
      const existingScript = document.head.querySelector('script[type="application/ld+json"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
      
      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    } catch (error) {
      // Log apenas no cliente
      if (typeof console !== 'undefined' && console.error) {
        console.error('Error setting up SEO meta tags:', error);
      }
    }
  }, [language, sortBy]);

  // Scroll ao topo quando mudar o filtro (apenas no cliente)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortBy]);

  // Fechar dropdown quando clicar fora (apenas no cliente)
  useEffect(() => {
    if (typeof document === 'undefined' || !isDropdownOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Função para ordenar posts - memoizada e segura para SSR
  const getSortedPosts = () => {
    try {
      const sortedPosts = [...posts];
      
      switch (sortBy) {
        case 'newest':
          return sortedPosts.sort((a, b) => {
            try {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            } catch (e) {
              return 0;
            }
          });
        case 'oldest':
          return sortedPosts.sort((a, b) => {
            try {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            } catch (e) {
              return 0;
            }
          });
        case 'title':
          return sortedPosts.sort((a, b) => {
            try {
              const titleA = a.title[language] || a.title.pt || '';
              const titleB = b.title[language] || b.title.pt || '';
              return titleA.localeCompare(titleB);
            } catch (e) {
              return 0;
            }
          });
        default:
          return sortedPosts;
      }
    } catch (error) {
      // Log apenas no cliente
      if (typeof console !== 'undefined' && console.error) {
        console.error('Error in getSortedPosts:', error);
      }
      return posts; // Fallback to original posts
    }
  };

  const sortOptions = [
    { value: 'newest', label: { pt: 'Mais Recentes', en: 'Newest', es: 'Más Recientes' } },
    { value: 'oldest', label: { pt: 'Mais Antigos', en: 'Oldest', es: 'Más Antiguos' } },
    { value: 'title', label: { pt: 'Título A-Z', en: 'Title A-Z', es: 'Título A-Z' } }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Animated Background - EXACT COPY FROM HERO */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs - More vibrant */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-500/20 sm:from-blue-500/25 to-purple-500/20 sm:to-purple-500/25 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-pink-500/20 sm:from-pink-500/25 to-orange-500/20 sm:to-orange-500/25 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional accent orbs */}
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 blur-2xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Additional colorful orbs */}
        <motion.div 
          className="absolute top-1/6 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          className="absolute bottom-1/6 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -25, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated lines - EXACT COPY FROM HERO */}
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          animate={{ 
            y: [-100, 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
          animate={{ 
            y: [-100, 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div 
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/15 to-transparent"
          animate={{
            x: [100, -100],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Subtle grid pattern - EXACT COPY FROM HERO */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(30deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(150deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Animated gradient overlay - EXACT COPY FROM HERO */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles - EXACT COPY FROM HERO */}
        {[...Array(8)].map((_, i) => {
          const colors = ['bg-green-400/40', 'bg-emerald-400/40', 'bg-teal-400/40', 'bg-cyan-400/40'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          
          // Posições mais controladas (não totalmente aleatórias)
          const positions = [
            { left: '10%', top: '20%' },
            { left: '85%', top: '70%' },
            { left: '20%', top: '60%' },
            { left: '75%', top: '30%' },
            { left: '50%', top: '15%' },
            { left: '30%', top: '80%' },
            { left: '90%', top: '40%' },
            { left: '60%', top: '85%' }
          ];
          
          const position = positions[i % positions.length];
          const duration = 12 + Math.random() * 6; // 12-18 segundos
          
          // Aplicar blur em 40% das bolinhas (índices pares)
          const shouldBlur = i % 2 === 0;
          const blurClass = shouldBlur ? 'blur-sm' : '';
          const sizeClass = shouldBlur ? 'w-4 h-4' : 'w-3 h-3';
          
          return (
            <motion.div
              key={i}
              className={`absolute ${sizeClass} ${randomColor} rounded-full ${blurClass}`}
              style={{
                left: position.left,
                top: position.top,
              }}
              animate={{
                opacity: [0, 0.8, 0.8, 0.8, 0.8, 0],
                scale: [0, 1, 1, 1, 1, 0],
                y: [0, -10, -20, -30, -40, -50],
                x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15, Math.random() * 40 - 20, Math.random() * 50 - 25, Math.random() * 60 - 30]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      <Navigation />

    <section id="blog" className="relative py-24 md:py-32 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header modernizado */}
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
            <span className="text-sm font-medium bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {language === 'pt' ? 'BLOG' : language === 'en' ? 'BLOG' : 'BLOG'}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {language === 'pt' ? 'Últimas Publicações' : language === 'en' ? 'Latest Posts' : 'Últimas Publicaciones'}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto"
          >
            {language === 'pt' ? 'Insights, dicas e estratégias sobre desenvolvimento web, design e conversão de landing pages.' : 
             language === 'en' ? 'Insights, tips and strategies about web development, design and landing page conversion.' : 
             'Ideas, consejos y estrategias sobre desarrollo web, diseño y conversión de landing pages.'}
          </motion.p>
        </div>
        
        {/* Filtro de ordenação */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative dropdown-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-white font-medium">
                {language === 'pt' ? 'Ordenar por:' : language === 'en' ? 'Sort by:' : 'Ordenar por:'}
              </span>
              <span className="text-teal-400 font-medium">
                {sortOptions.find(option => option.value === sortBy)?.label[language]}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-white/60 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {/* Dropdown */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden z-50"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 ${
                      sortBy === option.value 
                        ? 'bg-teal-500/20 text-teal-400' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {option.label[language]}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Grid de posts modernizado */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSortedPosts().map((p, idx) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={`/blog/${p.slug}`} 
                className="group blog-card block h-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-teal-500/30 hover:bg-white/10 transition-all duration-300 flex flex-col"
              >
                {/* Imagem de capa */}
                {p.cover && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="w-full h-full overflow-hidden rounded-t-2xl">
                      <img 
                        src={p.cover} 
                        alt={p.title[language]} 
                        className="w-full h-full object-cover" 
                        style={{ 
                          borderRadius: '1rem 1rem 0 0',
                          transform: 'none !important',
                          transition: 'none !important',
                          animation: 'none !important',
                          willChange: 'auto !important',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block'
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 rounded-t-2xl"></div>
                    {/* Badge de categoria */}
                    <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-medium text-white">
                        {p.tags[0]?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                      <span>
                        {(() => {
                          try {
                            const date = new Date(p.date);
                            if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
                              return date.toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              });
                            }
                            // Fallback para formato simples
                            const day = date.getDate().toString().padStart(2, '0');
                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                            const year = date.getFullYear();
                            return `${day}/${month}/${year}`;
                          } catch (error) {
                            return p.date.split('T')[0]; // Fallback para data ISO
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Título */}
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {p.title[language]}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-white/70 mb-8 line-clamp-2 leading-relaxed text-sm flex-grow">
                    {p.excerpt[language]}
                  </p>
                  
                  {/* CTA - Fixado no final */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 text-teal-400 font-medium group-hover:gap-3 transition-all duration-300 text-sm">
                      <span>{language === 'pt' ? 'Ler artigo' : language === 'en' ? 'Read article' : 'Leer artículo'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    
                    {/* Decorative gradient line */}
                    <div className="mt-3 h-1 w-full bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
    <Footer />
    </div>
  );
}


