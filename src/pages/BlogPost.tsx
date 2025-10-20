import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getPost } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const post = getPost(slug || '');
  if (!post) return <div className="text-white p-8">Post não encontrado.</div>;

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
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="text-cyan-400">$1</strong>')
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
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="text-white font-bold text-xl hover:text-blue-400 transition-colors"
            >
              Yan Mantovani
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                to="/#works" 
                className="text-white/70 hover:text-blue-400 transition-colors"
              >
                {language === 'pt' ? 'Portfólio' : language === 'en' ? 'Portfolio' : 'Portafolio'}
              </Link>
              <Link 
                to="/blog" 
                className="text-white/70 hover:text-blue-400 transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/#contact" 
                className="text-white/70 hover:text-blue-400 transition-colors"
              >
                {language === 'pt' ? 'Contato' : language === 'en' ? 'Contact' : 'Contacto'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <article className="relative py-16 md:py-24 bg-black">
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content {
          font-size: 1.125rem;
          line-height: 2rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }
        
        .blog-h1 {
          font-size: 2.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 4rem;
          margin-bottom: 2rem;
          line-height: 1.2;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .blog-h1::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 3px;
        }
        
        .blog-h2 {
          font-size: 2.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 4rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid rgba(59, 130, 246, 0.25);
          line-height: 1.3;
          position: relative;
        }
        
        .blog-h2::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 3px;
        }
        
        .blog-h3 {
          font-size: 1.625rem;
          font-weight: 600;
          color: #3b82f6;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.4;
          padding-left: 1rem;
          border-left: 3px solid #3b82f6;
        }
        
        .blog-p {
          margin-bottom: 1.75rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 2rem;
          text-align: justify;
          hyphens: auto;
        }
        
        .blog-p:empty {
          display: none;
        }
        
        .blog-p:first-of-type {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
        }
        
        .blog-bold {
          font-weight: 700;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
        }
        
        .blog-italic {
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .blog-ul {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
          background: rgba(59, 130, 246, 0.03);
          border-left: 3px solid rgba(59, 130, 246, 0.3);
          padding: 1.5rem 1rem 1.5rem 2rem;
          border-radius: 0 8px 8px 0;
        }
        
        .blog-li {
          margin-bottom: 1rem;
          padding-left: 2rem;
          position: relative;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.875rem;
        }
        
        .blog-li::before {
          content: '◆';
          position: absolute;
          left: 0.5rem;
          color: #3b82f6;
          font-weight: bold;
          font-size: 0.875rem;
        }
        
        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-color: rgba(59, 130, 246, 0.3);
          text-underline-offset: 3px;
          transition: all 0.3s ease;
        }
        
        .blog-content a:hover {
          color: #8b5cf6;
          text-decoration-color: #8b5cf6;
        }
        
        /* Efeito de reading progress */
        .blog-content::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
        
        /* Destaque para citações */
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.95);
        }
        
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1.0625rem;
            line-height: 1.875rem;
          }
          
          .blog-h1 {
            font-size: 2rem;
            margin-top: 3rem;
          }
          
          .blog-h2 {
            font-size: 1.75rem;
            margin-top: 3rem;
          }
          
          .blog-h3 {
            font-size: 1.375rem;
            margin-top: 2rem;
          }
          
          .blog-p {
            text-align: left;
          }
          
          .blog-p:first-of-type {
            font-size: 1.125rem;
          }
        }
      `}} />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <nav className="mb-8 text-white/50 text-sm">
          <Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link> 
          <span className="mx-2">/</span> 
          <span className="text-white/70">{post.title[language]}</span>
        </nav>
        
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {post.title[language]}
        </h1>
        
        <div className="flex items-center gap-4 mb-10 text-white/60">
          <span>{new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <span>•</span>
          <span>{post.tags.slice(0, 3).map((t) => `#${t}`).join(' ')}</span>
        </div>
        
        {post.cover && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10">
            <img 
              src={post.cover} 
              alt={post.title[language]} 
              className="w-full h-[280px] md:h-[420px] object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
        )}
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        
        <div className="blog-content" dangerouslySetInnerHTML={renderContent(post.content[language])} />
        
        {/* CTA Section */}
        <div className="mt-16 mb-12 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {language === 'pt' ? 'Pronto para transformar sua ideia em realidade?' : 
               language === 'en' ? 'Ready to turn your idea into reality?' : 
               '¿Listo para convertir tu idea en realidad?'}
            </h3>
            <p className="text-white/80 text-lg mb-6 max-w-2xl">
              {language === 'pt' ? 'Vamos criar juntos uma solução digital que realmente converte e impressiona seus clientes.' : 
               language === 'en' ? "Let's create together a digital solution that truly converts and impresses your clients." : 
               'Creemos juntos una solución digital que realmente convierte e impresiona a tus clientes.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/#contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              >
                {language === 'pt' ? 'Iniciar Projeto' : language === 'en' ? 'Start Project' : 'Iniciar Proyecto'}
              </Link>
              <Link 
                to="/#works" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/50"
              >
                {language === 'pt' ? 'Ver Portfólio' : language === 'en' ? 'View Portfolio' : 'Ver Portafolio'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Tags and Navigation */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
          <Link 
            to="/blog" 
            className="text-blue-400 hover:text-purple-400 transition-colors font-medium flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {language === 'pt' ? 'Voltar para o blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}
          </Link>
        </div>
      </div>
    </article>
    
    <Footer />
    </div>
  );
}


