import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Code, Zap, Layers, Cpu, Smartphone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import ProjectModal from './ProjectModal';

const SelectedWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Enhanced project data focusing on technical skills
  const projects = [
    {
      id: '1',
      title: 'Real-Time Analytics Dashboard',
      description: 'Advanced data visualization with WebSocket integration and real-time updates.',
      longDescription: 'A comprehensive analytics dashboard showcasing real-time data processing, interactive charts, and responsive design. Built with modern frontend technologies and optimized for performance across all devices.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      liveUrl: 'https://analytics-demo.vercel.app',
      githubUrl: 'https://github.com/demo/analytics',
      technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Real-time data streaming with WebSocket connections',
        'Interactive charts and data visualizations',
        'Responsive design for all screen sizes',
        'Advanced filtering and search capabilities',
        'Dark/light theme toggle',
        'Export data functionality'
      ],
      challenges: [
        'Optimizing real-time data rendering for 60fps performance',
        'Managing WebSocket connections and reconnection logic',
        'Creating responsive chart layouts across devices',
        'Implementing efficient state management for large datasets'
      ],
      category: 'fullstack' as const,
      skillsShowcased: ['Performance Optimization', 'Real-time Systems', 'Data Visualization', 'TypeScript']
    },
    {
      id: '2',
      title: 'Interactive 3D Portfolio',
      description: 'WebGL-powered 3D experience with custom shaders and particle systems.',
      longDescription: 'An immersive 3D portfolio experience showcasing advanced WebGL techniques, custom GLSL shaders, and interactive particle systems. Demonstrates mastery of 3D graphics programming and performance optimization.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
      liveUrl: 'https://3d-portfolio-demo.vercel.app',
      githubUrl: 'https://github.com/demo/3d-portfolio',
      technologies: ['Three.js', 'React', 'GLSL', 'WebGL', 'Cannon.js', 'Framer Motion'],
      features: [
        'Custom GLSL shaders for visual effects',
        'Physics-based animations and interactions',
        'Responsive 3D scenes across devices',
        'Performance monitoring and optimization',
        'Progressive loading and asset optimization',
        'Touch and mouse interaction support'
      ],
      challenges: [
        'Optimizing 3D performance for mobile devices',
        'Creating responsive 3D layouts',
        'Managing GPU memory and texture streaming',
        'Implementing complex shader effects while maintaining 60fps'
      ],
      category: 'web' as const,
      skillsShowcased: ['WebGL/Three.js', 'GLSL Shaders', '3D Mathematics', 'Performance Engineering']
    },
    {
      id: '3',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with advanced cart logic and payment integration.',
      longDescription: 'A complete e-commerce platform featuring advanced shopping cart functionality, secure payment processing, and admin dashboard. Showcases full-stack development skills and modern web architecture.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      githubUrl: 'https://github.com/demo/ecommerce',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Redux Toolkit'],
      features: [
        'Advanced product filtering and search',
        'Shopping cart with persistent state',
        'Secure payment processing with Stripe',
        'User authentication and profile management',
        'Admin dashboard with analytics',
        'Inventory management system'
      ],
      challenges: [
        'Implementing complex cart logic with various discount types',
        'Optimizing database queries for large product catalogs',
        'Creating secure payment flows',
        'Building responsive admin interfaces'
      ],
      category: 'fullstack' as const,
      skillsShowcased: ['Full-Stack Development', 'Payment Integration', 'Database Design', 'State Management']
    },
    {
      id: '4',
      title: 'AI-Powered Code Editor',
      description: 'Smart code editor with AI suggestions, syntax highlighting, and collaborative features.',
      longDescription: 'An intelligent code editor featuring AI-powered code suggestions, real-time collaboration, and advanced syntax highlighting. Demonstrates integration of AI services and real-time communication technologies.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      liveUrl: 'https://ai-editor-demo.vercel.app',
      githubUrl: 'https://github.com/demo/ai-editor',
      technologies: ['React', 'Monaco Editor', 'OpenAI API', 'Socket.io', 'Node.js', 'Redis'],
      features: [
        'AI-powered code completion and suggestions',
        'Real-time collaborative editing',
        'Advanced syntax highlighting for 20+ languages',
        'Integrated terminal and file explorer',
        'Theme customization and extensions',
        'Version control integration'
      ],
      challenges: [
        'Integrating AI APIs with low latency requirements',
        'Implementing real-time collaborative editing conflicts resolution',
        'Optimizing editor performance for large files',
        'Creating extensible plugin architecture'
      ],
      category: 'web' as const,
      skillsShowcased: ['AI Integration', 'Real-time Collaboration', 'Editor Development', 'WebSocket Programming']
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <>
      <section 
        id="works" 
        ref={containerRef}
        className="relative min-h-screen py-16 sm:py-24 md:py-32"
        style={{
          background: 'linear-gradient(180deg, black 0%, #0a0a0a 50%, #1a1a1a 100%)'
        }}
      >
        {/* Morphing Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
            animate={{ 
              scale: [1, 1.5, 1.2],
              x: [-100, 100, -50],
              y: [-50, 50, -25]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 rounded-full bg-gradient-to-r from-green-500/10 to-teal-500/10 blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.3],
              x: [50, -100, 75],
              y: [25, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dynamic Grid */}
          <motion.div 
            className="absolute inset-0 opacity-[0.02] hidden md:block"
            style={{ y }}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
          style={{ opacity }}
        >
          {/* Section Header */}
          <motion.div 
            className="mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-white/40 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 font-inter text-center md:text-left"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            >
              {t('works.subtitle')} — Technical Showcase
            </motion.div>
            <h2 className="font-inter font-light text-3xl sm:text-5xl lg:text-6xl xl:text-8xl leading-none tracking-[-0.03em] text-white mb-4 sm:mb-6 text-center md:text-left">
              SKILL DEMONSTRATION
            </h2>
            <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-3xl text-center md:text-left mx-auto md:mx-0">
              Experience frontend mastery through interactive projects. Each piece demonstrates specific technical skills and modern development practices.
            </p>
          </motion.div>

          {/* Main Project Display */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Project Showcase */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              {/* Project Image */}
              <motion.div 
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => openProjectModal(currentProject)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                  >
                    <ImageWithFallback
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating Action Button */}
                <motion.div
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                </motion.div>

                {/* Skills Tags */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-wrap gap-1 sm:gap-2">
                  {currentProject.skillsShowcased.slice(0, 3).map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 8, ease: "linear" }}
                    key={currentIndex}
                  />
                </div>
              </motion.div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-4 sm:mt-6">
                <motion.button
                  onClick={prevProject}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/5 border border-white/20 rounded hover:bg-white/10 transition-colors magnetic"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm hidden sm:inline">{t('works.previous')}</span>
                  <span className="text-xs sm:hidden">Prev</span>
                </motion.button>

                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-white' : 'bg-white/30'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextProject}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/5 border border-white/20 rounded hover:bg-white/10 transition-colors magnetic"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs sm:text-sm hidden sm:inline">{t('works.next')}</span>
                  <span className="text-xs sm:hidden">Next</span>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              className="space-y-6 sm:space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Project Title */}
                  <div>
                    <motion.div 
                      className="text-white/40 text-xs sm:text-sm uppercase tracking-wider mb-2 font-inter"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Project {String(currentIndex + 1).padStart(2, '0')}
                    </motion.div>
                    <h3 className="font-inter font-light text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight">
                      {currentProject.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Technology Stack */}
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2">
                      <Code size={14} className="sm:w-4 sm:h-4" />
                      <span>Technology Stack</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentProject.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white/80 hover:bg-white/15 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2">
                      <Zap size={14} className="sm:w-4 sm:h-4" />
                      <span>Key Features</span>
                    </h4>
                    <ul className="space-y-2">
                      {currentProject.features.slice(0, 3).map((feature, index) => (
                        <motion.li
                          key={index}
                          className="text-white/70 text-xs sm:text-sm flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                    <motion.button
                      onClick={() => openProjectModal(currentProject)}
                      className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-500 hover:to-purple-500 transition-all magnetic"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Layers size={14} className="sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base">Explore Project</span>
                    </motion.button>
                    
                    <motion.a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 border border-white/20 text-white rounded hover:bg-white/10 transition-colors magnetic"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base">Live Demo</span>
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Skills Demonstration Grid */}
          <motion.div
            className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <Code size={20} className="sm:w-6 sm:h-6" />, title: 'Clean Code', desc: 'Maintainable & Scalable' },
              { icon: <Zap size={20} className="sm:w-6 sm:h-6" />, title: 'Performance', desc: 'Optimized & Fast' },
              { icon: <Layers size={20} className="sm:w-6 sm:h-6" />, title: 'Architecture', desc: 'Well-structured' },
              { icon: <Smartphone size={20} className="sm:w-6 sm:h-6" />, title: 'Responsive', desc: 'All Devices' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-white/60 group-hover:text-white transition-colors mb-2 sm:mb-3">
                  {item.icon}
                </div>
                <h4 className="text-white font-medium mb-1 text-sm sm:text-base">{item.title}</h4>
                <p className="text-white/60 text-xs sm:text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject || projects[0]}
      />
    </>
  );
};

export default SelectedWorks;