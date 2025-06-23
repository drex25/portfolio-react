# Configuración de Producción

Este documento explica cómo configurar el portfolio para producción en [itsdrex.dev](https://itsdrex.dev/).

## Variables de Entorno para Producción

### 1. Crear archivo `.env` para producción

Copia el archivo `env.example` y renómbralo como `.env`:

```bash
cp env.example .env
```

### 2. Configurar variables de producción

Edita el archivo `.env` con los siguientes valores:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=tu_service_id_real
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_real
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_real

# Environment Configuration
VITE_APP_ENV=production
VITE_APP_URL=https://itsdrex.dev

# Domain Configuration
VITE_APP_DOMAIN=itsdrex.dev
VITE_APP_PROTOCOL=https

# Email Configuration
VITE_CONTACT_EMAIL=contacto@itsdrex.dev
VITE_ADMIN_EMAIL=admin@itsdrex.dev

# Analytics (opcional)
VITE_GA_TRACKING_ID=tu_ga_tracking_id

# SEO Configuration
VITE_APP_TITLE=Sylvain Drexler - Full Stack Developer
VITE_APP_DESCRIPTION=Portfolio profesional de Sylvain Drexler, desarrollador Full Stack especializado en React, Laravel y WordPress
VITE_APP_AUTHOR=Sylvain Drexler
```

## Configuración de Dominio

### Variables disponibles:

- `VITE_APP_ENV`: `development` | `production`
- `VITE_APP_URL`: URL completa de la aplicación
- `VITE_APP_DOMAIN`: Dominio (itsdrex.dev)
- `VITE_APP_PROTOCOL`: Protocolo (https)
- `VITE_CONTACT_EMAIL`: Email de contacto (contacto@itsdrex.dev)
- `VITE_ADMIN_EMAIL`: Email de administración (admin@itsdrex.dev)

### Uso en el código:

```typescript
import { ENV_CONFIG, getFullUrl, isProduction, getDomain, getContactEmail, getAdminEmail } from './config/environment';

// Verificar entorno
if (isProduction()) {
  console.log('Ejecutando en producción');
}

// Obtener URL completa
const url = getFullUrl('/contact'); // https://itsdrex.dev/contact

// Obtener dominio
const domain = getDomain(); // itsdrex.dev

// Obtener emails
const contactEmail = getContactEmail(); // contacto@itsdrex.dev
const adminEmail = getAdminEmail(); // admin@itsdrex.dev
```

## Configuración de Caddy

El archivo `caddy/Caddyfile` ya está configurado con tu email de administración:

```caddy
itsdrex.dev, www.itsdrex.dev {
    tls admin@itsdrex.dev
    reverse_proxy portfolio:80
}
```

## Configuración de Docker

### Variables de entorno en Docker Compose:

```yaml
version: '3.8'
services:
  portfolio:
    environment:
      - VITE_APP_ENV=production
      - VITE_APP_DOMAIN=itsdrex.dev
      - VITE_APP_PROTOCOL=https
      - VITE_CONTACT_EMAIL=contacto@itsdrex.dev
      - VITE_ADMIN_EMAIL=admin@itsdrex.dev
```

## SEO y Meta Tags

El archivo `index.html` ya incluye:

- Meta tags de SEO
- Open Graph para redes sociales
- Twitter Cards
- Canonical URL
- Theme color

## Despliegue

### 1. Build de producción

```bash
npm run build
```

### 2. Desplegar con Docker

```bash
docker-compose up -d --force-recreate
```

### 3. Verificar despliegue

```bash
curl -I https://itsdrex.dev
```

## Verificación

### Checklist de producción:

- [ ] Variables de entorno configuradas
- [ ] EmailJS funcionando
- [ ] Dominio configurado correctamente
- [ ] SSL/HTTPS activo
- [ ] Meta tags SEO presentes
- [ ] Analytics configurado (opcional)
- [ ] Performance optimizada
- [ ] Emails actualizados (contacto@itsdrex.dev, admin@itsdrex.dev)

## Troubleshooting

### Problemas comunes:

1. **EmailJS no funciona en producción**
   - Verificar que las credenciales estén correctas
   - Asegurar que el dominio esté autorizado en EmailJS

2. **Imágenes no cargan**
   - Verificar rutas en `public/assets/`
   - Asegurar que las imágenes estén incluidas en el build

3. **Meta tags no se actualizan**
   - Limpiar cache del navegador
   - Verificar que el build incluya los cambios

4. **Emails no funcionan**
   - Verificar que los emails estén configurados correctamente
   - Asegurar que el dominio itsdrex.dev esté configurado

## Seguridad

- Nunca committear el archivo `.env` con credenciales reales
- Usar variables de entorno en el servidor
- Mantener las credenciales seguras
- Usar emails corporativos (contacto@itsdrex.dev, admin@itsdrex.dev) 