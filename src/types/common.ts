export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export type Theme = "light" | "dark" | "system";

export type NavKey = "dashboard" | "history" | "logs";

export interface NavigationItem {
  key: NavKey;
  label: string;
  icon: React.ReactNode;
  href?: string;
}
