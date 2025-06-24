import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaRocket, 
  FaShoppingCart, 
  FaWordpress, 
  FaCode, 
  FaStore, 
  FaTools,
  FaCheck,
  FaStar,
  FaFire,
  FaCrown,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaShieldAlt,
  FaHeadset,
  FaSearch,
  FaMobile,
  FaChartLine,
  FaLightbulb,
  FaGift,
  FaQuestionCircle,
  FaArrowRight,
  FaHeart,
  FaGlobe,
  FaDatabase,
  FaLock,
  FaCloudUploadAlt
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getContactEmail } from '../config/environment';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'web' | 'ecommerce' | 'custom';
  features: string[];
  deliveryTime: string;
  popular?: boolean;
  premium?: boolean;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'ecommerce' | 'custom'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = true; // Forzar siempre visible para depuración

  const services: Service[] = [
    {
      id: 'landing',
      name: 'Landing Page Profesional',
      description: 'Página web de alta conversión diseñada para captar leads y generar ventas. Perfecta para lanzamientos de productos o servicios.',
      price: 299,
      originalPrice: 399,
      category: 'web',
      features: [
        'Diseño responsive premium',
        'Optimización SEO básica',
        'Formulario de contacto',
        'Integración con Google Analytics',
        'Hosting gratuito por 3 meses',
        'SSL certificado incluido',
        'Velocidad de carga optimizada',
        '3 revisiones incluidas'
      ],
      deliveryTime: '5-7 días',
      icon: <FaRocket />,
      color: 'text-orange-400',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'ecommerce-basic',
      name: 'Tienda Online Básica',
      description: 'E-commerce completo con carrito de compras, pasarela de pagos y panel de administración. Ideal para emprendedores.',
      price: 799,
      originalPrice: 999,
      category: 'ecommerce',
      features: [
        'Hasta 50 productos',
        'Carrito de compras avanzado',
        'Pasarela de pagos (MercadoPago/Stripe)',
        'Panel de administración',
        'Gestión de inventario',
        'Sistema de cupones',
        'Reportes de ventas',
        'Diseño mobile-first',
        'SEO optimizado',
        'Capacitación incluida'
      ],
      deliveryTime: '10-14 días',
      popular: true,
      icon: <FaShoppingCart />,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'wordpress',
      name: 'Sitio WordPress Personalizado',
      description: 'Sitio web corporativo con WordPress, tema personalizado y funcionalidades avanzadas para tu negocio.',
      price: 599,
      originalPrice: 749,
      category: 'web',
      features: [
        'Tema personalizado único',
        'Plugin de funcionalidades',
        'Blog integrado',
        'Galería de imágenes',
        'Formularios avanzados',
        'Optimización SEO',
        'Backup automático',
        'Seguridad reforzada',
        'Capacitación WordPress',
        'Soporte 30 días'
      ],
      deliveryTime: '7-10 días',
      icon: <FaWordpress />,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'webapp',
      name: 'Aplicación Web Personalizada',
      description: 'Desarrollo de aplicación web a medida con React/Laravel según tus necesidades específicas de negocio.',
      price: 1299,
      category: 'custom',
      features: [
        'Análisis de requerimientos',
        'Diseño UX/UI personalizado',
        'Frontend con React/TypeScript',
        'Backend con Laravel/PHP',
        'Base de datos optimizada',
        'API REST completa',
        'Panel de administración',
        'Autenticación de usuarios',
        'Documentación técnica',
        'Soporte 60 días'
      ],
      deliveryTime: '3-4 semanas',
      premium: true,
      icon: <FaCode />,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'ecommerce-enterprise',
      name: 'E-commerce Empresarial',
      description: 'Solución e-commerce completa para empresas con múltiples funcionalidades avanzadas y escalabilidad.',
      price: 1899,
      category: 'ecommerce',
      features: [
        'Productos ilimitados',
        'Multi-tienda',
        'Múltiples pasarelas de pago',
        'Sistema de afiliados',
        'Programa de puntos',
        'Chat en vivo',
        'Integración con ERP',
        'Analytics avanzado',
        'App móvil básica',
        'Soporte prioritario 90 días'
      ],
      deliveryTime: '4-6 semanas',
      premium: true,
      icon: <FaStore />,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento Mensual',
      description: 'Servicio de mantenimiento continuo para mantener tu sitio web seguro, actualizado y funcionando perfectamente.',
      price: 99,
      category: 'web',
      features: [
        'Actualizaciones de seguridad',
        'Backup semanal',
        'Monitoreo 24/7',
        'Optimización de velocidad',
        'Soporte técnico prioritario',
        'Reporte mensual',
        'Pequeñas modificaciones',
        'Certificado SSL renovado'
      ],
      deliveryTime: 'Servicio continuo',
      icon: <FaTools />,
      color: 'text-indigo-400',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const addOns: AddOn[] = [
    {
      id: 'seo',
      name: 'SEO Avanzado',
      description: 'Optimización completa para motores de búsqueda',
      price: 199,
      icon: <FaSearch />
    },
    {
      id: 'mobile-app',
      name: 'App Móvil Básica',
      description: 'Aplicación móvil complementaria',
      price: 599,
      icon: <FaMobile />
    },
    {
      id: 'analytics',
      name: 'Analytics Avanzado',
      description: 'Dashboard personalizado con métricas',
      price: 149,
      icon: <FaChartLine />
    },
    {
      id: 'training',
      name: 'Capacitación Personalizada',
      description: 'Sesión de entrenamiento 1-a-1',
      price: 99,
      icon: <FaLightbulb />
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos los Servicios', icon: <FaGlobe /> },
    { id: 'web', name: 'Sitios Web', icon: <FaRocket /> },
    { id: 'ecommerce', name: 'E-commerce', icon: <FaShoppingCart /> },
    { id: 'custom', name: 'Desarrollo Custom', icon: <FaCode /> }
  ];

  const benefits = [
    {
      icon: <FaShieldAlt />,
      title: 'Garantía de Calidad',
      description: 'Garantía de satisfacción o devolvemos tu dinero'
    },
    {
      icon: <FaHeadset />,
      title: 'Soporte Dedicado',
      description: 'Soporte técnico personalizado durante todo el proyecto'
    },
    {
      icon: <FaRocket />,
      title: 'Entrega Rápida',
      description: 'Cumplimos con los tiempos de entrega prometidos'
    },
    {
      icon: <FaHeart />,
      title: 'Revisiones Ilimitadas',
      description: 'Ajustes hasta que quedes 100% satisfecho'
    }
  ];

  const faqs = [
    {
      question: '¿Qué incluye el precio?',
      answer: 'Cada servicio incluye todo lo listado en las características, sin costos ocultos. El precio es fijo y transparente.'
    },
    {
      question: '¿Cuánto tiempo toma el desarrollo?',
      answer: 'Los tiempos varían según el servicio, desde 5 días para landing pages hasta 6 semanas para e-commerce empresarial.'
    },
    {
      question: '¿Ofrecen soporte post-lanzamiento?',
      answer: 'Sí, todos los servicios incluyen soporte gratuito por un período determinado, desde 30 hasta 90 días.'
    },
    {
      question: '¿Puedo solicitar modificaciones?',
      answer: 'Absolutamente. Incluimos revisiones en cada servicio y trabajamos hasta que estés completamente satisfecho.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos transferencias bancarias, MercadoPago, PayPal y criptomonedas. Ofrecemos planes de pago flexibles.'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleWhatsAppContact = (serviceName: string) => {
    const message = `Hola! Estoy interesado en el servicio "${serviceName}". ¿Podrías darme más información?`;
    const whatsappUrl = `https://wa.me/543765115897?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = (serviceName: string) => {
    const subject = `Consulta sobre ${serviceName}`;
    const body = `Hola Sylvain,\n\nEstoy interesado en el servicio "${serviceName}" y me gustaría obtener más información.\n\nGracias!`;
    const emailUrl = `mailto:${getContactEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, '_blank');
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="services"
      style={{ position: 'relative' }}
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaGift className="text-cyan-400 text-xl" />
            <span className="text-cyan-400 font-semibold">Servicios Profesionales</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Servicios & Precios
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Soluciones digitales profesionales con precios transparentes. Desde landing pages hasta e-commerce empresarial.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                <div className="text-2xl text-cyan-400">{benefit.icon}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-1000" />
              
              <div className={`relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 ${
                service.popular ? 'ring-2 ring-cyan-400/50' : ''
              } ${service.premium ? 'ring-2 ring-purple-400/50' : ''}`}>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {service.popular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <FaFire className="text-xs" />
                      MÁS POPULAR
                    </span>
                  )}
                  {service.premium && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <FaCrown className="text-xs" />
                      PREMIUM
                    </span>
                  )}
                </div>

                <div className="p-8">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white text-2xl shadow-xl`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{service.deliveryTime}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-black text-white">${service.price}</span>
                      {service.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${service.originalPrice}</span>
                      )}
                    </div>
                    {service.originalPrice && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                        <FaGift className="text-xs" />
                        Ahorro ${service.originalPrice - service.price}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      Incluye:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <FaCheck className="text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={() => handleWhatsAppContact(service.name)}
                      className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaWhatsapp className="text-lg" />
                      Consultar por WhatsApp
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleEmailContact(service.name)}
                      className="w-full py-3 px-6 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaEnvelope className="text-sm" />
                      Consultar por Email
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Servicios Adicionales</h3>
            <p className="text-gray-400">Potencia tu proyecto con estos servicios complementarios</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.id}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                  <div className="text-xl text-cyan-400">{addon.icon}</div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{addon.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-cyan-400">${addon.price}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <FaQuestionCircle className="text-cyan-400" />
              Preguntas Frecuentes
            </h3>
            <p className="text-gray-400">Resolvemos tus dudas más comunes</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaRocket className="text-3xl text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Listo para Impulsar tu Negocio?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Elige el servicio que mejor se adapte a tus necesidades y comencemos a trabajar juntos en tu próximo proyecto exitoso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => handleWhatsAppContact('Consulta General')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="text-lg" />
                Consultar por WhatsApp
              </motion.button>
              <motion.button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-lg" />
                Formulario de Contacto
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;