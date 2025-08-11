import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { AppShell } from "./app-shell";
import { appToast } from "@/lib/toast";
import { auth } from "@/lib/auth";
import type { NavKey } from "@/types/common";

export function AppShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveKey = (): NavKey => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "dashboard";
    if (path === "/history") return "history";
    if (path === "/logs") return "logs";
    return "dashboard"; // fallback
  };

  const handleChange = (key: NavKey) => {
    const routes = {
      dashboard: "/",
      history: "/history",
      logs: "/logs",
    };
    navigate(routes[key]);
  };

  const handleLogout = () => {
    // Limpar token do localStorage
    auth.clear();

    // Mostrar toast de sucesso
    appToast.auth.logoutSuccess();

    // Redirecionar para login sem permitir voltar (replace: true)
    navigate("/login", { replace: true });
  };

  return (
    <AppShell
      active={getActiveKey()}
      onChange={handleChange}
      onLogout={handleLogout}
    >
      <Outlet />
    </AppShell>
  );
}
