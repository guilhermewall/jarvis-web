import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renderiza título de setup", () => {
    render(<App />);
    expect(screen.getByText("Setup ok 🎉")).toBeInTheDocument();
  });

  it("renderiza botões", () => {
    render(<App />);
    expect(screen.getByText("Button padrão")).toBeInTheDocument();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });
});
