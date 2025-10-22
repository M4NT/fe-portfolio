import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Clock, MapPin, ArrowRight, Star, Zap, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackCTAClick } from '../lib/analytics';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Reduzir frequência de atualização para melhor performance
    const timer = setInterval(() => setCurrentTime(new Date()), 30000); // 30s em vez de 1s
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = [
    { icon: <TrendingUp className="w-4 h-4" />, label: 'ROI Médio', value: '300%', color: 'from-green-400 to-emerald-500' },
    { icon: <Star className="w-4 h-4" />, label: 'Projetos Entregues', value: '50+', color: 'from-yellow-400 to-orange-500' }
  ];

  const highlights = [
    'Landing Pages que convertem 300% mais que a média do mercado'
  ];

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs - More vibrant */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-500/20 sm:from-blue-500/25 to-purple-500/20 sm:to-purple-500/25 blur-3xl animate-composite"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: 'transform, opacity' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-pink-500/20 sm:from-pink-500/25 to-orange-500/20 sm:to-orange-500/25 blur-3xl animate-composite"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: 'transform, opacity' }}
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

        {/* Floating particles - Fixed positions with smooth movement and blur */}
        {[...Array(8)].map((_, i) => {
          const colors = ['bg-green-400/40', 'bg-emerald-400/40', 'bg-teal-400/40', 'bg-cyan-400/40'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          
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
          
          const position = positions[i % positions.length];
          const duration = 12 + Math.random() * 6; // 12-18 segundos
          
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
                x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15, Math.random() * 40 - 20, Math.random() * 50 - 25, Math.random() * 60 - 30]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut",
                times: [0, 0.1, 0.3, 0.6, 0.8, 1] // Aparece rápido, fica visível 70% do tempo, desaparece suave
              }}
            />
          );
        })}

        {/* Animated geometric shapes - More colorful */}
        <motion.div
          className="absolute top-1/3 left-1/6 w-32 h-32 border-2 border-blue-400/20 rotate-45"
          animate={{
            rotate: [45, 405, 45],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
            duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-24 h-24 border-2 border-purple-400/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-pink-400/20 rotate-45"
          animate={{
            rotate: [0, 360, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated lines - More colorful */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          animate={{ 
            x: [-100, 100],
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
        
        {/* Subtle grid pattern */}
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

        {/* Animated gradient overlay - More vibrant */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            background: [
              'linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(236,72,153,0.1) 100%)',
              'linear-gradient(225deg, rgba(236,72,153,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(147,51,234,0.1) 100%)',
              'linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(236,72,153,0.1) 100%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
      <motion.div 
            className="space-y-4 lg:space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Badge - Hidden on mobile to reduce clutter */}
            <motion.div
              className="hidden sm:inline-flex items-center gap-2 px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Disponível para novos projetos</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Subtítulo profissional - Hidden on mobile */}
              <div className="hidden sm:block text-white/60 text-sm lg:text-base uppercase tracking-wider mb-4 font-inter">
                Desenvolvedor Frontend Freelancer
            </div>
            
              {/* Nome/Marca principal */}
              <h1 className="font-inter font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight mb-4 sm:mb-6">
                <span className="text-white">Yan</span>
                <span className="mx-1 sm:mx-2 text-white/40">—</span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  .m
                </span>
              </h1>
              
              {/* Proposta de valor - SEO Optimized */}
              <p className="text-white/70 text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <span className="text-white font-semibold">Desenvolvedor Frontend Freelancer especializado em Landing Pages de alta conversão.</span>
                <span className="text-green-400 font-medium"> Orçamento grátis em 24h</span>.
              </p>
        </motion.div>

            {/* Stats - SEO Optimized */}
        <motion.div 
              className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                    <div className="text-white/80">
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-base sm:text-lg font-semibold">{stat.value}</div>
                    <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights - SEO Optimized */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">{highlights[0]}</span>
            </motion.div>

            {/* CTAs - Redesigned with site identity */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {/* Primary CTA - Gradient with animation */}
              <motion.a
                href="#contact"
                onClick={() => trackCTAClick('contact', 'hero', '#contact')}
                className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  background: [
                    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                    'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)',
                    'linear-gradient(135deg, #ec4899 0%, #3b82f6 50%, #8b5cf6 100%)',
                    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
                  ]
                }}
                transition={{
                  background: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="relative text-white font-semibold z-10">
                  <span className="hidden sm:inline">Solicitar Orçamento Grátis</span>
                  <span className="sm:hidden">Orçamento Grátis</span>
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.div>
              </motion.a>

              {/* Secondary CTA - Orange gradient with animation */}
              <motion.a
                href="https://wa.me/5516992233365?text=Opa%20Yan!%0AVim%20atrav%C3%A9s%20do%20site%20do%20seu%20portf%C3%B3lio.%0ATenho%20interesse%20em%20um%20projeto%20e%20gostaria%20de%20conversar%20sobre%20como%20podemos%20trabalhar%20juntos!"
                onClick={() => trackCTAClick('whatsapp', 'hero', 'https://wa.me/5516992233365')}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 text-sm sm:text-base border"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                  borderColor: 'rgba(249, 115, 22, 0.3)',
                  boxShadow: '0 4px 15px rgba(249, 115, 22, 0.2)'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
                  borderColor: 'rgba(249, 115, 22, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  background: [
                    'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                    'linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #f97316 100%)',
                    'linear-gradient(135deg, #dc2626 0%, #f97316 50%, #ea580c 100%)',
                    'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)'
                  ]
                }}
                transition={{
                  background: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="relative text-white font-semibold z-10">
                  <span className="hidden sm:inline">Falar com Especialista</span>
                  <span className="sm:hidden">WhatsApp</span>
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 3, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Location & Time - Hidden on mobile to reduce clutter */}
            <motion.div
              className="hidden sm:flex items-center gap-6 text-white/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Monte Alto, SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div 
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Interactive Performance Dashboard */}
            <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              {/* Main Dashboard Card */}
              <motion.div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ y: -4, scale: 1.01, rotateY: 2 }}
              >
                {/* Animated background with multiple layers */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Animated grid pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />

                <div className="relative z-10">
                  {/* Header with animated icon */}
                  <motion.div 
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg relative"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, -360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* Dynamic title with typewriter effect */}
                  <motion.h2 
                    className="text-white text-lg sm:text-xl font-semibold mb-2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <motion.span
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 50%, #ffffff 100%)',
                        backgroundSize: '200% 100%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      Desenvolvedor Frontend
                    </motion.span>
                  </motion.h2>

                  {/* Animated description */}
                  <motion.p 
                    className="text-white/70 text-xs sm:text-sm mb-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    Soluções digitais que impressionam e performam
                  </motion.p>

                  {/* Compact Interactive Showcase */}
                  <div className="space-y-3">
                    {/* Interactive Tech Buttons */}
                    <motion.div 
                      className="flex flex-wrap gap-2 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      {[
                        { label: 'React', color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
                        { label: 'TS', color: 'from-blue-400 to-indigo-500', icon: '🔷' },
                        { label: 'Motion', color: 'from-purple-400 to-pink-500', icon: '✨' },
                        { label: 'CSS', color: 'from-green-400 to-emerald-500', icon: '🎨' }
                      ].map((tech, index) => (
                        <motion.button
                          key={tech.label}
                          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${tech.color} border border-white/20`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.8 + index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-1">{tech.icon}</span>
                          {tech.label}
                        </motion.button>
                      ))}
                    </motion.div>

                    {/* Compact Live Preview */}
                    <motion.div 
                      className="bg-black/40 rounded-lg p-3 sm:p-4 border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span className="text-white/60 text-xs ml-1">component.tsx</span>
                        <div className="ml-auto flex items-center gap-1">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs">Live</span>
                        </div>
                      </div>

                      {/* Mini Code */}
                      <div className="text-xs font-mono text-green-400 space-y-1 overflow-x-auto">
                        <div className="text-blue-400">const</div>
                        <div className="text-white ml-2">
                          <span className="text-blue-400">Card</span> = () =&gt; {`{`}
                        </div>
                        <motion.div 
                          className="text-yellow-400 ml-4"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          return &lt;<span className="text-pink-400">motion.div</span>&gt;
                        </motion.div>
                        <div className="text-gray-400 ml-6">// Magic ✨</div>
                        <div className="text-white ml-4">
                          &lt;/<span className="text-pink-400">motion.div</span>&gt;
                        </div>
                        <div className="text-white ml-2">{`}`}</div>
                      </div>

                      {/* Interactive Demo */}
                      <motion.div 
                        className="mt-3 p-2 bg-white/5 rounded border border-white/10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 2.2 }}
                      >
                        <div className="text-white/60 text-xs mb-1">Preview:</div>
                        <motion.div
                          className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center text-white text-xs font-semibold"
                          whileHover={{ 
                            scale: 1.05,
                            rotate: [0, 1, -1, 0],
                            boxShadow: '0 5px 20px rgba(59, 130, 246, 0.3)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            background: [
                              'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                              'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                              'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                            ]
                          }}
                          transition={{
                            background: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <motion.span
                            animate={{ 
                              scale: [1, 1.1, 1],
                              textShadow: [
                                '0 0 0px rgba(255,255,255,0.5)',
                                '0 0 8px rgba(255,255,255,0.8)',
                                '0 0 0px rgba(255,255,255,0.5)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            Hover me! ✨
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Compact Stats */}
                    <motion.div 
                      className="grid grid-cols-2 gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2.4 }}
                    >
                      <motion.div 
                        className="bg-white/5 rounded-lg p-2 text-center border border-white/10"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: 'rgba(59, 130, 246, 0.1)'
                        }}
                      >
                        <motion.div 
                          className="text-lg mb-1"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🚀
                        </motion.div>
                        <div className="text-white/80 text-xs">Performance</div>
                      </motion.div>
                      <motion.div 
                        className="bg-white/5 rounded-lg p-2 text-center border border-white/10"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: 'rgba(147, 51, 234, 0.1)'
                        }}
                      >
                        <motion.div 
                          className="text-lg mb-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ⚡
                        </motion.div>
                        <div className="text-white/80 text-xs">Interativo</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements - Simplified for mobile */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>

              {/* Floating Elements - Visible on all screens */}
              <motion.div
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>

              <motion.div
                className="absolute top-1/2 -left-4 sm:-left-8 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 25% 25%, rgba(59,130,246,0.3) 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(147,51,234,0.3) 0%, transparent 50%)
                    `,
                    backgroundSize: '100% 100%'
                  }}
                />
              </div>
            </div>
      </motion.div>
        </div>

        {/* Bottom Indicator */}
        <motion.div 
          className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center bg-black/20 backdrop-blur-sm"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;