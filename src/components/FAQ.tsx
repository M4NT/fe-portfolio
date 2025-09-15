import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Suas novas perguntas e respostas em português
  const faqs = [
    {
      id: 1,
      question: "Preciso fazer reuniões?",
      answer: "Não, eu também não gosto de reuniões. Trabalho principalmente de forma assíncrona através de e-mails e mensagens. Se não gostar do resultado, podemos agendar uma reunião para debatermos melhor e eu entender seu ponto de vista. Esse formato tem se mostrado mais eficiente e respeita o tempo de todos."
    },
    {
      id: 2,
      question: "Tem reembolso?",
      answer: "Devido à natureza do trabalho digital e à qualidade garantida do meu trabalho, não ofereço reembolso total. No entanto, trabalho com um sistema de satisfação - se houver problemas específicos com o projeto entregue que não atendam ao escopo combinado, farei ajustes sem custo adicional até que o resultado esteja alinhado com as expectativas documentadas inicialmente."
    },
    {
      id: 3,
      question: "Como funcionam os pagamentos?",
      answer: "Aceito Pix, transferência bancária e cartão de crédito. Para projetos maiores, trabalho com um modelo de 50% de adiantamento e 50% na entrega. Para clientes recorrentes, posso estabelecer termos personalizados. Todas as formas de pagamento são documentadas com recibos e, se necessário, posso emitir nota fiscal."
    },
    {
      id: 4,
      question: "Qual é o seu processo de trabalho?",
      answer: "Meu processo começa com um briefing detalhado para entender suas necessidades. Depois, desenvolvo protótipos iniciais para validação do conceito visual, sigo com a implementação do design aprovado, e finalizo com testes e otimizações. Durante todo o processo, mantenho uma comunicação clara sobre o andamento, garantindo que o resultado final atenda plenamente às suas expectativas."
    },
    {
      id: 5,
      question: "Qual é o prazo médio para entrega de um projeto?",
      answer: "O prazo varia conforme a complexidade do projeto. Websites simples geralmente levam 2-3 semanas, enquanto projetos mais complexos com animações customizadas podem levar 4-8 semanas. Na nossa conversa inicial, definirei um cronograma realista e transparente baseado nas suas necessidades específicas e prioridades."
    },
    {
      id: 6,
      question: "Você faz manutenção após a entrega do projeto?",
      answer: "Sim! Todos os projetos incluem 30 dias de suporte após o lançamento para correções de bugs ou pequenos ajustes. Para necessidades contínuas, ofereço pacotes de manutenção mensal que incluem atualizações, melhorias de desempenho, backup e monitoramento de segurança. Também posso treinar sua equipe para fazer manutenções básicas."
    },
    {
      id: 7,
      question: "Quais tecnologias você utiliza?",
      answer: "Trabalho principalmente com React, Next.js, TypeScript, GSAP e Framer Motion para animações, e TailwindCSS para estilos. Tenho experiência com headless CMS como Sanity e Contentful, e integração com várias APIs. Estou sempre me atualizando com as melhores tecnologias para garantir que seu projeto tenha performance, segurança e código limpo."
    },
    {
      id: 8,
      question: "Você trabalha com SEO e otimização de performance?",
      answer: "Absolutamente! Implemento práticas de SEO técnico em todos os projetos, garantindo que o site seja amigável para mecanismos de busca. Utilizo ferramentas como Lighthouse e PageSpeed Insights para otimizar a performance, e sigo métricas Core Web Vitals para melhorar a experiência do usuário, o que impacta positivamente no ranking de busca."
    },
    {
      id: 9,
      question: "Você faz design responsivo?",
      answer: "Sim, todos os meus projetos são totalmente responsivos, adaptando-se perfeitamente a qualquer dispositivo - de smartphones a TVs de alta resolução. Utilizo abordagens modernas como design mobile-first, fluid typography e layout systems que garantem uma experiência consistente e de alta qualidade independente do tamanho da tela."
    },
    {
      id: 10,
      question: "Como você lida com prazos apertados?",
      answer: "Entendo que às vezes surgem necessidades urgentes. Para prazos apertados, posso priorizar funcionalidades essenciais em uma abordagem MVP (Produto Mínimo Viável), permitindo lançamento mais rápido enquanto continuamos a desenvolver recursos adicionais. Para esses casos, existe uma taxa de urgência que será discutida previamente, pois envolve reorganização da minha agenda."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-12 py-32">

        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-white/40 text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Dúvidas Frequentes
          </motion.div>
          <h2 className="font-inter font-light text-6xl lg:text-8xl leading-none tracking-[-0.03em] text-white">
            FAQ
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="border-b border-white/10 last:border-b-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="w-full py-8 flex items-center justify-between text-left group"
                onClick={() => toggleFAQ(index)}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1 pr-8">
                  <motion.div
                    className="flex items-center space-x-4 mb-2"
                    layout
                  >
                    <span className="text-white/40 text-sm font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/20">—</span>
                  </motion.div>
                  <motion.h3
                    className="font-inter font-medium text-2xl lg:text-3xl text-white group-hover:text-white/80 transition-colors duration-300 leading-tight"
                    layout
                  >
                    {faq.question}
                  </motion.h3>
                </div>

                <motion.div
                  className="flex-shrink-0 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white/40 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {openIndex === index ? (
                      <motion.div key="minus" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Minus size={20} className="text-white/60" />
                      </motion.div>
                    ) : (
                      <motion.div key="plus" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Plus size={20} className="text-white/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div className="pb-8 pl-16" initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }} transition={{ duration: 0.3, delay: 0.1 }}>
                      <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="font-inter font-light text-3xl text-white mb-6">
              Ainda tem dúvidas?
            </h3>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Adoraria discutir seu projeto e explorar como podemos criar
              algo extraordinário juntos.
            </p>

            {/* ======================================================= */}
            {/* ========= BOTÃO CUSTOMIZADO - IDÊNTICO AO HERO ========= */}
            {/* ======================================================= */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              // Classes copiadas do seu botão Hero para consistência visual
              className="group relative inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium tracking-wide overflow-hidden magnetic text-center glow-button"
              // Animações de hover e tap idênticas
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Entre em Contato</span>
                {/* Seta animada, um detalhe importante do seu design */}
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>

              {/* Efeito "shine" no hover, exatamente como no Hero */}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/60 to-white/30 opacity-0"
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '120%', opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  style={{ filter: 'blur(8px)' }}
                />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;