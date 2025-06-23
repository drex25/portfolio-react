import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
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
      url: 'https://github.com/tuusuario',
      color: 'hover:text-gray-300',
      bgColor: 'hover:bg-gray-800/20',
      description: 'Revisa mi código'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/tuusuario',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/20',
      description: 'Conectemos profesionalmente'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/tuusuario',
      color: 'hover:text-sky-400',
      bgColor: 'hover:bg-sky-900/20',
      description: 'Sígueme para updates'
    }
  ];

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'sylvain.drexler@email.com',
      link: 'mailto:sylvain.drexler@email.com',
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/10 to-blue-500/10',
      borderColor: 'border-cyan-500/20',
      description: 'Respuesta en 24h'
    },
    {
      icon: FaPhone,
      title: 'Teléfono',
      content: '+54 376 123-4567',
      link: 'tel:+543761234567',
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="contact"
    >
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            <FaComments className="text-cyan-400 text-xl" />
            <span className="text-cyan-400 font-semibold">¡Hablemos!</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Features destacadas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                <feature.icon className="text-2xl text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Información de contacto - 2 columnas */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Métodos de contacto */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaLightbulb className="text-cyan-400" />
                {t('contact.contactInfo')}
              </h3>
              
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 rounded-2xl bg-gradient-to-r ${method.bgColor} border ${method.borderColor} hover:border-cyan-400/50 transition-all duration-300 group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform`}>
                      <method.icon className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-lg mb-1">
                        {method.title}
                      </h4>
                      <p className="text-gray-300 font-medium mb-2">{method.content}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaHeart className="text-pink-400" />
                {t('contact.socialMedia')}
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 ${social.color} ${social.bgColor} hover:border-cyan-400/50 transition-all duration-300 group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <social.icon className="text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{social.name}</div>
                      <div className="text-sm text-gray-400">{social.description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Estado de disponibilidad */}
            <motion.div
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-400 rounded-full" />
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-green-400 font-bold text-lg">{t('contact.available')}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t('contact.availableDesc')}
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-green-400">
                <FaClock />
                <span>Tiempo de respuesta promedio: 24 horas</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Formulario de contacto - 3 columnas */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-50" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <FaPaperPlane className="text-cyan-400" />
                    {t('contact.sendMessage')}
                  </h3>
                  <p className="text-gray-400">
                    Cuéntame sobre tu proyecto y trabajemos juntos para hacerlo realidad
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nombre y Email en una fila */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
                        {t('contact.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: t('contact.nameRequired') })}
                        className={`w-full px-6 py-4 rounded-xl border ${
                          errors.name ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                        } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm`}
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
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
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
                        className={`w-full px-6 py-4 rounded-xl border ${
                          errors.email ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                        } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm`}
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
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-3">
                      {t('contact.subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: t('contact.subjectRequired') })}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.subject ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                      } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm`}
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
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message', { required: t('contact.messageRequired') })}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.message ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'
                      } text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none backdrop-blur-sm`}
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
                    className={`w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/25'
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
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-xl" />
                          {t('contact.send')}
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Mensajes de estado */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-4 text-green-400"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaCheckCircle className="text-2xl flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1">¡Mensaje enviado con éxito!</div>
                        <div className="text-sm text-green-300">{t('contact.success')}</div>
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
                        <div className="font-bold mb-1">Error al enviar</div>
                        <div className="text-sm text-red-300">{t('contact.error')}</div>
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
          className="text-center mt-20"
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
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Transformemos tus ideas en realidad. Cada gran proyecto comienza con una conversación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:sylvain.drexler@email.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-lg" />
                Enviar Email Directo
              </motion.a>
              <motion.a
                href="/cv"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCode className="text-lg" />
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