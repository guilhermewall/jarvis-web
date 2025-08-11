import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        // Arquivos de teste/utilitários
        "src/__tests__/**",
        // Arquivos gerados ou de infra
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/**/*.d.ts",
        // Barrels e tipagens
        "src/**/index.ts",
        "src/types/**",
        // UI primitiva/estilização (wrappers)
        "src/components/ui/**",
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 75,
        lines: 80,
      },
    },
  },
});
