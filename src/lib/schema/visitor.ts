import { z } from "zod";

export const createVisitorSchema = z.object({
  name: z.string().min(2, "Informe o nome"),
  cpf: z.string().regex(/^\d{11}$/, "CPF inválido (11 dígitos)"),
  roomId: z.string().min(1, "Selecione a sala"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  birthDate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (date) => {
        if (!date || date === "") return true;
        try {
          z.string().date().parse(date);
          const parsedDate = new Date(date);
          const today = new Date();
          const minDate = new Date();
          minDate.setFullYear(today.getFullYear() - 150);

          return parsedDate <= today && parsedDate >= minDate;
        } catch {
          return false;
        }
      },
      {
        message:
          "Data inválida, preencha com informação válida ou deixe em branco",
      }
    ),
});

export type CreateVisitorInput = z.infer<typeof createVisitorSchema>;
