import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaLightbulb, FaStar, FaGithub, FaLinkedin, FaLanguage } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const experiences = [
  {
    title: 'Desarrollador WordPress (ATM Misiones)',
    company: 'Agencia Tributaria de Misiones',
    period: '2024',
    description: 'Desarrollé un plugin de calendario de vencimientos y un tema hijo personalizado para la Agencia Tributaria de Misiones, mejorando la experiencia de usuario y optimizando la gestión de contenidos institucionales.',
    icon: FaCode
  },
  {
    title: 'Web Developer',
    company: 'TSGroup',
    period: 'abr. 2023 - actualidad',
    description: 'Responsable de la gestión y desarrollo de sitios web corporativos utilizando tecnologías como PHP, JavaScript, HTML, CSS, WordPress, React y Laravel. Trabajo híbrido en Posadas, Misiones, Argentina.',
    icon: FaCode
  },
  {
    title: 'Web Designer',
    company: 'Wiltechnology',
    period: 'mar. 2020 - abr. 2023',
    description: 'Diseño y desarrollo de sitios web a medida, creando soluciones digitales personalizadas para clientes de diversos sectores.',
    icon: FaCode
  },
  {
    title: 'Desarrollador Freelance eCommerce & Dropshipping',
    company: 'Freelance',
    period: '2019 - actualidad',
    description: 'Desarrollo de tiendas online y soluciones eCommerce personalizadas con WordPress, WooCommerce y AliDropship, ayudando a negocios a potenciar sus ventas digitales.',
    icon: FaCode
  }
];

const education = [
  {
    degree: 'Tecnicatura en Análisis de Sistemas Informáticos',
    institution: 'Instituto Tecnologico nro.3',
    period: 'mar. 2019 - dic. 2022',
    description: 'Formación integral en análisis, diseño y desarrollo de sistemas informáticos, con enfoque en resolución de problemas y optimización de procesos.',
    icon: FaGraduationCap
  },
  {
    degree: 'Desarrollo Web Completo con HTML5, CSS3, JS, AJAX, PHP y MySQL',
    institution: 'Udemy',
    period: 'dic. 2021 - mar. 2022',
    description: 'Curso intensivo orientado a la creación de aplicaciones web modernas y dinámicas, abarcando tecnologías de frontend y backend.',
    icon: FaGraduationCap
  },
  {
    degree: 'Desarrollo Web Completo',
    institution: 'Coderhouse',
    period: 'Finalizado',
    description: 'Capacitación práctica en desarrollo web, abarcando desde los fundamentos hasta la implementación de proyectos reales.',
    icon: FaGraduationCap
  },
  {
    degree: 'Educación Secundaria (Completa)',
    institution: 'Nouveau Collège Bird (HAITI)',
    period: '2008 - 2015',
    description: 'Fin de estudios secundarios.',
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

// Efecto de halo animado para la foto de perfil
const AnimatedHalo: React.FC<{ isHovering: boolean }> = ({ isHovering }) => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0.25, scale: 1 }}
    animate={{
      opacity: isHovering ? 0.4 : 0.25,
      scale: isHovering ? 1.08 : 1,
      filter: isHovering ? 'blur(8px)' : 'blur(12px)'
    }}
    transition={{ duration: 0.5, type: 'spring' }}
    style={{ zIndex: 1 }}
  >
    <div className="w-52 h-52 rounded-full" style={{
      background: 'radial-gradient(circle, #00fff7 0%, #005bea 100%)',
      filter: 'blur(8px) opacity(0.25)'
    }} />
  </motion.div>
);

