import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, MapPin, ArrowRight, Star, Zap, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackCTAClick } from '../lib/analytics';

const HeroOptimized = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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
      className="hero-section relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Simplified Background - sem animações para melhor performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 blur-2xl" />
        <div className="absolute top-1/6 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8">
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
              <h1 className="hero-title font-inter font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight mb-4 sm:mb-6">
                <span className="text-white">Yan</span>
                <span className="mx-1 sm:mx-2 text-white/40">—</span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  .m
                </span>
              </h1>
              
              {/* Proposta de valor - SEO Optimized */}
              <p className="hero-subtitle text-white/70 text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <span className="text-white font-semibold">Desenvolvedor Frontend Freelancer especializado em Landing Pages de alta conversão.</span>
                <span className="text-green-400 font-medium"> Orçamento grátis em 24h</span>.
              </p>
            </motion.div>

            {/* Stats - SEO Optimized */}
            <motion.div 
              className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <div className={`p-1 rounded-full bg-gradient-to-r ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-semibold">{stat.value}</div>
                    <div className="text-white/60 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a
                href="#contact"
                onClick={() => trackCTAClick('hero_primary')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Solicitar Orçamento Grátis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a
                href="https://wa.me/5516999999999?text=Olá! Vim pelo seu site e gostaria de saber mais sobre seus serviços de desenvolvimento."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick('hero_whatsapp')}
                className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </span>
              </a>
            </motion.div>

            {/* Highlights */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 text-green-400 text-sm lg:text-base">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative">
            <motion.div
              className="relative w-full max-w-md mx-auto lg:max-w-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Placeholder para imagem ou visual */}
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Sites que Convertem</h3>
                  <p className="text-white/60">Desenvolvimento focado em resultados</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptimized;
