import emailjs from '@emailjs/browser';
import type { EmailJSTemplateParams, EmailJSResponse, EmailJSConfig } from '../types/email';

// Configuración de EmailJS
export const EMAILJS_CONFIG: EmailJSConfig = {
  // Service ID - Reemplaza con tu Service ID de EmailJS
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default',
  
  // Template ID - Reemplaza con tu Template ID de EmailJS
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default',
  
  // Public Key - Reemplaza con tu Public Key de EmailJS
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_default',
};

// Inicializar EmailJS
export const initEmailJS = (): void => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Función para enviar email
export const sendEmail = async (templateParams: EmailJSTemplateParams): Promise<EmailJSResponse> => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    if (response.status === 200) {
      return {
        success: true,
        message: 'Email enviado exitosamente!'
      };
    } else {
      throw new Error('Error al enviar email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Error al enviar el email. Por favor, inténtalo de nuevo.'
    };
  }
}; 