import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const FooterEnhanced = () => {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 sm:gap-16 md:gap-24">
          {/* Enhanced Brand with Sales Focus */}
          <motion.div 
            className="space-y-6 sm:space-y-8 md:space-y-10 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="font-inter font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-wider cursor-pointer magnetic relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <span className="relative z-10">YAN.M</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"
                style={{ filter: 'blur(30px)' }}
              />
              
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            
            <div className="space-y-4">
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-sm font-inter mx-auto md:mx-0">
                Frontend Developer creating revolutionary digital experiences for serious businesses. Specializing in award-winning interfaces and performance-critical applications.
              </p>
              
              <div className="text-white/50 text-xs sm:text-sm">
                This portfolio serves as a sales filtering system. YAN.AI helps identify qualified prospects and ensures perfect project alignment before engagement.
              </div>
            </div>
            
            {/* Sales Status Indicators */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <motion.div
                  className="w-4 h-4 bg-green-500 rounded-full relative"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-0 bg-green-500 rounded-full"
                    animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <span className="text-green-400 text-xs sm:text-sm font-inter">
                  Accepting Qualified Projects
                </span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <motion.div
                  className="w-4 h-4 bg-blue-500 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="text-blue-400 text-xs sm:text-sm font-inter">
                  AI Sales Assistant Active
                </span>
              </div>
            </div>

            {/* Enhanced Location Info */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="text-white/40 text-xs uppercase tracking-wider font-inter flex items-center justify-center md:justify-start space-x-2">
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                <span>Based In</span>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <div className="text-white/80 font-inter text-sm sm:text-base">
                  {t('location.city')}, {t('location.state')}
                </div>
                <div className="text-white/80 font-inter text-sm sm:text-base">
                  {t('location.country')}
                </div>
                <div className="text-white/60 text-xs sm:text-sm font-mono">
                  {t('location.coordinates')}
                </div>
                <div className="text-white/60 text-xs sm:text-sm font-mono">
                  {t('location.timezone')}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills & Investment Information */}
          <motion.div 
            className="space-y-6 sm:space-y-8 md:space-y-10 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <h4 className="font-inter font-medium text-white text-xs sm:text-sm uppercase tracking-wider">
              Technical Expertise
            </h4>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h5 className="text-white/80 font-inter mb-3 sm:mb-4 text-sm sm:text-base">Specialized In</h5>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {['React/Next.js', 'TypeScript', 'WebGL/Three.js', 'Performance', 'Animation', 'Architecture'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="text-white/60 text-xs sm:text-sm hover:text-white transition-colors cursor-default p-2 bg-white/5 rounded border border-white/10 hover:border-white/20 hover:bg-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      data-skill
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-white/80 font-inter mb-3 sm:mb-4 text-sm sm:text-base">Investment Range</h5>
                <div className="space-y-2">
                  {[
                    'Small Projects: $15,000+',
                    'Medium Applications: $35,000+',
                    'Enterprise Solutions: $75,000+',
                    'Ongoing Retainers Available'
                  ].map((range, index) => (
                    <motion.div
                      key={range}
                      className="text-white/60 text-xs sm:text-sm flex items-center justify-center md:justify-start space-x-3 group hover:text-white transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      data-skill
                    >
                      <motion.div
                        className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white/80 transition-colors"
                        whileHover={{ scale: 2 }}
                      />
                      <span>{range}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Contact & AI Assistant */}
          <motion.div 
            className="space-y-6 sm:space-y-8 md:space-y-10 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <h4 className="font-inter font-medium text-white text-xs sm:text-sm uppercase tracking-wider">
              Get Started
            </h4>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <motion.div
                  className="p-3 sm:p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h5 className="text-white font-medium mb-2 flex items-center justify-center md:justify-start space-x-2 text-sm sm:text-base">
                    <motion.div
                      className="w-3 h-3 bg-blue-400 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>Chat with YAN.AI First</span>
                  </h5>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    Our AI assistant will assess your project needs, explain our methodology, and determine if there's a good fit before scheduling a consultation.
                  </p>
                </motion.div>

                <motion.a
                  href="mailto:hello@yan-m.dev"
                  className="block text-white/70 hover:text-white transition-all duration-300 text-sm sm:text-base font-inter group relative"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    hello@yan-m.dev
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"
                  />
                </motion.a>
              </div>

              {/* Qualification Process */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="text-white/40 text-xs uppercase tracking-wider font-inter">
                  Our Process
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start space-x-3 text-xs sm:text-sm">
                    <span className="text-blue-400 font-mono">01</span>
                    <span className="text-white/70">AI Pre-qualification Chat</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-3 text-xs sm:text-sm">
                    <span className="text-purple-400 font-mono">02</span>
                    <span className="text-white/70">Strategic Discovery Call</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-3 text-xs sm:text-sm">
                    <span className="text-green-400 font-mono">03</span>
                    <span className="text-white/70">Proposal & Partnership</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-white/40 text-xs sm:text-sm font-inter text-center md:text-left">
            © 2025 YAN.M — Sales-Optimized Portfolio Experience
          </div>
          
          <div className="flex items-center space-x-2 text-white/40 text-xs font-inter">
            <span>AI-Powered Client Filtering</span>
            <motion.div
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FooterEnhanced;
