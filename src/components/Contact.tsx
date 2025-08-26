import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Calendar, 
  Star, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Globe,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNearButton, setIsNearButton] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Magnetic effect for the main CTA button
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 300, damping: 20 });
  const springY = useSpring(magneticY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magneticButtonRef.current) return;

      const rect = magneticButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      
      // Magnetic range
      const magneticRange = 120;
      const maxPull = 25;
      
      if (distance < magneticRange) {
        setIsNearButton(true);
        const strength = Math.max(0, (magneticRange - distance) / magneticRange);
        const pullX = (deltaX / distance) * strength * maxPull;
        const pullY = (deltaY / distance) * strength * maxPull;
        
        magneticX.set(pullX);
        magneticY.set(pullY);
        
        // Custom cursor effect
        document.body.style.cursor = 'none';
      } else {
        setIsNearButton(false);
        magneticX.set(0);
        magneticY.set(0);
        document.body.style.cursor = '';
      }
      
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsNearButton(false);
      magneticX.set(0);
      magneticY.set(0);
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = '';
    };
  }, [magneticX, magneticY]);

  const stats = [
    { icon: <Star className="w-5 h-5" />, label: 'Projetos Entregues', value: '50+', color: 'from-yellow-400 to-orange-500' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'ROI Médio', value: '300%', color: 'from-green-400 to-emerald-500' },
    { icon: <Users className="w-5 h-5" />, label: 'Clientes Satisfeitos', value: '40+', color: 'from-blue-400 to-cyan-500' },
    { icon: <Target className="w-5 h-5" />, label: 'Taxa de Sucesso', value: '98%', color: 'from-purple-400 to-pink-500' }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Chat com YAN.AI',
      description: 'Pré-qualificação inteligente em 5 minutos',
      action: 'Iniciar Chat',
      color: 'from-blue-500 to-cyan-500',
      priority: 'primary',
      badge: 'Recomendado'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Direto',
      description: 'Resposta em até 24h úteis',
      action: 'hello@yan-m.dev',
      color: 'from-purple-500 to-pink-500',
      priority: 'secondary',
      href: 'mailto:hello@yan-m.dev'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Agendar Reunião',
      description: 'Discovery call estratégica de 30min',
      action: 'Ver Agenda',
      color: 'from-green-500 to-emerald-500',
      priority: 'secondary'
    }
  ];

  const guarantees = [
    'Metodologia comprovada em 50+ projetos',
    'Processos transparentes e documentados',
    'Suporte completo pós-entrega',
    'ROI médio de 300% nos primeiros 6 meses'
  ];

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-20 sm:py-32 md:py-40 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, transparent 0%, #000000 30%),
          radial-gradient(circle at 25% 25%, rgba(59,130,246,0.15) 0%, transparent 70%),
          radial-gradient(circle at 75% 75%, rgba(147,51,234,0.12) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(16,185,129,0.08) 0%, transparent 70%)
        `
      }}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl"
            style={{
              background: 'linear-gradient(45deg, rgba(59,130,246,0.6), rgba(147,51,234,0.4), rgba(16,185,129,0.5))'
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [-100, 100, -100],
              y: [-50, 50, -50]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl"
            style={{
              background: 'linear-gradient(-45deg, rgba(16,185,129,0.6), rgba(59,130,246,0.4), rgba(147,51,234,0.5))'
            }}
            animate={{ 
              scale: [1.2, 0.8, 1.2],
              rotate: [360, 180, 0],
              x: [100, -100, 100],
              y: [50, -50, 50]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Premium Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.015] hidden lg:block"
          style={{ y: backgroundY }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 2px, transparent 2px)
              `,
              backgroundSize: '120px 120px, 120px 120px, 60px 60px'
            }}
          />
        </motion.div>

        {/* Floating Success Indicators */}
        <motion.div 
          className="absolute top-1/5 right-1/5 text-green-400/10 hidden xl:block"
          animate={{ 
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <CheckCircle2 className="w-20 h-20" />
        </motion.div>

        <motion.div 
          className="absolute bottom-1/5 left-1/5 text-blue-400/10 hidden xl:block"
          animate={{ 
            y: [20, -20, 20],
            rotate: [5, -5, 5],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Target className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Magnetic Cursor Effect */}
      {isNearButton && (
        <motion.div
          className="fixed pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: isNearButton ? 1.5 : 1
          }}
          transition={{ type: "tween", duration: 0.15 }}
        >
          <motion.div
            className="w-10 h-10 bg-white rounded-full"
            animate={{
              scale: isNearButton ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      )}

      <motion.div 
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
        style={{ y }}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-white/40 text-xs sm:text-sm uppercase tracking-wider mb-4 font-inter"
          >
            Vamos Criar Algo Extraordinário
          </motion.div>
          
          <h2 className="font-inter font-light text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-[-0.04em] text-white mb-6 sm:mb-8">
            PRONTO PARA
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              RESULTADOS REAIS?
            </span>
          </h2>
          
          <motion.p 
            className="text-white/70 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Você chegou até aqui porque sabe que <span className="text-white font-medium">design medíocre custa mais caro</span> que investir no certo desde o início.
            <br />
            <span className="text-green-400 font-medium">Hora de fazer a escolha inteligente.</span>
          </motion.p>

          {/* Availability Indicator */}
          <motion.div 
            className="inline-flex items-center space-x-3 mt-6 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-400 text-sm font-medium">
              Aceitando 3 novos projetos em 2025
            </span>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <motion.div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20 mb-3`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Section */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium mb-6 leading-tight">
              Não é só sobre <span className="text-blue-400">código bonito</span>.
              <br />
              É sobre <span className="text-green-400">negócios que crescem</span>.
            </h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Cada pixel tem propósito. Cada interação gera resultado. Cada projeto entregue transforma negócios.
            </p>
          </motion.div>

          {/* Magnetic CTA Button */}
          <motion.button
            ref={magneticButtonRef}
            style={{ 
              x: springX, 
              y: springY,
            }}
            className="relative group inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-500 magnetic overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
              animate={isNearButton ? {
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
            
            {/* Button content */}
            <span className="relative z-10">Começar Meu Projeto Agora</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>

            {/* Particle effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={isNearButton ? {
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(147,51,234,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3) 0%, transparent 50%)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          <motion.p 
            className="text-white/50 text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            ✨ Resposta em até 2h úteis • Sem compromisso
          </motion.p>
        </motion.div>

        {/* Contact Options */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              className={`relative p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-white/20 transition-all duration-500 group ${option.priority === 'primary' ? 'ring-2 ring-blue-500/30' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {option.badge && (
                <motion.div
                  className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {option.badge}
                </motion.div>
              )}

              <motion.div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${option.color} bg-opacity-20 mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {option.icon}
              </motion.div>

              <h4 className="text-white font-medium text-lg mb-2">
                {option.title}
              </h4>

              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                {option.description}
              </p>

              <motion.div
                className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${option.color} bg-opacity-20 border border-white/20 rounded-lg text-white/80 text-sm font-medium group-hover:bg-opacity-30 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{option.action}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantees Section */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white/80 text-xl sm:text-2xl font-medium mb-8">
            Por que escolher YAN.M?
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                </motion.div>
                <span className="text-white/70 text-sm sm:text-base">{guarantee}</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/30 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Agenda Limitada 2025</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Para manter a qualidade excepcional, aceito apenas 3 novos projetos por trimestre. 
              <br />
              <span className="text-yellow-400 font-medium">2 vagas restantes para Q1 2025.</span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;