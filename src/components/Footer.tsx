import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/tuusuario',
      icon: FaGithub,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/tuusuario',
      icon: FaLinkedin,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/tuusuario',
      icon: FaTwitter,
    },
  ];

  return (
    <footer className="relative overflow-hidden min-h-[40vh] flex flex-col justify-center items-center text-center px-4 bg-black" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
      {/* Fondo animado de neón igual al landing */}
      <div className="absolute inset-0 -z-10 animate-gradient-xy" style={{
        background: 'linear-gradient(120deg, #00fff7 0%, #005bea 100%)',
        filter: 'blur(80px) opacity(0.7)'
      }} />
      {/* Partículas y destellos igual al landing */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, #00fff7 0%, #005bea 100%)`,
              boxShadow: '0 0 16px 4px #00fff7, 0 0 32px 8px #005bea',
              opacity: 0.7
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-8 h-8 rounded-full bg-[#00fff7] flex items-center justify-center text-white font-bold shadow-[0_0_8px_#00fff7] font-mono">
                D
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#00fff7] to-[#005bea] font-mono">
                Drex.
              </span>
            </div>
            <p className="text-[#e0e0e0] text-sm font-mono drop-shadow-[0_0_8px_#00fff7]">
              {t('footer.brandDescription', 'Transformando ideas en experiencias digitales excepcionales.')}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#00fff7] font-mono">{t('footer.quickLinks', 'Enlaces rápidos')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-[#bdbdbd] hover:text-[#00fff7] transition-colors font-mono">
                  {t('nav.about', 'Sobre mí')}
                </a>
              </li>
              <li>
                <a href="/projects" className="text-[#bdbdbd] hover:text-[#00fff7] transition-colors font-mono">
                  {t('nav.projects', 'Proyectos')}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#bdbdbd] hover:text-[#00fff7] transition-colors font-mono">
                  {t('nav.contact', 'Contacto')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#00fff7] font-mono">{t('footer.connect', 'Conecta conmigo')}</h3>
            <div className="flex space-x-4 justify-center">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bdbdbd] hover:text-[#00fff7] transition-colors shadow-[0_0_8px_#00fff7] rounded-full p-2 border-2 border-transparent hover:border-[#00fff7] font-mono"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#00fff7]/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#bdbdbd] text-sm font-mono">
              &copy; {currentYear} Drex Wilvins. {t('footer.rights', 'Todos los derechos reservados.')}
            </p>
            <p className="text-[#bdbdbd] text-sm flex items-center space-x-1 font-mono">
              <span>{t('footer.madeWith', 'Hecho con')}</span>
              <FaHeart className="text-[#00fff7] animate-pulse" />
              <span>{t('footer.by', 'en React')}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;