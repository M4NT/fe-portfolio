import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe, Database, Cpu, Layers, Box } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'design' | 'tools';
  icon: React.ReactNode;
  color: string;
  projects: number;
}

const SkillsVisualization: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 95, category: 'frontend', icon: <Code />, color: 'from-cyan-400 to-blue-500', projects: 45 },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: <Code />, color: 'from-blue-500 to-blue-700', projects: 40 },
    { name: 'Next.js', level: 88, category: 'frontend', icon: <Globe />, color: 'from-gray-700 to-black', projects: 30 },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: <Palette />, color: 'from-cyan-400 to-teal-500', projects: 50 },
    { name: 'Framer Motion', level: 92, category: 'frontend', icon: <Zap />, color: 'from-pink-500 to-purple-600', projects: 35 },
    { name: 'WebGL/Three.js', level: 85, category: 'frontend', icon: <Box />, color: 'from-purple-500 to-indigo-600', projects: 15 },
    
    // Backend
    { name: 'Node.js', level: 80, category: 'backend', icon: <Cpu />, color: 'from-green-500 to-green-700', projects: 25 },
    { name: 'PostgreSQL', level: 75, category: 'backend', icon: <Database />, color: 'from-blue-600 to-blue-800', projects: 20 },
    { name: 'MongoDB', level: 78, category: 'backend', icon: <Database />, color: 'from-green-600 to-green-800', projects: 18 },
    { name: 'GraphQL', level: 82, category: 'backend', icon: <Layers />, color: 'from-pink-500 to-purple-500', projects: 15 },
    
    // Design
    { name: 'Figma', level: 90, category: 'design', icon: <Palette />, color: 'from-purple-500 to-pink-500', projects: 40 },
    { name: 'Adobe XD', level: 85, category: 'design', icon: <Palette />, color: 'from-pink-600 to-red-600', projects: 30 },
    { name: 'UI/UX Design', level: 88, category: 'design', icon: <Palette />, color: 'from-blue-400 to-purple-500', projects: 45 },
    
    // Tools
    { name: 'Git', level: 92, category: 'tools', icon: <Code />, color: 'from-orange-500 to-red-600', projects: 50 },
    { name: 'Vite', level: 90, category: 'tools', icon: <Zap />, color: 'from-purple-500 to-yellow-500', projects: 35 },
    { name: 'Docker', level: 75, category: 'tools', icon: <Box />, color: 'from-blue-500 to-cyan-500', projects: 20 }
  ];

  const categories = [
    { id: 'all', label: 'Todas', icon: <Layers /> },
    { id: 'frontend', label: 'Frontend', icon: <Code /> },
    { id: 'backend', label: 'Backend', icon: <Database /> },
    { id: 'design', label: 'Design', icon: <Palette /> },
    { id: 'tools', label: 'Tools', icon: <Cpu /> }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500/50 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-4 h-4">{cat.icon}</span>
            <span className="font-medium">{cat.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        layout
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.05 }}
            className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
            whileHover={{ y: -4 }}
          >
            {/* Skill Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white`}>
                  {skill.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {skill.name}
                  </h4>
                  <p className="text-white/50 text-xs">
                    {skill.projects} projetos
                  </p>
                </div>
              </div>
              <div className="text-white font-bold text-2xl">
                {skill.level}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * 0.1
                  }}
                />
              </motion.div>
            </div>

            {/* Glow effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity pointer-events-none`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        {[
          { label: 'Tecnologias', value: skills.length, color: 'from-blue-500 to-cyan-500' },
          { label: 'Nível Médio', value: `${Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%`, color: 'from-purple-500 to-pink-500' },
          { label: 'Projetos Totais', value: skills.reduce((acc, s) => acc + s.projects, 0), color: 'from-green-500 to-emerald-500' },
          { label: 'Anos de Exp.', value: '5+', color: 'from-yellow-500 to-orange-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            <div className="text-white/60 text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(SkillsVisualization);

