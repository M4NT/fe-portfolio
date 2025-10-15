import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Briefcase, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  project: string;
  result: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Carlos Silva',
      role: 'CEO',
      company: 'TechStart Brasil',
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Trabalhar com o Yan foi uma experiência excepcional. Ele transformou nossa visão em uma plataforma web moderna e performática que superou todas as expectativas. A atenção aos detalhes e o conhecimento técnico são impressionantes.',
      project: 'Dashboard Analytics',
      result: '+300% de engajamento dos usuários'
    },
    {
      id: 2,
      name: 'Marina Costa',
      role: 'Founder',
      company: 'Design Studio Co.',
      location: 'Rio de Janeiro, RJ',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      rating: 5,
      text: 'A qualidade do trabalho do Yan é incomparável. Ele não apenas entregou um site lindo, mas também otimizado e com performance excepcional. Nossos clientes adoraram a nova experiência!',
      project: 'E-commerce Premium',
      result: '+250% em conversões'
    },
    {
      id: 3,
      name: 'Roberto Mendes',
      role: 'CTO',
      company: 'FinTech Solutions',
      location: 'Campinas, SP',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Yan entregou um projeto complexo com WebGL e animações avançadas dentro do prazo e orçamento. A comunicação foi clara e ele sempre trouxe soluções criativas para os desafios técnicos.',
      project: '3D Portfolio Interativo',
      result: '+400% tempo de permanência'
    },
    {
      id: 4,
      name: 'Ana Paula Santos',
      role: 'Marketing Director',
      company: 'Growth Agency',
      location: 'Belo Horizonte, MG',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      rating: 5,
      text: 'O site que o Yan criou para nós é simplesmente incrível! Além de bonito, é extremamente rápido e otimizado para SEO. Nosso tráfego orgânico triplicou em 3 meses!',
      project: 'Landing Page Otimizada',
      result: '+320% tráfego orgânico'
    },
    {
      id: 5,
      name: 'Felipe Oliveira',
      role: 'Product Manager',
      company: 'SaaS Startup',
      location: 'Florianópolis, SC',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 5,
      text: 'Yan é um profissional diferenciado. Ele entende tanto de design quanto de desenvolvimento, o que resultou em um produto final coeso e de alta qualidade. Recomendo fortemente!',
      project: 'SaaS Dashboard',
      result: '+180% satisfação dos usuários'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="relative py-20 sm:py-32 bg-black overflow-hidden"
      style={{
        overflow: 'visible',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/60 text-sm font-medium">Depoimentos de Clientes</span>
          </motion.div>

          <h2 className="font-inter font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-[-0.03em] text-white mb-6">
            O que dizem sobre
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              meu trabalho
            </span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Mais de 40 clientes satisfeitos e projetos entregues com excelência
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              {/* Main Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
                {/* Quote Icon */}
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white/60 text-sm">
                    {currentTestimonial.rating}.0
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-white text-lg sm:text-xl leading-relaxed mb-8">
                  "{currentTestimonial.text}"
                </p>

                {/* Project & Result */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">
                      {currentTestimonial.project}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-300 text-sm font-medium">
                      📈 {currentTestimonial.result}
                    </span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/20">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                    <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {currentTestimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={prevTestimonial}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium hidden sm:inline">Anterior</span>
            </motion.button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Próximo depoimento"
            >
              <span className="text-white text-sm font-medium hidden sm:inline">Próximo</span>
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-white/40 text-sm">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Projetos Entregues', value: '50+', icon: '🚀' },
            { label: 'Clientes Satisfeitos', value: '40+', icon: '😊' },
            { label: 'Taxa de Sucesso', value: '98%', icon: '✅' },
            { label: 'Anos de Experiência', value: '5+', icon: '⭐' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Resposta em até 2h</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Garantia de qualidade</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Suporte pós-entrega</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);

