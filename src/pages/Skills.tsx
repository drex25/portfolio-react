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
  FaLightbulb,
  FaShieldAlt,
  FaCheckCircle,
  FaAward
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
  businessValue: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  businessImpact: string;
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills: Skill[] = [
    // Frontend
    { 
      name: 'HTML5', 
      icon: <SiHtml5 />, 
      category: 'frontend', 
      color: 'text-orange-500',
      description: 'Marcado semántico y accesible para mejor SEO',
      level: 'Experto',
      experience: '5+ años',
      businessValue: 'Mejor posicionamiento en buscadores y accesibilidad'
    },
    { 
      name: 'CSS3', 
      icon: <SiCss3 />, 
      category: 'frontend', 
      color: 'text-blue-500',
      description: 'Estilos modernos con animaciones y responsive design',
      level: 'Avanzado',
      experience: '5+ años',
      businessValue: 'Interfaces atractivas que mejoran la experiencia del usuario'
    },
    { 
      name: 'JavaScript', 
      icon: <SiJavascript />, 
      category: 'frontend', 
      color: 'text-yellow-500',
      description: 'ES6+ y programación funcional para aplicaciones dinámicas',
      level: 'Avanzado',
      experience: '4+ años',
      businessValue: 'Interactividad avanzada que aumenta el engagement'
    },
    { 
      name: 'TypeScript', 
      icon: <SiTypescript />, 
      category: 'frontend', 
      color: 'text-blue-500',
      description: 'Tipado estático para código más robusto y mantenible',
      level: 'Principiante',
      experience: '1 año',
      businessValue: 'Menor cantidad de errores y desarrollo más eficiente'
    },
    { 
      name: 'React', 
      icon: <SiReact />, 
      category: 'frontend', 
      color: 'text-cyan-400',
      description: 'Desarrollo de SPAs modernas y componentes reutilizables',
      level: 'Principiante',
      experience: '1 año',
      businessValue: 'Aplicaciones web rápidas y escalables'
    },
    { 
      name: 'Bootstrap', 
      icon: <SiBootstrap />, 
      category: 'frontend', 
      color: 'text-purple-500',
      description: 'Framework CSS para desarrollo rápido y responsive',
      level: 'Avanzado',
      experience: '4+ años',
      businessValue: 'Desarrollo más rápido y consistencia visual'
    },
    { 
      name: 'Tailwind CSS', 
      icon: <SiTailwindcss />, 
      category: 'frontend', 
      color: 'text-teal-400',
      description: 'Framework CSS utility-first para diseños personalizados',
      level: 'Intermedio',
      experience: '2 años',
      businessValue: 'Diseños únicos con tiempo de desarrollo optimizado'
    },

    // Backend
    { 
      name: 'PHP', 
      icon: <SiPhp />, 
      category: 'backend', 
      color: 'text-indigo-400',
      description: 'Desarrollo backend robusto y escalable',
      level: 'Avanzado',
      experience: '4+ años',
      businessValue: 'Lógica de negocio sólida y APIs confiables'
    },
    { 
      name: 'Laravel', 
      icon: <SiLaravel />, 
      category: 'backend', 
      color: 'text-red-500',
      description: 'Framework PHP elegante para aplicaciones empresariales',
      level: 'Avanzado',
      experience: '3+ años',
      businessValue: 'Desarrollo rápido de aplicaciones complejas y seguras'
    },

    // Database
    { 
      name: 'MySQL', 
      icon: <SiMysql />, 
      category: 'database', 
      color: 'text-blue-600',
      description: 'Base de datos relacional optimizada para rendimiento',
      level: 'Avanzado',
      experience: '4+ años',
      businessValue: 'Gestión eficiente de datos empresariales'
    },

    // DevOps & Tools
    { 
      name: 'Docker', 
      icon: <SiDocker />, 
      category: 'devops', 
      color: 'text-blue-400',
      description: 'Containerización para despliegues consistentes',
      level: 'Principiante',
      experience: '1 año',
      businessValue: 'Despliegues más rápidos y entornos consistentes'
    },
    { 
      name: 'Git', 
      icon: <SiGit />, 
      category: 'devops', 
      color: 'text-orange-500',
      description: 'Control de versiones para colaboración eficiente',
      level: 'Avanzado',
      experience: '2 años',
      businessValue: 'Desarrollo colaborativo y historial de cambios seguro'
    },
    { 
      name: 'AWS', 
      icon: <SiAmazon />, 
      category: 'devops', 
      color: 'text-orange-400',
      description: 'Servicios en la nube para infraestructura escalable',
      level: 'Intermedio',
      experience: '1+ año',
      businessValue: 'Infraestructura escalable y costos optimizados'
    },
    { 
      name: 'Linux', 
      icon: <SiLinux />, 
      category: 'devops', 
      color: 'text-yellow-300',
      description: 'Administración de servidores y configuración',
      level: 'Intermedio',
      experience: '2+ años',
      businessValue: 'Servidores estables y seguros'
    },

    // Design & CMS
    { 
      name: 'Figma', 
      icon: <SiFigma />, 
      category: 'design', 
      color: 'text-purple-400',
      description: 'Diseño de interfaces y prototipado colaborativo',
      level: 'Principiante',
      experience: '1+ año',
      businessValue: 'Prototipos que validan ideas antes del desarrollo'
    },
    { 
      name: 'WordPress', 
      icon: <SiWordpress />, 
      category: 'cms', 
      color: 'text-blue-800',
      description: 'CMS líder con plugins y themes personalizados',
      level: 'Experto',
      experience: '5+ años',
      businessValue: 'Sitios web fáciles de gestionar y actualizar'
    },
    { 
      name: 'VS Code', 
      icon: <VscCode />, 
      category: 'tools', 
      color: 'text-blue-500',
      description: 'Editor de código optimizado para productividad',
      level: 'Experto',
      experience: '5+ años',
      businessValue: 'Desarrollo más eficiente y menos errores'
    }
  ];

  const categories: SkillCategory[] = [
    { 
      id: 'frontend', 
      title: 'Frontend', 
      icon: <FaCode />, 
      color: 'from-cyan-500 to-blue-600',
      description: 'Interfaces de usuario modernas y responsivas',
      businessImpact: 'Mejora la experiencia del usuario y aumenta las conversiones'
    },
    { 
      id: 'backend', 
      title: 'Backend', 
      icon: <FaServer />, 
      color: 'from-green-500 to-emerald-600',
      description: 'APIs robustas y lógica de servidor',
      businessImpact: 'Garantiza la funcionalidad y seguridad de las aplicaciones'
    },
    { 
      id: 'database', 
      title: 'Bases de Datos', 
      icon: <FaDatabase />, 
      color: 'from-purple-500 to-pink-600',
      description: 'Gestión y optimización de datos',
      businessImpact: 'Almacenamiento eficiente y consultas rápidas'
    },
    { 
      id: 'devops', 
      title: 'DevOps', 
      icon: <FaCloud />, 
      color: 'from-orange-500 to-red-600',
      description: 'Despliegue y infraestructura',
      businessImpact: 'Reduce costos operativos y mejora la disponibilidad'
    },
    { 
      id: 'design', 
      title: 'Diseño', 
      icon: <FaPalette />, 
      color: 'from-pink-500 to-purple-600',
      description: 'UX/UI y prototipado',
      businessImpact: 'Valida conceptos antes del desarrollo completo'
    },
    { 
      id: 'cms', 
      title: 'CMS', 
      icon: <FaTools />, 
      color: 'from-indigo-500 to-blue-600',
      description: 'Sistemas de gestión de contenido',
      businessImpact: 'Permite gestión autónoma del contenido web'
    },
    { 
      id: 'tools', 
      title: 'Herramientas', 
      icon: <FaRocket />, 
      color: 'from-teal-500 to-cyan-600',
      description: 'Editores y herramientas de desarrollo',
      businessImpact: 'Acelera el desarrollo y reduce errores'
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
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            {skill.description}
          </p>
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-1">
              <FaCheckCircle className="text-cyan-400 text-sm" />
              <span className="text-cyan-400 text-xs font-semibold">Valor comercial:</span>
            </div>
            <p className="text-cyan-300 text-xs leading-relaxed">{skill.businessValue}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="skills"
      style={{ position: 'relative' }}
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Stack Tecnológico
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tecnologías y herramientas especializadas que utilizamos para crear soluciones digitales que impulsan el crecimiento de tu negocio.
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
                      <p className="text-gray-400 text-lg mb-2">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <FaShieldAlt className="text-green-400" />
                        <span className="text-green-400 font-medium">{category.businessImpact}</span>
                      </div>
                      <div className="text-sm text-cyan-400 font-medium mt-1">
                        {categorySkills.length} tecnología{categorySkills.length !== 1 ? 's' : ''} especializada{categorySkills.length !== 1 ? 's' : ''}
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

        {/* Propuesta de valor */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaAward className="text-3xl text-cyan-400" />
              <h3 className="text-3xl font-bold text-white">Nuestra Ventaja Competitiva</h3>
            </div>
            <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "No solo dominamos las tecnologías, sino que entendemos cómo aplicarlas estratégicamente para generar valor real en tu negocio. Cada herramienta que utilizamos está seleccionada para maximizar el ROI de tu inversión en desarrollo."
              </p>
              <div className="text-cyan-400 font-semibold mt-3">- Enfoque orientado a resultados</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;