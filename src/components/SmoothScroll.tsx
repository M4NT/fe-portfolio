import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
      class: 'is-revealed',
      lerp: 0.07, // Suavidade do scroll (0.07 é um bom valor para uma experiência fluida)
      smartphone: {
        smooth: true,
        multiplier: 0.8,
      },
      tablet: {
        smooth: true,
        multiplier: 0.8,
      },
    });

    // Atualiza o scroll quando o conteúdo muda
    setTimeout(() => {
      scroll.update();
    }, 500);

    // Limpa o scroll quando o componente é desmontado
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      data-scroll-container
      className="relative min-h-screen w-full"
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
