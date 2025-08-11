import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LogsFilters } from "@/components/domain/logs";

const setup = (over: Partial<Parameters<typeof LogsFilters>[0]> = {}) => {
  const props = {
    search: "",
    level: "all" as const,
    from: "",
    to: "",
    pageSize: 20,
    autoRefresh: false,
    refreshMs: 10000,
    onSearch: vi.fn(),
    onLevel: vi.fn(),
    onFrom: vi.fn(),
    onTo: vi.fn(),
    onPageSize: vi.fn(),
    onAutoRefresh: vi.fn(),
    onRefreshMs: vi.fn(),
    onReset: vi.fn(),
    ...over,
  };
  render(<LogsFilters {...props} />);
  return props;
};

describe("components/domain/logs/LogsFilters", () => {
  it("chama onSearch ao digitar", () => {
    const props = setup();
    fireEvent.change(screen.getByPlaceholderText("Buscar por mensagem"), {
      target: { value: "foo" },
    });
    expect(props.onSearch).toHaveBeenCalledWith("foo");
  });

  it("chama onFrom/onTo ao mudar datas", () => {
    const props = setup({ from: "2024-01-01", to: "2024-01-31" });
    const fromInput = screen.getByDisplayValue("2024-01-01");
    const toInput = screen.getByDisplayValue("2024-01-31");
    fireEvent.change(fromInput, { target: { value: "2024-02-01" } });
    fireEvent.change(toInput, { target: { value: "2024-02-28" } });
    expect(props.onFrom).toHaveBeenCalledWith("2024-02-01");
    expect(props.onTo).toHaveBeenCalledWith("2024-02-28");
  });

  it("toggle auto refresh", () => {
    const props = setup({ autoRefresh: false });
    const switchEl = screen.getByRole("switch");
    fireEvent.click(switchEl);
    expect(props.onAutoRefresh).toHaveBeenCalledWith(true);
  });

  it("botão reset", () => {
    const props = setup();
    fireEvent.click(screen.getByRole("button", { name: /limpar/i }));
    expect(props.onReset).toHaveBeenCalled();
  });
});
