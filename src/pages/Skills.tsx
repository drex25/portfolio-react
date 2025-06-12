import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaTools } from 'react-icons/fa';
import { 
  SiTypescript, 
  SiJavascript, 
  SiReact, 
  SiTailwindcss, 
  SiLaravel, 
  SiPhp, 
  SiMysql, 
  SiDocker, 
  SiGit,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiRedux,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiAmazon,
  SiFigma,
  SiWordpress
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    // Frontend
    { name: 'HTML5', icon: <SiHtml5 className="w-8 h-8 text-orange-500" />, category: 'frontend' },
    { name: 'CSS3', icon: <SiCss3 className="w-8 h-8 text-blue-500" />, category: 'frontend' },
    { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 text-blue-600" />, category: 'frontend' },
    { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8 text-yellow-500" />, category: 'frontend' },
    { name: 'React', icon: <SiReact className="w-8 h-8 text-blue-400" />, category: 'frontend' },
    { name: 'Next.js', icon: <SiNextdotjs className="w-8 h-8 text-gray-800 dark:text-white" />, category: 'frontend' },
    { name: 'Redux', icon: <SiRedux className="w-8 h-8 text-purple-500" />, category: 'frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8 text-cyan-500" />, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', icon: <SiNodedotjs className="w-8 h-8 text-green-500" />, category: 'backend' },
    { name: 'Laravel', icon: <SiLaravel className="w-8 h-8 text-red-500" />, category: 'backend' },
    { name: 'PHP', icon: <SiPhp className="w-8 h-8 text-purple-500" />, category: 'backend' },
    { name: 'MySQL', icon: <SiMysql className="w-8 h-8 text-blue-600" />, category: 'backend' },
    { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 text-green-600" />, category: 'backend' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8 text-blue-400" />, category: 'backend' },
    
    // Tools & Others
    { name: 'Docker', icon: <SiDocker className="w-8 h-8 text-blue-400" />, category: 'tools' },
    { name: 'Git', icon: <SiGit className="w-8 h-8 text-orange-500" />, category: 'tools' },
    { name: 'AWS', icon: <SiAmazon className="w-8 h-8 text-orange-400" />, category: 'tools' },
    { name: 'VS Code', icon: <VscCode className="w-8 h-8 text-blue-500" />, category: 'tools' },
    { name: 'Figma', icon: <SiFigma className="w-8 h-8 text-purple-400" />, category: 'tools' },
    { name: 'WordPress', icon: <SiWordpress className="w-8 h-8 text-blue-800" />, category: 'tools' },
  ];

  const categories = [
    { id: 'frontend', title: 'Frontend', icon: <FaCode /> },
    { id: 'backend', title: 'Backend', icon: <FaServer /> },
    { id: 'tools', title: 'Herramientas', icon: <FaTools /> },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-black">
      {/* Fondo animado de neón (fijo, sin movimiento) */}
      <div className="absolute inset-0 -z-10 animate-gradient-xy" style={{
        background: 'linear-gradient(120deg, #00fff7 0%, #005bea 100%)',
        filter: 'blur(80px) opacity(0.7)'
      }} />
      {/* Partículas y destellos */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, #00fff7 0%, #005bea 100%)`,
              boxShadow: '0 0 16px 4px #00fff7, 0 0 32px 8px #005bea',
              opacity: 0.7
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] drop-shadow-[0_0_16px_#00fff7] font-mono tracking-tight">
            Habilidades
          </h2>
          <p className="text-xl text-[#e0e0e0] font-mono drop-shadow-[0_0_8px_#00fff7] max-w-2xl mx-auto">
            Tecnologías y herramientas que utilizo para crear soluciones digitales
          </p>
        </motion.div>
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xs bg-black/70 border border-[#00fff7]/20 rounded-2xl p-6 shadow-[0_0_8px_2px_#00fff7,0_0_16px_4px_#005bea] flex flex-col items-center hover:shadow-[0_0_16px_4px_#00fff7,0_0_32px_8px_#005bea] transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#00fff7]/10 flex items-center justify-center text-[#00fff7] shadow-[0_0_4px_#00fff7]">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#00fff7] font-mono drop-shadow-[0_0_4px_#00fff7]">
                  {category.title}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {skills
                  .filter(skill => skill.category === category.id)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[#00fff7]/10 transition-colors"
                    >
                      <span className="drop-shadow-[0_0_4px_#00fff7]">{skill.icon}</span>
                      <span className="text-sm text-[#e0e0e0] font-mono text-center drop-shadow-[0_0_2px_#00fff7]">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;