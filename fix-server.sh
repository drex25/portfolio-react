#!/bin/bash

echo "Fixing git conflict and updating docker-compose configuration..."

cd ~/portfolio-react

echo "Stashing local changes..."
git stash

echo "Pulling latest changes..."
git pull origin main

echo "Verifying docker-compose.yml has Caddy service..."
if grep -q "caddy:" docker-compose.yml; then
    echo "✅ Caddy service found in docker-compose.yml"
else
    echo "❌ Caddy service not found. Creating correct configuration..."
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  portfolio:
    container_name: portfolio-react-app
    image: drex422/portfolio-react:latest
    expose:
      - "80"
    restart: unless-stopped

  caddy:
    image: caddy:2-alpine
    container_name: caddy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./caddy/Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    restart: unless-stopped
    depends_on:
      - portfolio

volumes:
  caddy_data:
  caddy_config:
EOF
fi

echo "Verifying Caddyfile exists..."
if [ -f "./caddy/Caddyfile" ]; then
    echo "✅ Caddyfile exists"
    cat ./caddy/Caddyfile
else
    echo "❌ Caddyfile not found. Creating it..."
    mkdir -p ./caddy
    cat > ./caddy/Caddyfile << 'EOF'
itsdrex.dev, www.itsdrex.dev {
    reverse_proxy portfolio:80
}
EOF
fi

echo "Stopping existing containers..."
docker-compose down --remove-orphans --volumes --timeout 30 || true

echo "Removing existing containers..."
docker rm -f portfolio-react-app || true
docker rm -f caddy || true

echo "Starting containers with new configuration..."
docker-compose up -d --force-recreate --remove-orphans

echo "Waiting for containers to start..."
sleep 10

echo "Verifying containers are running..."
docker ps

echo "Checking Caddy logs..."
docker logs caddy --tail 10 || echo "Caddy container not found"

echo "Testing domain..."
curl -I http://itsdrex.dev || echo "HTTP test failed"
curl -I https://itsdrex.dev || echo "HTTPS test failed"

echo "Fix completed!" 