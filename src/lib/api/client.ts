import axios, { AxiosError } from "axios";
import { auth } from "@/lib/auth";
import type { ApiErrorResponse } from "@/types/api/common";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// handler opcional para 401 (configuramos no app)
let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(handler: (() => void) | null) {
  onUnauthorized = handler;
}

// REQUEST: injeta Authorization com token atual
api.interceptors.request.use((config) => {
  const token = auth.get();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// helper para normalizar erro em Error(message)
function normalizeAxiosError(err: unknown): Error {
  const ax = err as AxiosError<ApiErrorResponse>;
  const msg =
    ax.response?.data?.error ||
    ax.response?.data?.message ||
    ax.message ||
    "Erro inesperado";
  return new Error(msg);
}

// RESPONSE: trata 401/403 e propaga erro normalizado
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      auth.clear();
      onUnauthorized?.();
    }
    return Promise.reject(normalizeAxiosError(error));
  }
);
