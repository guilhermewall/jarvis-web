import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LogItem } from "@/types/logs";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/format";

function LevelBadge({ level }: { level: string }) {
  const cls =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs " +
    (level === "error"
      ? "border-destructive text-destructive"
      : level === "warn"
        ? "border-amber-500 text-amber-600"
        : "border-emerald-500 text-emerald-600");
  return <span className={cls}>{level}</span>;
}

export function LogsTable({
  rows,
  page,
  pageSize,
  total,
  hasNext,
  onPrev,
  onNext,
}: {
  rows: LogItem[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const fromIdx = (page - 1) * pageSize + 1;
  const toIdx = Math.min(page * pageSize, total || fromIdx + rows.length - 1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Eventos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm [&_td]:py-3 [&_th]:py-3">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="px-2">Data</th>
                <th className="px-2">Nível</th>
                <th className="px-2">Mensagem</th>
                <th className="px-2">Meta</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-b border-border/60 align-top">
                  <td className="px-2 whitespace-nowrap">
                    {formatDateTime(l.createdAt)}
                  </td>
                  <td className="px-2">
                    <LevelBadge level={String(l.level)} />
                  </td>
                  <td className="px-2 font-medium">{l.message}</td>
                  <td className="px-2">
                    {l.meta ? (
                      <pre className="max-w-[48ch] overflow-auto text-xs bg-muted rounded p-2">
                        {JSON.stringify(l.meta, null, 2)}
                      </pre>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-10 text-center text-muted-foreground"
                  >
                    Nenhum log encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
