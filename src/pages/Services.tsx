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
  FaCloudUploadAlt,
  FaBuilding,
  FaHandshake,
  FaUsers,
  FaCogs,
  FaClipboardList,
  FaMoneyBillWave,
  FaFileContract,
  FaChartPie
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getContactEmail } from '../config/environment';
import { useCurrency } from '../hooks/useCurrency';
import CurrencySelector from '../components/CurrencySelector';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'web' | 'ecommerce' | 'custom' | 'strategy';
  features: string[];
  deliveryTime: string;
  popular?: boolean;
  premium?: boolean;
  collaboration?: boolean;
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

interface CollaborationModel {
  scenario: string;
  description: string;
  drexPercentage: number;
  dsaPercentage: number;
  responsibilities: {
    drex: string[];
    dsa: string[];
  };
  icon: React.ReactNode;
  color: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation();
  const { formatPrice, isInitialized, currencyChangeKey, convertPrice, currentCurrency, currencyConfig } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'ecommerce' | 'custom' | 'strategy'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = true; // Forzar siempre visible para depuración

  // MODELO DE REPARTO SEGÚN EL PROMPT
  const collaborationModels: CollaborationModel[] = [
    {
      scenario: "Clientes por DSA Business",
      description: "DSA hace contacto, cotiza y gestiona al cliente. Drex ejecuta el desarrollo técnico.",
      drexPercentage: 60,
      dsaPercentage: 40,
      responsibilities: {
        drex: ["Desarrollo técnico completo", "Implementación", "Testing", "Soporte técnico"],
        dsa: ["Captación del cliente", "Cotización", "Gestión comercial", "Dirección estratégica"]
      },
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      scenario: "Clientes por Drex",
      description: "Drex cotiza y presenta desarrollo. DSA se integra como consultor estratégico.",
      drexPercentage: 70,
      dsaPercentage: 30,
      responsibilities: {
        drex: ["Captación del cliente", "Cotización técnica", "Desarrollo", "Gestión del proyecto"],
        dsa: ["Consultoría estratégica", "Análisis de negocio", "Validación comercial", "Brief estratégico"]
      },
      icon: <FaCode />,
      color: "from-purple-500 to-pink-600"
    },
    {
      scenario: "Proyectos 100% Conjuntos",
      description: "Propuesta desde ambos, división equilibrada del trabajo según carga estimada.",
      drexPercentage: 50,
      dsaPercentage: 50,
      responsibilities: {
        drex: ["Desarrollo técnico", "Arquitectura", "Implementación", "Optimización"],
        dsa: ["Estrategia comercial", "Análisis de mercado", "Gestión comercial", "Seguimiento"]
      },
      icon: <FaHandshake />,
      color: "from-emerald-500 to-cyan-600"
    }
  ];

  const workflowSteps = [
    {
      step: "1",
      title: "Cliente Entra",
      description: "Por DSA Business o Drex",
      icon: <FaUsers />,
      color: "text-blue-400"
    },
    {
      step: "2", 
      title: "Análisis",
      description: "Se evalúa si necesita trabajo conjunto",
      icon: <FaClipboardList />,
      color: "text-purple-400"
    },
    {
      step: "3",
      title: "Propuesta",
      description: "Se define propuesta conjunta o individual",
      icon: <FaFileContract />,
      color: "text-emerald-400"
    },
    {
      step: "4",
      title: "Asignación",
      description: "Roles, tiempos y % acordado",
      icon: <FaCogs />,
      color: "text-orange-400"
    },
    {
      step: "5",
      title: "Ejecución",
      description: "Se ejecuta y entrega el proyecto",
      icon: <FaRocket />,
      color: "text-cyan-400"
    },
    {
      step: "6",
      title: "Facturación",
      description: "Se cobra → se reparte según acuerdo",
      icon: <FaMoneyBillWave />,
      color: "text-green-400"
    }
  ];

