import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import watchlistRoutes from "./routes/watchlist";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "fallback-secret-non-usare-in-prod";

// CORS
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
);

// JSON body
app.use(express.json());

// ================= SESSIONE MYSQL ==================
const MySQLStore = require("express-mysql-session")(session);

const sessionStore = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "RRRMMM1979!",
  database: "db-watchlist"
});

app.use(
  session({
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,       // in produzione: true con HTTPS
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 24 ore – Opzione 1: login persistente
    }
  })
);

// ================== ROUTES ==================

// /api/login, /api/register, /api/logout, /api/me
app.use("/api", authRoutes);

// /api/watchlist/...
app.use("/api/watchlist", watchlistRoutes);

// Health-check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
