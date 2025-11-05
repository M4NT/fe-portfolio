// import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, Instagram, MapPin, Clock, ExternalLink, Sparkles } from 'lucide-react';
import { trackSocialClick, trackCTAClick } from '../lib/analytics';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/M4NT",
      label: "GitHub",
      color: "from-gray-600 to-gray-800",
      username: "@M4NT"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/yan-mantovani/",
      label: "LinkedIn",
      color: "from-blue-500 to-blue-700",
      username: "/yan-mantovani"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/yan.mantovani",
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
      username: "@yan.mantovani"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hi@yanmantovani.com",
      label: "Email",
      color: "from-violet-600 to-indigo-600",
      username: "hi@yanmantovani.com"
    }
  ];

  const navigationLinks = [
    { id: 'works', label: 'Trabalhos', href: '/#works' },
    { id: 'about', label: 'Sobre', href: '/#about' },
    { id: 'services', label: 'Serviços', href: '/#services' },
    { id: 'affiliates', label: 'Quem Indica', href: '/#affiliates' },
    { id: 'contact', label: 'Contato', href: '/#contact' },
    { id: 'blog', label: 'Blog', href: '/blog' }
  ];


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      trackCTAClick(`footer_nav_${sectionId}`, 'footer', `#${sectionId}`);
    }
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="font-section-title text-4xl text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              YAN.M
                </span>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-2 rounded-full" />
            </div>

              {/* Description */}
              <p className="font-text text-white/70 text-base max-w-md">
                Frontend Developer & Digital Artist criando experiências web imersivas e performáticas. 
                Especializado em React, TypeScript, WebGL e design de interfaces modernas.
              </p>

              {/* Location & Availability */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 text-sm mt-4">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Monte Alto, SP - Brasil</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Disponível para projetos
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 pt-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                  href={social.href}
                    onClick={() => trackSocialClick(social.label.toLowerCase(), 'footer')}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="group relative"
                  aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                    {social.icon}
                  </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30 rounded-xl blur-md transition-opacity`} />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black border border-white/20 rounded-lg text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {social.username}
                    </div>
                  </motion.a>
              ))}
            </div>
            </motion.div>
          </div>

          {/* Navigation Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-label text-white/40 text-xs font-medium">
              Navegação
            </h3>
            <nav className="space-y-3" itemScope itemType="https://schema.org/SiteNavigationElement">
              {navigationLinks.map((item) => (
                item.href === '/blog' ? (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300 group w-full text-left"
                    aria-label={`Ir para ${item.label}`}
                    itemProp="url"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300" />
                    <span className="font-light text-sm group-hover:translate-x-1 transition-transform duration-300" itemProp="name">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300 group w-full text-left"
                    aria-label={`Ir para seção ${item.label}`}
                    itemProp="url"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300" />
                    <span className="font-light text-sm group-hover:translate-x-1 transition-transform duration-300" itemProp="name">
                      {item.label}
                    </span>
                  </a>
                )
              ))}
            </nav>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-label text-white/40 text-xs font-medium">
              Contato
            </h3>
            <div className="space-y-4">
              {/* Email Card */}
              <motion.a
                href="mailto:hi@yanmantovani.com"
                onClick={() => trackCTAClick('email', 'footer', 'mailto:hi@yanmantovani.com')}
                className="block p-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all group"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email</span>
                </div>
                <p className="text-white/60 text-xs">
                  hi@yanmantovani.com
                </p>
              </motion.a>

              {/* WhatsApp Card */}
              <motion.a
                href="https://wa.me/5516992233365?text=Opa%20Yan!%0AVim%20atrav%C3%A9s%20do%20site%20do%20seu%20portf%C3%B3lio.%0ATenho%20interesse%20em%20um%20projeto%20e%20gostaria%20de%20conversar%20sobre%20como%20podemos%20trabalhar%20juntos!"
                onClick={() => trackCTAClick('whatsapp', 'footer', 'https://wa.me/5516992233365')}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-xl hover:border-green-500/40 transition-all group"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                  <ExternalLink className="w-4 h-4 text-green-400" />
                  <span>WhatsApp</span>
                </div>
                <p className="text-white/60 text-xs">
                  Resposta rápida
                </p>
              </motion.a>
              </div>
          </motion.div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/40 text-sm">
            <span>© {currentYear} Yan.M</span>
            <div className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-xs">Todos os direitos reservados</span>
            </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>Desenvolvido com</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>por</span>
            <span className="text-white/60 font-medium">Yan Mantovani</span>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-white/50 text-xs">
              React + TypeScript + Tailwind
            </span>
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6 text-white/30 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/privacy-policy" 
            className="hover:text-white/60 transition-colors"
            aria-label="Ler Política de Privacidade completa"
          >
            Política de Privacidade
          </Link>
          <span>•</span>
          <Link 
            to="/terms-of-use" 
            className="hover:text-white/60 transition-colors"
            aria-label="Ler Termos de Uso completos"
          >
            Termos de Uso
          </Link>
          <span>•</span>
          <Link 
            to="/cookie-policy" 
            className="hover:text-white/60 transition-colors"
            aria-label="Ler Política de Cookies completa"
          >
            Política de Cookies
          </Link>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;