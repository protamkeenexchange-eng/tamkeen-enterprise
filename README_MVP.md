# TAMKEEN FINTECH MVP (LOCAL DEPLOYMENT)

This is a runnable local fintech system composed of:

- PostgreSQL (Ledger DB)
- Redis (Cache + events)
- API Service (Node.js)
- Web Dashboard (React)

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start infrastructure
```bash
docker compose up -d postgres redis
```

### 3. Setup database
```bash
npx prisma migrate dev
```

### 4. Run backend
```bash
npm run dev --workspace=apps/api
```

### 5. Run frontend
```bash
npm run dev --workspace=apps/web
```

---

## 🌐 System URLs

- Web Dashboard: http://localhost:3000
- API Gateway: http://localhost:8080
- PostgreSQL: localhost:5432

---

## 🧠 Architecture

Frontend (React)
   ↓
API (Node.js + Express)
   ↓
PostgreSQL (Ledger System)
   ↓
Redis (Events / Cache)

---

## 🔐 Default Dev Config

- JWT: dev_secret_change_me
- DB: tamkeen_db

---

## ⚠️ Note
This is a development MVP. Not production-ready without security hardening, encryption, and compliance layers.