  const services: Service[] = [
    // SERVICIOS ACTUALIZADOS CON PRECIOS DEL PROMPT
    {
      id: 'landing-basic',
      name: 'Landing Page Estática',
      description: 'Página web de una sola sección, perfecta para presentar tu producto o servicio de manera efectiva.',
      price: 250, // USD 200-300 según prompt
      originalPrice: 350,
      category: 'web',
      features: [
        'Una sección principal optimizada',
        'Diseño responsive premium',
        'Formulario de contacto básico',
        'Optimización SEO básica',
        'Hosting gratuito por 3 meses',
        'SSL certificado incluido',
        'Velocidad de carga optimizada',
        '2 revisiones incluidas'
      ],
      deliveryTime: '3-5 días',
      icon: <FaRocket />,
      color: 'text-orange-400',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'web-institutional',
      name: 'Web Institucional',
      description: 'Sitio web corporativo completo con 3-5 secciones para mostrar profesionalmente tu empresa.',
      price: 700, // USD 500-900 según prompt
      originalPrice: 900,
      category: 'web',
      features: [
        '3-5 secciones principales',
        'Página de servicios detallada',
        'Sección sobre nosotros',
        'Blog integrado',
        'Galería de imágenes',
        'Formularios avanzados',
        'Optimización SEO completa',
        'Panel de administración básico',
        'Capacitación incluida',
        'Soporte 30 días'
      ],
      deliveryTime: '7-10 días',
      popular: true,
      icon: <FaBuilding />,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'web-backend',
      name: 'Web con Backend/Admin Panel',
      description: 'Aplicación web completa con panel de administración y funcionalidades avanzadas.',
      price: 1400, // Desde USD 1400 según prompt
      category: 'custom',
      features: [
        'Frontend personalizado',
        'Backend con Laravel/PHP',
        'Panel de administración completo',
        'Base de datos optimizada',
        'Sistema de usuarios',
        'API REST completa',
        'Autenticación segura',
        'Gestión de contenidos',
        'Reportes y analytics',
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
      id: 'ecommerce-basic',
      name: 'Tienda Online Básica',
      description: 'E-commerce completo con carrito de compras, pasarela de pagos y gestión de productos.',
      price: 850, // Ajustado dentro del rango
      originalPrice: 1100,
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
      icon: <FaShoppingCart />,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'strategy-diagnosis',
      name: 'Diagnóstico Estratégico + Brief',
      description: 'Análisis completo de tu proyecto digital con brief detallado y recomendaciones estratégicas.',
      price: 150, // USD 150 según prompt
      category: 'strategy',
      features: [
        'Análisis de mercado y competencia',
        'Definición de objetivos digitales',
        'Brief técnico detallado',
        'Recomendaciones estratégicas',
        'Plan de implementación',
        'Estimación de costos',
        'Roadmap del proyecto',
        'Sesión de consultoría 1-a-1'
      ],
      deliveryTime: '3-5 días',
      collaboration: true,
      icon: <FaLightbulb />,
      color: 'text-yellow-400',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'complete-pack',
      name: 'Pack Completo: Estrategia + Desarrollo',
      description: 'Solución integral que combina análisis estratégico con desarrollo completo del proyecto.',
      price: 1100, // USD 900-1200 según prompt
      originalPrice: 1400,
      category: 'strategy',
      features: [
        'Diagnóstico estratégico completo',
        'Desarrollo web personalizado',
        'Diseño UX/UI profesional',
        'Implementación técnica',
        'Optimización para conversiones',
        'Plan de marketing digital',
        'Capacitación del equipo',
        'Soporte estratégico 90 días',
        'Colaboración DSA Business',
        'Seguimiento de resultados'
      ],
      deliveryTime: '4-6 semanas',
      premium: true,
      collaboration: true,
      icon: <FaHandshake />,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-cyan-600'
    },
    {
      id: 'wordpress',
      name: 'Sitio WordPress Personalizado',
      description: 'Sitio web corporativo con WordPress, tema personalizado y funcionalidades avanzadas.',
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
      id: 'ecommerce-enterprise',
      name: 'E-commerce Empresarial',
      description: 'Solución e-commerce completa para empresas con múltiples funcionalidades avanzadas.',
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
      description: 'Servicio de mantenimiento continuo para mantener tu sitio web seguro y actualizado.',
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
    { id: 'custom', name: 'Desarrollo Custom', icon: <FaCode /> },
    { id: 'strategy', name: 'Estrategia + DSA', icon: <FaHandshake /> }
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Soluciones digitales profesionales con precios transparentes. Desde landing pages hasta proyectos estratégicos completos.
          </p>
          
          {/* Currency Selector */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CurrencySelector />
          </motion.div>
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
              } ${service.premium ? 'ring-2 ring-purple-400/50' : ''} ${
                service.collaboration ? 'ring-2 ring-emerald-400/50' : ''
              }`}>
                
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
                  {service.collaboration && (
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <FaHandshake className="text-xs" />
                      CON DSA
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
                    <motion.div 
                      className="flex items-baseline gap-2 mb-2"
                      key={`${service.id}-price-${currencyChangeKey}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-4xl font-black text-white">{formatPrice(convertPrice(service.price))}</span>
                      {service.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{formatPrice(convertPrice(service.originalPrice))}</span>
                      )}
                    </motion.div>
                    {service.originalPrice && (
                      <motion.div 
                        className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold"
                        key={`${service.id}-savings-${currencyChangeKey}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <FaGift className="text-xs" />
                        {t('services.savings', 'Ahorro')} {formatPrice(convertPrice(service.originalPrice) - convertPrice(service.price))}
                      </motion.div>
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

        {/* NUEVA SECCIÓN: Modelo de Colaboración */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Modelo de{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                Colaboración
              </span>
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Estructura transparente de trabajo conjunto entre Drex y DSA Business para maximizar el valor de cada proyecto
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {collaborationModels.map((model, index) => (
              <motion.div
                key={model.scenario}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${model.color} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000`} />
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${model.color} flex items-center justify-center text-white text-2xl shadow-xl`}>
                      {model.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {model.scenario}
                      </h4>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Porcentajes */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-500/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-cyan-400 font-semibold">Reparto de Ganancias:</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Drex (Desarrollo):</span>
                        <span className="text-cyan-400 font-bold text-lg">{model.drexPercentage}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">DSA (Estrategia):</span>
                        <span className="text-emerald-400 font-bold text-lg">{model.dsaPercentage}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Responsabilidades */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                        <FaCode className="text-sm" />
                        Responsabilidades Drex:
                      </h5>
                      <ul className="space-y-1">
                        {model.responsibilities.drex.map((resp, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                        <FaHandshake className="text-sm" />
                        Responsabilidades DSA:
                      </h5>
                      <ul className="space-y-1">
                        {model.responsibilities.dsa.map((resp, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NUEVA SECCIÓN: Flujo de Trabajo */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Flujo de{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Trabajo
              </span>
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Proceso colaborativo optimizado para garantizar transparencia y eficiencia en cada proyecto
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-xl">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Formalidad mínima */}
          <motion.div
            className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                <FaFileContract className="text-emerald-400" />
                Formalidad Mínima por Proyecto
              </h4>
              <p className="text-gray-300">
                Para evitar problemas, acordamos por mensaje lo siguiente en cada proyecto:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <FaUsers />, title: "Quién factura", desc: "Definir responsable de facturación" },
                { icon: <FaCogs />, title: "Tareas de cada uno", desc: "Asignación clara de responsabilidades" },
                { icon: <FaMoneyBillWave />, title: "Cuánto y cuándo", desc: "Monto total y cronograma de pagos" },
                { icon: <FaChartPie />, title: "Comisión/Participación", desc: "Porcentaje acordado para cada parte" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-400/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl text-emerald-400 mb-3">{item.icon}</div>
                  <h5 className="font-semibold text-white mb-2">{item.title}</h5>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Benefits - Movido después de los servicios */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">¿Por qué Elegirnos?</h3>
            <p className="text-gray-400">Garantizamos la calidad y satisfacción en cada proyecto</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                  <div className="text-2xl text-cyan-400">{benefit.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                <motion.div 
                  className="text-2xl font-bold text-cyan-400"
                  key={`addon-${addon.id}-${currencyChangeKey}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatPrice(convertPrice(addon.price))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Garantías y Beneficios */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Por qué{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                elegirme
              </span>{' '}
              para tu proyecto?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Más que un desarrollador, soy tu socio estratégico para el éxito digital de tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Garantía de Calidad",
                description: "Código limpio, optimizado y mantenible que cumple con los más altos estándares de la industria.",
                color: "text-green-400",
                bgColor: "from-green-500/10 to-emerald-500/10"
              },
              {
                icon: <FaHeadset />,
                title: "Soporte 24/7",
                description: "Estoy disponible para resolver cualquier duda o problema que pueda surgir durante y después del desarrollo.",
                color: "text-blue-400",
                bgColor: "from-blue-500/10 to-cyan-500/10"
              },
              {
                icon: <FaRocket />,
                title: "Entrega Rápida",
                description: "Cumplo con los plazos acordados y mantengo una comunicación constante sobre el progreso del proyecto.",
                color: "text-orange-400",
                bgColor: "from-orange-500/10 to-red-500/10"
              },
              {
                icon: <FaHeart />,
                title: "Compromiso Total",
                description: "Me involucro completamente en tu proyecto, entendiendo tus objetivos y trabajando para alcanzarlos.",
                color: "text-purple-400",
                bgColor: "from-purple-500/10 to-pink-500/10"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000" />
                
                <div className={`relative bg-gradient-to-br ${benefit.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 h-full`}>
                  <div className={`text-4xl mb-6 ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección de Preguntas Frecuentes */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Preguntas{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                frecuentes
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resuelve tus dudas sobre mi proceso de trabajo y servicios.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "¿Cuánto tiempo toma desarrollar un proyecto?",
                answer: "El tiempo varía según la complejidad. Una landing page toma 3-5 días, un sitio institucional 7-10 días, y aplicaciones personalizadas 3-4 semanas. Siempre te doy un cronograma detallado al inicio."
              },
              {
                question: "¿Incluyes hosting y dominio en los precios?",
                answer: "Sí, incluyo hosting gratuito por 3 meses y configuración de dominio. También te ayudo a elegir la mejor opción para tu proyecto según tus necesidades."
              },
              {
                question: "¿Qué pasa si no estoy satisfecho con el resultado?",
                answer: "Mi objetivo es tu satisfacción total. Incluyo revisiones gratuitas en todos los proyectos y trabajo hasta que estés completamente satisfecho con el resultado."
              },
              {
                question: "¿Ofreces mantenimiento después del lanzamiento?",
                answer: "Sí, ofrezco planes de mantenimiento mensual que incluyen actualizaciones de seguridad, backups, optimización de velocidad y soporte técnico prioritario."
              },
              {
                question: "¿Qué es la colaboración con DSA Business?",
                answer: "DSA Business es mi socio estratégico para proyectos que requieren análisis comercial profundo. Juntos ofrecemos soluciones integrales que combinan estrategia de negocio con desarrollo técnico."
              },
              {
                question: "¿Trabajas con empresas de otros países?",
                answer: "¡Absolutamente! He trabajado con clientes de diferentes países. Utilizo herramientas de comunicación efectivas y puedo adaptarme a diferentes zonas horarias."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-cyan-400 mt-1">
                      <FaQuestionCircle />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para transformar tu{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                presencia digital
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              No importa el tamaño de tu proyecto, cada idea merece ser ejecutada con excelencia. 
              Hablemos sobre cómo puedo ayudarte a alcanzar tus objetivos digitales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => handleWhatsAppContact('Consulta General')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="text-lg" />
                <span>Consultar por WhatsApp</span>
              </motion.button>
              <motion.button
                onClick={() => handleEmailContact('Consulta General')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-lg" />
                <span>Enviar Email</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;