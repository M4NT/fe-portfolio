import { Link } from 'react-router-dom';
import { posts } from '../blog/posts';
import { useLanguage } from '../components/LanguageContext';

export default function BlogIndex() {
  const { language } = useLanguage();
  return (
    <section id="blog" className="relative py-24 md:py-32 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {language === 'pt' ? 'Blog' : language === 'en' ? 'Blog' : 'Blog'}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl">
            {language === 'pt' ? 'Insights, dicas e estratégias sobre desenvolvimento web, design e conversão de landing pages.' : 
             language === 'en' ? 'Insights, tips and strategies about web development, design and landing page conversion.' : 
             'Ideas, consejos y estrategias sobre desarrollo web, diseño y conversión de landing pages.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((p, idx) => (
            <Link 
              key={p.slug} 
              to={`/blog/${p.slug}`} 
              className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {p.cover && (
                <div className="h-56 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img 
                    src={p.cover} 
                    alt={p.title[language]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-cyan-400 text-sm font-medium">
                    {new Date(p.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/50 text-sm">{p.tags[0]}</span>
                </div>
                
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                  {p.title[language]}
                </h2>
                
                <p className="text-white/70 mb-4 line-clamp-3 leading-relaxed">
                  {p.excerpt[language]}
                </p>
                
                <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                  <span>{language === 'pt' ? 'Ler artigo' : language === 'en' ? 'Read article' : 'Leer artículo'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


