import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, TrendingUp, CheckCircle2, AlertCircle, DollarSign, Users, Timer, Zap, TrendingDown, Frown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackCTAClick } from '../lib/analytics';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [storyStep, setStoryStep] = useState(0); // 0: triste, 1: transformação, 2: sucesso
  const [isPaused, setIsPaused] = useState(false);

  const whatsappNumber = '5516992233365';
  const whatsappMessage = encodeURIComponent('Olá! Quero transformar meu site em uma máquina de vendas. Podemos conversar agora?');

  const handleWhatsApp = (buttonType: string) => {
    trackCTAClick(`whatsapp-${buttonType}`, 'hero', `https://wa.me/${whatsappNumber}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const goToStep = (step: number) => {
    setStoryStep(step);
    setIsPaused(true);
    // Resume automático após 6 segundos
    setTimeout(() => setIsPaused(false), 6000);
  };

  // Ciclo automático da história
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setStoryStep((prev) => (prev + 1) % 3);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden w-full"
    >
      {/* Animated Background - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-500/30 via-orange-500/25 to-red-600/30 blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-500/30 via-emerald-500/25 to-green-600/30 blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

                 {/* Animated particles */}
         {[...Array(15)].map((_, i) => {
           const size = 8 + Math.random() * 12;
           const leftPos = Math.random() * 100;
           const topPos = Math.random() * 100;
           const colors = [
             'rgba(248, 113, 113, 0.4)',
             'rgba(34, 197, 94, 0.4)',
             'rgba(96, 165, 250, 0.4)',
             'rgba(196, 181, 253, 0.4)'
           ];
           const randomColor = colors[i % colors.length];
           
           return (
             <motion.div
               key={i}
               className="absolute rounded-full blur-sm"
               style={{
                 width: `${size}px`,
                 height: `${size}px`,
                 left: `${leftPos}%`,
                 top: `${topPos}%`,
                 backgroundColor: randomColor,
               }}
               animate={{
                 opacity: [0, 0.8, 0],
                 scale: [0, 1, 0],
                 y: [0, -100 - Math.random() * 200],
                 x: [0, (Math.random() - 0.5) * 100]
               }}
               transition={{
                 duration: 10 + Math.random() * 10,
                 repeat: Infinity,
                 delay: Math.random() * 5,
                 ease: "easeOut"
               }}
             />
           );
         })}

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(150deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated lines */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
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
          className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-green-400/30 to-transparent"
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 w-full py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          
          {/* Left Column - Headline & CTA */}
          <motion.div 
            className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge de Urgência - Mobile menor */}
            <motion.div
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="leading-tight">Você está perdendo clientes AGORA</span>
            </motion.div>

            {/* Headline Principal - Mobile muito menor */}
            <motion.h1 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] sm:leading-[1.2] max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-white">Seu site não está </span>
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                vendendo?
              </span>
              <br className="hidden sm:block" />
              <span className="text-white block sm:inline">Você está perdendo </span>
              <motion.span
                className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent block sm:inline"
                animate={{ 
                  filter: [
                    'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))',
                    'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                    'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                R$ 50.000+ por mês
              </motion.span>
            </motion.h1>

            {/* Subheadline - Mobile menor */}
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 mt-3 sm:mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="font-semibold text-green-400">Landing pages que convertem 300% mais</span> que a média do mercado.
              {' '}Sites que <span className="font-semibold text-blue-400">vendem enquanto você dorme</span>.
              {' '}<span className="text-white/60">Sem complicação. Apenas resultados.</span>
            </motion.p>

            {/* Prova Social - Mobile mais compacto */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-green-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">50+</div>
                  <div className="text-white/60 text-[10px] sm:text-xs">Clientes satisfeitos</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-blue-500/30">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">300%</div>
                  <div className="text-white/60 text-[10px] sm:text-xs">ROI médio</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-purple-500/30">
                <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">24h</div>
                  <div className="text-white/60 text-[10px] sm:text-xs">Orçamento grátis</div>
                </div>
              </div>
            </motion.div>

            {/* CTAs - WhatsApp Diretos - Mobile menor */}
            <motion.div
              className="flex flex-col gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {/* CTA Principal */}
              <motion.button
                onClick={() => handleWhatsApp('primary')}
                className="group relative px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm sm:text-base md:text-lg rounded-lg shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/70 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                <span className="whitespace-nowrap">Quero Vender Mais AGORA</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* CTA Secundário */}
              <motion.button
                onClick={() => handleWhatsApp('secondary')}
                className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm sm:text-base md:text-lg rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Falar com Especialista</span>
              </motion.button>
            </motion.div>

            {/* Garantia/Urgência - Mobile menor */}
            <motion.div
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm text-white/60 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span>Orçamento em <span className="text-green-400 font-semibold">24 horas</span></span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>Sem compromisso</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-red-400 font-semibold">Últimas 3 vagas de Janeiro</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Storytelling Animado - Hidden on mobile */}
          <motion.div 
            className="hidden lg:block relative w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md">
              {/* Card Principal com Storytelling */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/95 via-purple-900/20 to-black/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[550px]"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ y: -4 }}
              >
                {/* Indicadores de Progresso */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                  {[0, 1, 2].map((step) => (
                    <button
                      key={step}
                      onClick={() => goToStep(step)}
                      className="relative group"
                      aria-label={`Ir para etapa ${step + 1}`}
                    >
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${
                        storyStep === step 
                          ? 'w-8 bg-green-400' 
                          : 'w-1.5 bg-white/30 hover:bg-white/50'
                      }`} />
                      {storyStep === step && (
                        <motion.div
                          className="absolute -top-1 left-0 h-1.5 bg-green-400 rounded-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Labels das Etapas */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex gap-6 text-xs text-white/50">
                  {['Antes', 'Durante', 'Depois'].map((label, index) => (
                    <motion.span
                      key={index}
                      className={`transition-colors duration-300 ${
                        storyStep === index ? 'text-green-400 font-semibold' : ''
                      }`}
                    >
                      {label}
                    </motion.span>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* PASSO 1: Antes - Situação Atual */}
                  {storyStep === 0 && (
                    <motion.div
                      key="before"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="relative z-10 h-full flex flex-col pt-16 pb-24"
                    >
                      {/* Background sutil */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-red-500/8 via-orange-500/8 to-red-600/8"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      <div className="relative z-10 flex-1 flex flex-col">
                        {/* Ícone visual */}
                        <motion.div
                          className="text-5xl mb-6 text-center"
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        >
                          <motion.span
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            😔
                          </motion.span>
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">
                          A situação atual
                        </h2>
                        <p className="text-white/60 mb-8 text-center text-sm">
                          Sem estratégia digital eficiente
                        </p>

                        {/* Métricas ruins - mais compactas */}
                        <div className="space-y-2.5 flex-1">
                          {[
                            { icon: TrendingDown, value: 'R$ 2k', label: 'Receita/mês', color: 'red', delay: 0.3 },
                            { icon: Frown, value: '3', label: 'Leads/mês', color: 'orange', delay: 0.4 },
                            { icon: AlertCircle, value: '0.8%', label: 'Taxa de conversão', color: 'yellow', delay: 0.5 }
                          ].map((metric, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center justify-between p-3.5 bg-white/5 rounded-lg border backdrop-blur-sm"
                              style={{ borderColor: `rgba(239, 68, 68, 0.2)` }}
                              initial={{ x: -40, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: metric.delay, type: "spring" }}
                              whileHover={{ scale: 1.02, x: 4, borderColor: `rgba(239, 68, 68, 0.4)` }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 bg-red-500/15 rounded-lg`}>
                                  <metric.icon className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                  <div className="text-white font-bold text-lg">{metric.value}</div>
                                  <div className="text-white/50 text-xs">{metric.label}</div>
                                </div>
                              </div>
                              <motion.span
                                className="text-2xl"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              >
                                📉
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* PASSO 2: Durante - Transformação */}
                  {storyStep === 1 && (
                    <motion.div
                      key="during"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="relative z-10 h-full flex flex-col items-center justify-center pt-16 pb-24"
                    >
                      {/* Background de transformação */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-blue-500/8 to-cyan-500/8"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      <div className="relative z-10 text-center w-full">
                        {/* Ícones de processo */}
                        <div className="flex justify-center gap-3 mb-8">
                          {['🎯', '✨', '🚀'].map((emoji, index) => (
                            <motion.div
                              key={index}
                              className="text-4xl"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                delay: 0.3 + index * 0.2, 
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                              }}
                            >
                              <motion.span
                                animate={{ 
                                  y: [0, -8, 0],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.3
                                }}
                              >
                                {emoji}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.h2
                          className="text-xl sm:text-2xl font-bold text-white mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            O processo de transformação
                          </span>
                        </motion.h2>
                        <motion.p
                          className="text-white/60 mb-8 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          Criando sua máquina de vendas
                        </motion.p>

                        {/* Lista de features animadas */}
                        <div className="space-y-3 mb-6">
                          {[
                            'Landing page otimizada para conversão',
                            'Copys persuasivas e diretas',
                            'Design moderno e responsivo'
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-purple-500/20"
                              initial={{ x: -30, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 1.2 + index * 0.15 }}
                              whileHover={{ scale: 1.02, x: 4, borderColor: 'rgba(147, 51, 234, 0.4)' }}
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.3 + index * 0.15, type: "spring" }}
                              >
                                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                              </motion.div>
                              <span className="text-white/80 text-sm flex-1 text-left">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Barra de progresso animada */}
                        <motion.div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "easeOut", delay: 1.5 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* PASSO 3: Depois - Resultados */}
                  {storyStep === 2 && (
                    <motion.div
                      key="after"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="relative z-10 h-full flex flex-col pt-16 pb-24"
                    >
                      {/* Background de sucesso */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-green-500/8 via-emerald-500/8 to-green-600/8"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      <div className="relative z-10 flex-1 flex flex-col">
                        {/* Emoji de celebração */}
                        <motion.div
                          className="text-5xl mb-6 text-center relative"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          🎉
                          {/* Emojis flutuantes */}
                          {['💰', '🚀', '⭐'].map((emoji, i) => (
                            <motion.div
                              key={i}
                              className="absolute text-2xl"
                              style={{
                                left: `${30 + i * 20}%`,
                                top: '50%',
                              }}
                              initial={{ scale: 0, y: 0, opacity: 0 }}
                              animate={{
                                scale: [0, 1, 0.8],
                                y: [-20, -40, -20],
                                opacity: [0, 1, 0.7],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                delay: 0.5 + i * 0.2,
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: "easeInOut"
                              }}
                            >
                              {emoji}
                            </motion.div>
                          ))}
                        </motion.div>

                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">
                          Os resultados alcançados
                        </h2>
                        <p className="text-white/60 mb-8 text-center text-sm">
                          Transformação completa em ação
                        </p>

                        {/* Métricas de sucesso - melhoradas */}
                        <div className="space-y-2.5 flex-1">
                          {[
                            { icon: DollarSign, value: '+R$ 42k', label: 'Receita extra/mês', emoji: '💰', delay: 0.3 },
                            { icon: Users, value: '+127', label: 'Leads/mês', emoji: '🚀', delay: 0.4 },
                            { icon: TrendingUp, value: '300%', label: 'Aumento de conversão', emoji: '⭐', delay: 0.5 }
                          ].map((metric, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center justify-between p-3.5 bg-white/5 rounded-lg border backdrop-blur-sm"
                              style={{ borderColor: `rgba(34, 197, 94, 0.3)` }}
                              initial={{ x: 40, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: metric.delay, type: "spring" }}
                              whileHover={{ scale: 1.02, x: -4, borderColor: 'rgba(34, 197, 94, 0.5)' }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/15 rounded-lg">
                                  <metric.icon className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                  <div className="text-white font-bold text-lg">{metric.value}</div>
                                  <div className="text-white/50 text-xs">{metric.label}</div>
                                </div>
                              </div>
                              <motion.span
                                className="text-2xl"
                                animate={{ 
                                  rotate: [0, 10, -10, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity, 
                                  delay: index * 0.3 
                                }}
                              >
                                {metric.emoji}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA fixo na parte inferior */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 pt-4 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.button
                    onClick={() => handleWhatsApp('card')}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
                    whileHover={{ scale: 1.02, y: -2, boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Quero essa transformação</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;