// Microinteracciones en chips de tecnologías y soft skills
const TechChip: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <motion.span
    whileHover={{ scale: 1.15, rotate: 6, boxShadow: '0 0 12px #a78bfa88' }}
    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${color} cursor-pointer shadow`}
  >
    {name}
  </motion.span>
);
const SoftSkillChip: React.FC<{ icon: string; name: string }> = ({ icon, name }) => (
  <motion.div
    whileHover={{ scale: 1.12, backgroundColor: '#a78bfa22' }}
    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-800/60 text-gray-300 cursor-pointer shadow"
  >
    <span className="text-lg">{icon}</span>
    <span>{name}</span>
  </motion.div>
);

const About: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-black font-mono" id="about">
      {/* Fondo animado de neón igual al landing/footer */}
      <div className="absolute inset-0 -z-10 animate-gradient-xy" style={{
        background: 'linear-gradient(120deg, #00fff7 0%, #005bea 100%)',
        filter: 'blur(80px) opacity(0.7)'
      }} />
      {/* Partículas y destellos igual al landing/footer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, #00fff7 0%, #005bea 100%)`,
              boxShadow: '0 0 16px 4px #00fff7, 0 0 32px 8px #005bea',
              opacity: 0.7
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
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
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] mb-6 drop-shadow-[0_0_24px_#00fff7]">
            {t('about.title', 'Sobre mí')}
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] mx-auto rounded-full animate-pulse" />
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
            {/* Profile Card mejorada */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#00fff7]/30">
                <div className="flex flex-col items-center">
                  <div className="relative w-52 h-52 flex items-center justify-center mb-6"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <AnimatedHalo isHovering={isHovering} />
                    <motion.div
                      className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#00fff7] shadow-[0_0_12px_2px_#00fff7,0_0_24px_4px_#005bea] bg-black relative z-10"
                      animate={{ scale: isHovering ? 1.12 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <img
                        src="/assets/DREX.jpeg"
                        alt="Foto de perfil de Sylvain Drexler"
                        className="object-cover w-full h-full transition-transform duration-300"
                      />
                    </motion.div>
                  </div>
                  <h1 className="text-3xl font-bold text-[#00fff7] mb-2 text-center drop-shadow-[0_0_8px_#00fff7]">Sylvain Drexler Wilvins</h1>
                  <h2 className="text-xl font-semibold text-[#005bea] mb-4 text-center">Desarrollador Web & Analista en Sistemas</h2>
                  <p className="text-[#bdbdbd] leading-relaxed text-center mb-6">
                    ¡Hola! Soy un apasionado Desarrollador Web Senior y Analista en Sistemas con más de 5 años de experiencia creando soluciones digitales innovadoras para empresas y organizaciones. Me especializo en el desarrollo de aplicaciones web modernas, optimización de procesos y consultoría tecnológica, combinando creatividad, eficiencia y visión estratégica para impulsar el crecimiento digital.
                  </p>
                  <div className="flex gap-4">
                    <motion.a
                      href="https://github.com/tuusuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-[#00fff7] hover:text-[#005bea] transition-colors shadow-[0_0_8px_#00fff7] rounded-full p-2 border-2 border-[#00fff7] hover:border-[#005bea]"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/tuusuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-[#005bea] hover:text-[#00fff7] transition-colors shadow-[0_0_8px_#005bea] rounded-full p-2 border-2 border-[#005bea] hover:border-[#00fff7]"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            {/* Skills Grid mejorada */}
            <div className="grid grid-cols-2 gap-4 min-h-[220px]">
              {/* Languages */}
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 h-full" />
                <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-6 h-full shadow-xl border border-[#00fff7]/30">
                  <h3 className="text-xl font-bold text-[#00fff7] mb-4 flex items-center gap-3">
                    <FaLanguage className="text-[#005bea]" /> Idiomas
                  </h3>
                  <div className="space-y-2">
                    {languages.map(lang => (
                      <div key={lang.name} className="flex justify-between items-center">
                        <span className="text-[#bdbdbd]">{lang.name}</span>
                        <span className="text-[#00fff7] text-sm">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Soft Skills mejoradas */}
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 h-full" />
                <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-6 h-full shadow-xl border border-[#00fff7]/30">
                  <h3 className="text-xl font-bold text-[#00fff7] mb-4 flex items-center gap-3">
                    <FaLightbulb className="text-[#005bea]" /> Soft Skills
                  </h3>
                  <div className="space-y-2">
                    {softSkills.map(skill => (
                      <SoftSkillChip key={skill.name} icon={skill.icon} name={skill.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Education Timeline - glassmorphism */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#00fff7]/30">
                <h3 className="text-3xl font-bold text-[#00fff7] mb-8 flex items-center gap-3">
                  <FaGraduationCap className="text-[#005bea]" />
                  Educación
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 border-l-2 border-[#00fff7]/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00fff7] animate-pulse" />
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: '0 0 12px #00fff788' }}
                        className="bg-black/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 shadow border border-[#00fff7]/10"
                      >
                        <h4 className="text-xl font-bold text-[#00fff7] mb-2">{edu.degree}</h4>
                        <p className="text-[#005bea] font-medium text-lg">{edu.institution}</p>
                        <p className="text-[#bdbdbd] text-sm">{edu.period}</p>
                        {edu.description && (
                          <p className="text-[#bdbdbd] mt-2">{edu.description}</p>
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
            {/* Experience Timeline glassmorphism */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#00fff7]/30">
                <h3 className="text-3xl font-bold text-[#00fff7] mb-8 flex items-center gap-3">
                  <FaBriefcase className="text-[#005bea]" />
                  Experiencia
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 border-l-2 border-[#00fff7]/30"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00fff7] animate-pulse" />
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: '0 0 12px #00fff788' }}
                        className="bg-black/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 shadow border border-[#00fff7]/10"
                      >
                        <h4 className="text-xl font-bold text-[#00fff7] mb-2">{exp.title}</h4>
                        <p className="text-[#005bea] font-medium text-lg">{exp.company}</p>
                        <p className="text-[#bdbdbd] text-sm mb-3">{exp.period}</p>
                        <p className="text-[#bdbdbd]">{exp.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            {/* Technologies Box mejorada */}
            <div className="relative group flex-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 h-full" />
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center justify-center shadow-2xl border border-[#00fff7]/30">
                <h3 className="text-2xl font-bold text-[#00fff7] mb-4 flex items-center gap-3">
                  <FaCode className="text-[#005bea]" /> Tecnologías
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {techs.map(tech => (
                    <TechChip key={tech.name} name={tech.name} color={tech.color} />
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