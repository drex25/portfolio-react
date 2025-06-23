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

# Build the app
RUN npm run build

# Production stage
FROM caddy:2-alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/caddy

# Copy Caddy configuration
COPY caddy/Caddyfile /etc/caddy/Caddyfile

# Create directories in caddy and ensure permissions
RUN mkdir -p /usr/share/caddy/assets /usr/share/caddy/data && \
    chmod -R 755 /usr/share/caddy/assets /usr/share/caddy/data

# Expose ports 80 and 443
EXPOSE 80 443

# Start caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"] 