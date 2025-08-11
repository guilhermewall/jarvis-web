// src/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { AppShellLayout } from "@/components/layout/app-shell-layout";
import Dashboard from "@/pages/dashboard";
import History from "@/pages/history";
import Logs from "@/pages/logs";
import Login from "@/pages/login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShellLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
