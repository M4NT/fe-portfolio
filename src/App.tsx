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
    }, 4000);

    // Advanced intersection observer for skill demonstrations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Add skill demonstration effects
            const skillElements = entry.target.querySelectorAll('[data-skill]');
            skillElements.forEach((skillEl, index) => {
              (skillEl as HTMLElement).style.setProperty('--delay', `${index * 0.2}s`);
              (skillEl as HTMLElement).style.setProperty('--duration', '3s');
              skillEl.classList.add('skill-demo');
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    // Enhanced performance monitoring
    const observedElements = document.querySelectorAll('[data-animate]');
    observedElements.forEach((el) => observer.observe(el));

    // Revolutionary scroll-based section morphing
    let currentSection = 'home';
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = ['home', 'works', 'projects', 'about', 'services', 'contact'];
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4;
          
          if (isVisible && currentSection !== sectionId) {
            currentSection = sectionId;
            // Trigger section transition effects
            document.body.className = `section-${sectionId}`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Preloader visible={loading} />
      <div className={`relative bg-black text-white${loading ? ' pointer-events-none select-none' : ''}`} style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <CustomCursor />
        <Navigation />
        {/* Global floating chat button */}
        <AISalesChat />
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