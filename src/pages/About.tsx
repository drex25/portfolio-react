import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaLightbulb } from 'react-icons/fa';

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
  return (
    <section className="py-20 max-w-6xl mx-auto px-4" id="about">
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
          Sobre mí
        </h2>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left column - Summary and Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary-500">
              <FaLightbulb className="text-primary-500" />
              Resumen
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Soy un desarrollador apasionado por la tecnología y la creación de soluciones digitales. 
              Tengo experiencia en desarrollo web y móvil, trabajando con tecnologías modernas y buenas prácticas. 
              Me gusta aprender y enfrentar nuevos desafíos.
            </p>
          </div>

          {/* Technologies */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary-500">
              <FaCode className="text-primary-500" />
              Tecnologías
            </h3>
            <div className="flex flex-wrap gap-3">
              {techs.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`${tech.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary-500">
              <FaLightbulb className="text-primary-500" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column - Experience and Education */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Experience */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-primary-500">
              <FaBriefcase className="text-primary-500" />
              Experiencia
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-primary-500/30"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500" />
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-primary-500 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.period}</p>
                    <p className="text-gray-700 dark:text-gray-200">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-primary-500">
              <FaGraduationCap className="text-primary-500" />
              Educación
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                >
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-primary-500 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 