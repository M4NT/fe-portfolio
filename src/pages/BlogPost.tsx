import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPost } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const post = getPost(slug || '');
  if (!post) return <div className="text-white p-8">Post não encontrado.</div>;

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    console.log('Navegando para:', path); // Debug
    
    if (path === '/') {
      // Navega para home e vai pro topo
      window.location.href = '/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/#')) {
      // Para âncoras, primeiro vai pra home
      const anchor = path.substring(2); // Remove /#
      window.location.href = '/';
      // Aguarda o carregamento e depois faz scroll
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          const navHeight = 80; // Altura da navbar
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else if (path === '/blog') {
      navigate('/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[language],
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Yan Mantovani' },
    image: post.cover ? [`https://yanmantovani.com${post.cover}`] : undefined,
    mainEntityOfPage: `https://yanmantovani.com/blog/${post.slug}`,
  } as any;

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
    
    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li class="blog-li">.*?<\/li>\s*)+/gs, (match) => {
      return `<ul class="blog-ul">${match}</ul>`;
    });
    
    // Process HTML tables
    html = html.replace(/<div class="blog-table">([\s\S]*?)<\/div>/g, (match, tableContent) => {
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
    setMeta('og:type', 'article');
    setMeta('og:title', post.title[language]);
    setMeta('og:url', url);
    if (post.cover) setMeta('og:image', `https://yanmantovani.com${post.cover}`);
  }, [language, post]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Animated Background - EXACT COPY FROM HERO */}
      <div className="absolute inset-0 overflow-hidden">
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
      {/* Navigation Header - Same as main site */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={(e) => handleNavigation(e, '/')}
              className="text-white font-bold text-xl hover:text-white/80 transition-colors"
            >
              Yan Mantovani
            </button>
            <div className="flex items-center gap-6">
              <button 
                onClick={(e) => handleNavigation(e, '/#works')}
                className="text-white/70 hover:text-white transition-colors"
              >
                {language === 'pt' ? 'Portfólio' : language === 'en' ? 'Portfolio' : 'Portafolio'}
              </button>
              <button 
                onClick={(e) => handleNavigation(e, '/blog')}
                className="text-white/70 hover:text-white transition-colors"
              >
                Blog
              </button>
              <button 
                onClick={(e) => handleNavigation(e, '/#contact')}
                className="text-white/70 hover:text-white transition-colors"
              >
                {language === 'pt' ? 'Contato' : language === 'en' ? 'Contact' : 'Contacto'}
              </button>
            </div>
          </div>
        </div>
      </nav>

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
          color: white;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .blog-h2 {
          font-size: 2rem;
          font-weight: 600;
          color: white;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .blog-h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
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
          color: #f59e0b;
          font-weight: 600;
        }
        
        .blog-ul {
          margin: 1.5rem 0;
          padding-left: 0;
          list-style: none;
        }
        
        .blog-li {
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.75rem;
        }
        
        .blog-li::before {
          content: '•';
          position: absolute;
          left: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: bold;
        }
        
        .blog-content a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: underline;
          text-decoration-color: rgba(255, 255, 255, 0.3);
          text-underline-offset: 2px;
          transition: all 0.3s ease;
        }
        
        .blog-content a:hover {
          color: white;
          text-decoration-color: white;
        }
        
        .blog-content::selection {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        .blog-content blockquote {
          border-left: 2px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: rgba(255, 255, 255, 0.02);
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .blog-table {
          margin: 2rem 0;
          overflow-x: auto;
        }
        
        .blog-table table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .blog-table th {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
          color: white;
          font-weight: 600;
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .blog-table td {
          color: rgba(255, 255, 255, 0.8);
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .blog-table tr:last-child td {
          border-bottom: none;
        }
        
        .blog-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
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
        }
      `}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="mb-8 text-white/50 text-sm">
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link> 
          <span className="mx-2">/</span> 
          <span className="text-white/70">{post.title[language]}</span>
        </nav>
        
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6">
          {post.title[language]}
        </h1>
        
        <div className="flex items-center gap-4 mb-10 text-white/60 text-sm">
          <span>{new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <span>•</span>
          <span>{post.tags.slice(0, 3).map((t) => `#${t}`).join(' ')}</span>
        </div>
        
        {post.cover && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-white/10">
            <img 
              src={post.cover} 
              alt={post.title[language]} 
              className="w-full h-[280px] md:h-[420px] object-cover" 
            />
          </div>
        )}
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        
        <div className="blog-content" dangerouslySetInnerHTML={renderContent(post.content[language])} />
        
        {/* CTA Section */}
        <div className="mt-16 mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {language === 'pt' ? 'Pronto para transformar sua ideia em realidade?' : 
             language === 'en' ? 'Ready to turn your idea into reality?' : 
             '¿Listo para convertir tu idea en realidad?'}
          </h3>
          <p className="text-white/70 text-lg mb-6 max-w-2xl">
            {language === 'pt' ? 'Vamos criar juntos uma solução digital que realmente converte e impressiona seus clientes.' : 
             language === 'en' ? "Let's create together a digital solution that truly converts and impresses your clients." : 
             'Creemos juntos una solución digital que realmente convierte e impresiona a tus clientes.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/#contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-300"
            >
              {language === 'pt' ? 'Solicitar Orçamento' : language === 'en' ? 'Request Quote' : 'Solicitar Presupuesto'}
            </Link>
            <Link 
              to="/#works" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              {language === 'pt' ? 'Ver Portfólio' : language === 'en' ? 'View Portfolio' : 'Ver Portafolio'}
            </Link>
          </div>
        </div>
        
        {/* Tags and Navigation */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/5 text-white/70 rounded-full text-sm border border-white/10">
                #{tag}
              </span>
            ))}
          </div>
          <Link 
            to="/blog" 
            className="text-white/70 hover:text-white transition-colors font-medium flex items-center gap-2"
          >
            ← {language === 'pt' ? 'Voltar para o blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}
          </Link>
        </div>
      </div>
    </article>
    
    <Footer />
    </div>
  );
}


