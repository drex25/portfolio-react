import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaRocket, FaDownload, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Importar los componentes de las otras páginas
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

// Componente de partículas flotantes más sofisticado
const FloatingParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Componente de texto con efecto de escritura
const TypewriterText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.05,
            delay: index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Componente Hero Section
const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24"
      role="banner"
      id="home"
    >
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Contenido principal */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto flex-1 flex flex-col justify-center"
        style={{ y, opacity, scale }}
      >
        {/* Avatar con efectos mejorados */}
        <motion.div
          className="relative mb-12 mx-auto w-fit"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1 
          }}
        >
          {/* Anillos orbitales */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-64 h-64 rounded-full border border-cyan-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-80 h-80 rounded-full border border-blue-400/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Avatar principal */}
          <motion.div
            className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-blue-500 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse" />
            <img 
              src="/assets/DREX.jpeg" 
              alt="Sylvain Drexler" 
              className="w-full h-full object-cover relative z-10"
            />
          </motion.div>
        </motion.div>

        {/* Texto principal con animaciones */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p 
            className="text-cyan-400 text-xl font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t('home.greeting', 'Hola, soy')}
          </motion.p>
          
          <TypewriterText
            text="Sylvain Drexler"
            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight"
          />
          
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-gray-300 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-cyan-400">{t('home.role', 'Full Stack')}</span> Developer & 
            <span className="text-blue-400"> Systems Analyst</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {t('home.description', 'Transformo ideas en experiencias digitales excepcionales. Especializado en desarrollo web moderno, optimización de procesos y consultoría tecnológica con más de 5 años de experiencia.')}
          </motion.p>
        </motion.div>

        {/* Estadísticas rápidas */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {[
            { number: "5+", label: t('home.stats.experience', 'Años de Experiencia') },
            { number: "50+", label: t('home.stats.projects', 'Proyectos Completados') },
            { number: "100%", label: t('home.stats.satisfaction', 'Satisfacción Cliente') }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones de acción mejorados */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="text-lg" />
            <span>{t('home.downloadCV', 'Descargar CV')}</span>
          </motion.a>
          
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="text-lg" />
            <span>{t('home.viewProjects', 'Ver Proyectos')}</span>
          </motion.button>
        </motion.div>

        {/* Redes sociales con efectos mejorados */}
        <motion.div
          className="flex gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {[
            { icon: FaGithub, href: "https://github.com/drex25", color: "hover:text-gray-300" },
            { icon: FaLinkedin, href: "https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/", color: "hover:text-blue-400" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-3xl text-gray-400 ${social.color} transition-colors duration-300 p-3 rounded-full border border-gray-600 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Indicador de scroll - CENTRADO AL FINAL */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="text-cyan-400 hover:text-white transition-colors duration-300 flex flex-col items-center gap-2"
          whileHover={{ y: -5 }}
        >
          <span className="text-sm font-medium">{t('home.scrollToExplore', 'Scroll para explorar')}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-xl" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </section>
  );
};

const Landing: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <About />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Landing;