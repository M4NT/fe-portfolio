import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, MessageCircle, Clock, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  // Mouse position removido para 120fps - sem parallax nas partículas
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Desabilitado scroll transforms para 120fps - muito custo de recálculo
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start start", "end start"]
  // });
  // const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  // const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking removido completamente para 120fps
  // useEffect(() => {
  //   // Código de mouse tracking desabilitado
  // }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };


  // Particle system - otimizado para 120fps (apenas 6 partículas)
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 25 + 15 // Animações mais lentas = menos recálculos
  }));

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-0"
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
              <div className="absolute inset-0">
        {/* Animated particle system - CSS only para 120fps */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/20 rounded-full hidden md:block animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.id * 0.3}s`
            }}
          />
        ))}

        {/* Floating geometric shapes - completamente fixas para 120fps */}
        <div
          className="absolute top-1/4 left-1/4 w-20 md:w-32 h-20 md:h-32 border border-white/10 rounded-lg hidden md:block animate-spin-slow"
        />
        
        <div
          className="absolute bottom-1/4 right-1/4 w-16 md:w-24 h-16 md:h-24 border border-white/10 rounded-full hidden md:block animate-spin-reverse"
        />

        {/* Static grid - sem animação para 120fps */}
        <div 
          className="absolute inset-0 opacity-[0.015] hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Simplified static noise - sem animação */}
        <div 
          className="absolute inset-0 opacity-[0.01] hidden md:block"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 140px 140px'
          }}
        />
      </div>

      {/* Main Content */}
      <div 
        className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 hero-mobile-spacing"
        style={{
          overflow: 'visible',
          maxWidth: '100vw',
          paddingTop: '2rem',
          paddingBottom: '3rem'
        }}
      >
        {/* Location & Time Info - Melhorado com z-index correto */}
        <motion.div 
          className="mb-8 md:mb-12 flex justify-center"
          style={{
            marginTop: '20px',
            position: 'relative',
            zIndex: 40
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="glass rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center space-x-4 sm:space-x-6 border border-white/20 text-xs sm:text-sm backdrop-blur-md bg-black/20 shadow-lg">
            <div className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <MapPin size={14} className="sm:hidden" />
              <MapPin size={16} className="hidden sm:block" />
              <span className="font-inter font-medium">{t('location.city')}, {t('location.state')}</span>
            </div>
            <div className="w-px h-4 sm:h-5 bg-white/30" />
            <div className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <Clock size={14} className="sm:hidden" />
              <Clock size={16} className="hidden sm:block" />
              <span className="font-mono font-medium">{formatTime(currentTime)} BRT</span>
            </div>
            <div className="w-px h-4 sm:h-5 bg-white/30" />
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-green-400 font-inter font-medium hidden sm:inline">{t('contact.availableForWork')}</span>
              <span className="text-green-400 font-inter font-medium sm:hidden">Online</span>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.h1 
            className="font-inter font-light leading-none tracking-[-0.08em] text-white mb-8 md:mb-10 relative"
            style={{
              fontSize: 'clamp(3rem, 16vw, 12rem)',
              textShadow: '0 0 100px rgba(59, 130, 246, 0.3)',
              overflow: 'visible',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              wordBreak: 'keep-all',
              hyphens: 'none',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseEnter={(e) => {
              // Remove scrollbars de todos os elementos filhos
              const allElements = e.currentTarget.querySelectorAll('*');
              allElements.forEach(el => {
                (el as HTMLElement).style.overflow = 'visible';
                (el as HTMLElement).style.scrollbarWidth = 'none';
                (el as HTMLElement).style.msOverflowStyle = 'none';
              });
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
            <span className="inline-block">
              <span className="glow-text-soft">Yan</span>
            </span>
            <motion.span 
              className="text-white/40 inline-block mx-2 md:mx-4"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              —
            </motion.span>
            <span
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent glow-text-gradient"
            >
              .m
            </span>

            {/* Floating elements around text - Visíveis no mobile também */}
            <motion.div
              className="absolute -top-2 md:-top-4 -left-2 md:-left-4 w-2 h-2 md:w-3 md:h-3 border border-blue-400/50 rounded-full"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-3 h-3 md:w-4 md:h-4 border border-purple-400/50 rounded-lg"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 -left-6 md:-left-8 w-1 h-1 md:w-2 md:h-2 bg-green-400/60 rounded-full"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/4 -right-4 md:-right-6 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400/40 rounded-full"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.h1>

          {/* Enhanced subtitle */}
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 md:space-x-6 mb-6 md:mb-8">
              <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-blue-400" />
              <Sparkles className="text-blue-400" size={16} />
              <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-purple-400" />
            </div>
            
            <h2 className="font-inter font-light text-lg sm:text-2xl lg:text-4xl text-white/80 leading-relaxed max-w-4xl mx-auto px-4">
              <motion.span
                className="inline-block glow-text-soft"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                {t('hero.subtitle')}
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent glow-text-gradient"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {t('hero.creativeDeveloper')}
              </motion.span>
            </h2>

            {/* <p className="text-white/60 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-inter px-4">
              {t('hero.subtitle')}
            </p> */}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="space-y-8 md:space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 px-4">
            <motion.a
              href="#works"
              className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium tracking-wide overflow-hidden magnetic text-center glow-button text-base md:text-lg"
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
              className="group w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white/10 transition-all duration-300 magnetic text-center text-base md:text-lg"
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
            className="flex items-center justify-center space-x-3 md:space-x-4 text-white/60 px-4 mt-8 md:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs md:text-sm text-center leading-relaxed">Chat with YAN.AI to learn about my work & methodology</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden md:block"
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default React.memo(Hero);