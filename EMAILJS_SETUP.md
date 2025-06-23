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

### 3. Crear una plantilla de email

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla como base:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo mensaje de contacto</title>
</head>
<body>
    <h2>Nuevo mensaje de contacto desde tu portfolio</h2>
    
    <h3>Información del remitente:</h3>
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Asunto:</strong> {{subject}}</p>
    
    <h3>Mensaje:</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><em>Este mensaje fue enviado desde tu portfolio web.</em></p>
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
4. Verifica que recibas el email

## Variables disponibles en la plantilla

El formulario envía las siguientes variables a EmailJS:

- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje
- `{{to_name}}` - Tu nombre (configurado como "Sylvain Drexler")
- `{{reply_to}}` - Email para responder (mismo que from_email)

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