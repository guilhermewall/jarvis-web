import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoryFilters } from "@/lib/schema/history";

type State = HistoryFilters & {
  setSearch: (v: string) => void;
  setRoomId: (v: string) => void;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setPage: (p: number) => void;
  setPageSize: (n: number) => void;
  reset: () => void;
};

export const useHistoryStore = create<State>()(
  persist(
    (set) => ({
      search: "",
      roomId: "",
      from: "",
      to: "",
      page: 1,
      pageSize: 10,

      setSearch: (search) => set({ search, page: 1 }),
      setRoomId: (roomId) => set({ roomId, page: 1 }),
      setFrom: (from) => set({ from, page: 1 }),
      setTo: (to) => set({ to, page: 1 }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: 1 }),
      reset: () =>
        set({
          search: "",
          roomId: "",
          from: "",
          to: "",
          page: 1,
          pageSize: 10,
        }),
    }),
    { name: "history-ui" }
  )
);
