import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Clock, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';
// import LiquidEther from './LiquidEther';
import { trackCTAClick } from '../lib/analytics';

const Hero = () => {
  // Mantemos a possibilidade de mostrar hora/local futuramente
  // const [currentTime, setCurrentTime] = useState(new Date());
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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking removido completamente para 120fps
  // useEffect(() => {
  //   // Código de mouse tracking desabilitado
  // }, []);

  // const formatTime = (date: Date) => {
  //   return date.toLocaleTimeString('pt-BR', {
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };




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
      {/* LiquidEther Background - Temporariamente desabilitado para debug */}
      {/* <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={15}
          cursorSize={80}
          isViscous={false}
          viscous={20}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
          takeoverDuration={0.25}
          autoResumeDelay={2000}
          autoRampDuration={0.4}
            style={{
            width: '100%', 
            height: '100%', 
            position: 'absolute',
            pointerEvents: 'none'
          }}
        />
      </div> */}


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
        {/* Feature highlight badge */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
            New
            <Sparkles className="w-4 h-4 ml-2 mr-1" />
            Creative Developer →
          </div>
        </motion.div>

      {/* Location & Time Info */}
      <motion.div 
        className="mb-8 md:mb-12 flex justify-center"
        style={{ marginTop: '20px', position: 'relative', zIndex: 40 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="glass rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center space-x-4 sm:space-x-6 border border-white/20 text-xs sm:text-sm backdrop-blur-md bg-black/20 shadow-lg">
          <div className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <MapPin size={16} />
            <span className="font-inter font-medium">{t('location.city')}, {t('location.state')}</span>
          </div>
          <div className="w-px h-5 bg-white/30" />
          <div className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <Clock size={16} />
            <span className="font-mono font-medium">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} BRT</span>
          </div>
          <div className="w-px h-5 bg-white/30" />
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

      {/* Main Content - Layout 2 colunas com cards */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 hero-mobile-spacing"
        style={{ overflow: 'visible', maxWidth: '100vw', paddingTop: '2rem', paddingBottom: '3rem' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Coluna esquerda - Apresentação */}
          <div className="text-left">
            <motion.h1 
              className="font-section-title leading-none text-white mb-8 relative"
              style={{
                fontSize: 'clamp(2.5rem, 12vw, 8rem)',
                textShadow: '0 0 100px rgba(59, 130, 246, 0.3)',
                overflow: 'visible'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
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
              <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent glow-text-gradient">
                .m
              </span>
            </motion.h1>

            <motion.p 
              className="font-text text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#works"
                onClick={() => trackCTAClick('view_works', 'hero', '#works')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium tracking-wide overflow-hidden magnetic text-center glow-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{t('hero.cta')}</span>
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.div>
                </span>
              </motion.a>

              <motion.a
                href="https://wa.me/5516992233365"
                onClick={() => trackCTAClick('whatsapp', 'hero', 'https://wa.me/5516992233365')}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white/10 transition-all duration-300 magnetic text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <MessageCircle size={16} />
                  <span>{t('nav.getInTouch')}</span>
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Coluna direita - Cards informativos */}
          <div className="space-y-6">
            {/* Card 1: Performance */}
            <motion.div
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm font-medium">Performance</span>
                <motion.span 
                  className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30 font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LCP &lt; 2s
                </motion.span>
              </div>
              
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {['React', 'TypeScript', 'Framer Motion'].map((tech, index) => (
                  <motion.span 
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Card 2: Stats */}
            <motion.div
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm font-medium">Experience</span>
                <motion.div 
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Projects Delivered</span>
                  <motion.span 
                    className="text-white font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    20+
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Years Experience</span>
                  <motion.span 
                    className="text-white font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    5+
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Client Satisfaction</span>
                  <motion.span 
                    className="text-green-400 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    100%
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Tech Stack animado */}
            <motion.div
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm font-medium">Tech Stack</span>
                <motion.div 
                  className="flex space-x-1"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-1 h-1 bg-blue-400 rounded-full" />
                  <div className="w-1 h-1 bg-purple-400 rounded-full" />
                  <div className="w-1 h-1 bg-green-400 rounded-full" />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Node.js'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="px-3 py-2 text-xs rounded-lg bg-white/5 text-white/70 text-center border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Linha de chat */}
        <motion.div 
          className="flex items-center justify-center space-x-3 md:space-x-4 text-white/60 px-4 mt-12" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2 }}
        >
          <motion.div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-xs md:text-sm text-center leading-relaxed">Chat with YAN.AI to learn about my work & methodology</span>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="hidden md:block">→</motion.div>
        </motion.div>
      </div>



      </div>
    </section>
  );
};

export default React.memo(Hero);