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
  FaComments
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
      description: 'Revisa mi código'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/20',
      description: 'Conectemos profesionalmente'
    }
  ];

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      content: getContactEmail(),
      link: `mailto:${getContactEmail()}`,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/10 to-blue-500/10',
      borderColor: 'border-cyan-500/20',
      description: 'Respuesta en 24h'
    },
    {
      icon: FaPhone,
      title: 'Teléfono',
      content: '+54 376 511-5897',
      link: 'tel:+543765115897',
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/20',
      description: 'Lun-Vie 9AM-6PM'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      content: 'Posadas, Misiones, Argentina',
      link: 'https://maps.google.com/?q=Posadas,Misiones,Argentina',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
      description: 'GMT-3 (ART)'
    }
  ];

  const features = [
    {
      icon: FaRocket,
      title: 'Respuesta Rápida',
      description: 'Respondo todos los mensajes en menos de 24 horas'
    },
    {
      icon: FaHeart,
      title: 'Proyectos Apasionantes',
      description: 'Me encanta trabajar en proyectos innovadores y desafiantes'
    },
    {
      icon: FaStar,
      title: 'Calidad Garantizada',
      description: 'Compromiso con la excelencia en cada línea de código'
    },
    {
      icon: FaCode,
      title: 'Tecnologías Modernas',
      description: 'Siempre actualizado con las últimas tendencias tech'
    }
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
      // Preparar los parámetros para EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Sylvain Drexler', // Tu nombre
        reply_to: formData.email,
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
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Partículas flotantes - Reducidas en móvil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 8,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaComments className="text-cyan-400 text-lg sm:text-xl" />
            <span className="text-cyan-400 font-semibold text-sm sm:text-base">¡Hablemos!</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            {t('contact.title')}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6 sm:mb-8" />
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Features destacadas - Responsive grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                <feature.icon className="text-xl sm:text-2xl text-cyan-400" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contenido principal - Layout mejorado para móvil */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Información de contacto - Responsive */}
          <motion.div
            className="lg:col-span-2 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Métodos de contacto */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FaLightbulb className="text-cyan-400" />
                {t('contact.contactInfo')}
              </h3>
              
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${method.bgColor} border ${method.borderColor} hover:border-cyan-400/50 transition-all duration-300 group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ scale: 1.01, y: -1 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-10 sm:w-14 h-10 sm:h-14 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <method.icon className="text-lg sm:text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-base sm:text-lg mb-1">
                        {method.title}
                      </h4>
                      <p className="text-gray-300 font-medium mb-1 sm:mb-2 text-sm sm:text-base break-words">{method.content}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{method.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Redes sociales - Simplificadas */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FaHeart className="text-pink-400" />
                Sígueme en
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 ${social.color} ${social.bgColor} hover:border-cyan-400/50 transition-all duration-300 group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    whileHover={{ scale: 1.01, x: 2 }}
                  >
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <social.icon className="text-lg sm:text-xl" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm sm:text-base">{social.name}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{social.description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Estado de disponibilidad */}
            <motion.div
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="relative">
                  <div className="w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full" />
                  <div className="absolute inset-0 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-green-400 font-bold text-base sm:text-lg">{t('contact.available')}</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {t('contact.availableDesc')}
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-3 text-xs sm:text-sm text-green-400">
                <FaClock />
                <span>Tiempo de respuesta promedio: 24 horas</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Formulario de contacto - Mejorado para móvil */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-50" />
              
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                    <FaPaperPlane className="text-cyan-400" />
                    {t('contact.sendMessage')}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Cuéntame sobre tu proyecto y trabajemos juntos para hacerlo realidad
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Nombre y Email - Stack en móvil */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                        {t('contact.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: t('contact.nameRequired') })}
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border ${
                          errors.name ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                        } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm text-sm sm:text-base`}
                        placeholder={t('contact.namePlaceholder')}
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
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                        {t('contact.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: t('contact.emailRequired'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('contact.emailInvalid')
                          }
                        })}
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border ${
                          errors.email ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                        } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm text-sm sm:text-base`}
                        placeholder={t('contact.emailPlaceholder')}
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
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                      {t('contact.subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: t('contact.subjectRequired') })}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border ${
                        errors.subject ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                      } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm text-sm sm:text-base`}
                      placeholder={t('contact.subjectPlaceholder')}
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
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message', { required: t('contact.messageRequired') })}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border ${
                        errors.message ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                      } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none backdrop-blur-sm text-sm sm:text-base`}
                      placeholder={t('contact.messagePlaceholder')}
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

                  {/* Botón de envío */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 sm:py-5 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/25'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.01, y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                  >
                    {/* Efecto de brillo */}
                    {!isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-lg sm:text-xl" />
                          {t('contact.send')}
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Mensajes de estado */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="p-4 sm:p-6 bg-green-500/10 border border-green-500/20 rounded-lg sm:rounded-xl flex items-center gap-3 sm:gap-4 text-green-400"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaCheckCircle className="text-xl sm:text-2xl flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1 text-sm sm:text-base">¡Mensaje enviado con éxito!</div>
                        <div className="text-xs sm:text-sm text-green-300">{t('contact.success')}</div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="p-4 sm:p-6 bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl flex items-center gap-3 sm:gap-4 text-red-400"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaExclamationTriangle className="text-xl sm:text-2xl flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1 text-sm sm:text-base">Error al enviar</div>
                        <div className="text-xs sm:text-sm text-red-300">{t('contact.error')}</div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to action final */}
        <motion.div
          className="text-center mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
            <motion.div
              className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaRocket className="text-2xl sm:text-3xl text-white" />
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Transformemos tus ideas en realidad. Cada gran proyecto comienza con una conversación.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href={`mailto:${getContactEmail()}`}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="text-base sm:text-lg" />
                Enviar Email Directo
              </motion.a>
              <motion.a
                href="/cv"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCode className="text-base sm:text-lg" />
                Ver mi CV
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;