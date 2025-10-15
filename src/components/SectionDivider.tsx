import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <div className="relative py-16 bg-black overflow-hidden">
      {/* Animated Line */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-sm"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
          />
        </motion.div>

        {/* Decorative dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-white/40 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
