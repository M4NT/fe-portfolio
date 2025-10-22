import { motion } from 'framer-motion';

export default function SkeletonBlogCard() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear'
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Category Badge */}
        <div className="w-24 h-6 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear'
            }}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="w-full h-6 bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
                delay: 0.1
              }}
            />
          </div>
          <div className="w-3/4 h-6 bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
                delay: 0.2
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
                delay: 0.3
              }}
            />
          </div>
          <div className="w-5/6 h-4 bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
                delay: 0.4
              }}
            />
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-4 bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
                delay: 0.5
              }}
            />
          </div>
          <div className="w-16 h-4 bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
                delay: 0.6
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

