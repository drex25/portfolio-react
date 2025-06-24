import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaAward,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRocket,
  FaEye,
  FaStore,
  FaEnvelope,
  FaCode,
  FaGlobe,
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaBullseye,
  FaLightbulb,
  FaStar,
  FaUsers,
  FaLaptopCode,
  FaDatabase,
  FaMobile,
  FaSearch,
  FaCog,
  FaServer,
  FaCloud,
  FaLock,
  FaTools,
  FaPalette,
  FaShoppingCart,
  FaWordpress,
  FaReact,
  FaLaravel,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Datos de experiencia profesional
const experiences = [
  {
    title: "Desarrollador WordPress",
    company: "Agencia Tributaria de Misiones (ATM)",
    period: "2024",
    location: "Misiones, Argentina",
    description: "Desarrollo de plugin personalizado de calendario de vencimientos y tema hijo para optimizar la gestión de contenidos institucionales. Colaboración en equipo para mejorar la experiencia de usuario del portal tributario oficial.",
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    achievements: ['Plugin personalizado implementado', 'Mejora significativa en UX', 'Trabajo colaborativo exitoso'],
    icon: FaWordpress,
    gradient: 'from-blue-500 to-cyan-500',
    stats: { projects: 3, satisfaction: 95 }
  },
  {
    title: "Web Developer",
    company: "TSGroup",
    period: "abr. 2023 - actualidad",
    location: "Posadas, Misiones",
    description: "Desarrollo y gestión de sitios web corporativos utilizando tecnologías modernas. Enfoque en soluciones escalables y mantenimiento de plataformas web empresariales.",
    technologies: ['PHP', 'JavaScript', 'React', 'Laravel', 'WordPress'],
    achievements: ['5+ sitios web desarrollados', 'Mantenimiento WEB', 'Website Manager'],
    icon: FaLaptopCode,
    gradient: 'from-purple-500 to-pink-500',
    stats: { projects: 5, satisfaction: 98 }
  },
  {
    title: "Desarrollador Freelance",
    company: "eCommerce & Dropshipping",
    period: "2019 - actualidad",
    location: "Remoto",
    description: "Desarrollo de tiendas online y soluciones eCommerce personalizadas. Especialización en plataformas de venta digital que impulsan el crecimiento de negocios.",
    technologies: ['WooCommerce', 'AliDropship', 'WordPress', 'PHP'],
    achievements: ['10+ tiendas online', 'Aumento promedio del 60% en ventas'],
    icon: FaShoppingCart,
    gradient: 'from-orange-500 to-red-500',
    stats: { projects: 10, satisfaction: 92 }
  }
];

// Datos de formación técnica
const education = [
  {
    degree: "Analista de Sistemas Informáticos",
    institution: "Instituto Tecnológico nro.3",
    period: "mar. 2019 - dic. 2022",
    location: "Argentina",
    description: "Formación integral en análisis, diseño y desarrollo de sistemas informáticos, con enfoque en resolución de problemas empresariales y optimización de procesos.",
    icon: FaGraduationCap,
    gradient: 'from-indigo-500 to-purple-500',
    type: 'carrera',
    badge: 'Carrera',
    gpa: '9.2',
    highlights: ['Análisis de Sistemas', 'Diseño de Software', 'Gestión de Proyectos']
  },
  {
    degree: "Desarrollo Web Completo",
    institution: "Udemy",
    period: "dic. 2021 - mar. 2022",
    location: "Online",
    description: "Curso intensivo en HTML5, CSS3, JavaScript, AJAX, PHP y MySQL orientado a la creación de aplicaciones web modernas y funcionales.",
    icon: FaCode,
    gradient: 'from-blue-500 to-indigo-500',
    type: 'curso',
    badge: 'Curso',
    completion: '100%',
    highlights: ['Frontend Development', 'Backend Development', 'Database Design']
  },
  {
    degree: "Desarrollo Web Completo",
    institution: "Coderhouse",
    period: "Finalizado",
    location: "Online",
    description: "Capacitación práctica en desarrollo web, desde fundamentos hasta implementación de proyectos reales con metodologías actuales.",
    icon: FaReact,
    gradient: 'from-cyan-500 to-blue-500',
    type: 'curso',
    badge: 'Curso',
    completion: '100%',
    highlights: ['React.js', 'Node.js', 'Metodologías Ágiles']
  }
];

// Capacidades multilingües
const languages = [
  { name: 'Creole', level: 'Nativo', flag: '🇭🇹', proficiency: 'native', score: 100 },
  { name: 'Francés', level: 'Segundo idioma', flag: '🇫🇷', proficiency: 'fluent', score: 95 },
  { name: 'Español', level: 'Avanzado', flag: '🇪🇸', proficiency: 'advanced', score: 90 },
  { name: 'Inglés', level: 'Avanzado', flag: '🇺🇸', proficiency: 'advanced', score: 85 }
];

