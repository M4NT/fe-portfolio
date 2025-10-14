import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import SideProjects from './components/SideProjects';
import About from './components/About';
import Services from './components/Services';
import PaymentTerms from './components/PaymentTerms';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import AISalesChat from './components/AISalesChat';


export const AppContent = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Configuração de scroll único e fluido
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Reduzido de 4s para 1.5s para melhorar LCP

    // IntersectionObserver otimizado para scroll fluido
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Add skill demonstration effects - apenas uma vez
            if (!entry.target.getAttribute('data-animated')) {
              const skillElements = entry.target.querySelectorAll('[data-skill]');
              skillElements.forEach((skillEl, index) => {
                (skillEl as HTMLElement).style.setProperty('--delay', `${index * 0.2}s`);
                (skillEl as HTMLElement).style.setProperty('--duration', '3s');
                skillEl.classList.add('skill-demo');
              });
              entry.target.setAttribute('data-animated', 'true');
              
              // Unobserve após animar para economizar recursos
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { 
        threshold: 0.05, // Reduzido para disparar mais cedo
        rootMargin: '50px 0px 50px 0px' // Maior margem para animações mais suaves
      }
    );

    // Enhanced performance monitoring
    const observedElements = document.querySelectorAll('[data-animate]');
    observedElements.forEach((el) => observer.observe(el));

    // Section tracking otimizado - apenas para navegação, sem efeitos visuais pesados
    let currentSection = 'home';
    let ticking = false;
    let lastScrollTime = 0;
    const scrollThrottle = 150; // Aumentado para 150ms para performance
    
    const updateSection = () => {
      const now = performance.now();
      if (now - lastScrollTime < scrollThrottle) {
        ticking = false;
        return;
      }
      
      lastScrollTime = now;
      const windowHeight = window.innerHeight;
      const sections = ['home', 'works', 'projects', 'about', 'services', 'contact', 'faq'];
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4;
          
          if (isVisible && currentSection !== sectionId) {
            currentSection = sectionId;
            // Atualiza classe apenas se mudou de seção
            document.body.className = `section-${sectionId}`;
          }
        }
      });
      
      ticking = false;
    };
    
    const handleScroll = () => {
      // Throttle usando requestAnimationFrame + time-based
      if (!ticking) {
        requestAnimationFrame(updateSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateSection(); // Initial call

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Preloader visible={loading} />
      {/* Cursor e Chat sempre visíveis e fora do container principal */}
      <CustomCursor />
      {!loading && <AISalesChat />}
      <div 
        className={`relative bg-black text-white${loading ? ' pointer-events-none select-none' : ''}`} 
        style={{ 
          opacity: loading ? 0 : 1, 
          transition: 'opacity 0.5s',
          minHeight: '100vh' // Previne CLS
        }}
      >
        <Navigation />
        <main className="relative">
          <div className="relative">
            <Hero />
          </div>
          <div className="relative">
            <SelectedWorks />
          </div>
          <div className="relative">
            <SideProjects />
          </div>
          <div className="relative" data-animate>
            <About />
          </div>
          <div className="relative" data-animate>
            <Services />
          </div>
          <div className="relative" data-animate>
            <PaymentTerms />
          </div>
          <div className="relative" data-animate>
            <Contact />
          </div>
          
          {/* FAQ Section */}
          <div className="relative" data-animate>
            <FAQ />
          </div>
        </main>
      </div>
    </>
  );
};

export const App = (): JSX.Element => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;