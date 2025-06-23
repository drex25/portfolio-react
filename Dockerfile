# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all files
COPY . .

# Ensure directories exist and have correct permissions
RUN mkdir -p public/assets public/data && \
    chmod -R 755 public/assets public/data

# Set environment variables for build (these will be replaced at runtime)
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY

ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create directories in nginx and ensure permissions
RUN mkdir -p /usr/share/nginx/html/assets /usr/share/nginx/html/data && \
    chmod -R 755 /usr/share/nginx/html/assets /usr/share/nginx/html/data

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 