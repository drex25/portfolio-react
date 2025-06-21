import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaTools, 
  FaDatabase,
  FaCloud,
  FaMobile,
  FaPalette,
  FaRocket
} from 'react-icons/fa';
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
  SiWordpress,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiLinux
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: string;
  color: string;
  description: string;
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
      name: 'React', 
      icon: <SiReact />, 
      level: 90, 
      category: 'frontend', 
      color: 'text-cyan-400',
      description: 'Desarrollo de SPAs modernas y componentes reutilizables'
    },
    { 
      name: 'TypeScript', 
      icon: <SiTypescript />, 
      level: 85, 
      category: 'frontend', 
      color: 'text-blue-500',
      description: 'Tipado estático para JavaScript más robusto'
    },
    { 
      name: 'Next.js', 
      icon: <SiNextdotjs />, 
      level: 82, 
      category: 'frontend', 
      color: 'text-white',
      description: 'Framework React para aplicaciones full-stack'
    },
    { 
      name: 'Tailwind CSS', 
      icon: <SiTailwindcss />, 
      level: 88, 
      category: 'frontend', 
      color: 'text-teal-400',
      description: 'Framework CSS utility-first para diseños rápidos'
    },
    { 
      name: 'Vue.js', 
      icon: <SiVuedotjs />, 
      level: 75, 
      category: 'frontend', 
      color: 'text-green-500',
      description: 'Framework progresivo para interfaces de usuario'
    },
    { 
      name: 'HTML5', 
      icon: <SiHtml5 />, 
      level: 95, 
      category: 'frontend', 
      color: 'text-orange-500',
      description: 'Marcado semántico y accesible'
    },
    { 
      name: 'CSS3', 
      icon: <SiCss3 />, 
      level: 90, 
      category: 'frontend', 
      color: 'text-blue-500',
      description: 'Estilos modernos con animaciones y responsive design'
    },
    { 
      name: 'JavaScript', 
      icon: <SiJavascript />, 
      level: 88, 
      category: 'frontend', 
      color: 'text-yellow-500',
      description: 'ES6+ y programación funcional'
    },

    // Backend
    { 
      name: 'Laravel', 
      icon: <SiLaravel />, 
      level: 85, 
      category: 'backend', 
      color: 'text-red-500',
      description: 'Framework PHP elegante para desarrollo web'
    },
    { 
      name: 'PHP', 
      icon: <SiPhp />, 
      level: 82, 
      category: 'backend', 
      color: 'text-indigo-400',
      description: 'Desarrollo backend robusto y escalable'
    },
    { 
      name: 'Node.js', 
      icon: <SiNodedotjs />, 
      level: 80, 
      category: 'backend', 
      color: 'text-green-500',
      description: 'JavaScript del lado del servidor'
    },
    { 
      name: 'Python', 
      icon: <SiPython />, 
      level: 70, 
      category: 'backend', 
      color: 'text-yellow-400',
      description: 'Scripting y desarrollo de APIs'
    },

    // Database
    { 
      name: 'MySQL', 
      icon: <SiMysql />, 
      level: 85, 
      category: 'database', 
      color: 'text-blue-600',
      description: 'Base de datos relacional robusta'
    },
    { 
      name: 'MongoDB', 
      icon: <SiMongodb />, 
      level: 75, 
      category: 'database', 
      color: 'text-green-600',
      description: 'Base de datos NoSQL flexible'
    },
    { 
      name: 'PostgreSQL', 
      icon: <SiPostgresql />, 
      level: 78, 
      category: 'database', 
      color: 'text-blue-400',
      description: 'Base de datos avanzada con características enterprise'
    },

    // DevOps & Tools
    { 
      name: 'Docker', 
      icon: <SiDocker />, 
      level: 80, 
      category: 'devops', 
      color: 'text-blue-400',
      description: 'Containerización y despliegue de aplicaciones'
    },
    { 
      name: 'Git', 
      icon: <SiGit />, 
      level: 85, 
      category: 'devops', 
      color: 'text-orange-500',
      description: 'Control de versiones y colaboración'
    },
    { 
      name: 'AWS', 
      icon: <SiAmazon />, 
      level: 70, 
      category: 'devops', 
      color: 'text-orange-400',
      description: 'Servicios en la nube y infraestructura'
    },
    { 
      name: 'Linux', 
      icon: <SiLinux />, 
      level: 75, 
      category: 'devops', 
      color: 'text-yellow-300',
      description: 'Administración de servidores y sistemas'
    },

    // Design & CMS
    { 
      name: 'Figma', 
      icon: <SiFigma />, 
      level: 75, 
      category: 'design', 
      color: 'text-purple-400',
      description: 'Diseño de interfaces y prototipado'
    },
    { 
      name: 'WordPress', 
      icon: <SiWordpress />, 
      level: 90, 
      category: 'cms', 
      color: 'text-blue-800',
      description: 'CMS y desarrollo de temas personalizados'
    },
    { 
      name: 'VS Code', 
      icon: <VscCode />, 
      level: 95, 
      category: 'tools', 
      color: 'text-blue-500',
      description: 'Editor de código principal'
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
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group-hover:bg-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`text-2xl ${skill.color}`}>
              {skill.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {skill.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                  />
                </div>
                <span className="text-sm font-bold text-cyan-400 min-w-[3rem]">
                  {skill.level}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

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
        <div className="space-y-16">
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
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid de skills */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categorySkills.map((skill, index) => (
                    <SkillItem key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resumen de experiencia */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Experiencia Técnica</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">5+</div>
                <div className="text-gray-400">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{skills.length}+</div>
                <div className="text-gray-400">Tecnologías Dominadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400">Proyectos Completados</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;