import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Zap, Eye, Github, ExternalLink, Cpu, Database, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';

const SideProjects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'experiment' | 'tool' | 'library'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Technical experiments and tools
  const experiments = [
    {
      id: 1,
      title: 'WebGL Particle System',
      description: 'Interactive particle physics with GPU acceleration',
      category: 'experiment' as const,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      githubUrl: 'https://github.com/demo/webgl-particles',
      liveUrl: 'https://webgl-particles.demo.dev',
      technologies: ['WebGL', 'GLSL', 'JavaScript', 'Canvas API'],
      complexity: 'Advanced',
      performance: '60 FPS',
      highlight: 'Custom physics engine',
      stats: { particles: '10,000+', fps: '60', memory: '< 50MB' }
    },
    {
      id: 2,
      title: 'CSS Grid Generator',
      description: 'Visual tool for creating complex CSS Grid layouts',
      category: 'tool' as const,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      githubUrl: 'https://github.com/demo/css-grid-gen',
      liveUrl: 'https://css-grid-gen.demo.dev',
      technologies: ['React', 'CSS Grid', 'TypeScript', 'Canvas'],
      complexity: 'Intermediate',
      performance: 'Instant',
      highlight: 'Real-time preview',
      stats: { grids: '500+', users: '2.5K', saves: '1.2K' }
    },
    {
      id: 3,
      title: 'Micro Frontend Orchestrator',
      description: 'Dynamic loading and orchestration of micro frontends',
      category: 'library' as const,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      githubUrl: 'https://github.com/demo/micro-fe-orchestrator',
      liveUrl: 'https://micro-fe.demo.dev',
      technologies: ['Module Federation', 'Webpack', 'React', 'TypeScript'],
      complexity: 'Expert',
      performance: 'Lazy Loaded',
      highlight: 'Zero-config setup',
      stats: { modules: '15+', bundles: '< 100KB', load: '< 200ms' }
    },
    {
      id: 4,
      title: 'SVG Animation Studio',
      description: 'Interactive tool for creating complex SVG animations',
      category: 'experiment' as const,
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=400&fit=crop',
      githubUrl: 'https://github.com/demo/svg-studio',
      liveUrl: 'https://svg-studio.demo.dev',
      technologies: ['SVG', 'GSAP', 'React', 'Timeline API'],
      complexity: 'Advanced',
      performance: 'Smooth',
      highlight: 'Visual timeline editor',
      stats: { animations: '100+', exports: '500+', presets: '25' }
    },
    {
      id: 5,
      title: 'React Performance Monitor',
      description: 'Real-time performance monitoring and optimization suggestions',
      category: 'tool' as const,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      githubUrl: 'https://github.com/demo/react-perf-monitor',
      liveUrl: 'https://react-perf.demo.dev',
      technologies: ['React DevTools API', 'Performance API', 'Chart.js'],
      complexity: 'Advanced',
      performance: 'Real-time',
      highlight: 'Automated suggestions',
      stats: { metrics: '20+', reports: '1K+', optimizations: '300+' }
    },
    {
      id: 6,
      title: 'WebAssembly Image Processor',
      description: 'High-performance image processing using WebAssembly',
      category: 'experiment' as const,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      githubUrl: 'https://github.com/demo/wasm-image-processor',
      liveUrl: 'https://wasm-images.demo.dev',
      technologies: ['WebAssembly', 'Rust', 'Canvas API', 'Web Workers'],
      complexity: 'Expert',
      performance: '5x Faster',
      highlight: 'Native performance',
      stats: { filters: '15+', speed: '5x', memory: 'Efficient' }
    }
  ];

  const filteredExperiments = experiments.filter(exp => 
    filter === 'all' || exp.category === filter
  );

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Globe size={14} className="sm:w-4 sm:h-4" /> },
    { id: 'experiment', label: 'Experiments', icon: <Zap size={14} className="sm:w-4 sm:h-4" /> },
    { id: 'tool', label: 'Tools', icon: <Code size={14} className="sm:w-4 sm:h-4" /> },
    { id: 'library', label: 'Libraries', icon: <Database size={14} className="sm:w-4 sm:h-4" /> }
  ];

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, black 100%),
          radial-gradient(circle at 30% 20%, rgba(59,130,246,0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-[0.03] hidden md:block"
          style={{ y: backgroundY }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </motion.div>

        {/* Floating Code Snippets - Desktop Only */}
        <motion.div 
          className="absolute top-1/4 left-1/6 text-green-400/10 font-mono text-xs hidden lg:block"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          const magic = () =&gt; {'{'}
          <br />
          &nbsp;&nbsp;return &lt;Experience /&gt;;
          <br />
          {'}'};
        </motion.div>

        <motion.div 
          className="absolute bottom-1/3 right-1/6 text-blue-400/10 font-mono text-xs hidden lg:block"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          .skill {'{'}
          <br />
          &nbsp;&nbsp;level: 'expert';
          <br />
          &nbsp;&nbsp;passion: 'infinite';
          <br />
          {'}'}
        </motion.div>
      </div>

      <motion.div 
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
        style={{ y }}
      >
        {/* Section Header */}
        <motion.div 
          className="mb-12 sm:mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-white/40 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 font-inter"
          >
            Technical Experiments & Tools
          </motion.div>
          <h2 className="font-inter font-light text-3xl sm:text-5xl lg:text-6xl xl:text-8xl leading-none tracking-[-0.03em] text-white mb-4 sm:mb-6">
            SKILL LABORATORY
          </h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-4xl mx-auto px-4">
            Exploring cutting-edge technologies through hands-on experimentation. Each project demonstrates specific technical challenges and innovative solutions.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div 
          className="flex justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full max-w-full overflow-x-auto">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id as any)}
                className={`flex items-center space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  filter === category.id
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          layout
        >
          <AnimatePresence>
            {filteredExperiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                className="group relative"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(experiment.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Main Card */}
                <motion.div
                  className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-500"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={experiment.image}
                      alt={experiment.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating Stats */}
                    <motion.div
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium">
                        {experiment.complexity}
                      </div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${
                        experiment.category === 'experiment' ? 'bg-purple-500/20 border-purple-500/30 text-purple-300' :
                        experiment.category === 'tool' ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' :
                        'bg-green-500/20 border-green-500/30 text-green-300'
                      }`}>
                        {experiment.category}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={experiment.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                      </motion.a>
                      <motion.a
                        href={experiment.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={14} className="sm:w-4 sm:h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="mb-3">
                      <h3 className="text-white font-medium text-base sm:text-lg mb-2 group-hover:text-white/90 transition-colors">
                        {experiment.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                        {experiment.description}
                      </p>
                    </div>

                    {/* Highlight Feature */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2 text-xs">
                        <Zap size={10} className="sm:w-3 sm:h-3 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{experiment.highlight}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {experiment.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {experiment.technologies.length > 3 && (
                        <span className="px-2 py-1 text-white/40 text-xs">
                          +{experiment.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Performance Indicator */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Cpu size={10} className="sm:w-3 sm:h-3 text-green-400" />
                        <span className="text-white/60">Performance:</span>
                        <span className="text-green-400 font-medium">{experiment.performance}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Stats Card - Desktop Only */}
                <AnimatePresence>
                  {hoveredProject === experiment.id && (
                    <motion.div
                      className="absolute -bottom-4 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 z-10 hidden lg:block"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(experiment.stats).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="text-white font-medium text-sm">{value}</div>
                            <div className="text-white/40 text-xs capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skills Showcase Footer */}
        <motion.div 
          className="mt-16 sm:mt-20 md:mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white/60 font-inter text-base sm:text-lg mb-6 sm:mb-8 px-4">
            Every experiment teaches something new. Every tool solves a real problem.
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
            {[
              { label: 'Technologies Explored', value: '50+' },
              { label: 'Problems Solved', value: '100+' },
              { label: 'Open Source Contributions', value: '25+' },
              { label: 'Performance Optimizations', value: '∞' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-white font-light text-2xl sm:text-3xl mb-2">{stat.value}</div>
                <div className="text-white/40 text-xs sm:text-sm uppercase tracking-wider leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SideProjects;