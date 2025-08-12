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
      <CardContent className="pt-6 space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-[1fr_auto_auto] sm:gap-3">
        <Input
          placeholder="Buscar por nome ou CPF"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
        <select
          className="h-10 px-3 rounded-[var(--radius)] border border-input bg-background text-sm w-full sm:w-auto sm:min-w-[180px]"
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
        <div className="flex gap-2 justify-end sm:justify-start">
          <Button variant="ghost" onClick={onReset}>
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
