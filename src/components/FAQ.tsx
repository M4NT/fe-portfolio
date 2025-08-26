import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What's your approach to creating award-winning digital experiences?",
      answer: "My approach combines cutting-edge technology with human-centered design. I start by understanding the user's emotional journey, then craft experiences that surprise and delight through thoughtful interactions, performance optimization, and attention to the smallest details. Every project is an opportunity to push boundaries and create something truly memorable."
    },
    {
      id: 2,
      question: "Which technologies do you specialize in for frontend development?",
      answer: "I specialize in React, Next.js, TypeScript, and Three.js for immersive 3D experiences. For animations, I use Framer Motion and GSAP. I'm also proficient in WebGL, Web Audio API, and WebXR for cutting-edge web experiences. My focus is always on performance, accessibility, and creating smooth, delightful user interactions."
    },
    {
      id: 3,
      question: "How do you ensure your projects perform well and rank on awards sites?",
      answer: "Performance is built into every layer of my development process. I use modern optimization techniques like code splitting, lazy loading, and advanced caching strategies. For awards sites like Awwwards, I focus on unique interactions, innovative use of technology, and creating experiences that showcase the future of web development while maintaining perfect performance scores."
    },
    {
      id: 4,
      question: "What's your process for collaborative projects and client communication?",
      answer: "I believe in transparent, iterative collaboration. I use design systems, regular check-ins, and interactive prototypes to ensure alignment throughout the project. I document everything, provide regular updates, and always keep the end user's experience at the center of every decision we make together."
    },
    {
      id: 5,
      question: "How do you stay current with rapidly evolving web technologies?",
      answer: "I'm constantly experimenting with emerging technologies and contributing to open source projects. I follow industry leaders, participate in developer communities, and regularly attend conferences. I also maintain side projects specifically for testing new technologies and techniques before integrating them into client work."
    },
    {
      id: 6,
      question: "What makes your work stand out in the competitive frontend landscape?",
      answer: "My unique combination of technical expertise and artistic vision allows me to create experiences that are both technically impressive and emotionally resonant. I don't just build websites – I craft digital experiences that tell stories, evoke emotions, and push the boundaries of what's possible on the web."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-32 bg-black">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
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
            Questions — Frequently Asked
          </motion.div>
          <h2 className="font-inter font-light text-6xl lg:text-8xl leading-none tracking-[-0.03em] text-white">
            FAQ
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl">
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
                      <motion.div
                        key="minus"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Minus size={20} className="text-white/60" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
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
                    <motion.div
                      className="pb-8 pl-16"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      exit={{ y: -20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
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

        {/* Contact CTA */}
        <motion.div 
          className="mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="font-inter font-light text-3xl text-white mb-6">
              Still have questions?
            </h3>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              I'd love to discuss your project and explore how we can create 
              something extraordinary together.
            </p>
            <motion.button
              className="group relative overflow-hidden border border-white/20 px-8 py-4 font-inter text-sm uppercase tracking-wider text-white hover:border-white/40 transition-colors duration-300 magnetic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Get In Touch
              </span>
              <motion.div
                className="absolute inset-0 bg-white origin-left"
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