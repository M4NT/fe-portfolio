import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FAQItem {
  id: number;
  question: {
    pt: string;
    en: string;
    es: string;
  };
  answer: {
    pt: string;
    en: string;
    es: string;
  };
  category: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { language, t } = useLanguage();

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: {
        pt: "Quão rápido vou receber meus projetos?",
        en: "How fast will I receive my projects?",
        es: "¿Qué tan rápido recibiré mis proyectos?"
      },
      answer: {
        pt: "Em média, a maioria dos pedidos é concluída em apenas 1 semana ou menos. No entanto, solicitações mais complexas podem demorar mais tempo. Sempre comunico prazos realistas desde o início e mantenho você atualizado sobre o progresso.",
        en: "On average, most requests are completed in just 1 week or less. However, more complex requests may take longer. I always communicate realistic timelines from the start and keep you updated on progress.",
        es: "En promedio, la mayoría de las solicitudes se completan en solo 1 semana o menos. Sin embargo, las solicitudes más complejas pueden tomar más tiempo. Siempre comunico plazos realistas desde el principio y te mantengo actualizado sobre el progreso."
      },
      category: 'timeline'
    },
    {
      id: 2,
      question: {
        pt: "Como você lida com solicitações maiores?",
        en: "How do you handle larger requests?",
        es: "¿Cómo manejas las solicitudes más grandes?"
      },
      answer: {
        pt: "Pedidos maiores são quebrados por partes. Isso se aplica a sites em grande escala ou designs de aplicativos móveis, trabalho de UI/UX, etc. Você deve esperar receber uma quantidade razoável de trabalho a cada 24-48 horas até que toda a solicitação seja feita.",
        en: "Larger requests are broken down into parts. This applies to large-scale websites or mobile app designs, UI/UX work, etc. You should expect to receive a reasonable amount of work every 24-48 hours until the entire request is completed.",
        es: "Las solicitudes más grandes se dividen en partes. Esto se aplica a sitios web a gran escala o diseños de aplicaciones móviles, trabajo de UI/UX, etc. Debes esperar recibir una cantidad razonable de trabajo cada 24-48 horas hasta que toda la solicitud esté completa."
      },
      category: 'process'
    },
    {
      id: 3,
      question: {
        pt: "E se eu não gostar do design?",
        en: "What if I don't like the design?",
        es: "¿Qué pasa si no me gusta el diseño?"
      },
      answer: {
        pt: "Não tem preocupações! Continuaremos a revisar o design até que você esteja 100% satisfeito. Incluo revisões ilimitadas em todos os meus pacotes para garantir que você receba exatamente o que precisa.",
        en: "No worries! We will continue to revise the design until you are 100% satisfied. I include unlimited revisions in all my packages to ensure you get exactly what you need.",
        es: "¡No te preocupes! Continuaremos revisando el diseño hasta que estés 100% satisfecho. Incluyo revisiones ilimitadas en todos mis paquetes para asegurar que obtengas exactamente lo que necesitas."
      },
      category: 'revisions'
    },
    {
      id: 4,
      question: {
        pt: "Há algum pedido que você não suporta?",
        en: "Are there any requests you don't support?",
        es: "¿Hay alguna solicitud que no soportes?"
      },
      answer: {
        pt: "Absolutamente. Eu não cubro o seguinte trabalho de design: modelagem 3D, gráficos animados (GIFS, etc.), design de documentos (formulações médicas, etc.), embalagens complexas, design de impressão extensa (revistas, livros, etc.) e documentos do Adobe InDesign.",
        en: "Absolutely. I don't cover the following design work: 3D modeling, animated graphics (GIFS, etc.), document design (medical formulations, etc.), complex packaging, extensive print design (magazines, books, etc.) and Adobe InDesign documents.",
        es: "Absolutamente. No cubro el siguiente trabajo de diseño: modelado 3D, gráficos animados (GIFS, etc.), diseño de documentos (formulaciones médicas, etc.), empaques complejos, diseño de impresión extenso (revistas, libros, etc.) y documentos de Adobe InDesign."
      },
      category: 'limitations'
    },
    {
      id: 5,
      question: {
        pt: "Há algum reembolso?",
        en: "Are there any refunds?",
        es: "¿Hay algún reembolso?"
      },
      answer: {
        pt: "Devido à natureza de alta qualidade do trabalho, não haverá reembolsos emitidos. No entanto, estou comprometido em garantir sua satisfação total através de revisões ilimitadas até que você esteja completamente feliz com o resultado final.",
        en: "Due to the high-quality nature of the work, no refunds will be issued. However, I am committed to ensuring your complete satisfaction through unlimited revisions until you are completely happy with the final result.",
        es: "Debido a la naturaleza de alta calidad del trabajo, no se emitirán reembolsos. Sin embargo, estoy comprometido a garantizar tu satisfacción completa a través de revisiones ilimitadas hasta que estés completamente feliz con el resultado final."
      },
      category: 'policy'
    }
  ];

  const categories = [
    { key: 'all', label: { pt: 'Todas', en: 'All', es: 'Todas' } },
    { key: 'timeline', label: { pt: 'Prazos', en: 'Timeline', es: 'Plazos' } },
    { key: 'process', label: { pt: 'Processo', en: 'Process', es: 'Proceso' } },
    { key: 'revisions', label: { pt: 'Revisões', en: 'Revisions', es: 'Revisiones' } },
    { key: 'limitations', label: { pt: 'Limitações', en: 'Limitations', es: 'Limitaciones' } },
    { key: 'policy', label: { pt: 'Política', en: 'Policy', es: 'Política' } }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow-reverse" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <span className="font-label text-blue-400 text-sm font-medium">
              {language === 'pt' ? 'Perguntas Frequentes' : language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
            </span>
          </div>
          <h2 className="font-section-title text-white text-4xl sm:text-5xl font-bold mb-4">
            {language === 'pt' ? 'FAQ' : language === 'en' ? 'FAQ' : 'FAQ'}
          </h2>
          <p className="font-text text-white/70 text-lg max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Encontre respostas para as perguntas mais comuns sobre meu trabalho e processo.'
              : language === 'en' 
              ? 'Find answers to the most common questions about my work and process.'
              : 'Encuentra respuestas a las preguntas más comunes sobre mi trabajo y proceso.'
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label[language]}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={`${faq.id}-${selectedCategory}`}
                className="mb-4 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.button
                  className="w-full p-6 text-left group"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 text-sm font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="font-label text-white/40 text-xs font-medium">
                          {categories.find(cat => cat.key === faq.category)?.label[language]}
                        </span>
                      </div>
                      <h3 className="font-body text-white text-lg sm:text-xl font-semibold leading-tight group-hover:text-blue-400 transition-colors duration-300">
                        {faq.question[language]}
                      </h3>
                    </div>
                    
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-600/30 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence mode="wait">
                        {openIndex === index ? (
                          <motion.div
                            key="minus"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Minus size={18} className="text-white/80" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="plus"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Plus size={18} className="text-white/80" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
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
                      <motion.div
                        className="px-6 pb-6"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="pt-4 border-t border-white/10">
                          <p className="font-text text-white/80 text-base">
                            {faq.answer[language]}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="mt-16 pt-12 border-t border-white/10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-green-400" />
              <h3 className="font-body text-white text-2xl font-bold">
                {language === 'pt' 
                  ? 'Ainda tem dúvidas?' 
                  : language === 'en' 
                  ? 'Still have questions?' 
                  : '¿Aún tienes dudas?'
                }
              </h3>
            </div>
            <p className="font-text text-white/70 text-lg mb-6">
              {language === 'pt' 
                ? 'Adoraria discutir seu projeto e explorar como podemos criar algo extraordinário juntos.'
                : language === 'en' 
                ? "I'd love to discuss your project and explore how we can create something extraordinary together."
                : 'Me encantaría discutir tu proyecto y explorar cómo podemos crear algo extraordinario juntos.'
              }
            </p>
            <motion.button
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-600/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {language === 'pt' 
                  ? 'Entre em Contato' 
                  : language === 'en' 
                  ? 'Get In Touch' 
                  : 'Ponte en Contacto'
                }
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;