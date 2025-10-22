import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Coffee, Award, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Star, Zap, Target, TrendingUp, Code, Palette, Rocket, Heart, Sparkles, Brain, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import AnimatedBackground from './AnimatedBackground';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  const profileImages = [
    "/images/about/photo-1.webp",
    "/images/about/photo-2.webp", 
    "/images/about/photo-3.webp",
    "/images/about/photo-4.webp"
  ];

  const stats = [
    { number: "50+", label: 'Projetos Entregues', icon: <Rocket size={20} />, color: 'from-orange-400 to-red-500' },
    { number: "5+", label: 'Anos de Experiência', icon: <Calendar size={20} />, color: 'from-blue-400 to-cyan-500' },
    { number: "100%", label: 'Satisfação', icon: <Heart size={20} />, color: 'from-pink-400 to-rose-500' },
    { number: "∞", label: 'Cafés Consumidos', icon: <Coffee size={20} />, color: 'from-green-400 to-emerald-500' }
  ];

  const skills = [
    { name: "React & TypeScript", level: 98, category: "Frontend", color: 'from-blue-500 to-cyan-500', icon: <Code size={16} /> },
    { name: "UI/UX Design", level: 92, category: "Design", color: 'from-purple-500 to-pink-500', icon: <Palette size={16} /> },
    { name: "Performance", level: 95, category: "Otimização", color: 'from-orange-500 to-red-500', icon: <Zap size={16} /> },
    { name: "Animações", level: 90, category: "Criativo", color: 'from-green-500 to-teal-500', icon: <Sparkles size={16} /> },
    { name: "Responsividade", level: 96, category: "Mobile", color: 'from-indigo-500 to-purple-500', icon: <Eye size={16} /> },
    { name: "Inovação", level: 88, category: "Tendências", color: 'from-pink-500 to-rose-500', icon: <Brain size={16} /> }
  ];

  const achievements = [
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Desenvolvimento Ágil",
      description: "Projetos entregues em tempo recorde sem comprometer a qualidade",
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Experiência do Usuário",
      description: "Interfaces intuitivas que encantam e convertem visitantes",
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Inovação Constante",
      description: "Sempre atualizado com as últimas tecnologias e tendências",
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  // Auto-rotate images - apenas quando visível
  useEffect(() => {
    let interval: number;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            interval = window.setInterval(() => {
              setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
            }, 3000);
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
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-16 md:py-24 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground variant="subtle" />

      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Desenvolvedor Frontend</span>
          </motion.div>
          
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Sobre Mim
            </span>
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            <span className="text-purple-400 font-semibold">5+ anos</span> transformando ideias em 
            <span className="text-white font-semibold"> experiências digitais</span> que impressionam. 
            Especialista em criar interfaces que não apenas funcionam, mas 
            <span className="text-purple-400 font-semibold"> encantam</span> e 
            <span className="text-purple-400 font-semibold"> convertem</span>.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Profile Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Profile Image Carousel */}
            <div className="relative group">
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 1.05, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      scale: { duration: 0.6, ease: "easeOut" },
                      opacity: { duration: 0.4, ease: "easeInOut" }
                    }}
                  >
                    <img
                      src={profileImages[currentImageIndex]}
                      alt={`YAN.M Profile ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face';
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Carousel Controls */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={16} />
                </button>

                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <span className="text-white text-xs font-medium uppercase tracking-wider font-inter">
                    {t('about.availableForWork')}
                  </span>
                </motion.div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevImage}
                  className="group/btn p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white/70 group-hover/btn:text-white transition-colors" />
                </button>

                {/* Progress Bar */}
                <div className="flex-1 mx-6 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    key={currentImageIndex}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </div>

                <button
                  onClick={nextImage}
                  className="group/btn p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover/btn:text-white transition-colors" />
                </button>
              </div>

              {/* Indicators - Below Progress Bar */}
              <div className="flex justify-center gap-2 mt-4">
                {profileImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                      <div className="text-white/80">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-white/60 text-xs uppercase tracking-wider font-inter">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 origin-left">
                    {stat.number}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* About Text */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="font-inter font-light text-3xl text-white mb-4 leading-tight">
                  {t('about.creativeDeveloper')}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed font-inter">
                  {t('about.description1')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-white/70 text-lg leading-relaxed font-inter">
                  {t('about.description2')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-white/70 text-lg leading-relaxed font-inter">
                  {t('about.description3')}
                </p>
              </motion.div>
            </div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-inter font-medium text-xl text-white">
                  Minhas Especialidades
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20`}>
                        <div className="text-white/80">
                          {skill.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white/90 group-hover:text-white transition-colors font-inter font-medium">
                          {skill.name}
                        </div>
                        <div className="text-white/40 text-xs uppercase tracking-wider font-inter">
                          {skill.category}
                        </div>
                      </div>
                      <span className="text-white/60 text-sm font-mono font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-inter font-medium text-xl text-white">
                  Por Que Me Escolher?
                </h4>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-white/80 group-hover:text-white transition-colors">
                          {achievement.icon}
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <h5 className="text-white font-semibold mb-2 group-hover:text-orange-300 transition-colors">
                          {achievement.title}
                        </h5>
                        <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 group cursor-pointer"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Rocket className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h5 className="font-inter font-semibold text-white text-lg mb-1 group-hover:text-orange-300 transition-colors">
                        Vamos Criar Algo Incrível Juntos?
                      </h5>
                      <p className="text-white/60 text-sm font-inter">
                        Pronto para transformar sua ideia em realidade digital
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-medium">
                      <span>Iniciar Projeto</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    
                    <motion.div
                      className="w-8 h-8 border border-orange-400/50 rounded-full flex items-center justify-center group-hover:border-orange-400 group-hover:bg-orange-400/10 transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-3 h-3 border-r border-t border-orange-400 transform rotate-45"
                        whileHover={{ x: 1, y: -1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;