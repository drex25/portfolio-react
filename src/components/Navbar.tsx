import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
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

const navLinks = [
  { path: '/', label: 'nav.home' },
  { path: '/about', label: 'nav.about' },
  { path: '/projects', label: 'nav.projects' },
  { path: '/skills', label: 'nav.skills' },
  { path: '/contact', label: 'nav.contact' }
];

// Títulos de las páginas
const pageTitles: Record<string, string> = {
  '/': 'Sylvain Drexler - Portfolio',
  '/about': 'Sobre Mí - Sylvain Drexler',
  '/projects': 'Proyectos - Sylvain Drexler',
  '/contact': 'Contacto - Sylvain Drexler',
};

interface NavbarProps {
  onLanguageChange: (lng: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );
  const location = useLocation();

  // Actualizar el título de la página
  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Sylvain Drexler - Portfolio';
    document.title = title;
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    const newLanguage = languages.find(lang => lang.code === langCode) || languages[0];
    setCurrentLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              D
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-300"
              whileHover={{ scale: 1.05 }}
            >
              Drex
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-gray-200 hover:text-primary-400 transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-primary-400' : ''
                }`}
              >
                {t(link.label)}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary-500 bg-gray-900 text-white font-semibold shadow-lg hover:bg-primary-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">{currentLanguage.flag}</span>
                <span className="uppercase tracking-wide text-white text-base font-bold drop-shadow-sm">
                  {currentLanguage.code}
                </span>
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900 border border-primary-500 shadow-2xl overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 text-white font-semibold text-base hover:bg-primary-500/20 focus:bg-primary-500/30 ${
                          i18n.language === lang.code ? 'bg-primary-900/30' : ''
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="uppercase tracking-wide">{lang.code}</span>
                        {i18n.language === lang.code && (
                          <motion.div
                            layoutId="activeLanguage"
                            className="w-1 h-6 bg-primary-500 rounded-full ml-auto"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-primary-500 text-xl" />
              ) : (
                <FaBars className="text-primary-500 text-xl" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-gray-900 shadow-lg"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`relative group px-4 py-2 rounded-lg ${
                    location.pathname === link.path
                      ? 'bg-primary-900/20 text-primary-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {t(link.label)}
                  <motion.span
                    className="absolute left-0 top-0 h-full w-1 bg-primary-500 rounded-r-lg"
                    initial={false}
                    animate={{
                      scaleY: location.pathname === link.path ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 