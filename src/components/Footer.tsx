import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaHeart, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowUp
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getContactEmail } from '../config/environment';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/drex25',
      icon: FaGithub,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/',
      icon: FaLinkedin,
      color: 'hover:text-blue-400'
    }
  ];

  const quickLinks = [
    { name: t('nav.trajectory', 'Trayectoria'), href: '#about' },
    { name: t('nav.projects', 'Proyectos'), href: '#projects' },
    { name: t('nav.contact', 'Contacto'), href: '#contact' }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: getContactEmail(),
      href: `mailto:${getContactEmail()}`,
      color: 'text-cyan-400'
    },
    {
      icon: FaPhone,
      text: '+54 376 511-5897',
      href: 'tel:+543765115897',
      color: 'text-green-400'
    },
    {
      icon: FaMapMarkerAlt,
      text: 'Posadas, Misiones, Argentina',
      href: 'https://maps.google.com/?q=Posadas,Misiones,Argentina'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                D
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Drex.
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.brandDescription', 'Transformando ideas en experiencias digitales excepcionales con más de 5 años de experiencia en desarrollo web.')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white">
              {t('footer.quickLinks', 'Enlaces rápidos')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white">
              {t('footer.contact', 'Contacto')}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                  >
                    <info.icon className="text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{info.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter/CTA */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white">
              {t('footer.workTogether', '¿Trabajamos juntos?')}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.workTogetherDesc', 'Estoy disponible para nuevos proyectos y colaboraciones. ¡Hablemos sobre tu próxima idea!')}
            </p>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="text-sm" />
              {t('footer.contactButton', 'Contactar')}
            </motion.button>
          </motion.div>
        </div>

        {/* Sección de servicios destacados */}
        <motion.div
          className="mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Servicios Destacados
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Soluciones digitales profesionales que transforman tu negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Desarrollo Web",
                description: "Sitios web modernos y responsivos con las mejores tecnologías",
                icon: "🌐",
                features: ["React/Next.js", "Diseño Responsive", "SEO Optimizado"]
              },
              {
                title: "E-commerce",
                description: "Tiendas online completas con pasarelas de pago integradas",
                icon: "🛒",
                features: ["MercadoPago/Stripe", "Gestión de Inventario", "Panel Admin"]
              },
              {
                title: "Estrategia + DSA",
                description: "Análisis estratégico completo con desarrollo técnico",
                icon: "🤝",
                features: ["Análisis de Mercado", "Brief Técnico", "Implementación"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="text-lg font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="text-xs text-cyan-400 font-medium">
                      • {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de garantías */}
        <motion.div
          className="mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Mis Garantías
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Compromiso total con la calidad y satisfacción del cliente
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { text: "Código Limpio", icon: "✨" },
              { text: "Entrega a Tiempo", icon: "⏰" },
              { text: "Soporte 24/7", icon: "🛠️" },
              { text: "Satisfacción 100%", icon: "💯" }
            ].map((guarantee, index) => (
              <motion.div
                key={guarantee.text}
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <div className="text-2xl mb-2">{guarantee.icon}</div>
                <div className="text-sm text-gray-300 font-medium">{guarantee.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Sylvain Drexler Wilvins. {t('footer.rights', 'Todos los derechos reservados')}
            </p>
            
            <div className="flex items-center gap-6">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <span>{t('footer.madeWith', 'Hecho con')}</span>
                <FaHeart className="text-red-400 animate-pulse" />
                <span>en React & TypeScript</span>
              </p>
              
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t('footer.backToTop', 'Volver arriba')}
              >
                <FaArrowUp className="text-sm" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;