import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Level = "all" | "info" | "warn" | "error";

type Props = {
  search: string;
  level: Level;
  from: string;
  to: string;
  pageSize: number;
  autoRefresh: boolean;
  refreshMs: number;

  onSearch: (v: string) => void;
  onLevel: (v: Level) => void;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
  onPageSize: (n: number) => void;
  onAutoRefresh: (b: boolean) => void;
  onRefreshMs: (n: number) => void;
  onReset: () => void;
};

export function LogsFilters({
  search,
  level,
  from,
  to,
  pageSize,
  autoRefresh,
  refreshMs,
  onSearch,
  onLevel,
  onFrom,
  onTo,
  onPageSize,
  onAutoRefresh,
  onRefreshMs,
  onReset,
}: Props) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2 grid gap-1">
            <Label className="text-xs">Busca</Label>
            <Input
              placeholder="Buscar por mensagem"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label className="text-xs">Nível</Label>
            <Select
              value={level || "all"}
              onValueChange={(v) => onLevel(v as Level)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos níveis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos níveis</SelectItem>
                <SelectItem value="info">info</SelectItem>
                <SelectItem value="warn">warn</SelectItem>
                <SelectItem value="error">error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label className="text-xs">De</Label>
            <Input
              type="date"
              value={from}
              onChange={(e) => onFrom(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid gap-1">
            <Label className="text-xs">Até</Label>
            <Input
              type="date"
              value={to}
              onChange={(e) => onTo(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <div className="grid gap-1">
            <Label className="text-xs">Itens por página</Label>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => onPageSize(Number(v))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}/página
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" onClick={onReset} className="w-auto">
            Limpar
          </Button>
        </div>

        <div className="flex flex-row items-center gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={onAutoRefresh}
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto refresh
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm">Intervalo:</Label>
            <Select
              value={String(refreshMs)}
              onValueChange={(v) => onRefreshMs(Number(v))}
              disabled={!autoRefresh}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[3000, 5000, 10000, 15000, 30000].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n / 1000}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
