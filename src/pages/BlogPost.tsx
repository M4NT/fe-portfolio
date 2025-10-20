import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getPost } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';

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
    <article className="relative py-16 md:py-24 bg-black min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.875rem;
          color: rgba(255, 255, 255, 0.85);
        }
        
        .blog-h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .blog-h2 {
          font-size: 2rem;
          font-weight: 600;
          background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid rgba(6, 182, 212, 0.2);
          line-height: 1.3;
        }
        
        .blog-h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #06b6d4;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .blog-p {
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.875rem;
        }
        
        .blog-p:empty {
          display: none;
        }
        
        .blog-bold {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
        }
        
        .blog-italic {
          font-style: italic;
          color: rgba(255, 255, 255, 0.75);
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
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.75rem;
        }
        
        .blog-li::before {
          content: '▸';
          position: absolute;
          left: 0.5rem;
          color: #06b6d4;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.75rem;
          }
          
          .blog-h1 {
            font-size: 2rem;
          }
          
          .blog-h2 {
            font-size: 1.625rem;
          }
          
          .blog-h3 {
            font-size: 1.25rem;
          }
        }
      `}} />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <nav className="mb-8 text-white/50 text-sm">
          <Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link> 
          <span className="mx-2">/</span> 
          <span className="text-white/70">{post.title[language]}</span>
        </nav>
        
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                #{tag}
              </span>
            ))}
          </div>
          <Link 
            to="/blog" 
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-2"
          >
            ← {language === 'pt' ? 'Voltar para o blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}
          </Link>
        </div>
      </div>
    </article>
  );
}


