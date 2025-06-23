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

### 3. Crear una plantilla de email profesional

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla profesional como base:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            width: 100%;
        }
        
        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .sender-info {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            border-left: 5px solid #3b82f6;
        }
        
        .sender-info h2 {
            color: #1e293b;
            font-size: 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .sender-info h2::before {
            content: '👤';
            font-size: 24px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            word-break: break-word;
        }
        
        .info-item strong {
            color: #3b82f6;
            font-weight: 600;
            min-width: 80px;
            flex-shrink: 0;
        }
        
        .info-item span {
            flex: 1;
            word-break: break-all;
        }
        
        .message-section {
            background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
            border-radius: 15px;
            padding: 25px;
            border-left: 5px solid #10b981;
        }
        
        .message-section h2 {
            color: #1e293b;
            font-size: 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .message-section h2::before {
            content: '💬';
            font-size: 24px;
        }
        
        .message-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            font-size: 16px;
            line-height: 1.7;
            color: #374151;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        
        .footer {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain2" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain2)"/></svg>');
            opacity: 0.3;
        }
        
        .footer-content {
            position: relative;
            z-index: 1;
        }
        
        .footer h3 {
            font-size: 18px;
            margin-bottom: 10px;
            color: #60a5fa;
        }
        
        .footer p {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 15px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 50%;
            text-decoration: none;
            color: white;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .social-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }
        
        .timestamp {
            background: rgba(255, 255, 255, 0.1);
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 12px;
            opacity: 0.7;
            margin-top: 15px;
            display: inline-block;
            word-break: break-word;
        }
        
        /* Responsive Design - Tablet */
        @media (max-width: 768px) {
            body {
                padding: 15px;
            }
            
            .container {
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .header p {
                font-size: 14px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .sender-info, .message-section {
                padding: 20px;
                border-radius: 12px;
            }
            
            .sender-info h2, .message-section h2 {
                font-size: 18px;
            }
            
            .info-grid {
                gap: 12px;
            }
            
            .info-item {
                padding: 10px;
                border-radius: 8px;
            }
            
            .message-content {
                padding: 15px;
                font-size: 15px;
            }
            
            .footer {
                padding: 25px 20px;
            }
            
            .footer h3 {
                font-size: 16px;
            }
            
            .footer p {
                font-size: 13px;
            }
            
            .social-links {
                gap: 12px;
            }
            
            .social-link {
                width: 35px;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
            }
            
            .timestamp {
                padding: 8px 16px;
                font-size: 11px;
            }
        }
        
        /* Responsive Design - Mobile */
        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .container {
                border-radius: 12px;
            }
            
            .header {
                padding: 25px 15px;
            }
            
            .header h1 {
                font-size: 22px;
            }
            
            .header p {
                font-size: 13px;
            }
            
            .content {
                padding: 25px 15px;
            }
            
            .sender-info, .message-section {
                padding: 18px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .sender-info h2, .message-section h2 {
                font-size: 16px;
                margin-bottom: 15px;
            }
            
            .sender-info h2::before, .message-section h2::before {
                font-size: 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
                gap: 10px;
            }
            
            .info-item {
                padding: 12px;
                border-radius: 8px;
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
            
            .info-item strong {
                min-width: auto;
                font-size: 14px;
            }
            
            .info-item span {
                font-size: 14px;
                width: 100%;
            }
            
            .message-content {
                padding: 15px;
                font-size: 14px;
                line-height: 1.6;
            }
            
            .footer {
                padding: 20px 15px;
            }
            
            .footer h3 {
                font-size: 15px;
            }
            
            .footer p {
                font-size: 12px;
                margin-bottom: 12px;
            }
            
            .social-links {
                gap: 10px;
                margin-top: 12px;
            }
            
            .social-link {
                width: 32px;
                height: 32px;
                line-height: 32px;
                font-size: 14px;
            }
            
            .timestamp {
                padding: 6px 12px;
                font-size: 10px;
                margin-top: 12px;
            }
        }
        
        /* Responsive Design - Small Mobile */
        @media (max-width: 360px) {
            body {
                padding: 5px;
            }
            
            .header {
                padding: 20px 12px;
            }
            
            .header h1 {
                font-size: 20px;
            }
            
            .content {
                padding: 20px 12px;
            }
            
            .sender-info, .message-section {
                padding: 15px;
            }
            
            .info-item {
                padding: 10px;
            }
            
            .message-content {
                padding: 12px;
                font-size: 13px;
            }
            
            .footer {
                padding: 18px 12px;
            }
            
            .social-link {
                width: 28px;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
            }
        }
        
        /* Print styles for better email client compatibility */
        @media print {
            body {
                background: white !important;
                padding: 0 !important;
            }
            
            .container {
                box-shadow: none !important;
                border-radius: 0 !important;
            }
            
            .header, .footer {
                background: #f8f9fa !important;
                color: #333 !important;
            }
        }
        
        /* Dark mode support for email clients that support it */
        @media (prefers-color-scheme: dark) {
            .container {
                background: #1a1a1a;
                color: #ffffff;
            }
            
            .sender-info, .message-section {
                background: #2d2d2d;
                color: #ffffff;
            }
            
            .info-item, .message-content {
                background: #3a3a3a;
                color: #ffffff;
                border-color: #4a4a4a;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🚀 Nuevo Mensaje de Contacto</h1>
            <p>Has recibido un nuevo mensaje desde tu portfolio web</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Sender Information -->
            <div class="sender-info">
                <h2>Información del Remitente</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Nombre:</strong>
                        <span>{{from_name}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Email:</strong>
                        <span>{{from_email}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Asunto:</strong>
                        <span>{{subject}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Fecha:</strong>
                        <span>{{to_name}}</span>
                    </div>
                </div>
            </div>
            
            <!-- Message -->
            <div class="message-section">
                <h2>Mensaje</h2>
                <div class="message-content">
                    {{message}}
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <h3>Sylvain Drexler</h3>
                <p>Full Stack Developer</p>
                <p>Transformando ideas en experiencias digitales excepcionales</p>
                
                <div class="social-links">
                    <a href="https://itsdrex.dev" class="social-link" title="Portfolio">🌐</a>
                    <a href="https://github.com/drex25" class="social-link" title="GitHub">📚</a>
                    <a href="https://linkedin.com/in/sylvain-drexler" class="social-link" title="LinkedIn">💼</a>
                </div>
                
                <div class="timestamp">
                    📧 Enviado desde tu portfolio web • {{reply_to}}
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
4. Verifica que recibas el email con el nuevo diseño

## Características del Template Profesional

### 🎨 **Diseño Moderno:**
- Gradientes elegantes y colores profesionales
- Tipografía moderna y legible
- Diseño responsive para móviles
- Efectos visuales sutiles

### 📱 **Responsive Design Completo:**
- **Desktop (600px+):** Layout completo con grid de 2 columnas
- **Tablet (768px):** Ajustes de padding y tamaños de fuente
- **Mobile (480px):** Grid de 1 columna, elementos apilados
- **Small Mobile (360px):** Optimización extrema para pantallas muy pequeñas
- **Print:** Estilos optimizados para impresión
- **Dark Mode:** Soporte para modo oscuro en clientes compatibles

### 🎯 **Información Organizada:**
- Sección clara de información del remitente
- Mensaje destacado y fácil de leer
- Footer con información de contacto

### 🔗 **Elementos Interactivos:**
- Enlaces a redes sociales
- Información de contacto
- Timestamp del mensaje

### 📧 **Compatibilidad de Email:**
- CSS inline para máxima compatibilidad
- Estructura semántica HTML
- Soporte para clientes de email antiguos
- Optimización para Gmail, Outlook, Apple Mail, etc.

## Variables disponibles en la plantilla

El formulario envía las siguientes variables a EmailJS:

- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje
- `{{to_name}}` - Tu nombre (configurado como "Sylvain Drexler")
- `{{reply_to}}` - Email para responder (mismo que from_email)

## Personalización

### Colores:
- **Primario:** Azul (#3b82f6)
- **Secundario:** Verde (#10b981)
- **Fondo:** Gradiente azul-morado
- **Texto:** Gris oscuro (#1e293b)

### Elementos personalizables:
- Logo o imagen de perfil
- Enlaces a redes sociales
- Información de contacto
- Colores del tema
- Tipografía

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
- El template usa CSS inline para máxima compatibilidad
- Prueba en diferentes clientes de email (Gmail, Outlook, etc.)
- Considera usar un servicio de testing de emails

### Problemas de responsive en móviles
- El template incluye breakpoints específicos para diferentes tamaños
- Verifica que el viewport meta tag esté presente
- Prueba en diferentes dispositivos y orientaciones

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