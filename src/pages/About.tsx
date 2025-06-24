import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaLanguage,
  FaAward,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaLaptopCode,
  FaBrain,
  FaHeart,
  FaComments,
  FaQuoteLeft,
  FaRocket,
  FaLightbulb,
  FaEye,
  FaHandshake,
  FaBullseye,
  FaCoffee,
  FaMusic,
  FaGamepad,
  FaBook,
  FaCode,
  FaStar,
  FaGlobe,
  FaChartLine
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Datos actualizados con mi experiencia
const experiences = [
  {
    title: 'Desarrollador WordPress',
    company: 'Agencia Tributaria de Misiones (ATM)',
    period: '2024',
    location: 'Misiones, Argentina',
    description: 'Colaboré activamente en el desarrollo de un plugin de calendario de vencimientos y un tema hijo personalizado, trabajando en equipo para mejorar la experiencia de usuario y optimizar la gestión de contenidos institucionales. Mi contribución incluyó el desarrollo del 60% del plugin, demostrando capacidad técnica y trabajo colaborativo efectivo.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    achievements: ['Plugin personalizado implementado', 'Mejora del 50% en UX', 'Trabajo colaborativo exitoso'],
    icon: FaBriefcase,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Web Developer',
    company: 'TSGroup',
    period: 'abr. 2023 - actualidad',
    location: 'Posadas, Misiones',
    description: 'Responsable de la gestión y desarrollo de sitios web corporativos utilizando tecnologías modernas. Trabajo híbrido enfocado en soluciones escalables.',
    technologies: ['PHP', 'JavaScript', 'React', 'Laravel', 'WordPress'],
    achievements: ['5+ sitios web desarrollados', 'Mantenimiento WEB', 'Website Manager'],
    icon: FaBriefcase,
    color: 'from-purple-500 to-pink-500'
  },

  {
    title: 'Desarrollador Freelance',
    company: 'eCommerce & Dropshipping',
    period: '2019 - actualidad',
    location: 'Remoto',
    description: 'Desarrollo de tiendas online y soluciones eCommerce personalizadas, ayudando a negocios a potenciar sus ventas digitales.',
    technologies: ['WooCommerce', 'AliDropship', 'WordPress', 'PHP'],
    achievements: ['10+ tiendas online', 'Aumento promedio del 60% en ventas'],
    icon: FaBriefcase,
    color: 'from-orange-500 to-red-500'
  }
];

const education = [
  {
    degree: 'Analista de Sistemas Informáticos',
    institution: 'Instituto Tecnológico nro.3',
    period: 'mar. 2019 - dic. 2022',
    location: 'Argentina',
    description: 'Formación integral en análisis, diseño y desarrollo de sistemas informáticos, con enfoque en resolución de problemas y optimización de procesos.',
    icon: FaGraduationCap,
    color: 'from-indigo-500 to-purple-500',
    type: 'carrera',
    badge: 'Carrera'
  },
  {
    degree: 'Desarrollo Web Completo',
    institution: 'Udemy',
    period: 'dic. 2021 - mar. 2022',
    location: 'Online',
    description: 'Curso intensivo en HTML5, CSS3, JavaScript, AJAX, PHP y MySQL orientado a la creación de aplicaciones web modernas.',
    icon: FaGraduationCap,
    color: 'from-blue-500 to-indigo-500',
    type: 'curso',
    badge: 'Curso'
  },
  {
    degree: 'Desarrollo Web Completo',
    institution: 'Coderhouse',
    period: 'Finalizado',
    location: 'Online',
    description: 'Capacitación práctica en desarrollo web, desde fundamentos hasta implementación de proyectos reales.',
    icon: FaGraduationCap,
    color: 'from-cyan-500 to-blue-500',
    type: 'curso',
    badge: 'Curso'
  }
];

const languages = [
  { name: 'Creole', level: 'Nativo', flag: '🇭🇹', proficiency: 'native' },
  { name: 'Francés', level: 'Segundo idioma', flag: '🇫🇷', proficiency: 'fluent' },
  { name: 'Español', level: 'Avanzado', flag: '🇪🇸', proficiency: 'advanced' },
  { name: 'Inglés', level: 'Avanzado', flag: '🇺🇸', proficiency: 'advanced' }
];

const softSkills = [
  { name: 'Trabajo en equipo', icon: FaUsers, description: 'Colaboración efectiva y liderazgo', color: 'text-blue-400' },
  { name: 'Comunicación', icon: FaComments, description: 'Comunicación clara y asertiva', color: 'text-green-400' },
  { name: 'Resolución de problemas', icon: FaBrain, description: 'Análisis y solución creativa', color: 'text-purple-400' },
  { name: 'Aprendizaje continuo', icon: FaLaptopCode, description: 'Adaptación a nuevas tecnologías', color: 'text-cyan-400' },
  { name: 'Metodologías ágiles', icon: FaRocket, description: 'Experiencia en entornos colaborativos', color: 'text-orange-400' },
  { name: 'Orientación a resultados', icon: FaChartLine, description: 'Enfoque en soluciones escalables', color: 'text-pink-400' }
];

