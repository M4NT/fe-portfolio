import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPost } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function BlogPost() {
  console.log('BlogPost - Componente iniciado');
  
  const { slug } = useParams();
  console.log('BlogPost - slug do useParams:', slug);
  
  const { language } = useLanguage();
  console.log('BlogPost - language do context:', language);
  
  // TESTE DIRETO - SEM FUNÇÃO
  console.log('BlogPost - Testando getPost diretamente...');
  let post;
  try {
    post = getPost(slug || '');
    console.log('BlogPost - getPost executado, resultado:', !!post);
  } catch (error) {
    console.error('BlogPost - ERRO no getPost:', error);
    return <div className="text-white p-8">ERRO no getPost: {String(error)}</div>;
  }
  
  console.log('BlogPost - post final:', post);
  
  // Verificação básica do slug
  if (!slug) {
    console.log('BlogPost - slug é undefined');
    return <div className="text-white p-8">Slug não encontrado.</div>;
  }
  
  // Força scroll ao topo quando a página carrega
  useEffect(() => {
    // Scroll imediato
    window.scrollTo(0, 0);
    
    // Scroll suave adicional para garantir
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [slug]);

  if (!post) {
    console.log('BlogPost - Post não encontrado para slug:', slug);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-gray-400 mb-6">O post "{slug}" não foi encontrado.</p>
          <p className="text-gray-500 mb-4">Debug: {JSON.stringify({ slug, language, postFound: !!post })}</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            ← Voltar ao Blog
          </Link>
        </div>
      </div>
    );
  }

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[language],
    description: post.excerpt[language],
    datePublished: post.date,
    dateModified: post.date,
    author: { 
      '@type': 'Person', 
      name: 'Yan Mantovani',
      url: 'https://yanmantovani.com',
      jobTitle: 'Frontend Developer & Digital Artist'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yan Mantovani',
      url: 'https://yanmantovani.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yanmantovani.com/logo.png'
      }
    },
    image: post.cover ? [`https://yanmantovani.com${post.cover}`] : undefined,
    mainEntityOfPage: `https://yanmantovani.com/blog/${post.slug}`,
    url: `https://yanmantovani.com/blog/${post.slug}`,
    keywords: post.tags ? post.tags.join(', ') : 'desenvolvimento web, frontend, design',
    articleSection: 'Technology',
    wordCount: post.content[language].split(' ').length,
    inLanguage: language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES'
  } as any;

  // Adicionar JSON-LD script
  useEffect(() => {
    if (post) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [post, ld]);

  const renderContent = (src: string) => {
    // Transform markdown to HTML with better structure
    let html = src
      .replace(/^###\s+(.*)$/gm, '<h3 class="blog-h3">$1</h3>')
      .replace(/^##\s+(.*)$/gm, '<h2 class="blog-h2">$1</h2>')
      .replace(/^#\s+(.*)$/gm, '<h1 class="blog-h1">$1</h1>')
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="blog-important">$1</strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="blog-bold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="blog-italic">$1</em>')
      .replace(/^\-\s+(.*)$/gm, '<li class="blog-li">$1</li>')
      .replace(/\n\n/g, '</p><p class="blog-p">')
      .replace(/^(.+)$/gm, (match) => {
        if (!match.startsWith('<')) return `<p class="blog-p">${match}</p>`;
        return match;
      });
    
    // SANITIZAÇÃO: Remover qualquer script tag que possa causar React Error #61
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    html = html.replace(/<script\b[^>]*>/gi, '');
    html = html.replace(/<\/script>/gi, '');
    
    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li class="blog-li">.*?<\/li>\s*)+/gs, (match) => {
      return `<ul class="blog-ul">${match}</ul>`;
    });
    
    // Process HTML tables
    html = html.replace(/<div class="blog-table">([\s\S]*?)<\/div>/g, (_match, tableContent) => {
      return `<div class="blog-table">${tableContent}</div>`;
    });
    
    // Add highlight classes to important phrases
    html = html.replace(/(ROI médio de 300%)/g, '<span class="blog-highlight">$1</span>');
    html = html.replace(/(investimento estratégico)/g, '<span class="blog-highlight">$1</span>');
    html = html.replace(/(conversões até 3 vezes maiores)/g, '<span class="blog-highlight">$1</span>');
    html = html.replace(/(reduz em 40%)/g, '<span class="blog-highlight">$1</span>');
    html = html.replace(/(aumenta em 25%)/g, '<span class="blog-highlight">$1</span>');
    
    return { __html: html };
  };

  // Dynamic head tags (title, canonical, OG) for SPA
  useEffect(() => {
    const url = `https://yanmantovani.com/blog/${post.slug}`;
    document.title = `${post.title[language]} | Yan Mantovani`;
    const ensure = (selector: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el as HTMLElement;
    };
    const canon = ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }) as HTMLLinkElement;
    canon.href = url;

    const setMeta = (property: string, content: string) => {
      let m = document.head.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('property', property);
        document.head.appendChild(m);
      }
      m.content = content;
    };
    // Meta description
    const description = post.excerpt[language] || `${post.title[language]} - Desenvolvimento web e design por Yan Mantovani`;
    setMeta('description', description);
    setMeta('og:description', description);
    
    // Open Graph tags
    setMeta('og:type', 'article');
    setMeta('og:title', post.title[language]);
    setMeta('og:url', url);
    setMeta('og:description', description);
    if (post.cover) setMeta('og:image', `https://yanmantovani.com${post.cover}`);
    
    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', post.title[language]);
    setMeta('twitter:description', description);
    if (post.cover) setMeta('twitter:image', `https://yanmantovani.com${post.cover}`);
    
    // Article specific tags
    setMeta('article:author', 'Yan Mantovani');
    setMeta('article:published_time', post.date);
    setMeta('article:modified_time', post.date);
    
    // Keywords based on tags
    if (post.tags && post.tags.length > 0) {
      const keywords = post.tags.join(', ') + ', desenvolvimento web, frontend, design, landing page';
      setMeta('keywords', keywords);
    }
  }, [language, post]);

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

      <article className="relative py-16 md:py-24 bg-black">
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.875rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
        }
        
        .blog-h1 {
          font-size: 2.5rem;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        .blog-h2 {
          font-size: 2rem;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.85) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        .blog-h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        .blog-p {
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.875rem;
        }
        
        .blog-p:empty {
          display: none;
        }
        
        .blog-p:first-of-type {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        .blog-bold {
          font-weight: 600;
          color: white;
        }
        
        .blog-italic {
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .blog-highlight {
          color: #60a5fa;
          font-weight: 600;
        }
        
        .blog-important {
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }
        
        .blog-ul {
          margin: 1.5rem 0;
          padding-left: 0;
          list-style: none;
        }
        
        .blog-li {
          margin-bottom: 0.75rem;
          padding-left: 2rem;
          position: relative;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.75rem;
        }
        
        .blog-li::before {
          content: '▸';
          position: absolute;
          left: 0.5rem;
          background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .blog-content a {
          color: #14b8a6;
          text-decoration: underline;
          text-decoration-color: rgba(20, 184, 166, 0.3);
          text-underline-offset: 3px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          color: #06b6d4;
          text-decoration-color: #06b6d4;
        }
        
        .blog-content::selection {
          background: rgba(20, 184, 166, 0.3);
          color: white;
        }
        
        .blog-content blockquote {
          border-left: 3px solid #14b8a6;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
          border-radius: 0.5rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .blog-table {
          margin: 2rem 0;
          overflow-x: auto;
          border-radius: 1rem;
        }
        
        .blog-table table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .blog-table th {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
          color: white;
          font-weight: 600;
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid rgba(20, 184, 166, 0.3);
        }
        
        .blog-table td {
          color: rgba(255, 255, 255, 0.8);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .blog-table tr:last-child td {
          border-bottom: none;
        }
        
        .blog-table tr:hover {
          background: rgba(20, 184, 166, 0.05);
        }
        
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.75rem;
          }
          
          .blog-h1 {
            font-size: 2rem;
            margin-top: 2rem;
          }
          
          .blog-h2 {
            font-size: 1.75rem;
            margin-top: 2rem;
          }
          
          .blog-h3 {
            font-size: 1.25rem;
            margin-top: 1.5rem;
          }
          
          .blog-p:first-of-type {
            font-size: 1.125rem;
          }
          
          .blog-li {
            padding-left: 1.5rem;
          }
        }
      `}} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb modernizado */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-white/50 text-sm"
        >
          <Link to="/blog" className="hover:text-teal-400 transition-colors flex items-center gap-1">
            <span>←</span>
            <span>Blog</span>
          </Link> 
          <span>/</span> 
          <span className="text-white/70 line-clamp-1">{post.title[language]}</span>
        </motion.nav>
        
        {/* Badge de categoria */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 inline-flex"
        >
          <div className="px-4 py-2 rounded-full border border-teal-500/30 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {post.tags[0]?.toUpperCase()}
            </span>
          </div>
        </motion.div>
        
        {/* Título com gradiente */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 break-words"
        >
          <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            {post.title[language]}
          </span>
        </motion.h1>
        
        {/* Meta info modernizada */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-10 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            <span>{new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-teal-400/70">#{tag}</span>
            ))}
          </div>
        </motion.div>
        
        {/* Imagem de capa modernizada */}
        {post.cover && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="w-full h-[280px] md:h-[420px] overflow-hidden rounded-2xl">
                <img 
                  src={post.cover} 
                  alt={post.title[language]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  style={{ 
                    borderRadius: '1rem',
                    transform: 'none !important',
                    transition: 'transform 0.7s ease !important'
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </motion.div>
        )}
        
        
        <div className="blog-content" dangerouslySetInnerHTML={renderContent(post.content[language])} />
        
        {/* CTA Section modernizada */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-12 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Decorative orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 mb-4">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                <span className="text-xs font-medium text-teal-400">
                  {language === 'pt' ? 'Vamos Conversar' : language === 'en' ? "Let's Talk" : 'Hablemos'}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {language === 'pt' ? 'Pronto para transformar sua ideia em realidade?' : 
                   language === 'en' ? 'Ready to turn your idea into reality?' : 
                   '¿Listo para convertir tu idea en realidad?'}
                </span>
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl">
                {language === 'pt' ? 'Vamos criar juntos uma solução digital que realmente converte e impressiona seus clientes.' : 
                 language === 'en' ? "Let's create together a digital solution that truly converts and impresses your clients." : 
                 'Creemos juntos una solución digital que realmente convierte e impresiona a tus clientes.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/#contact" 
                  className="group/btn inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>{language === 'pt' ? 'Solicitar Orçamento' : language === 'en' ? 'Request Quote' : 'Solicitar Presupuesto'}</span>
                  <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
                <Link 
                  to="/#works" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  {language === 'pt' ? 'Ver Portfólio' : language === 'en' ? 'View Portfolio' : 'Ver Portafolio'}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tags and Navigation modernizadas */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 bg-white/5 text-white/70 rounded-full text-sm border border-white/10 hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-400 transition-all duration-300 cursor-default"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
          <Link 
            to="/blog" 
            className="group inline-flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors font-medium rounded-lg hover:bg-white/5"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>{language === 'pt' ? 'Voltar para o blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}</span>
          </Link>
        </motion.div>
      </div>
    </article>
    
    <Footer />
    </div>
  );
}


