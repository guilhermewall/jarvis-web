import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  fetchActiveVisitors,
  createVisitor,
  checkoutVisitor,
} from "@/services/visitors";

const mockGet = vi.hoisted(() => vi.fn());
const mockPost = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api/client", () => ({
  api: { get: mockGet, post: mockPost },
}));

describe("services/visitors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchActiveVisitors envia params", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    const res = await fetchActiveVisitors({ roomId: "r1", search: "ana" });
    expect(res).toEqual([]);
    expect(mockGet).toHaveBeenCalledWith("/visitors/active", {
      params: { roomId: "r1", search: "ana" },
    });
  });

  it("createVisitor posta payload", async () => {
    mockPost.mockResolvedValueOnce({ data: { id: "v1" } });
    const res = await createVisitor({ name: "Ana", cpf: "123", roomId: "r1" });
    expect(res).toEqual({ id: "v1" });
    expect(mockPost).toHaveBeenCalledWith("/visitors", {
      name: "Ana",
      cpf: "123",
      roomId: "r1",
    });
  });

  it("checkoutVisitor posta vazio", async () => {
    mockPost.mockResolvedValueOnce({ data: { ok: true } });
    const res = await checkoutVisitor("v1");
    expect(res).toEqual({ ok: true });
    expect(mockPost).toHaveBeenCalledWith("/visitors/v1/checkout", {});
  });
});
