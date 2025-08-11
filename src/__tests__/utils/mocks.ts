import { vi } from "vitest";

// Mock do store do Zustand para testes
export const mockStore = {
  // Dashboard store
  visitors: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedRoomId: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
  density: "comfortable" as const,

  // Actions
  setSearchTerm: vi.fn(),
  setSelectedRoomId: vi.fn(),
  setCurrentPage: vi.fn(),
  setPageSize: vi.fn(),
  setDensity: vi.fn(),
  fetchVisitors: vi.fn(),
  addVisitor: vi.fn(),
  checkoutVisitor: vi.fn(),
  reset: vi.fn(),
};

// Mock do Zustand stores
vi.mock("@/stores/useVisitorsStore", () => ({
  useVisitorsStore: () => mockStore,
}));

vi.mock("@/stores/useHistoryStore", () => ({
  useHistoryStore: () => ({
    ...mockStore,
    history: [],
    fetchHistory: vi.fn(),
  }),
}));

vi.mock("@/stores/useLogsStore", () => ({
  useLogsStore: () => ({
    ...mockStore,
    logs: [],
    selectedLevel: "",
    setSelectedLevel: vi.fn(),
    fetchLogs: vi.fn(),
  }),
}));
