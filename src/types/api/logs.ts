// Tipos para logs do sistema
export interface SystemLog {
  id: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: string;
  source: string;
  metadata?: Record<string, unknown>;
}

export interface LogsFilter {
  level?: SystemLog["level"];
  source?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}
