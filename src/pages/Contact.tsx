import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaRocket,
  FaHeart,
  FaStar,
  FaCode,
  FaLightbulb,
  FaComments,
  FaGlobe,
  FaCalendarAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { sendEmail } from '../config/emailjs';
import { getContactEmail } from '../config/environment';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/drex25',
      color: 'hover:text-gray-300',
      bgColor: 'hover:bg-gray-800/20',
      description: 'Revisa mi código',
      gradient: 'from-gray-600 to-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/20',
      description: 'Conectemos profesionalmente',
      gradient: 'from-blue-600 to-blue-800'
    }
  ];

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email Profesional',
      content: getContactEmail(),
      link: `mailto:${getContactEmail()}`,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/10 to-blue-500/10',
      borderColor: 'border-cyan-500/20',
      description: 'Respuesta garantizada en 24h',
      badge: 'Prioritario'
    },
    {
      icon: FaPhone,
      title: 'Llamada Directa',
      content: '+54 376 511-5897',
      link: 'tel:+543765115897',
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/20',
      description: 'Lun-Vie 9AM-6PM (GMT-3)',
      badge: 'Inmediato'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      content: 'Posadas, Misiones, Argentina',
      link: 'https://maps.google.com/?q=Posadas,Misiones,Argentina',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
      description: 'Zona horaria: GMT-3 (ART)',
      badge: 'Local'
    }
  ];

  const features = [
    {
      icon: FaRocket,
      title: 'Respuesta Ultra Rápida',
      description: 'Respondo todos los mensajes en menos de 24 horas, garantizado',
      color: 'text-orange-400',
      gradient: 'from-orange-500/10 to-red-500/10'
    },
    {
      icon: FaHeart,
      title: 'Proyectos Apasionantes',
      description: 'Me especializo en proyectos innovadores y desafiantes que marquen la diferencia',
      color: 'text-pink-400',
      gradient: 'from-pink-500/10 to-rose-500/10'
    },
    {
      icon: FaStar,
      title: 'Calidad Premium',
      description: 'Compromiso absoluto con la excelencia en cada línea de código',
      color: 'text-yellow-400',
      gradient: 'from-yellow-500/10 to-amber-500/10'
    },
    {
      icon: FaCode,
      title: 'Stack Moderno',
      description: 'Siempre actualizado con las últimas tecnologías y mejores prácticas',
      color: 'text-cyan-400',
      gradient: 'from-cyan-500/10 to-blue-500/10'
    }
  ];

  const stats = [
    { number: '5+', label: 'Años de Experiencia', icon: FaCalendarAlt },
    { number: '50+', label: 'Proyectos Completados', icon: FaRocket },
    { number: '100%', label: 'Satisfacción Cliente', icon: FaShieldAlt },
    { number: '24h', label: 'Tiempo de Respuesta', icon: FaClock }
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Obtener fecha y hora actual
      const now = new Date();
      const formattedDate = now.toLocaleString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Argentina/Buenos_Aires'
      });

      // Preparar los parámetros para EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Sylvain Drexler',
        reply_to: 'https://itsdrex.dev',
        current_date: formattedDate,
      };

      // Enviar email usando EmailJS
      const result = await sendEmail(templateParams);
      
      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 sm:py-20"
      id="contact"
    >
      {/* Fondo con patrón mejorado */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Efectos de fondo dinámicos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header mejorado */}
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaComments className="text-cyan-400 text-xl" />
            <span className="text-cyan-400 font-bold">¡Hablemos de tu proyecto!</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Contacto
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            ¿Tienes una idea increíble? Transformemos juntos tu visión en una realidad digital excepcional
          </p>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <stat.icon className="text-3xl text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features destacadas mejoradas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`relative p-6 bg-gradient-to-br ${feature.gradient} backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`text-2xl ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed text-center">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contenido principal mejorado */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Información de contacto mejorada */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Métodos de contacto premium */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaLightbulb className="text-cyan-400" />
                Canales de Comunicación
              </h3>
              
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 rounded-2xl bg-gradient-to-r ${method.bgColor} border ${method.borderColor} hover:border-cyan-400/50 transition-all duration-300 group relative overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-xs font-bold border border-cyan-400/30">
                      {method.badge}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform flex-shrink-0 border border-white/20`}>
                      <method.icon className="text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-lg mb-2">
                        {method.title}
                      </h4>
                      <p className="text-gray-300 font-medium mb-2 break-words">{method.content}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Redes sociales premium */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaGlobe className="text-cyan-400" />
                Sígueme en Redes
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${social.gradient}/10 border border-white/10 ${social.color} ${social.bgColor} hover:border-cyan-400/50 transition-all duration-300 group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.9 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 border border-white/20">
                      <social.icon className="text-xl" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-base">{social.name}</div>
                      <div className="text-sm text-gray-400">{social.description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Estado de disponibilidad premium */}
            <motion.div
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                  <span className="text-green-400 font-bold text-lg">Disponible para Proyectos</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Actualmente acepto nuevos proyectos y colaboraciones. Mi agenda está abierta para oportunidades emocionantes.
                </p>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <FaClock />
                  <span>Respuesta garantizada en menos de 24 horas</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Formulario de contacto premium */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-50" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <FaPaperPlane className="text-cyan-400" />
                    Cuéntame tu Proyecto
                  </h3>
                  <p className="text-gray-400">
                    Completa el formulario y te responderé con una propuesta personalizada en menos de 24 horas
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nombre y Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-3">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'El nombre es requerido' })}
                        className={`w-full px-6 py-4 rounded-xl border ${
                          errors.name ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                        } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && (
                        <motion.p 
                          className="mt-2 text-sm text-red-400 flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaExclamationTriangle className="text-xs" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-3">
                        Email Profesional *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'El email es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Por favor ingresa un email válido'
                          }
                        })}
                        className={`w-full px-6 py-4 rounded-xl border ${
                          errors.email ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                        } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <motion.p 
                          className="mt-2 text-sm text-red-400 flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaExclamationTriangle className="text-xs" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-300 mb-3">
                      Tipo de Proyecto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: 'El asunto es requerido' })}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.subject ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                      } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm`}
                      placeholder="Ej: Desarrollo de E-commerce, Landing Page, Aplicación Web..."
                    />
                    {errors.subject && (
                      <motion.p 
                        className="mt-2 text-sm text-red-400 flex items-center gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-3">
                      Detalles del Proyecto *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message', { required: 'El mensaje es requerido' })}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.message ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                      } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none backdrop-blur-sm`}
                      placeholder="Cuéntame sobre tu proyecto: objetivos, funcionalidades deseadas, cronograma, presupuesto estimado, etc. Mientras más detalles, mejor podrá ser mi propuesta."
                    />
                    {errors.message && (
                      <motion.p 
                        className="mt-2 text-sm text-red-400 flex items-center gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Botón de envío premium */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl hover:shadow-cyan-500/25'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {/* Efecto de brillo */}
                    {!isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    
                    <div className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Enviando Proyecto...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-xl" />
                          Enviar Proyecto
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Mensajes de estado mejorados */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-4 text-green-400"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaCheckCircle className="text-2xl flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1">¡Proyecto recibido exitosamente!</div>
                        <div className="text-sm text-green-300">Te responderé con una propuesta personalizada en menos de 24 horas.</div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-4 text-red-400"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaExclamationTriangle className="text-2xl flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1">Error al enviar el proyecto</div>
                        <div className="text-sm text-red-300">Por favor, intenta de nuevo o contáctame directamente por email.</div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to action final premium */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-12 max-w-5xl mx-auto relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5" />
            
            <div className="relative z-10">
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaRocket className="text-4xl text-white" />
              </motion.div>
              <h3 className="text-4xl font-bold text-white mb-4">
                ¿Listo para Revolucionar tu Presencia Digital?
              </h3>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
                Cada proyecto excepcional comienza con una conversación. Transformemos juntos tu visión en una experiencia digital que marque la diferencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={`mailto:${getContactEmail()}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="text-lg" />
                  Email Directo
                </motion.a>
                <motion.a
                  href="/cv"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCode className="text-lg" />
                  Ver CV Completo
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;