import { describe, it, expect, vi, beforeEach } from "vitest";
import { appToast } from "@/lib/toast";

const mockToast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
  loading: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: mockToast,
}));

describe("lib/toast", () => {
  beforeEach(() => {
    (mockToast.success as unknown as { mockReset: () => void }).mockReset?.();
    (mockToast.error as unknown as { mockReset: () => void }).mockReset?.();
    (mockToast.info as unknown as { mockReset: () => void }).mockReset?.();
    (mockToast.warning as unknown as { mockReset: () => void }).mockReset?.();
    (mockToast.loading as unknown as { mockReset: () => void }).mockReset?.();
  });

  it("success usa defaults", () => {
    appToast.success("ok");
    expect(mockToast.success).toHaveBeenCalledWith("ok", {
      description: undefined,
      duration: 4000,
      action: undefined,
    });
  });

  it("error com descrição", () => {
    appToast.error("bad", { description: "ops" });
    expect(mockToast.error).toHaveBeenCalledWith("bad", {
      description: "ops",
      duration: 5000,
      action: undefined,
    });
  });

  it("auth.loginSuccess com nome", () => {
    appToast.auth.loginSuccess("Ana");
    expect(mockToast.success).toHaveBeenCalled();
  });
});
