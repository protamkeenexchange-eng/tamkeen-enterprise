#!/bin/bash

set -e

echo "🚀 Starting TAMKEEN Fintech MVP..."

# Start infrastructure
cd $(dirname "$0")/..

echo "📦 Starting Docker services..."
docker compose up -d postgres redis

sleep 5

echo "🧠 Installing dependencies..."
npm install

echo "🗄️ Running Prisma migrations..."
npx prisma migrate dev || true

# Seed DB
if [ -f "prisma/seed.ts" ]; then
  echo "🌱 Seeding database..."
  npx prisma db seed || true
fi


echo "⚙️ Starting API..."
npm run dev --workspace=apps/api &
API_PID=$!

sleep 3

echo "🖥️ Starting Web Dashboard..."
npm run dev --workspace=apps/web &
WEB_PID=$!


echo "\n✅ TAMKEEN IS RUNNING"
echo "----------------------"
echo "Web: http://localhost:3000"
echo "API: http://localhost:8080"
echo "----------------------"

tail -f /dev/null