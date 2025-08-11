import { describe, it, expect } from "vitest";
import { maskCpfView, onlyDigits, formatDateTime } from "@/lib/utils/format";

describe("lib/utils/format", () => {
  it("maskCpfView aplica máscara corretamente", () => {
    expect(maskCpfView("12345678901")).toBe("123.456.789-01");
    expect(maskCpfView("123.456.789-01")).toBe("123.456.789-01");
    expect(maskCpfView("123")).toBe("123");
  });

  it("onlyDigits remove não numéricos", () => {
    expect(onlyDigits("abc123!@#")).toBe("123");
    expect(onlyDigits("001-002.003")).toBe("001002003");
  });

  it("formatDateTime formata datas", () => {
    const d = new Date("2020-01-02T03:04:05Z");
    const s1 = formatDateTime(d);
    const s2 = formatDateTime("2020-01-02T03:04:05Z");
    expect(typeof s1).toBe("string");
    expect(typeof s2).toBe("string");
    expect(s1.length).toBeGreaterThan(0);
    expect(s2.length).toBeGreaterThan(0);
  });
});
