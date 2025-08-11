/**
 * Aplica máscara de CPF para visualização
 * @param cpf CPF em formato de string (apenas dígitos ou já formatado)
 * @returns CPF formatado (000.000.000-00)
 */
export function maskCpfView(cpf: string): string {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

/**
 * Remove todos os caracteres não numéricos de uma string
 * @param value String com caracteres diversos
 * @returns String apenas com dígitos
 */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Formata data para exibição local
 * @param date Data em formato ISO ou Date
 * @returns Data formatada em português brasileiro
 */
export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("pt-BR");
}
