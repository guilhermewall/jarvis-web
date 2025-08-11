import { describe, test, expect, beforeEach, vi } from "vitest";
import { fetchLogs } from "@/services/logs";

// Mock do api client
const mockGet = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api/client", () => ({
  api: {
    get: mockGet,
  },
}));

describe("services/logs.fetchLogs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("calcula hasNext corretamente", async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        items: [],
        page: 1,
        pageSize: 20,
        total: 21,
      },
    });

    const res = await fetchLogs({
      page: 1,
      pageSize: 20,
      search: "",
      level: "info",
    });
    expect(res.hasNext).toBe(true);
  });

  test("remove params vazios e mantém level válido", async () => {
    mockGet.mockResolvedValueOnce({
      data: { items: [], page: 1, pageSize: 20, total: 0 },
    });

    await fetchLogs({
      page: 1,
      pageSize: 20,
      search: "",
      level: "warn",
      from: "",
      to: "",
    });
    expect(mockGet).toHaveBeenCalledWith("/logs", {
      params: { page: 1, pageSize: 20, level: "warn" },
    });
  });

  test("propaga erros", async () => {
    const err = new Error("Boom");
    mockGet.mockRejectedValueOnce(err);

    await expect(
      fetchLogs({ page: 1, pageSize: 20, level: "error" })
    ).rejects.toThrow("Boom");
  });
});
