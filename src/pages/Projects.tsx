import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaStar, 
  FaFilter,
  FaSearch,
  FaEye,
  FaCode,
  FaRocket
} from 'react-icons/fa';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiLaravel, 
  SiPhp, 
  SiDocker, 
  SiGit,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiWordpress,
  SiMysql
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  features: string[];
}

const techIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  React: { icon: <SiReact />, color: 'text-cyan-400' },
  TypeScript: { icon: <SiTypescript />, color: 'text-blue-500' },
  JavaScript: { icon: <SiJavascript />, color: 'text-yellow-500' },
  HTML5: { icon: <SiHtml5 />, color: 'text-orange-500' },
  CSS3: { icon: <SiCss3 />, color: 'text-blue-500' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: 'text-teal-400' },
  Bootstrap: { icon: <SiBootstrap />, color: 'text-purple-500' },
  Laravel: { icon: <SiLaravel />, color: 'text-red-500' },
  PHP: { icon: <SiPhp />, color: 'text-indigo-400' },
  MySQL: { icon: <SiMysql />, color: 'text-blue-600' },
  WordPress: { icon: <SiWordpress />, color: 'text-blue-800' },
  Docker: { icon: <SiDocker />, color: 'text-blue-400' },
  Git: { icon: <SiGit />, color: 'text-orange-500' },
};

// Componente de tarjeta de proyecto mejorado
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000" />
      
      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
        {/* Imagen del proyecto */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Overlay con botones */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-xl" />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-cyan-500/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEye className="text-xl" />
            </motion.a>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.name}
            </h3>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaExternalLinkAlt className="text-lg" />
              </a>
            </div>
          </div>

          <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              {t('projects.features')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Tecnologías */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">{t('projects.technologies')}</h4>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => {
                const techInfo = techIcons[tech];
                return (
                  <motion.div
                    key={tech}
                    className={`flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 ${techInfo?.color || 'text-gray-400'}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {techInfo?.icon}
                    <span className="text-xs font-medium text-gray-300">{tech}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.technologies.includes(filter);
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Tecnologías disponibles basadas en las habilidades reales
  const availableTechnologies = [
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Bootstrap', 'Tailwind CSS',
    'PHP', 'Laravel', 'MySQL', 'WordPress', 'Docker', 'Git'
  ];

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-cyan-400 text-xl">Cargando proyectos...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="projects"
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Controles de filtrado */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Barra de búsqueda */}
          <div className="max-w-md mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('projects.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Filtros de tecnología */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter className="text-sm" />
              {t('projects.filterAll')} ({projects.length})
            </motion.button>
            
            {availableTechnologies.map((tech) => {
              const techInfo = techIcons[tech];
              const count = projects.filter(p => p.technologies.includes(tech)).length;
              
              if (count === 0) return null;
              
              return (
                <motion.button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                    filter === tech
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={techInfo?.color || 'text-gray-400'}>
                    {techInfo?.icon}
                  </span>
                  {tech} ({count})
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">{t('projects.noResults')}</h3>
              <p className="text-gray-500">
                {t('projects.noResultsDesc')}
              </p>
            </motion.div>
          )}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">{t('projects.projectIdea')}</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('projects.projectIdeaDesc')}
          </p>
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="text-lg" />
            {t('projects.startProject')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;