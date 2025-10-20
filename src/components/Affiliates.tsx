import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { trackGAEvent } from '../lib/analytics';

const rules = [
  'R$ 300 de desconto para o novo cliente (Site Institucional ou Landing Page)',
  'Quem indicou recebe R$ 300 de crédito no próximo projeto',
  'Válido no fechamento (contrato + entrada) • 1 por projeto • Não cumulativo',
  'Sem abordagens ativas: o indicado precisa vir até mim e informar quem indicou'
];

export default function Affiliates() {
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
            Indique e economize <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">R$ 300</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-white/70 text-lg md:text-xl max-w-3xl mb-10"
        >
          Programa simples, direto e vantajoso: quem fecha um projeto e informa quem indicou paga menos, e quem indicou ganha crédito para o próximo. Zero burocracia, 100% transparência.
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
                    {i === 0 && 'Como funciona'}
                    {i === 1 && 'Quem ganha o quê'}
                    {i === 2 && 'Regras rápidas'}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {i === 0 && 'Ao fechar seu projeto, informe quem te indicou. Se for Site Institucional ou Landing Page, você recebe R$ 300 de desconto.'}
                    {i === 1 && 'Você paga menos; quem indicou recebe R$ 300 de crédito no próximo projeto. Vantagem para os dois lados.'}
                    {i === 2 && 'Benefício aplicado no fechamento (contrato + entrada), 1 por projeto, não cumulativo, sem prospecção ativa do indicado.'}
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
          {rules.map((item, idx) => (
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
              Falar no WhatsApp
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


