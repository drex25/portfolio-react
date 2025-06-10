import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaLightbulb, FaStar, FaChevronDown } from 'react-icons/fa';

const experiences = [
  {
    title: 'Desarrollador Full Stack',
    company: 'Empresa Tech',
    period: '2022 - Presente',
    description: 'Desarrollo de aplicaciones web modernas con React, Laravel y Docker.',
    icon: FaCode
  },
  {
    title: 'Desarrollador Frontend',
    company: 'Startup Web',
    period: '2020 - 2022',
    description: 'Implementación de interfaces responsivas y animadas con React y Tailwind.',
    icon: FaCode
  }
];

const education = [
  {
    degree: 'Lic. en Sistemas',
    institution: 'Universidad X',
    period: '2017 - 2021',
    icon: FaGraduationCap
  }
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
  { name: 'Git', color: 'bg-orange-500' }
];

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 max-w-6xl mx-auto px-4 relative overflow-hidden" id="about">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-300/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 dark:from-primary-400 dark:via-primary-300 dark:to-primary-200">
          Sobre mí
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto rounded-full" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-12 items-start"
      >
        {/* Left column - Summary and Skills */}
        <motion.div
          variants={itemVariants}
          className="space-y-8"
        >
          {/* Enhanced Summary */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary-500">
              <FaLightbulb className="text-primary-500 text-2xl" />
              Resumen
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
              Soy un desarrollador apasionado por la tecnología y la creación de soluciones digitales. 
              Tengo experiencia en desarrollo web y móvil, trabajando con tecnologías modernas y buenas prácticas. 
              Me gusta aprender y enfrentar nuevos desafíos.
            </p>
          </motion.div>

          {/* Enhanced Technologies */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-primary-500">
              <FaCode className="text-primary-500 text-2xl" />
              Tecnologías
            </h3>
            <div className="flex flex-wrap gap-3">
              {techs.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${tech.color} text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Soft Skills */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-primary-500">
              <FaLightbulb className="text-primary-500 text-2xl" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-500), 0.1)" }}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column - Experience and Education */}
        <motion.div
          variants={itemVariants}
          className="space-y-8"
        >
          {/* Enhanced Experience */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-primary-500">
              <FaBriefcase className="text-primary-500 text-2xl" />
              Experiencia
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  whileHover={{ scale: 1.02 }}
                  className="relative pl-8 border-l-2 border-primary-500/30"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 animate-pulse" />
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(var(--primary-500), 0.05)" }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transition-colors duration-300"
                  >
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{exp.title}</h4>
                    <p className="text-primary-500 font-medium text-lg">{exp.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{exp.period}</p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{exp.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Education */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-primary-500">
              <FaGraduationCap className="text-primary-500 text-2xl" />
              Educación
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{edu.degree}</h4>
                  <p className="text-primary-500 font-medium text-lg">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 