/* Session tracking utilities for YAN.AI
 * - Tracks mouse/touch positions, scroll, and visible sections
 * - Generates a stable anonymous session id
 * - Exposes a simple hesitation detector and event feed for chat prompts
 */

export type YanAiEvent =
  | { type: 'mousemove'; x: number; y: number; t: number }
  | { type: 'touch'; x: number; y: number; t: number }
  | { type: 'scroll'; y: number; t: number }
  | { type: 'section'; id: string; t: number };

export interface YanAiSnapshot {
  sessionId: string;
  lastSectionId: string | null;
  recentEvents: YanAiEvent[]; // last ~N events
}

const MAX_EVENTS = 200;

function generateSessionId(): string {
  // RFC4122-ish, sufficient for anonymous client id
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class YanAiTracker {
  private events: YanAiEvent[] = [];
  private sectionObserver?: IntersectionObserver;
  private lastSectionId: string | null = null;
  readonly sessionId: string;

  constructor(sectionIds: string[] = ['home', 'works', 'projects', 'services', 'about', 'contact']) {
    const stored = localStorage.getItem('yanai_session_id');
    this.sessionId = stored || generateSessionId();
    if (!stored) localStorage.setItem('yanai_session_id', this.sessionId);

    // Mouse & touch listeners
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // Section visibility
    this.sectionObserver = new IntersectionObserver(
      entries => {
        const winH = window.innerHeight;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            const rect = entry.target.getBoundingClientRect();
            const inCenter = rect.top < winH * 0.6 && rect.bottom > winH * 0.4;
            if (inCenter) {
              this.lastSectionId = id;
              this.pushEvent({ type: 'section', id, t: performance.now() });
            }
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver!.observe(el);
    });
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove as any);
    window.removeEventListener('scroll', this.onScroll);
    this.sectionObserver?.disconnect();
  }

  getSnapshot(): YanAiSnapshot {
    return {
      sessionId: this.sessionId,
      lastSectionId: this.lastSectionId,
      recentEvents: [...this.events],
    };
  }

  // Heuristic: user hesitates if many small mouse moves within short time near same area
  isUserHesitating(windowMs = 2500, radiusPx = 70, minSamples = 12): boolean {
    const now = performance.now();
    const slice = this.events.filter(e => (e.type === 'mousemove' || e.type === 'touch') && now - e.t <= windowMs) as Array<Extract<YanAiEvent, { type: 'mousemove' | 'touch' }>>;
    if (slice.length < minSamples) return false;
    const avgX = slice.reduce((s, e) => s + e.x, 0) / slice.length;
    const avgY = slice.reduce((s, e) => s + e.y, 0) / slice.length;
    const within = slice.filter(e => Math.hypot(e.x - avgX, e.y - avgY) <= radiusPx).length;
    return within / slice.length >= 0.8; // 80% of moves within radius
  }

  private onMouseMove = (e: MouseEvent) => {
    this.pushEvent({ type: 'mousemove', x: e.clientX, y: e.clientY, t: performance.now() });
  };

  private onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    this.pushEvent({ type: 'touch', x: touch.clientX, y: touch.clientY, t: performance.now() });
  };

  private onScroll = () => {
    this.pushEvent({ type: 'scroll', y: window.scrollY, t: performance.now() });
  };

  private pushEvent(event: YanAiEvent) {
    this.events.push(event);
    if (this.events.length > MAX_EVENTS) this.events.splice(0, this.events.length - MAX_EVENTS);
  }
}


