import { api } from "@/lib/api/client";
import { cleanEmptyParams } from "@/lib/utils/api";
import type { HistoryFiltersProps, HistoryResponse } from "@/types/history";

export async function fetchHistory(
  params: HistoryFiltersProps
): Promise<HistoryResponse> {
  const cleanParams = cleanEmptyParams(params);

  const { data } = await api.get("/visits/history", { params: cleanParams });
  const hasNext = data.page * data.pageSize < data.total;
  return { ...data, hasNext };
}
