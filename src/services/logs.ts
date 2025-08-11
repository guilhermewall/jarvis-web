import { api } from "@/lib/api/client";
import { cleanEmptyParams } from "@/lib/utils/api";
import type { LogsFiltersProps, LogsResponse } from "@/types/logs";

export async function fetchLogs(
  params: LogsFiltersProps
): Promise<LogsResponse & { hasNext: boolean }> {
  const cleanParams = cleanEmptyParams(params);

  const { data } = await api.get("/logs", { params: cleanParams });
  const hasNext = data.page * data.pageSize < data.total;
  return { ...data, hasNext };
}
