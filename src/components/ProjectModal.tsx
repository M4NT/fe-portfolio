import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Smartphone, Tablet, Monitor, Code, Zap, Eye } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    liveUrl: string;
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
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300); // Reduzido de 1500ms para 300ms
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const deviceViewports = {
    mobile: { width: '375px', height: '667px', scale: 0.8 },
    tablet: { width: '768px', height: '1024px', scale: 0.6 },
    desktop: { width: '1440px', height: '900px', scale: 0.35 }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'tech', label: 'Technology', icon: <Code size={16} /> },
    { id: 'challenges', label: 'Challenges', icon: <Zap size={16} /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop with advanced blur */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />


          {/* Main Modal Content */}
          <motion.div
            className="relative w-full max-w-7xl h-full max-h-[90vh] mx-4 sm:mx-8 bg-gradient-to-br from-gray-900/95 to-black/95 border border-white/10 overflow-hidden rounded-lg"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-md border-b border-white/10 z-10">
              <div className="flex items-center justify-between h-full px-6">
                {/* Project Title */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                  <h2 className="font-inter font-medium text-white text-sm sm:text-lg truncate">
                    {project.title}
                  </h2>
                  <div className="text-white/40 text-xs sm:text-sm hidden sm:block">
                    — Live Preview
                  </div>
                </div>

                {/* Device Controls */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {(['mobile', 'tablet', 'desktop'] as const).map((device) => (
                    <button
                      key={device}
                      onClick={() => setCurrentDevice(device)}
                      className={`p-1.5 sm:p-2 rounded border transition-colors ${
                        currentDevice === device
                          ? 'bg-white/10 border-white/30'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {device === 'mobile' && <Smartphone size={14} className="sm:w-4 sm:h-4" />}
                      {device === 'tablet' && <Tablet size={14} className="sm:w-4 sm:h-4" />}
                      {device === 'desktop' && <Monitor size={14} className="sm:w-4 sm:h-4" />}
                    </button>
                  ))}

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="ml-4 p-2 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row h-full pt-16">
              {/* Left Panel - Project Info */}
              <div className="w-full lg:w-96 bg-black/50 border-r border-white/10 flex flex-col max-h-[40vh] lg:max-h-none">
                {/* Tab Navigation */}
                <div className="flex border-b border-white/10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm transition-colors ${
                        currentTab === tab.id
                          ? 'text-white bg-white/5 border-b-2 border-blue-500'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {currentTab === 'overview' && (
                    <div className="space-y-6">
                        <div>
                          <h3 className="text-white font-medium mb-3">Description</h3>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {project.longDescription}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-white font-medium mb-3">Key Features</h3>
                          <ul className="space-y-2">
                            {project.features.map((feature, index) => (
                              <li
                                key={index}
                                className="text-white/70 text-sm flex items-start space-x-2"
                              >
                                <span className="text-green-400 mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex space-x-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-600/20 border border-blue-600/30 rounded text-sm hover:bg-blue-600/30 transition-colors"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gray-600/20 border border-gray-600/30 rounded text-sm hover:bg-gray-600/30 transition-colors"
                          >
                            <Github size={14} />
                            <span>Code</span>
                          </a>
                        </div>
                    </div>
                  )}

                  {currentTab === 'tech' && (
                    <div className="space-y-6">
                        <div>
                          <h3 className="text-white font-medium mb-4">Technologies Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/80 hover:bg-white/15 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-white font-medium mb-3">Architecture</h3>
                          <div className="space-y-3 text-sm text-white/70">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span>Frontend: React + TypeScript</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span>Styling: Tailwind CSS</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span>Animations: Framer Motion</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <span>Performance: Optimized Bundle</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  )}

                  {currentTab === 'challenges' && (
                    <div className="space-y-6">
                        <div>
                          <h3 className="text-white font-medium mb-3">Technical Challenges</h3>
                          <div className="space-y-4">
                            {project.challenges.map((challenge, index) => (
                              <div
                                key={index}
                                className="p-3 bg-white/5 border border-white/10 rounded"
                              >
                                <p className="text-white/70 text-sm">{challenge}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Device Preview */}
              <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative min-h-[60vh] lg:min-h-0">
                <div className="relative">
                    {/* Device Frame */}
                    <div
                      className={`relative bg-gray-800 rounded-lg overflow-hidden shadow-2xl ${
                        currentDevice === 'mobile' ? 'rounded-3xl' : 
                        currentDevice === 'tablet' ? 'rounded-2xl' : 'rounded-lg'
                      }`}
                      style={{
                        width: deviceViewports[currentDevice].width,
                        height: deviceViewports[currentDevice].height,
                        transform: `scale(${deviceViewports[currentDevice].scale})`
                      }}
                    >
                      {/* Device Header */}
                      <div className="h-8 bg-gray-900 flex items-center justify-center relative">
                        {currentDevice === 'mobile' && (
                          <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                        )}
                        {currentDevice !== 'mobile' && (
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 bg-white relative overflow-hidden">
                        {isLoading ? (
                          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                            <div className="flex flex-col items-center space-y-4">
                              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                              <div className="text-gray-600 text-sm">Loading...</div>
                            </div>
                          </div>
                        ) : (
                          <iframe
                            src={project.liveUrl}
                            className="w-full h-full"
                            style={{
                              transform: currentDevice === 'mobile' ? 'scale(1)' : 'scale(1)',
                              transformOrigin: 'top left'
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Device Label */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 text-sm">
                      {currentDevice.charAt(0).toUpperCase() + currentDevice.slice(1)} Preview
                    </div>
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