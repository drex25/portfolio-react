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
  FaExternalLinkAlt
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
  SiMysql
} from 'react-icons/si';

const CV: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);

  // Datos del CV - Centralizados para fácil actualización
  const personalInfo = {
    name: "Sylvain Drexler Wilvins",
    title: "Full Stack Developer & Systems Analyst",
    email: "sylvain.drexler@email.com",
    phone: "+54 376 123-4567",
    location: "Posadas, Misiones, Argentina",
    linkedin: "linkedin.com/in/sylvain-drexler",
    github: "github.com/sylvain-drexler",
    website: "itsdrex.dev"
  };

  const summary = "Desarrollador Full Stack apasionado con más de 5 años de experiencia en la creación de aplicaciones web modernas y escalables. Especializado en React, Laravel, PHP y tecnologías de vanguardia. Comprometido con la excelencia técnica, la innovación y la entrega de soluciones que generen impacto real en los usuarios y negocios.";

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
    { name: "React", icon: <SiReact />, level: "Avanzado", color: "text-cyan-400" },
    { name: "TypeScript", icon: <SiTypescript />, level: "Intermedio", color: "text-blue-500" },
    { name: "Laravel", icon: <SiLaravel />, level: "Avanzado", color: "text-red-500" },
    { name: "PHP", icon: <SiPhp />, level: "Avanzado", color: "text-indigo-400" },
    { name: "JavaScript", icon: <SiJavascript />, level: "Avanzado", color: "text-yellow-500" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, level: "Avanzado", color: "text-teal-400" },
    { name: "WordPress", icon: <SiWordpress />, level: "Experto", color: "text-blue-800" },
    { name: "MySQL", icon: <SiMysql />, level: "Avanzado", color: "text-blue-600" },
    { name: "Docker", icon: <SiDocker />, level: "Intermedio", color: "text-blue-400" },
    { name: "Git", icon: <SiGit />, level: "Avanzado", color: "text-orange-500" }
  ];

  const languages = [
    { name: "Creole", level: "Nativo", flag: "🇭🇹" },
    { name: "Francés", level: "Segundo idioma", flag: "🇫🇷" },
    { name: "Español", level: "Avanzado", flag: "🇪🇸" },
    { name: "Inglés", level: "Avanzado", flag: "🇺🇸" }
  ];

  const projects = [
    {
      name: "Portfolio Personal",
      description: "Portfolio profesional desarrollado con React, TypeScript y Tailwind CSS",
      technologies: ["React", "TypeScript", "Tailwind"],
      url: "itsdrex.dev"
    },
    {
      name: "E-commerce Platform",
      description: "Plataforma de comercio electrónico completa con carrito de compras",
      technologies: ["Laravel", "React", "PHP"],
      url: "ecommerce.example.com"
    },
    {
      name: "Task Management App",
      description: "Aplicación de gestión de tareas con funcionalidades avanzadas",
      technologies: ["React", "Laravel", "Docker"],
      url: "tasks.example.com"
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Crear un enlace temporal para descargar
    const element = cvRef.current;
    if (element) {
      // Aquí podrías integrar una librería como html2pdf o jsPDF
      // Por ahora, simplemente abrimos la ventana de impresión
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Controles de acción */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 print:hidden">
        <motion.button
          onClick={handleDownload}
          className="p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Descargar PDF"
        >
          <FaDownload className="text-lg" />
        </motion.button>
        <motion.button
          onClick={handlePrint}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Imprimir"
        >
          <FaPrint className="text-lg" />
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
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl flex-shrink-0">
                <img 
                  src="/assets/DREX.jpeg" 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </h1>
                <h2 className="text-xl text-cyan-300 mb-4 font-semibold">
                  {personalInfo.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-cyan-400" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-cyan-400" />
                    <span>{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaExternalLinkAlt className="text-cyan-400" />
                    <span>{personalInfo.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Resumen Profesional */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaStar className="text-cyan-500" />
                Resumen Profesional
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {summary}
              </p>
            </section>

            {/* Experiencia Laboral */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaBriefcase className="text-cyan-500" />
                Experiencia Laboral
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-cyan-500 pl-6 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{exp.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <div className="text-cyan-600 font-semibold mb-1">{exp.company}</div>
                    <div className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {exp.location}
                    </div>
                    <p className="text-gray-700 mb-3 text-justify">{exp.description}</p>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Logros destacados:</h5>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
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
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-cyan-500" />
                Educación
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-800">{edu.degree}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    <div className="text-blue-600 font-semibold mb-1">{edu.institution}</div>
                    <div className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {edu.location}
                    </div>
                    <p className="text-gray-700 text-sm text-justify">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Habilidades Técnicas */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCode className="text-cyan-500" />
                Habilidades Técnicas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className={`text-2xl mb-2 ${skill.color}`}>
                      {skill.icon}
                    </div>
                    <div className="font-semibold text-gray-800 text-sm">{skill.name}</div>
                    <div className="text-xs text-gray-600">{skill.level}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Proyectos Destacados */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaAward className="text-cyan-500" />
                Proyectos Destacados
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">{project.name}</h4>
                    <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-cyan-600 text-sm font-medium">{project.url}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Idiomas */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaLanguage className="text-cyan-500" />
                Idiomas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {languages.map((lang, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-2xl mb-2">{lang.flag}</div>
                    <div className="font-semibold text-gray-800">{lang.name}</div>
                    <div className="text-sm text-gray-600">{lang.level}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Redes Sociales */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaExternalLinkAlt className="text-cyan-500" />
                Enlaces Profesionales
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaLinkedin className="text-blue-600" />
                  <span className="text-sm">{personalInfo.linkedin}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaGithub className="text-gray-800" />
                  <span className="text-sm">{personalInfo.github}</span>
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