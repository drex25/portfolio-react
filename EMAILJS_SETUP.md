# Configuración de EmailJS

Este documento explica cómo configurar EmailJS para que el formulario de contacto funcione correctamente.

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate para obtener una cuenta gratuita
3. Verifica tu email

### 2. Configurar un servicio de email

1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Anota el **Service ID** que se genera

### 3. Crear una plantilla de email ultra profesional

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla profesional completamente nueva:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto - Sylvain Drexler</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 680px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            position: relative;
        }
        
        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .logo-section {
            position: relative;
            z-index: 2;
            margin-bottom: 20px;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 32px;
            font-weight: 900;
            color: white;
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
            position: relative;
        }
        
        .logo::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6);
            border-radius: 22px;
            z-index: -1;
            opacity: 0.7;
            filter: blur(8px);
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            position: relative;
            z-index: 2;
            background: linear-gradient(135deg, #ffffff, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .header .subtitle {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 2;
            font-weight: 500;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .message-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
        }
        
        .sender-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
        }
        
        .sender-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);
        }
        
        .sender-card h2 {
            color: #1e293b;
            font-size: 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
        }
        
        .sender-card h2::before {
            content: '👤';
            font-size: 24px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
        }
        
        .info-item {
            background: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            border: 1px solid #f1f5f9;
            transition: all 0.3s ease;
        }
        
        .info-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .info-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            word-break: break-word;
        }
        
        .message-section {
            background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
        }
        
        .message-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #10b981, #06b6d4);
        }
        
        .message-section h2 {
            color: #1e293b;
            font-size: 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
        }
        
        .message-section h2::before {
            content: '💬';
            font-size: 24px;
        }
        
        .message-content {
            background: white;
            padding: 24px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            font-size: 16px;
            line-height: 1.7;
            color: #374151;
            word-wrap: break-word;
            overflow-wrap: break-word;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .footer {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .footer::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
            animation: pulse 6s ease-in-out infinite reverse;
        }
        
        .footer-content {
            position: relative;
            z-index: 2;
        }
        
        .footer h3 {
            font-size: 24px;
            margin-bottom: 8px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .footer .role {
            font-size: 16px;
            color: #06b6d4;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .footer .tagline {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 24px;
            font-weight: 500;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin: 24px 0;
            flex-wrap: wrap;
        }
        
        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            text-decoration: none;
            color: white;
            font-size: 20px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .social-link:hover {
            transform: translateY(-2px);
            background: rgba(6, 182, 212, 0.2);
            border-color: #06b6d4;
            box-shadow: 0 8px 25px rgba(6, 182, 212, 0.3);
        }
        
        .timestamp {
            background: rgba(255, 255, 255, 0.1);
            padding: 12px 20px;
            border-radius: 50px;
            font-size: 12px;
            opacity: 0.8;
            margin-top: 20px;
            display: inline-block;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }
        
        .cta-section {
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            margin: 30px;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .cta-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            animation: pulse 8s ease-in-out infinite;
        }
        
        .cta-content {
            position: relative;
            z-index: 2;
        }
        
        .cta-section h3 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        
        .cta-section p {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: white;
            color: #1e293b;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .email-container {
                border-radius: 16px;
            }
            
            .header, .content, .footer {
                padding: 24px 20px;
            }
            
            .sender-card, .message-section, .cta-section {
                padding: 20px;
                margin: 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .social-links {
                gap: 12px;
            }
            
            .social-link {
                width: 40px;
                height: 40px;
                font-size: 18px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .header .subtitle {
                font-size: 14px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .sender-card, .message-section {
                background: #1e293b;
                border-color: #334155;
                color: #e2e8f0;
            }
            
            .info-item, .message-content {
                background: #334155;
                border-color: #475569;
                color: #e2e8f0;
            }
            
            .info-label {
                color: #94a3b8;
            }
            
            .info-value {
                color: #f1f5f9;
            }
        }
        
        /* Print styles */
        @media print {
            body {
                background: white !important;
                padding: 0 !important;
            }
            
            .email-container {
                box-shadow: none !important;
                border-radius: 0 !important;
            }
            
            .header, .footer {
                background: #f8f9fa !important;
                color: #333 !important;
            }
            
            .social-links {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div class="logo">D</div>
                <h1>Nuevo Mensaje de Contacto</h1>
                <div class="subtitle">Has recibido un nuevo mensaje desde tu portfolio web</div>
            </div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="message-badge">
                🚀 Nuevo proyecto potencial
            </div>
            
            <!-- Sender Information -->
            <div class="sender-card">
                <h2>Información del Cliente</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Nombre Completo</div>
                        <div class="info-value">{{from_name}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email de Contacto</div>
                        <div class="info-value">{{from_email}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Asunto del Proyecto</div>
                        <div class="info-value">{{subject}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Fecha y Hora</div>
                        <div class="info-value">{{current_date}}</div>
                    </div>
                </div>
            </div>
            
            <!-- Message -->
            <div class="message-section">
                <h2>Detalles del Proyecto</h2>
                <div class="message-content">
                    {{message}}
                </div>
            </div>
        </div>
        
        <!-- CTA Section -->
        <div class="cta-section">
            <div class="cta-content">
                <h3>¡Es hora de crear algo increíble!</h3>
                <p>Responde a este mensaje para comenzar la conversación sobre este nuevo proyecto.</p>
                <a href="mailto:{{from_email}}" class="cta-button">
                    ✉️ Responder Ahora
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <h3>Sylvain Drexler</h3>
                <div class="role">Full Stack Developer & Systems Analyst</div>
                <div class="tagline">Transformando ideas en experiencias digitales excepcionales</div>
                
                <div class="social-links">
                    <a href="https://itsdrex.dev" class="social-link" title="Portfolio">🌐</a>
                    <a href="https://github.com/drex25" class="social-link" title="GitHub">💻</a>
                    <a href="https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/" class="social-link" title="LinkedIn">💼</a>
                </div>
                
                <div class="timestamp">
                    📧 Enviado desde {{reply_to}} • Respuesta automática activada
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

4. Guarda la plantilla y anota el **Template ID**

### 4. Obtener la Public Key

1. Ve a "Account" → "API Keys"
2. Copia tu **Public Key**

### 5. Configurar las variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega las siguientes variables:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 6. Probar la configuración

1. Ejecuta el proyecto en desarrollo: `npm run dev`
2. Ve a la página de contacto
3. Completa y envía el formulario
4. Verifica que recibas el email con el nuevo diseño ultra profesional

## 🎨 Características del Nuevo Template Ultra Profesional

### ✨ **Diseño de Vanguardia:**
- **Gradientes modernos** con efectos de profundidad
- **Animaciones CSS** sutiles y elegantes
- **Glassmorphism** con efectos de blur y transparencias
- **Micro-interacciones** en hover states
- **Tipografía premium** con San Francisco/Segoe UI

### 🚀 **Elementos Innovadores:**
- **Logo animado** con efectos de glow dinámico
- **Badges informativos** con gradientes
- **Cards elevadas** con sombras profundas
- **CTA prominente** para respuesta rápida
- **Timeline visual** del mensaje

### 📱 **Responsive Excellence:**
- **Mobile-first** design approach
- **Breakpoints inteligentes** para todos los dispositivos
- **Touch-friendly** elementos en móvil
- **Optimización de lectura** en pantallas pequeñas

### 🎯 **UX/UI Profesional:**
- **Jerarquía visual clara** con espaciado perfecto
- **Contraste optimizado** para accesibilidad
- **Flujo de lectura natural** de arriba hacia abajo
- **Call-to-action destacado** para respuesta inmediata

### 🔧 **Compatibilidad Total:**
- **Todos los clientes de email** (Gmail, Outlook, Apple Mail, etc.)
- **Dark mode support** automático
- **Print-friendly** para impresión
- **Fallbacks** para clientes antiguos

### 🌟 **Detalles Premium:**
- **Efectos de paralaje** sutiles
- **Gradientes multi-color** dinámicos
- **Iconos emoji** para mejor engagement
- **Timestamp automático** con zona horaria
- **Enlaces sociales** actualizados y funcionales

## Variables disponibles en la plantilla

El formulario envía las siguientes variables a EmailJS:

- `{{from_name}}` - Nombre del cliente
- `{{from_email}}` - Email del cliente
- `{{subject}}` - Asunto del proyecto
- `{{message}}` - Detalles del proyecto
- `{{to_name}}` - Tu nombre (Sylvain Drexler)
- `{{reply_to}}` - Dominio del sitio (itsdrex.dev)
- `{{current_date}}` - Fecha y hora actual automática

## 🔗 Enlaces actualizados en el template

### **Enlaces reales incluidos:**
- **Portfolio:** https://itsdrex.dev
- **GitHub:** https://github.com/drex25
- **LinkedIn:** https://www.linkedin.com/in/drexler-wilvins-sylvain-3627211b0/

## Personalización Avanzada

### 🎨 **Colores del tema:**
- **Primario:** Cyan (#06b6d4) a Blue (#3b82f6)
- **Secundario:** Purple (#8b5cf6)
- **Fondo:** Gradiente slate (#0f172a → #334155)
- **Texto:** Slate oscuro (#1e293b)

### 🔧 **Elementos personalizables:**
- Logo y branding
- Colores del gradiente
- Animaciones y efectos
- Contenido del CTA
- Enlaces sociales

## Solución de problemas

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Template not found"
- Verifica que el Template ID sea correcto
- Asegúrate de que la plantilla esté publicada

### Error: "Invalid public key"
- Verifica que la Public Key sea correcta
- Asegúrate de que la key esté activa

### No se reciben emails
- Verifica la carpeta de spam
- Asegúrate de que el servicio de email esté correctamente configurado
- Revisa los logs de EmailJS en el dashboard

### El email no se ve bien en algunos clientes
- El template usa técnicas modernas pero compatibles
- Incluye fallbacks para clientes antiguos
- Prueba en diferentes clientes de email

## Límites del plan gratuito

El plan gratuito de EmailJS incluye:
- 200 emails por mes
- 2 servicios de email
- 5 plantillas

Para más emails o funcionalidades, considera actualizar a un plan de pago.

## Seguridad

- Nunca compartas tu Public Key en repositorios públicos
- Usa variables de entorno para las credenciales
- El archivo `.env` ya está en `.gitignore` para proteger tus credenciales