# Backend Watchlist

Backend Node.js + TypeScript + Express + Prisma + express-session.

## Setup

1. Copia `.env.example` in `.env` e imposta `DATABASE_URL`, `SESSION_SECRET`.
2. Installa le dipendenze:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Server su `http://localhost:3000`.
