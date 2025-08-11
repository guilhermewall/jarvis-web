import type { LogLevel } from "@/lib/schema/logs";

export interface LogsFiltersProps {
  page: number;
  pageSize: number;
  search?: string;
  level?: LogLevel;
  from?: string;
  to?: string;
}

export interface LogsFiltersQuery extends LogsFiltersProps {
  refetchInterval?: number | false;
}

export interface LogItem {
  id: string;
  level: LogLevel;
  message: string;
  meta?: unknown;
  createdAt: string;
}

export interface LogsResponse {
  items: LogItem[];
  page: number;
  pageSize: number;
  total: number;
}
