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
    // transform headings and bullets for better readability without a full MD parser
    let html = src
      .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
      .replace(/^\-\s+(.*)$/gm, '<p>• $1</p>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
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
    <article className="relative py-16 md:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6 lg:px-0">
        <nav className="mb-6 text-white/50 text-sm"><Link to="/blog" className="hover:text-white">Blog</Link> / <span className="text-white/70">{post.title[language]}</span></nav>
        <h1 className="text-white text-3xl md:text-5xl font-light leading-tight mb-4">{post.title[language]}</h1>
        <p className="text-white/50 mb-8">{new Date(post.date).toLocaleDateString()}</p>
        {post.cover && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-white/10">
            <img src={post.cover} alt={post.title[language]} className="w-full h-[220px] md:h-[360px] object-cover" />
          </div>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <div className="prose prose-invert max-w-none prose-headings:font-inter prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4 prose-p:text-white/80 prose-li:text-white/80" dangerouslySetInnerHTML={renderContent(post.content[language])} />
        <div className="mt-10 flex items-center justify-between text-white/60 text-sm">
          <span>{post.tags.map((t) => `#${t}`).join(' ')}</span>
          <Link to="/blog" className="hover:text-white">← {language === 'pt' ? 'Voltar para o blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}</Link>
        </div>
      </div>
    </article>
  );
}


