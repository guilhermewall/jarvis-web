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
