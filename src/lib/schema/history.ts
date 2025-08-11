import { z } from "zod";

export const historyFiltersSchema = z.object({
  search: z.string().optional().default(""),
  roomId: z.string().optional().default(""),
  from: z.string().optional().default(""), // "YYYY-MM-DD"
  to: z.string().optional().default(""),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export type HistoryFilters = z.infer<typeof historyFiltersSchema>;
