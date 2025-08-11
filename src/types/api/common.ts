// Tipos base para respostas de erro da API
export interface ApiErrorResponse {
  error?: string;
  message?: string;
  details?: string;
  code?: number;
  timestamp?: string;
}

// Tipos para respostas de sucesso paginadas
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Tipos para respostas simples
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Status de requisições
export type RequestStatus = "idle" | "loading" | "success" | "error";
