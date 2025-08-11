import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url("URL da API inválida"),
  VITE_APP_NAME: z.string().default("J.A.R.V.I.S"),
  VITE_APP_VERSION: z.string().default("1.0.0"),
});

// No Vite, usar import.meta.env em vez de process.env
const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error("❌ Variáveis de ambiente inválidas:", _env.error.format());
  throw new Error("Configuração de ambiente inválida");
}

export const env = _env.data;

// Helper para debug (só em dev)
if (import.meta.env.DEV) {
  console.log("🔧 Variáveis carregadas:", env);
}
