import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload, 
  FaPrint, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLanguage,
  FaAward,
  FaStar,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaUsers,
  FaComments,
  FaBrain,
  FaLaptopCode,
  FaRocket,
  FaChartLine
} from 'react-icons/fa';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiLaravel, 
  SiPhp, 
  SiDocker, 
  SiGit,
  SiWordpress,
  SiJavascript,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiBootstrap
} from 'react-icons/si';
import { getContactEmail } from '../config/environment';

const CV: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);

  // Datos del CV actualizados y sincronizados
  const personalInfo = {
    name: "Sylvain Drexler Wilvins",
    title: "Técnico en Programación & Analista de Sistemas",
    subtitle: "Desarrollador Web Full Stack | Multilingüe | +5 años de experiencia",
    email: getContactEmail(),
    phone: "+54 376 511-5897",
    location: "Posadas, Misiones, Argentina",
    website: "https://itsdrex.dev",
    github: "https://github.com/drex25",
    linkedin: "https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/"
  };

  const summary = "Técnico en programación y analista de sistemas con más de 5 años de experiencia en el desarrollo de soluciones web modernas, escalables y orientadas a resultados. Mi especialidad es el diseño e implementación de aplicaciones web, siempre con enfoque en buenas prácticas, rendimiento y experiencia del usuario. Trabajo tanto en el frontend como en el backend, integrando APIs, optimizando bases de datos y asegurando la calidad del código en cada etapa del desarrollo. Mi perfil multilingüe me permite comunicarme con equipos y clientes de diversas culturas y regiones, facilitando una colaboración eficaz y fluida.";

  const objective = "Seguir creciendo en el campo del desarrollo web y la ingeniería de software, participando en proyectos desafiantes que impulsen la innovación tecnológica. Estoy comprometido con el aprendizaje continuo y con aportar soluciones creativas, eficientes y alineadas con los objetivos del cliente o la empresa.";

  const experiences = [
    {
      title: "Desarrollador WordPress",
      company: "Agencia Tributaria de Misiones (ATM)",
      period: "2024",
      location: "Misiones, Argentina",
      description: "Desarrollé un plugin de calendario de vencimientos y un tema hijo personalizado, mejorando la experiencia de usuario y optimizando la gestión de contenidos institucionales.",
      achievements: [
        "Implementación de plugin personalizado para calendario de vencimientos",
        "Desarrollo de tema hijo optimizado para WordPress",
        "Mejora del 40% en la experiencia de usuario",
        "Optimización de la gestión de contenidos institucionales"
      ]
    },
    {
      title: "Web Developer",
      company: "TSGroup",
      period: "abr. 2023 - actualidad",
      location: "Posadas, Misiones",
      description: "Responsable de la gestión y desarrollo de sitios web corporativos utilizando tecnologías modernas. Trabajo híbrido enfocado en soluciones escalables.",
      achievements: [
        "Desarrollo de 15+ sitios web corporativos",
        "Implementación de pipelines CI/CD",
        "Optimización de rendimiento web (mejora del 60%)",
        "Liderazgo técnico en proyectos de gran escala"
      ]
    },
    {
      title: "Web Designer",
      company: "Wiltechnology",
      period: "mar. 2020 - abr. 2023",
      location: "Remoto",
      description: "Diseño y desarrollo de sitios web a medida, creando soluciones digitales personalizadas para clientes de diversos sectores.",
      achievements: [
        "Completé 30+ proyectos web exitosos",
        "Alcancé 98% de satisfacción del cliente",
        "Implementé diseños responsive y accesibles",
        "Desarrollé sistema de gestión de proyectos interno"
      ]
    },
    {
      title: "Desarrollador Freelance",
      company: "eCommerce & Dropshipping",
      period: "2019 - actualidad",
      location: "Remoto",
      description: "Desarrollo de tiendas online y soluciones eCommerce personalizadas, ayudando a negocios a potenciar sus ventas digitales.",
      achievements: [
        "Creación de 25+ tiendas online exitosas",
        "Aumento promedio del 60% en ventas de clientes",
        "Integración con múltiples pasarelas de pago",
        "Desarrollo de sistemas de gestión de inventario"
      ]
    }
  ];

  const education = [
    {
      degree: "Tecnicatura en Análisis de Sistemas Informáticos",
      institution: "Instituto Tecnológico nro.3",
      period: "mar. 2019 - dic. 2022",
      location: "Argentina",
      description: "Formación integral en análisis, diseño y desarrollo de sistemas informáticos, con enfoque en resolución de problemas y optimización de procesos."
    },
    {
      degree: "Desarrollo Web Completo",
      institution: "Udemy",
      period: "dic. 2021 - mar. 2022",
      location: "Online",
      description: "Curso intensivo en HTML5, CSS3, JavaScript, AJAX, PHP y MySQL orientado a la creación de aplicaciones web modernas."
    },
    {
      degree: "Desarrollo Web Completo",
      institution: "Coderhouse",
      period: "Finalizado",
      location: "Online",
      description: "Capacitación práctica en desarrollo web, desde fundamentos hasta implementación de proyectos reales."
    }
  ];

  const skills = [
    { name: 'HTML5', icon: <SiHtml5 />, level: 'Experto', color: 'text-orange-500', experience: '5+ años' },
    { name: 'CSS3', icon: <SiCss3 />, level: 'Avanzado', color: 'text-blue-500', experience: '5+ años' },
    { name: 'JavaScript', icon: <SiJavascript />, level: 'Avanzado', color: 'text-yellow-500', experience: '4+ años' },
    { name: 'TypeScript', icon: <SiTypescript />, level: 'Principiante', color: 'text-blue-500', experience: '1 año' },
    { name: 'React', icon: <SiReact />, level: 'Principiante', color: 'text-cyan-400', experience: '1 año' },
    { name: 'Bootstrap', icon: <SiBootstrap />, level: 'Avanzado', color: 'text-purple-500', experience: '4+ años' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 'Intermedio', color: 'text-teal-400', experience: '2 años' },
    { name: 'PHP', icon: <SiPhp />, level: 'Avanzado', color: 'text-indigo-400', experience: '4+ años' },
    { name: 'Laravel', icon: <SiLaravel />, level: 'Avanzado', color: 'text-red-500', experience: '3+ años' },
    { name: 'MySQL', icon: <SiMysql />, level: 'Avanzado', color: 'text-blue-600', experience: '4+ años' },
    { name: 'WordPress', icon: <SiWordpress />, level: 'Experto', color: 'text-blue-800', experience: '5+ años' },
    { name: 'Docker', icon: <SiDocker />, level: 'Principiante', color: 'text-blue-400', experience: '1 año' },
    { name: 'Git', icon: <SiGit />, level: 'Avanzado', color: 'text-orange-500', experience: '2 años' }
  ];

  const languages = [
    { name: 'Creole', level: 'Nativo', flag: '🇭🇹', proficiency: 'native' },
    { name: 'Francés', level: 'Segundo idioma', flag: '🇫🇷', proficiency: 'fluent' },
    { name: 'Español', level: 'Avanzado', flag: '🇪🇸', proficiency: 'advanced' },
    { name: 'Inglés', level: 'Avanzado', flag: '🇺🇸', proficiency: 'advanced' }
  ];

  const softSkills = [
    { name: 'Trabajo en equipo', icon: FaUsers, description: 'Colaboración efectiva y liderazgo' },
    { name: 'Comunicación', icon: FaComments, description: 'Comunicación clara y asertiva' },
    { name: 'Resolución de problemas', icon: FaBrain, description: 'Análisis y solución creativa' },
    { name: 'Aprendizaje continuo', icon: FaLaptopCode, description: 'Adaptación a nuevas tecnologías' },
    { name: 'Metodologías ágiles', icon: FaRocket, description: 'Experiencia en entornos colaborativos' },
    { name: 'Orientación a resultados', icon: FaChartLine, description: 'Enfoque en soluciones escalables' }
  ];

  const projects = [
    {
      name: "Sistema Integral de RRHH",
      description: "Suite integral para la gestión de recursos humanos con automatización de procesos",
      technologies: ["Laravel", "Tailwind CSS", "MySQL", "Docker"],
      url: "http://200.58.106.198:8000/"
    },
    {
      name: "Tasa Turística Misiones",
      description: "Plataforma oficial para la gestión y declaración de la tasa turística en Misiones",
      technologies: ["Laravel", "Tailwind CSS", "MySQL", "Docker"],
      url: "https://turismo.atmisiones.gob.ar/"
    },
    {
      name: "ATM Misiones - Portal Tributario",
      description: "Portal web oficial de la Agencia Tributaria de Misiones con plugin personalizado",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS", "MySQL"],
      url: "https://atmisiones.gob.ar/"
    },
    {
      name: "Contribumed - Servicio Médico",
      description: "Portal web de servicio médico integral con atención 24/7 y video-consultas",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS", "MySQL"],
      url: "https://contribumed.com"
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      {/* Controles de acción */}
      <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50 flex flex-col gap-3 print:hidden">
        <motion.button
          onClick={handleDownload}
          className="p-2 sm:p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Descargar PDF"
        >
          <FaDownload className="text-sm sm:text-lg" />
        </motion.button>
        <motion.button
          onClick={handlePrint}
          className="p-2 sm:p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Imprimir"
        >
          <FaPrint className="text-sm sm:text-lg" />
        </motion.button>
      </div>

      {/* CV Container */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          ref={cvRef}
          className="bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl flex-shrink-0">
                <img 
                  src="/assets/DREX.jpeg" 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </h1>
                <h2 className="text-lg sm:text-xl text-cyan-300 mb-2 font-semibold">
                  {personalInfo.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  {personalInfo.subtitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <FaEnvelope className="text-cyan-400" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <FaPhone className="text-cyan-400" />
                    <span>{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <FaExternalLinkAlt className="text-cyan-400" />
                    <span>{personalInfo.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* Resumen Profesional */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaStar className="text-cyan-500" />
                Resumen Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                {summary}
              </p>
            </section>

            {/* Objetivo Profesional */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRocket className="text-cyan-500" />
                Objetivo Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                {objective}
              </p>
            </section>

            {/* Experiencia Laboral */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaBriefcase className="text-cyan-500" />
                Experiencia Laboral
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-cyan-500 pl-4 sm:pl-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">{exp.title}</h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <FaCalendarAlt />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <div className="text-cyan-600 font-semibold mb-1 text-sm sm:text-base">{exp.company}</div>
                    <div className="text-gray-600 text-xs sm:text-sm mb-3 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {exp.location}
                    </div>
                    <p className="text-gray-700 mb-3 text-justify text-sm sm:text-base">{exp.description}</p>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Logros destacados:</h5>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs sm:text-sm">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Educación */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-cyan-500" />
                Educación
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 sm:pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-base sm:text-lg font-bold text-gray-800">{edu.degree}</h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <FaCalendarAlt />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    <div className="text-blue-600 font-semibold mb-1 text-sm sm:text-base">{edu.institution}</div>
                    <div className="text-gray-600 text-xs sm:text-sm mb-2 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {edu.location}
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm text-justify">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Habilidades Técnicas */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCode className="text-cyan-500" />
                Habilidades Técnicas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className={`text-xl sm:text-2xl mb-2 ${skill.color}`}>
                      {skill.icon}
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm">{skill.name}</div>
                    <div className="text-xs text-gray-600">{skill.level}</div>
                    <div className="text-xs text-gray-500">{skill.experience}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Habilidades Interpersonales */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaUsers className="text-cyan-500" />
                Habilidades Interpersonales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <skill.icon className="text-xl text-cyan-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{skill.name}</div>
                      <div className="text-xs text-gray-600">{skill.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Proyectos Destacados */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaAward className="text-cyan-500" />
                Proyectos Destacados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">{project.name}</h4>
                    <p className="text-gray-700 text-xs sm:text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-cyan-600 text-xs font-medium break-all">{project.url}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Idiomas */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaLanguage className="text-cyan-500" />
                Idiomas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {languages.map((lang, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-2xl mb-2">{lang.flag}</div>
                    <div className="font-semibold text-gray-800 text-sm">{lang.name}</div>
                    <div className="text-xs text-gray-600">{lang.level}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Redes Sociales */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaExternalLinkAlt className="text-cyan-500" />
                Enlaces Profesionales
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaLinkedin className="text-blue-600" />
                  <span className="text-xs sm:text-sm break-all">{personalInfo.linkedin}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaGithub className="text-gray-800" />
                  <span className="text-xs sm:text-sm break-all">{personalInfo.github}</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      {/* Estilos para impresión */}
      <style jsx>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default CV;