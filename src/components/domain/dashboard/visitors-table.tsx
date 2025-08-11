import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { maskCpfView, formatDateTime } from "@/lib/utils/format";
import type { ActiveVisitor } from "@/types/visitors";

interface VisitorsTableProps {
  visitors: ActiveVisitor[];
  density: "comfortable" | "compact";
  onCheckout: (visitorId: string) => void;
  isCheckingOut: boolean;
}

export function VisitorsTable({
  visitors,
  density,
  onCheckout,
  isCheckingOut,
}: VisitorsTableProps) {
  const tableClasses = `w-full text-sm ${
    density === "compact"
      ? "[&_td]:py-2 [&_th]:py-2"
      : "[&_td]:py-3 [&_th]:py-3"
  }`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Visitantes ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className={tableClasses}>
            <thead>
              <tr className="text-left border-b border-border">
                <th className="px-2">Nome</th>
                <th className="px-2">CPF</th>
                <th className="px-2">Sala</th>
                <th className="px-2">Entrada</th>
                <th className="px-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor) => (
                <VisitorRow
                  key={visitor.id}
                  visitor={visitor}
                  onCheckout={onCheckout}
                  isCheckingOut={isCheckingOut}
                />
              ))}
              {visitors.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-10 text-center text-muted-foreground"
                  >
                    Nenhum visitante ativo
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

interface VisitorRowProps {
  visitor: ActiveVisitor;
  onCheckout: (visitorId: string) => void;
  isCheckingOut: boolean;
}

function VisitorRow({ visitor, onCheckout, isCheckingOut }: VisitorRowProps) {
  return (
    <tr className="border-b border-border/60">
      <td className="px-2 font-medium">{visitor.name}</td>
      <td className="px-2">{maskCpfView(visitor.cpf)}</td>
      <td className="px-2">{visitor.roomName}</td>
      <td className="px-2">{formatDateTime(visitor.checkInAt)}</td>
      <td className="px-2 text-right">
        <Button
          variant="ghost"
          onClick={() => onCheckout(visitor.id)}
          disabled={isCheckingOut}
        >
          Registrar saída
        </Button>
      </td>
    </tr>
  );
}
