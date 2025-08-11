import { api } from "@/lib/api/client";
import type { LoginInput } from "@/lib/schema/auth";
import type { SimpleLoginResponse } from "@/types/api/auth";

export async function loginService(
  payload: LoginInput
): Promise<SimpleLoginResponse> {
  const { data } = await api.post("/auth/login", payload);
  return data;
}
