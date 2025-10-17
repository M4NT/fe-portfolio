import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Code, Zap, Layers, Cpu, CheckCircle2, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import ProjectModal from './ProjectModal';

const SelectedWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [progressKey, setProgressKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Enhanced project data focusing on technical skills
  const projects = [
    {
      id: '0',
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
      id: '1',
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
      id: '2',
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
      id: '3',
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
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setProgressKey(prev => prev + 1);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgressKey(prev => prev + 1);
  };

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    const AUTOPLAY_DURATION = 15000;
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
      className="relative py-16 md:py-24 bg-black"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-white/40 text-sm uppercase tracking-wider mb-4 font-inter">
            {t('works.subtitle')} — Technical Showcase
          </div>
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            SKILL DEMONSTRATION
          </h2>
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Experience frontend mastery through interactive projects. Each piece demonstrates specific technical skills and modern development practices.
          </p>
        </motion.div>

        {/* Main Project Display */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Project Icon Badge */}
                <motion.div 
                  className={`absolute top-6 left-6 p-3 bg-gradient-to-br ${currentProject.color} rounded-xl shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-white">
                    {currentProject.icon}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.a>
                  {currentProject.githubUrl !== '#' && (
                    <motion.a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5 text-white" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevProject}
                className="group/btn p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white/70 group-hover/btn:text-white transition-colors" />
              </button>

              {/* Progress Bar */}
              <div className="flex-1 mx-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={progressKey}
                  className={`h-full bg-gradient-to-r ${currentProject.color} rounded-full`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 15, ease: 'linear' }}
                />
              </div>

              <button
                onClick={nextProject}
                className="group/btn p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <ArrowRight className="w-5 h-5 text-white/70 group-hover/btn:text-white transition-colors" />
              </button>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setProgressKey(prev => prev + 1);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'w-1 bg-white/30 hover:bg-white/50'
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
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/70 text-sm uppercase tracking-wider font-inter">
                    {currentProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-inter font-light text-4xl lg:text-5xl text-white leading-tight">
                  {currentProject.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-lg leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Skills Showcased */}
                <div>
                  <h4 className="text-white/60 text-sm uppercase tracking-wider mb-3 font-inter">
                    Skills Showcased
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.skillsShowcased.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm hover:bg-white/10 hover:border-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-white/60 text-sm uppercase tracking-wider mb-3 font-inter">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        className={`px-3 py-1.5 bg-gradient-to-r ${currentProject.color} bg-opacity-10 border border-white/20 rounded-lg text-white text-sm`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-white/60 text-sm uppercase tracking-wider mb-3 font-inter">
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {currentProject.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => openProjectModal(currentProject)}
                  className="group/cta relative inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-white font-medium">View Full Details</span>
                  <ArrowRight className="w-5 h-5 text-white/70 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Projects Completed', value: '30+', color: 'from-blue-500 to-cyan-500' },
            { label: 'Technologies Used', value: '15+', color: 'from-purple-500 to-pink-500' },
            { label: 'Skills Demonstrated', value: '12+', color: 'from-green-500 to-emerald-500' },
            { label: 'Performance Score', value: '98%', color: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider font-inter">
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
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default SelectedWorks;