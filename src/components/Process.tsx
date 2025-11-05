import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, Rocket, ShieldCheck, Sparkles, ArrowRight, MessageCircle, AlertCircle, CheckCircle2, TrendingUp, Zap, Timer } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackCTAClick } from '../lib/analytics';
import AnimatedBackground from './AnimatedBackground';

const whatsappNumber = '5516992233365';

const handleWhatsApp = (stepName: string) => {
  const message = encodeURIComponent(`Olá! Quero saber mais sobre a etapa: ${stepName}. Podemos conversar?`);
  trackCTAClick(`whatsapp-${stepName.toLowerCase().replace(/\s+/g, '-')}`, 'process', `https://wa.me/${whatsappNumber}`);
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
};

type Step = {
  icon: JSX.Element;
  title: string;
  painPoint: string;
  solution: string;
  result: string;
  benefits: string[];
  color: string;
  number: string;
  duration: string;
};

const steps: Step[] = [
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: 'Entendemos seu problema',
    painPoint: 'Você não sabe por onde começar ou já tentou antes e não deu certo',
    solution: 'Call estratégica de 30 min onde mapeamos tudo: suas dores, seus objetivos e como transformar isso em resultados reais',
    result: 'Sai da call sabendo exatamente o que precisa ser feito e quanto vai investir',
    benefits: [
      'Sem pegadinhas: orçamento transparente desde o início',
      'Estratégia clara de como vamos resolver seu problema',
      'Cronograma realista que você pode confiar',
      'Saber exatamente o que vai receber e quando'
    ],
    color: 'from-red-500 to-orange-500',
    number: '01',
    duration: '30 minutos'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Criamos o plano de ação',
    painPoint: 'Outros fornecedores prometem tudo mas entregam pouco',
    solution: 'Proposta detalhada com escopo completo, cronograma e investimento. Você aprova cada detalhe antes de começarmos',
    result: 'Proposta clara e transparente. Sem surpresas depois',
    benefits: [
      'Tudo documentado: não há "esqueci de avisar"',
      'Ajustes gratuitos até ficar perfeito para você',
      'Investimento parcelado em até 12x sem juros',
      'Garantia de 30 dias ou seu dinheiro de volta'
    ],
    color: 'from-orange-500 to-yellow-500',
    number: '02',
    duration: '24 horas'
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Executamos e você acompanha',
    painPoint: 'Outros somem durante o projeto e você fica no escuro',
    solution: 'Desenvolvimento com checkpoints semanais. Você vê o progresso em tempo real e aprova cada etapa',
    result: 'Sempre sabe o que está acontecendo. Controle total do projeto',
    benefits: [
      'Acompanhamento em tempo real: veja o site sendo construído',
      'Checkpoints semanais: sua aprovação em cada etapa',
      'Comunicação direta: resposta em até 24h',
      'Ajustes sem custo adicional durante o desenvolvimento'
    ],
    color: 'from-purple-500 to-pink-500',
    number: '03',
    duration: '15-20 dias'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Lançamos e garantimos resultados',
    painPoint: 'Outros entregam e somem. Você fica sozinho quando mais precisa',
    solution: 'Lançamento acompanhado + 30 dias de suporte completo. Garantimos que tudo funcione perfeitamente',
    result: 'Site no ar, funcionando perfeitamente e gerando resultados desde o primeiro dia',
    benefits: [
      'Suporte ativo por 30 dias após o lançamento',
      'Treinamento completo para você gerenciar sozinho',
      'Correções e ajustes sem custo adicional',
      'Otimizações baseadas em dados reais de uso'
    ],
    color: 'from-green-500 to-emerald-500',
    number: '04',
    duration: 'Lançamento + 30 dias'
  }
];

export default function Process() {
  const { language } = useLanguage();

  return (
    <section id="process" className="relative py-16 md:py-24 bg-black overflow-hidden">
      <AnimatedBackground variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline - Focada em Resolver Problema */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            <span>Processo Transparente e Sem Complicação</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Como vamos</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              resolver seu problema
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Sem surpresas. Sem pegadinhas. <span className="text-blue-400 font-semibold">Apenas resultados</span>.
            <br />
            Veja exatamente como transformamos sua situação atual em <span className="text-green-400 font-semibold">sucesso real</span>.
          </p>
        </motion.div>

        {/* Process Steps - Transformados em Funil */}
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Number & Icon */}
                  <div className="lg:col-span-2 flex items-start gap-4">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="text-6xl font-bold text-white/10">{step.number}</div>
                      <div className="text-xs text-white/50 mt-2">{step.duration}</div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-10 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">{step.title}</h3>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/60 text-xs">{step.duration}</span>
                      </div>
                    </div>

                    {/* Grid: Problema → Solução → Resultado */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* PROBLEMA */}
                      <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <h4 className="font-bold text-red-400 text-sm uppercase">A Situação</h4>
                        </div>
                        <p className="text-white/70 text-sm">{step.painPoint}</p>
                      </div>

                      {/* SOLUÇÃO */}
                      <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-5 h-5 text-purple-400" />
                          <h4 className="font-bold text-purple-400 text-sm uppercase">Nossa Solução</h4>
                        </div>
                        <p className="text-white/70 text-sm">{step.solution}</p>
                      </div>

                      {/* RESULTADO */}
                      <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <h4 className="font-bold text-green-400 text-sm uppercase">O Resultado</h4>
                        </div>
                        <p className="text-white/70 text-sm font-semibold">{step.result}</p>
                      </div>
                    </div>

                    {/* Benefits List */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.benefits.map((benefit, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => handleWhatsApp(step.title)}
                      className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r ${step.color} text-white font-bold rounded-lg hover:shadow-lg hover:shadow-${step.color}/30 transition-all duration-300 flex items-center justify-center gap-2`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Quero saber mais sobre esta etapa</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Pronto para começar a transformação?
          </h3>
          <p className="text-white/70 mb-6">
            Vamos começar pelo primeiro passo: entender seu problema e criar a solução perfeita.
          </p>
          <motion.button
            onClick={() => handleWhatsApp('Quero Começar Agora')}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Quero Começar Agora</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


