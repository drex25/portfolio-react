import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaTools, 
  FaDatabase,
  FaCloud,
  FaPalette,
  FaRocket,
  FaStar,
  FaFire,
  FaHeart,
  FaLightbulb
} from 'react-icons/fa';
import { 
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
  SiAmazon,
  SiFigma,
  SiWordpress,
  SiLinux,
  SiBootstrap,
  SiTypescript
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  description: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
  experience: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills: Skill[] = [
    // Frontend
    { 
      name: 'HTML5', 
      icon: <SiHtml5 />, 
      category: 'frontend', 
      color: 'text-orange-500',
      description: 'Marcado semántico y accesible',
      level: 'Experto',
      experience: '5+ años'
    },
    { 
      name: 'CSS3', 
      icon: <SiCss3 />, 
      category: 'frontend', 
      color: 'text-blue-500',
      description: 'Estilos modernos con animaciones y responsive design',
      level: 'Avanzado',
      experience: '5+ años'
    },
    { 
      name: 'JavaScript', 
      icon: <SiJavascript />, 
      category: 'frontend', 
      color: 'text-yellow-500',
      description: 'ES6+ y programación funcional',
      level: 'Avanzado',
      experience: '4+ años'
    },
    { 
      name: 'TypeScript', 
      icon: <SiTypescript />, 
      category: 'frontend', 
      color: 'text-blue-500',
      description: 'Tipado estático para JavaScript más robusto',
      level: 'Principiante',
      experience: '1 año'
    },
    { 
      name: 'React', 
      icon: <SiReact />, 
      category: 'frontend', 
      color: 'text-cyan-400',
      description: 'Desarrollo de SPAs modernas y componentes reutilizables',
      level: 'Principiante',
      experience: '1 año'
    },
    { 
      name: 'Bootstrap', 
      icon: <SiBootstrap />, 
      category: 'frontend', 
      color: 'text-purple-500',
      description: 'Framework CSS para desarrollo rápido y responsive',
      level: 'Avanzado',
      experience: '4+ años'
    },
    { 
      name: 'Tailwind CSS', 
      icon: <SiTailwindcss />, 
      category: 'frontend', 
      color: 'text-teal-400',
      description: 'Framework CSS utility-first para diseños rápidos',
      level: 'Principiante',
      experience: '1 año'
    },

    // Backend
    { 
      name: 'PHP', 
      icon: <SiPhp />, 
      category: 'backend', 
      color: 'text-indigo-400',
      description: 'Desarrollo backend robusto y escalable',
      level: 'Avanzado',
      experience: '4+ años'
    },
    { 
      name: 'Laravel', 
      icon: <SiLaravel />, 
      category: 'backend', 
      color: 'text-red-500',
      description: 'Framework PHP elegante para desarrollo web',
      level: 'Avanzado',
      experience: '3+ años'
    },

    // Database
    { 
      name: 'MySQL', 
      icon: <SiMysql />, 
      category: 'database', 
      color: 'text-blue-600',
      description: 'Base de datos relacional robusta',
      level: 'Avanzado',
      experience: '4+ años'
    },

    // DevOps & Tools
    { 
      name: 'Docker', 
      icon: <SiDocker />, 
      category: 'devops', 
      color: 'text-blue-400',
      description: 'Containerización y despliegue de aplicaciones',
      level: 'Principiante',
      experience: '1 año'
    },
    { 
      name: 'Git', 
      icon: <SiGit />, 
      category: 'devops', 
      color: 'text-orange-500',
      description: 'Control de versiones y colaboración',
      level: 'Avanzado',
      experience: '4+ años'
    },
    { 
      name: 'AWS', 
      icon: <SiAmazon />, 
      category: 'devops', 
      color: 'text-orange-400',
      description: 'Servicios en la nube y infraestructura',
      level: 'Intermedio',
      experience: '1+ año'
    },
    { 
      name: 'Linux', 
      icon: <SiLinux />, 
      category: 'devops', 
      color: 'text-yellow-300',
      description: 'Administración de servidores y configuración con Docker',
      level: 'Intermedio',
      experience: '2+ años'
    },

    // Design & CMS
    { 
      name: 'Figma', 
      icon: <SiFigma />, 
      category: 'design', 
      color: 'text-purple-400',
      description: 'Diseño de interfaces básico y prototipado',
      level: 'Principiante',
      experience: '1+ año'
    },
    { 
      name: 'WordPress', 
      icon: <SiWordpress />, 
      category: 'cms', 
      color: 'text-blue-800',
      description: 'CMS, desarrollo de plugins y child themes personalizados',
      level: 'Experto',
      experience: '5+ años'
    },
    { 
      name: 'VS Code', 
      icon: <VscCode />, 
      category: 'tools', 
      color: 'text-blue-500',
      description: 'Editor de código principal',
      level: 'Experto',
      experience: '5+ años'
    }
  ];

  const categories: SkillCategory[] = [
    { 
      id: 'frontend', 
      title: 'Frontend', 
      icon: <FaCode />, 
      color: 'from-cyan-500 to-blue-600',
      description: 'Interfaces de usuario modernas y responsivas'
    },
    { 
      id: 'backend', 
      title: 'Backend', 
      icon: <FaServer />, 
      color: 'from-green-500 to-emerald-600',
      description: 'APIs robustas y lógica de servidor'
    },
    { 
      id: 'database', 
      title: 'Bases de Datos', 
      icon: <FaDatabase />, 
      color: 'from-purple-500 to-pink-600',
      description: 'Gestión y optimización de datos'
    },
    { 
      id: 'devops', 
      title: 'DevOps', 
      icon: <FaCloud />, 
      color: 'from-orange-500 to-red-600',
      description: 'Despliegue y infraestructura'
    },
    { 
      id: 'design', 
      title: 'Diseño', 
      icon: <FaPalette />, 
      color: 'from-pink-500 to-purple-600',
      description: 'UX/UI y prototipado'
    },
    { 
      id: 'cms', 
      title: 'CMS', 
      icon: <FaTools />, 
      color: 'from-indigo-500 to-blue-600',
      description: 'Sistemas de gestión de contenido'
    },
    { 
      id: 'tools', 
      title: 'Herramientas', 
      icon: <FaRocket />, 
      color: 'from-teal-500 to-cyan-600',
      description: 'Editores y herramientas de desarrollo'
    }
  ];

  // Función para obtener el color del nivel
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Experto': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Avanzado': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Intermedio': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Principiante': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Función para obtener el icono del nivel
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Experto': return <FaStar className="text-yellow-400" />;
      case 'Avanzado': return <FaFire className="text-orange-400" />;
      case 'Intermedio': return <FaLightbulb className="text-blue-400" />;
      case 'Principiante': return <FaHeart className="text-pink-400" />;
      default: return <FaStar className="text-gray-400" />;
    }
  };

  // Componente de skill individual
  const SkillItem: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
      <motion.div
        ref={ref}
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group-hover:bg-white/10 h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className={`text-3xl ${skill.color} p-3 rounded-xl bg-white/5`}>
              {skill.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-lg">
                  {skill.name}
                </h4>
                <div className="flex items-center gap-1">
                  {getLevelIcon(skill.level)}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {skill.experience}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {skill.description}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="skills"
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Habilidades
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Un conjunto completo de tecnologías y herramientas que domino para crear soluciones digitales innovadoras y escalables.
          </p>
        </motion.div>

        {/* Skills por categorías */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(skill => skill.category === category.id);
            
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              >
                {/* Header de categoría */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-3xl shadow-2xl`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-lg">
                        {category.description}
                      </p>
                      <div className="text-sm text-cyan-400 font-medium mt-1">
                        {categorySkills.length} tecnología{categorySkills.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid de skills */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorySkills.map((skill, index) => (
                    <SkillItem key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filosofía */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8">Mi Filosofía</h3>
            <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "La tecnología es solo una herramienta. Lo importante es cómo la usamos para resolver problemas reales y crear experiencias que impacten positivamente en las personas."
              </p>
              <div className="text-cyan-400 font-semibold mt-3">- Sylvain Drexler</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;