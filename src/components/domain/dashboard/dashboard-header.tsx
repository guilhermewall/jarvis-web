// src/components/domain/dashboard/dashboard-header.tsx
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  density: "comfortable" | "compact";
  onDensityChange: (d: "comfortable" | "compact") => void;
  trigger?: React.ReactNode; // botão de "Novo visitante"
}

export function DashboardHeader({
  density,
  onDensityChange,
  trigger,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Status das salas, visitantes ativos e cadastro
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center rounded-[var(--radius)] border border-border overflow-hidden">
          <button
            className={`px-3 py-1.5 text-sm ${density === "comfortable" ? "bg-muted" : "hover:bg-muted"}`}
            onClick={() => onDensityChange("comfortable")}
          >
            Confortável
          </button>
          <button
            className={`px-3 py-1.5 text-sm ${density === "compact" ? "bg-muted" : "hover:bg-muted"}`}
            onClick={() => onDensityChange("compact")}
          >
            Compacto
          </button>
        </div>

        {/* o botão/trigger vem de fora */}
        {trigger ?? <Button disabled>Carregando…</Button>}
      </div>
    </div>
  );
}