const personalValues = [
  {
    title: 'Excelencia Técnica',
    description: 'Compromiso con buenas prácticas, rendimiento y calidad del código',
    icon: FaBullseye,
    color: 'text-cyan-400'
  },
  {
    title: 'Innovación Constante',
    description: 'Siempre explorando tecnologías modernas y soluciones escalables',
    icon: FaLightbulb,
    color: 'text-yellow-400'
  },
  {
    title: 'Comunicación Multicultural',
    description: 'Facilitando colaboración eficaz con equipos de diversas culturas',
    icon: FaGlobe,
    color: 'text-green-400'
  },
  {
    title: 'Impacto Real',
    description: 'Enfocado en crear soluciones orientadas a resultados',
    icon: FaEye,
    color: 'text-purple-400'
  }
];

const interests = [
  { name: 'Café de especialidad', icon: FaCoffee, color: 'text-amber-500' },
  { name: 'Rap/Hip-Hop/Deep House', icon: FaMusic, color: 'text-purple-500' },
  { name: 'Gaming', icon: FaGamepad, color: 'text-green-500' },
  { name: 'Lectura técnica', icon: FaBook, color: 'text-blue-500' }
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

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="about"
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
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conoce más sobre mi trayectoria profesional, valores y lo que me motiva como desarrollador
          </p>
        </motion.div>

        {/* Presentación Principal */}
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
            
            <div className="relative z-10">
              {/* Título y subtítulo */}
              <div className="text-center mb-8">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Sylvain Drexler Wilvins
                </h3>
                <div className="space-y-2">
                  <p className="text-xl text-cyan-400 font-semibold">
                    Técnico en Programación & Analista de Sistemas
                  </p>
                  <p className="text-lg text-gray-300">
                    Desarrollador Web Full Stack | Multilingüe | +5 años de experiencia
                  </p>
                </div>
              </div>

              {/* Descripción principal */}
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Soy técnico en programación y analista de sistemas con más de 5 años de experiencia en el desarrollo de 
                  <span className="text-cyan-400 font-semibold"> soluciones web modernas, escalables y orientadas a resultados</span>. 
                  Mi especialidad es el diseño e implementación de aplicaciones web, siempre con enfoque en buenas prácticas, 
                  rendimiento y experiencia del usuario.
                </p>
                
                <p className="text-lg">
                  Trabajo tanto en el <span className="text-blue-400 font-semibold">frontend como en el backend</span>, 
                  integrando APIs, optimizando bases de datos y asegurando la calidad del código en cada etapa del desarrollo. 
                  Tengo experiencia trabajando en entornos colaborativos, metodologías ágiles y adaptándome a distintas 
                  necesidades y sectores.
                </p>
                
                <p className="text-lg">
                  Además, mi <span className="text-green-400 font-semibold">perfil multilingüe</span> (hablo creole haitiano 
                  y francés como lenguas maternas, además de inglés y español avanzados) me permite comunicarme con equipos 
                  y clientes de diversas culturas y regiones, facilitando una colaboración eficaz y fluida.
                </p>
              </div>

              {/* Objetivo profesional */}
              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <FaRocket className="text-2xl text-cyan-400" />
                  <h4 className="text-xl font-bold text-white">Objetivo Profesional</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Seguir creciendo en el campo del desarrollo web y la ingeniería de software, participando en proyectos 
                  desafiantes que impulsen la innovación tecnológica. Estoy comprometido con el aprendizaje continuo y 
                  con aportar soluciones creativas, eficientes y alineadas con los objetivos del cliente o la empresa.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Valores Personales */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaHeart className="text-pink-400" />
              Mis Valores
            </h3>
            <p className="text-gray-400">Los principios que guían mi trabajo</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <value.icon className={`text-4xl ${value.color} mx-auto mb-4`} />
                <h4 className="text-lg font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Habilidades Blandas */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaLightbulb className="text-yellow-400" />
              Habilidades Interpersonales
            </h3>
            <p className="text-gray-400">Competencias que complementan mi expertise técnico</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <skill.icon className={`text-2xl ${skill.color}`} />
                <div>
                  <h4 className="font-semibold text-white">{skill.name}</h4>
                  <p className="text-sm text-gray-400">{skill.description}</p>
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
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaLanguage className="text-cyan-400" />
              Idiomas
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
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
              {[
                { key: 'experience', label: 'Experiencia Profesional', icon: FaBriefcase },
                { key: 'education', label: 'Formación Académica', icon: FaGraduationCap }
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
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
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
                    {'achievements' in item && item.achievements && (
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

        {/* Intereses Personales */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaCoffee className="text-amber-400" />
              Más Allá del Código
            </h3>
            <p className="text-gray-400">Intereses que alimentan mi creatividad</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <interest.icon className={`text-xl ${interest.color}`} />
                <span className="text-gray-300 font-medium">{interest.name}</span>
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
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">¿Trabajamos juntos?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Estoy disponible para nuevos proyectos y colaboraciones. ¡Hablemos sobre tu próxima idea!
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
              Trabajemos Juntos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;