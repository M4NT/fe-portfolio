import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Coffee, Award, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Star, Zap, Target, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import AnimatedBackground from './AnimatedBackground';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  const profileImages = [
    "/images/about/photo-1.png",
    "/images/about/photo-2.png", 
    "/images/about/photo-3.png",
    "/images/about/photo-4.png"
  ];

  const stats = [
    { number: "50+", label: t('about.projectsCompleted'), icon: <Award size={20} />, color: 'from-yellow-400 to-orange-500' },
    { number: "5+", label: t('about.yearsExperience'), icon: <Calendar size={20} />, color: 'from-blue-400 to-cyan-500' },
    { number: "∞", label: t('about.cupsOfCoffee'), icon: <Coffee size={20} />, color: 'from-green-400 to-emerald-500' },
    { number: "98%", label: 'Taxa de Sucesso', icon: <Star size={20} />, color: 'from-purple-400 to-pink-500' }
  ];

  const skills = [
    { name: "Frontend Development", level: 95, category: "Technical", color: 'from-blue-500 to-cyan-500' },
    { name: "UI/UX Design", level: 88, category: "Design", color: 'from-purple-500 to-pink-500' },
    { name: "3D & WebGL", level: 82, category: "Technical", color: 'from-orange-500 to-red-500' },
    { name: "Creative Coding", level: 90, category: "Creative", color: 'from-green-500 to-teal-500' },
    { name: "Performance Optimization", level: 85, category: "Technical", color: 'from-indigo-500 to-purple-500' },
    { name: "Motion Design", level: 78, category: "Design", color: 'from-pink-500 to-rose-500' }
  ];

  const achievements = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Especialista em Conversão",
      description: "Landing pages que convertem 300% mais que a média",
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Performance Expert",
      description: "Sites otimizados que carregam em menos de 2 segundos",
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "ROI Comprovado",
      description: "Clientes reportam 300% de retorno nos primeiros 6 meses",
      color: 'from-blue-500 to-cyan-500'
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
  }, [profileImages.length]);

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
          <div className="text-white/40 text-sm uppercase tracking-wider mb-4 font-inter">
            Sobre Mim
          </div>
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            {t('about.title')}
          </h2>
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            <span className="text-white font-medium">5+ anos</span> criando soluções web para empresas e profissionais que querem <span className="text-green-400 font-medium">resultados reais</span>. Cada projeto é desenvolvido com foco em performance, SEO e conversão.
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
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl w-full about-carousel" style={{ minHeight: '400px' }}>
                {/* Image Carousel */}
                <div className="relative w-full h-full">
                  {profileImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ 
                        opacity: index === currentImageIndex ? 1 : 0,
                        scale: index === currentImageIndex ? 1 : 1.1
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <img
                        src={image}
                        alt={`YAN.M Profile ${index + 1}`}
                        className="w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-700"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          width: '100%',
                          height: '100%',
                          minHeight: '100%',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face';
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                
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

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
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
              <h4 className="font-inter font-medium text-xl text-white mb-6">
                {t('about.coreCompetencies')}
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-white/90 group-hover:text-white transition-colors font-inter">
                          {skill.name}
                        </span>
                        <span className="text-white/30 text-xs uppercase tracking-wider font-inter">
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-white/40 text-sm font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
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
              <h4 className="font-inter font-medium text-xl text-white mb-6">
                Diferenciais Competitivos
              </h4>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${achievement.color} bg-opacity-20`}>
                      <div className="text-white/80">
                        {achievement.icon}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-1">{achievement.title}</h5>
                      <p className="text-white/60 text-sm">{achievement.description}</p>
                    </div>
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
              <div className="border border-white/20 p-6 rounded-xl hover:border-white/40 transition-colors duration-300 group cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <h5 className="font-inter font-medium text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {t('about.letsCreate')}
                    </h5>
                    <p className="text-white/60 text-sm font-inter">
                      {t('about.availableForProjects')}
                    </p>
                  </div>
                  <motion.div
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white/40 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-r border-t border-white/60 transform rotate-45"
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;