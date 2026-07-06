/**
 * Возвращает количество символов для маски — со скобками и без.
 */
export function getSymbolsRangeFromMask(mask: string = '') {
  // Считаем все 'X' и цифры в строке.
  const maxNumberLength = (mask.match(/[X\d]/g) || []).length;

  // Удаляем содержимое внутри скобок (включая сами скобки) для подсчёта без их содержимого.
  const stringWithoutBrackets = mask.replace(/\[[^\]]*\]/g, '');

  // Считаем 'X' и цифры после удаления содержимого в скобках.
  const minNumberLength = (stringWithoutBrackets.match(/[X\d]/g) || []).length;

  return { minNumberLength, maxNumberLength };
}
