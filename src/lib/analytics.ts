import { track } from '@vercel/analytics';

// ========================================
// GA4 WRAPPER (usa gtag se disponível)
// ========================================

const gtagSafe = (name: string, params?: Record<string, unknown>) => {
  // Evita erros em SSR/ambientes sem gtag
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params || {});
  }
};

export const trackGAEvent = (name: string, params?: Record<string, unknown>) => {
  gtagSafe(name, params);
};

// ========================================
// REFERRAL EVENTS (Indicações)
// ========================================

export const trackReferralView = (ref: string) => {
  track('referral_view', { ref });
  trackGAEvent('referral_view', { ref });
};

export const trackReferralIntent = (payload: { referrer?: string; referral_name?: string; channel: 'whatsapp' | 'form' }) => {
  track('referral_intent', payload);
  trackGAEvent('referral_intent', payload as Record<string, unknown>);
};

/**
 * Utilitário para rastreamento de eventos com Vercel Analytics
 * Centraliza todos os eventos do site para fácil manutenção
 */

// ========================================
// CTA CLICKS
// ========================================

export const trackCTAClick = (button: string, section: string, destination?: string) => {
  track('cta_click', {
    button,
    section,
    destination: destination || 'unknown'
  });
};

// ========================================
// PROJECT INTERACTIONS
// ========================================

export const trackProjectView = (projectId: string, projectTitle: string, source: string) => {
  track('project_view', {
    project_id: projectId,
    project_title: projectTitle,
    source // 'carousel', 'grid', 'modal'
  });
};

export const trackProjectModalOpen = (projectId: string, projectTitle: string) => {
  track('project_modal_open', {
    project_id: projectId,
    project_title: projectTitle
  });
};

export const trackProjectLinkClick = (projectId: string, linkType: 'live' | 'github') => {
  track('project_link_click', {
    project_id: projectId,
    link_type: linkType
  });
};

// ========================================
// FORM INTERACTIONS
// ========================================

export const trackFormStart = (formType: string) => {
  track('form_start', {
    form_type: formType
  });
};

export const trackFormSubmit = (formType: string, success: boolean) => {
  track('form_submit', {
    form_type: formType,
    success
  });
};

export const trackFormError = (formType: string, errorType: string) => {
  track('form_error', {
    form_type: formType,
    error_type: errorType
  });
};

// ========================================
// LANGUAGE & LOCALIZATION
// ========================================

export const trackLanguageChange = (from: string, to: string, method: 'manual' | 'auto') => {
  track('language_change', {
    from_language: from,
    to_language: to,
    change_method: method
  });
};

// ========================================
// NAVIGATION
// ========================================

export const trackSectionView = (sectionId: string, sectionName: string) => {
  track('section_view', {
    section_id: sectionId,
    section_name: sectionName
  });
};

export const trackMenuOpen = (menuType: 'mobile' | 'desktop') => {
  track('menu_open', {
    menu_type: menuType
  });
};

// ========================================
// SCROLL BEHAVIOR
// ========================================

export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  track('scroll_depth', {
    depth_percentage: depth
  });
};

export const trackBackToTopClick = () => {
  track('back_to_top_click', {
    scroll_position: window.pageYOffset
  });
};

// ========================================
// ENGAGEMENT
// ========================================

export const trackTimeOnPage = (seconds: number) => {
  track('time_on_page', {
    duration_seconds: seconds,
    duration_minutes: Math.round(seconds / 60)
  });
};

export const trackDeviceViewportChange = (device: string, viewport: string) => {
  track('device_viewport_change', {
    device,
    viewport
  });
};

// ========================================
// AI CHAT
// ========================================

export const trackChatOpen = () => {
  track('ai_chat_open', {
    timestamp: new Date().toISOString()
  });
};

export const trackChatMessage = (messageLength: number) => {
  track('ai_chat_message', {
    message_length: messageLength
  });
};

// ========================================
// SOCIAL SHARE
// ========================================

export const trackSocialClick = (platform: string, location: string) => {
  track('social_click', {
    platform,
    location // 'footer', 'mobile-menu', etc
  });
};

// ========================================
// DOWNLOADS & EXTERNAL LINKS
// ========================================

export const trackDownload = (fileType: string, fileName: string) => {
  track('download', {
    file_type: fileType,
    file_name: fileName
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  track('external_link_click', {
    url,
    link_text: linkText
  });
};

// ========================================
// ERRORS
// ========================================

export const trackError = (errorType: string, errorMessage: string, component?: string) => {
  track('error', {
    error_type: errorType,
    error_message: errorMessage,
    component: component || 'unknown'
  });
};

// ========================================
// TESTIMONIALS
// ========================================

export const trackTestimonialView = (testimonialId: number, testimonialName: string) => {
  track('testimonial_view', {
    testimonial_id: testimonialId,
    testimonial_name: testimonialName
  });
};

// ========================================
// PERFORMANCE
// ========================================

export const trackPerformanceMetric = (metric: string, value: number) => {
  track('performance_metric', {
    metric_name: metric,
    metric_value: value
  });
};

export default {
  trackCTAClick,
  trackProjectView,
  trackProjectModalOpen,
  trackProjectLinkClick,
  trackFormStart,
  trackFormSubmit,
  trackFormError,
  trackLanguageChange,
  trackSectionView,
  trackMenuOpen,
  trackScrollDepth,
  trackBackToTopClick,
  trackTimeOnPage,
  trackDeviceViewportChange,
  trackChatOpen,
  trackChatMessage,
  trackSocialClick,
  trackDownload,
  trackExternalLink,
  trackError,
  trackTestimonialView,
  trackPerformanceMetric
};

