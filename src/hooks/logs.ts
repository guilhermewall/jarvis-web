import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchLogs } from "@/services/logs";
import type { LogsFiltersQuery } from "@/types/logs";
import { QUERY_KEY } from "@/constants/react-query";

export function useLogsQuery(p: LogsFiltersQuery) {
  const { refetchInterval, ...params } = p;
  return useQuery({
    queryKey: [QUERY_KEY.LOGS, params],
    queryFn: () => fetchLogs(params),
    placeholderData: keepPreviousData,
    refetchInterval,
  });
}
