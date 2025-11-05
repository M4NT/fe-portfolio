import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, TrendingUp, TrendingDown, DollarSign, Users, Zap, CheckCircle2, AlertCircle, Target, MessageCircle, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import ProjectModal from './ProjectModal';
import AnimatedBackground from './AnimatedBackground';
import { trackCTAClick } from '../lib/analytics';

const SelectedWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const whatsappNumber = '5516992233365';
  
  const handleWhatsApp = (projectName: string) => {
    const message = encodeURIComponent(`Olá! Vi o caso de sucesso "${projectName}" e quero resultados similares para meu negócio. Podemos conversar?`);
    trackCTAClick(`whatsapp-${projectName.toLowerCase().replace(/\s+/g, '-')}`, 'selected-works', `https://wa.me/${whatsappNumber}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // Casos de sucesso focados em RESULTADOS
  const projects = [
    {
      id: '0',
      title: 'Porto Sião - Sistema de Consórcios',
      category: 'Financeiro',
      image: '/images/projects/projeto-5.webp',
      liveUrl: 'https://portosiao.com.br',
      description: 'Plataforma completa para consórcios imobiliários e veículos pesados, oferecendo soluções sem juros para aquisição de bens de alto valor.',
      before: {
        problems: [],
        metrics: []
      },
      solution: {
        items: [
          'Simulador de consórcios imobiliários e veículos pesados',
          'Sistema de gestão de clientes e contemplações',
          'Painel administrativo completo para gestão'
        ]
      },
      after: {
        metrics: [],
        testimonial: '',
        clientName: ''
      }
    },
    {
      id: '1',
      title: 'Goombo - Sistema de Gestão para Restaurantes',
      category: 'Gastronomia',
      image: '/images/projects/projeto-2.webp',
      liveUrl: '#',
      description: 'Sistema completo para hamburguerias e bares com gestão de pedidos, cardápio digital e delivery integrado.',
      before: {
        problems: [],
        metrics: []
      },
      solution: {
        items: [
          'Gestão completa de pedidos com lançamentos em tempo real',
          'Cardápio digital interativo e moderno para clientes',
          'Sistema de delivery integrado com checkout online'
        ]
      },
      after: {
        metrics: [],
        testimonial: '',
        clientName: ''
      }
    },
    {
      id: '2',
      title: 'Agross do Brasil - Landing Page Agronegócio',
      category: 'Agronegócio',
      image: '/images/projects/projeto-3.webp',
      liveUrl: '#',
      description: 'Design completo de landing page para empresa de equipamentos agrícolas, focada em conversão B2B e experiência do produtor rural.',
      before: {
        problems: [],
        metrics: []
      },
      solution: {
        items: [
          'Design profissional focado em B2B e agronegócio',
          'Layout institucional com catálogo de produtos completo',
          'Seções estratégicas: Agricultura, Pecuária, Blog e Eventos'
        ]
      },
      after: {
        metrics: [],
        testimonial: '',
        clientName: ''
      }
    },
    {
      id: '3',
      title: 'Protocolo Raiz - Landing Page de Conversão',
      category: 'Infoproduto',
      image: '/images/projects/projeto-4.webp',
      liveUrl: '#',
      description: 'Design de landing page de alta conversão para venda de infoprodutos, incluindo livro físico e sistema digital com videoaulas.',
      before: {
        problems: [],
        metrics: []
      },
      solution: {
        items: [
          'Design de alta conversão focado em vendas de infoprodutos',
          'Landing page otimizada para captura de leads',
          'Layout persuasivo com copywriting estratégico'
        ]
      },
      after: {
        metrics: [],
        testimonial: '',
        clientName: ''
      }
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <section 
      id="works" 
      ref={containerRef}
      className="relative py-16 md:py-24 bg-black overflow-hidden"
    >
      <AnimatedBackground variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline - Focada em Resultados */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Casos de Sucesso Reais</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Veja o que acontece</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              quando você age
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Não são promessas. São <span className="text-green-400 font-semibold">resultados reais</span> que transformaram
            <br />
            negócios de verdade. <span className="text-blue-400 font-semibold">O seu pode ser o próximo.</span>
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative">
          {/* Project Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden min-h-[600px]"
          >
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 p-6 lg:p-8 h-full">
              {/* Left: Project Info */}
              <div className="space-y-6 flex flex-col">
                {/* Category Tag */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">
                    {currentProject.category === 'Financeiro' && 'FULLSTACK'}
                    {currentProject.category === 'Gastronomia' && 'FULLSTACK'}
                    {currentProject.category === 'Agronegócio' && 'DESIGN'}
                    {currentProject.category === 'Infoproduto' && 'DESIGN'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {currentProject.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm mb-6">
                    {currentProject.description || 'Solução completa que transforma resultados.'}
                  </p>
                </div>

                {/* SKILLS SHOWCASED */}
                <div>
                  <h4 className="text-white text-xs font-semibold uppercase mb-3 tracking-wider">SKILLS SHOWCASED</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.category === 'Financeiro' && (
                      <>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">System Design</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Full-Stack Development</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Financial Systems</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Data Management</span>
                      </>
                    )}
                    {currentProject.category === 'Gastronomia' && (
                      <>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">System Design</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Full-Stack Development</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">React Native</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Real-time Systems</span>
                      </>
                    )}
                    {(currentProject.category === 'Agronegócio' || currentProject.category === 'Infoproduto') && (
                      <>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">UI/UX Design</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Landing Page</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Visual Identity</span>
                        <span className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-xs font-medium">Conversion Optimization</span>
                      </>
                    )}
                  </div>
                </div>

                {/* TECHNOLOGIES USED */}
                <div>
                  <h4 className="text-white text-xs font-semibold uppercase mb-3 tracking-wider">TECHNOLOGIES USED</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.category === 'Financeiro' && (
                      <>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">React</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Next.js</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">TypeScript</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Tailwind CSS</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Node.js</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">PostgreSQL</span>
                      </>
                    )}
                    {currentProject.category === 'Gastronomia' && (
                      <>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">React</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">TypeScript</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Next.js</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Tailwind CSS</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">React Native</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Node.js</span>
                      </>
                    )}
                    {(currentProject.category === 'Agronegócio' || currentProject.category === 'Infoproduto') && (
                      <>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Figma</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Adobe XD</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Illustrator</span>
                        <span className="px-3 py-1.5 bg-orange-500/30 border border-orange-500/60 rounded text-orange-300 text-xs font-medium">Photoshop</span>
                      </>
                    )}
                  </div>
                </div>

                {/* KEY FEATURES */}
                <div className="flex-grow">
                  <h4 className="text-white text-xs font-semibold uppercase mb-3 tracking-wider">KEY FEATURES</h4>
                  <ul className="space-y-3">
                    {currentProject.solution.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-white/80 text-sm flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => handleWhatsApp(currentProject.title)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 mt-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Quero resultados similares</span>
                </motion.button>
              </div>

              {/* Right: Image Only */}
              <div className="flex items-center justify-center">
                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 min-h-[450px] w-full flex items-center justify-center">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-auto max-h-[550px] object-contain"
                  />
                  
                  {/* Button inside image */}
                  {currentProject.liveUrl && currentProject.liveUrl !== '#' && (
                    <motion.a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 bg-black/80 backdrop-blur-sm hover:bg-black/90 border border-white/30 rounded-lg text-white text-sm font-medium transition-all shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver projeto ao vivo
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={prevProject}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Projeto anterior"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-green-400'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextProject}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Próximo projeto"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center p-6 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-white/20 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Seu negócio pode ter resultados assim também
          </h3>
          <p className="text-white/70 mb-4 text-sm">
            Vamos conversar sobre como transformar seu caso em mais um sucesso.
          </p>
          <motion.button
            onClick={() => handleWhatsApp('Quero Resultados Similares')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Quero Ser o Próximo Caso de Sucesso</span>
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorks;