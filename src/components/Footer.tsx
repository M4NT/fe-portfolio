import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com",
      label: "GitHub",
      color: "from-gray-600 to-gray-700"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/johndeveloper",
      label: "LinkedIn",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:john.developer@email.com",
      label: "Email",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative min-h-[400px] w-full bg-gradient-to-b from-black via-black to-black/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="font-inter text-3xl font-light text-white/90 tracking-wider">
              YAN.M
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Frontend Developer especializado em React, TypeScript e tecnologias web modernas. 
              Criando experiências digitais que fazem a diferença.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.color} opacity-80 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}>
                    {social.icon}
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 rounded-lg blur transition-opacity duration-300`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white/40 text-xs uppercase tracking-wider font-inter">
              Navegação
            </h3>
            <nav className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="flex items-center space-x-3 text-white/60 hover:text-white transition-all duration-300 group hover:translate-x-2 w-full text-left"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors duration-300" />
                  <span className="font-light group-hover:tracking-wider transition-all duration-300">
                    {item}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white/40 text-xs uppercase tracking-wider font-inter">
              Contato
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300 group">
                <p className="text-white/90 text-sm font-medium mb-1">
                  Vamos conversar?
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Entre em contato para discutirmos seu projeto ou ideia.
                </p>
                <a href="mailto:hello@yan-m.dev" 
                   className="flex items-center space-x-2 text-white/70 hover:text-white mt-3 group cursor-pointer">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs group-hover:tracking-wider transition-all duration-300">
                    hello@yan-m.dev
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-6 text-white/40 text-sm">
            <span>© {currentYear} YAN.M</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs">Sales-Optimized Experience</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-white/40 text-xs">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-white/40 hover:text-red-500 hover:fill-red-500 transition-colors duration-300" />
            <span>by Yan Miranda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;