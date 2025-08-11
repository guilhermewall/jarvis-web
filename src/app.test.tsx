import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { auth } from "@/lib/auth";

// Helper para criar um QueryClient para testes
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

// Wrapper com todos os providers necessários
function TestWrapper({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe("App", () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    auth.clear();
  });

  it("redireciona para login quando não autenticado", () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Como não está autenticado, deve mostrar a página de login
    expect(screen.getByText("J.A.R.V.I.S")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("renderiza dashboard quando autenticado", () => {
    // Simular usuário autenticado
    auth.set("fake-token");

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Deve mostrar o dashboard
    expect(screen.getByText("J.A.R.V.I.S")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });
});
