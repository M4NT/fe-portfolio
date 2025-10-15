import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'vibrant';
}

const AnimatedBackground = ({ variant = 'default' }: AnimatedBackgroundProps) => {
  const opacity = {
    default: { orbs: 0.25, particles: 0.3, lines: 0.2, overlay: 0.1 },
    subtle: { orbs: 0.15, particles: 0.2, lines: 0.15, overlay: 0.05 },
    vibrant: { orbs: 0.3, particles: 0.4, lines: 0.25, overlay: 0.15 }
  };

  const currentOpacity = opacity[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"
        style={{ opacity: currentOpacity.orbs }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [currentOpacity.orbs * 0.6, currentOpacity.orbs, currentOpacity.orbs * 0.6],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 blur-3xl"
        style={{ opacity: currentOpacity.orbs }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [currentOpacity.orbs * 0.8, currentOpacity.orbs, currentOpacity.orbs * 0.8],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Additional accent orbs */}
      <motion.div 
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-green-500 to-teal-500 blur-2xl"
        style={{ opacity: currentOpacity.orbs * 0.8 }}
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [currentOpacity.orbs * 0.5, currentOpacity.orbs * 0.8, currentOpacity.orbs * 0.5],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="absolute top-1/6 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl"
        style={{ opacity: currentOpacity.orbs * 0.8 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [currentOpacity.orbs * 0.4, currentOpacity.orbs * 0.8, currentOpacity.orbs * 0.4],
          x: [0, 30, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="absolute bottom-1/6 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl"
        style={{ opacity: currentOpacity.orbs * 0.8 }}
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [currentOpacity.orbs * 0.5, currentOpacity.orbs * 0.8, currentOpacity.orbs * 0.5],
          x: [0, -25, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => {
        const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-cyan-400', 'bg-green-400'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${randomColor} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: currentOpacity.particles
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, currentOpacity.particles, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-1/3 left-1/6 w-32 h-32 border-2 border-blue-400 rotate-45"
        style={{ opacity: currentOpacity.lines * 1.5 }}
        animate={{
          rotate: [45, 405, 45],
          scale: [1, 1.2, 1],
          opacity: [currentOpacity.lines, currentOpacity.lines * 2, currentOpacity.lines]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/6 w-24 h-24 border-2 border-purple-400 rounded-full"
        style={{ opacity: currentOpacity.lines * 1.5 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [currentOpacity.lines, currentOpacity.lines * 2.5, currentOpacity.lines],
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-pink-400 rotate-45"
        style={{ opacity: currentOpacity.lines }}
        animate={{
          rotate: [0, 360, 0],
          scale: [1, 1.3, 1],
          opacity: [currentOpacity.lines * 0.5, currentOpacity.lines * 1.5, currentOpacity.lines * 0.5]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated lines */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        style={{ opacity: currentOpacity.lines }}
        animate={{
          x: [-100, 100],
          opacity: [0, currentOpacity.lines, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"
        style={{ opacity: currentOpacity.lines }}
        animate={{
          y: [-100, 100],
          opacity: [0, currentOpacity.lines, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
        style={{ opacity: currentOpacity.lines * 0.8 }}
        animate={{
          x: [100, -100],
          opacity: [0, currentOpacity.lines * 0.8, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(150deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
        style={{ opacity: currentOpacity.overlay }}
        animate={{
          opacity: [currentOpacity.overlay * 0.6, currentOpacity.overlay, currentOpacity.overlay * 0.6],
          background: [
            'linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(236,72,153,0.1) 100%)',
            'linear-gradient(225deg, rgba(236,72,153,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(147,51,234,0.1) 100%)',
            'linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(236,72,153,0.1) 100%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
