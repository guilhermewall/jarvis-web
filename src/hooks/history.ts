import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchHistory } from "@/services/history";
import type { HistoryFiltersProps } from "@/types/history";
import { QUERY_KEY } from "@/constants/react-query";

export function useHistoryQuery(p: HistoryFiltersProps) {
  return useQuery({
    queryKey: [QUERY_KEY.HISTORY, p],
    queryFn: () => fetchHistory(p),
    placeholderData: keepPreviousData,
  });
}
