import { api } from "@/lib/api/client";
import type { Room } from "@/types/rooms";

export async function fetchRooms(): Promise<Room[]> {
  const { data } = await api.get("/rooms");
  return data;
}
