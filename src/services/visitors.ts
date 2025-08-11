import { api } from "@/lib/api/client";
import type { ActiveVisitor, CreateVisitor } from "@/types/visitors";

export async function fetchActiveVisitors(params?: {
  roomId?: string;
  search?: string;
}): Promise<ActiveVisitor[]> {
  const { data } = await api.get("/visitors/active", { params });
  return data;
}

export async function createVisitor(
  payload: CreateVisitor
): Promise<{ id: string }> {
  const { data } = await api.post("/visitors", payload);
  return data;
}

export async function checkoutVisitor(id: string): Promise<{ ok: true }> {
  const { data } = await api.post(`/visitors/${id}/checkout`, {});
  return data;
}
