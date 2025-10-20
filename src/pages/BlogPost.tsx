import { useParams } from 'react-router-dom';
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

  return (
    <article className="relative py-16 md:py-24 bg-black">
      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        <h1 className="text-white text-4xl md:text-5xl font-light mb-6">{post.title[language]}</h1>
        <p className="text-white/60 mb-10">{new Date(post.date).toLocaleDateString()}</p>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content[language].replace(/\n/g, '<br/>') }} />
      </div>
    </article>
  );
}


