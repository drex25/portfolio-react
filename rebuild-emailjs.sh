#!/bin/bash

# Script to rebuild Docker image with EmailJS environment variables
echo "🔧 Rebuilding Docker image with EmailJS configuration..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your EmailJS configuration"
    exit 1
fi

# Load environment variables
source .env

# Check if required variables are set
if [ -z "$VITE_EMAILJS_SERVICE_ID" ] || [ -z "$VITE_EMAILJS_TEMPLATE_ID" ] || [ -z "$VITE_EMAILJS_PUBLIC_KEY" ]; then
    echo "❌ Error: Missing required EmailJS environment variables!"
    echo "Please check your .env file contains all required variables"
    exit 1
fi

echo "✅ Environment variables loaded:"
echo "  Service ID: ${VITE_EMAILJS_SERVICE_ID:0:10}..."
echo "  Template ID: ${VITE_EMAILJS_TEMPLATE_ID:0:10}..."
echo "  Public Key: ${VITE_EMAILJS_PUBLIC_KEY:0:10}..."

# Stop containers
echo "🛑 Stopping containers..."
docker-compose down

# Remove old image
echo "🗑️ Removing old image..."
docker rmi portfolio-react_portfolio 2>/dev/null || true

# Build new image with environment variables
echo "🔨 Building new image..."
docker-compose build --no-cache --build-arg VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID \
                     --build-arg VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID \
                     --build-arg VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Start containers
echo "🚀 Starting containers..."
docker-compose up -d

# Check status
echo "🔍 Checking deployment status..."
sleep 3

if docker-compose ps | grep -q "Up"; then
    echo "✅ Rebuild successful!"
    echo "🌐 Portfolio is running at: https://itsdrex.dev"
    echo "📧 EmailJS should now work correctly"
else
    echo "❌ Rebuild failed! Check logs:"
    docker-compose logs
    exit 1
fi

echo "📋 To check logs: docker-compose logs -f" 