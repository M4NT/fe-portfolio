import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Zap, Layers, CheckCircle2, Github, Briefcase, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import ProjectModal from './ProjectModal';
import AnimatedBackground from './AnimatedBackground';

const SelectedWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [progressKey, setProgressKey] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Enhanced project data focusing on technical skills
  const projects = [
    {
      id: '0',
      title: 'Porto Sião - Sistema de Consórcios',
      description: 'Plataforma completa para consórcios imobiliários e veículos pesados, oferecendo soluções sem juros para aquisição de bens de alto valor.',
      longDescription: 'Sistema robusto para Porto Sião, empresa especializada em consórcios imobiliários e veículos pesados. Plataforma completa com simuladores, gestão de clientes, sistema de contemplação e painel administrativo. Focada em transparência e facilidade de uso para clientes que buscam alternativas aos financiamentos tradicionais.',
      image: '/images/projects/projeto-5.png',
      liveUrl: 'https://portosiao.com.br',
      githubUrl: '#',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      features: [
        'Simulador de consórcios imobiliários e veículos pesados',
        'Sistema de gestão de clientes e contemplações',
        'Painel administrativo completo para gestão',
        'Sistema de parcelas sem juros transparente',
        'Relatórios e analytics para tomada de decisão',
        'Integração com sistemas de pagamento'
      ],
      challenges: [
        'Desenvolvimento de algoritmos complexos para simulação',
        'Interface intuitiva para diferentes perfis de usuário',
        'Sistema de contemplação justo e transparente',
        'Otimização para grandes volumes de dados'
      ],
      category: 'web' as const,
      skillsShowcased: ['Full-Stack Development', 'Financial Systems', 'Data Management', 'User Experience'],
      icon: <Layers className="w-6 h-6" />,
      color: 'from-blue-600 to-cyan-500',
      badge: '🏆 DESTAQUE - R$ 100M+ em Consórcios'
    },
    {
      id: '1',
      title: 'Goombo - Sistema de Gestão para Restaurantes',
      description: 'Sistema completo para hamburguerias e bares com gestão de pedidos, cardápio digital e delivery integrado.',
      longDescription: 'Sistema completo de gestão para restaurantes incluindo System Design, Design UI/UX, MVP Frontend em React/TypeScript e aplicativo mobile. Plataforma robusta com gestão de pedidos em tempo real, cardápio digital interativo, delivery integrado e aplicativo para garçons.',
      image: '/images/projects/projeto-1.png',
      liveUrl: 'https://goombo.com.br',
      githubUrl: '#',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'React Native', 'Node.js'],
      features: [
        'Gestão completa de pedidos com lançamentos em tempo real',
        'Cardápio digital interativo e moderno para clientes',
        'Sistema de delivery integrado com checkout online',
        'Aplicativo mobile para garçons com sincronização em tempo real',
        'Impressão automática de pedidos na cozinha',
        'Transferência de mesas e fechamento de contas'
      ],
      challenges: [
        'Arquitetura de System Design para escalabilidade',
        'Design UI/UX intuitivo para diferentes perfis de usuário',
        'Sincronização em tempo real entre app mobile e sistema web',
        'Otimização de performance para uso em ambiente de alta demanda'
      ],
      category: 'fullstack' as const,
      skillsShowcased: ['System Design', 'Full-Stack Development', 'React Native', 'Real-time Systems'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-600 to-orange-400'
    },
    {
      id: '2',
      title: 'Canora Tropical - Landing Page de Alto Padrão',
      description: 'Landing Page sofisticada para hospedagem premium em Palhoça-SC, com foco em conversão e experiência do usuário.',
      longDescription: 'Landing Page de conversão para propriedade de alto padrão na Pedra Branca, Palhoça-SC. Design elegante e sofisticado com integração de sistema de reservas, galeria profissional e otimização para SEO local. Focada em conversão de visitantes em reservas.',
      image: '/images/projects/projeto-2.png',
      liveUrl: 'https://canoratropical.com.br',
      githubUrl: '#',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'SEO'],
      features: [
        'Design sofisticado e elegante com paleta de cores naturais',
        'Sistema de reservas integrado com formulário de contato',
        'Galeria de fotos profissional com lightbox interativo',
        'Seção de depoimentos com avaliações de hóspedes',
        'Otimização SEO local para Florianópolis e região',
        'Responsivo e otimizado para dispositivos móveis'
      ],
      challenges: [
        'Criar design sofisticado que transmita exclusividade',
        'Otimizar imagens de alta qualidade mantendo performance',
        'Implementar estratégia de conversão eficiente',
        'SEO local para turismo na região de Florianópolis'
      ],
      category: 'web' as const,
      skillsShowcased: ['UI/UX Design', 'Landing Page', 'SEO Optimization', 'Conversion Focus'],
      icon: <Layers className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: '3',
      title: 'Agross do Brasil - Landing Page Agronegócio',
      description: 'Design completo de landing page para empresa de equipamentos agrícolas, focada em conversão B2B e experiência do produtor rural.',
      longDescription: 'Design profissional de landing page para Agross do Brasil, fabricante de equipamentos para agricultura e pecuária. Projeto focado em conversão B2B com layout institucional, catálogo de produtos, blog técnico e integração com WhatsApp para vendas. Design pensado para o público do agronegócio.',
      image: '/images/projects/projeto-3.png',
      liveUrl: 'https://agrossdobrasil.com.br',
      githubUrl: '#',
      technologies: ['UI/UX Design', 'Figma', 'Landing Page', 'B2B Design', 'Conversion Design'],
      features: [
        'Design profissional focado em B2B e agronegócio',
        'Layout institucional com catálogo de produtos completo',
        'Seções estratégicas: Agricultura, Pecuária, Blog e Eventos',
        'Integração com WhatsApp para contato direto com vendedores',
        'Blog técnico com conteúdo especializado para produtores',
        'Design responsivo pensado para o público rural'
      ],
      challenges: [
        'Criar design que transmita confiança e robustez',
        'Organizar catálogo extenso de produtos de forma intuitiva',
        'Adaptar linguagem visual para o público B2B rural',
        'Equilibrar informação técnica com usabilidade'
      ],
      category: 'web' as const,
      skillsShowcased: ['UI/UX Design', 'B2B Landing Page', 'Figma', 'Conversion Design'],
      icon: <Layers className="w-6 h-6" />,
      color: 'from-green-600 to-lime-500'
    },
    {
      id: '4',
      title: 'Protocolo Raiz - Landing Page de Conversão',
      description: 'Design de landing page de alta conversão para venda de infoprodutos, incluindo livro físico e sistema digital com videoaulas.',
      longDescription: 'Landing Page de captura e conversão para Protocolo Raiz, projeto focado em vendas de infoprodutos sobre desenvolvimento pessoal e riqueza. Design completo desenvolvido em WordPress, com estratégia de copywriting persuasivo, funil de vendas otimizado e layout pensado para maximizar conversões. Inclui seções estratégicas para captura de leads e vendas.',
      image: '/images/projects/projeto-4.png',
      liveUrl: 'https://protocoloraiz.com.br',
      githubUrl: '#',
      technologies: ['WordPress', 'UI/UX Design', 'Figma', 'Landing Page', 'Conversion Design', 'Copywriting'],
      features: [
        'Design de alta conversão focado em vendas de infoprodutos',
        'Landing page otimizada para captura de leads',
        'Layout persuasivo com copywriting estratégico',
        'Seções de benefícios e prova social',
        'Integração com sistema de pagamento para produtos físicos e digitais',
        'Estrutura de funil de vendas otimizada'
      ],
      challenges: [
        'Criar design que transmita confiança e credibilidade',
        'Estruturar funil de vendas eficiente para infoprodutos',
        'Desenvolver copywriting persuasivo alinhado ao design',
        'Otimizar taxa de conversão em WordPress personalizado'
      ],
      category: 'web' as const,
      skillsShowcased: ['Landing Page Design', 'WordPress', 'Conversion Optimization', 'Sales Funnel'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  const nextProject = () => {
    setImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setProgressKey(prev => prev + 1);
  };

  const prevProject = () => {
    setImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgressKey(prev => prev + 1);
  };

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
  };

  // Preload images to prevent loading issues
  useEffect(() => {
    const preloadImages = () => {
      projects.forEach(project => {
        const img = new Image();
        img.src = project.image;
        img.onload = () => {
          if (project.id === projects[currentIndex].id) {
            setImageLoading(false);
          }
        };
      });
    };
    
    preloadImages();
  }, [currentIndex, projects]);

  useEffect(() => {
    const AUTOPLAY_DURATION = 25000; // Aumentado de 15s para 25s
    let interval: NodeJS.Timeout | null = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            interval = setInterval(() => {
              setCurrentIndex((prev) => (prev + 1) % projects.length);
              setProgressKey(prev => prev + 1);
            }, AUTOPLAY_DURATION);
          } else {
            if (interval) clearInterval(interval);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, [projects.length]);


  const currentProject = projects[currentIndex];

  return (
    <section 
      id="works" 
      ref={containerRef}
      className="relative py-16 md:py-24 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground variant="subtle" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Trabalhos Selecionados</span>
          </motion.div>
          
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
              {t('works.title')}
            </span>
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Explore meus projetos mais relevantes e descubra como aplico
            <span className="text-cyan-400 font-semibold"> tecnologia e criatividade</span> para 
            entregar resultados excepcionais.
          </p>
        </motion.div>

        {/* Main Project Display */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left - Project Image */}
          <motion.div 
            className="relative group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="selected-works-image-container relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                style={{
                  background: 'transparent',
                  backgroundColor: 'transparent'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {imageLoading ? (
                  <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                    <div className="text-white/50 text-sm">Carregando...</div>
                  </div>
                ) : (
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg';
                      setImageLoading(false);
                    }}
                  />
                )}
                
                
                
                {/* Project Icon Badge */}
                <motion.div 
                  className={`absolute top-4 left-4 p-2 bg-gradient-to-br ${currentProject.color} rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out`}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <div className="text-white group-hover:text-white/90 transition-colors duration-300">
                    {currentProject.icon}
                  </div>
                </motion.div>

                {/* Quick Actions - Inside Image Frame */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/40 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-black/60 hover:border-white/50 hover:scale-105 transition-all duration-300 ease-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </motion.a>
                  {currentProject.githubUrl !== '#' && (
                    <motion.a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/40 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-black/60 hover:border-white/50 hover:scale-105 transition-all duration-300 ease-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4 text-white" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-4 sm:mt-6">
              <button
                onClick={prevProject}
                className="group/btn p-2 sm:p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover/btn:text-white transition-colors" />
              </button>

              {/* Progress Bar */}
              <div className="flex-1 mx-4 sm:mx-6 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={progressKey}
                  className={`h-full bg-gradient-to-r ${currentProject.color} rounded-full shadow-lg`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 25, ease: 'linear' }}
                />
              </div>

              <button
                onClick={nextProject}
                className="group/btn p-2 sm:p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover/btn:text-white transition-colors" />
              </button>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setProgressKey(prev => prev + 1);
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-8 sm:w-10 bg-white shadow-lg' 
                      : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50 hover:w-2 sm:hover:w-3'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Project Info */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/70 text-xs sm:text-sm uppercase tracking-wider font-inter">
                    {currentProject.category}
                  </span>
                </div>

                {/* Achievement Badge */}
                {currentProject.badge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-yellow-300 text-xs sm:text-sm font-semibold tracking-wider">
                      {currentProject.badge}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-inter font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  {currentProject.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Skills Showcased */}
                <div>
                  <h4 className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 font-inter">
                    Skills Showcased
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentProject.skillsShowcased.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/80 text-xs sm:text-sm hover:bg-white/10 hover:border-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 font-inter">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentProject.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        className={`px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r ${currentProject.color} bg-opacity-10 border border-white/20 rounded-lg text-white text-xs sm:text-sm`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 font-inter">
                    Key Features
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {currentProject.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Projects Completed', value: '5', color: 'from-blue-500 to-cyan-500' },
            { label: 'Technologies Used', value: '15+', color: 'from-purple-500 to-pink-500' },
            { label: 'Skills Demonstrated', value: '12+', color: 'from-green-500 to-emerald-500' },
            { label: 'Performance Score', value: '98%', color: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-3 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`text-2xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                {stat.value}
              </div>
              <div className="text-white/60 text-xs sm:text-sm uppercase tracking-wider font-inter">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default SelectedWorks;