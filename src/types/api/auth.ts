// Tipos relacionados à autenticação
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface SimpleLoginResponse {
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}
