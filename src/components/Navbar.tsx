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
  FaExternalLinkAlt,
  FaStore,
  FaStar
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

// Submenús agrupados
const groupedNavLinks = [
  {
    label: 'Perfil',
    icon: FaUser,
    submenu: [
      { path: '#about', label: 'nav.about', scrollTo: 'about', icon: FaUser },
      { path: '#skills', label: 'nav.skills', scrollTo: 'skills', icon: FaSkills },
      { path: '/cv', label: 'CV', scrollTo: null, icon: FaFileAlt, external: true }
    ]
  },
  {
    label: 'Portafolio',
    icon: FaFolder,
    submenu: [
      { path: '#projects', label: 'nav.projects', scrollTo: 'projects', icon: FaFolder },
      { path: '#services', label: 'nav.services', scrollTo: 'services', icon: FaStore },
      { path: '#testimonials', label: 'nav.testimonials', scrollTo: 'testimonials', icon: FaStar }
    ]
  },
  { path: '#process', label: 'nav.process', scrollTo: 'process', icon: FaCode },
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
      const sections = ['home', 'about', 'skills', 'projects', 'services', 'testimonials', 'process', 'contact'];
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

  const MobileAccordion: React.FC<{ label: string; icon: React.ReactNode; items: { label: string; icon: React.ReactNode; onClick: () => void }[] }> = ({ label, icon, items }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="w-full">
        <button
          className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-2xl font-bold text-white/90 hover:text-cyan-400 bg-white/5 hover:bg-cyan-400/10 transition-all duration-300 mb-2 justify-between"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`accordion-${label}`}
        >
          <span className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            {label}
          </span>
          <FaChevronRight className={`text-lg transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
        </button>
        <div
          id={`accordion-${label}`}
          className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-10 py-3 text-lg text-white/80 hover:text-cyan-400 transition-all duration-200 border-b border-white/5 last:border-b-0"
              onClick={item.onClick}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-container bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/10`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group z-50"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              <FaCode />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Drex</span>
              <span className="text-xs text-gray-300 tracking-widest">DEVELOPER</span>
            </div>
          </button>

          {/* Menú centrado */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {groupedNavLinks.map((item, idx) => {
                if (item.submenu) {
                  // Submenú desplegable
                  return (
                    <div key={item.label} className="relative group">
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white/80 hover:text-cyan-300 transition-all duration-300 group-hover:text-cyan-400"
                      >
                        <span className="text-xl"><item.icon /></span>
                        <span>{item.label}</span>
                        <FaChevronRight className="ml-1 text-xs group-hover:rotate-90 transition-transform duration-200" />
                      </button>
                      <div className="absolute left-0 mt-2 w-56 bg-slate-900/95 border border-white/10 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                        {item.submenu.map((subitem) => (
                          subitem.external ? (
                            <a
                              key={subitem.path}
                              href={subitem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-3 text-white/90 hover:bg-cyan-400/10 transition-all duration-200 text-base font-medium border-b border-white/5 last:border-b-0"
                            >
                              <span className="text-lg"><subitem.icon /></span>
                              <span>{subitem.label}</span>
                              <FaExternalLinkAlt className="ml-auto text-xs opacity-60" />
                            </a>
                          ) : (
                            <button
                              key={subitem.path}
                              onClick={() => { if (subitem.scrollTo) scrollToSection(subitem.scrollTo); }}
                              className="flex items-center gap-2 w-full px-5 py-3 text-white/90 hover:bg-cyan-400/10 transition-all duration-200 text-base font-medium border-b border-white/5 last:border-b-0"
                            >
                              <span className="text-lg"><subitem.icon /></span>
                              <span>{t(subitem.label)}</span>
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  // Ítem principal
                  const isActive = activeSection === item.scrollTo;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { if (item.scrollTo) scrollToSection(item.scrollTo); }}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 group
                        ${isActive ? 'text-cyan-400 bg-cyan-400/10 shadow-lg' : 'text-white/80 hover:text-cyan-300'}
                      `}
                      style={{ fontSize: '1.1rem' }}
                    >
                      <span className={`text-xl transition-all duration-300 ${isActive ? 'text-cyan-400 drop-shadow-glow' : 'text-cyan-200 group-hover:text-cyan-300'}`}> <Icon /> </span>
                      <span className="relative">
                        {t(item.label)}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute left-0 -bottom-1 w-full h-1 rounded bg-gradient-to-r from-cyan-400 to-blue-500 shadow-cyan-400/30"
                            style={{ zIndex: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </span>
                    </button>
                  );
                }
              })}
            </div>
          </div>

          {/* Botón de contacto y selector de idioma a la derecha */}
          <div className="flex items-center gap-2 sm:gap-4 ml-2">
            {/* Botón destacado de contacto */}
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border-2 border-cyan-400/30 hover:border-cyan-400"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaEnvelope className="text-lg" />
              <span>{t('nav.contact', 'Contacto')}</span>
            </motion.button>
            {/* Selector de idioma visual */}
            <div className="relative z-50">
              <button
                onClick={() => setIsLanguageMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-400/10 text-white font-semibold transition-all duration-300 border border-white/10"
              >
                <span className="text-xl">{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-slate-900/95 border border-white/10 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center gap-2 w-full px-4 py-3 text-left text-white/90 hover:bg-cyan-400/10 transition-all duration-200 ${currentLanguage.code === lang.code ? 'font-bold text-cyan-400' : ''}`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="p-3 rounded-full bg-white/10 hover:bg-cyan-400/10 text-white transition-all duration-300 border border-white/10"
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col w-full h-full"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex-1 flex flex-col justify-center items-center relative px-4 py-8 overflow-y-auto">
              {/* Botón de cierre */}
              <button
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-cyan-400/10 text-white border border-white/10 text-3xl"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <FaTimes />
              </button>
              {/* Menú principal con submenús tipo accordion */}
              <nav className="w-full max-w-xs mx-auto space-y-4 mt-8 mb-8">
                {/* Accordion para Perfil */}
                <MobileAccordion
                  label="Perfil"
                  icon={<FaUser />}
                  items={[
                    { label: t('nav.about'), icon: <FaUser />, onClick: () => { setIsMobileMenuOpen(false); scrollToSection('about'); } },
                    { label: t('nav.skills'), icon: <FaSkills />, onClick: () => { setIsMobileMenuOpen(false); scrollToSection('skills'); } },
                    { label: 'CV', icon: <FaFileAlt />, onClick: () => { setIsMobileMenuOpen(false); window.open('/cv', '_blank'); } }
                  ]}
                />
                {/* Accordion para Portafolio */}
                <MobileAccordion
                  label="Portafolio"
                  icon={<FaFolder />}
                  items={[
                    { label: t('nav.projects'), icon: <FaFolder />, onClick: () => { setIsMobileMenuOpen(false); scrollToSection('projects'); } },
                    { label: t('nav.services'), icon: <FaStore />, onClick: () => { setIsMobileMenuOpen(false); scrollToSection('services'); } },
                    { label: t('nav.testimonials'), icon: <FaStar />, onClick: () => { setIsMobileMenuOpen(false); scrollToSection('testimonials'); } }
                  ]}
                />
                {/* Ítems principales */}
                <button
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-xl font-bold text-white/90 hover:text-cyan-400 bg-white/5 hover:bg-cyan-400/10 transition-all duration-300 mb-2"
                  onClick={() => { setIsMobileMenuOpen(false); scrollToSection('process'); }}
                >
                  <FaCode className="text-2xl" />
                  {t('nav.process')}
                </button>
                <button
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-xl font-bold text-white/90 hover:text-cyan-400 bg-white/5 hover:bg-cyan-400/10 transition-all duration-300 mb-2"
                  onClick={() => { setIsMobileMenuOpen(false); scrollToSection('contact'); }}
                >
                  <FaEnvelope className="text-2xl" />
                  {t('nav.contact')}
                </button>
              </nav>
              {/* Botón de contacto destacado */}
              <button
                className="w-full max-w-xs flex items-center justify-center gap-3 px-6 py-3 mt-2 mb-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg"
                onClick={() => { setIsMobileMenuOpen(false); scrollToSection('contact'); }}
              >
                <FaEnvelope className="text-xl" />
                {t('nav.contact', 'Contacto')}
              </button>
              {/* Selector de idioma visual */}
              <div className="flex justify-center gap-4 mt-4 mb-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { changeLanguage(lang.code); setIsMobileMenuOpen(false); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-400/10 text-white font-semibold transition-all duration-300 border border-white/10 text-xl ${currentLanguage.code === lang.code ? 'font-bold text-cyan-400' : ''}`}
                  >
                    <span>{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;