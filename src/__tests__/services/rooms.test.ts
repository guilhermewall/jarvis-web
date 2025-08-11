import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchRooms } from "@/services/rooms";

const mockGet = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api/client", () => ({
  api: { get: mockGet },
}));

describe("services/rooms.fetchRooms", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna lista de salas", async () => {
    mockGet.mockResolvedValueOnce({
      data: [{ id: "r1", name: "Sala", capacity: 10, activeCount: 1 }],
    });
    const res = await fetchRooms();
    expect(res).toEqual([
      { id: "r1", name: "Sala", capacity: 10, activeCount: 1 },
    ]);
    expect(mockGet).toHaveBeenCalledWith("/rooms");
  });
});
