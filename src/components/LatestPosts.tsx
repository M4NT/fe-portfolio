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
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition">
              {/* Cover */}
              <div className="relative h-36 md:h-40 w-full overflow-hidden">
                {p.cover ? (
                  <img 
                    src={p.cover} 
                    alt={p.title[language]} 
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300" 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/30 to-purple-600/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              {/* Body */}
              <div className="p-5">
                <h3 className="text-white text-lg md:text-xl font-medium leading-snug mb-2">{p.title[language]}</h3>
                <p className="text-white/70 text-sm line-clamp-3">{p.excerpt[language]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


