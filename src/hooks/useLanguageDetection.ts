import { useEffect, useState } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface LanguageDetectionResult {
  detectedLanguage: Language;
  browserLanguage: string;
  isAutoDetected: boolean;
}

/**
 * Hook para detectar automaticamente o idioma do usuário
 * Baseado em:
 * 1. URL path (/en, /es, /pt)
 * 2. LocalStorage (preferência salva)
 * 3. Navigator language (idioma do navegador)
 * 4. Fallback para português
 */
export const useLanguageDetection = (): LanguageDetectionResult => {
  const [detectedLanguage, setDetectedLanguage] = useState<Language>('pt');
  const [browserLanguage, setBrowserLanguage] = useState<string>('');
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    const detectLanguage = (): Language => {
      // 1. Verifica URL path
      const path = window.location.pathname;
      const urlLang = path.split('/')[1];
      
      if (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') {
        setIsAutoDetected(false);
        return urlLang;
      }

      // 2. Verifica localStorage
      const savedLang = localStorage.getItem('preferred-language') as Language;
      if (savedLang && ['pt', 'en', 'es'].includes(savedLang)) {
        setIsAutoDetected(false);
        return savedLang;
      }

      // 3. Detecta idioma do navegador
      const browserLang = navigator.language || (navigator as any).userLanguage || 'pt-BR';
      setBrowserLanguage(browserLang);

      // Mapeia códigos de idioma do navegador
      const langMap: { [key: string]: Language } = {
        'pt': 'pt',
        'pt-BR': 'pt',
        'pt-PT': 'pt',
        'en': 'en',
        'en-US': 'en',
        'en-GB': 'en',
        'es': 'es',
        'es-ES': 'es',
        'es-MX': 'es',
        'es-AR': 'es'
      };

      const detected = langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'pt';
      setIsAutoDetected(true);
      return detected;
    };

    const lang = detectLanguage();
    setDetectedLanguage(lang);

    // Salva no localStorage
    localStorage.setItem('preferred-language', lang);
  }, []);

  return {
    detectedLanguage,
    browserLanguage,
    isAutoDetected
  };
};

/**
 * Função para atualizar a URL com o idioma
 */
export const updateURLWithLanguage = (language: Language) => {
  const currentPath = window.location.pathname;
  const currentLang = currentPath.split('/')[1];
  
  // Remove idioma atual da URL se existir
  let newPath = currentPath;
  if (['pt', 'en', 'es'].includes(currentLang)) {
    newPath = currentPath.replace(`/${currentLang}`, '');
  }
  
  // Adiciona novo idioma (exceto para português que é o padrão)
  if (language !== 'pt') {
    newPath = `/${language}${newPath || '/'}`;
  }
  
  // Atualiza URL sem recarregar a página
  window.history.pushState({}, '', newPath);
  
  // Salva preferência
  localStorage.setItem('preferred-language', language);
};

/**
 * Função para obter o idioma atual da URL
 */
export const getLanguageFromURL = (): Language => {
  const path = window.location.pathname;
  const urlLang = path.split('/')[1];
  
  if (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') {
    return urlLang;
  }
  
  return 'pt'; // default
};

export default useLanguageDetection;

