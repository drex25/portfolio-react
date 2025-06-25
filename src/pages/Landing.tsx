import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaRocket, FaDownload, FaStore, FaCheckCircle, FaShieldAlt, FaHeadset, FaAward, FaStar, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

// Importar los componentes de las otras páginas
import About from './About';
import Projects from './Projects';
import Services from './Services';
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
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const guarantees = [
    {
      icon: <FaCheckCircle />,
      title: "Entrega Garantizada",
      description: "Cumplimos los tiempos acordados"
    },
    {
      icon: <FaShieldAlt />,
      title: "Calidad Asegurada",
      description: "Código limpio y optimizado"
    },
    {
      icon: <FaHeadset />,
      title: "Soporte Continuo",
      description: "Acompañamiento post-entrega"
    },
    {
      icon: <FaAward />,
      title: "Satisfacción 100%",
      description: "Garantía de resultado"
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24"
      role="banner"
      id="home"
      style={{ position: 'relative' }}
    >
      {/* Fondo animado y partículas parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradiente animado */}
        <div className="absolute inset-0 animate-gradient-move bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" style={{ backgroundSize: '200% 200%' }} />
        {/* Líneas geométricas sutiles */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gridline" x1="0" y1="0" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67e8f9" stopOpacity="0.2" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 96} y1="0" x2={i * 96} y2="1080" stroke="url(#gridline)" strokeWidth="1" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 90} x2="1920" y2={i * 90} stroke="url(#gridline)" strokeWidth="1" />
          ))}
        </svg>
        {/* Partículas parallax */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              animation: `particleMove${i % 5} 18s linear infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
        <style>{`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          ${Array.from({ length: 5 }).map((_, i) => `
            @keyframes particleMove${i} {
              0% { transform: translateY(0); }
              50% { transform: translateY(${10 + i * 5}px); }
              100% { transform: translateY(0); }
            }
          `).join('')}
        `}</style>
      </div>

      {/* Contenido principal */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto flex-1 flex flex-col justify-center"
      >
        <div className="pt-10" />
        <motion.p 
          className="text-cyan-400 text-xl font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Soluciones Digitales Profesionales
        </motion.p>
        <AnimatedGradientTitle>Desarrollo Web</AnimatedGradientTitle>
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-gray-300 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-cyan-400">Full Stack</span> & 
          <span className="text-blue-400"> E-commerce</span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Transformamos tus ideas en experiencias digitales exitosas. Especializados en desarrollo web moderno, 
          e-commerce y aplicaciones empresariales con más de 5 años de experiencia entregando resultados.
        </motion.p>
        <FuturisticSeparator />

        {/* Estadísticas comerciales */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {[
            { 
              number: "5+", 
              label: "Años de Experiencia",
              description: "Desarrollo profesional"
            },
            { 
              number: "50+", 
              label: "Proyectos Entregados",
              description: "Clientes satisfechos"
            },
            { 
              number: "100%", 
              label: "Tasa de Éxito",
              description: "Proyectos completados"
            },
            { 
              number: "24h", 
              label: "Tiempo de Respuesta",
              description: "Soporte garantizado"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones de acción comerciales */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.button
            onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaStore className="text-lg" />
            <span>Ver Servicios</span>
          </motion.button>
          
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
            <span>Ver Proyectos</span>
          </motion.button>
          
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-slate-900 transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeadset className="text-lg" />
            <span>Contactar</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </section>
  );
};

// Componente de Testimonios
const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "María González",
      position: "CEO, TechStart",
      content: "Sylvain transformó completamente nuestra presencia digital. Su trabajo profesional y atención al detalle superó nuestras expectativas. ¡Altamente recomendado!",
      rating: 5,
      project: "E-commerce Empresarial",
      avatar: "👩‍💼"
    },
    {
      name: "Carlos Rodríguez",
      position: "Emprendedor",
      content: "Increíble experiencia trabajando con Sylvain. Entregó nuestro proyecto a tiempo, con calidad excepcional y soporte continuo. Definitivamente volveremos a trabajar juntos.",
      rating: 5,
      project: "Landing Page Profesional",
      avatar: "👨‍💻"
    },
    {
      name: "Ana Martínez",
      position: "Directora de Marketing",
      content: "La mejor inversión que hemos hecho este año. Sylvain no solo desarrolló nuestro sitio web, sino que nos ayudó a optimizar nuestra estrategia digital completa.",
      rating: 5,
      project: "Sitio WordPress Personalizado",
      avatar: "👩‍🎨"
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 relative overflow-hidden"
      id="testimonials"
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lo que dicen mis{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              clientes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La satisfacción de mis clientes es mi mayor logro. Cada proyecto es una oportunidad para superar expectativas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000" />
              
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Project badge */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                    {testimonial.project}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-6 text-lg">
            ¿Listo para ser el próximo cliente satisfecho?
          </p>
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="text-lg" />
            <span>Comienza tu proyecto</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Componente de Proceso de Trabajo
const WorkProcessSection: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const processSteps = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Analizamos tus necesidades y objetivos para crear la estrategia perfecta para tu proyecto.",
      icon: "💬",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Planificación",
      description: "Desarrollamos un plan detallado con cronograma, funcionalidades y presupuesto transparente.",
      icon: "📋",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "03",
      title: "Diseño & Desarrollo",
      description: "Creamos tu proyecto con las mejores tecnologías, siguiendo estándares de calidad internacional.",
      icon: "⚡",
      color: "from-orange-500 to-red-500"
    },
    {
      step: "04",
      title: "Pruebas & Optimización",
      description: "Realizamos pruebas exhaustivas y optimizamos el rendimiento para garantizar la excelencia.",
      icon: "🔍",
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "05",
      title: "Lanzamiento",
      description: "Desplegamos tu proyecto con todas las configuraciones necesarias para el éxito inmediato.",
      icon: "🚀",
      color: "from-cyan-500 to-blue-500"
    },
    {
      step: "06",
      title: "Soporte Continuo",
      description: "Te acompaño con soporte técnico y mantenimiento para que tu proyecto siga creciendo.",
      icon: "🛠️",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      id="process"
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mi{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              proceso
            </span>{' '}
            de trabajo
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un método probado y eficiente que garantiza resultados excepcionales en cada proyecto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000`} />
              
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 h-full">
                {/* Step number */}
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${step.color} text-white font-bold rounded-full text-sm mb-6`}>
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow connector */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-6 text-lg">
            ¿Te gustaría conocer más sobre mi proceso de trabajo?
          </p>
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="text-lg" />
            <span>Agenda una consulta</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// 2. Título principal con gradiente animado y glow
const AnimatedGradientTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h1
    className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(34,211,238,0.25)]"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.h1>
);

// 3. Separador animado
const FuturisticSeparator: React.FC = () => (
  <div className="flex justify-center my-12">
    <motion.div
      className="w-48 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 shadow-lg"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      viewport={{ once: true }}
      style={{ originX: 0.5 }}
    />
  </div>
);

const DOMAIN = 'https://itsdrex.dev';
const OG_IMAGE = DOMAIN + '/assets/portfolio.png';
const FAVICON = '/assets/favicon.png';
const THEME_COLOR = '#06b6d4';

const Landing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'es';
  const title = `Sylvain Drexler | ${t('home.role', 'Full Stack')} - Portfolio`;
  const description = t('home.description', 'Transformo ideas en experiencias digitales excepcionales. Especializado en desarrollo web moderno, optimización de procesos y consultoría tecnológica con más de 5 años de experiencia.');
  const url = DOMAIN + '/';

  return (
    <div className="relative">
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content={THEME_COLOR} />
        <link rel="icon" type="image/png" href={FAVICON} />
        <link rel="canonical" href={url} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : lang === 'en' ? 'en_US' : 'fr_FR'} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="Portfolio de Sylvain Drexler" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Portfolio de Sylvain Drexler" />
      </Helmet>
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <About />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Services Section */}
      <Services />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Work Process Section */}
      <WorkProcessSection />
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Landing;