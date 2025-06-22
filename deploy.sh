#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

echo "Installing Docker Compose if not present..."
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose not found. Installing..."
  curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

echo "Verifying Docker Compose installation..."
docker-compose --version

echo "Deploying application..."
cd ~/portfolio-react

echo "Pulling latest changes from git..."
git pull origin main

echo "Checking what's using port 80..."
lsof -i :80 || true
netstat -tulpn | grep :80 || true

echo "Stopping any existing web server..."
systemctl stop nginx || true
systemctl stop apache2 || true
systemctl stop httpd || true

echo "Force stopping and removing existing containers..."
docker-compose down --remove-orphans --volumes --timeout 30 || true

echo "Force removing any existing containers with the same name..."
docker rm -f portfolio-react-app || true
docker rm -f $(docker ps -aq --filter name=portfolio-react-app) || true

echo "Cleaning up any dangling containers..."
docker container prune -f

echo "Pulling latest image..."
docker pull drex422/portfolio-react:latest

echo "Starting new container..."
docker-compose up -d --force-recreate --remove-orphans

echo "Waiting for container to start..."
sleep 5

echo "Verifying container is running..."
docker ps | grep portfolio-react-app

echo "Checking container logs..."
docker logs portfolio-react-app --tail 20

echo "Checking if port 80 is now available..."
netstat -tulpn | grep :80 || true

echo "Testing if the application is responding..."
curl -I http://localhost || true

echo "Deployment completed successfully!" 