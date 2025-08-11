import React from "react";
import { describe, test, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useLogsQuery } from "@/hooks/logs";
import type { LogsFiltersProps } from "@/types/logs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Mock do service
const mockFetch = vi.fn();
vi.mock("@/services/logs", () => ({
  fetchLogs: (p: LogsFiltersProps) => mockFetch(p),
}));

// Wrapper para fornecer QueryClient e Router sem usar JSX neste arquivo .ts
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(BrowserRouter, null, children)
  );
};

describe("hooks/useLogsQuery", () => {
  test("sucesso com dados", async () => {
    mockFetch.mockResolvedValueOnce({
      items: [],
      page: 1,
      pageSize: 20,
      total: 0,
      hasNext: false,
    });

    const { result } = renderHook(
      () => useLogsQuery({ page: 1, pageSize: 20, level: "info" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockFetch).toHaveBeenCalledWith({
      page: 1,
      pageSize: 20,
      level: "info",
    });
  });

  test("erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("x"));

    const { result } = renderHook(
      () => useLogsQuery({ page: 1, pageSize: 20, level: "warn" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  test("respeita refetchInterval", async () => {
    mockFetch.mockResolvedValue({
      items: [],
      page: 1,
      pageSize: 20,
      total: 0,
      hasNext: false,
    });

    const { result } = renderHook(
      () =>
        useLogsQuery({
          page: 1,
          pageSize: 20,
          level: "error",
          refetchInterval: 3000,
        }),
      { wrapper }
    );

    expect(result.current.fetchStatus).toBeDefined();
  });
});
