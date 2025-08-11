import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(3, "Senha muito curta"),
});

export type LoginInput = z.infer<typeof loginSchema>;
