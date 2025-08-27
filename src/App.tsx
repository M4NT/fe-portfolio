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
import { SpeedInsights } from "@vercel/speed-insights/react";

export const AppContent = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Revolutionary smooth scrolling with advanced easing
    document.documentElement.style.scrollBehavior = 'smooth';

    // Removido efeito magnético para melhorar a movimentação do cursor

    // Removido efeito de elementos flutuantes para melhorar a performance do cursor

    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'unset';
    }, 4000); // agora 4 segundos

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
      <div className={`relative bg-black text-white overflow-x-hidden${loading ? ' pointer-events-none select-none' : ''}`} style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <CustomCursor />
        <Navigation />
        {/* Global floating chat button */}
        <AISalesChat />
        <main className="relative">
          <div className="relative">
            <Hero />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(10,10,10,0.8) 100%)' }} />
          </div>
          <div className="relative">
            <SelectedWorks />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.3) 50%, rgba(15,15,15,0.8) 100%)' }} />
          </div>
          <div className="relative">
            <SideProjects />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.3) 50%, rgba(20,20,20,0.8) 100%)' }} />
          </div>
          <div className="relative" data-animate>
            <About />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.3) 50%, rgba(20,20,20,0.8) 100%)' }} />
          </div>
          <div className="relative" data-animate>
            <Services />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.3) 50%, rgba(20,20,20,0.8) 100%)' }} />
          </div>
          <div className="relative" data-animate>
            <PaymentTerms />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.3) 50%, rgba(20,20,20,0.8) 100%)' }} />
          </div>
          <div className="relative" data-animate>
            <Contact />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,15,0.3) 50%, rgba(20,20,20,0.8) 100%)' }} />
          </div>
        </main>
        {/* <footer className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-t from-black via-gray-900/40 to-transparent border-t border-white/5 overflow-hidden modal-stage">

        </footer> */}
        <SpeedInsights />
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