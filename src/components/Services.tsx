import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Star, Zap, Palette, Code, Globe, Layout, Sparkles, Server, Globe2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [selectedCurrency, setSelectedCurrency] = useState<'BRL' | 'USD' | 'EUR'>('BRL');

  // useScroll removido para scroll fluido em 60fps
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"]
  // });
  // const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const currencies = {
    BRL: { symbol: 'R$', name: 'Real' },
    USD: { symbol: '$', name: 'Dólar' },
    EUR: { symbol: '£', name: 'Euro' }
  };

  const getServiceData = (currency: 'BRL' | 'USD' | 'EUR') => {
    const serviceData = {
      BRL: [
        {
          id: 1,
          title: 'Identidade Visual',
          price: 'a partir de R$ 649,99',
          category: 'Branding',
          icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-pink-500 to-purple-500',
          features: [
            'Logotipo com e sem tipografia',
            '4 variações cromáticas',
            'Mockups e modelos para impressão/uso comercial',
            'Manual de marca',
            'Pitch Deck PDF'
          ],
          highlight: 'Marca sólida: Logotipos, mockups e manuais de uso e de apresentação'
        },
        {
          id: 2,
          title: 'Social Media',
          price: 'R$ 699,99',
          category: 'Design',
          icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-blue-500 to-cyan-500',
          features: [
            '20 artes (feed, stories, carrossel)',
            'Identidade unificada',
            'Ícones para destaques'
          ],
          highlight: 'Pacote essencial para redes sociais'
        },
        {
          id: 3,
          title: 'Social Media PRO',
          price: 'R$ 949,99',
          category: 'Design Pro',
          icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-purple-500 to-pink-500',
          features: [
            '30 artes variadas',
            'Paleta integrada',
            'Destaques personalizados',
            '1 consultoria de briefing'
          ],
          highlight: 'Versão completa com consultoria'
        },
        {
          id: 4,
          title: 'Identidade + Social Media',
          price: 'R$ 1.199,99',
          category: 'Bundle',
          icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-green-500 to-teal-500',
          features: [
            'ID Visual completa',
            '20 artes para redes sociais',
            'Destaques personalizados'
          ],
          highlight: 'Combo perfeito para sua marca'
        },
        {
          id: 5,
          title: 'Landing Page',
          price: 'a partir de R$ 1.799,99',
          category: 'Desenvolvimento',
          icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-orange-500 to-red-500',
          features: [
            'Layout responsivo',
            'Seções focadas em conversão',
            'Formulário integrado'
          ],
          highlight: 'Página de alta conversão'
        },
        {
          id: 6,
          title: 'Site Institucional',
          price: 'a partir de R$ 3.499,99',
          category: 'Desenvolvimento',
          icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-indigo-500 to-purple-500',
          features: [
            'Home, Sobre, Contato, FAQs, etc.',
            'Design responsivo e exclusivo',
            'Presença digital profissional com estrutura completa'
          ],
          highlight: 'Solução completa para sua empresa'
        },
        {
          id: 7,
          title: 'Layout de Site',
          price: 'R$ 999,99 (2p)',
          category: 'Design',
          icon: <Layout className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-teal-500 to-green-500',
          features: [
            'Até 2 páginas',
            'R$ 599,99 por página adicional',
            'Visual pro seu dev implementar com facilidade'
          ],
          highlight: 'Design pronto para desenvolvimento'
        },
        {
          id: 8,
          title: 'Hospedagem de Sites',
          price: 'a partir de R$ 40,00',
          category: 'Hosting',
          icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-emerald-500 to-cyan-500',
          features: [
            'Hospedagem Hostinger',
            'SSL Certificado incluído',
            'Backup automático',
            'Suporte técnico 24/7'
          ],
          highlight: 'Hospedagem profissional confiável'
        }
      ],
      USD: [
        {
          id: 1,
          title: 'Brand Identity System',
          price: 'from $1,250',
          category: 'Branding',
          icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-pink-500 to-purple-500',
          features: [
            'Logo with and without typography',
            '4 color variations',
            'Mockups and models for printing/commercial use',
            'Brand manual',
            'Pitch Deck PDF'
          ],
          highlight: 'Complete brand identity system'
        },
        {
          id: 2,
          title: 'Social Media Design (20 Posts)',
          price: 'from $700',
          category: 'Design',
          icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-blue-500 to-cyan-500',
          features: [
            '20 artworks (feed, stories, carousel)',
            'Unified identity',
            'Highlight icons'
          ],
          highlight: 'Essential social media package'
        },
        {
          id: 3,
          title: 'Social Media Strategy & Design (30 Posts)',
          price: 'from $1,050',
          category: 'Design Pro',
          icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-purple-500 to-pink-500',
          features: [
            '30 varied artworks',
            'Integrated palette',
            'Custom highlights',
            '1 briefing consultation'
          ],
          highlight: 'Complete version with consultation'
        },
        {
          id: 4,
          title: 'Brand + Social Media Launch Kit',
          price: 'from $1,900',
          category: 'Bundle',
          icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-green-500 to-teal-500',
          features: [
            'Complete visual ID',
            '20 social media artworks',
            'Custom highlights'
          ],
          highlight: 'Perfect combo for your brand'
        },
        {
          id: 5,
          title: 'Conversion-Focused Landing Page',
          price: 'from $1,500',
          category: 'Development',
          icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-orange-500 to-red-500',
          features: [
            'Responsive layout',
            'Conversion-focused sections',
            'Integrated form'
          ],
          highlight: 'High-conversion page'
        },
        {
          id: 6,
          title: 'Corporate Website',
          price: 'from $2,800',
          category: 'Development',
          icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-indigo-500 to-purple-500',
          features: [
            'Home, About, Contact, FAQs, etc.',
            'Responsive and exclusive design',
            'Professional digital presence with complete structure'
          ],
          highlight: 'Complete solution for your company'
        },
        {
          id: 7,
          title: 'Website UI Layout (2 Pages)',
          price: 'from $1,200',
          category: 'Design',
          icon: <Layout className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-teal-500 to-green-500',
          features: [
            'Up to 2 custom layouts',
            '$400 per extra page',
            'Visual for your dev to implement easily'
          ],
          highlight: 'Design ready for development'
        },
        {
          id: 8,
          title: 'Website Hosting',
          price: 'from $15',
          category: 'Hosting',
          icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-emerald-500 to-cyan-500',
          features: [
            'Hostinger hosting',
            'SSL Certificate included',
            'Automatic backup',
            '24/7 technical support'
          ],
          highlight: 'Reliable professional hosting'
        }
      ],
      EUR: [
        {
          id: 1,
          title: 'Brand Identity System',
          price: 'from £1,250',
          category: 'Branding',
          icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-pink-500 to-purple-500',
          features: [
            'Logo with and without typography',
            '4 color variations',
            'Mockups and models for printing/commercial use',
            'Brand manual',
            'Pitch Deck PDF'
          ],
          highlight: 'Complete brand identity system'
        },
        {
          id: 2,
          title: 'Social Media Design (20 Posts)',
          price: 'from £650',
          category: 'Design',
          icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-blue-500 to-cyan-500',
          features: [
            '20 artworks (feed, stories, carousel)',
            'Unified identity',
            'Highlight icons'
          ],
          highlight: 'Essential social media package'
        },
        {
          id: 3,
          title: 'Social Media Strategy & Design (30 Posts)',
          price: 'from £950',
          category: 'Design Pro',
          icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-purple-500 to-pink-500',
          features: [
            '30 varied artworks',
            'Integrated palette',
            'Custom highlights',
            '1 briefing consultation'
          ],
          highlight: 'Complete version with consultation'
        },
        {
          id: 4,
          title: 'Brand + Social Media Launch Kit',
          price: 'from £2,500',
          category: 'Bundle',
          icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-green-500 to-teal-500',
          features: [
            'Complete visual ID',
            '20 social media artworks',
            'Custom highlights'
          ],
          highlight: 'Perfect combo for your brand'
        },
        {
          id: 5,
          title: 'Conversion-Focused Landing Page',
          price: 'from £1,200',
          category: 'Development',
          icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-orange-500 to-red-500',
          features: [
            'Responsive layout',
            'Conversion-focused sections',
            'Integrated form'
          ],
          highlight: 'High-conversion page'
        },
        {
          id: 6,
          title: 'Corporate Website',
          price: 'from £3,000',
          category: 'Development',
          icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-indigo-500 to-purple-500',
          features: [
            'Home, About, Contact, FAQs, etc.',
            'Responsive and exclusive design',
            'Professional digital presence with complete structure'
          ],
          highlight: 'Complete solution for your company'
        },
        {
          id: 7,
          title: 'Website UI Layout (2 Pages)',
          price: 'from £950',
          category: 'Design',
          icon: <Layout className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-teal-500 to-green-500',
          features: [
            'Two page layouts included',
            '£345 per extra page',
            'Visual for your dev to implement easily'
          ],
          highlight: 'Design ready for development'
        },
        {
          id: 8,
          title: 'Website Hosting',
          price: 'from £10',
          category: 'Hosting',
          icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
          accent: 'from-emerald-500 to-cyan-500',
          features: [
            'Hostinger hosting',
            'SSL Certificate included',
            'Automatic backup',
            '24/7 technical support'
          ],
          highlight: 'Reliable professional hosting'
        }
      ]
    };

    return serviceData[currency];
  };

  const services = getServiceData(selectedCurrency);

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32"
      style={{
        background: `
          linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, black 100%),
          radial-gradient(circle at 25% 25%, rgba(59,130,246,0.08) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(147,51,234,0.08) 0%, transparent 50%)
        `
      }}
    >
      {/* Animated Background Elements */}
              <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-[0.02] hidden md:block"
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(30deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(150deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </motion.div>

        {/* Floating Price Tags */}
        <motion.div 
          className="absolute top-1/4 left-1/12 text-green-400/10 font-mono text-sm hidden lg:block"
          animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {currencies[selectedCurrency].symbol}649+
        </motion.div>

        <motion.div 
          className="absolute bottom-1/3 right-1/12 text-purple-400/10 font-mono text-sm hidden lg:block"
          animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {currencies[selectedCurrency].symbol}3.499+
        </motion.div>
      </div>

      <motion.div 
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
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
            Serviços & Investimentos
          </motion.div>
          <h2 className="font-inter font-light text-3xl sm:text-5xl lg:text-6xl xl:text-8xl leading-none tracking-[-0.03em] text-white mb-4 sm:mb-6">
            TABELA DE SERVIÇOS
          </h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-4xl mx-auto px-4 mb-8">
            Investimentos transparentes para projetos que geram resultados reais. Cada serviço é desenhado para maximizar o ROI do seu negócio.
          </p>

          {/* Currency Selector */}
          <motion.div 
            className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {Object.entries(currencies).map(([key, currency]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCurrency(key as 'BRL' | 'USD' | 'EUR')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  selectedCurrency === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currency.symbol} {currency.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <motion.div
              key={`${selectedCurrency}-${service.id}`}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Service Card */}
              <motion.div
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${service.accent} bg-opacity-20`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.icon}
                      </motion.div>
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-wider font-inter mb-1">
                          {service.category}
                        </div>
                        <h3 className="text-white font-medium text-lg sm:text-xl">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    
                    <motion.div
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r ${service.accent} text-white text-sm sm:text-base font-medium`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.price}
                    </motion.div>
                  </div>

                  <p className="text-white/60 text-sm sm:text-base italic">
                    {service.highlight}
                  </p>
                </div>

                {/* Features */}
                <div className="p-6 sm:p-8">
                  <div className="space-y-3 sm:space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="flex-shrink-0 mt-1"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 h-4 text-green-400" />
                        </motion.div>
                        <span className="text-white/70 text-sm sm:text-base">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-white/80 text-sm sm:text-base mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Todos os preços incluem revisões e suporte pós-entrega</span>
          </div>

          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-500 hover:to-purple-500 transition-all magnetic"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Solicitar Orçamento Personalizado</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Services);