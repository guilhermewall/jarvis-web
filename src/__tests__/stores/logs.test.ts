import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLogsStore } from "@/stores/logs";

describe("useLogsStore", () => {
  beforeEach(() => {
    const { reset } = useLogsStore.getState();
    reset();
  });

  it("estado inicial", () => {
    const { result } = renderHook(() => useLogsStore());
    expect(result.current).toMatchObject({
      search: "",
      level: "all",
      from: "",
      to: "",
      page: 1,
      pageSize: 20,
      autoRefresh: false,
      refreshMs: 10000,
    });
  });

  it("setters e dependências de página", () => {
    const { result } = renderHook(() => useLogsStore());

    act(() => {
      result.current.setPage(4);
    });
    expect(result.current.page).toBe(4);

    act(() => {
      result.current.setSearch("err");
      result.current.setLevel("error");
      result.current.setFrom("2024-01-01");
      result.current.setTo("2024-01-31");
      result.current.setPageSize(50);
    });

    expect(result.current.search).toBe("err");
    expect(result.current.level).toBe("error");
    expect(result.current.from).toBe("2024-01-01");
    expect(result.current.to).toBe("2024-01-31");
    expect(result.current.pageSize).toBe(50);
    expect(result.current.page).toBe(1);
  });

  it("auto refresh e refreshMs", () => {
    const { result } = renderHook(() => useLogsStore());

    act(() => {
      result.current.setAutoRefresh(true);
      result.current.setRefreshMs(5000);
    });

    expect(result.current.autoRefresh).toBe(true);
    expect(result.current.refreshMs).toBe(5000);
  });

  it("reset volta ao inicial", () => {
    const { result } = renderHook(() => useLogsStore());

    act(() => {
      result.current.setSearch("x");
      result.current.setLevel("info");
      result.current.setFrom("2024-03-01");
      result.current.setTo("2024-03-31");
      result.current.setPage(3);
      result.current.setPageSize(5);
      result.current.setAutoRefresh(true);
      result.current.setRefreshMs(1234);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current).toMatchObject({
      search: "",
      level: "all",
      from: "",
      to: "",
      page: 1,
      pageSize: 20,
      autoRefresh: false,
      refreshMs: 10000,
    });
  });
});