// Valores del servicio
const serviceValues = [
  {
    title: 'Excelencia Técnica',
    description: 'Código limpio, optimizado y siguiendo las mejores prácticas de la industria',
    icon: FaBullseye,
    gradient: 'from-cyan-400 to-blue-500',
    metric: '99.9%',
    metricLabel: 'Uptime'
  },
  {
    title: 'Innovación Constante',
    description: 'Siempre actualizados con las últimas tecnologías y tendencias del mercado',
    icon: FaLightbulb,
    gradient: 'from-yellow-400 to-orange-500',
    metric: '25+',
    metricLabel: 'Tecnologías'
  },
  {
    title: 'Comunicación Efectiva',
    description: 'Colaboración fluida con equipos multiculturales y clientes internacionales',
    icon: FaGlobe,
    gradient: 'from-green-400 to-emerald-500',
    metric: '4',
    metricLabel: 'Idiomas'
  },
  {
    title: 'Resultados Medibles',
    description: 'Enfoque en soluciones que generen impacto real en tu negocio',
    icon: FaChartLine,
    gradient: 'from-purple-400 to-pink-500',
    metric: '60%',
    metricLabel: 'Crecimiento'
  }
];

// Garantías de servicio
const serviceGuarantees = [
  {
    icon: FaShieldAlt,
    title: "Garantía de Calidad",
    description: "Código limpio y optimizado siguiendo estándares internacionales",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: FaHeadset,
    title: "Soporte Continuo",
    description: "Acompañamiento técnico durante y después del desarrollo",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: FaCheckCircle,
    title: "Entrega Puntual",
    description: "Cumplimiento estricto de cronogramas y fechas acordadas",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: FaStar,
    title: "Satisfacción Garantizada",
    description: "Compromiso total con la calidad y satisfacción del cliente",
    color: "from-yellow-400 to-orange-500"
  }
];

