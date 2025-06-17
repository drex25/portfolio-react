import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Componente extraído para partículas de neón
const NeonParticles: React.FC = () => {
  // Genera posiciones y transiciones solo una vez
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map(() => ({
      x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
      y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
      opacity: [0.5, 1, 0.5],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #00fff7 0%, #005bea 100%)',
            boxShadow: '0 0 16px 4px #00fff7, 0 0 32px 8px #005bea',
            opacity: 0.7
          }}
          animate={{ x: p.x, y: p.y, opacity: p.opacity }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
};

const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-black"
      style={{ background: 'linear-gradient(135deg, #070616 0%, #13122a 50%, #10101c 100%)' }}
      role="banner"
      aria-label={t('home.bannerAria', 'Página principal')}
    >
      {/* Fondo animado de neón (fijo, sin movimiento) */}
      <div className="absolute inset-0 -z-10 animate-gradient-xy" style={{
        background: 'linear-gradient(120deg, #00fff7 0%, #005bea 100%)',
        filter: 'blur(100px) opacity(0.45)'
      }} />
      {/* Partículas y destellos */}
      <NeonParticles />
      {/* Avatar con halo neón azul (sin hover ni movimiento) */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, #00fff7 0%, #005bea 100%)',
              filter: 'blur(8px) opacity(0.25)'
            }}
          />
        </div>
        <motion.div
          className="w-44 h-44 rounded-full overflow-hidden border-4 border-[#00fff7] shadow-[0_0_12px_2px_#00fff7,0_0_24px_4px_#005bea] bg-black relative z-10 group"
          whileHover={{ scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <img src="/assets/DREX.jpeg" alt={t('home.avatarAlt', 'Foto de perfil de Sylvain Drexler')} className="object-cover w-full h-full transition-transform duration-300" />
        </motion.div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#005bea] rounded-full flex items-center justify-center text-white shadow-[0_0_16px_4px_#005bea] border-2 border-[#00fff7]">
          <span className="text-xl" role="img" aria-label={t('home.waveAria', 'Saludo con la mano')}>👋</span>
        </div>
      </motion.div>
      {/* Título y descripción con efecto neón azul/cian */}
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] drop-shadow-[0_0_16px_#00fff7] font-mono tracking-tight">
          {t('home.greeting')} <span className="text-[#00fff7]">Sylvain Drexler</span>
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-[#e0e0e0] font-mono drop-shadow-[0_0_8px_#00fff7]">
          {t('home.role')}
        </p>
        <p className="text-lg text-[#bdbdbd] mb-8 font-mono drop-shadow-[0_0_8px_#00fff7]">
          {t('home.description')}
        </p>
      </motion.div>
      {/* Botones de acción estilo neón azul */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <a
          href="/about-pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-lg font-semibold text-lg font-mono bg-black border-2 border-[#00fff7] text-[#00fff7] shadow-[0_0_16px_#00fff7] hover:bg-[#00fff7] hover:text-black hover:shadow-[0_0_32px_#00fff7] transition-all duration-300"
          aria-label={t('home.downloadCVAria', 'Descargar CV')}
        >
          {t('home.downloadCV')}
        </a>
        <a
          href="/projects"
          className="px-8 py-3 rounded-lg font-semibold text-lg font-mono bg-black border-2 border-[#005bea] text-[#005bea] shadow-[0_0_16px_#005bea] hover:bg-[#005bea] hover:text-black hover:shadow-[0_0_32px_#005bea] transition-all duration-300"
          aria-label={t('home.viewProjectsAria', 'Ver proyectos')}
        >
          {t('home.viewProjects')}
        </a>
      </motion.div>
      {/* Redes sociales con iconos neón azul */}
      <motion.div
        className="flex gap-6 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a
          href="https://github.com/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#00fff7] hover:text-[#005bea] transition-colors duration-300 shadow-[0_0_16px_#00fff7] hover:shadow-[0_0_32px_#005bea] rounded-full p-2 border-2 border-[#00fff7] hover:border-[#005bea]"
          aria-label={t('home.githubAria', 'GitHub')}
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#005bea] hover:text-[#00fff7] transition-colors duration-300 shadow-[0_0_16px_#005bea] hover:shadow-[0_0_32px_#00fff7] rounded-full p-2 border-2 border-[#005bea] hover:border-[#00fff7]"
          aria-label={t('home.linkedinAria', 'LinkedIn')}
        >
          <FaLinkedin />
        </a>
      </motion.div>
    </section>
  );
};

export default Landing;