import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaCode, 
  FaHome, 
  FaUser, 
  FaCode as FaSkills, 
  FaFolder, 
  FaEnvelope,
  FaFileAlt,
  FaGlobe,
  FaChevronRight,
  FaExternalLinkAlt,
  FaStore,
  FaStar,
  FaCalculator
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

// Submenús agrupados - Simplificado para enfoque de servicios
const groupedNavLinks: Array<{
  path: string;
  label: string;
  scrollTo: string | null;
  icon: IconType;
  external?: boolean;
}> = [
  { path: '#about', label: 'nav.trajectory', scrollTo: 'about', icon: FaUser },
  { path: '#projects', label: 'nav.projects', scrollTo: 'projects', icon: FaFolder },
  { path: '#services', label: 'nav.services', scrollTo: 'services', icon: FaStore },
  { path: '#contact', label: 'nav.contact', scrollTo: 'contact', icon: FaEnvelope },
  { path: '/presupuesto', label: 'nav.quote', scrollTo: null, icon: FaCalculator }
];

const pageTitles: Record<string, string> = {
  '/': 'Sylvain Drexler - Portfolio',
  '/cv': 'CV - Sylvain Drexler',
};

interface NavbarProps {
  onLanguageChange: (lng: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Sylvain Drexler - Portfolio';
    document.title = title;
  }, [location.pathname]);

  // Sincronizar sección activa con la ruta
  useEffect(() => {
    if (location.pathname === '/presupuesto') {
      setActiveSection('presupuesto');
    } else if (location.pathname === '/') {
      // Dejar que el scroll lo maneje
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        const sections = ['home', 'about', 'projects', 'services', 'testimonials', 'process', 'contact'];
        const scrollPosition = window.scrollY + 100;
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      // Ejecutar una vez para setear el estado inicial
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setActiveSection(''); // Ninguna sección activa para otras rutas
    }
  }, [location.pathname]);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      setMobileMenuMounted(true);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      // Delay para la animación de salida
      setTimeout(() => setMobileMenuMounted(false), 300);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    const newLanguage = languages.find(lang => lang.code === langCode) || languages[0];
    setCurrentLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
    onLanguageChange(langCode);
  };

  const scrollToSection = (sectionId: string) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350); // Debe coincidir con la animación de cierre
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-container ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-cyan-400/20' 
          : 'bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/10'
      }`}
      style={{
        boxShadow: isScrolled 
          ? '0 8px 32px 0 rgba(6, 182, 212, 0.15), 0 0 0 1px rgba(6, 182, 212, 0.1)' 
          : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          {/* Logo empresarial espectacular */}
          <Link to="/" className="flex items-center gap-3 group z-50 relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              {/* Glow effect detrás del logo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <FaCode />
                </motion.div>
                {/* Partículas orbitales */}
                <div className="absolute inset-0">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: `${15 + i * 5}px 0px`,
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start relative">
                <motion.span 
                  className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  Drex
                </motion.span>
                <span className="text-xs text-gray-300 tracking-[0.2em] font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  DEVELOPER
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Menú centrado con efectos increíbles */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {groupedNavLinks.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.path === '/presupuesto') {
                      navigate('/presupuesto');
                    } else if (item.scrollTo) {
                      scrollToSection(item.scrollTo);
                    } else if ('external' in item && item.external) {
                      window.open(item.path, '_blank');
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    (location.pathname === '/presupuesto' && item.path === '/presupuesto') || (activeSection === item.scrollTo)
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg"><item.icon /></span>
                  {t(item.label as string)}
                  {'external' in item && item.external && <FaExternalLinkAlt className="text-xs" />}
                </button>
              ))}
            </div>
          </div>

          {/* Botón de contacto y selector de idioma a la derecha */}
          <div className="flex items-center gap-2 sm:gap-4 ml-2">
            {/* Selector de idioma visual con efectos */}
            <div className="relative z-50">
              <motion.button
                onClick={() => setIsLanguageMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-400/10 text-white font-semibold transition-all duration-300 border border-white/10 hover:border-cyan-400/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="text-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {currentLanguage.flag}
                </motion.span>
                <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
              </motion.button>
              
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/20 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-50" />
                    
                    <div className="relative z-10">
                      {languages.map((lang, idx) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex items-center gap-3 w-full px-4 py-3 text-left text-white/90 hover:bg-cyan-400/10 transition-all duration-200 ${currentLanguage.code === lang.code ? 'font-bold text-cyan-400 bg-cyan-400/10' : ''}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Menú móvil con hamburger espectacular */}
          <div className="md:hidden flex items-center z-50 gap-4">
            <motion.button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative p-3 rounded-full bg-white/10 hover:bg-cyan-400/10 text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50 backdrop-blur-sm overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Fondo con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div
                className="relative z-10"
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="text-2xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="text-2xl" />
                  </motion.div>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable espectacular */}
      {mobileMenuMounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-gradient-to-br from-slate-900/98 via-purple-900/95 to-slate-900/98 backdrop-blur-2xl flex flex-col w-full h-full mobile-menu-overlay"
              role="dialog"
              aria-modal="true"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                zIndex: 999999,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
              }}
            >
              {/* Efectos de fondo */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Ondas de energía */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-500/10 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center relative px-4 py-8 overflow-y-auto">
                {/* Botón de cierre espectacular */}
                <motion.button
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-cyan-400/10 text-white border border-white/10 hover:border-cyan-400/50 text-3xl backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaTimes />
                </motion.button>
                
                {/* Menú principal simplificado */}
                <motion.nav 
                  className="w-full max-w-xs mx-auto space-y-4 mt-8 mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {/* Ítems del menú */}
                  {groupedNavLinks.map((item, idx) => (
                    <motion.button
                      key={idx}
                      className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-xl font-bold text-white/90 hover:text-cyan-400 bg-white/5 hover:bg-cyan-400/10 transition-all duration-300 mb-2 mobile-menu-item"
                      onClick={() => { 
                        setIsMobileMenuOpen(false); 
                        if (item.path === '/presupuesto') {
                          navigate('/presupuesto');
                        } else if (item.scrollTo) {
                          scrollToSection(item.scrollTo);
                        } else if ('external' in item && item.external) {
                          window.open(item.path, '_blank');
                        }
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="text-2xl" />
                      {t(item.label as string)}
                      {'external' in item && item.external && <FaExternalLinkAlt className="text-lg ml-auto" />}
                    </motion.button>
                  ))}
                </motion.nav>
                
                {/* Selector de idioma visual */}
                <motion.div 
                  className="flex justify-center gap-4 mt-4 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {languages.map((lang, idx) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => { changeLanguage(lang.code); setIsMobileMenuOpen(false); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-400/10 text-white font-semibold transition-all duration-300 border border-white/10 hover:border-cyan-400/50 text-xl ${currentLanguage.code === lang.code ? 'font-bold text-cyan-400 bg-cyan-400/10 border-cyan-400/50' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                    >
                      <span>{lang.flag}</span>
                      <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.nav>
  );
};

export default Navbar;