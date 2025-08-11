import React from "react";
import { describe, test, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHistoryQuery } from "@/hooks/history";
import type { HistoryFiltersProps } from "@/types/history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock service
const mockFetch = vi.fn();
vi.mock("@/services/history", () => ({
  fetchHistory: (p: HistoryFiltersProps) => mockFetch(p),
}));

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
};

describe("hooks/useHistoryQuery", () => {
  test("sucesso", async () => {
    mockFetch.mockResolvedValueOnce({
      items: [],
      page: 1,
      pageSize: 10,
      total: 0,
      hasNext: false,
    });

    const { result } = renderHook(
      () => useHistoryQuery({ page: 1, pageSize: 10 }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockFetch).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
  });

  test("erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("x"));

    const { result } = renderHook(
      () => useHistoryQuery({ page: 2, pageSize: 20, search: "a" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
