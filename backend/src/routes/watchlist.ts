import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

// tutte le rotte qui richiedono login
router.use(requireAuth);

// GET /api/watchlist
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId as number;

  const items = await prisma.watchlist.findMany({
    where: { userid: userId },
    orderBy: { id: "desc" }
  });

  res.json(items);
});

// POST /api/watchlist
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId as number;

  const { title, type, status, rating, notes } = req.body;

  if (!title || !type || !status) {
    res.status(400).json({ error: "Dati mancanti" });
    return;
  }

  const item = await prisma.watchlist.create({
    data: {
      userid: userId,
      title,
      type,
      status,
      rating: rating ?? null,
      notes: notes ?? null
    }
  });

  res.status(201).json(item);
});

// PUT /api/watchlist/:id
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId as number;
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID non valido" });
    return;
  }

  const existing = await prisma.watchlist.findFirst({
    where: { id, userid: userId }
  });

  if (!existing) {
    res.status(404).json({ error: "Elemento non trovato" });
    return;
  }

  const { title, type, status, rating, notes } = req.body;

  const updated = await prisma.watchlist.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      type: type ?? existing.type,
      status: status ?? existing.status,
      rating: rating ?? existing.rating,
      notes: notes ?? existing.notes
    }
  });

  res.json(updated);
});

// DELETE /api/watchlist/:id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId as number;
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID non valido" });
    return;
  }

  const existing = await prisma.watchlist.findFirst({
    where: { id, userid: userId }
  });

  if (!existing) {
    res.status(404).json({ error: "Elemento non trovato" });
    return;
  }

  await prisma.watchlist.delete({
    where: { id }
  });

  res.json({ message: "Elemento eliminato" });
});

export default router;
