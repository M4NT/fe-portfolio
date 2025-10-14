import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, Calendar, Coffee, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();
  
  // useScroll removido para scroll fluido em 60fps
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"]
  // });
  // const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  const profileImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face"
  ];

  const stats = [
    { number: "50+", label: t('about.projectsCompleted'), icon: <Award size={20} /> },
    { number: "3+", label: t('about.yearsExperience'), icon: <Calendar size={20} /> },
    { number: "∞", label: t('about.cupsOfCoffee'), icon: <Coffee size={20} /> },
    { number: "SF", label: t('about.basedIn'), icon: <MapPin size={20} /> }
  ];

  const skills = [
    { name: "Frontend Development", level: 95, category: "Technical" },
    { name: "UI/UX Design", level: 88, category: "Design" },
    { name: "3D & WebGL", level: 82, category: "Technical" },
    { name: "Creative Coding", level: 90, category: "Creative" },
    { name: "Performance Optimization", level: 85, category: "Technical" },
    { name: "Motion Design", level: 78, category: "Design" }
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
  
  // Previne layout shift
  const [progressKey, setProgressKey] = useState(0);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 bg-black noise-bg"
      style={{
        overflow: 'visible',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/5 to-teal-500/5 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <div 
            className="text-white/40 text-sm uppercase tracking-wider mb-4 font-inter"
          >
            {t('about.subtitle')}
          </div>
          <h2 
            className="font-inter font-light text-6xl lg:text-8xl leading-none tracking-[-0.03em] text-white"
            style={{
              overflow: 'visible',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Profile Section with Carousel */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            {/* Profile Image Carousel */}
            <div className="relative group">
              <div 
                className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-lg"
                style={{
                  minHeight: '400px', // Previne CLS
                  contain: 'layout style paint'
                }}
              >
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
                      <ImageWithFallback
                        src={image}
                        alt={`YAN.M Profile ${index + 1}`}
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Carousel Controls - CSS puro para evitar conflitos */}
                <button
                  onClick={prevImage}
                  className="about-carousel-button left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="about-carousel-button right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Carousel Indicators - com transform inline para prevenir shift */}
                <div 
                  className="absolute bottom-4 left-1/2 flex space-x-2"
                  style={{
                    transform: 'translateX(-50%)',
                    willChange: 'auto'
                  }}
                >
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setProgressKey(prev => prev + 1);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      style={{
                        backfaceVisibility: 'hidden'
                      }}
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

              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-24 h-24 border border-white/10"
                initial={{ opacity: 0, rotate: -45 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-32 h-32 border border-white/10"
                initial={{ opacity: 0, rotate: 45 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:bg-white/5 relative overflow-hidden">
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="flex items-center space-x-3 mb-3 relative z-10">
                      <div className="text-white/40 group-hover:text-white/60 transition-colors">
                        {stat.icon}
                      </div>
                      <div className="text-white/40 text-xs uppercase tracking-wider font-inter">
                        {stat.label}
                      </div>
                    </div>
                    <div className="font-inter font-light text-3xl text-white group-hover:scale-110 transition-transform duration-300 origin-left relative z-10">
                      {stat.number}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            {/* About Text */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-inter font-light text-3xl text-white mb-6 leading-tight">
                  {t('about.creativeDeveloper')}
                </h3>
                <p 
                  className="text-white/70 text-lg leading-relaxed font-inter"
                  style={{
                    overflow: 'visible',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {t('about.description1')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p 
                  className="text-white/70 text-lg leading-relaxed font-inter"
                  style={{
                    overflow: 'visible',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {t('about.description2')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p 
                  className="text-white/70 text-lg leading-relaxed font-inter"
                  style={{
                    overflow: 'visible',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {t('about.description3')}
                </p>
              </motion.div>
            </div>

            {/* Enhanced Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="font-inter font-medium text-xl text-white mb-8">
                {t('about.coreCompetencies')}
              </h4>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-white/80 group-hover:text-white transition-colors font-inter">
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
                    <div className="relative h-px bg-white/10 overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-white to-white/60"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                      {/* Animated glow effect */}
                      <motion.div
                        className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm"
                        initial={{ x: '-100%' }}
                        whileInView={{ x: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="border border-white/20 p-8 hover:border-white/40 transition-colors duration-300 group cursor-pointer relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                
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
      </div>
    </section>
  );
};

export default React.memo(About);