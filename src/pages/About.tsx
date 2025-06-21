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
  FaCalendarAlt
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
  { name: 'Creole', level: 'Nativo', percentage: 100, flag: '🇭🇹' },
  { name: 'Francés', level: 'Segundo idioma', percentage: 95, flag: '🇫🇷' },
  { name: 'Español', level: 'Avanzado', percentage: 90, flag: '🇪🇸' },
  { name: 'Inglés', level: 'Avanzado', percentage: 85, flag: '🇺🇸' }
];

const skills = [
  { name: 'Trabajo en equipo', icon: '👥', description: 'Colaboración efectiva' },
  { name: 'Comunicación', icon: '💬', description: 'Comunicación clara y asertiva' },
  { name: 'Resolución de problemas', icon: '🔧', description: 'Análisis y solución creativa' },
  { name: 'Aprendizaje continuo', icon: '📚', description: 'Adaptación a nuevas tecnologías' },
  { name: 'Liderazgo', icon: '🚀', description: 'Guía y motivación de equipos' },
  { name: 'Creatividad', icon: '🎨', description: 'Soluciones innovadoras' }
];

const technologies = [
  { name: 'Laravel', color: 'bg-red-500', level: 90 },
  { name: 'PHP', color: 'bg-indigo-500', level: 85 },
  { name: 'React', color: 'bg-cyan-500', level: 88 },
  { name: 'TypeScript', color: 'bg-blue-500', level: 82 },
  { name: 'WordPress', color: 'bg-blue-800', level: 95 },
  { name: 'Docker', color: 'bg-blue-600', level: 75 },
  { name: 'Git', color: 'bg-orange-500', level: 80 },
  { name: 'Tailwind', color: 'bg-teal-500', level: 90 }
];

// Componente de Timeline mejorado
const TimelineItem: React.FC<{ 
  item: any; 
  index: number; 
  isLeft?: boolean;
  type: 'experience' | 'education';
}> = ({ item, index, isLeft = false, type }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Contenido */}
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Header */}
          <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'flex-row-reverse text-right' : ''}`}>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
              <item.icon className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{item.title || item.degree}</h3>
              <p className="text-cyan-400 font-semibold">{item.company || item.institution}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-xs" />
                  {item.period}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

          {/* Tecnologías */}
          {item.technologies && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Tecnologías:</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-xs font-medium"
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
              <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                <FaAward className="text-xs" />
                Logros:
              </h4>
              <ul className="space-y-1">
                {item.achievements.map((achievement: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>

      {/* Línea central con punto */}
      <div className="w-2/12 flex justify-center">
        <div className="relative">
          <motion.div
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg border-4 border-slate-900 z-10 relative`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          />
          <motion.div
            className={`absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r ${item.color} animate-ping opacity-75`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.75 } : {}}
            transition={{ delay: index * 0.1 + 0.5 }}
          />
        </div>
      </div>

      {/* Espacio vacío */}
      <div className="w-5/12" />
    </motion.div>
  );
};

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
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conoce más sobre mi trayectoria profesional, formación académica y las habilidades que me definen como desarrollador.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Columna izquierda - Perfil */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Tarjeta de perfil */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 sticky top-8">
              <div className="text-center mb-8">
                <motion.div
                  className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/assets/DREX.jpeg"
                    alt="Sylvain Drexler"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Sylvain Drexler Wilvins</h3>
                <p className="text-cyan-400 font-semibold mb-4">Full Stack Developer & Systems Analyst</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Desarrollador apasionado con más de 5 años de experiencia creando soluciones digitales innovadoras.
                </p>
              </div>

              {/* Redes sociales */}
              <div className="flex justify-center gap-4 mb-8">
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

              {/* Idiomas */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaLanguage className="text-cyan-400" />
                  Idiomas
                </h4>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 flex items-center gap-2">
                          <span className="text-lg">{lang.flag}</span>
                          {lang.name}
                        </span>
                        <span className="text-cyan-400 text-sm">{lang.level}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaLightbulb className="text-cyan-400" />
                  Habilidades Blandas
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="bg-white/5 rounded-lg p-3 text-center border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="text-2xl mb-2">{skill.icon}</div>
                      <div className="text-xs text-gray-300 font-medium">{skill.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - Timeline */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
                {[
                  { key: 'experience', label: 'Experiencia', icon: FaBriefcase },
                  { key: 'education', label: 'Educación', icon: FaGraduationCap }
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'experience' | 'education')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tab.icon className="text-lg" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Línea central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 h-full rounded-full opacity-30" />
              
              {/* Items */}
              <div className="space-y-0">
                {(activeTab === 'experience' ? experiences : education).map((item, index) => (
                  <TimelineItem
                    key={`${activeTab}-${index}`}
                    item={item}
                    index={index}
                    isLeft={index % 2 === 1}
                    type={activeTab}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección de tecnologías */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaCode className="text-cyan-400" />
              Stack Tecnológico
            </h3>
            <p className="text-gray-400">Tecnologías y herramientas que domino</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="text-cyan-400 text-sm font-bold">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`${tech.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;