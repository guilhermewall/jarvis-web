// src/components/domain/dashboard/dashboard-header.tsx
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Status das salas, visitantes ativos e cadastro
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <ToggleGroup
          type="single"
          value={density}
          onValueChange={(value) =>
            value && onDensityChange(value as "comfortable" | "compact")
          }
          className="hidden sm:flex"
        >
          <ToggleGroupItem value="comfortable" className="text-sm">
            Confortável
          </ToggleGroupItem>
          <ToggleGroupItem value="compact" className="text-sm">
            Compacto
          </ToggleGroupItem>
        </ToggleGroup>

        {trigger ?? <Button disabled>Carregando…</Button>}
      </div>
    </div>
  );
}
