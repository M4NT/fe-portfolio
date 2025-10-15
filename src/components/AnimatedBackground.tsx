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

      {/* Floating particles - Fixed positions with smooth movement and blur */}
      {[...Array(12)].map((_, i) => {
        const colors = ['bg-green-400/30', 'bg-emerald-400/30', 'bg-teal-400/30', 'bg-cyan-400/30'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Posições mais controladas (não totalmente aleatórias)
        const positions = [
          { left: '10%', top: '20%' },
          { left: '15%', top: '25%' },
          { left: '85%', top: '70%' },
          { left: '80%', top: '75%' },
          { left: '20%', top: '60%' },
          { left: '75%', top: '30%' },
          { left: '50%', top: '15%' },
          { left: '30%', top: '80%' },
          { left: '90%', top: '40%' },
          { left: '5%', top: '50%' },
          { left: '60%', top: '85%' },
          { left: '40%', top: '10%' }
        ];
        
        const position = positions[i % positions.length];
        const duration = 12 + Math.random() * 6; // 12-18 segundos
        
        // Aplicar blur em 40% das bolinhas (índices pares)
        const shouldBlur = i % 2 === 0;
        const blurClass = shouldBlur ? 'blur-sm' : '';
        const sizeClass = shouldBlur ? 'w-4 h-4' : 'w-3 h-3';
        
        return (
          <motion.div
            key={i}
            className={`absolute ${sizeClass} ${randomColor} rounded-full ${blurClass}`}
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              opacity: [0, currentOpacity.particles * 0.8, currentOpacity.particles * 0.8, currentOpacity.particles * 0.8, currentOpacity.particles * 0.8, 0],
              scale: [0, 1, 1, 1, 1, 0],
              y: [0, -10, -20, -30, -40, -50],
              x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15, Math.random() * 40 - 20, Math.random() * 50 - 25, Math.random() * 60 - 30]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
              times: [0, 0.1, 0.3, 0.6, 0.8, 1] // Aparece rápido, fica visível 70% do tempo, desaparece suave
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
