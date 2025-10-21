import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Calendar, TrendingUp, Shield, Clock, FileText, Check, ArrowRight, Zap, Sparkles, Wallet } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import AnimatedBackground from './AnimatedBackground';

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Wallet className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Formas de Pagamento</span>
          </motion.div>
          
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
              Flexibilidade Total
            </span>
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Escolha a forma de pagamento que <span className="text-indigo-400 font-semibold">melhor se adapta</span> ao seu orçamento. 
            Todas as opções são <span className="text-purple-400 font-semibold">seguras e transparentes</span>.
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
              whileHover={{ y: -4 }}
            >
              {/* Payment Card */}
              <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                {/* Hover Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${payment.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-semibold">Segurança Garantida</h3>
              <p className="text-white/60 text-sm">Todas as transações são protegidas e transparentes</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-indigo-400/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </motion.div>
                <h4 className="text-white font-semibold mb-2 group-hover:text-indigo-300 transition-colors">{feature.title}</h4>
                <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-indigo-500/10 p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-4 h-4" />
              <span>Todas as transações são seguras e protegidas</span>
            </motion.div>

            <h3 className="text-white font-bold text-3xl mb-4">
              Pronto para Começar?
            </h3>
            
            <p className="text-white/70 text-lg mb-8">
              Entre em contato para discutirmos a <span className="text-indigo-400 font-semibold">melhor forma de pagamento</span> para o seu projeto.
            </p>
            
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-bold text-lg transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Discutir Condições de Pagamento</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PaymentTerms;