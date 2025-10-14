import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Apenas desktop
    if (window.innerWidth < 768) {
      return;
    }

    // Garantir que o cursor seja visível inicialmente
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const updateMousePosition = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Cancelar animação anterior
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Usar requestAnimationFrame para otimizar performance
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: mouseRef.current.x, y: mouseRef.current.y });
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Passive event listener para melhor performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    // Add global style to hide default cursor - mantém cursor none mesmo em elementos dinâmicos
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      * {
        cursor: none !important;
      }
      body, html, #root, main, section, div, span, p, h1, h2, h3, h4, h5, h6 {
        cursor: none !important;
      }
      a, button, [role="button"], .magnetic, input, textarea, select, [data-interactive] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Função para atualizar listeners em elementos interativos
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], .magnetic, input, textarea, select, [data-interactive]');
      
      interactiveElements.forEach(el => {
        // Remove listeners antigos se existirem
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        
        // Adiciona novos listeners
        el.addEventListener('mouseenter', handleMouseEnter, { passive: true } as any);
        el.addEventListener('mouseleave', handleMouseLeave, { passive: true } as any);
      });
    };

    // Atualiza inicialmente
    updateInteractiveElements();

    // Observer para novos elementos - throttled agressivamente para INP < 200ms
    let updateTimeout: number;
    const observer = new MutationObserver(() => {
      // Throttle de 500ms para não afetar INP
      if (updateTimeout) clearTimeout(updateTimeout);
      updateTimeout = window.setTimeout(() => {
        updateInteractiveElements();
      }, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: false, // Não observar subárvore para performance
      attributes: false,
      characterData: false
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
      observer.disconnect();
    };
  }, []);

  // Não renderizar em mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed pointer-events-none mix-blend-difference"
      style={{
        top: 0,
        left: 0,
        transform: `translate3d(${mousePosition.x - 10}px, ${mousePosition.y - 10}px, 0) scale(${isHovered ? 2 : 1})`,
        zIndex: 999999,
        transition: 'transform 0.1s ease-out',
        contain: 'layout style paint',
        willChange: 'transform'
      }}
    >
      <div 
        className="w-5 h-5 bg-white rounded-full"
        style={{
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.3)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default React.memo(CustomCursor);