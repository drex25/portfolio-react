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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/src/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data.projects));
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter));

  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );

  return (
    <section className="py-20 max-w-6xl mx-auto px-4" id="projects">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
          Mis Proyectos
        </h2>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-8" />
        
        {/* Technology filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
            }`}
          >
            Todos
          </motion.button>
          {allTechnologies.map(tech => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                filter === tech
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              {techIcons[tech]}
              {tech}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
          >
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary-500 transition-colors"
                    title="Ver en GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary-500 transition-colors"
                    title="Ver demo"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaStar className="text-primary-500" />
                  Características
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.map(feature => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {techIcons[tech]}
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects; 