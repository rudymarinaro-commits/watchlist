import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db";
import { loginSchema, registerSchema } from "../validators";

const router = Router();

// POST /api/register
router.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = registerSchema.parse(req.body);

      const existing = await prisma.user.findUnique({
        where: { email: parsed.email }
      });

      if (existing) {
        res.status(400).json({ error: "Email già registrata" });
        return;
      }

      const passwordhash = await bcrypt.hash(parsed.password, 10);

      const user = await prisma.user.create({
        data: {
          name: parsed.name,
          surname: parsed.surname,
          email: parsed.email,
          passwordhash,
          birthDate: new Date(parsed.birthDate),
          active: true
        }
      });

      // salva sessione
      req.session.userId = user.id;

      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname
      });
    } catch (err: any) {
      if (err?.issues) {
        res.status(400).json({ error: "Dati non validi" });
      } else {
        console.error(err);
        res.status(500).json({ error: "Errore server" });
      }
    }
  }
);

// POST /api/login
router.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email: parsed.email }
      });

      if (!user) {
        res.status(401).json({ error: "Credenziali non valide" });
        return;
      }

      const isValid = await bcrypt.compare(parsed.password, user.passwordhash);

      if (!isValid) {
        res.status(401).json({ error: "Credenziali non valide" });
        return;
      }

      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname
      });
    } catch (err: any) {
      if (err?.issues) {
        res.status(400).json({ error: "Dati non validi" });
      } else {
        console.error(err);
        res.status(500).json({ error: "Errore server" });
      }
    }
  }
);

// POST /api/logout
router.post(
  "/logout",
  (req: Request, res: Response): void => {
    const sid = req.sessionID;

    req.session.destroy((err) => {
      if (err) {
        console.error("Errore durante destroy session:", err);
        res.status(500).json({ error: "Errore nel logout" });
        return;
      }

      res.clearCookie("connect.sid", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
      });

      res.json({ message: "Logout effettuato", sid });
    });
  }
);

// GET /api/me
router.get(
  "/me",
  async (req: Request, res: Response): Promise<void> => {
    if (!req.session.userId) {
      res.status(401).json({ error: "Non autenticato" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        birthDate: true
      }
    });

    if (!user) {
      res.status(404).json({ error: "Utente non trovato" });
      return;
    }

    res.json(user);
  }
);

export default router;
