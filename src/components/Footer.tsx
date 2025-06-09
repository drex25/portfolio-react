import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
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
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
                Drex.
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Transformando ideas en experiencias digitales excepcionales.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Conecta conmigo</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} Drex Wilvins. Todos los derechos reservados.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center space-x-1">
              <span>Hecho con</span>
              <FaHeart className="text-primary-500 animate-pulse" />
              <span>en React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 