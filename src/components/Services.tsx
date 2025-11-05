import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { Check, Star, Zap, Palette, Code, Globe, Layout, Sparkles, Server, ChevronDown, ArrowRight, Tag, AlertCircle, TrendingDown, TrendingUp, Target, MessageCircle, DollarSign, Users, Timer, Flame } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackCTAClick } from '../lib/analytics';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const whatsappNumber = '5516992233365';
  
  const handleWhatsApp = (serviceName: string) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço: ${serviceName}. Podemos conversar sobre como isso pode transformar meu negócio?`);
    trackCTAClick(`whatsapp-${serviceName.toLowerCase().replace(/\s+/g, '-')}`, 'services', `https://wa.me/${whatsappNumber}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const toggleService = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  // Landing Page em DESTAQUE (MAIS PROCURADO)
  const featuredService = {
          id: 1,
          title: 'Landing Page',
    category: '🔥 MAIS PROCURADO',
    icon: <Target className="w-8 h-8" />,
    accent: 'from-red-500 to-orange-500',
    accentSolid: 'bg-red-500',
    problem: {
      title: 'Você está perdendo vendas todos os dias',
      description: 'Seu site não converte visitantes em clientes. A cada 100 pessoas que chegam, apenas 1 ou 2 compram.',
      losses: ['97% dos visitantes saem sem comprar', 'Leads qualificados vão para concorrentes', 'R$ 50k+ deixam de entrar por mês'],
      icon: <TrendingDown className="w-6 h-6" />
    },
    solution: {
      title: 'Página focada em conversão que transforma visitantes em clientes',
          features: [
        'Design responsivo e otimizado',
        'Formulários integrados',
        'Analytics e tracking',
        'Ideal para lançamentos e campanhas',
        'Mobile-first: 60%+ das vendas vem do celular',
        'Velocidade ultrarrápida: carrega em menos de 2s'
      ]
    },
    result: {
      title: 'Resultado que você vai ver',
      metrics: [
        { label: '+300% conversão', value: 'vs site comum', icon: '📈' },
        { label: 'ROI médio', value: '450%', icon: '💰' },
        { label: 'Leads gerados/mês', value: '+127', icon: '🎯' }
      ],
      testimonial: '"Em 30 dias, nossa landing page gerou mais leads que o site antigo em 6 meses!"'
    },
    price: 'R$ 1.799,99',
    priceNote: 'a partir de',
    cta: 'Quero Minha Landing Page'
  };

  // Outros Serviços (Compactos)
  const otherServices = [
        {
          id: 2,
      title: 'Identidade + Social Media',
      category: '⭐ POPULAR - Bundle',
          icon: <Star className="w-5 h-5" />,
      accent: 'from-yellow-500 to-orange-500',
      problem: 'Presença inconsistente nas redes',
      problemDetail: 'Cliente não reconhece sua marca. Artes desalinhadas afastam seguidores e vendas.',
      solution: 'Pacote completo: marca profissional + presença digital',
      description: 'Transforme sua marca em uma presença digital que vende. Identidade visual sólida + conteúdo estratégico que converte.',
      price: 'R$ 1.199,99',
      priceNote: 'combo completo',
      badge: '-40% economia',
      badgeText: 'vs contratar separado',
      features: ['Identidade visual completa', '20 artes para redes sociais', 'Manual de marca + consultoria'],
      result: '+180% engajamento'
        },
        {
          id: 3,
      title: 'Site Institucional',
      category: 'Desenvolvimento',
      icon: <Globe className="w-5 h-5" />,
      accent: 'from-blue-500 to-cyan-500',
      problem: 'Site desatualizado afasta clientes',
      problemDetail: 'Sua empresa parece pequena e desatualizada. Clientes preferem concorrentes com presença profissional.',
      solution: 'Solução completa para sua empresa',
      description: 'Site moderno, rápido e profissional que passa credibilidade. Design responsivo, SEO otimizado e gestão de conteúdo fácil.',
      price: 'R$ 3.499,99',
      priceNote: 'a partir de',
      features: ['Design responsivo profissional', 'SEO otimizado', 'Painel de gestão', 'Suporte técnico'],
      result: '+250% credibilidade'
        },
        {
          id: 4,
      title: 'Identidade Visual',
          category: 'Branding',
          icon: <Palette className="w-5 h-5" />,
      accent: 'from-green-500 to-emerald-500',
      problem: 'Marca não transmite confiança',
      problemDetail: 'Sem identidade forte, você é só mais um no mercado. Clientes não lembram de você.',
      solution: 'Marca sólida: Logotipos, mockups e manuais',
      description: 'Crie uma identidade que seus clientes vão lembrar e confiar. Logo profissional, cores estratégicas e aplicações que vendem.',
      price: 'R$ 649,99',
      priceNote: 'a partir de',
      features: ['Logo profissional', 'Paleta de cores', 'Tipografia', 'Manual de marca'],
      result: '+200% reconhecimento'
        },
        {
          id: 5,
      title: 'Social Media',
      category: 'Design',
      icon: <Sparkles className="w-5 h-5" />,
      accent: 'from-pink-500 to-purple-500',
      problem: 'Artes amadoras nas redes',
      problemDetail: 'Posts mal feitos afastam seguidores. Você perde vendas por falta de profissionalismo visual.',
      solution: 'Pacote essencial para redes sociais',
      description: 'Artes profissionais que convertem seguidores em clientes. Design alinhado à sua marca e estratégias que funcionam.',
      price: 'R$ 699,99',
      features: ['20 artes mensais', 'Templates personalizados', 'Formatos otimizados', 'Branding consistente'],
      result: '+150% engajamento'
        },
        {
          id: 6,
      title: 'Social Media PRO',
      category: 'Design Pro',
      icon: <Zap className="w-5 h-5" />,
      accent: 'from-purple-500 to-indigo-500',
      problem: 'Precisa de estratégia e artes',
      problemDetail: 'Postar sem estratégia não gera resultado. Você precisa de conteúdo que vende, não só arte bonita.',
      solution: 'Versão completa com consultoria',
      description: 'Estratégia + arte = resultados. Conteúdo que converte, calendário editorial e artes profissionais que vendem.',
      price: 'R$ 949,99',
      features: ['Estratégia completa', '30 artes mensais', 'Calendário editorial', 'Consultoria mensal'],
      result: '+300% conversão'
        },
        {
          id: 7,
      title: 'Layout de Site',
          category: 'Design',
          icon: <Layout className="w-5 h-5" />,
      accent: 'from-indigo-500 to-blue-500',
      problem: 'Precisa de design pronto',
      problemDetail: 'Desenvolver sem design profissional resulta em sites que não vendem. Layout faz toda diferença na conversão.',
      solution: 'Design pronto para desenvolvimento',
      description: 'Layout profissional e moderno, otimizado para conversão. Design system completo, prototipagem e arquivos prontos para codar.',
      price: 'R$ 999,99',
      priceNote: '2 páginas',
      features: ['Design profissional', 'Prototipagem interativa', 'Design system', 'Arquivos organizados'],
      result: 'Pronto para desenvolver'
        },
        {
          id: 8,
      title: 'Hospedagem de Sites',
          category: 'Hosting',
          icon: <Server className="w-5 h-5" />,
      accent: 'from-gray-500 to-gray-700',
      problem: 'Hospedagem lenta ou instável',
      problemDetail: 'Site lento = cliente vai embora. 53% dos visitantes abandonam sites que demoram mais de 3s para carregar.',
      solution: 'Hospedagem profissional confiável',
      description: 'Servidores rápidos, estáveis e seguros. SSL incluso, backups automáticos e suporte técnico quando precisar.',
      price: 'R$ 40,00',
      priceNote: 'a partir de',
      features: ['Alta velocidade', 'SSL gratuito', 'Backups automáticos', 'Suporte 24/7'],
      result: '99,9% uptime'
    }
  ];

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 bg-black overflow-hidden"
    >
      <AnimatedBackground variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Seus concorrentes estão vendendo mais porque...</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="text-white">Eles já têm o que</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              você ainda não tem
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Enquanto você pensa, eles estão <span className="text-green-400 font-semibold">faturando</span>.
            <br />
            Veja como transformar cada problema em <span className="text-blue-400 font-semibold">oportunidade de venda</span>.
          </p>
        </motion.div>

        {/* FEATURED: Landing Page em Destaque */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-24"
        >
          <div className="bg-gradient-to-br from-gray-900/95 via-red-900/20 to-black/95 backdrop-blur-xl border-2 border-red-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-red-500/10">
            <div className="p-6 sm:p-8 md:p-12 lg:p-16">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${featuredService.accent} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <div className="text-white text-lg sm:text-xl">
                      {featuredService.icon}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider mb-1 sm:mb-2 block">
                      {featuredService.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {featuredService.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  {featuredService.priceNote && (
                    <span className="text-white/60 text-xs sm:text-sm mb-0.5 sm:mb-1">{featuredService.priceNote}</span>
                  )}
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{featuredService.price}</span>
                </div>
              </div>

              {/* Problem → Solution → Result Grid */}
              <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                {/* PROBLEMA */}
                <motion.div
                  className="p-4 sm:p-6 md:p-8 bg-red-500/10 border-2 border-red-500/30 rounded-xl sm:rounded-2xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-red-500/20 rounded-lg sm:rounded-xl">
                      <div className="text-sm sm:text-base">{featuredService.problem.icon}</div>
                </div>
                    <h4 className="font-bold text-red-400 text-xs sm:text-sm uppercase">O Problema</h4>
                  </div>
                  <h5 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 leading-tight">{featuredService.problem.title}</h5>
                  <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{featuredService.problem.description}</p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {featuredService.problem.losses.map((loss, i) => (
                      <li key={i} className="text-white/70 text-xs sm:text-sm flex items-start gap-1.5 sm:gap-2">
                        <span className="text-red-400 mt-1 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{loss}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* SOLUÇÃO */}
                <motion.div
                  className="p-4 sm:p-6 md:p-8 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl sm:rounded-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg sm:rounded-xl">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <h4 className="font-bold text-purple-400 text-xs sm:text-sm uppercase">A Solução</h4>
                  </div>
                  <h5 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 leading-tight">{featuredService.solution.title}</h5>
                  <ul className="space-y-2 sm:space-y-3">
                    {featuredService.solution.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-white/80 text-xs sm:text-sm flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                    {expandedService === featuredService.id && (
                      <AnimatePresence>
                        {featuredService.solution.features.slice(3).map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-white/80 text-xs sm:text-sm flex items-start gap-2 sm:gap-3"
                          >
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    )}
                    {featuredService.solution.features.length > 3 && (
                      <button
                        onClick={() => toggleService(featuredService.id)}
                        className="text-purple-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 mt-2 hover:text-purple-300 transition-colors"
                      >
                        {expandedService === featuredService.id ? 'Ver menos' : `Ver mais ${featuredService.solution.features.length - 3} itens`}
                        <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${expandedService === featuredService.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </ul>
                </motion.div>

                {/* RESULTADO */}
                <motion.div
                  className="p-4 sm:p-6 md:p-8 bg-green-500/10 border-2 border-green-500/30 rounded-xl sm:rounded-2xl"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg sm:rounded-xl">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    </div>
                    <h4 className="font-bold text-green-400 text-xs sm:text-sm uppercase">O Resultado</h4>
                  </div>
                  <h5 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 leading-tight">{featuredService.result.title}</h5>
                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                    {featuredService.result.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl">
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-xs sm:text-sm">{metric.label}</span>
                          <span className="text-white/50 text-[10px] sm:text-xs">{metric.value}</span>
                    </div>
                        <span className="text-lg sm:text-xl">{metric.icon}</span>
                    </div>
                    ))}
                  </div>
                  <div className="pt-3 sm:pt-4 border-t border-green-500/30">
                    <p className="text-white/70 text-xs sm:text-sm italic leading-relaxed">
                      "{featuredService.result.testimonial}"
                    </p>
                </div>
                </motion.div>
              </div>

              {/* CTA Principal */}
              <motion.button
                onClick={() => handleWhatsApp(featuredService.title)}
                className={`w-full md:w-auto md:mx-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r ${featuredService.accent} text-white font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="whitespace-nowrap">{featuredService.cta}</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

                 {/* Outros Serviços - Layout Expansível */}
         <div>
           <motion.div
             className="text-center mb-12"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
               Outras soluções para seu negócio
             </h3>
             <p className="text-white/60">
               Investimentos transparentes e competitivos
             </p>
           </motion.div>

                       <div className="space-y-3 sm:space-y-4">
              {otherServices.map((service, index) => (
            <motion.div
                  key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-10 blur-xl rounded-2xl transition-opacity duration-500 -z-10`} />
                  
                                     <div className="bg-gradient-to-br from-gray-900/95 via-gray-900/50 to-black/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 relative">
                {/* Header - Clickable */}
                <button
                  onClick={() => toggleService(service.id)}
                      className="w-full p-4 sm:p-5 md:p-6 text-left relative z-10 overflow-hidden"
                    >
                      {/* Top Row: Icon, Category/Badge, Price */}
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                          {/* Icon */}
                          <div 
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center shadow-lg flex-shrink-0 transition-transform duration-200 hover:scale-105`}
                          >
                            <div className="text-white text-sm sm:text-base">
                              {service.icon}
                            </div>
                          </div>

                          {/* Category and Badge */}
                          <div className="flex flex-col gap-0">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <span className="text-[10px] sm:text-xs font-semibold text-white/50 uppercase tracking-wider whitespace-nowrap">
                                {service.category}
                              </span>
                              {service.badge && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full text-green-400 text-[9px] sm:text-[10px] font-bold whitespace-nowrap"
                                >
                                  <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                  {service.badge}
                                </motion.span>
                              )}
                            </div>
                            
                            {/* Title - logo abaixo da categoria */}
                            <h4 className="text-base sm:text-lg font-bold text-white leading-tight" style={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {service.title}
                            </h4>
                          </div>
                        </div>

                        {/* Price + Chevron */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <div className="text-right">
                            {service.priceNote && (
                              <span className="text-white/60 text-[10px] sm:text-xs block mb-0.5 whitespace-nowrap">
                                {service.priceNote}
                              </span>
                            )}
                            <span className="text-lg sm:text-xl font-bold text-white block whitespace-nowrap">
                              {service.price}
                            </span>
                          </div>
                          <motion.div
                            animate={{ 
                              rotate: expandedService === service.id ? 180 : 0
                            }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="text-white/40 flex-shrink-0"
                          >
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Text Content - ocupa toda largura, passa embaixo do preço */}
                      <div className="flex gap-3 sm:gap-4 mt-2">
                        {/* Espaço para o ícone */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"></div>
                        
                        {/* Description - ocupam todo o resto */}
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <p className="text-white/70 text-xs sm:text-sm leading-snug" style={{ 
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word'
                          }}>
                            {service.description || service.solution}
                          </p>
                        </div>
                      </div>
                </button>

                                       {/* Expanded Content */}
                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                                                                                                           <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 border-t border-white/10 relative">
                              {/* Background Gradient */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-5`}
                              />
                             
                              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 relative z-10">
                                 {/* Left: Features */}
                                 <motion.div
                                   initial={{ x: -20, opacity: 0 }}
                                   animate={{ x: 0, opacity: 1 }}
                                   transition={{ delay: 0.2, duration: 0.4 }}
                                   className="min-w-0 flex flex-col"
                                 >
                                   <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                     <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                                     <h5 className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                              O que está incluído:
                                     </h5>
                                   </div>
                                   <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1">
                                     {service.features && service.features.map((feature, i) => (
                                       <motion.li
                                         key={i}
                                         initial={{ x: -10, opacity: 0 }}
                                         animate={{ x: 0, opacity: 1 }}
                                         transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                                         className="text-white/80 text-xs sm:text-sm flex items-start gap-2 sm:gap-3 group/item"
                                       >
                                         <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                         <span className="group-hover/item:text-white transition-colors break-words leading-relaxed">
                                    {feature}
                                  </span>
                                       </motion.li>
                                     ))}
                                   </ul>
                                   
                                   {/* Result Highlight */}
                                   {service.result && (
                                     <motion.div
                                       initial={{ scale: 0.9, opacity: 0 }}
                                       animate={{ scale: 1, opacity: 1 }}
                                       transition={{ delay: 0.6, duration: 0.3 }}
                                       className="p-2.5 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg w-full overflow-hidden"
                                     >
                                       <div className="flex items-center gap-2 min-w-0">
                                         <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                                         <span className="text-green-400 font-bold text-xs sm:text-sm truncate">
                                           {service.result}
                                         </span>
                            </div>
                                     </motion.div>
                                   )}
                                 </motion.div>

                                 {/* Right: Investment */}
                                 <motion.div
                                   initial={{ x: 20, opacity: 0 }}
                                   animate={{ x: 0, opacity: 1 }}
                                   transition={{ delay: 0.3, duration: 0.4 }}
                                   className="min-w-0"
                                 >
                                   <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                     <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                                     <h5 className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                                Investimento
                                     </h5>
                              </div>
                                   
                                   <div className="mb-4 sm:mb-6">
                                     {service.priceNote && (
                                       <span className="text-white/60 text-xs sm:text-sm block mb-1 break-words">
                                         {service.priceNote}
                                       </span>
                                     )}
                                     <motion.div
                                       initial={{ scale: 0.9 }}
                                       animate={{ scale: 1 }}
                                       transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                       className="text-2xl sm:text-3xl font-bold text-white break-words"
                                     >
                                {service.price}
                                     </motion.div>
                                     <motion.p
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                       transition={{ delay: 0.5 }}
                                       className="text-white/70 text-xs sm:text-sm mt-2 flex items-center gap-2 flex-wrap"
                                     >
                                       <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                                       <span className="break-words">Pagamento flexível disponível</span>
                                     </motion.p>
                            </div>

                                   <motion.button
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       handleWhatsApp(service.title);
                                     }}
                                     className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r ${service.accent} text-white font-bold text-sm sm:text-base rounded-lg shadow-lg shadow-black/20 transition-all duration-300 hover:opacity-90`}
                                     whileTap={{ scale: 0.98 }}
                                     initial={{ y: 20, opacity: 0 }}
                                     animate={{ y: 0, opacity: 1 }}
                                     transition={{ delay: 0.5, duration: 0.3 }}
                                   >
                                     <div className="flex items-center justify-center gap-2">
                                       <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                       <span className="whitespace-nowrap">Solicitar Orçamento</span>
                                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          </div>
                                   </motion.button>
                                 </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
           </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center p-8 md:p-12 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Não sabe qual serviço escolher?
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Fale comigo e descubra qual solução vai transformar seu negócio hoje mesmo.
          </p>
          <motion.button
            onClick={() => handleWhatsApp('Consulta Gratuita')}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Consulta Gratuita por WhatsApp</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
