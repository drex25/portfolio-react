#!/bin/bash
set -e

echo "Starting deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please create a .env file with your EmailJS configuration:"
    echo "VITE_EMAILJS_SERVICE_ID=your_service_id"
    echo "VITE_EMAILJS_TEMPLATE_ID=your_template_id"
    echo "VITE_EMAILJS_PUBLIC_KEY=your_public_key"
    exit 1
fi

# Load environment variables
source .env

# Check if required variables are set
if [ -z "$VITE_EMAILJS_SERVICE_ID" ] || [ -z "$VITE_EMAILJS_TEMPLATE_ID" ] || [ -z "$VITE_EMAILJS_PUBLIC_KEY" ]; then
    echo "Error: Missing required EmailJS environment variables!"
    echo "Please check your .env file contains:"
    echo "VITE_EMAILJS_SERVICE_ID=your_service_id"
    echo "VITE_EMAILJS_TEMPLATE_ID=your_template_id"
    echo "VITE_EMAILJS_PUBLIC_KEY=your_public_key"
    exit 1
fi

echo "✅ Environment variables loaded successfully"

# Install Docker Compose if missing
if ! command -v docker-compose &> /dev/null; then
  echo "Installing Docker Compose..."
  curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

echo "Docker Compose version: $(docker-compose --version)"

cd ~/portfolio-react

echo "Pulling latest changes..."
git pull origin main

echo "Stopping existing web servers..."
systemctl stop nginx || true
systemctl stop apache2 || true
systemctl stop httpd || true

echo "Cleaning up old containers (preserving volumes)..."
docker-compose down --remove-orphans --timeout 30 || true
docker container prune -f

echo "Pulling latest Docker image..."
docker pull drex422/portfolio-react:latest

echo "Starting new containers..."
docker-compose up -d --force-recreate --remove-orphans

echo "Waiting for containers to stabilize..."
sleep 10

echo "Container status:"
docker ps | grep portfolio-react-app
docker ps | grep caddy

echo "Logs snapshot:"
docker logs portfolio-react-app --tail 10
docker logs caddy --tail 10

echo "Port bind checks:"
netstat -tulpn | grep :80 || true
netstat -tulpn | grep :443 || true

echo "Testing endpoint:"
curl -I http://localhost || true
curl -I https://localhost || true

echo "Production deployment completed!"
