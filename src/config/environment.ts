// Configuración del entorno de la aplicación
export const ENV_CONFIG = {
  // Entorno
  ENV: import.meta.env.VITE_APP_ENV || 'development',
  IS_PRODUCTION: import.meta.env.VITE_APP_ENV === 'production',
  IS_DEVELOPMENT: import.meta.env.VITE_APP_ENV === 'development',

  // URLs y dominio
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN || 'itsdrex.dev',
  APP_PROTOCOL: import.meta.env.VITE_APP_PROTOCOL || 'https',

  // EmailJS
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,

  // Emails
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'contacto@itsdrex.dev',
  ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL || 'admin@itsdrex.dev',

  // Analytics
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID,

  // SEO
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Sylvain Drexler - Full Stack Developer',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Portfolio profesional de Sylvain Drexler, desarrollador Full Stack especializado en React, Laravel y WordPress',
  APP_AUTHOR: import.meta.env.VITE_APP_AUTHOR || 'Sylvain Drexler',
};

// Función para obtener la URL completa
export const getFullUrl = (path: string = ''): string => {
  const baseUrl = ENV_CONFIG.IS_PRODUCTION 
    ? `${ENV_CONFIG.APP_PROTOCOL}://${ENV_CONFIG.APP_DOMAIN}`
    : ENV_CONFIG.APP_URL;
  
  return `${baseUrl}${path}`;
};

// Función para verificar si estamos en producción
export const isProduction = (): boolean => {
  return ENV_CONFIG.IS_PRODUCTION;
};

// Función para obtener la URL del dominio
export const getDomain = (): string => {
  return ENV_CONFIG.APP_DOMAIN;
};

// Función para obtener el email de contacto
export const getContactEmail = (): string => {
  return ENV_CONFIG.CONTACT_EMAIL;
};

// Función para obtener el email de administración
export const getAdminEmail = (): string => {
  return ENV_CONFIG.ADMIN_EMAIL;
}; 