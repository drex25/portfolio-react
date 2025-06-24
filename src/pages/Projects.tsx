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
  FaRocket,
  FaAward,
  FaChartLine,
  FaShoppingCart,
  FaGlobe
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
  category?: 'web' | 'ecommerce' | 'enterprise' | 'custom';
  impact?: string;
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
  Divi: { icon: <SiWordpress />, color: 'text-purple-600' },
  Docker: { icon: <SiDocker />, color: 'text-blue-400' },
  Git: { icon: <SiGit />, color: 'text-orange-500' },
};

// Componente de tarjeta de proyecto mejorado con enfoque comercial
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'ecommerce': return <FaShoppingCart className="text-green-400" />;
      case 'enterprise': return <FaAward className="text-purple-400" />;
      case 'web': return <FaGlobe className="text-blue-400" />;
      default: return <FaCode className="text-cyan-400" />;
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'ecommerce': return 'E-commerce';
      case 'enterprise': return 'Empresarial';
      case 'web': return 'Sitio Web';
      case 'custom': return 'Personalizado';
      default: return 'Desarrollo';
    }
  };

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
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-bold">
              {getCategoryIcon(project.category)}
              {getCategoryLabel(project.category)}
            </div>
          </div>
          
          {/* Overlay con botones */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.github && (
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
            )}
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
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="text-lg" />
                </a>
              )}
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

          {/* Impact/Results */}
          {project.impact && (
            <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <FaChartLine className="text-green-400 text-sm" />
                <span className="text-green-400 text-sm font-semibold">Impacto:</span>
              </div>
              <p className="text-green-300 text-sm">{project.impact}</p>
            </div>
          )}

          {/* Features */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              Características principales:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30"
                >
                  {feature}
                </span>
              ))}
              {project.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium">
                  +{project.features.length - 3} más
                </span>
              )}
            </div>
          </div>

          {/* Tecnologías */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Stack tecnológico:</h4>
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
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        
        // Agregar categorías e impacto a los proyectos
        const enhancedProjects = data.projects.map((project: Project) => ({
          ...project,
          category: project.name.includes('E-commerce') || project.name.includes('Tienda') ? 'ecommerce' :
                   project.name.includes('Sistema') || project.name.includes('Empresarial') ? 'enterprise' :
                   project.name.includes('WordPress') || project.name.includes('Landing') ? 'web' : 'custom',
          impact: project.name.includes('RRHH') ? 'Optimización de procesos de recursos humanos' :
                 project.name.includes('Tasa') ? 'Digitalización de trámites gubernamentales' :
                 project.name.includes('ATM') ? 'Mejora en la experiencia del contribuyente' :
                 project.name.includes('Contribumed') ? 'Acceso 24/7 a servicios médicos' :
                 undefined
        }));
        
        setProjects(enhancedProjects || []);
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
    const matchesFilter = filter === 'all' || project.technologies.includes(filter) || project.category === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Categorías disponibles
  const categories = [
    { id: 'all', name: 'Todos los Proyectos', icon: <FaGlobe /> },
    { id: 'ecommerce', name: 'E-commerce', icon: <FaShoppingCart /> },
    { id: 'enterprise', name: 'Empresarial', icon: <FaAward /> },
    { id: 'web', name: 'Sitios Web', icon: <FaCode /> }
  ];

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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Casos de Éxito
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Proyectos reales que demuestran nuestra capacidad para crear soluciones digitales que generan resultados medibles para nuestros clientes.
          </p>
        </motion.div>

        {/* Estadísticas de proyectos */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { number: projects.length, label: 'Proyectos Completados', icon: <FaRocket /> },
            { number: '100%', label: 'Satisfacción Cliente', icon: <FaStar /> },
            { number: '5+', label: 'Años de Experiencia', icon: <FaAward /> },
            { number: '24/7', label: 'Soporte Técnico', icon: <FaCode /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-2xl text-cyan-400 mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controles de filtrado */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Barra de búsqueda */}
          <div className="max-w-md mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos por nombre o tecnología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const count = category.id === 'all' ? projects.length : 
                           projects.filter(p => p.category === category.id).length;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                    filter === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  {category.name} ({count})
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
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No se encontraron proyectos</h3>
              <p className="text-gray-500">
                Intenta con otros términos de búsqueda o filtros diferentes.
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
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">¿Tu Proyecto Será el Próximo Caso de Éxito?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Cada proyecto exitoso comienza con una idea. Transformemos la tuya en una solución digital que genere resultados reales para tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="text-lg" />
                Ver Servicios
              </motion.button>
              <motion.button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCode className="text-lg" />
                Solicitar Cotización
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;