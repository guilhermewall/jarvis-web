import { z } from "zod";

export const logsFiltersSchema = z.object({
  search: z.string().optional().default(""),
  level: z.enum(["all", "info", "warn", "error"]).optional().default("all"),
  from: z.string().optional().default(""),
  to: z.string().optional().default(""),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  autoRefresh: z.boolean().default(false),
  refreshMs: z.number().int().min(1000).max(60000).default(10000),
});

export type LogsFilters = z.infer<typeof logsFiltersSchema>;
export type LogLevel = "info" | "warn" | "error";
