import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, Rocket, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

type Step = {
  icon: JSX.Element;
  title: { pt: string; en: string; es: string };
  desc: { pt: string; en: string; es: string };
};

const steps: Step[] = [
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: { pt: 'Descoberta', en: 'Discovery', es: 'Descubrimiento' },
    desc: {
      pt: 'Entendemos objetivos, prazos e métricas de sucesso em uma call de 20–30 minutos.',
      en: 'We clarify goals, timeline and success metrics in a 20–30 minute call.',
      es: 'Aclaramos metas, plazos y métricas de éxito en una llamada de 20–30 minutos.'
    }
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: { pt: 'Proposta', en: 'Proposal', es: 'Propuesta' },
    desc: {
      pt: 'Enviamos escopo, investimento e cronograma. Ajustes rápidos até o aceite.',
      en: 'We send scope, budget and schedule. Quick adjustments until approval.',
      es: 'Enviamos alcance, inversión y cronograma. Ajustes rápidos hasta la aprobación.'
    }
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: { pt: 'Execução', en: 'Execution', es: 'Ejecución' },
    desc: {
      pt: 'Design e desenvolvimento com checkpoints. Você acompanha tudo e aprova etapas.',
      en: 'Design and development with checkpoints. You follow along and approve stages.',
      es: 'Diseño y desarrollo con checkpoints. Acompañas y apruebas las etapas.'
    }
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: { pt: 'Go‑live & Suporte', en: 'Go‑live & Support', es: 'Go‑live y Soporte' },
    desc: {
      pt: 'Publicação, checklist de SEO/performance e 30 dias de suporte incluídos.',
      en: 'Launch, SEO/performance checklist and 30‑day support included.',
      es: 'Publicación, checklist de SEO/rendimiento y 30 días de soporte incluidos.'
    }
  }
];

export default function Process() {
  const { language } = useLanguage();

  return (
    <section id="process" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-white/40 text-sm uppercase tracking-wider mb-3 font-inter">
            {language === 'pt' ? 'Processo' : language === 'en' ? 'Process' : 'Proceso'}
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight">
            {language === 'pt' && 'Como eu tiro seu projeto do papel'}
            {language === 'en' && 'How I bring your project to life'}
            {language === 'es' && 'Cómo hago realidad tu proyecto'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-4">
                {s.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{s.title[language]}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{s.desc[language]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


