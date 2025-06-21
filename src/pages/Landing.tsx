import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown, FaCode, FaRocket } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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

const Landing: React.FC = () => {
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

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      role="banner"
    >
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>

      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Contenido principal */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        style={{ y, opacity, scale }}
      >
        {/* Avatar con efectos mejorados */}
        <motion.div
          className="relative mb-8 mx-auto w-fit"
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

          {/* Indicador de estado */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <span className="text-2xl">🚀</span>
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
            <span className="text-cyan-400">Full Stack</span> Developer & 
            <span className="text-blue-400"> Systems Analyst</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Transformo ideas en experiencias digitales excepcionales. 
            Especializado en desarrollo web moderno, optimización de procesos 
            y consultoría tecnológica con más de 5 años de experiencia.
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
            { number: "5+", label: "Años de Experiencia" },
            { number: "50+", label: "Proyectos Completados" },
            { number: "100%", label: "Satisfacción Cliente" }
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
            href="/about-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCode className="text-lg" />
            <span>Descargar CV</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"
              layoutId="button-bg"
            />
          </motion.a>
          
          <motion.a
            href="/projects"
            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="text-lg" />
            <span>Ver Proyectos</span>
          </motion.a>
        </motion.div>

        {/* Redes sociales con efectos mejorados */}
        <motion.div
          className="flex gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {[
            { icon: FaGithub, href: "https://github.com/tuusuario", color: "hover:text-gray-300" },
            { icon: FaLinkedin, href: "https://linkedin.com/in/tuusuario", color: "hover:text-blue-400" }
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

        {/* Indicador de scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center text-gray-400 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-sm mb-2 font-medium">Scroll para explorar</span>
            <FaArrowDown className="text-xl" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Landing;