import { create } from "zustand";
import { persist } from "zustand/middleware";

type Density = "comfortable" | "compact";

interface DashboardState {
  search: string;
  roomId: string;
  density: Density;
  setSearch: (v: string) => void;
  setRoomId: (id: string) => void;
  setDensity: (d: Density) => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      search: "",
      roomId: "",
      density: "comfortable",
      setSearch: (v) => set({ search: v }),
      setRoomId: (roomId) => set({ roomId }),
      setDensity: (density) => set({ density }),
      reset: () => set({ search: "", roomId: "" }),
    }),
    { name: "dashboard-ui" }
  )
);
