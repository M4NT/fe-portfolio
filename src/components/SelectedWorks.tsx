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
      skillsShowcased: ['Performance Optimization', 'Real-time Systems', 'Data Visualization', 'TypeScript'],
      icon: <Layers className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
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
      skillsShowcased: ['WebGL/Three.js', 'GLSL Shaders', '3D Mathematics', 'Performance Engineering'],
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
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
      skillsShowcased: ['Full-Stack Development', 'Payment Integration', 'Database Design', 'State Management'],
      icon: <Code className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
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
      skillsShowcased: ['AI Integration', 'Real-time Collaboration', 'Editor Development', 'WebSocket Programming'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500'
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
            { label: 'Projects Completed', value: '4', color: 'from-blue-500 to-cyan-500' },
            { label: 'Technologies Used', value: '20+', color: 'from-purple-500 to-pink-500' },
            { label: 'Skills Demonstrated', value: '15+', color: 'from-green-500 to-emerald-500' },
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