import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HistoryTable } from "@/components/domain/history";

const rows = [
  {
    id: "1",
    name: "Ana",
    cpf: "12345678901",
    roomId: "r1",
    roomName: "Sala 1",
    checkInAt: "2024-01-01T12:00:00Z",
    checkOutAt: null,
  },
  {
    id: "2",
    name: "Bruno",
    cpf: "98765432100",
    roomId: "r2",
    roomName: "Sala 2",
    checkInAt: "2024-01-01T13:00:00Z",
    checkOutAt: "2024-01-01T14:00:00Z",
  },
];

describe("components/domain/history/HistoryTable", () => {
  it("renderiza linhas e paginação", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <HistoryTable
        rows={rows}
        page={1}
        pageSize={10}
        total={20}
        hasNext={true}
        onPrev={onPrev}
        onNext={onNext}
      />
    );
    expect(screen.getByText(/registros/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /próxima/i }));
    expect(onNext).toHaveBeenCalled();
    const prev = screen.getByRole("button", { name: /anterior/i });
    expect(prev).toBeDisabled();
  });

  it("mostra vazio", () => {
    render(
      <HistoryTable
        rows={[]}
        page={1}
        pageSize={10}
        total={0}
        hasNext={false}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText("0 resultados")).toBeInTheDocument();
  });
});
