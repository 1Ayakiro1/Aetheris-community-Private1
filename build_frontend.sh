#!/bin/bash

# Build frontend for production
cd frontend
npm install
npm run build

# Copy built files to backend static directory
mkdir -p ../backend/static
cp -r dist/* ../backend/static/
