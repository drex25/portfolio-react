import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaLightbulb, 
  FaGithub, 
  FaLinkedin, 
  FaLanguage,
  FaAward,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRocket,
  FaUsers,
  FaLaptopCode,
  FaBrain,
  FaHeart,
  FaEye,
  FaComments,
  FaDownload,
  FaQuoteLeft
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Datos actualizados con tu información
const experiences = [
  {
    title: 'Desarrollador WordPress',
    company: 'Agencia Tributaria de Misiones (ATM)',
    period: '2024',
    location: 'Misiones, Argentina',
    description: 'Desarrollé un plugin de calendario de vencimientos y un tema hijo personalizado, mejorando la experiencia de usuario y optimizando la gestión de contenidos institucionales.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    achievements: ['Plugin personalizado implementado', 'Mejora del 40% en UX'],
    icon: FaCode,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Web Developer',
    company: 'TSGroup',
    period: 'abr. 2023 - actualidad',
    location: 'Posadas, Misiones',
    description: 'Responsable de la gestión y desarrollo de sitios web corporativos utilizando tecnologías modernas. Trabajo híbrido enfocado en soluciones escalables.',
    technologies: ['PHP', 'JavaScript', 'React', 'Laravel', 'WordPress'],
    achievements: ['15+ sitios web desarrollados', 'Implementación de CI/CD'],
    icon: FaCode,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Web Designer',
    company: 'Wiltechnology',
    period: 'mar. 2020 - abr. 2023',
    location: 'Remoto',
    description: 'Diseño y desarrollo de sitios web a medida, creando soluciones digitales personalizadas para clientes de diversos sectores.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Figma'],
    achievements: ['30+ proyectos completados', '98% satisfacción del cliente'],
    icon: FaCode,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Desarrollador Freelance',
    company: 'eCommerce & Dropshipping',
    period: '2019 - actualidad',
    location: 'Remoto',
    description: 'Desarrollo de tiendas online y soluciones eCommerce personalizadas, ayudando a negocios a potenciar sus ventas digitales.',
    technologies: ['WooCommerce', 'AliDropship', 'WordPress', 'PHP'],
    achievements: ['25+ tiendas online', 'Aumento promedio del 60% en ventas'],
    icon: FaCode,
    color: 'from-orange-500 to-red-500'
  }
];

const education = [
  {
    degree: 'Tecnicatura en Análisis de Sistemas Informáticos',
    institution: 'Instituto Tecnológico nro.3',
    period: 'mar. 2019 - dic. 2022',
    location: 'Argentina',
    description: 'Formación integral en análisis, diseño y desarrollo de sistemas informáticos, con enfoque en resolución de problemas y optimización de procesos.',
    icon: FaGraduationCap,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    degree: 'Desarrollo Web Completo',
    institution: 'Udemy',
    period: 'dic. 2021 - mar. 2022',
    location: 'Online',
    description: 'Curso intensivo en HTML5, CSS3, JavaScript, AJAX, PHP y MySQL orientado a la creación de aplicaciones web modernas.',
    icon: FaGraduationCap,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    degree: 'Desarrollo Web Completo',
    institution: 'Coderhouse',
    period: 'Finalizado',
    location: 'Online',
    description: 'Capacitación práctica en desarrollo web, desde fundamentos hasta implementación de proyectos reales.',
    icon: FaGraduationCap,
    color: 'from-cyan-500 to-blue-500'
  }
];

const languages = [
  { name: 'Creole', level: 'Nativo', flag: '🇭🇹', proficiency: 'native' },
  { name: 'Francés', level: 'Segundo idioma', flag: '🇫🇷', proficiency: 'fluent' },
  { name: 'Español', level: 'Avanzado', flag: '🇪🇸', proficiency: 'advanced' },
  { name: 'Inglés', level: 'Avanzado', flag: '🇺🇸', proficiency: 'advanced' }
];

const skills = [
  { name: 'Trabajo en equipo', icon: FaUsers, description: 'Colaboración efectiva y liderazgo', color: 'text-blue-400' },
  { name: 'Comunicación', icon: FaComments, description: 'Comunicación clara y asertiva', color: 'text-green-400' },
  { name: 'Resolución de problemas', icon: FaBrain, description: 'Análisis y solución creativa', color: 'text-purple-400' },
  { name: 'Aprendizaje continuo', icon: FaLaptopCode, description: 'Adaptación a nuevas tecnologías', color: 'text-cyan-400' },
  { name: 'Liderazgo', icon: FaRocket, description: 'Guía y motivación de equipos', color: 'text-orange-400' },
  { name: 'Creatividad', icon: FaHeart, description: 'Soluciones innovadoras', color: 'text-pink-400' }
];

