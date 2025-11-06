import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getPost, type BlogPost } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega o post quando o slug mudar
  useEffect(() => {
    if (!slug) {
      setError('Slug não encontrado');
      setIsLoading(false);
      setPost(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPost(null);

    // Carregar post de forma síncrona
    const loadedPost = getPost(slug);
    // Log apenas no cliente para debug
    if (typeof console !== 'undefined' && console.log) {
      console.log('Buscando post com slug:', slug);
      console.log('Post encontrado?', !!loadedPost);
    }
    
    if (loadedPost) {
      setPost(loadedPost);
      setError(null);
      setIsLoading(false);
    } else {
      setError(`Post "${slug}" não encontrado`);
      setPost(null);
      setIsLoading(false);
    }
  }, [slug]);

  // Força scroll ao topo quando a página carrega (apenas no cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Valores do post - calcular com segurança
  const postSlug = post?.slug || '';
  const postTitle = post?.title?.[language] || post?.title?.pt || '';
  const postExcerpt = post?.excerpt?.[language] || post?.excerpt?.pt || '';
  const postCover = post?.cover || '';
  const postDate = post?.date || '';
  const postTagsStr = post?.tags && Array.isArray(post.tags) && post.tags.length > 0 ? post.tags.join(',') : '';

  // Memoize structured data
  const structuredData = useMemo(() => {
    if (!post) return null;
    
    const content = post.content?.[language] || post.content?.pt || '';
    const wordCount = content ? content.split(/\s+/).filter(w => w.trim().length > 0).length : 0;

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: postTitle,
      description: postExcerpt,
      datePublished: postDate,
      dateModified: postDate,
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
      image: postCover ? [`https://yanmantovani.com${postCover}`] : undefined,
      mainEntityOfPage: `https://yanmantovani.com/blog/${postSlug}`,
      url: `https://yanmantovani.com/blog/${postSlug}`,
      keywords: postTagsStr || 'desenvolvimento web, frontend, design',
      articleSection: 'Technology',
      wordCount: wordCount,
      inLanguage: language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES'
    };
  }, [post, language, postTitle, postExcerpt, postCover, postDate, postSlug, postTagsStr]);

  // Adicionar JSON-LD script (apenas no cliente)
  useEffect(() => {
    if (!structuredData || typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-post-schema';
    script.textContent = JSON.stringify(structuredData);
    
    // Remove script antigo se existir
    const oldScript = document.getElementById('blog-post-schema');
    if (oldScript && oldScript.parentNode) {
      oldScript.parentNode.removeChild(oldScript);
    }
    
    if (document.head) {
      document.head.appendChild(script);
    }
    
    return () => {
      const scriptToRemove = document.getElementById('blog-post-schema');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [structuredData]);

  // Adicionar estilos do blog no head (apenas no cliente)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const blogStyles = `
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
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'blog-post-styles';
    styleElement.textContent = blogStyles;
    
    // Remove estilo antigo se existir
    const oldStyle = document.getElementById('blog-post-styles');
    if (oldStyle && oldStyle.parentNode) {
      oldStyle.parentNode.removeChild(oldStyle);
    }
    
    if (document.head) {
      document.head.appendChild(styleElement);
    }
    
    return () => {
      const styleToRemove = document.getElementById('blog-post-styles');
      if (styleToRemove && styleToRemove.parentNode) {
        styleToRemove.parentNode.removeChild(styleToRemove);
      }
    };
  }, []);

  // Dynamic head tags (title, canonical, OG) for SPA (apenas no cliente)
  useEffect(() => {
    if (!postSlug || !post || typeof document === 'undefined') return;

    const url = `https://yanmantovani.com/blog/${postSlug}`;
    if (document.title !== undefined) {
      document.title = `${postTitle} | Yan Mantovani`;
    }
    
    if (!document.head) return;
    
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
    const description = postExcerpt || `${postTitle} - Desenvolvimento web e design por Yan Mantovani`;
    setMeta('description', description);
    setMeta('og:description', description);
    
    // Open Graph tags
    setMeta('og:type', 'article');
    setMeta('og:title', postTitle);
    setMeta('og:url', url);
    setMeta('og:description', description);
    if (postCover) setMeta('og:image', `https://yanmantovani.com${postCover}`);
    
    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', postTitle);
    setMeta('twitter:description', description);
    if (postCover) setMeta('twitter:image', `https://yanmantovani.com${postCover}`);
    
    // Article specific tags
    setMeta('article:author', 'Yan Mantovani');
    setMeta('article:published_time', postDate);
    setMeta('article:modified_time', postDate);
    
    // Keywords based on tags
    if (postTagsStr && typeof postTagsStr === 'string' && postTagsStr.length > 0) {
      try {
        const keywords = postTagsStr.split(',').join(', ') + ', desenvolvimento web, frontend, design, landing page';
        setMeta('keywords', keywords);
      } catch (e) {
        console.error('Erro ao processar keywords:', e);
      }
    }
  }, [postSlug, language, postTitle, postExcerpt, postCover, postDate, postTagsStr, post]);

  // AGORA SIM, podemos fazer os returns condicionais DEPOIS de todos os hooks
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-gray-400 mb-6">{error || `O post "${slug}" não foi encontrado.`}</p>
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

  const renderContent = (src: string) => {
    if (!src || typeof src !== 'string') {
      return <div className="blog-content"><p>Conteúdo não disponível.</p></div>;
    }
    
    // Limitar tamanho do conteúdo para evitar problemas de memória
    const maxLength = 1000000; // 1MB
    const safeSrc = src.length > maxLength ? src.substring(0, maxLength) : src;
    
    const lines = safeSrc.split('\n');
    
    // Limitar número de linhas para evitar problemas de renderização
    const maxLines = 10000;
    const safeLines = lines.length > maxLines ? lines.slice(0, maxLines) : lines;
    
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key++} className="blog-ul">
            {currentList.map((item, index) => (
              <li key={index} className="blog-li">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    for (const line of safeLines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={key++} className="blog-h3">{trimmed.slice(4)}</h3>);
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={key++} className="blog-h2">{trimmed.slice(3)}</h2>);
      } else if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={key++} className="blog-h1">{trimmed.slice(2)}</h1>);
      } else if (trimmed.startsWith('- ')) {
        currentList.push(trimmed.slice(2));
      } else if (trimmed === '') {
        flushList();
        if (elements.length > 0 && elements[elements.length - 1].type !== 'br') {
          elements.push(<br key={key++} />);
        }
      } else if (trimmed) {
        flushList();
        // Process inline formatting
        const processedLine = processInlineFormatting(trimmed);
        elements.push(<p key={key++} className="blog-p">{processedLine}</p>);
      }
    }
    
    flushList();
    return <div className="blog-content">{elements}</div>;
  };

  const processInlineFormatting = (text: string) => {
    // Process bold, italic, and other inline formatting
    if (!text || typeof text !== 'string' || text.length === 0) {
      return text;
    }
    
    // Limitar tamanho do texto para evitar problemas
    const maxTextLength = 10000;
    const safeText = text.length > maxTextLength ? text.substring(0, maxTextLength) : text;
    
    const parts: (string | JSX.Element)[] = [];
    let remaining = safeText;
    let partKey = 0;
    let iterations = 0;
    const maxIterations = 1000; // Prevenir loops infinitos

    while (remaining.length > 0 && iterations < maxIterations) {
      iterations++;
      // Check for ***bold***
      const boldMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/);
      if (boldMatch) {
        parts.push(<strong key={partKey++} className="blog-important">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Check for **bold**
      const boldMatch2 = remaining.match(/^\*\*(.+?)\*\*/);
      if (boldMatch2) {
        parts.push(<strong key={partKey++} className="blog-bold">{boldMatch2[1]}</strong>);
        remaining = remaining.slice(boldMatch2[0].length);
        continue;
      }

      // Check for *italic*
      const italicMatch = remaining.match(/^\*(.+?)\*/);
      if (italicMatch) {
        parts.push(<em key={partKey++} className="blog-italic">{italicMatch[1]}</em>);
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Check for highlights
      const highlightMatch = remaining.match(/^(ROI médio de 300%|investimento estratégico|conversões até 3 vezes maiores|reduz em 40%|aumenta em 25%)/);
      if (highlightMatch) {
        parts.push(<span key={partKey++} className="blog-highlight">{highlightMatch[1]}</span>);
        remaining = remaining.slice(highlightMatch[1].length);
        continue;
      }

      // Regular text
      const nextSpecial = remaining.search(/[\*\#]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Se o próximo caractere especial está na posição 0 mas não foi capturado,
        // adiciona o caractere e avança para evitar loop infinito
        parts.push(remaining[0] || '');
        remaining = remaining.slice(1);
      } else {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
      
      // Verificação de segurança: se remaining não foi reduzido, forçar avanço
      if (remaining.length >= safeText.length && iterations > 1) {
        parts.push(remaining);
        break;
      }
    }

    return parts.length > 0 ? parts : [safeText];
  };

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
        {!isLoading && post && Array.from({ length: 8 }).map((_, i) => {
          const colors = ['bg-green-400/40', 'bg-emerald-400/40', 'bg-teal-400/40', 'bg-cyan-400/40'];
          const colorIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[colorIndex] || colors[0];
          
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
          
          const position = positions[i % positions.length] || positions[0];
          
          // Garantir valores válidos para duration
          const randomDuration = Math.random();
          const duration = isNaN(randomDuration) || !isFinite(randomDuration) ? 15 : 12 + (randomDuration * 6);
          
          // Garantir valores válidos para animação x
          const getRandomX = (max: number) => {
            const val = Math.random() * max - (max / 2);
            return isNaN(val) || !isFinite(val) ? 0 : val;
          };
          
          const xValues = [
            0,
            getRandomX(20),
            getRandomX(30),
            getRandomX(40),
            getRandomX(50),
            getRandomX(60)
          ];
          
          // Garantir delay válido
          const randomDelay = Math.random();
          const delay = isNaN(randomDelay) || !isFinite(randomDelay) ? 0 : randomDelay * 8;
          
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
                x: xValues
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      <Navigation />

      <article className="relative py-16 md:py-24 bg-black">
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
          <span className="text-white/70 line-clamp-1">{post.title?.[language] || post.title?.pt || 'Artigo'}</span>
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
              {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0].toUpperCase() : 'ARTIGO'}
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
            {post.title?.[language] || post.title?.pt || ''}
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
            {post.tags && Array.isArray(post.tags) ? post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-teal-400/70">#{tag}</span>
            )) : null}
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
                  alt={post.title?.[language] || post.title?.pt || 'Artigo'} 
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
        
        
        {post && post.content && post.content[language] && typeof post.content[language] === 'string' && post.content[language].length > 0 ? renderContent(post.content[language]) : (
          <div className="blog-content">
            <p className="text-white/60 italic">
              {language === 'pt' ? 'Conteúdo não disponível neste idioma.' : 
               language === 'en' ? 'Content not available in this language.' : 
               'Contenido no disponible en este idioma.'}
            </p>
          </div>
        )}
        
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
            {post.tags && Array.isArray(post.tags) ? post.tags.map((tag, idx) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 bg-white/5 text-white/70 rounded-full text-sm border border-white/10 hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-400 transition-all duration-300 cursor-default"
              >
                #{tag}
              </motion.span>
            )) : null}
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


