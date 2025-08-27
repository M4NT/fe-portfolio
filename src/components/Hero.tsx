import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, MessageCircle, Clock, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const scrollToNext = () => {
    const worksSection = document.getElementById('works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Particle system for background
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10
  }));

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%),
          linear-gradient(180deg, #000000 0%, #0a0a0a 100%)
        `
      }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated particle system */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full hidden md:block"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 md:w-32 h-20 md:h-32 border border-white/10 rounded-lg hidden md:block"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 md:w-24 h-16 md:h-24 border border-white/10 rounded-full hidden md:block"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
          }}
        />

        {/* Dynamic grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02] hidden md:block"
          style={{ y }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </motion.div>

        {/* Enhanced noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] noise-bg hidden md:block"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, white 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, white 0.5px, transparent 0.5px)
            `,
            backgroundSize: '80px 80px, 120px 120px, 60px 60px'
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
        style={{ opacity, scale }}
      >
        {/* Location & Time Info */}
        <motion.div 
          className="mb-8 md:mb-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="glass rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-3 sm:space-x-6 border border-white/20 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-white/70">
              <MapPin size={12} className="sm:hidden" />
              <MapPin size={14} className="hidden sm:block" />
              <span className="font-inter">{t('location.city')}, {t('location.state')}</span>
            </div>
            <div className="w-px h-3 sm:h-4 bg-white/20" />
            <div className="flex items-center space-x-2 text-white/70">
              <Clock size={12} className="sm:hidden" />
              <Clock size={14} className="hidden sm:block" />
              <span className="font-mono">{formatTime(currentTime)} BRT</span>
            </div>
            <div className="w-px h-3 sm:h-4 bg-white/20" />
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
                              <span className="text-green-400 font-inter hidden sm:inline">{t('contact.availableForWork')}</span>
              <span className="text-green-400 font-inter sm:hidden">Online</span>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.h1 
            className="font-inter font-light leading-none tracking-[-0.08em] text-white mb-6 md:mb-8 relative glow-text-soft overflow-hidden"
            style={{
              fontSize: 'clamp(3rem, 12vw, 12rem)',
              textShadow: '0 0 100px rgba(59, 130, 246, 0.3)'
            }}
            animate={{
              textShadow: [
                '0 0 100px rgba(59, 130, 246, 0.3)',
                '0 0 150px rgba(147, 51, 234, 0.4)',
                '0 0 100px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.span
              className=""
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
              }}
            >
              <span className="glow-text-soft">Yan</span>
            </motion.span>
            <motion.span 
              className="text-white/40 mx-2 md:mx-4"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              —
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent glow-text-gradient overflow-hidden"
              style={{
                transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              .m
            </motion.span>

            {/* Floating elements around text */}
            <motion.div
              className="absolute -top-4 md:-top-8 -left-4 md:-left-8 w-3 h-3 md:w-4 md:h-4 border border-blue-400/50 rounded-full hidden md:block"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 w-4 h-4 md:w-6 md:h-6 border border-purple-400/50 rounded-lg hidden md:block"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.h1>

          {/* Enhanced subtitle */}
          <motion.div 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4 md:mb-6">
              <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-blue-400" />
              <Sparkles className="text-blue-400" size={14} />
              <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-purple-400" />
            </div>
            
            <h2 className="font-inter font-light text-lg sm:text-2xl lg:text-4xl text-white/80 leading-relaxed max-w-4xl mx-auto px-4 break-words">
              <motion.span
                className="glow-text-soft"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                {t('hero.subtitle')}
              </motion.span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent glow-text-gradient overflow-hidden "
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {t('hero.creativeDeveloper')}
              </motion.span>
            </h2>

            <p className="text-white/60 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-inter px-4 break-words">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <motion.a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                scrollToNext();
              }}
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium tracking-wide overflow-hidden magnetic text-center glow-button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{t('hero.cta')}</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
              
              {/* Hover effect */}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/60 to-white/30 opacity-0"
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '120%', opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.23,1,0.32,1] }}
                  style={{ filter: 'blur(8px)' }}
                />
              </span>
            </motion.a>

            <motion.a
              href="https://wa.me/5516992233365"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white/10 transition-all duration-300 magnetic text-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center space-x-2">
                <MessageCircle size={16} />
                <span>{t('nav.getInTouch')}</span>
              </span>
            </motion.a>
          </div>

          {/* Chat AI Promo */}
          <motion.div
            className="flex items-center justify-center space-x-3 text-white/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm text-center">Chat with YAN.AI to learn about my work & methodology</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden sm:block"
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>
      {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center space-y-3 text-white/40 hover:text-white/60 transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span className="text-xs uppercase tracking-wider font-inter">
              {t('hero.scroll')}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
    </section>
  );
};

export default Hero;