const technologies = [
  { name: 'Laravel', color: 'bg-red-500', level: 'Experto', years: '3+ años' },
  { name: 'PHP', color: 'bg-indigo-500', level: 'Avanzado', years: '4+ años' },
  { name: 'React', color: 'bg-cyan-500', level: 'Avanzado', years: '3+ años' },
  { name: 'TypeScript', color: 'bg-blue-500', level: 'Intermedio', years: '2+ años' },
  { name: 'WordPress', color: 'bg-blue-800', level: 'Experto', years: '5+ años' },
  { name: 'Docker', color: 'bg-blue-600', level: 'Intermedio', years: '2+ años' },
  { name: 'Git', color: 'bg-orange-500', level: 'Avanzado', years: '4+ años' },
  { name: 'Tailwind', color: 'bg-teal-500', level: 'Avanzado', years: '2+ años' }
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="about"
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Hero Section - Perfil Principal */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-50" />
            
            <div className="relative z-10 grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Avatar y info básica */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <motion.div
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/assets/DREX.jpeg"
                    alt="Sylvain Drexler"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sylvain Drexler Wilvins</h3>
                <p className="text-cyan-400 font-semibold text-lg mb-4">Full Stack Developer & Systems Analyst</p>
                
                {/* Redes sociales */}
                <div className="flex justify-center lg:justify-start gap-4 mb-6">
                  {[
                    { icon: FaGithub, href: "https://github.com/tuusuario", color: "hover:text-gray-300" },
                    { icon: FaLinkedin, href: "https://linkedin.com/in/tuusuario", color: "hover:text-blue-400" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-2xl text-gray-400 ${social.color} transition-colors p-3 rounded-full border border-gray-600 hover:border-cyan-400`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>

                {/* Botón CV con el mismo estilo */}
                <motion.a
                  href="/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="text-sm" />
                  Descargar CV
                </motion.a>
              </div>

              {/* Descripción y estadísticas */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quote personal */}
                <div className="relative">
                  <FaQuoteLeft className="text-4xl text-cyan-400/30 absolute -top-2 -left-2" />
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed pl-8 italic">
                    "Desarrollador apasionado con más de 5 años de experiencia creando soluciones digitales innovadoras. 
                    Me especializo en transformar ideas complejas en aplicaciones web elegantes y funcionales."
                  </p>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    { number: "5+", label: "Años de Experiencia", icon: FaCalendarAlt },
                    { number: "50+", label: "Proyectos Completados", icon: FaRocket },
                    { number: "25+", label: "Clientes Satisfechos", icon: FaHeart },
                    { number: "100%", label: "Dedicación", icon: FaAward }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-4 bg-white/5 rounded-2xl border border-white/10"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className="text-2xl text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Skills rápidos */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FaLightbulb className="text-cyan-400" />
                    {t('about.softSkills')}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <skill.icon className={`text-lg ${skill.color}`} />
                        <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sección de Idiomas */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaLanguage className="text-cyan-400" />
              {t('about.languages')}
            </h3>
            <p className="text-gray-400">Comunicación multicultural</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{lang.flag}</div>
                <h4 className="text-lg font-bold text-white mb-2">{lang.name}</h4>
                <p className="text-cyan-400 text-sm mb-3">{lang.level}</p>
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
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
              {[
                { key: 'experience', label: t('about.experience'), icon: FaBriefcase },
                { key: 'education', label: t('about.education'), icon: FaGraduationCap }
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'experience' | 'education')}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="text-lg" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-8">
            {(activeTab === 'experience' ? experiences : education).map((item, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 grid lg:grid-cols-4 gap-6 items-start">
                  {/* Icon y período */}
                  <div className="lg:col-span-1 text-center lg:text-left">
                    <div className={`w-16 h-16 mx-auto lg:mx-0 mb-4 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl shadow-xl`}>
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
                    </div>
                  </div>

                  {/* Contenido principal */}
                  <div className="lg:col-span-3 space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">
                        {item.title || item.degree}
                      </h3>
                      <p className="text-cyan-400 font-semibold text-lg">{item.company || item.institution}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{item.description}</p>

                    {/* Tecnologías */}
                    {item.technologies && (
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                          <FaCode className="text-xs" />
                          Tecnologías:
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
                    {item.achievements && (
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <FaAward className="text-xs" />
                          Logros destacados:
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de tecnologías */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaCode className="text-cyan-400" />
              {t('about.techStack')}
            </h3>
            <p className="text-gray-400">Tecnologías y herramientas que domino</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white text-sm sm:text-base">{tech.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    tech.level === 'Experto' ? 'bg-green-500/20 text-green-400' :
                    tech.level === 'Avanzado' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {tech.level}
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${tech.color} opacity-80 mb-2`} />
                <div className="text-xs text-gray-400">{tech.years}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t('about.workTogether')}</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              {t('about.workTogetherDesc')}
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="text-lg" />
              Trabajemos Juntos
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;