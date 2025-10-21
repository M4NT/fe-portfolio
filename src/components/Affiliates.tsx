import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Sparkles, ArrowRight, Gift, Users, TrendingUp } from 'lucide-react';
import { trackGAEvent } from '../lib/analytics';
import { useLanguage } from './LanguageContext';
import AffiliatesBackground from './AffiliatesBackground';

const benefits = {
  pt: [
    { icon: '💰', label: 'Você economiza', value: 'R$ 300 de desconto' },
    { icon: '🎁', label: 'Quem indicou ganha', value: 'R$ 300 em créditos' },
    { icon: '🤝', label: 'Projetos válidos', value: 'Landing Page ou Site' },
    { icon: '✅', label: 'Aplicação', value: 'No fechamento do contrato' }
  ],
  en: [
    { icon: '💰', label: 'You save', value: '$60 discount' },
    { icon: '🎁', label: 'Referrer gets', value: '$60 in credits' },
    { icon: '🤝', label: 'Valid projects', value: 'Landing Page or Website' },
    { icon: '✅', label: 'Applied', value: 'On contract closing' }
  ],
  es: [
    { icon: '💰', label: 'Ahorras', value: '$60 de descuento' },
    { icon: '🎁', label: 'Quien indica gana', value: '$60 en créditos' },
    { icon: '🤝', label: 'Proyectos válidos', value: 'Landing Page o Sitio' },
    { icon: '✅', label: 'Aplicación', value: 'Al cerrar el contrato' }
  ]
};

const rules = {
  pt: [
    'Mencione quem indicou no primeiro contato',
    'Válido para Landing Pages e Sites Institucionais',
    '1 indicação por projeto (não cumulativo)',
    'Benefício aplicado no fechamento com entrada'
  ],
  en: [
    'Mention referrer in first contact',
    'Valid for Landing Pages and Institutional Sites',
    '1 referral per project (non-cumulative)',
    'Benefit applied on closing with deposit'
  ],
  es: [
    'Menciona quién indicó en el primer contacto',
    'Válido para Landing Pages y Sitios Institucionales',
    '1 referido por proyecto (no acumulable)',
    'Beneficio aplicado al cerrar con entrada'
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
    <section id="affiliates" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Animated Background with Emojis */}
      <AffiliatesBackground />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header - Mantendo estética original */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-3"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500/80"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Flame className="w-5 h-5 text-white" />
          </motion.div>
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
          className="text-white/80 text-lg md:text-xl max-w-3xl mb-16"
        >
          {language === 'pt' && (
            <>
              Ganhe <span className="text-orange-400 font-bold">R$ 300</span> de desconto no seu projeto 
              <span className="text-white font-semibold"> ao mencionar quem indicou</span>. 
              Quem indica também recebe <span className="text-pink-400 font-bold">R$ 300 em créditos</span>. 
              <span className="block mt-2 text-white/60 text-base">
                É vantagem para todos! 🎉
              </span>
            </>
          )}
          {language === 'en' && (
            <>
              Get <span className="text-orange-400 font-bold">$60</span> off your project 
              <span className="text-white font-semibold"> by mentioning who referred you</span>. 
              Referrers also get <span className="text-pink-400 font-bold">$60 in credits</span>. 
              <span className="block mt-2 text-white/60 text-base">
                Win-win for everyone! 🎉
              </span>
            </>
          )}
          {language === 'es' && (
            <>
              Obtén <span className="text-orange-400 font-bold">$60</span> de descuento en tu proyecto 
              <span className="text-white font-semibold"> mencionando quién te indicó</span>. 
              Quien indica también recibe <span className="text-pink-400 font-bold">$60 en créditos</span>. 
              <span className="block mt-2 text-white/60 text-base">
                ¡Ventaja para todos! 🎉
              </span>
            </>
          )}
        </motion.p>

        {/* Benefits Grid - Visual mais impactante */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {benefits[language].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm hover:border-orange-400/30 transition-all duration-300 text-center"
            >
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {benefit.icon}
                </motion.div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1 font-medium">
                  {benefit.label}
                </div>
                <div className="text-white font-bold text-lg">
                  {benefit.value}
                </div>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-white font-semibold text-2xl mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {language === 'pt' && 'Como Funciona'}
            {language === 'en' && 'How It Works'}
            {language === 'es' && 'Cómo Funciona'}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {rules[language].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-pink-500/5 to-orange-500/10 p-8 lg:p-12"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-pink-500/5" />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.div 
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎉
            </motion.div>
            
            <h4 className="text-white font-bold text-3xl mb-4">
              {language === 'pt' && 'Pronto para Economizar?'}
              {language === 'en' && 'Ready to Save?'}
              {language === 'es' && '¿Listo para Ahorrar?'}
            </h4>
            
            <p className="text-white/70 text-lg mb-8">
              {language === 'pt' && 'Entre em contato agora e mencione quem indicou para garantir seu desconto de R$ 300!'}
              {language === 'en' && 'Contact now and mention your referrer to secure your $60 discount!'}
              {language === 'es' && '¡Contacta ahora y menciona quién te indicó para asegurar tu descuento de $60!'}
            </p>
            
            <motion.button
              onClick={handleWhatsApp}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Flame className="w-5 h-5" />
              <span>
                {language === 'pt' && 'Falar no WhatsApp'}
                {language === 'en' && 'Chat on WhatsApp'}
                {language === 'es' && 'Hablar por WhatsApp'}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <p className="text-white/50 text-sm mt-6">
              {language === 'pt' && '💡 Lembre-se: Mencione quem indicou no primeiro contato'}
              {language === 'en' && '💡 Remember: Mention your referrer in the first contact'}
              {language === 'es' && '💡 Recuerda: Menciona quién te indicó en el primer contacto'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


