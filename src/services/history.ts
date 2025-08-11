import { api } from "@/lib/api/client";
import type { HistoryFiltersProps, HistoryResponse } from "@/types/history";

export async function fetchHistory(
  params: HistoryFiltersProps
): Promise<HistoryResponse> {
  const p = { ...params };
  Object.keys(p).forEach((key) => {
    const k = key as keyof HistoryFiltersProps;
    if (p[k] === "" || p[k] == null) {
      delete p[k];
    }
  });

  const { data } = await api.get("/visits/history", { params: p });
  const hasNext = data.page * data.pageSize < data.total;
  return { ...data, hasNext };
}
