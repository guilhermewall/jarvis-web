import { toast } from "sonner";

export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

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

  visitors: {
    created: (visitorName?: string) => {
      return appToast.success("Visitante cadastrado com sucesso!", {
        description: visitorName
          ? `${visitorName} foi adicionado à sala`
          : "O visitante foi adicionado à sala",
        duration: 4000,
      });
    },

    checkedOut: (visitorName?: string) => {
      return appToast.success("Saída registrada com sucesso!", {
        description: visitorName
          ? `${visitorName} foi removido da sala`
          : "O visitante foi removido da sala",
        duration: 4000,
      });
    },

    createError: (message?: string) => {
      return appToast.error("Erro ao cadastrar visitante", {
        description: message || "Tente novamente em alguns instantes",
        duration: 5000,
      });
    },

    checkoutError: (message?: string) => {
      return appToast.error("Erro ao registrar saída", {
        description: message || "Tente novamente em alguns instantes",
        duration: 5000,
      });
    },
  },
};