// Stack tecnológico
const techStack = [
  { name: 'Frontend', technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'], icon: FaPalette, color: 'from-blue-400 to-cyan-500' },
  { name: 'Backend', technologies: ['Laravel', 'PHP', 'Node.js', 'Express'], icon: FaServer, color: 'from-green-400 to-emerald-500' },
  { name: 'CMS & E-commerce', technologies: ['WordPress', 'WooCommerce', 'Shopify'], icon: FaShoppingCart, color: 'from-purple-400 to-pink-500' },
  { name: 'DevOps & Cloud', technologies: ['Docker', 'AWS', 'Vercel', 'Git'], icon: FaCloud, color: 'from-orange-400 to-red-500' }
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Efecto de partículas flotantes
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 relative overflow-hidden"
      id="about"
    >
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Fondo con patrón geométrico */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header moderno con efectos */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl shadow-2xl">
              <FaStore />
            </div>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Mi
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {' '}Trayectoria
            </span>
          </h2>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Desarrollador Full Stack con más de 5 años de experiencia creando soluciones digitales innovadoras
          </p>
        </motion.div>

        {/* Estadísticas principales */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: 'Años de Experiencia', value: '5+', description: 'Desarrollo profesional' },
            { label: 'Proyectos Completados', value: '50+', description: 'Clientes satisfechos' },
            { label: 'Tecnologías Dominadas', value: '25+', description: 'Stack completo' },
            { label: 'Tiempo de Respuesta', value: '24h', description: 'Soporte garantizado' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 p-6 text-center"
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Presentación de servicios */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 p-8 sm:p-12"
            whileHover={{ 
              scale: 1.02, 
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido textual */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Desarrollador{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Full Stack
                    </span>
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Apasionado por crear experiencias digitales excepcionales. Mi enfoque combina 
                    creatividad técnica con una comprensión profunda de las necesidades del usuario. 
                    Especializado en desarrollo web moderno, e-commerce y aplicaciones empresariales.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">Desarrollo Frontend y Backend</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">E-commerce y Aplicaciones Web</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Optimización SEO y Rendimiento</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => {
                      const servicesSection = document.getElementById('services');
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaStore className="text-sm" />
                    Ver Servicios
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope className="text-sm" />
                    Contactar
                  </motion.button>
                </div>
              </div>

              {/* Stack tecnológico */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-6">Stack Tecnológico</h4>
                {techStack.map((stack, index) => (
                  <div key={stack.name} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stack.color} flex items-center justify-center text-white`}>
                        <stack.icon />
                      </div>
                      <span className="text-gray-300 font-medium">{stack.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-13">
                      {stack.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm font-medium border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Valores del Servicio */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Mis{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Valores
              </span>
            </h3>
            <p className="text-gray-400 text-lg">Los principios que guían mi trabajo y desarrollo profesional</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 p-6 text-center"
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center text-white text-2xl shadow-xl`}>
                  <value.icon />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{value.description}</p>
                <div className="text-2xl font-bold text-cyan-400">{value.metric}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{value.metricLabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Garantías de Servicio */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Mi{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Compromiso
              </span>
            </h3>
            <p className="text-gray-400 text-lg">Los valores que respaldo en cada proyecto que desarrollo</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceGuarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${guarantee.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                  <guarantee.icon />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{guarantee.title}</h4>
                  <p className="text-sm text-gray-400">{guarantee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Idiomas */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Capacidades{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Multilingües
              </span>
            </h3>
            <p className="text-gray-400 text-lg">Comunicación efectiva con clientes internacionales</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 p-6 text-center"
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{lang.flag}</div>
                <h4 className="text-lg font-bold text-white mb-2">{lang.name}</h4>
                <p className="text-cyan-400 text-sm mb-3">{lang.level}</p>
                <div className="mb-3">
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang.proficiency === 'native' ? 'bg-green-500/20 text-green-400' :
                  lang.proficiency === 'fluent' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {lang.proficiency === 'native' ? 'Nativo' :
                   lang.proficiency === 'fluent' ? 'Fluido' : 'Avanzado'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Experiencia y Educación */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Tabs modernos */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
              {[
                { key: 'experience', label: 'Trayectoria Profesional', icon: FaBriefcase },
                { key: 'education', label: 'Formación Técnica', icon: FaGraduationCap }
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'experience' | 'education')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="text-lg" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeline Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {(activeTab === 'experience' ? experiences : education).map((item, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 p-8 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                  }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 grid lg:grid-cols-4 gap-8 items-start">
                    {/* Icon y período */}
                    <div className="lg:col-span-1 text-center lg:text-left">
                      <div 
                        className="w-20 h-20 mx-auto lg:mx-0 mb-4 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl"
                        style={{ background: item.gradient }}
                      >
                        <item.icon />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-400">
                          <FaCalendarAlt className="text-xs" />
                          {item.period}
                        </div>
                        {item.location && (
                          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-400">
                            <FaMapMarkerAlt className="text-xs" />
                            {item.location}
                          </div>
                        )}
                        {/* Métricas adicionales */}
                        {'stats' in item && item.stats && (
                          <div className="mt-4 space-y-2">
                            <div className="text-xs text-gray-500">Proyectos: {item.stats.projects}</div>
                            <div className="text-xs text-gray-500">Satisfacción: {item.stats.satisfaction}%</div>
                          </div>
                        )}
                        {'gpa' in item && item.gpa && (
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">GPA: {item.gpa}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="lg:col-span-3 space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                            {'title' in item ? item.title : item.degree}
                          </h3>
                          {/* Badge para educación */}
                          {'badge' in item && item.badge && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                              item.type === 'carrera' 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                            }`}>
                              {item.type === 'carrera' ? (
                                <>
                                  <FaAward className="text-xs" />
                                  {item.badge}
                                </>
                              ) : (
                                <>
                                  <FaGraduationCap className="text-xs" />
                                  {item.badge}
                                </>
                              )}
                            </span>
                          )}
                        </div>
                        <p className="text-cyan-400 font-semibold text-lg">{'company' in item ? item.company : item.institution}</p>
                      </div>

                      <p className="text-gray-300 leading-relaxed">{item.description}</p>

                      {/* Tecnologías */}
                      {'technologies' in item && item.technologies && (
                        <div>
                          <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                            <FaRocket className="text-xs" />
                            Tecnologías utilizadas:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-400/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Logros */}
                      {'achievements' in item && item.achievements && (
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                            <FaAward className="text-xs" />
                            Resultados obtenidos:
                          </h4>
                          <ul className="space-y-2">
                            {item.achievements.map((achievement: string, i: number) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center gap-3">
                                <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Highlights para educación */}
                      {'highlights' in item && item.highlights && (
                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                            <FaStar className="text-xs" />
                            Áreas de especialización:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.highlights.map((highlight: string) => (
                              <span
                                key={highlight}
                                className="px-3 py-1 bg-purple-400/20 text-purple-300 rounded-full text-sm font-medium border border-purple-400/30"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Call to Action moderno */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 p-12"
            whileHover={{ 
              scale: 1.02, 
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                ¿Te gustaría{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Trabajar Juntos?
                </span>
              </h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Estoy siempre abierto a nuevos desafíos y oportunidades de colaboración. 
                Si tienes un proyecto en mente, me encantaría escucharlo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="text-lg" />
                  Contactar
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye className="text-lg" />
                  Ver Proyectos
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;