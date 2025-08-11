import { LayoutDashboard, History, ListTree } from "lucide-react";
import type { NavigationItem } from "@/types/common";

export const navigationItems: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    key: "history",
    label: "Histórico",
    icon: <History className="size-4" />,
  },
  {
    key: "logs",
    label: "Logs",
    icon: <ListTree className="size-4" />,
  },
];

export type { NavigationItem, NavKey } from "@/types/common";
