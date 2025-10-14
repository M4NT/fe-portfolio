import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CreditCard, Smartphone, Calendar, TrendingUp, Shield, Clock, FileText, Zap } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const PaymentTerms = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // useScroll removido para scroll fluido em 60fps
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"]
  // });
  // const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  // const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const paymentMethods = [
    {
      id: 1,
      title: 'Pagamento à Vista via Pix',
      description: 'Desconto especial em todos os pacotes',
      icon: <Smartphone className="w-6 h-6" />,
      accent: 'from-green-500 to-emerald-500',
      features: [
        'Transferência instantânea',
        'Desconto exclusivo aplicado',
        'Confirmação imediata',
        'Sem taxas bancárias'
      ],
      highlight: 'Melhor custo-benefício'
    },
    {
      id: 2,
      title: 'Modelo 50/50',
      description: '50% no início + 50% na entrega',
      icon: <TrendingUp className="w-6 h-6" />,
      accent: 'from-blue-500 to-cyan-500',
      features: [
        'Para valores a partir de R$ 900',
        'Pagamento inicial para começar',
        'Saldo na entrega final',
        'Segurança para ambas as partes'
      ],
      highlight: 'Modalidade mais popular'
    },
    {
      id: 3,
      title: 'Parcelamento no Cartão',
      description: 'Até 10x com ou sem juros via link seguro',
      icon: <CreditCard className="w-6 h-6" />,
      accent: 'from-purple-500 to-pink-500',
      features: [
        'Stripe ou PagSeguro',
        'Até 10x no cartão',
        'Link de pagamento seguro',
        'Taxa de parcelamento conforme operadora'
      ],
      highlight: 'Máxima flexibilidade'
    },
    {
      id: 4,
      title: 'Pagamento Recorrente',
      description: 'Para planos mensais com cobrança automática',
      icon: <Calendar className="w-6 h-6" />,
      accent: 'from-orange-500 to-red-500',
      features: [
        'Cobrança automática',
        'Ideal para manutenção',
        'Upgrades inclusos',
        'Cancelamento flexível'
      ],
      highlight: 'Ideal para manutenção contínua'
    },
    {
      id: 5,
      title: 'Pagamento Escalonado',
      description: 'Dividido por etapas do projeto',
      icon: <Clock className="w-6 h-6" />,
      accent: 'from-indigo-500 to-purple-500',
      features: [
        'Entrada + primeira entrega',
        'Pagamento por milestone',
        'Entrega final',
        'Acompanhamento do progresso'
      ],
      highlight: 'Pagamento conforme evolução'
    },
    {
      id: 6,
      title: 'Contrato Digital',
      description: 'Enviado para assinatura antes de qualquer etapa',
      icon: <FileText className="w-6 h-6" />,
      accent: 'from-teal-500 to-green-500',
      features: [
        'Assinatura eletrônica',
        'Termos transparentes',
        'Proteção legal',
        'Envio automático'
      ],
      highlight: 'Segurança jurídica garantida'
    }
  ];

  const paymentBrands = [
    {
      name: 'Pix',
      color: 'from-teal-500 to-green-500',
      icon: (
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-500 rounded text-white font-bold text-xs">
          PIX
        </div>
      )
    },
    {
      name: 'Visa',
      color: 'from-blue-600 to-blue-700',
      icon: (
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white font-bold text-xs">
          VISA
        </div>
      )
    },
    {
      name: 'Mastercard',
      color: 'from-red-500 to-orange-500',
      icon: (
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 rounded text-white font-bold text-xs">
          MC
        </div>
      )
    },
    {
      name: 'Nubank',
      color: 'from-purple-600 to-purple-700',
      icon: (
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 rounded text-white font-bold text-xs">
          NU
        </div>
      )
    },
    {
      name: 'PagSeguro',
      color: 'from-yellow-500 to-orange-500',
      icon: (
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded text-white font-bold text-xs">
          PS
        </div>
      )
    },
    {
      name: 'Stripe',
      color: 'from-indigo-500 to-blue-600',
      icon: (
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600 rounded text-white font-bold text-xs">
          ST
        </div>
      )
    }
  ];

  return (
    <section 
      id="payment-terms" 
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32"
      style={{
        background: `
          linear-gradient(180deg, #0a0a0a 0%, #050505 50%, black 100%),
          radial-gradient(circle at 30% 30%, rgba(59,130,246,0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(16,185,129,0.06) 0%, transparent 50%)
        `,
        overflow: 'visible',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {/* Animated Background Elements */}
              <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-[0.015] hidden md:block"
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
        </motion.div>

        {/* Floating Payment Icons */}
        <motion.div 
          className="absolute top-1/6 left-1/12 text-green-400/10 hidden lg:block"
          animate={{ y: [-10, 10, -10], rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <CreditCard className="w-8 h-8" />
        </motion.div>

        <motion.div 
          className="absolute bottom-1/4 right-1/12 text-blue-400/10 hidden lg:block"
          animate={{ y: [10, -10, 10], rotate: [3, -3, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Smartphone className="w-8 h-8" />
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
            Facilidades de Pagamento
          </motion.div>
          <h2 className="font-inter font-light text-3xl sm:text-5xl lg:text-6xl xl:text-8xl leading-none tracking-[-0.03em] text-white mb-4 sm:mb-6">
            CONDIÇÕES DE PAGAMENTO
          </h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-4xl mx-auto px-4">
            <span className="text-white/80 font-medium">Trabalho com formas flexíveis pra facilitar seu investimento criativo:</span>
            <br />
            Múltiplas opções de pagamento para se adequar ao seu fluxo de caixa e necessidades específicas.
          </p>
        </motion.div>

        {/* Payment Brands Section */}
        <motion.div 
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white/80 text-lg sm:text-xl font-medium mb-4">
              Bandeiras e Formas de Pagamento Aceitas
            </h3>
            <p className="text-white/60 text-sm sm:text-base">
              Processamento seguro através das principais plataformas de pagamento
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
            {paymentBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                className="group flex flex-col items-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <motion.div
                  className="relative p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
                  whileHover={{ 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(59,130,246,0.2)' 
                  }}
                >
                  {brand.icon}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${brand.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                  />
                </motion.div>
                <span className="text-white/70 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-300">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Payment Method Card */}
              <motion.div
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start space-x-4 mb-4">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-r ${method.accent} bg-opacity-20 flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {method.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-lg sm:text-xl mb-2 leading-tight">
                        {method.title}
                      </h3>
                      <p className="text-white/60 text-sm sm:text-base">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlight Badge */}
                  <motion.div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${method.accent} bg-opacity-20 border border-white/10 mb-4`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap className="w-3 h-3" />
                    <span className="text-xs sm:text-sm text-white/80 font-medium">
                      {method.highlight}
                    </span>
                  </motion.div>

                  {/* Features */}
                  <div className="space-y-3">
                    {method.features.map((feature, featureIndex) => (
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
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${method.accent}`} />
                        </motion.div>
                        <span className="text-white/70 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${method.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Security Notice */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Shield className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <div className="text-white font-medium text-sm sm:text-base">
                Segurança e Transparência
              </div>
              <div className="text-white/70 text-xs sm:text-sm">
                Todas as transações são protegidas e documentadas via contrato digital
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-white/60 text-sm sm:text-base leading-relaxed px-4">
              <span className="text-white/80 font-medium">Importante:</span> A taxa de parcelamento pode ser repassada ao cliente conforme operadora. 
              Todos os projetos incluem contrato digital enviado para assinatura antes de qualquer etapa.
            </p>
          </div>

          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full font-medium hover:from-emerald-500 hover:to-green-500 transition-all magnetic"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Discutir Condições de Pagamento</span>
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

export default PaymentTerms;
