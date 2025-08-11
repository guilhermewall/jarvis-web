import { http, HttpResponse } from "msw";
import {
  createMockVisitors,
  createMockHistory,
  createMockLogs,
  createMockRooms,
} from "./factories";
import type { ActiveVisitor } from "@/types/visitors";
import type { HistoryItem } from "@/types/history";
import type { LogItem } from "@/types/logs";

export const handlers = [
  // Dashboard API
  http.get("/api/visitors", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = Number(url.searchParams.get("pageSize")) || 10;
    const search = url.searchParams.get("search") || "";
    const roomId = url.searchParams.get("roomId") || "";

    const allVisitors = createMockVisitors(25);
    let filteredVisitors: ActiveVisitor[] = allVisitors;

    // Aplicar filtros
    if (search) {
      filteredVisitors = filteredVisitors.filter(
        (visitor: ActiveVisitor) =>
          visitor.name.toLowerCase().includes(search.toLowerCase()) ||
          visitor.cpf.includes(search)
      );
    }

    if (roomId) {
      filteredVisitors = filteredVisitors.filter(
        (visitor: ActiveVisitor) => visitor.roomId === roomId
      );
    }

    // Paginação
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedVisitors = filteredVisitors.slice(startIndex, endIndex);

    return HttpResponse.json({
      items: paginatedVisitors,
      page,
      pageSize,
      total: filteredVisitors.length,
    });
  }),

  // History API
  http.get("/api/visits/history", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = Number(url.searchParams.get("pageSize")) || 10;
    const search = url.searchParams.get("search") || "";
    const roomId = url.searchParams.get("roomId") || "";

    const allHistory = createMockHistory(50);
    let filteredHistory: HistoryItem[] = allHistory;

    // Aplicar filtros
    if (search) {
      filteredHistory = filteredHistory.filter(
        (item: HistoryItem) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.cpf.includes(search)
      );
    }

    if (roomId) {
      filteredHistory = filteredHistory.filter(
        (item: HistoryItem) => item.roomId === roomId
      );
    }

    // Paginação
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedHistory = filteredHistory.slice(startIndex, endIndex);

    return HttpResponse.json({
      items: paginatedHistory,
      page,
      pageSize,
      total: filteredHistory.length,
    });
  }),

  // Logs API
  http.get("/api/logs", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = Number(url.searchParams.get("pageSize")) || 20;
    const search = url.searchParams.get("search") || "";
    const level = url.searchParams.get("level") || "";

    const allLogs = createMockLogs(100);
    let filteredLogs: LogItem[] = allLogs;

    // Aplicar filtros
    if (search) {
      filteredLogs = filteredLogs.filter((log: LogItem) =>
        log.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (level) {
      filteredLogs = filteredLogs.filter((log: LogItem) => log.level === level);
    }

    // Paginação
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

    return HttpResponse.json({
      items: paginatedLogs,
      page,
      pageSize,
      total: filteredLogs.length,
    });
  }),

  // Rooms API
  http.get("/api/rooms", () => {
    return HttpResponse.json(createMockRooms());
  }),

  // Visitor creation
  http.post("/api/visitors", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: "new-visitor-id",
        ...body,
        checkInAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  // Visitor checkout
  http.patch("/api/visitors/:id/checkout", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      checkOutAt: new Date().toISOString(),
    });
  }),
];
