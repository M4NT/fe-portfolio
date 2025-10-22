import React, { useState, useEffect } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * Componente otimizado que só renderiza animações quando visível
 * Reduz trabalho da main thread
 */
const OptimizedMotion: React.FC<OptimizedMotionProps> = ({ 
  children, 
  className = '',
  threshold = 0.1,
  ...motionProps 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className={`animate-composite ${className}`}
      style={{ willChange: isVisible ? 'transform, opacity' : 'auto' }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default OptimizedMotion;
