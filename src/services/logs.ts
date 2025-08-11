import { api } from "@/lib/api/client";
import type { LogsFiltersProps, LogsResponse } from "@/types/logs";

export async function fetchLogs(
  params: LogsFiltersProps
): Promise<LogsResponse & { hasNext: boolean }> {
  const p = { ...params };
  Object.keys(p).forEach((key) => {
    const k = key as keyof LogsFiltersProps;
    if (p[k] === "" || p[k] == null) {
      delete p[k];
    }
  });

  const { data } = await api.get("/logs", { params: p });
  const hasNext = data.page * data.pageSize < data.total;
  return { ...data, hasNext };
}
