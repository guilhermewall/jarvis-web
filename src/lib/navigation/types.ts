export type NavKey = "dashboard" | "history" | "logs";

export interface NavigationItem {
  key: NavKey;
  label: string;
  icon: React.ReactNode;
}
