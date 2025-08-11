// Tipos gerais da aplicação (não relacionados à API)

// Props de componentes comuns
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Estados de carregamento/erro
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Tema
export type Theme = "light" | "dark" | "system";

// Navegação
export type NavKey = "dashboard" | "history" | "logs";

export interface NavigationItem {
  key: NavKey;
  label: string;
  icon: React.ReactNode;
  href?: string; // Opcional para sistemas que usam onChange
}
