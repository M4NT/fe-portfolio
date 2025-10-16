import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Calendar, TrendingUp, Shield, Clock, FileText, Check, ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const PaymentTerms = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null);

  const paymentMethods = [
    {
      id: 1,
      title: 'Pix à Vista',
      subtitle: 'Desconto especial',
      description: 'Transferência instantânea com desconto exclusivo',
      icon: <Smartphone className="w-5 h-5" />,
      accent: 'from-green-500 to-emerald-500',
      accentSolid: 'bg-green-500',
      features: [
        'Transferência instantânea',
        'Desconto exclusivo aplicado',
        'Confirmação imediata',
        'Sem taxas bancárias'
      ],
      highlight: 'Melhor custo-benefício',
      popular: true
    },
    {
      id: 2,
      title: '50/50',
      subtitle: 'Mais popular',
      description: '50% no início + 50% na entrega',
      icon: <TrendingUp className="w-5 h-5" />,
      accent: 'from-blue-500 to-cyan-500',
      accentSolid: 'bg-blue-500',
      features: [
        'Para valores a partir de R$ 900',
        'Pagamento inicial para começar',
        'Saldo na entrega final',
        'Segurança para ambas as partes'
      ],
      highlight: 'Modalidade mais popular',
      popular: false
    },
    {
      id: 3,
      title: 'Cartão de Crédito',
      subtitle: 'Até 10x sem juros',
      description: 'Parcelamento flexível via link seguro',
      icon: <CreditCard className="w-5 h-5" />,
      accent: 'from-purple-500 to-pink-500',
      accentSolid: 'bg-purple-500',
      features: [
        'Stripe ou PagSeguro',
        'Até 10x no cartão',
        'Link de pagamento seguro',
        'Taxa de parcelamento conforme operadora'
      ],
      highlight: 'Máxima flexibilidade',
      popular: false
    },
    {
      id: 4,
      title: 'Pagamento Escalonado',
      subtitle: 'Por etapas',
      description: 'Dividido conforme evolução do projeto',
      icon: <Clock className="w-5 h-5" />,
      accent: 'from-orange-500 to-red-500',
      accentSolid: 'bg-orange-500',
      features: [
        'Entrada + primeira entrega',
        'Pagamento por milestone',
        'Entrega final',
        'Acompanhamento do progresso'
      ],
      highlight: 'Pagamento conforme evolução',
      popular: false
    }
  ];

  const securityFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Contrato Digital',
      description: 'Assinatura eletrônica obrigatória'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Termos Transparentes',
      description: 'Todas as condições claras'
    },
    {
      icon: <Check className="w-5 h-5" />,
      title: 'Proteção Legal',
      description: 'Segurança jurídica garantida'
    }
  ];

  const togglePayment = (paymentId: number) => {
    setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
  };

  return (
    <section 
      id="payment" 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-black"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />

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
            Formas de Pagamento
          </div>
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            Flexibilidade Total
          </h2>
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Escolha a forma de pagamento que melhor se adapta ao seu orçamento. Todas as opções são seguras e transparentes.
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {paymentMethods.map((payment, index) => (
            <motion.div
              key={payment.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Payment Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* Header - Clickable */}
                <button
                  onClick={() => togglePayment(payment.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon & Info */}
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${payment.accent} shadow-lg`}>
                      <div className="text-white">
                        {payment.icon}
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-semibold text-lg">
                          {payment.title}
                        </h3>
                        {payment.popular && (
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            RECOMENDADO
                          </div>
                        )}
                      </div>
                      <p className="text-white/60 text-sm mb-1">
                        {payment.subtitle}
                      </p>
                      <p className="text-white/70 text-sm">
                        {payment.description}
                      </p>
                    </div>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: expandedPayment === payment.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40"
                  >
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </motion.div>
                </button>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {expandedPayment === payment.id && (
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
                      <div className="p-6 pt-6 bg-white/[0.02]">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Features List */}
                          <div>
                            <h4 className="text-white/90 font-medium mb-4">
                              O que está incluído:
                            </h4>
                            <div className="space-y-3">
                              {payment.features.map((feature, idx) => (
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
                                Benefício
                              </div>
                              <div className="text-white text-lg font-medium mb-1">
                                {payment.highlight}
                              </div>
                              <div className="text-white/50 text-sm">
                                Condições especiais disponíveis
                              </div>
                            </div>

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

        {/* Security Features */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl font-light mb-2">Segurança Garantida</h3>
            <p className="text-white/60">Todas as transações são protegidas e transparentes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center border-t border-white/10 pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-4">
              <Shield className="w-4 h-4" />
              <span>Todas as transações são seguras e protegidas</span>
            </div>
          </div>

          <h3 className="text-white text-2xl font-light mb-3">
            Pronto para começar?
          </h3>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Entre em contato para discutirmos a melhor forma de pagamento para o seu projeto.
          </p>
          
          <a
            href="#contact"
            className="group/cta relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg font-medium overflow-hidden transition-all hover:border-gray-600 hover:shadow-lg hover:shadow-gray-500/20"
          >
            <span className="relative bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-semibold text-lg group-hover/cta:from-white group-hover/cta:via-white group-hover/cta:to-gray-300 transition-all duration-300">
              Discutir Condições de Pagamento
            </span>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all duration-300" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PaymentTerms;