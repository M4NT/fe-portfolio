import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { trackGAEvent } from '../lib/analytics';
import { useLanguage } from './LanguageContext';

const rules = {
  pt: [
    'R$ 300 de desconto para o novo cliente (Site Institucional ou Landing Page)',
    'Quem indicou recebe R$ 300 de crédito no próximo projeto',
    'Válido no fechamento (contrato + entrada) • 1 por projeto • Não cumulativo',
    'Sem abordagens ativas: o indicado precisa vir até mim e informar quem indicou'
  ],
  en: [
    '$60 off for the new client (Institutional Site or Landing Page)',
    'Referrer gets $60 credit for the next project',
    'Applied on closing (contract + deposit) • 1 per project • Not cumulative',
    'No outreach: the referred client must contact and mention the referrer'
  ],
  es: [
    '$60 de descuento para el nuevo cliente (Sitio institucional o Landing Page)',
    'Quien indica recibe $60 de crédito para el próximo proyecto',
    'Válido al cerrar (contrato + entrada) • 1 por proyecto • No acumulable',
    'Sin abordaje activo: el referido debe contactarnos e informar quién lo indicó'
  ]
};

export default function Affiliates() {
  const { language } = useLanguage();
  const handleWhatsApp = () => {
    let ref = '';
    try { ref = localStorage.getItem('referrer') || ref; } catch {}
    const msg = `Oi, Yan! 🔥 Fui indicado por ${ref || '___'} e quero fechar um projeto de Landing Page/Site Institucional. Podemos avançar com a proposta hoje?`;
    const url = `https://wa.me/5516992233365?text=${encodeURIComponent(msg)}`;
    trackGAEvent('whatsapp_click', { location: 'affiliates_section', label: 'whatsapp_affiliates', ref });
    window.open(url, '_blank');
  };

  return (
    <section id="affiliates" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-3"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500/80">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight">
            {language === 'pt' && (<>
              Indique e economize <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">R$ 300</span>
            </>)}
            {language === 'en' && (<>
              Refer & save <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">$60</span>
            </>)}
            {language === 'es' && (<>
              Indica y ahorra <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">$60</span>
            </>)}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-white/70 text-lg md:text-xl max-w-3xl mb-10"
        >
          {language === 'pt' && 'Programa simples e vantajoso: quem fecha um projeto e informa quem indicou paga menos, e quem indicou ganha crédito para o próximo.'}
          {language === 'en' && 'Simple and fair: close a project, mention who referred you and pay less; the referrer gets credit for the next project.'}
          {language === 'es' && 'Simple y ventajoso: cierras un proyecto, mencionas quién te indicó y pagas menos; quien indica recibe crédito para el próximo proyecto.'}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[0,1,2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-orange-400"><Sparkles className="w-5 h-5" /></div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">
                    {i === 0 && (language === 'pt' ? 'Como funciona' : language === 'en' ? 'How it works' : 'Cómo funciona')}
                    {i === 1 && (language === 'pt' ? 'Quem ganha o quê' : language === 'en' ? 'Who gets what' : 'Quién gana qué')}
                    {i === 2 && (language === 'pt' ? 'Regras rápidas' : language === 'en' ? 'Quick rules' : 'Reglas rápidas')}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {i === 0 && (language === 'pt' ? 'Ao fechar seu projeto, informe quem te indicou. Se for Site Institucional ou Landing Page, você recebe R$ 300 de desconto.' : language === 'en' ? 'When closing your project, mention who referred you. For Institutional Site or Landing Page, you get $60 off.' : 'Al cerrar tu proyecto, menciona quién te indicó. Para Sitio institucional o Landing Page, obtienes $60 de descuento.')}
                    {i === 1 && (language === 'pt' ? 'Você paga menos; quem indicou recebe R$ 300 de crédito no próximo projeto. Vantagem para os dois lados.' : language === 'en' ? 'You pay less; the referrer gets $60 credit for the next project. Win‑win.' : 'Pagas menos; quien indica recibe $60 de crédito para el próximo proyecto. Win‑win.')}
                    {i === 2 && (language === 'pt' ? 'Benefício aplicado no fechamento (contrato + entrada), 1 por projeto, não cumulativo, sem prospecção ativa do indicado.' : language === 'en' ? 'Benefit applied on closing (contract + deposit), 1 per project, not cumulative, no outreach to the referred client.' : 'Beneficio aplicado al cerrar (contrato + entrada), 1 por proyecto, no acumulable, sin abordaje activo al referido.')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-3 mb-10"
        >
          {rules[language].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-white/80">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
              <span className="text-sm md:text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={handleWhatsApp}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold transition-all shadow-[0_0_40px_-15px_rgba(255,100,0,0.6)] hover:shadow-[0_0_50px_-12px_rgba(255,100,0,0.8)]"
          >
            <span className="relative">
              {language === 'pt' && 'Falar no WhatsApp'}
              {language === 'en' && 'Chat on WhatsApp'}
              {language === 'es' && 'Hablar por WhatsApp'}
              {/* foguinho + dinheiro animados no hover */}
              <span className="pointer-events-none absolute -right-8 -top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block animate-bounce">🔥</span>
                <span className="inline-block animate-pulse ml-1">💸</span>
              </span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-white/50 text-sm">Informe quem indicou no primeiro contato</span>
        </motion.div>
      </div>
    </section>
  );
}


