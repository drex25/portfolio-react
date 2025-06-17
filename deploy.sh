#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Pull latest changes from git
echo "Pulling latest changes from git..."
git pull origin main

# Ensure assets directory exists
echo "Creating assets directory if it doesn't exist..."
mkdir -p src/assets
chmod -R 755 src/assets

# Pull latest Docker image
echo "Pulling latest Docker image..."
docker pull drex422/portfolio-react:latest

# Stop and remove existing containers
echo "Stopping existing containers..."
docker-compose down --remove-orphans --volumes --timeout 30 || true

# Remove any existing containers with the same name
echo "Cleaning up old containers..."
docker rm -f portfolio-react-app || true

# Start new containers
echo "Starting new containers..."
docker-compose up -d --force-recreate --remove-orphans

# Verify deployment
echo "Verifying deployment..."
docker ps | grep portfolio-react-app

echo "Deployment completed successfully!" 