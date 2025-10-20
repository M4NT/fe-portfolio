import { Link } from 'react-router-dom';
import { posts } from '../blog/posts';
import { useLanguage } from './LanguageContext';

export default function LatestPosts() {
  const { language } = useLanguage();
  const latest = posts.slice(0, 3);
  return (
    <section id="latest-posts" className="relative py-16 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-light">{language === 'pt' ? 'Últimos artigos' : language === 'en' ? 'Latest posts' : 'Últimos artículos'}</h2>
          <Link to="/blog" className="text-white/70 hover:text-white text-sm">{language === 'pt' ? 'Ver todos' : language === 'en' ? 'View all' : 'Ver todos'}</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
              <h3 className="text-white mb-2">{p.title[language]}</h3>
              <p className="text-white/70 text-sm">{p.excerpt[language]}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


