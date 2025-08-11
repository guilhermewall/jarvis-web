import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Room } from "@/types/rooms";

interface DashboardFiltersProps {
  search: string;
  roomId: string;
  rooms: Room[];
  onSearchChange: (value: string) => void;
  onRoomChange: (value: string) => void;
  onReset: () => void;
}

export function DashboardFilters({
  search,
  roomId,
  rooms,
  onSearchChange,
  onRoomChange,
  onReset,
}: DashboardFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-3">
        <Input
          placeholder="Buscar por nome ou CPF"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          className="h-10 px-3 rounded-[var(--radius)] border border-input bg-background text-sm"
          value={roomId}
          onChange={(e) => onRoomChange(e.target.value)}
        >
          <option value="">Todas as salas</option>
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} — {room.activeCount}/{room.capacity}
            </option>
          ))}
        </select>
        <div className="flex gap-2 justify-end md:justify-start">
          <Button variant="ghost" onClick={onReset}>
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
