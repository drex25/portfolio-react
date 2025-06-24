import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  FaExternalLinkAlt
} from 'react-icons/fa';
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

// Enlaces de navegación actualizados con iconos
const navLinks = [
  { path: '#home', label: 'nav.home', scrollTo: 'home', icon: FaHome },
  { path: '#about', label: 'nav.about', scrollTo: 'about', icon: FaUser },
  { path: '#skills', label: 'nav.skills', scrollTo: 'skills', icon: FaSkills },
  { path: '#projects', label: 'nav.projects', scrollTo: 'projects', icon: FaFolder },
  { path: '#contact', label: 'nav.contact', scrollTo: 'contact', icon: FaEnvelope }
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
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Sylvain Drexler - Portfolio';
    document.title = title;
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detectar sección activa
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo mejorado */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group z-50"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                <FaCode />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </motion.div>
            <motion.div
              className="hidden sm:block"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Drex
              </span>
              <div className="text-xs text-gray-400 font-medium tracking-wider">
                DEVELOPER
              </div>
            </motion.div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.scrollTo}
                onClick={() => scrollToSection(link.scrollTo)}
                className="relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <span className="relative z-10 font-medium">
                  {t(link.label)}
                </span>
                {activeSection === link.scrollTo && (
                  <motion.div
                    layoutId="activeLink"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-base sm:text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:block text-sm font-bold tracking-wide">
                  {currentLanguage.code.toUpperCase()}
                </span>
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 sm:w-48 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                          i18n.language === lang.code 
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-l-2 border-cyan-400' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{lang.name}</div>
                          <div className="text-xs text-gray-500">{lang.code.toUpperCase()}</div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 sm:p-3 rounded-xl bg-white/5 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 z-50"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="text-lg sm:text-xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="text-lg sm:text-xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay con blur mejorado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu principal */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-slate-900/98 to-slate-800/98 backdrop-blur-xl border-l border-white/10 z-[9999] lg:hidden overflow-y-auto"
            >
              {/* Header del menú */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      <FaCode />
                    </div>
                    <div>
                      <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Drex
                      </div>
                      <div className="text-xs text-gray-400 font-medium tracking-wider">
                        DEVELOPER
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 border border-white/20 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes className="text-lg" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                {/* Navigation Links con iconos */}
                <div className="space-y-2 mb-8">
                  <motion.h3 
                    className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"
                    variants={menuItemVariants}
                  >
                    <FaGlobe className="text-cyan-400" />
                    Navegación
                  </motion.h3>
                  {navLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.button
                        key={link.scrollTo}
                        onClick={() => scrollToSection(link.scrollTo)}
                        className={`block w-full text-left px-4 py-4 rounded-xl font-medium transition-all duration-300 group relative overflow-hidden ${
                          activeSection === link.scrollTo
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                        variants={menuItemVariants}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-all duration-300 ${
                              activeSection === link.scrollTo
                                ? 'bg-cyan-400/20 text-cyan-400'
                                : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
                            }`}>
                              <IconComponent className="text-lg" />
                            </div>
                            <span className="font-medium">{t(link.label)}</span>
                          </div>
                          {activeSection === link.scrollTo && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                          )}
                        </div>
                        {/* Efecto de brillo al hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </motion.button>
                    );
                  })}
                </div>
                
                {/* Language options mejoradas */}
                <div className="border-t border-white/10 pt-6 mb-6">
                  <motion.h3 
                    className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"
                    variants={menuItemVariants}
                  >
                    <FaGlobe className="text-cyan-400" />
                    Idioma
                  </motion.h3>
                  <div className="space-y-2">
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => { 
                          changeLanguage(lang.code); 
                          setIsMobileMenuOpen(false); 
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                          i18n.language === lang.code 
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                        variants={menuItemVariants}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{lang.flag}</span>
                          <div className="text-left">
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-xs opacity-70">{lang.code.toUpperCase()}</div>
                          </div>
                        </div>
                        {i18n.language === lang.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* CV Link mejorado */}
                <motion.div 
                  className="border-t border-white/10 pt-6"
                  variants={menuItemVariants}
                >
                  <motion.a
                    href="/cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FaFileAlt className="text-lg" />
                      <span>Ver CV Completo</span>
                      <FaExternalLinkAlt className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </motion.a>
                </motion.div>

                {/* Footer del menú */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-white/10 text-center"
                  variants={menuItemVariants}
                >
                  <div className="text-xs text-gray-500">
                    © 2024 Sylvain Drexler
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Full Stack Developer
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;