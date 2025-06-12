import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { SiReact, SiTypescript, SiTailwindcss, SiLaravel, SiPhp, SiDocker, SiGit } from 'react-icons/si';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  features: string[];
}

const techIcons: Record<string, React.ReactNode> = {
  React: <SiReact className="text-sky-500" />,
  TypeScript: <SiTypescript className="text-blue-600" />,
  Tailwind: <SiTailwindcss className="text-cyan-400" />,
  Laravel: <SiLaravel className="text-red-500" />,
  PHP: <SiPhp className="text-indigo-500" />,
  Docker: <SiDocker className="text-blue-500" />,
  Git: <SiGit className="text-orange-500" />,
};

// Microinteracciones en los íconos de tecnologías
const TechIcon: React.FC<{ tech: string }> = ({ tech }) => (
  <motion.span
    whileHover={{ scale: 1.3, rotate: 15, color: '#a78bfa', filter: 'drop-shadow(0 0 8px #a78bfa88)' }}
    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    className="inline-flex items-center"
    style={{ cursor: 'pointer' }}
  >
    {techIcons[tech]}
  </motion.span>
);

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter));

  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );

  if (isLoading) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center font-mono" id="projects">
        {/* Fondo animado de neón igual al landing/footer/about */}
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
        <div className="text-[#00fff7] text-xl animate-pulse z-10">Cargando proyectos...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-black font-mono" id="projects">
      {/* Fondo animado de neón igual al landing/footer/about */}
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
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] drop-shadow-[0_0_24px_#00fff7]">
            Mis Proyectos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] mx-auto rounded-full mb-8 animate-pulse" />
          {/* Technology filters mejorados */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: '#00fff722' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md border border-[#00fff7]/30 backdrop-blur-md font-mono ${
                filter === 'all'
                  ? 'bg-[#00fff7] text-black shadow-lg'
                  : 'bg-gray-100/30 dark:bg-gray-800/30 text-[#bdbdbd] hover:bg-[#00fff7]/10 dark:hover:bg-[#005bea]/10'
              }`}
            >
              Todos
            </motion.button>
            {allTechnologies.map(tech => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.08, backgroundColor: '#00fff722' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-md border border-[#00fff7]/30 backdrop-blur-md font-mono ${
                  filter === tech
                    ? 'bg-[#00fff7] text-black shadow-lg'
                    : 'bg-gray-100/30 dark:bg-gray-800/30 text-[#bdbdbd] hover:bg-[#00fff7]/10 dark:hover:bg-[#005bea]/10'
                }`}
              >
                <TechIcon tech={tech} />
                {tech}
              </motion.button>
            ))}
          </div>
        </motion.div>
        {/* Projects grid mejorado */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 80 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#00fff7]/30 shadow-2xl group-hover:shadow-[#00fff7]/30 transition-all duration-300">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Project content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#00fff7] drop-shadow-md">{project.name}</h3>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#bdbdbd] hover:text-[#00fff7] transition-colors"
                        title="Ver en GitHub"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#bdbdbd] hover:text-[#00fff7] transition-colors"
                        title="Ver demo"
                      >
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-[#bdbdbd] mb-4 line-clamp-2 font-medium">
                    {project.description}
                  </p>
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#005bea] mb-2 flex items-center gap-2">
                      <FaStar className="text-[#00fff7]" />
                      Características
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-[#005bea]/20 text-[#00fff7] rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Technologies mejoradas */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 bg-[#005bea]/40 text-[#bdbdbd] px-2 py-1 rounded-full text-xs font-medium shadow hover:bg-[#00fff7]/20 transition-colors duration-200 font-mono"
                      >
                        <TechIcon tech={tech} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;