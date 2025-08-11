import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LogsTable } from "@/components/domain/logs";

const rows = [
  {
    id: "1",
    level: "info" as const,
    message: "Hello",
    createdAt: "2024-01-01T12:00:00Z",
  },
  {
    id: "2",
    level: "error" as const,
    message: "Boom",
    createdAt: "2024-01-01T12:05:00Z",
    meta: { a: 1 },
  },
];

describe("components/domain/logs/LogsTable", () => {
  it("renderiza linhas e paginação", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <LogsTable
        rows={rows}
        page={1}
        pageSize={10}
        total={20}
        hasNext={true}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    expect(screen.getByText(/eventos/i)).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Boom")).toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: /próxima/i });
    fireEvent.click(nextBtn);
    expect(onNext).toHaveBeenCalled();

    const prevBtn = screen.getByRole("button", { name: /anterior/i });
    expect(prevBtn).toBeDisabled();
  });

  it("mostra vazio", () => {
    render(
      <LogsTable
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
