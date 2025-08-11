import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LogsFilters } from "@/lib/schema/logs";

interface State extends LogsFilters {
  setSearch: (v: string) => void;
  setLevel: (v: "all" | "info" | "warn" | "error") => void;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setPage: (n: number) => void;
  setPageSize: (n: number) => void;
  setAutoRefresh: (b: boolean) => void;
  setRefreshMs: (n: number) => void;
  reset: () => void;
}

export const useLogsStore = create<State>()(
  persist(
    (set) => ({
      search: "",
      level: "all",
      from: "",
      to: "",
      page: 1,
      pageSize: 20,
      autoRefresh: false,
      refreshMs: 10000,

      setSearch: (search) => set({ search, page: 1 }),
      setLevel: (level) => set({ level, page: 1 }),
      setFrom: (from) => set({ from, page: 1 }),
      setTo: (to) => set({ to, page: 1 }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: 1 }),
      setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
      setRefreshMs: (refreshMs) => set({ refreshMs }),
      reset: () =>
        set({
          search: "",
          level: "all",
          from: "",
          to: "",
          page: 1,
          pageSize: 20,
          autoRefresh: false,
          refreshMs: 10000,
        }),
    }),
    { name: "logs-ui" }
  )
);
