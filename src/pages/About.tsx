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
  FaComments
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
  { name: 'Laravel', color: 'bg-red-500', level: 'Experto' },
  { name: 'PHP', color: 'bg-indigo-500', level: 'Avanzado' },
  { name: 'React', color: 'bg-cyan-500', level: 'Avanzado' },
  { name: 'TypeScript', color: 'bg-blue-500', level: 'Intermedio' },
  { name: 'WordPress', color: 'bg-blue-800', level: 'Experto' },
  { name: 'Docker', color: 'bg-blue-600', level: 'Intermedio' },
  { name: 'Git', color: 'bg-orange-500', level: 'Avanzado' },
  { name: 'Tailwind', color: 'bg-teal-500', level: 'Avanzado' }
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
      className={`flex items-center mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Contenido */}
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Header */}
          <div className={`flex items-start gap-4 mb-6 relative z-10 ${isLeft ? 'flex-row-reverse text-right' : ''}`}>
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} shadow-xl`}>
              <item.icon className="text-white text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title || item.degree}
              </h3>
              <p className="text-cyan-400 font-semibold text-lg">{item.company || item.institution}</p>
              <div className="flex items-center gap-6 text-sm text-gray-400 mt-3">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-xs" />
                  {item.period}
                </span>
                {item.location && (
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-xs" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-gray-300 mb-6 leading-relaxed text-lg relative z-10">{item.description}</p>

          {/* Tecnologías */}
          {item.technologies && (
            <div className="mb-6 relative z-10">
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
            <div className="relative z-10">
              <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                <FaAward className="text-xs" />
                Logros destacados:
              </h4>
              <ul className="space-y-2">
                {item.achievements.map((achievement: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
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
            className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} shadow-xl border-4 border-slate-900 z-10 relative`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          />
          <motion.div
            className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${item.color} animate-ping opacity-75`}
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
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

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
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
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
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 sticky top-8">
              <div className="text-center mb-8">
                <motion.div
                  className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl"
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
                  {t('about.languages')}
                </h4>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="text-white font-medium">{lang.name}</div>
                          <div className="text-cyan-400 text-sm">{lang.level}</div>
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaLightbulb className="text-cyan-400" />
                  {t('about.softSkills')}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <skill.icon className={`text-2xl mb-2 mx-auto ${skill.color}`} />
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
                  { key: 'experience', label: t('about.experience'), icon: FaBriefcase },
                  { key: 'education', label: t('about.education'), icon: FaGraduationCap }
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'experience' | 'education')}
                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 ${
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
              {t('about.techStack')}
            </h3>
            <p className="text-gray-400">Tecnologías y herramientas que domino</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tech.level === 'Experto' ? 'bg-green-500/20 text-green-400' :
                    tech.level === 'Avanzado' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {tech.level}
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${tech.color} opacity-80`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;