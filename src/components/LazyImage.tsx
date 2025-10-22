import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23111827"/%3E%3C/svg%3E',
  onLoad
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Carrega 100px antes de aparecer na tela
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder blur */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02))] bg-[length:60px_60px]" />
        </div>
      </motion.div>

      {/* Imagem real */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            borderRadius: className.includes('rounded-t-2xl') ? '1rem 1rem 0 0' : 
                        className.includes('rounded-2xl') ? '1rem' : 
                        className.includes('rounded-full') ? '50%' : '0'
          }}
        />
      )}

      {/* Loading shimmer */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear'
            }}
          />
        </div>
      )}
    </div>
  );
}

