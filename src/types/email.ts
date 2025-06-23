// Tipos para EmailJS
export interface EmailJSTemplateParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name: string;
  reply_to: string;
  [key: string]: string; // Índice de string para compatibilidad con EmailJS
}

export interface EmailJSResponse {
  success: boolean;
  message: string;
}

// Tipos para el formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Tipos para la configuración de EmailJS
export interface EmailJSConfig {
  SERVICE_ID: string;
  TEMPLATE_ID: string;
  PUBLIC_KEY: string;
} 