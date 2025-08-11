import { useMemo } from "react";
import {
  HistoryHeader,
  HistoryFilters,
  HistoryTable,
} from "@/components/domain/history";
import { useRooms } from "@/hooks/rooms";
import { useHistoryQuery } from "@/hooks/history";
import { useHistoryStore } from "@/stores/history";

export default function HistoryPage() {
  const { data: rooms } = useRooms();

  const {
    search,
    roomId,
    from,
    to,
    page,
    pageSize,
    setSearch,
    setRoomId,
    setFrom,
    setTo,
    setPage,
    setPageSize,
    reset,
  } = useHistoryStore();

  const params = useMemo(
    () => ({
      page,
      pageSize,
      search: search || undefined,
      roomId: roomId || undefined,
      from: from || undefined,
      to: to || undefined,
    }),
    [page, pageSize, search, roomId, from, to]
  );

  const { data } = useHistoryQuery(params);

  return (
    <div className="grid gap-6">
      <HistoryHeader />

      <HistoryFilters
        search={search}
        roomId={roomId}
        from={from}
        to={to}
        pageSize={pageSize}
        rooms={rooms ?? []}
        onSearch={setSearch}
        onRoom={setRoomId}
        onFrom={setFrom}
        onTo={setTo}
        onPageSize={setPageSize}
        onReset={reset}
      />

      <HistoryTable
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
