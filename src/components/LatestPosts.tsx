import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { posts } from '../blog/posts';
import { useLanguage } from './LanguageContext';
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import { useState } from 'react';

export default function LatestPosts() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  
  // Função para ordenar posts
  const getSortedPosts = () => {
    const sortedPosts = [...posts];
    
    switch (sortBy) {
      case 'newest':
        return sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sortedPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'title':
        return sortedPosts.sort((a, b) => a.title[language].localeCompare(b.title[language]));
      default:
        return sortedPosts;
    }
  };

  const sortedPosts = getSortedPosts();
  const postsPerView = 3;
  const totalSlides = Math.ceil(sortedPosts.length / postsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);
  
  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    // Scroll suave ao topo da seção
    setTimeout(() => {
      const element = document.getElementById('latest-posts');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    // Scroll suave ao topo da seção
    setTimeout(() => {
      const element = document.getElementById('latest-posts');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  // Função para obter os posts da página atual
  const getCurrentPagePosts = () => {
    const startIndex = currentIndex * postsPerView;
    const endIndex = startIndex + postsPerView;
    return sortedPosts.slice(startIndex, endIndex);
  };
  
  const currentPagePosts = getCurrentPagePosts();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', options);
  };
  return (
    <section id="latest-posts" className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="subtle" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-teal-300 text-sm font-medium">
              {language === 'pt' ? 'Blog' : language === 'en' ? 'Blog' : 'Blog'}
            </span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="font-inter font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight text-white mb-4 lg:mb-6">
                <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-400 bg-clip-text text-transparent">
                  {language === 'pt' ? 'Últimos Artigos' : language === 'en' ? 'Latest Posts' : 'Últimos Artículos'}
                </span>
              </h2>
              
              <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
                {language === 'pt' && (
                  <>
                    Dicas, tutoriais e insights sobre <span className="text-teal-400 font-semibold">desenvolvimento web</span> e 
                    <span className="text-cyan-400 font-semibold"> design</span>.
                  </>
                )}
                {language === 'en' && (
                  <>
                    Tips, tutorials and insights about <span className="text-teal-400 font-semibold">web development</span> and 
                    <span className="text-cyan-400 font-semibold"> design</span>.
                  </>
                )}
                {language === 'es' && (
                  <>
                    Consejos, tutoriales e insights sobre <span className="text-teal-400 font-semibold">desarrollo web</span> y 
                    <span className="text-cyan-400 font-semibold"> diseño</span>.
                  </>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Sort Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                >
                  <option value="newest">
                    {language === 'pt' ? 'Mais Recentes' : language === 'en' ? 'Newest' : 'Más Recientes'}
                  </option>
                  <option value="oldest">
                    {language === 'pt' ? 'Mais Antigos' : language === 'en' ? 'Oldest' : 'Más Antiguos'}
                  </option>
                  <option value="title">
                    {language === 'pt' ? 'Título A-Z' : language === 'en' ? 'Title A-Z' : 'Título A-Z'}
                  </option>
                </select>
              </motion.div>

              {/* View All Button */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block"
              >
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-xl text-teal-300 font-medium hover:from-teal-500/30 hover:to-cyan-500/30 hover:border-teal-500/50 hover:text-teal-200 transition-all duration-300 group"
                >
                  <span>{language === 'pt' ? 'Ver Todos' : language === 'en' ? 'View All' : 'Ver Todos'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Posts Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden max-w-7xl mx-auto">
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {currentPagePosts.map((p, index) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-1/3"
                >
              <Link 
                to={`/blog/${p.slug}`} 
                className="group block h-full px-3"
              >
                <motion.div
                  className="relative overflow-hidden h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300 flex flex-col group-hover:-translate-y-2"
                  style={{ borderRadius: '1rem' }}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-t-2xl" style={{ borderRadius: '1rem 1rem 0 0' }}>
                    <div className="w-full h-full overflow-hidden relative" style={{ borderRadius: '1rem 1rem 0 0' }}>
                      {p.cover ? (
                        <img 
                          src={p.cover} 
                          alt={p.title[language]} 
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          style={{ 
                            borderRadius: '1rem 1rem 0 0',
                            borderTopLeftRadius: '1rem',
                            borderTopRightRadius: '1rem',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            clipPath: 'inset(0 0 0 0 round 1rem 1rem 0 0)'
                          }}
                        />
                      ) : (
                        <div 
                          className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-600/30 to-cyan-600/30"
                          style={{ 
                            borderRadius: '1rem 1rem 0 0',
                            borderTopLeftRadius: '1rem',
                            borderTopRightRadius: '1rem'
                          }}
                        />
                      )}
                    </div>
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent rounded-t-2xl"
                      style={{ 
                        borderRadius: '1rem 1rem 0 0',
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem',
                        clipPath: 'inset(0 0 0 0 round 1rem 1rem 0 0)'
                      }}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium">
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      {language === 'pt' ? 'Artigo' : language === 'en' ? 'Article' : 'Artículo'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(p.date)}</span>
                    </div>
                    
                    <h3 className="text-white text-xl font-semibold leading-tight group-hover:text-teal-300 transition-colors mb-6 line-clamp-2">
                      {p.title[language]}
                    </h3>
                    
                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors flex-grow mb-6 line-clamp-3">
                      {p.excerpt[language]}
                    </p>
                    
                    {/* Read More */}
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-medium pt-4 border-t border-white/10">
                      <span>{language === 'pt' ? 'Ler artigo' : language === 'en' ? 'Read article' : 'Leer artículo'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </motion.div>
              </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index 
                        ? 'bg-teal-400 w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Page Info */}
              <div className="text-white/50 text-sm">
                {currentIndex + 1} / {totalSlides}
              </div>
              
              <motion.button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <motion.div 
          className="lg:hidden flex flex-col items-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Mobile Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
          >
            <option value="newest">
              {language === 'pt' ? 'Mais Recentes' : language === 'en' ? 'Newest' : 'Más Recientes'}
            </option>
            <option value="oldest">
              {language === 'pt' ? 'Mais Antigos' : language === 'en' ? 'Oldest' : 'Más Antiguos'}
            </option>
            <option value="title">
              {language === 'pt' ? 'Título A-Z' : language === 'en' ? 'Title A-Z' : 'Título A-Z'}
            </option>
          </select>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 group"
            >
              <span>{language === 'pt' ? 'Ver Todos os Artigos' : language === 'en' ? 'View All Posts' : 'Ver Todos los Artículos'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


