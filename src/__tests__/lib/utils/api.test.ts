import { describe, test, expect } from "vitest";
import { cleanEmptyParams, cleanAndValidateParams } from "@/lib/utils/api";
import { z } from "zod";

describe("API Utils", () => {
  describe("cleanEmptyParams", () => {
    test("should remove empty string values", () => {
      const params = {
        name: "John",
        age: "",
        city: "São Paulo",
        state: "",
      };

      const result = cleanEmptyParams(params);

      expect(result).toEqual({
        name: "John",
        city: "São Paulo",
      });
    });

    test("should preserve non-string values", () => {
      const params = {
        name: "John",
        age: 25,
        isActive: true,
        score: 0,
        items: [],
        metadata: null,
        description: "",
      };

      const result = cleanEmptyParams(params);

      expect(result).toEqual({
        name: "John",
        age: 25,
        isActive: true,
        score: 0,
        items: [],
        // metadata: null é removido (null == null)
      });
    });

    test("should handle nested objects (first level only)", () => {
      const params = {
        user: {
          name: "John",
          email: "",
          profile: {
            bio: "Developer",
            website: "",
          },
        },
        settings: {
          theme: "",
          language: "pt-BR",
        },
        description: "",
      };

      const result = cleanEmptyParams(params);

      // A função atual só limpa o primeiro nível
      expect(result).toEqual({
        user: {
          name: "John",
          email: "", // permanece (não é primeiro nível)
          profile: {
            bio: "Developer",
            website: "", // permanece (não é primeiro nível)
          },
        },
        settings: {
          theme: "", // permanece (não é primeiro nível)
          language: "pt-BR",
        },
        // description é removido (primeiro nível)
      });
    });

    test("should handle arrays (first level only)", () => {
      const params = {
        tags: ["javascript", "", "react", ""],
        categories: [],
        items: [
          { name: "Item 1", description: "" },
          { name: "", value: 100 },
          { name: "Item 3", description: "Valid item" },
        ],
        emptyField: "",
      };

      const result = cleanEmptyParams(params);

      // A função atual só limpa o primeiro nível
      expect(result).toEqual({
        tags: ["javascript", "", "react", ""], // permanece como está
        categories: [],
        items: [
          { name: "Item 1", description: "" }, // objetos internos não são limpos
          { name: "", value: 100 },
          { name: "Item 3", description: "Valid item" },
        ],
        // emptyField é removido (primeiro nível)
      });
    });

    test("should return empty object for all empty values", () => {
      const params = {
        name: "",
        description: "",
        category: "",
      };

      const result = cleanEmptyParams(params);

      expect(result).toEqual({});
    });
  });

  describe("cleanAndValidateParams", () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().optional(),
      email: z.string().email().optional(),
    });

    test("should clean and validate params successfully", () => {
      const params = {
        name: "John",
        age: 25,
        email: "john@example.com",
        description: "", // será removido
      };

      const result = cleanAndValidateParams(params, schema);

      expect(result).toEqual({
        name: "John",
        age: 25,
        email: "john@example.com",
      });
    });

    test("should throw validation error for invalid data", () => {
      const params = {
        name: "", // inválido - string vazia
        age: 25,
        email: "invalid-email",
      };

      expect(() => {
        cleanAndValidateParams(params, schema);
      }).toThrow();
    });

    test("should work with optional fields", () => {
      const params = {
        name: "John",
        description: "", // será removido
      };

      const result = cleanAndValidateParams(params, schema);

      expect(result).toEqual({
        name: "John",
      });
    });
  });
});
