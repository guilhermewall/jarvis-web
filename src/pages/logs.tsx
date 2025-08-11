import { useMemo } from "react";
import { LogsHeader, LogsFilters, LogsTable } from "@/components/domain/logs";
import { useLogsQuery } from "@/hooks/logs";
import { useLogsStore } from "@/stores/logs";

export default function LogsPage() {
  const {
    search,
    level,
    from,
    to,
    page,
    pageSize,
    autoRefresh,
    refreshMs,
    setSearch,
    setLevel,
    setFrom,
    setTo,
    setPage,
    setPageSize,
    setAutoRefresh,
    setRefreshMs,
    reset,
  } = useLogsStore();

  const params = useMemo(
    () => ({
      page,
      pageSize,
      search: search || undefined,
      level: level === "all" ? undefined : level,
      from: from || undefined,
      to: to || undefined,
    }),
    [page, pageSize, search, level, from, to]
  );

  const { data } = useLogsQuery({
    ...params,
    refetchInterval: autoRefresh ? refreshMs : false,
  });

  return (
    <div className="grid gap-6">
      <LogsHeader />

      <LogsFilters
        search={search}
        level={level}
        from={from}
        to={to}
        pageSize={pageSize}
        autoRefresh={autoRefresh}
        refreshMs={refreshMs}
        onSearch={setSearch}
        onLevel={setLevel}
        onFrom={setFrom}
        onTo={setTo}
        onPageSize={setPageSize}
        onAutoRefresh={setAutoRefresh}
        onRefreshMs={setRefreshMs}
        onReset={reset}
      />

      <LogsTable
        rows={data?.items ?? []}
        page={data?.page ?? page}
        pageSize={data?.pageSize ?? pageSize}
        total={data?.total ?? 0}
        hasNext={!!data?.hasNext}
        onPrev={() => setPage(Math.max(1, page - 1))}
        onNext={() => setPage(page + 1)}
      />
    </div>
  );
}
