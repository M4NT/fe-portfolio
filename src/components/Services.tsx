import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { Check, Star, Zap, Palette, Code, Globe, Layout, Sparkles, Server, ChevronDown, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [selectedCurrency, setSelectedCurrency] = useState<'BRL' | 'USD' | 'EUR'>('BRL');
  const [expandedService, setExpandedService] = useState<number | null>(null);

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
          icon: <Palette className="w-5 h-5" />,
          accent: 'from-pink-500 to-purple-500',
          accentSolid: 'bg-pink-500',
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
          icon: <Star className="w-5 h-5" />,
          accent: 'from-blue-500 to-cyan-500',
          accentSolid: 'bg-blue-500',
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
          icon: <Sparkles className="w-5 h-5" />,
          accent: 'from-purple-500 to-pink-500',
          accentSolid: 'bg-purple-500',
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
          icon: <Zap className="w-5 h-5" />,
          accent: 'from-green-500 to-teal-500',
          accentSolid: 'bg-green-500',
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
          icon: <Globe className="w-5 h-5" />,
          accent: 'from-orange-500 to-red-500',
          accentSolid: 'bg-orange-500',
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
          icon: <Code className="w-5 h-5" />,
          accent: 'from-indigo-500 to-purple-500',
          accentSolid: 'bg-indigo-500',
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
          icon: <Layout className="w-5 h-5" />,
          accent: 'from-teal-500 to-green-500',
          accentSolid: 'bg-teal-500',
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
          icon: <Server className="w-5 h-5" />,
          accent: 'from-emerald-500 to-cyan-500',
          accentSolid: 'bg-emerald-500',
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
          icon: <Palette className="w-5 h-5" />,
          accent: 'from-pink-500 to-purple-500',
          accentSolid: 'bg-pink-500',
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
          icon: <Star className="w-5 h-5" />,
          accent: 'from-blue-500 to-cyan-500',
          accentSolid: 'bg-blue-500',
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
          icon: <Sparkles className="w-5 h-5" />,
          accent: 'from-purple-500 to-pink-500',
          accentSolid: 'bg-purple-500',
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
          icon: <Zap className="w-5 h-5" />,
          accent: 'from-green-500 to-teal-500',
          accentSolid: 'bg-green-500',
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
          icon: <Globe className="w-5 h-5" />,
          accent: 'from-orange-500 to-red-500',
          accentSolid: 'bg-orange-500',
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
          icon: <Code className="w-5 h-5" />,
          accent: 'from-indigo-500 to-purple-500',
          accentSolid: 'bg-indigo-500',
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
          icon: <Layout className="w-5 h-5" />,
          accent: 'from-teal-500 to-green-500',
          accentSolid: 'bg-teal-500',
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
          icon: <Server className="w-5 h-5" />,
          accent: 'from-emerald-500 to-cyan-500',
          accentSolid: 'bg-emerald-500',
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
          icon: <Palette className="w-5 h-5" />,
          accent: 'from-pink-500 to-purple-500',
          accentSolid: 'bg-pink-500',
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
          icon: <Star className="w-5 h-5" />,
          accent: 'from-blue-500 to-cyan-500',
          accentSolid: 'bg-blue-500',
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
          icon: <Sparkles className="w-5 h-5" />,
          accent: 'from-purple-500 to-pink-500',
          accentSolid: 'bg-purple-500',
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
          icon: <Zap className="w-5 h-5" />,
          accent: 'from-green-500 to-teal-500',
          accentSolid: 'bg-green-500',
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
          icon: <Globe className="w-5 h-5" />,
          accent: 'from-orange-500 to-red-500',
          accentSolid: 'bg-orange-500',
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
          icon: <Code className="w-5 h-5" />,
          accent: 'from-indigo-500 to-purple-500',
          accentSolid: 'bg-indigo-500',
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
          icon: <Layout className="w-5 h-5" />,
          accent: 'from-teal-500 to-green-500',
          accentSolid: 'bg-teal-500',
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
          icon: <Server className="w-5 h-5" />,
          accent: 'from-emerald-500 to-cyan-500',
          accentSolid: 'bg-emerald-500',
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

  const toggleService = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground variant="default" />

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Tag className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">Serviços & Investimentos</span>
          </motion.div>
          
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Tabela de Serviços
            </span>
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Investimentos <span className="text-cyan-400 font-semibold">transparentes e competitivos</span>. 
            Clique em cada serviço para ver <span className="text-blue-400 font-semibold">todos os detalhes incluídos</span>.
          </p>
        </motion.div>

        {/* Currency Selector */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1.5 gap-2">
            {Object.entries(currencies).map(([key, currency]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCurrency(key as 'BRL' | 'USD' | 'EUR')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedCurrency === key
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
                whileHover={{ scale: selectedCurrency === key ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {currency.symbol} {currency.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Services - Top 2 */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl font-light mb-2">Mais Procurados</h3>
            <p className="text-white/60">Os serviços que mais geram resultados para nossos clientes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Landing Page - Mais Procurado */}
            <motion.div
              className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Badge Mais Procurado */}
              <div className="absolute -top-3 left-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  🔥 MAIS PROCURADO
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-semibold text-xl">Landing Page</h4>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Página focada em conversão que transforma visitantes em clientes. Ideal para lançamentos, campanhas e vendas diretas.
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-orange-400 font-bold text-2xl">
                        {selectedCurrency === 'BRL' ? 'R$ 1.799,99' : selectedCurrency === 'USD' ? '$1,500' : '£1,200'}
                      </div>
                      <div className="text-white/50 text-xs">a partir de</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">+300% conversão</div>
                      <div className="text-white/50 text-xs">vs site comum</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      <span>Design responsivo e otimizado</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      <span>Formulários integrados</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      <span>Analytics e tracking</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    <span className="relative bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent font-bold group-hover/btn:from-white group-hover/btn:via-white group-hover/btn:to-orange-100 transition-all duration-300">
                      Quero Minha Landing Page
                    </span>
                    <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Identidade + Social Media - Popular */}
            <motion.div
              className="group relative bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Badge Popular */}
              <div className="absolute -top-3 left-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  ⭐ POPULAR
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-semibold text-xl">Identidade + Social Media</h4>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Pacote completo: marca profissional + presença digital. Tudo que você precisa para se destacar online.
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-green-400 font-bold text-2xl">
                        {selectedCurrency === 'BRL' ? 'R$ 1.199,99' : selectedCurrency === 'USD' ? '$1,900' : '£2,500'}
                      </div>
                      <div className="text-white/50 text-xs">combo completo</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-medium">-40% economia</div>
                      <div className="text-white/50 text-xs">vs contratar separado</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Identidade visual completa</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>20 artes para redes sociais</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Manual de marca + consultoria</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <span className="relative bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent font-bold group-hover/btn:from-white group-hover/btn:via-white group-hover/btn:to-green-100 transition-all duration-300">
                      Quero Meu Combo Completo
                    </span>
                    <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* All Services List */}
        <div className="space-y-3 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={`${selectedCurrency}-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Service Item */}
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors duration-300">
                {/* Header - Clickable */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon & Info */}
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${service.accent} shadow-lg flex-shrink-0`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                        <h3 className="text-white font-medium text-lg">
                          {service.title}
                        </h3>
                        <span className="text-white/50 text-sm">
                          {service.category}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">
                        {service.highlight}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    {/* Price */}
                    <div className="text-left sm:text-right">
                      <div className="text-white font-semibold text-base sm:text-lg">
                        {service.price}
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: expandedService === service.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/40 flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2 },
                          opacity: { duration: 0.1 }
                        }
                      }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-4 sm:p-6 pt-4 sm:pt-6 bg-white/[0.02]">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                          {/* Features List */}
                          <div>
                            <h4 className="text-white/90 font-medium mb-4">
                              O que está incluído:
                            </h4>
                            <div className="space-y-3">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-white/70 text-sm leading-relaxed">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="flex flex-col justify-between">
                            <div className="mb-6">
                              <div className="text-white/50 text-sm mb-2">
                                Investimento
                              </div>
                              <div className="text-white text-3xl font-light mb-1">
                                {service.price}
                              </div>
                              <div className="text-white/50 text-sm">
                                Pagamento flexível disponível
                              </div>
                            </div>

                            <a
                              href="#contact"
                              className="group/btn relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg font-medium overflow-hidden transition-all hover:border-gray-600 hover:shadow-lg hover:shadow-gray-500/20 w-full sm:w-auto"
                            >
                              {/* Shiny Text Effect */}
                              <span className="relative bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-semibold group-hover/btn:from-white group-hover/btn:via-white group-hover/btn:to-gray-300 transition-all duration-300 text-sm sm:text-base">
                                Solicitar Orçamento
                              </span>
                              <ArrowRight className="w-4 h-4 text-white/80 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center border-t border-white/10 pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <Check className="w-4 h-4" />
              <span>Todos os serviços incluem revisões ilimitadas e suporte pós-entrega</span>
            </div>
          </div>

          <h3 className="text-white text-2xl font-light mb-3">
            Precisa de algo personalizado?
          </h3>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Entre em contato para discutirmos uma solução sob medida para o seu projeto.
          </p>
          
          <a
            href="#contact"
            className="group/cta relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg font-medium overflow-hidden transition-all hover:border-gray-600 hover:shadow-lg hover:shadow-gray-500/20"
          >
            {/* Shiny Text Effect */}
            <span className="relative bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-semibold text-lg group-hover/cta:from-white group-hover/cta:via-white group-hover/cta:to-gray-300 transition-all duration-300">
              Falar com Especialista
            </span>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all duration-300" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
