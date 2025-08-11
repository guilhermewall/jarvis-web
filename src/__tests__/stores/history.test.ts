import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHistoryStore } from "@/stores/history";

describe("useHistoryStore", () => {
  beforeEach(() => {
    const { reset } = useHistoryStore.getState();
    reset();
  });

  it("estado inicial", () => {
    const { result } = renderHook(() => useHistoryStore());
    expect(result.current.search).toBe("");
    expect(result.current.roomId).toBe("");
    expect(result.current.from).toBe("");
    expect(result.current.to).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });

  it("setters atualizam e resetam pagina", () => {
    const { result } = renderHook(() => useHistoryStore());
    act(() => {
      result.current.setPage(3);
    });
    expect(result.current.page).toBe(3);

    act(() => {
      result.current.setSearch("ana");
    });
    expect(result.current.search).toBe("ana");
    expect(result.current.page).toBe(1);

    act(() => {
      result.current.setRoomId("r1");
      result.current.setFrom("2024-01-01");
      result.current.setTo("2024-01-31");
      result.current.setPageSize(20);
    });
    expect(result.current.roomId).toBe("r1");
    expect(result.current.from).toBe("2024-01-01");
    expect(result.current.to).toBe("2024-01-31");
    expect(result.current.pageSize).toBe(20);
    expect(result.current.page).toBe(1);
  });

  it("reset volta ao inicial", () => {
    const { result } = renderHook(() => useHistoryStore());
    act(() => {
      result.current.setSearch("x");
      result.current.setRoomId("r2");
      result.current.setFrom("2024-02-01");
      result.current.setTo("2024-02-20");
      result.current.setPage(5);
      result.current.setPageSize(50);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current).toMatchObject({
      search: "",
      roomId: "",
      from: "",
      to: "",
      page: 1,
      pageSize: 10,
    });
  });
});
