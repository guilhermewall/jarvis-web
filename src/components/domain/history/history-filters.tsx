import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Room } from "@/types/rooms";

type Props = {
  search: string;
  roomId: string;
  from: string;
  to: string;
  pageSize: number;
  rooms: Room[];
  onSearch: (v: string) => void;
  onRoom: (v: string) => void;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
  onPageSize: (n: number) => void;
  onReset: () => void;
};

export function HistoryFilters({
  search,
  roomId,
  from,
  to,
  pageSize,
  rooms,
  onSearch,
  onRoom,
  onFrom,
  onTo,
  onPageSize,
  onReset,
}: Props) {
  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-2 grid gap-1">
          <Label className="text-xs">Busca</Label>
          <Input
            placeholder="Buscar por nome ou CPF"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">Sala</Label>
          <select
            className="h-10 px-3 rounded-[var(--radius)] border border-input bg-background text-sm"
            value={roomId}
            onChange={(e) => onRoom(e.target.value)}
          >
            <option value="">Todas as salas</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">De</Label>
          <Input
            type="date"
            value={from}
            onChange={(e) => onFrom(e.target.value)}
          />
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">Até</Label>
          <Input
            type="date"
            value={to}
            onChange={(e) => onTo(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="grid gap-1">
            <Label className="text-xs">Itens por página</Label>
            <select
              className="h-10 px-3 rounded-[var(--radius)] border border-input bg-background text-sm"
              value={pageSize}
              onChange={(e) => onPageSize(Number(e.target.value))}
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}/página
                </option>
              ))}
            </select>
          </div>
          <Button variant="ghost" onClick={onReset} className="mt-6">
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
