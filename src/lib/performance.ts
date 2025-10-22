import { trackTiming } from './analytics-ga4';

// Core Web Vitals
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          const lcp = lastEntry.renderTime || lastEntry.loadTime;
          trackTiming('LCP', Math.round(lcp), 'Web Vitals');
          console.log('🎨 LCP:', Math.round(lcp), 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('LCP observation failed:', e);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          trackTiming('FID', Math.round(fid), 'Web Vitals');
          console.log('⚡ FID:', Math.round(fid), 'ms');
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('FID observation failed:', e);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Report CLS on page hide
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          trackTiming('CLS', Math.round(clsValue * 1000), 'Web Vitals');
          console.log('📐 CLS:', clsValue.toFixed(3));
        }
      });
    } catch (e) {
      console.error('CLS observation failed:', e);
    }
  }

  // Time to First Byte (TTFB)
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as any;
      if (navigationTiming) {
        const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
        trackTiming('TTFB', Math.round(ttfb), 'Web Vitals');
        console.log('🚀 TTFB:', Math.round(ttfb), 'ms');
      }
    });
  }

  // First Contentful Paint (FCP)
  if ('PerformanceObserver' in window) {
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries[0] as any;
        if (fcpEntry) {
          trackTiming('FCP', Math.round(fcpEntry.startTime), 'Web Vitals');
          console.log('🖼️ FCP:', Math.round(fcpEntry.startTime), 'ms');
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.error('FCP observation failed:', e);
    }
  }
};

// Monitorar recursos lentos
export const monitorSlowResources = (threshold: number = 1000) => {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach((resource) => {
      if (resource.duration > threshold) {
        console.warn('⚠️ Slow resource:', {
          name: resource.name,
          duration: Math.round(resource.duration),
          type: resource.initiatorType
        });
        
        trackTiming(
          `Slow Resource: ${resource.initiatorType}`,
          Math.round(resource.duration),
          'Performance Issues'
        );
      }
    });
  });
};

// Monitorar memória (Chrome only)
export const monitorMemory = () => {
  if (typeof window === 'undefined') return;

  const performance = window.performance as any;
  if (performance.memory) {
    setInterval(() => {
      const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
      const usagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;
      
      if (usagePercent > 90) {
        console.warn('⚠️ High memory usage:', usagePercent.toFixed(2) + '%');
      }
      
      console.log('💾 Memory:', {
        used: (usedJSHeapSize / 1048576).toFixed(2) + ' MB',
        total: (totalJSHeapSize / 1048576).toFixed(2) + ' MB',
        limit: (jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
      });
    }, 30000); // A cada 30 segundos
  }
};

// Network Information (connection speed)
export const getNetworkInfo = () => {
  if (typeof window === 'undefined') return null;

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType, // '4g', '3g', etc
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // Round trip time
      saveData: connection.saveData // Data saver enabled
    };
  }
  
  return null;
};

// Device information
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') return null;

  return {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    isTablet: /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent),
    isDesktop: !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    screenSize: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio
  };
};

// Log performance summary
export const logPerformanceSummary = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as any;
      
      console.group('📊 Performance Summary');
      console.log('DNS Lookup:', Math.round(perfData.domainLookupEnd - perfData.domainLookupStart), 'ms');
      console.log('TCP Connection:', Math.round(perfData.connectEnd - perfData.connectStart), 'ms');
      console.log('Request:', Math.round(perfData.responseStart - perfData.requestStart), 'ms');
      console.log('Response:', Math.round(perfData.responseEnd - perfData.responseStart), 'ms');
      console.log('DOM Processing:', Math.round(perfData.domComplete - perfData.domLoading), 'ms');
      console.log('Load Complete:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
      console.groupEnd();

      const networkInfo = getNetworkInfo();
      if (networkInfo) {
        console.log('🌐 Network:', networkInfo);
      }

      const deviceInfo = getDeviceInfo();
      if (deviceInfo) {
        console.log('📱 Device:', deviceInfo);
      }
    }, 0);
  });
};

