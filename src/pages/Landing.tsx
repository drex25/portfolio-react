import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaServer, FaDatabase } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Constants
const ANIMATION_CONFIG = {
  spring: { stiffness: 100, damping: 30, restDelta: 0.001 },
  scroll: {
    background: [0, 1000],
    content: [0, 1000],
    opacity: [0, 300],
    scale: [0, 300],
  },
};

// Types
interface MousePosition {
  x: number;
  y: number;
}

// Components
const BackgroundElements: React.FC<{ backgroundY: any }> = ({ backgroundY }) => (
  <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
    {[
      { top: 'top-0', left: 'left-1/2', size: 'w-[800px] h-[800px]', color: 'bg-primary-500/10', duration: 20 },
      { top: 'bottom-0', left: 'right-0', size: 'w-96 h-96', color: 'bg-primary-400/10', duration: 15 },
      { top: 'top-1/4', left: 'left-0', size: 'w-72 h-72', color: 'bg-primary-300/10', duration: 18 },
    ].map((config, index) => (
      <motion.div
        key={index}
        className={`absolute ${config.top} ${config.left} ${config.size} ${config.color} rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </motion.div>
);

const TechStackIcons: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-gray-400/20 dark:text-gray-600/20"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      >
        {[<FaCode />, <FaServer />, <FaDatabase />][i % 3]}
      </motion.div>
    ))}
  </div>
);

const ProfileSection: React.FC<{
  contentY: any;
  scale: any;
  isHovering: boolean;
  mousePosition: MousePosition;
  setIsHovering: (value: boolean) => void;
}> = ({ contentY, scale, isHovering, mousePosition, setIsHovering }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, type: 'spring' }}
    className="relative mb-8"
    style={{ y: contentY, scale }}
    onHoverStart={() => setIsHovering(true)}
    onHoverEnd={() => setIsHovering(false)}
  >
    <motion.div 
      className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary-500 shadow-xl bg-white dark:bg-gray-800 group relative"
      animate={{
        rotate: isHovering ? mousePosition.x * 0.1 : 0,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img 
        src="/assets/DREX.jpeg" 
        alt="Foto de perfil de Sylvain Drexler" 
        className="object-cover w-full h-full"
        animate={{
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
    <motion.div 
      className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-xl" role="img" aria-label="waving hand">👋</span>
    </motion.div>
  </motion.div>
);

const ActionButtons: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      custom={3}
      variants={textVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
    >
      <motion.a
        href="/src/assets/CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group px-8 py-3 bg-primary-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300 font-semibold text-lg flex items-center gap-2 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('home.downloadCV')}
      >
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
        {t('home.downloadCV')}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </motion.div>
      </motion.a>
      
      <motion.a
        href="/projects"
        className="group px-8 py-3 bg-white dark:bg-gray-800 text-primary-500 border-2 border-primary-500 rounded-lg shadow hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 font-semibold text-lg flex items-center gap-2 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('home.viewProjects')}
      >
        <motion.span
          className="absolute inset-0 bg-primary-500/10"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
        {t('home.viewProjects')}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

const SocialLinks: React.FC = () => (
  <motion.div
    custom={4}
    variants={textVariants}
    initial="hidden"
    animate="visible"
    className="flex gap-6 justify-center items-center"
  >
    {[
      { icon: <FaGithub />, href: "https://github.com/tuusuario", label: "GitHub" },
      { icon: <FaLinkedin />, href: "https://linkedin.com/in/tuusuario", label: "LinkedIn" }
    ].map((social, index) => (
      <motion.a 
        key={index}
        href={social.href}
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-2xl text-gray-500 hover:text-primary-500 transition-colors duration-300 relative group"
        whileHover={{ scale: 1.2, rotate: index === 0 ? 5 : -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Visitar perfil de ${social.label}`}
      >
        <motion.span
          className="absolute -inset-2 bg-primary-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
        />
        {social.icon}
      </motion.a>
    ))}
  </motion.div>
);

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Landing: React.FC = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Scroll effects
  const backgroundY = useSpring(
    useTransform(scrollY, ANIMATION_CONFIG.scroll.background, [0, 300]),
    ANIMATION_CONFIG.spring
  );
  const contentY = useSpring(
    useTransform(scrollY, ANIMATION_CONFIG.scroll.content, [0, 100]),
    ANIMATION_CONFIG.spring
  );
  const opacity = useSpring(
    useTransform(scrollY, ANIMATION_CONFIG.scroll.opacity, [1, 0]),
    ANIMATION_CONFIG.spring
  );
  const scale = useSpring(
    useTransform(scrollY, ANIMATION_CONFIG.scroll.scale, [1, 0.8]),
    ANIMATION_CONFIG.spring
  );

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      role="banner"
      aria-label="Página principal"
    >
      <BackgroundElements backgroundY={backgroundY} />
      <TechStackIcons />
      
      <ProfileSection
        contentY={contentY}
        scale={scale}
        isHovering={isHovering}
        mousePosition={mousePosition}
        setIsHovering={setIsHovering}
      />

      <motion.div
        className="max-w-3xl mx-auto"
        style={{ y: contentY, scale }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300"
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {t('home.greeting')} <span className="text-primary-600 dark:text-primary-400">Sylvain Drexler</span>
        </motion.h1>
        
        <motion.p
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-200 font-medium"
        >
          {t('home.role')}
        </motion.p>
        
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
        >
          {t('home.description')}
        </motion.p>

        <ActionButtons />
        <SocialLinks />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ opacity }}
        role="presentation"
        aria-hidden="true"
      >
        <motion.div
          className="w-4 h-7 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center relative"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-0.5 h-2 bg-primary-500 rounded-full mt-1"
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Landing; 