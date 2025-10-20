import { Link } from 'react-router-dom';
import { posts } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';

export default function BlogIndex() {
  const { language } = useLanguage();
  return (
    <section id="blog" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-white text-4xl md:text-5xl font-light mb-8">Blog</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition">
              {p.cover && (
                <div className="h-40 w-full overflow-hidden">
                  <img src={p.cover} alt={p.title[language]} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-white text-2xl mb-2 leading-tight">{p.title[language]}</h2>
                <p className="text-white/70 mb-3">{p.excerpt[language]}</p>
                <span className="text-white/50 text-sm">{new Date(p.date).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


