import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, Language } from './LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  // Open/close
  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle clicked, current isOpen:', isOpen);
    setIsOpen((v) => {
      console.log('Setting isOpen to:', !v);
      return !v;
    });
  };

  // Close on outside click / ESC
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const dropdown = document.querySelector('[data-language-dropdown]');
      
      if (buttonRef.current && !buttonRef.current.contains(target) && 
          (!dropdown || !dropdown.contains(target))) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') setIsOpen(false); 
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" style={{ zIndex: 9999 }}>
      <motion.button
        ref={buttonRef}
        onClick={toggleOpen}
        className="glass rounded-full pl-3 pr-2 py-2 flex items-center gap-2 border border-white/10 hover:bg-white/10"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-2 py-1">
          <Globe size={14} className="text-white" />
          <span className="text-[12px] uppercase tracking-wider text-white/90">{currentLanguage?.code}</span>
        </span>
        <span className="hidden xl:inline text-white/85 text-sm whitespace-nowrap">{currentLanguage?.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-white/70" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && createPortal(
          <motion.div
            data-language-dropdown
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-[9999] min-w-[220px] glass border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl bg-black/90 text-white shadow-xl pointer-events-auto"
            style={{
              top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
              left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left : 0,
            }}
          >
            <div className="max-h-[60vh] overflow-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={(e) => handleLanguageChange(lang.code, e)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-200 ${
                    language === lang.code
                      ? 'bg-white/10 text-white'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 border border-white/10">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>, 
          document.body
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;