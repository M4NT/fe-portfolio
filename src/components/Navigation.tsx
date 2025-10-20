import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Update active section based on scroll position
      const sections = ['works', 'about', 'services', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'works', label: 'Projetos', href: '#works' },
    { id: 'about', label: 'Sobre', href: '#about' },
    { id: 'services', label: 'Serviços', href: '#services' },
    { id: 'affiliates', label: 'Indique e ganhe', href: '#affiliates' },
    { id: 'contact', label: 'Contato', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/yan-m",
      label: "GitHub",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/yan-m",
      label: "LinkedIn",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/yan.m",
      label: "Instagram",
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hello@yan-m.dev",
      label: "Email",
      color: "from-violet-600 to-indigo-600"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // approximate navbar height
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = rect.top + scrollTop - headerOffset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-white/10"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 max-w-7xl mx-auto w-full">
            {/* Logo */}
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('home')}
            >
              <motion.h1 
                className="font-display text-2xl lg:text-3xl text-white tracking-wider"
                animate={{ 
                  textShadow: isScrolled 
                    ? 'none' 
                    : ['0 0 20px rgba(59,130,246,0.3)', '0 0 30px rgba(147,51,234,0.4)', '0 0 20px rgba(59,130,246,0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                YAN<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">.M</span>
              </motion.h1>
              {/* Subtle underline effect */}
              <motion.div
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Navigation Links */}
              <div className="flex items-center gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -1 }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.a
                href="https://wa.me/5516992233365?text=Opa%20Yan!%0AVim%20atrav%C3%A9s%20do%20site%20do%20seu%20portf%C3%B3lio.%0ATenho%20interesse%20em%20um%20projeto%20e%20gostaria%20de%20conversar%20sobre%20como%20podemos%20trabalhar%20juntos!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Falar no WhatsApp</span>
                <ExternalLink size={14} />
              </motion.a>

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <LanguageSelector />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* WhatsApp CTA Mobile */}
              <motion.a
                href="https://wa.me/5516992233365?text=Opa%20Yan!%0AVim%20atrav%C3%A9s%20do%20site%20do%20seu%20portf%C3%B3lio.%0ATenho%20interesse%20em%20um%20projeto%20e%20gostaria%20de%20conversar%20sobre%20como%20podemos%20trabalhar%20juntos!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>WhatsApp</span>
              </motion.a>

              {/* Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={18} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={18} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              id="mobile-menu"
              className="absolute top-20 left-6 right-6 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              role="menu"
              aria-label="Menu de navegação mobile"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'bg-white/10 border border-white/20 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.a
                  href="https://wa.me/5516992233365?text=Opa%20Yan!%0AVim%20atrav%C3%A9s%20do%20site%20do%20seu%20portf%C3%B3lio.%0ATenho%20interesse%20em%20um%20projeto%20e%20gostaria%20de%20conversar%20sobre%20como%20podemos%20trabalhar%20juntos!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Falar no WhatsApp</span>
                  <ExternalLink size={16} />
                </motion.a>

                {/* Social Links */}
                <motion.div
                  className="pt-6 mt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white/40 text-xs uppercase tracking-wider font-medium mb-4 text-center">
                    Connect
                  </p>
                  <div className="flex items-center justify-center space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative group w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30 rounded-xl blur-md transition-opacity duration-300`} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navigation);