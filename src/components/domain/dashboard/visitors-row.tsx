import { Button } from "@/components/ui/button";
import { formatDateTime, maskCpfView } from "@/lib/utils/format";
import type { ActiveVisitor } from "@/types/visitors";

interface VisitorRowProps {
  visitor: ActiveVisitor;
  onCheckout: (visitorId: string) => void;
  isCheckingOut: boolean;
}

export function VisitorRow({
  visitor,
  onCheckout,
  isCheckingOut,
}: VisitorRowProps) {
  return (
    <tr className="border-b border-border/60">
      <td className="px-2 font-medium">
        <div className="min-w-0">
          <div className="truncate">{visitor.name}</div>
          <div className="text-xs text-muted-foreground sm:hidden">
            {maskCpfView(visitor.cpf)}
          </div>
        </div>
      </td>
      <td className="px-2 hidden sm:table-cell">{maskCpfView(visitor.cpf)}</td>
      <td className="px-2">{visitor.roomName}</td>
      <td className="px-2 hidden md:table-cell">
        {formatDateTime(visitor.checkInAt)}
      </td>
      <td className="px-2 text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCheckout(visitor.id)}
          disabled={isCheckingOut}
          className="text-xs px-2"
        >
          <span className="hidden sm:inline">Registrar saída</span>
          <span className="sm:hidden">Saída</span>
        </Button>
      </td>
    </tr>
  );
}
