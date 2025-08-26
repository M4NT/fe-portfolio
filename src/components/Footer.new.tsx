import { ArrowUpRight, MapPin, Clock, Globe, Star, Zap, Mail, Code, Coffee } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: 'Trabalhos', href: '#works', icon: <Star className="w-4 h-4" /> },
    { name: 'Sobre', href: '#about', icon: <Code className="w-4 h-4" /> },
    { name: 'Serviços', href: '#services', icon: <Zap className="w-4 h-4" /> },
    { name: 'Contato', href: '#contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', color: 'from-blue-500 to-blue-600' },
    { name: 'GitHub', href: '#', color: 'from-gray-600 to-gray-700' },
    { name: 'Behance', href: '#', color: 'from-blue-600 to-purple-600' },
    { name: 'Instagram', href: '#', color: 'from-pink-500 to-orange-500' }
  ];

  const techStack = [
    'React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'
  ];

  return (
    <footer 
      className="relative min-h-[500px] w-full bg-gradient-to-b from-black via-black to-black/90 border-t border-white/10 pt-20 pb-8 overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/6 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl bg-gradient-to-r from-blue-500/40 to-purple-500/40"
        />

        <div 
          className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl bg-gradient-to-r from-green-500/40 to-blue-500/40"
        />

        {/* Premium Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.01] hidden lg:block bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100px_100px]">
          <div className="w-full h-full" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/3 right-1/4 text-white/5 hidden xl:block animate-float">
          <Code className="w-16 h-16" />
        </div>

        <div className="absolute bottom-1/3 left-1/4 text-white/5 hidden xl:block animate-float-delayed">
          <Coffee className="w-12 h-12" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Section */}
        <div className="py-12 sm:py-16 border-b border-white/10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-8 opacity-0 animate-fadeIn">
              {/* Logo & Tagline */}
              <div className="space-y-6">
                <div className="group cursor-pointer transform hover:scale-102 transition-all duration-300">
                  <h3 className="font-inter font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider relative">
                    <span className="relative z-10">YAN.M</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
                  </h3>
                </div>

                <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-md">
                  <span className="text-white/90 font-medium">Frontend Developer</span> criando experiências digitais revolucionárias para negócios sérios.
                </p>

                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full relative animate-pulse">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    Disponível para projetos qualificados
                  </span>
                </div>
              </div>

              {/* Location & Contact */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <div className="text-white/80 font-medium">
                      {t('location.city')}, {t('location.state')}
                    </div>
                    <div className="text-white/60 text-sm">
                      {t('location.country')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-white/40 flex-shrink-0" />
                  <span className="text-white/60 text-sm">
                    {t('location.timezone')}
                  </span>
                </div>

                <a href="mailto:hello@yan-m.dev"
                  className="flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-300 group hover:translate-x-1">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    hello@yan-m.dev
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-6 opacity-0 animate-fadeIn animation-delay-200">
              <h4 className="text-white/40 text-xs uppercase tracking-wider font-inter">
                Navegação
              </h4>
              
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a key={link.name}
                    href={link.href}
                    className="flex items-center space-x-3 text-white/60 hover:text-white transition-all duration-300 group hover:translate-x-2"
                    style={{animationDelay: `${index * 100}ms`}}>
                    <div className="flex-shrink-0 p-1.5 rounded bg-white/5 group-hover:bg-white/10 transition-all duration-300 transform group-hover:scale-110">
                      {link.icon}
                    </div>
                    <span className="group-hover:tracking-wider transition-all duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Tech Stack & Social */}
            <div className="lg:col-span-4 space-y-8 opacity-0 animate-fadeIn animation-delay-400">
              {/* Tech Stack */}
              <div className="space-y-4">
                <h4 className="text-white/40 text-xs uppercase tracking-wider font-inter">
                  Stack Tecnológico
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <div key={tech}
                      className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 text-xs hover:bg-white/10 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                      style={{animationDelay: `${index * 50}ms`}}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-white/40 text-xs uppercase tracking-wider font-inter">
                  Conecte-se
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a key={social.name}
                      href={social.href}
                      className="relative group transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                      style={{animationDelay: `${index * 100}ms`}}>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                        <span className="text-white text-xs font-medium">
                          {social.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 rounded-lg blur transition-opacity duration-300`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 animate-pulse" />
                  <div>
                    <h5 className="text-white font-medium text-sm mb-1">
                      Pronto para começar?
                    </h5>
                    <p className="text-white/60 text-xs leading-relaxed">
                      YAN.AI irá pré-qualificar seu projeto e explicar nossa metodologia antes do contato direto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 opacity-0 animate-fadeIn animation-delay-600">
          <div className="flex items-center space-x-6 text-white/40 text-sm">
            <span>© 2025 YAN.M</span>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Sales-Optimized Experience</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white/40 text-xs">
              <span>Powered by AI</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <ArrowUpRight className="w-4 h-4 rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
