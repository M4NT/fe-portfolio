import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, Rocket, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { trackGAEvent } from '../lib/analytics';
import AnimatedBackground from './AnimatedBackground';

type Step = {
  icon: JSX.Element;
  title: { pt: string; en: string; es: string };
  desc: { pt: string; en: string; es: string };
  color: string;
  number: string;
};

const steps: Step[] = [
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: { pt: 'Descoberta', en: 'Discovery', es: 'Descubrimiento' },
    desc: {
      pt: 'Entendemos objetivos, prazos e métricas de sucesso em uma call de 20–30 minutos.',
      en: 'We clarify goals, timeline and success metrics in a 20–30 minute call.',
      es: 'Aclaramos metas, plazos y métricas de éxito en una llamada de 20–30 minutos.'
    },
    color: 'from-yellow-500 to-orange-500',
    number: '01'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: { pt: 'Proposta', en: 'Proposal', es: 'Propuesta' },
    desc: {
      pt: 'Enviamos escopo, investimento e cronograma. Ajustes rápidos até o aceite.',
      en: 'We send scope, budget and schedule. Quick adjustments until approval.',
      es: 'Enviamos alcance, inversión y cronograma. Ajustes rápidos hasta la aprobación.'
    },
    color: 'from-blue-500 to-cyan-500',
    number: '02'
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: { pt: 'Execução', en: 'Execution', es: 'Ejecución' },
    desc: {
      pt: 'Design e desenvolvimento com checkpoints. Você acompanha tudo e aprova etapas.',
      en: 'Design and development with checkpoints. You follow along and approve stages.',
      es: 'Diseño y desarrollo con checkpoints. Acompañas y apruebas las etapas.'
    },
    color: 'from-purple-500 to-pink-500',
    number: '03'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: { pt: 'Go‑live & Suporte', en: 'Go‑live & Support', es: 'Go‑live y Soporte' },
    desc: {
      pt: 'Publicação, checklist de SEO/performance e 30 dias de suporte incluídos.',
      en: 'Launch, SEO/performance checklist and 30‑day support included.',
      es: 'Publicación, checklist de SEO/rendimiento y 30 días de soporte incluidos.'
    },
    color: 'from-green-500 to-emerald-500',
    number: '04'
  }
];

export default function Process() {
  const { language } = useLanguage();

  return (
    <section id="process" className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="subtle" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">
              {language === 'pt' ? 'Processo' : language === 'en' ? 'Process' : 'Proceso'}
            </span>
          </motion.div>
          
          <h2 className="font-inter font-light text-5xl lg:text-7xl leading-none tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              {language === 'pt' && 'Como Funciona'}
              {language === 'en' && 'How It Works'}
              {language === 'es' && 'Cómo Funciona'}
            </span>
          </h2>
          
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl leading-relaxed">
            {language === 'pt' && (
              <>
                Um processo <span className="text-amber-400 font-semibold">simples e transparente</span> para tirar seu projeto do papel e transformá-lo em realidade digital.
              </>
            )}
            {language === 'en' && (
              <>
                A <span className="text-amber-400 font-semibold">simple and transparent</span> process to bring your project to life.
              </>
            )}
            {language === 'es' && (
              <>
                Un proceso <span className="text-amber-400 font-semibold">simple y transparente</span> para dar vida a tu proyecto.
              </>
            )}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-white/20 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-300">
                {s.number}
              </div>

              {/* Icon */}
              <motion.div 
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                {s.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-amber-300 transition-colors">
                {s.title[language]}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                {s.desc[language]}
              </p>

              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                const nav = document.querySelector('nav') as HTMLElement | null;
                const offset = nav?.offsetHeight ? nav.offsetHeight : 80;
                const rect = el.getBoundingClientRect();
                const top = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                trackGAEvent('cta_click', { location: 'process_section', label: 'start_now_scroll_contact' });
              }
            }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>
              {language === 'pt' && 'Começar Meu Projeto'}
              {language === 'en' && 'Start My Project'}
              {language === 'es' && 'Empezar Mi Proyecto'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


