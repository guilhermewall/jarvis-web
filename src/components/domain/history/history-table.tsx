import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { HistoryItem } from "@/types/history";
import { maskCpfView, formatDateTime } from "@/lib/utils/format";

type Props = {
  rows: HistoryItem[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function HistoryTable({
  rows,
  page,
  pageSize,
  total,
  hasNext,
  onPrev,
  onNext,
}: Props) {
  const fromIdx = (page - 1) * pageSize + 1;
  const toIdx = Math.min(page * pageSize, total || fromIdx + rows.length - 1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Registros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm [&_td]:py-3 [&_th]:py-3">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="px-2">Nome</th>
                <th className="px-2">CPF</th>
                <th className="px-2">Sala</th>
                <th className="px-2">Entrada</th>
                <th className="px-2">Saída</th>
                <th className="px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/60">
                  <td className="px-2 font-medium">{r.name}</td>
                  <td className="px-2">{maskCpfView(r.cpf)}</td>
                  <td className="px-2">{r.roomName}</td>
                  <td className="px-2">{formatDateTime(r.checkInAt)}</td>
                  <td className="px-2">
                    {r.checkOutAt ? formatDateTime(r.checkOutAt) : "—"}
                  </td>
                  <td className="px-2">
                    {r.checkOutAt ? (
                      <span className="text-emerald-600">Finalizado</span>
                    ) : (
                      <span className="text-amber-600">Ativo</span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-2 py-10 text-center text-muted-foreground"
                  >
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* paginação */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>
            {rows.length > 0
              ? `${fromIdx}–${toIdx} de ${total}`
              : "0 resultados"}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onPrev} disabled={page <= 1}>
              Anterior
            </Button>
            <Button variant="ghost" onClick={onNext} disabled={!hasNext}>
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
