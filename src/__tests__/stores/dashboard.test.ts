import { describe, test, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDashboardStore } from "@/stores/dashboard";

describe("useDashboardStore", () => {
  beforeEach(() => {
    // Reset store before each test
    const { reset } = useDashboardStore.getState();
    reset();
  });

  test("should have initial state", () => {
    const { result } = renderHook(() => useDashboardStore());

    expect(result.current.search).toBe("");
    expect(result.current.roomId).toBe("");
    expect(result.current.density).toBe("comfortable");
  });

  test("should update search term", () => {
    const { result } = renderHook(() => useDashboardStore());

    act(() => {
      result.current.setSearch("João Silva");
    });

    expect(result.current.search).toBe("João Silva");
  });

  test("should update room ID", () => {
    const { result } = renderHook(() => useDashboardStore());

    act(() => {
      result.current.setRoomId("room-123");
    });

    expect(result.current.roomId).toBe("room-123");
  });

  test("should update density", () => {
    const { result } = renderHook(() => useDashboardStore());

    act(() => {
      result.current.setDensity("compact");
    });

    expect(result.current.density).toBe("compact");
  });

  test("should reset search and roomId to initial state", () => {
    const { result } = renderHook(() => useDashboardStore());

    // Change some values
    act(() => {
      result.current.setSearch("test");
      result.current.setRoomId("room-123");
      result.current.setDensity("compact");
    });

    // Reset (only resets search and roomId, not density)
    act(() => {
      result.current.reset();
    });

    expect(result.current.search).toBe("");
    expect(result.current.roomId).toBe("");
    // Density is not reset by the current implementation
    expect(result.current.density).toBe("compact");
  });
});
