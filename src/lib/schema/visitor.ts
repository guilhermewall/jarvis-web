import { z } from "zod";

export const createVisitorSchema = z.object({
  name: z.string().min(2, "Informe o nome"),
  cpf: z.string().regex(/^\d{11}$/, "CPF inválido (11 dígitos)"),
  roomId: z.string().min(1, "Selecione a sala"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  birthDate: z.string().optional().or(z.literal("")),
});

export type CreateVisitorInput = z.infer<typeof createVisitorSchema>;
