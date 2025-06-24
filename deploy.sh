#!/bin/bash
set -e

echo "Starting deployment..."

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

echo "Building Docker images..."
docker-compose build --no-cache

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
