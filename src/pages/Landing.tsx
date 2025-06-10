import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const Landing: React.FC = () => {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Efectos parallax y scroll
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const backgroundY = useSpring(useTransform(scrollY, [0, 1000], [0, 300]), springConfig);
  const contentY = useSpring(useTransform(scrollY, [0, 1000], [0, 100]), springConfig);
  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollY, [0, 300], [1, 0.8]), springConfig);

  // Efecto de mouse parallax
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

  // Animación de texto
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

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements with parallax */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/4 left-0 w-72 h-72 bg-primary-300/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Floating tech stack icons */}
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

      {/* Profile section with enhanced animations */}
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
            src="/src/assets/DREX.jpeg" 
            alt="Foto de perfil" 
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
          <span className="text-xl">👋</span>
        </motion.div>
      </motion.div>

      {/* Text content with enhanced animations */}
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
          ¡Hola! Soy <span className="text-primary-600 dark:text-primary-400">Sylvain Drexler W.</span>
        </motion.h1>
        
        <motion.p
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-200 font-medium"
        >
          Transformo ideas en productos digitales modernos y escalables
        </motion.p>
        
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
        >
          Full Stack Developer | React, Laravel, PHP, Tailwind, Docker, Git y más
        </motion.p>

        {/* Action buttons with enhanced hover effects */}
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
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            Descargar CV
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.a>
          <motion.a
            href="/projects"
            className="group px-8 py-3 bg-white dark:bg-gray-800 text-primary-500 border-2 border-primary-500 rounded-lg shadow hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 font-semibold text-lg flex items-center gap-2 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-primary-500/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            Ver Proyectos
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Social links with enhanced hover effects */}
        <motion.div
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-6 justify-center items-center"
        >
          <motion.a 
            href="https://github.com/tuusuario" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-2xl text-gray-500 hover:text-primary-500 transition-colors duration-300 relative group"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="absolute -inset-2 bg-primary-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
            />
            <FaGithub />
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/tuusuario" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-2xl text-gray-500 hover:text-primary-500 transition-colors duration-300 relative group"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="absolute -inset-2 bg-primary-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
            />
            <FaLinkedin />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ opacity }}
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