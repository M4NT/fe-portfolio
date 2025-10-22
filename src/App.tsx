import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SelectedWorks from './components/SelectedWorks';
import SectionDivider from './components/SectionDivider';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import InstallPWA from './components/InstallPWA';

// Import pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiePolicy from './pages/CookiePolicy';

// Import Analytics
import { trackPageView } from './lib/analytics-ga4';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
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
          {/* Language-prefixed routes for EN/ES */}
          <Route path=":lang(en|es)" element={
            <>
              <Hero />
              <SectionDivider />
              <SelectedWorks />
              <SectionDivider />
              <About />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <PaymentTerms />
              <SectionDivider />
              <Contact />
              <SectionDivider />
              <FAQ />
              <Footer />
            </>
          } />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* Blog */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
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
      <Router>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;