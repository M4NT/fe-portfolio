import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, Language } from './LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const computeMenuPos = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  };

  // Open/close with immediate position computation
  const toggleOpen = () => {
    if (!isOpen) computeMenuPos();
    setIsOpen((v) => !v);
  };

  // Update position on resize/scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onUpdate = () => computeMenuPos();
    window.addEventListener('resize', onUpdate, { passive: true });
    window.addEventListener('scroll', onUpdate, { passive: true });
    onUpdate();
    return () => {
      window.removeEventListener('resize', onUpdate);
      window.removeEventListener('scroll', onUpdate);
    };
  }, [isOpen]);

  // Close on outside click / ESC
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <div className="relative">
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
        {isOpen && menuPos && createPortal(
          <motion.div
            className="fixed z-[2147483000] min-w-[220px] glass border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl origin-top-right bg-black/90 text-white shadow-xl"
            style={{ top: menuPos.top, right: menuPos.right }}
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.15, ease: [0.23,1,0.32,1] }}
          >
            <div className="max-h-[60vh] overflow-auto">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-200 ${
                    language === lang.code
                      ? 'bg-white/10 text-white'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.12 }}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {language === lang.code && (
                    <motion.span
                      className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 border border-white/10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>, document.body)
        }
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;