import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type?: 'hero' | 'card' | 'text' | 'image' | 'section';
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'card', 
  count = 1,
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className={`w-full min-h-screen bg-black flex items-center justify-center ${className}`}>
            <div className="w-full max-w-7xl px-6 space-y-8">
              {/* Title skeleton */}
              <div className="space-y-4">
                <motion.div
                  className="h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                />
                <motion.div
                  className="h-12 w-3/4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                />
              </div>
              
              {/* CTA buttons skeleton */}
              <div className="flex gap-4">
                <div className="h-12 w-40 bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-12 w-32 bg-gray-800 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-xl p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image skeleton */}
                <div className="aspect-video bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg animate-pulse" />
                
                {/* Title skeleton */}
                <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse" />
                
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />
                </div>
                
                {/* Tags skeleton */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-800 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-gray-800 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-gray-800 rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className="h-4 bg-gray-800 rounded animate-pulse"
                style={{ width: `${Math.random() * 30 + 70}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            ))}
          </div>
        );

      case 'image':
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className="aspect-video bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  opacity: { delay: index * 0.1 },
                  scale: { delay: index * 0.1 },
                  backgroundPosition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
                style={{
                  backgroundSize: '200% 100%'
                }}
              />
            ))}
          </div>
        );

      case 'section':
        return (
          <div className={`w-full py-20 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 space-y-12">
              {/* Section title */}
              <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
                <div className="h-12 w-96 bg-gray-800 rounded animate-pulse" />
              </div>
              
              {/* Content grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900 rounded-xl p-6 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="aspect-video bg-gray-800 rounded animate-pulse" />
                    <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-800 rounded animate-pulse" />
                      <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderSkeleton();
};

// Skeleton específico para navegação
export const NavigationSkeleton: React.FC = () => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      {/* Logo skeleton */}
      <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
      
      {/* Nav items skeleton */}
      <div className="hidden lg:flex items-center gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-6 w-20 bg-gray-800 rounded animate-pulse" />
        ))}
      </div>
      
      {/* CTA skeleton */}
      <div className="h-10 w-32 bg-gray-800 rounded-full animate-pulse" />
    </div>
  </div>
);

// Skeleton para footer
export const FooterSkeleton: React.FC = () => (
  <div className="w-full bg-black border-t border-white/10 py-12">
    <div className="max-w-7xl mx-auto px-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="h-px bg-white/10" />
      <div className="flex justify-between items-center">
        <div className="h-4 w-48 bg-gray-800 rounded animate-pulse" />
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-800 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;

