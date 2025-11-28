import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nome obbligatorio"),
  surname: z.string().min(1, "Cognome obbligatorio"),
  email: z.string().email("Email non valida"),
  password: z
    .string()
    .min(8, "La password deve avere almeno 8 caratteri")
    .max(16, "La password non può superare 16 caratteri"),
  birthDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Data di nascita non valida"
  })
});

export const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(1, "Password obbligatoria")
});

export const watchlistCreateSchema = z.object({
  title: z.string().min(1, "Titolo obbligatorio"),
  type: z.enum(["Film", "Serie"]),
  status: z.enum(["Da vedere", "In visione", "Completato", "Abbandonato"]),
  rating: z.number().int().min(1).max(10).optional().nullable(),
  notes: z.string().optional().nullable()
});
