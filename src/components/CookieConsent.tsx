import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Shield, CheckCircle } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Sempre true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Verifica se já tem consentimento salvo
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Mostra banner após 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    savePreferences(allAccepted);
  };

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    savePreferences(onlyNecessary);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    
    // Aqui você pode inicializar scripts baseado nas preferências
    if (prefs.analytics) {
      // Inicializar Google Analytics, etc
      console.log('✅ Analytics habilitado');
    }
    if (prefs.marketing) {
      // Inicializar Facebook Pixel, etc
      console.log('✅ Marketing habilitado');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Não pode desabilitar necessários
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {!showSettings ? (
                // Main Banner
                <div className="p-6 sm:p-8 relative">
                  {/* Close Button */}
                  <button
                    onClick={rejectAll}
                    className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
                    aria-label="Fechar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    {/* Icon & Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Cookie className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-2">
                            🍪 Este site usa cookies
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed">
                            Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                            Ao clicar em "Aceitar Todos", você concorda com o uso de TODOS os cookies.
                          </p>
                        </div>
                      </div>
                      
                      {/* Privacy Link */}
                      <a
                        href="/privacy-policy"
                        className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                        aria-label="Ler Política de Privacidade completa"
                      >
                        Política de Privacidade
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm font-medium">Configurar</span>
                      </button>
                      <button
                        onClick={acceptAll}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Aceitar Todos</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Settings Panel
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Preferências de Cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-white/60 hover:text-white transition-colors"
                      aria-label="Fechar configurações"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-white font-medium">Cookies Necessários</span>
                        </div>
                        <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                          Sempre Ativo
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">
                        Essenciais para o funcionamento do site. Incluem preferências de idioma, sessão e segurança.
                      </p>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">Cookies de Análise</span>
                        </div>
                        <button
                          onClick={() => togglePreference('analytics')}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.analytics ? 'bg-blue-600' : 'bg-white/20'
                          }`}
                          aria-label="Toggle analytics cookies"
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{
                              x: preferences.analytics ? 24 : 0
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                      <p className="text-white/60 text-sm">
                        Nos ajudam a entender como os visitantes interagem com o site. Vercel Analytics e métricas de performance.
                      </p>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">Cookies de Marketing</span>
                        </div>
                        <button
                          onClick={() => togglePreference('marketing')}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.marketing ? 'bg-purple-600' : 'bg-white/20'
                          }`}
                          aria-label="Toggle marketing cookies"
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                            animate={{
                              x: preferences.marketing ? 24 : 0
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                      <p className="text-white/60 text-sm">
                        Usados para rastrear visitantes em sites e exibir anúncios relevantes. Atualmente não utilizados.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={rejectAll}
                      className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all"
                    >
                      Rejeitar Todos
                    </button>
                    <button
                      onClick={saveCustomPreferences}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                    >
                      Salvar Preferências
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

