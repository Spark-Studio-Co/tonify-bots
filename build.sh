#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build the frontend using Vite
echo "Building frontend..."
npx vite build

# Define paths
FRONTEND_BUILD_DIR="dist"   # default Vite output
BACKEND_FRONTEND_DIR="../tonify-server/frontend" # adjust if different

# Remove old frontend in backend
echo "Cleaning old frontend in backend..."
rm -rf "$BACKEND_FRONTEND_DIR"

# Create frontend directory inside backend
echo "Creating frontend directory..."
mkdir -p "$BACKEND_FRONTEND_DIR"

# Move built frontend into backend/frontend
echo "Copying built frontend to backend..."
cp -R "$FRONTEND_BUILD_DIR"/* "$BACKEND_FRONTEND_DIR"

echo "✅ Frontend build and transfer complete!"
