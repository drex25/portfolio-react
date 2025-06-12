import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
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
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/tuusuario',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/tuusuario',
    color: 'hover:text-sky-500'
  }
];

const contactInfo = [
  {
    icon: FaEnvelope,
    title: 'Email',
    content: 'tu@email.com',
    link: 'mailto:tu@email.com'
  },
  {
    icon: FaPhone,
    title: 'Teléfono',
    content: '+123 456 7890',
    link: 'tel:+1234567890'
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Ubicación',
    content: 'Ciudad, País',
    link: 'https://maps.google.com'
  }
];

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      // Aquí iría tu lógica para enviar el formulario
      // Por ejemplo, una llamada a una API
      console.log('Form data:', formData); // Log the form data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación de envío
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen py-20 flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-black" id="contact">
      {/* Fondo animado de neón (fijo, sin movimiento) */}
      <div className="absolute inset-0 -z-10 animate-gradient-xy" style={{
        background: 'linear-gradient(120deg, #00fff7 0%, #005bea 100%)',
        filter: 'blur(80px) opacity(0.7)'
      }} />
      {/* Partículas y destellos */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
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
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00fff7] via-[#005bea] to-[#00fff7] drop-shadow-[0_0_16px_#00fff7] font-mono tracking-tight">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] mx-auto rounded-full mb-4" />
          <p className="text-[#e0e0e0] font-mono drop-shadow-[0_0_8px_#00fff7] max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos! Estoy aquí para ayudarte a hacerlo realidad.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information + Avatar + QR */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* QR de contacto destacado */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <motion.div
                className="w-28 h-28 rounded-xl border-2 border-[#00fff7] shadow-[0_0_16px_#00fff7] bg-white flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.08, boxShadow: '0 0 32px #00fff7' }}
              >
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://linkedin.com/in/tuusuario" alt="QR para conectar por LinkedIn" className="w-24 h-24" />
              </motion.div>
              <span className="text-xs text-[#00fff7] font-mono mt-1">Escanea para conectar en LinkedIn</span>
            </div>
            {/* Información de contacto */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-[2px] rounded-2xl p-8 border-2 border-[#00fff7]">
                <h3 className="text-2xl font-bold mb-6 text-[#00fff7] font-mono drop-shadow-[0_0_8px_#00fff7]">
                  Información de Contacto
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#00fff7]/20 flex items-center justify-center text-[#00fff7] shadow-[0_0_16px_#00fff7] group-hover:bg-[#00fff7] group-hover:text-black transition-colors">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#00fff7] group-hover:text-[#005bea] font-mono transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-[#e0e0e0] font-mono">{info.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            {/* Redes Sociales */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-[2px] rounded-2xl p-8 border-2 border-[#00fff7]">
                <h3 className="text-2xl font-bold mb-6 text-[#00fff7] font-mono drop-shadow-[0_0_8px_#00fff7]">
                  Redes Sociales
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-12 h-12 rounded-full bg-[#00fff7]/20 flex items-center justify-center text-[#00fff7] shadow-[0_0_16px_#00fff7] hover:bg-[#00fff7] hover:text-black transition-colors`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff7] to-[#005bea] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-[2px] rounded-2xl p-8 border-2 border-[#00fff7]">
                <div className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#00fff7] font-mono mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'El nombre es requerido' })}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.name ? 'border-red-500' : 'border-[#00fff7]'
                      } bg-black/60 text-white font-mono focus:ring-2 focus:ring-[#00fff7] focus:border-transparent transition-colors`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 font-mono">{errors.name.message}</p>
                    )}
                  </div>
                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#00fff7] font-mono mb-2">
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
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.email ? 'border-red-500' : 'border-[#00fff7]'
                      } bg-black/60 text-white font-mono focus:ring-2 focus:ring-[#00fff7] focus:border-transparent transition-colors`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 font-mono">{errors.email.message}</p>
                    )}
                  </div>
                  {/* Subject field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#00fff7] font-mono mb-2">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: 'El asunto es requerido' })}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.subject ? 'border-red-500' : 'border-[#00fff7]'
                      } bg-black/60 text-white font-mono focus:ring-2 focus:ring-[#00fff7] focus:border-transparent transition-colors`}
                      placeholder="Asunto del mensaje"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500 font-mono">{errors.subject.message}</p>
                    )}
                  </div>
                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#00fff7] font-mono mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'El mensaje es requerido' })}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.message ? 'border-red-500' : 'border-[#00fff7]'
                      } bg-black/60 text-white font-mono focus:ring-2 focus:ring-[#00fff7] focus:border-transparent transition-colors resize-none`}
                      placeholder="Tu mensaje..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500 font-mono">{errors.message.message}</p>
                    )}
                  </div>
                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg text-black font-semibold font-mono shadow-[0_0_16px_#00fff7] ${
                      isSubmitting
                        ? 'bg-[#00fff7]/60 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#00fff7] to-[#005bea] hover:from-[#005bea] hover:to-[#00fff7]'
                    } transition-all`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </motion.button>
                  {/* Status message */}
                  {submitStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-center font-mono"
                    >
                      ¡Mensaje enviado con éxito! Te responderé pronto.
                    </motion.p>
                  )}
                  {submitStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-center font-mono"
                    >
                      Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                    </motion.p>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;