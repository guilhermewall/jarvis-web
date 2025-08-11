import { describe, test, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useVisitorsStore } from "@/stores/visitors";

describe("useVisitorsStore", () => {
  beforeEach(() => {
    // Reset store before each test
    const { reset } = useVisitorsStore.getState();
    reset();
  });

  test("should have initial state", () => {
    const { result } = renderHook(() => useVisitorsStore());

    expect(result.current.visitors).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.searchTerm).toBe("");
    expect(result.current.selectedRoomId).toBe("");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.total).toBe(0);
    expect(result.current.density).toBe("comfortable");
  });

  test("should update search term", () => {
    const { result } = renderHook(() => useVisitorsStore());

    act(() => {
      result.current.setSearchTerm("João Silva");
    });

    expect(result.current.searchTerm).toBe("João Silva");
  });

  test("should update selected room ID", () => {
    const { result } = renderHook(() => useVisitorsStore());

    act(() => {
      result.current.setSelectedRoomId("room-123");
    });

    expect(result.current.selectedRoomId).toBe("room-123");
  });

  test("should update current page", () => {
    const { result } = renderHook(() => useVisitorsStore());

    act(() => {
      result.current.setCurrentPage(3);
    });

    expect(result.current.currentPage).toBe(3);
  });

  test("should update page size", () => {
    const { result } = renderHook(() => useVisitorsStore());

    act(() => {
      result.current.setPageSize(25);
    });

    expect(result.current.pageSize).toBe(25);
  });

  test("should update density", () => {
    const { result } = renderHook(() => useVisitorsStore());

    act(() => {
      result.current.setDensity("compact");
    });

    expect(result.current.density).toBe("compact");
  });

  test("should reset to initial state", () => {
    const { result } = renderHook(() => useVisitorsStore());

    // Change some values
    act(() => {
      result.current.setSearchTerm("test");
      result.current.setSelectedRoomId("room-123");
      result.current.setCurrentPage(5);
      result.current.setDensity("compact");
    });

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.searchTerm).toBe("");
    expect(result.current.selectedRoomId).toBe("");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.density).toBe("comfortable");
  });
});
