import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Add cursor tracking
    window.addEventListener('mousemove', updateMousePosition);

    // Add hover effects for interactive elements and override default cursors
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .magnetic, input, textarea, select, [data-interactive]');
    
    // Add global style to hide default cursor
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.head.removeChild(style);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: `translate3d(${mousePosition.x - 10}px, ${mousePosition.y - 10}px, 0) scale(${isHovered ? 2 : 1})`
      }}
      transition={{
        duration: 0,
        ease: "linear"
      }}
    >
      <div className="w-5 h-5 bg-white rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;