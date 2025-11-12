import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PaymentTerms from './components/PaymentTerms';
import Affiliates from './components/Affiliates';
import Process from './components/Process';
import LatestPosts from './components/LatestPosts';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SelectedWorks from './components/SelectedWorks';
import SectionDivider from './components/SectionDivider';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import InstallPWA from './components/InstallPWA';

// Import direto para SSR funcionar corretamente
// Lazy loading não funciona bem com renderToString (SSR)
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiePolicy from './pages/CookiePolicy';

// Import Analytics - DESABILITADO TEMPORARIAMENTE
// import { trackPageView } from './lib/analytics-ga4';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Track page views - DESABILITADO TEMPORARIAMENTE
  // useEffect(() => {
  //   trackPageView(location.pathname + location.search);
  // }, [location]);

  useEffect(() => {
    // Não executar no servidor
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // Force scroll to top and clear URL hash on load/reload
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Simula carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de preloader

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader visible={isLoading} />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {!isLoading && <ScrollProgress />}
        {!isLoading && <Navigation />}
        
        <Routes>
          {/* Main Portfolio Route */}
          <Route path="/" element={
            <>
              <Hero />
              <main id="main-content">
                <SectionDivider />
              <SelectedWorks />
              <SectionDivider />
              <About />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <Affiliates />
              <SectionDivider />
              <Process />
              <SectionDivider />
              <PaymentTerms />
              <SectionDivider />
              <LatestPosts />
              <Contact />
              <SectionDivider />
              <FAQ />
              <Footer />
              </main>
            </>
          } />
          
          {/* Rotas /en e /es - Retornam homepage SEM redirecionamento para evitar erro no Google */}
          <Route path="/en" element={
            <>
              <Hero />
              <main id="main-content">
                <SectionDivider />
              <SelectedWorks />
              <SectionDivider />
              <About />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <Affiliates />
              <SectionDivider />
              <Process />
              <SectionDivider />
              <PaymentTerms />
              <SectionDivider />
              <LatestPosts />
              <Contact />
              <SectionDivider />
              <FAQ />
              <Footer />
              </main>
            </>
          } />
          <Route path="/es" element={
            <>
              <Hero />
              <main id="main-content">
                <SectionDivider />
              <SelectedWorks />
              <SectionDivider />
              <About />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <Affiliates />
              <SectionDivider />
              <Process />
              <SectionDivider />
              <PaymentTerms />
              <SectionDivider />
              <LatestPosts />
              <Contact />
              <SectionDivider />
              <FAQ />
              <Footer />
              </main>
            </>
          } />
          
          {/* Legal Pages - Import direto para SSR funcionar */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* Blog - Import direto para SSR funcionar */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Fallback para qualquer rota não encontrada - retorna 404 mas sem redirecionamento */}
          <Route path="*" element={
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-gray-400 mb-6">Página não encontrada</p>
                <a href="/" className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Voltar para Home
                </a>
              </div>
            </div>
          } />
        </Routes>
        
        {!isLoading && <BackToTop />}
        {!isLoading && <CookieConsent />}
        {!isLoading && <InstallPWA />}
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;