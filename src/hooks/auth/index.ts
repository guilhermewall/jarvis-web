import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { loginService } from "@/services/auth";
import type { LoginInput } from "@/lib/schema/auth";
import type { SimpleLoginResponse } from "@/types/api/auth";

export function useLogin(
  options?: UseMutationOptions<SimpleLoginResponse, Error, LoginInput>
) {
  return useMutation({
    mutationFn: (input: LoginInput) => loginService(input),
    ...options,
  });
}
