// Tipos base para respostas de erro da API
export interface ApiErrorResponse {
  error?: string;
  message?: string;
  details?: string;
  code?: number;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Status de requisições
export type RequestStatus = "idle" | "loading" | "success" | "error";
