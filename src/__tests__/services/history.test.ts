import { describe, test, expect, beforeEach, vi } from "vitest";
import { fetchHistory } from "@/services/history";

// Mock do api client
const mockGet = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api/client", () => ({
  api: {
    get: mockGet,
  },
}));

describe("services/history.fetchHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("deve retornar hasNext=true quando page*pageSize < total", async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        items: [],
        page: 1,
        pageSize: 10,
        total: 35,
      },
    });

    const res = await fetchHistory({ page: 1, pageSize: 10 });
    expect(res.hasNext).toBe(true);
  });

  test("deve retornar hasNext=false quando page*pageSize >= total", async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        items: [],
        page: 2,
        pageSize: 20,
        total: 40,
      },
    });

    const res = await fetchHistory({ page: 2, pageSize: 20 });
    expect(res.hasNext).toBe(false);
  });

  test("deve enviar apenas params não vazios ao api.get", async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        items: [],
        page: 1,
        pageSize: 10,
        total: 0,
      },
    });

    await fetchHistory({
      page: 1,
      pageSize: 10,
      search: "",
      roomId: "",
      from: "",
      to: "",
    });

    // O serviço usa cleanEmptyParams, então os campos vazios devem ser removidos
    expect(mockGet).toHaveBeenCalledWith("/visits/history", {
      params: { page: 1, pageSize: 10 },
    });
  });

  test("propaga erro da API", async () => {
    const err = new Error("Network");
    mockGet.mockRejectedValueOnce(err);

    await expect(fetchHistory({ page: 1, pageSize: 10 })).rejects.toThrow(
      "Network"
    );
  });
});
