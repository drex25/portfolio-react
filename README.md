# Portfolio React - Sylvain Drexler

Un portfolio moderno y responsive desarrollado con React, TypeScript y Vite. Incluye internacionalización, animaciones fluidas y un formulario de contacto funcional.

## 🚀 Características

- **React 18 + TypeScript** - Desarrollo moderno y tipado
- **Vite** - Build tool rápido y eficiente
- **Tailwind CSS** - Estilos modernos y responsive
- **Framer Motion** - Animaciones fluidas y atractivas
- **React Router** - Navegación SPA
- **i18n** - Soporte para múltiples idiomas (ES, EN, FR)
- **EmailJS** - Formulario de contacto funcional
- **Docker** - Containerización completa
- **CI/CD** - Despliegue automático con GitHub Actions

## 📋 Páginas

- **Landing** - Página principal con presentación
- **About** - Información personal y experiencia
- **Projects** - Portfolio de proyectos
- **Skills** - Habilidades técnicas
- **Contact** - Formulario de contacto funcional
- **CV** - Vista de CV en PDF

## 🛠️ Tecnologías

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Hook Form
- React Icons

### Backend & Servicios
- EmailJS (formulario de contacto)
- Puppeteer (generación de PDF)

### DevOps
- Docker
- Docker Compose
- Nginx
- Caddy (reverse proxy)
- GitHub Actions

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Docker (opcional)

### Desarrollo local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/portfolio-react.git
cd portfolio-react
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar EmailJS** (opcional para desarrollo)
```bash
cp env.example .env
# Editar .env con tus credenciales de EmailJS
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

### Configuración de EmailJS

Para que el formulario de contacto funcione, necesitas configurar EmailJS:

1. **Crear cuenta en [EmailJS](https://www.emailjs.com/)**
2. **Configurar un servicio de email** (Gmail, Outlook, etc.)
3. **Crear una plantilla de email**
4. **Obtener las credenciales** (Service ID, Template ID, Public Key)
5. **Configurar variables de entorno**

Ver [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) para instrucciones detalladas.

## 🐳 Docker

### Construir imagen
```bash
docker build -t portfolio-react .
```

### Ejecutar con Docker Compose
```bash
docker-compose up -d
```

### Variables de entorno para producción
```bash
# Crear archivo .env en producción
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

## 📦 Scripts disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
```

## 🌐 Despliegue

### Automático (GitHub Actions)
El proyecto se despliega automáticamente cuando se hace push a la rama `main`.

### Manual
```bash
# En el servidor
cd ~/portfolio-react
git pull origin main
docker-compose up -d --force-recreate
```

## 📁 Estructura del proyecto

```
portfolio-react/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── i18n/          # Configuración de internacionalización
│   ├── config/        # Configuraciones (EmailJS, etc.)
│   ├── types/         # Tipos TypeScript
│   └── assets/        # Imágenes y recursos
├── public/            # Archivos públicos
├── caddy/             # Configuración de Caddy
├── .github/           # GitHub Actions
└── docs/              # Documentación
```

## 🔧 Configuración

### Variables de entorno
- `VITE_EMAILJS_SERVICE_ID` - ID del servicio de EmailJS
- `VITE_EMAILJS_TEMPLATE_ID` - ID de la plantilla de EmailJS
- `VITE_EMAILJS_PUBLIC_KEY` - Clave pública de EmailJS

### Configuración de Caddy
El archivo `caddy/Caddyfile` contiene la configuración del reverse proxy. Actualiza el dominio y email:

```caddy
tu-dominio.com, www.tu-dominio.com {
    tls tu-email@ejemplo.com
    reverse_proxy portfolio:80
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: contacto@itsdrex.dev
- **LinkedIn**: [Tu LinkedIn]
- **GitHub**: [Tu GitHub]

---

Desarrollado con ❤️ por Sylvain Drexler
