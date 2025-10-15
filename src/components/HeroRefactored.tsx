import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Clock, MapPin, ArrowRight, Play } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackCTAClick } from '../lib/analytics';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
// import { Separator } from './ui/separator';
import Prism from './reactbits/Prism';

const HeroRefactored = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { t } = useLanguage();
  const title = 'YAN.M';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Variants para animações premium
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  } as const;

  const letterVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(6px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 500, damping: 30 } }
  } as const;

  const cardStagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } })
  } as const;

  const ctaButtons = [
    {
      id: 'portfolio',
      label: t('cta.viewPortfolio'),
      variant: 'default' as const,
      icon: ArrowRight,
      href: '#works',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'contact',
      label: t('cta.getInTouch'),
      variant: 'outline' as const,
      icon: MessageCircle,
      href: '#contact',
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  const statusItems = [
    {
      icon: MapPin,
      label: t('location.city'),
      value: t('location.state'),
      color: 'text-blue-400'
    },
    {
      icon: Clock,
      label: t('contact.availableForWork'),
      value: formatTime(currentTime),
      color: 'text-green-400'
    }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ background: 'transparent' }}
    >
      {/* Prism Background (performático em Canvas 2D) */}
      <div className="absolute inset-0 -z-10">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-reverse" />

        {/* Premium spotlight */}
        <motion.div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-[80vw] max-h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(82,39,255,0.12) 0%, rgba(0,0,0,0) 60%)'
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div className="text-center space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          {/* Status Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {statusItems.map((item, index) => (
              <motion.div key={item.label + index} custom={index} variants={cardStagger}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <div className="text-left">
                        <p className="font-label text-white/60 text-xs">{item.label}</p>
                        <p className="font-body text-white text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Title */}
          <motion.h1 
            className="font-section-title leading-none text-white mb-8 relative"
            style={{ fontSize: 'clamp(3rem, 16vw, 12rem)', overflow: 'visible', whiteSpace: 'nowrap' }}
          >
            <motion.span className="inline-flex select-none">
              {Array.from(title).map((char, i) => (
                <motion.span
                  key={i}
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-blue-400" />
            <Sparkles className="text-blue-400" size={16} />
            <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-purple-400" />
          </motion.div>

          {/* Subtitle */}
          <motion.h2 
            className="font-body text-lg sm:text-2xl lg:text-4xl text-white/80 leading-relaxed max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              className="inline-block glow-text-soft"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              {t('hero.subtitle')}
            </motion.span>
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12" variants={containerVariants}>
            {ctaButtons.map((button, index) => (
              <motion.div key={button.id} variants={cardStagger} custom={index} whileHover={{ y: -2 }}>
                <Button
                variant={button.variant}
                size="lg"
                className={`
                  group relative overflow-hidden px-8 py-4 text-lg font-medium
                  ${button.variant === 'default' 
                    ? `bg-gradient-to-r ${button.gradient} text-white hover:shadow-lg hover:shadow-blue-600/25` 
                    : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                  }
                  transition-all duration-300
                `}
                onClick={() => {
                  trackCTAClick(button.id);
                  const element = document.getElementById(button.href.replace('#', ''));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {button.label}
                    <button.icon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {button.variant === 'default' && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${button.gradient} origin-left`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Marquee de tecnologias (credibilidade) */}
          <motion.div
            className="mt-10 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex gap-3 animate-[marquee_18s_linear_infinite] whitespace-nowrap will-change-transform">
              {['React', 'TypeScript', 'WebGL', 'Three.js', 'Framer Motion', 'Tailwind', 'Vite'].map((tech, i) => (
                <Badge key={tech + i} variant="outline" className="bg-white/5 border-white/10 text-white/70">
                  <Sparkles className="w-3 h-3 mr-1 text-blue-400" /> {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* AI Chat Promo */}
          <motion.div 
            className="mt-16 p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-white/10 rounded-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge variant="outline" className="bg-blue-600/20 border-blue-600/30 text-blue-400">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Assistant
              </Badge>
              <Badge variant="outline" className="bg-green-600/20 border-green-600/30 text-green-400">
                <Play className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
            <h3 className="font-body text-white text-lg font-semibold mb-2">
              {t('hero.aiChat.title')}
            </h3>
            <p className="font-text text-white/70 text-sm mb-4">
              {t('hero.aiChat.description')}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10"
              onClick={() => {
                const chatButton = document.querySelector('[data-ai-chat-trigger]') as HTMLElement;
                if (chatButton) chatButton.click();
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('hero.aiChat.cta')}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroRefactored;
