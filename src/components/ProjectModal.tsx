import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Smartphone, Tablet, Monitor, Code, Zap, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

// MODIFICAÇÃO 1: HOOK PARA DETECTAR O TAMANHO DA JANELA (essencial para responsividade)
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number | undefined }>({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// MODIFICAÇÃO 2: INTERFACE ATUALIZADA
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    liveUrl?: string; // Agora é opcional
    images?: string[]; // Novo array de imagens para o carrossel
    githubUrl: string;
    technologies: string[];
    features: string[];
    challenges: string[];
    category: 'web' | 'mobile' | 'fullstack';
  };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<'overview' | 'tech' | 'challenges'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para o carrossel
  const { t } = useLanguage();

  const { width } = useWindowSize();
  const isMobile = width !== undefined && width < 768;

  const hasLivePreview = project.liveUrl && project.liveUrl.trim() !== '';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Resetar estados
      setIsLoading(true);
      setCurrentTab('overview');
      setCurrentImageIndex(0);
      setCurrentDevice(isMobile ? 'mobile' : 'desktop');

      if (hasLivePreview) {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
      } else {
        setIsLoading(false); // Não há preview para carregar
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, hasLivePreview, isMobile]);

  const deviceViewports = {
    mobile: { width: 375, height: 667, scale: isMobile ? 1 : 0.8 },
    tablet: { width: 768, height: 1024, scale: 0.7 },
    desktop: { width: 1440, height: 900, scale: 0.5 }
  };

  const currentViewport = deviceViewports[currentDevice];

  const tabs = [
    { id: 'overview', label: t('overview'), icon: <Eye size={16} /> },
    { id: 'tech', label: t('technology'), icon: <Code size={16} /> },
    { id: 'challenges', label: t('challenges'), icon: <Zap size={16} /> }
  ];

  const deviceIcons = {
    mobile: <Smartphone size={16} />,
    tablet: <Tablet size={16} />,
    desktop: <Monitor size={16} />,
  };

  const goToPreviousImage = () => setCurrentImageIndex(prev => (prev === 0 ? (project.images?.length || 1) - 1 : prev - 1));
  const goToNextImage = () => setCurrentImageIndex(prev => (prev === (project.images?.length || 1) - 1 ? 0 : prev + 1));


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-2 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop (sem alterações) */}
          <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />

          {/* Efeitos de iluminação (sem alterações) */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 1, delay: 0.3 }} style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 50%, transparent 100%)' }} />
            <motion.div className="absolute top-0 left-1/2 w-2 h-32 bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
          </div>

          {/* MODIFICAÇÃO 3: LAYOUT RESPONSIVO (flex-col md:flex-row) E SCROLL NO MOBILE */}
          <motion.div
            className="relative w-full max-w-7xl h-full max-h-[95vh] bg-gradient-to-br from-gray-900/95 to-black/95 border border-white/10 rounded-lg flex flex-col md:flex-row overflow-hidden"
            initial={{ scale: 0.8, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Wrapper para controle de scroll */}
            <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

              {/* PAINEL ESQUERDO (INFO) - Ajustado para responsividade */}
              <motion.div
                className="w-full md:w-96 flex-shrink-0 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 flex flex-col"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Header do painel esquerdo */}
                <div className="flex h-16 flex-shrink-0 items-center justify-between px-6 border-b border-white/10">
                  <div className="flex items-center space-x-4">
                    <motion.div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <h2 className="font-inter font-medium text-white text-lg">{project.title}</h2>
                  </div>
                  {/* Botão de fechar visível no mobile aqui */}
                  <div className="md:hidden">
                    <motion.button
                      onClick={onClose}
                      className="p-2 bg-red-500/20 border border-red-500/30 rounded flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Abas de navegação (sem alterações) */}
                <div className="flex border-b border-white/10">
                  {tabs.map((tab) => <motion.button key={tab.id} onClick={() => setCurrentTab(tab.id as any)} className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm transition-colors ${currentTab === tab.id ? 'text-white bg-white/5 border-b-2 border-blue-500' : 'text-white/60 hover:text-white hover:bg-white/5'}`} whileHover={{ y: -1 }} transition={{ duration: 0.1 }}>{tab.icon}<span>{tab.label}</span></motion.button>)}
                </div>

                {/* Conteúdo das abas (sem alterações, tudo preservado) */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {currentTab === 'overview' && <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6"><div><h3 className="text-white font-medium mb-3">{t('description')}</h3><p className="text-white/70 text-sm leading-relaxed">{project.longDescription}</p></div><div><h3 className="text-white font-medium mb-3">{t('key_features')}</h3><ul className="space-y-2">{project.features.map((feature, index) => <motion.li key={index} className="text-white/70 text-sm flex items-start space-x-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}><span className="text-green-400 mt-1">•</span><span>{feature}</span></motion.li>)}</ul></div><div className="flex space-x-3">{hasLivePreview && <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-600/20 border border-blue-600/30 rounded text-sm hover:bg-blue-600/30" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ExternalLink size={14} /><span>Live Demo</span></motion.a>}<motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gray-600/20 border border-gray-600/30 rounded text-sm hover:bg-gray-600/30" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Github size={14} /><span>{t('code')}</span></motion.a></div></motion.div>}
                    {currentTab === 'tech' && <motion.div key="tech" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6"><div><h3 className="text-white font-medium mb-4">{t('technologies_used')}</h3><div className="flex flex-wrap gap-2">{project.technologies.map((tech, index) => <motion.span key={tech} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/80" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.05 }}>{tech}</motion.span>)}</div></div></motion.div>}
                    {currentTab === 'challenges' && <motion.div key="challenges" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6"><div><h3 className="text-white font-medium mb-3">{t('technical_challenges')}</h3><div className="space-y-4">{project.challenges.map((challenge, index) => <motion.div key={index} className="p-3 bg-white/5 border border-white/10 rounded" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}><p className="text-white/70 text-sm">{challenge}</p></motion.div>)}</div></div></motion.div>}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* PAINEL DIREITO (PREVIEW) */}
              <div className="flex-1 flex flex-col relative min-h-[450px] md:min-h-0">
                {/* Header do painel direito (só para desktop) */}
                <div className="hidden md:flex absolute top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-md border-b border-white/10 z-10 items-center justify-end px-6 space-x-4">
                  <div className="flex-1 text-white/40 text-sm">{hasLivePreview ? '— Live Preview' : '— Galeria de Imagens'}</div>
                  {hasLivePreview && !isMobile && (
                    <div className="flex items-center space-x-2">
                      {(['mobile', 'tablet', 'desktop'] as const).map(device => <motion.button key={device} onClick={() => setCurrentDevice(device)} className={`p-2 rounded border transition-colors ${currentDevice === device ? 'bg-white/10 border-white/30' : 'border-white/10 hover:border-white/20'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{deviceIcons[device]}</motion.button>)}
                    </div>
                  )}
                  <motion.button onClick={onClose} className="p-2 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><X size={16} /></motion.button>
                </div>

                {/* Área de conteúdo do preview */}
                <div className="flex-1 flex items-center justify-center p-4 md:p-8 md:pt-16 relative overflow-hidden">
                  {hasLivePreview ? (
                    // CASO 1: TEM LIVE PREVIEW
                    <motion.div key={currentDevice} className="relative flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* MODIFICAÇÃO 4: CORREÇÃO DE POSICIONAMENTO COM WRAPPER */}
                      <div style={{ width: currentViewport.width * currentViewport.scale, height: isMobile ? '100%' : currentViewport.height * currentViewport.scale }} className="relative">
                        <div style={{ width: currentViewport.width, height: currentViewport.height, transform: `scale(${currentViewport.scale})`, transformOrigin: 'top left' }} className={`relative bg-gray-800 shadow-2xl ${isMobile ? 'rounded-lg w-full h-full' : (currentDevice === 'mobile' ? 'rounded-3xl' : 'rounded-2xl')}`}>
                          <div className="h-8 bg-gray-900 flex items-center justify-center relative">{currentDevice === 'mobile' && <div className="w-16 h-1 bg-gray-600 rounded-full"></div>}{currentDevice !== 'mobile' && <div className="flex space-x-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><div className="w-3 h-3 bg-yellow-500 rounded-full"></div><div className="w-3 h-3 bg-green-500 rounded-full"></div></div>}</div>
                          <div className="h-[calc(100%-2rem)] bg-white relative overflow-hidden">
                            {isLoading ? (<motion.div className="absolute inset-0 bg-gray-100 flex items-center justify-center"><div className="flex flex-col items-center space-y-4"><motion.div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><div className="text-gray-600 text-sm">Loading...</div></div></motion.div>) : (<motion.iframe src={project.liveUrl} title={project.title} className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // CASO 2: NÃO TEM LIVE PREVIEW (MOSTRAR CARROSSEL)
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg shadow-2xl bg-black/20">
                        <AnimatePresence><motion.img key={currentImageIndex} src={project.images?.[currentImageIndex] || project.image} className="absolute w-full h-full object-contain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /></AnimatePresence>
                        {project.images && project.images.length > 1 && <> <button onClick={goToPreviousImage} className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-black/50 p-2 rounded-full z-10 hover:bg-black/75"><ChevronLeft size={24} /></button><button onClick={goToNextImage} className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-black/50 p-2 rounded-full z-10 hover:bg-black/75"><ChevronRight size={24} /></button> </>}
                      </div>
                      <div className="flex space-x-2 mt-4">{project.images?.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'}`} />)}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;