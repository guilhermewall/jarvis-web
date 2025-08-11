export interface HistoryFiltersProps {
  page: number;
  pageSize: number;
  search?: string;
  roomId?: string;
  from?: string; // "YYYY-MM-DD"
  to?: string; // "YYYY-MM-DD"
}

export interface HistoryItem {
  id: string;
  name: string;
  cpf: string;
  roomId: string;
  roomName: string;
  checkInAt: string;
  checkOutAt: string | null;
}

export interface HistoryResponse {
  items: HistoryItem[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}
