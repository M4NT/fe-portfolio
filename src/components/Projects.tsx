import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Sparkles, Code, Palette, Rocket, Eye, ArrowUpRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import AnimatedBackground from './AnimatedBackground';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Goombo - Sistema de Gestão para Restaurantes",
      description: "Sistema completo para hamburguerias e bares com gestão de pedidos, cardápio digital e delivery integrado. Inclui System Design, Design UI/UX, MVP Frontend em React/TypeScript e aplicativo mobile.",
      image: "/images/projects/projeto-1.webp",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Native", "Node.js"],
      liveUrl: "https://goombo.com.br",
      githubUrl: "#",
      featured: true,
      color: "from-orange-500 to-red-500",
      icon: <Code className="w-5 h-5" />,
      category: "Full Stack"
    },
    {
      id: 2,
      title: "Canora Tropical - Landing Page de Alto Padrão",
      description: "Landing Page sofisticada para hospedagem premium em Palhoça-SC. Design elegante com sistema de reservas, galeria profissional e otimização SEO local para conversão máxima.",
      image: "/images/projects/projeto-2.webp",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO"],
      liveUrl: "https://canoratropical.com.br",
      githubUrl: "#",
      featured: true,
      color: "from-green-500 to-emerald-500",
      icon: <Palette className="w-5 h-5" />,
      category: "Landing Page"
    },
    {
      id: 3,
      title: "Agross do Brasil - Landing Page Agronegócio",
      description: "Design completo de landing page para empresa de equipamentos agrícolas. Layout institucional B2B com catálogo de produtos, blog técnico e integração com WhatsApp.",
      image: "/images/projects/projeto-3.webp",
      technologies: ["UI/UX Design", "Figma", "Landing Page", "B2B Design"],
      liveUrl: "https://agrossdobrasil.com.br",
      githubUrl: "#",
      featured: false,
      color: "from-green-500 to-teal-500",
      icon: <Rocket className="w-5 h-5" />,
      category: "UI/UX"
    },
    {
      id: 4,
      title: "Protocolo Raiz - Landing Page de Conversão",
      description: "Design de landing page de alta conversão para venda de infoprodutos. WordPress personalizado com copywriting estratégico e funil de vendas otimizado.",
      image: "/images/projects/projeto-4.webp",
      technologies: ["WordPress", "UI/UX Design", "Landing Page", "Conversion Design"],
      liveUrl: "https://protocoloraiz.com.br",
      githubUrl: "#",
      featured: false,
      color: "from-yellow-500 to-orange-500",
      icon: <Eye className="w-5 h-5" />,
      category: "WordPress"
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="relative py-16 md:py-24 bg-black overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Rocket className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">Portfólio</span>
          </motion.div>
          
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent">
              Projetos em Destaque
            </span>
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Conheça alguns dos meus trabalhos mais recentes e veja como transformo
            <span className="text-emerald-400 font-semibold"> ideias em experiências digitais</span> que 
            fazem a diferença.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <motion.div 
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Category Badge */}
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`p-2 rounded-lg bg-gradient-to-br ${project.color} bg-opacity-20`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-white/80">
                      {project.icon}
                    </div>
                  </motion.div>
                  <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-white/40 text-xs">Destaque</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-inter font-semibold text-3xl text-white leading-tight group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-base leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white/80 text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-4 pt-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Ver Projeto</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </motion.a>
                  
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/90 font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>Código</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Project Image */}
              <motion.div 
                className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="relative group/image overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover/image:opacity-10 transition-opacity duration-500 z-10`} />
                  
                  <div className="aspect-video overflow-hidden">
                    <motion.div
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Floating badge */}
                  <motion.div 
                    className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Online
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-inter font-medium text-2xl text-white">
              Mais Projetos
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full">
                    <div className="text-white/80">
                      {project.icon}
                    </div>
                    <span className="text-white text-xs font-medium">{project.category}</span>
                  </div>

                  {/* Online badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-300 text-xs font-medium">
                    Online
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h4 className="font-inter font-semibold text-xl text-white leading-tight group-hover:text-orange-300 transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3 pt-2">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Ver Projeto</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                    
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2.5 bg-white/5 border border-white/10 rounded-lg text-white/90 hover:bg-white/10 hover:border-white/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;