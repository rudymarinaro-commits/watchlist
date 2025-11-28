# 🎬 Watchlist — Full Stack Project

Progetto sviluppato in TypeScript con stack completo **Node + Express + Prisma + React + Vite**, realizzato come esercitazione full-stack con attenzione a pulizia del codice, separazione frontend/backend e standard professionali di version control.

---

## 📁 Struttura del progetto

watchlist/
├── backend/ → API e gestione database
└── frontend/ → interfaccia utente React


---

## 🚀 Stack Tecnologico

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite (sviluppo) / compatibile con altri DB
- express-session

### Frontend
- React
- TypeScript
- Vite
- CSS custom
- componentizzazione
- UI coerente e responsive

---

## 🧠 Funzionalità

### Autenticazione
✔ Registrazione utente  
✔ Login  
✔ Logout  
✔ Sessioni lato server  
✔ Route protette  

### Watchlist
✔ Aggiunta elemento  
✔ Modifica  
✔ Eliminazione  
✔ Campi supportati:

- Titolo
- Tipo (Film / Serie)
- Stato (Da vedere / In visione / Completato / Abbandonato)
- Rating 1–10
- Note personali

---

## 🛠 Setup del Backend

cd backend
cp .env.example .env # imposta DATABASE_URL e SESSION_SECRET
npm install
npx prisma migrate dev
npm run dev


Server avviato su:  
👉 http://localhost:3000/

---

## 🖥 Setup del Frontend

cd frontend
npm install
npm run dev


UI visibile su:  
👉 http://localhost:5173/

---

## 🏃 Avvio simultaneo (opzionale)

npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"


---

## 🔒 Sicurezza & Best Practice

✔ `.env` non committato  
✔ `node_modules` ignorati  
✔ nessuna credenziale in repo  
✔ tipizzazione TypeScript  
✔ sessioni lato backend  
✔ separazione client/server

---

## 🧪 Testing manuale rapido

1. Registrati
2. Esegui login
3. Aggiungi un titolo
4. Modifica il titolo
5. Elimina il titolo
6. Verifica la persistenza su DB


---

## 👨‍💻 Autore

Rodolfo Marinaro  
Repository pubblico a scopo formativo e dimostrativo.
