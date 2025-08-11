import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HistoryFilters } from "@/components/domain/history";

const setup = (over: Partial<Parameters<typeof HistoryFilters>[0]> = {}) => {
  const props = {
    search: "",
    roomId: "",
    from: "",
    to: "",
    pageSize: 10,
    rooms: [
      { id: "r1", name: "Sala 1", capacity: 10, activeCount: 2 },
      { id: "r2", name: "Sala 2", capacity: 20, activeCount: 5 },
    ],
    onSearch: vi.fn(),
    onRoom: vi.fn(),
    onFrom: vi.fn(),
    onTo: vi.fn(),
    onPageSize: vi.fn(),
    onReset: vi.fn(),
    ...over,
  };
  render(<HistoryFilters {...props} />);
  return props;
};

describe("components/domain/history/HistoryFilters", () => {
  it("digita busca", () => {
    const props = setup();
    fireEvent.change(screen.getByPlaceholderText("Buscar por nome ou CPF"), {
      target: { value: "ana" },
    });
    expect(props.onSearch).toHaveBeenCalledWith("ana");
  });

  it("seleciona sala e pageSize", () => {
    const props = setup();
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "r2" } });
    expect(props.onRoom).toHaveBeenCalledWith("r2");

    fireEvent.change(selects[1], { target: { value: "20" } });
    expect(props.onPageSize).toHaveBeenCalledWith(20);
  });

  it("altera datas", () => {
    const props = setup({ from: "2024-01-01", to: "2024-01-31" });
    const fromInput = screen.getByDisplayValue("2024-01-01");
    const toInput = screen.getByDisplayValue("2024-01-31");
    fireEvent.change(fromInput, { target: { value: "2024-02-01" } });
    fireEvent.change(toInput, { target: { value: "2024-02-28" } });
    expect(props.onFrom).toHaveBeenCalledWith("2024-02-01");
    expect(props.onTo).toHaveBeenCalledWith("2024-02-28");
  });

  it("reset", () => {
    const props = setup();
    fireEvent.click(screen.getByRole("button", { name: /limpar/i }));
    expect(props.onReset).toHaveBeenCalled();
  });
});
