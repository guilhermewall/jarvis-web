import { toast } from "sonner";

// Tipos para os toasts da aplicação
export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Helper para toasts tipados e consistentes
export const appToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
      action: options?.action,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 5000,
      action: options?.action,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
      action: options?.action,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
      action: options?.action,
    });
  },

  loading: (message: string) => {
    return toast.loading(message);
  },

  // Para casos especiais da aplicação
  auth: {
    loginSuccess: (userName?: string) => {
      return appToast.success("Login realizado com sucesso!", {
        description: userName
          ? `Bem-vindo(a), ${userName}`
          : "Redirecionando...",
        duration: 3000,
      });
    },

    loginError: (message?: string) => {
      return appToast.error("Falha no login", {
        description: message || "Verifique suas credenciais e tente novamente",
        duration: 5000,
      });
    },

    logoutSuccess: () => {
      return appToast.info("Logout realizado com sucesso", {
        description: "Até logo!",
        duration: 3000,
      });
    },
  },
};
