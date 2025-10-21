import { motion } from 'framer-motion';

const AffiliatesBackground = () => {
  // Emojis de fogo e relacionados ao tema
  const emojis = ['🔥', '💰', '💸', '🎁', '💎', '✨'];
  
  // Criar elementos flutuantes com emojis
  const floatingEmojis = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: 20 + Math.random() * 15,
    delay: Math.random() * 5,
    size: 30 + Math.random() * 40,
    opacity: 0.15 + Math.random() * 0.15
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5" />
      
      {/* Animated Emojis - Fire and Money themed */}
      {floatingEmojis.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.initialX}%`,
            top: `${element.initialY}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
          }}
          animate={{
            x: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
            rotate: [0, Math.random() * 360, Math.random() * 360, 0],
            scale: [1, 1 + Math.random() * 0.4, 1 - Math.random() * 0.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      {/* Colorful Glowing Orbs - Mais visíveis */}
      {/* Orange Orb - Top Left */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, rgba(249, 115, 22, 0.3) 25%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.5,
          top: '-20%',
          left: '-20%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Pink Orb - Bottom Right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0.3) 25%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.5,
          bottom: '-20%',
          right: '-20%',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Yellow/Amber Orb - Top Right */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(251, 191, 36, 0.25) 30%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.4,
          top: '10%',
          right: '5%',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rose Orb - Middle Left */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.5) 0%, rgba(244, 63, 94, 0.25) 30%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.4,
          top: '40%',
          left: '0%',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center Glow - Pulse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(251, 146, 60, 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AffiliatesBackground;

