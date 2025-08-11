import { describe, test, expect, beforeEach, vi } from "vitest";

// Mock do api client
vi.mock("@/lib/api/client", () => ({
  api: {
    get: vi.fn(),
  },
}));

import { fetchActiveVisitors } from "@/services/visitors";
import { api } from "@/lib/api/client";

const mockGet = vi.mocked(api.get);

describe("Visitors Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch active visitors without parameters", async () => {
    const mockResponse = {
      data: [
        { id: "1", name: "João Silva", roomId: "room-1" },
        { id: "2", name: "Maria Santos", roomId: "room-2" },
      ],
    };

    mockGet.mockResolvedValueOnce(mockResponse);

    const result = await fetchActiveVisitors();

    expect(mockGet).toHaveBeenCalledWith("/visitors/active", {
      params: undefined,
    });
    expect(result).toEqual(mockResponse.data);
  });

  test("should fetch active visitors with parameters", async () => {
    const mockResponse = {
      data: [{ id: "1", name: "João Silva", roomId: "room-1" }],
    };

    mockGet.mockResolvedValueOnce(mockResponse);

    const params = {
      roomId: "room-1",
      search: "João",
    };

    const result = await fetchActiveVisitors(params);

    expect(mockGet).toHaveBeenCalledWith("/visitors/active", { params });
    expect(result).toEqual(mockResponse.data);
  });

  test("should handle empty parameters", async () => {
    const mockResponse = {
      data: [],
    };

    mockGet.mockResolvedValueOnce(mockResponse);

    const params = {
      roomId: "",
      search: "",
    };

    const result = await fetchActiveVisitors(params);

    expect(mockGet).toHaveBeenCalledWith("/visitors/active", { params });
    expect(result).toEqual([]);
  });

  test("should propagate API errors", async () => {
    const error = new Error("Network error");
    mockGet.mockRejectedValueOnce(error);

    await expect(fetchActiveVisitors()).rejects.toThrow("Network error");
  });
});
