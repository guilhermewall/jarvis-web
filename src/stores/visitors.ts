import { create } from "zustand";
import { persist } from "zustand/middleware";

type Density = "comfortable" | "compact";

interface Visitor {
  id: string;
  name: string;
  cpf: string;
  roomId: string;
  entryTime: string;
}

interface VisitorsState {
  visitors: Visitor[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedRoomId: string;
  currentPage: number;
  pageSize: number;
  total: number;
  density: Density;
  setVisitors: (visitors: Visitor[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedRoomId: (roomId: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotal: (total: number) => void;
  setDensity: (density: Density) => void;
  reset: () => void;
}

export const useVisitorsStore = create<VisitorsState>()(
  persist(
    (set) => ({
      visitors: [],
      isLoading: false,
      error: null,
      searchTerm: "",
      selectedRoomId: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      density: "comfortable",
      setVisitors: (visitors) => set({ visitors }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSelectedRoomId: (selectedRoomId) => set({ selectedRoomId }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setPageSize: (pageSize) => set({ pageSize }),
      setTotal: (total) => set({ total }),
      setDensity: (density) => set({ density }),
      reset: () =>
        set({
          searchTerm: "",
          selectedRoomId: "",
          currentPage: 1,
          density: "comfortable",
        }),
    }),
    { name: "visitors-ui" }
  )
);
