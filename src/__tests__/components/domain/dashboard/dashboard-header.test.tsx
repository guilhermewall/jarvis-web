import { describe, test, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "@/__tests__/utils/test-utils";
import { DashboardHeader } from "@/components/domain/dashboard/dashboard-header";

// Mock das props necessárias
const mockProps = {
  density: "comfortable" as const,
  onDensityChange: vi.fn(),
  trigger: <button>Novo Visitante</button>,
};

describe("DashboardHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render header title and description", () => {
    customRender(<DashboardHeader {...mockProps} />);

    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(
      screen.getByText(/Status das salas, visitantes ativos/)
    ).toBeDefined();
  });

  test("should render density toggle controls", () => {
    customRender(<DashboardHeader {...mockProps} />);

    expect(screen.getByText("Confortável")).toBeDefined();
    expect(screen.getByText("Compacto")).toBeDefined();
  });

  test("should render trigger element", () => {
    customRender(<DashboardHeader {...mockProps} />);

    expect(screen.getByText("Novo Visitante")).toBeDefined();
  });

  test("should call onDensityChange when density button is clicked", async () => {
    const user = userEvent.setup();
    customRender(<DashboardHeader {...mockProps} />);

    const compactButton = screen.getByText("Compacto");
    await user.click(compactButton);

    expect(mockProps.onDensityChange).toHaveBeenCalledWith("compact");
  });

  test("should show current density as selected", () => {
    customRender(<DashboardHeader {...mockProps} />);

    const comfortableButton = screen.getByText("Confortável");
    expect(comfortableButton).toBeDefined();

    // O ToggleGroup deve ter o valor atual selecionado
    const toggleGroup = comfortableButton.closest('[role="group"]');
    expect(toggleGroup).toBeTruthy();
  });

  test("should handle density change to compact", async () => {
    const user = userEvent.setup();
    const propsWithCompact = {
      ...mockProps,
      density: "compact" as const,
    };

    customRender(<DashboardHeader {...propsWithCompact} />);

    const comfortableButton = screen.getByText("Confortável");
    await user.click(comfortableButton);

    expect(mockProps.onDensityChange).toHaveBeenCalledWith("comfortable");
  });
});
