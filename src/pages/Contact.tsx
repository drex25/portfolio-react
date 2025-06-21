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
  FaExclamationTriangle
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/tuusuario',
    color: 'hover:text-gray-300',
    bgColor: 'hover:bg-gray-800'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/tuusuario',
    color: 'hover:text-blue-400',
    bgColor: 'hover:bg-blue-900/20'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/tuusuario',
    color: 'hover:text-sky-400',
    bgColor: 'hover:bg-sky-900/20'
  }
];

const contactInfo = [
  {
    icon: FaEnvelope,
    title: 'Email',
    content: 'sylvain.drexler@email.com',
    link: 'mailto:sylvain.drexler@email.com',
    color: 'text-cyan-400'
  },
  {
    icon: FaPhone,
    title: 'Teléfono',
    content: '+54 376 123-4567',
    link: 'tel:+543761234567',
    color: 'text-green-400'
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Ubicación',
    content: 'Posadas, Misiones, Argentina',
    link: 'https://maps.google.com/?q=Posadas,Misiones,Argentina',
    color: 'text-purple-400'
  }
];

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

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
      // Simulación de envío
      console.log('Form data:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a convertirlas en realidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Información de contacto */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tarjeta principal */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}>
                      <info.icon className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {info.title}
                      </h4>
                      <p className="text-gray-400">{info.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Sígueme en</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} ${social.bgColor} hover:border-cyan-400/50 transition-all duration-300`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Disponibilidad */}
            <motion.div
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold">Disponible para proyectos</span>
              </div>
              <p className="text-gray-300 text-sm">
                Actualmente acepto nuevos proyectos y colaboraciones. 
                Tiempo de respuesta promedio: 24 horas.
              </p>
            </motion.div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Envíame un mensaje</h3>
              
              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'El nombre es requerido' })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-500' : 'border-white/20'
                    } bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all`}
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

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'El email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    } bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all`}
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

                {/* Asunto */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'El asunto es requerido' })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.subject ? 'border-red-500' : 'border-white/20'
                    } bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all`}
                    placeholder="¿En qué puedo ayudarte?"
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'El mensaje es requerido' })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? 'border-red-500' : 'border-white/20'
                    } bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none`}
                    placeholder="Cuéntame sobre tu proyecto..."
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
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/25'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      Enviar Mensaje
                    </>
                  )}
                </motion.button>

                {/* Mensajes de estado */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaCheckCircle />
                    <span>¡Mensaje enviado con éxito! Te responderé pronto.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaExclamationTriangle />
                    <span>Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;