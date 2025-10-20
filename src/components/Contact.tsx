import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
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
import ContactForm from './ContactForm';
import AnimatedBackground from './AnimatedBackground';
import { trackGAEvent } from '../lib/analytics';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNearButton, setIsNearButton] = useState(false);

  // Magnetic effect for the main CTA button
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 300, damping: 20 });
  const springY = useSpring(magneticY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (magneticButtonRef.current) {
      const rect = magneticButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        const threshold = 100;
        setIsNearButton(distance < threshold);
        
        if (distance < threshold) {
          const strength = (threshold - distance) / threshold;
          magneticX.set((e.clientX - centerX) * strength * 0.3);
          magneticY.set((e.clientY - centerY) * strength * 0.3);
      } else {
        magneticX.set(0);
        magneticY.set(0);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [magneticX, magneticY]);

  useEffect(() => {
    if (isNearButton) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = '';
    }
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
      title: 'WhatsApp Direto',
      description: 'Resposta rápida e personalizada',
      action: 'Iniciar Conversa',
      color: 'from-green-500 to-emerald-500',
      priority: 'primary',
      badge: 'Recomendado',
      href: 'https://wa.me/5516992233365?text=Opa%20Yan!%0AVim%20atrav%C3%A9s%20do%20site%20do%20seu%20portf%C3%B3lio.%0ATenho%20interesse%20em%20um%20projeto%20e%20gostaria%20de%20conversar%20sobre%20como%20podemos%20trabalhar%20juntos!'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Direto',
      description: 'Resposta em até 24h úteis',
      action: 'hi@yanmantovani.com',
      color: 'from-purple-500 to-pink-500',
      priority: 'secondary',
      href: 'mailto:hi@yanmantovani.com'
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
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground variant="default" />

      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-white/40 text-sm uppercase tracking-wider mb-4 font-inter">
            Vamos Conversar
          </div>
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Escolha a forma mais conveniente para iniciarmos nossa conversa. Estou aqui para transformar sua ideia em realidade.
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
            <motion.div
              key={index}
                className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              >
                {/* Contact Card */}
                <div className={`relative bg-white/5 backdrop-blur-sm border rounded-xl p-8 hover:border-white/20 transition-all duration-300 ${
                  option.priority === 'primary' 
                    ? 'border-blue-500/30 hover:border-blue-500/50' 
                    : 'border-white/10'
                }`}>
                  {/* Badge for primary option */}
                  {option.badge && (
                    <div className="absolute -top-3 left-6">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        {option.badge}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${option.color} shadow-lg`}>
                      <div className="text-white">
                        {option.icon}
              </div>
              </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl mb-2">
                        {option.title}
            </h3>
                      <p className="text-white/70 text-sm mb-6 leading-relaxed">
                        {option.description}
                      </p>

                      {/* CTA Button */}
                      <a
                        href={option.href || '#contact'}
                        target={option.href?.startsWith('http') ? '_blank' : undefined}
                        rel={option.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${option.color} text-white rounded-lg font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-${option.color.split('-')[1]}-500/20`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (option.title === 'WhatsApp Direto') {
                            trackGAEvent('whatsapp_click', {
                              location: 'contact_section',
                              label: 'whatsapp_cta'
                            });
                          }
                        }}
                      >
                        <span className="relative bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent font-bold group-hover/btn:from-white group-hover/btn:via-white group-hover/btn:to-white transition-all duration-300">
                          {option.action}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
            </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl font-light mb-2">Resultados Comprovados</h3>
            <p className="text-white/60">Números que falam por si só</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
            <motion.div
              key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-white text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
          </div>
        </motion.div>

        {/* Guarantees Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl font-light mb-2">Nossa Garantia</h3>
            <p className="text-white/60">Compromisso com a excelência em cada projeto</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                  className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{guarantee}</span>
              </motion.div>
            ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
          <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;