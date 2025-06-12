import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaLightbulb, FaStar, FaGithub, FaLinkedin, FaLanguage } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const experiences = [
  {
    title: 'Web Developer',
    company: 'TSGroup',
    period: 'abr. 2023 - actualidad',
    description: 'Gestión y desarrollo de sitios web corporativos. Tecnologías: PHP, JavaScript, HTML, CSS, WordPress, React, Laravel. Trabajo híbrido en Posadas, Misiones, Argentina.',
    icon: FaCode
  },
  {
    title: 'Web Designer',
    company: 'Wiltechnology',
    period: 'mar. 2020 - abr. 2023',
    description: 'Creación y diseño de sitios web a medida para clientes. Desarrollo de soluciones personalizadas.',
    icon: FaCode
  },
  {
    title: 'Desarrollador WordPress (ATM Misiones)',
    company: 'Agencia Tributaria de Misiones',
    period: '2024',
    description: 'Desarrollo de un plugin de calendario de vencimientos y un tema hijo de Divi para personalizar y optimizar la web institucional de la Agencia Tributaria de Misiones, mejorando la experiencia de usuario y la gestión de contenidos.',
    icon: FaCode
  },
  {
    title: 'Desarrollador Freelance eCommerce & Dropshipping',
    company: 'Freelance',
    period: '2019 - actualidad',
    description: 'Desarrollo de múltiples sitios eCommerce y tiendas de dropshipping para clientes, utilizando WordPress, WooCommerce y AliDropship. Implementación de soluciones personalizadas para que negocios puedan vender sus productos online de forma eficiente y profesional.',
    icon: FaCode
  }
];

const education = [
  {
    degree: 'Educación Secundaria (Completa)',
    institution: 'Nouveau Collège Bird (HAITI)',
    period: '2008 - 2015',
    description: 'Desarrollador Web',
    icon: FaGraduationCap
  },
  {
    degree: 'Desarrollo Web Completo con HTML5, CSS3, JS, AJAX, PHP y MySQL',
    institution: 'Coderhouse',
    period: 'dic. 2021 - mar. 2022',
    icon: FaGraduationCap
  },
  {
    degree: 'Desarrollo Web Completo',
    institution: 'Udemy',
    period: 'Finalizado',
    icon: FaGraduationCap
  },
  {
    degree: 'Tecnicatura, Análisis de sistemas informáticos/Analista',
    institution: 'Instituto Tecnologico nro.3',
    period: 'mar. 2019 - dic. 2022',
    icon: FaGraduationCap
  }
];

const languages = [
  { name: 'Creole', level: 'Nativo' },
  { name: 'Francés', level: 'Segundo idioma' },
  { name: 'Inglés', level: 'Avanzado' },
  { name: 'Español', level: 'Avanzado' }
];

const softSkills = [
  { name: 'Trabajo en equipo', icon: '👥' },
  { name: 'Comunicación', icon: '💬' },
  { name: 'Resolución de problemas', icon: '🔧' },
  { name: 'Aprendizaje continuo', icon: '📚' },
  { name: 'Proactividad', icon: '🚀' }
];

const techs = [
  { name: 'Laravel', color: 'bg-red-500' },
  { name: 'PHP', color: 'bg-blue-500' },
  { name: 'React', color: 'bg-cyan-500' },
  { name: 'React Native', color: 'bg-blue-400' },
  { name: 'Tailwind', color: 'bg-teal-500' },
  { name: 'Docker', color: 'bg-blue-600' },
  { name: 'Git', color: 'bg-orange-500' },
  { name: 'WordPress', color: 'bg-blue-800' }
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-black" id="about">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 mb-6">
            {t('about.title', 'Sobre mí')}
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 mx-auto rounded-full" />
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Profile and Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src="/assets/DREX.jpeg"
                      alt="Foto de perfil de Sylvain Drexler"
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                  <h1 className="text-3xl font-bold text-white mb-2 text-center">Sylvain Drexler Wilvins</h1>
                  <h2 className="text-xl font-semibold text-purple-400 mb-4 text-center">Web Developer & Analista de Sistemas</h2>
                  <p className="text-gray-300 leading-relaxed text-center mb-6">
                    ¡Hola! Soy un técnico en programación y analista de sistemas con más de 5 años de experiencia en el desarrollo web.
                  </p>
                  <div className="flex gap-4">
                    <motion.a
                      href="https://github.com/tuusuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-gray-400 hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/tuusuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-gray-400 hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4 min-h-[220px]">
              {/* Languages */}
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 h-full" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <FaLanguage className="text-purple-400" /> Idiomas
                  </h3>
                  <div className="space-y-2">
                    {languages.map(lang => (
                      <div key={lang.name} className="flex justify-between items-center">
                        <span className="text-gray-300">{lang.name}</span>
                        <span className="text-purple-400 text-sm">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 h-full" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <FaLightbulb className="text-purple-400" /> Soft Skills
                  </h3>
                  <div className="space-y-2">
                    {softSkills.map(skill => (
                      <div key={skill.name} className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Timeline - moved here */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <FaGraduationCap className="text-purple-400" />
                  Educación
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 border-l-2 border-purple-500/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300"
                      >
                        <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                        <p className="text-purple-400 font-medium text-lg">{edu.institution}</p>
                        <p className="text-gray-400 text-sm">{edu.period}</p>
                        {edu.description && (
                          <p className="text-gray-300 mt-2">{edu.description}</p>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Experience only */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 h-full flex flex-col"
          >
            {/* Experience Timeline */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <FaBriefcase className="text-purple-400" />
                  Experiencia
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 border-l-2 border-purple-500/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300"
                      >
                        <h4 className="text-xl font-bold text-white mb-2">{exp.title}</h4>
                        <p className="text-purple-400 font-medium text-lg">{exp.company}</p>
                        <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
                        <p className="text-gray-300">{exp.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technologies Box */}
            <div className="relative group flex-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 h-full" />
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 h-full flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaCode className="text-purple-400" /> Tecnologías
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {techs.map(tech => (
                    <span key={tech.name} className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${tech.color}`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 