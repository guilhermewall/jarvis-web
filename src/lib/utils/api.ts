import type { ZodSchema } from "zod";

/**
 * Remove propriedades vazias (string vazia, null, undefined) de um objeto
 * @param obj - Objeto a ser limpo
 * @returns Novo objeto sem propriedades vazias
 */
export function cleanEmptyParams<T extends Record<string, unknown>>(
  obj: T
): Partial<T>;
export function cleanEmptyParams<T>(obj: T): Partial<T>;
export function cleanEmptyParams<T>(obj: T): Partial<T> {
  const cleaned = { ...obj } as T;

  Object.keys(cleaned as object).forEach((key) => {
    const value = (cleaned as Record<string, unknown>)[key];
    if (value === "" || value == null) {
      delete (cleaned as Record<string, unknown>)[key];
    }
  });

  return cleaned;
}

/**
 * Remove propriedades vazias e valida com schema Zod (opcional)
 * @param obj - Objeto a ser limpo
 * @param schema - Schema Zod para validação (opcional)
 * @returns Objeto limpo e validado
 *
 * @example
 * // Uso básico (apenas limpeza)
 * const cleaned = cleanAndValidateParams({ name: "", age: 25 });
 * // { age: 25 }
 *
 * // Uso com validação Zod
 * const userSchema = z.object({ name: z.string().optional(), age: z.number() });
 * const validated = cleanAndValidateParams({ name: "", age: 25 }, userSchema);
 * // { age: 25 } - tipado e validado
 */
export function cleanAndValidateParams<
  T extends Record<string, unknown>,
  R = Partial<T>,
>(obj: T, schema?: ZodSchema<R>): R | Partial<T> {
  const cleaned = cleanEmptyParams(obj);

  if (schema) {
    return schema.parse(cleaned);
  }

  return cleaned;
}
