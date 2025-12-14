/**
 * Форматирует число для отображения в счетчике
 * @param value - числовое значение
 * @param maxValue - максимальное значение для отображения (по умолчанию 999)
 * @returns отформатированная строка (число, число с "+" или число с "K")
 */
export const formatCounterValue = (value: number, maxValue: number = 999): string => {
  if (value <= 0) {
    return '0';
  }

  if (value > maxValue) {
    const thousands = Math.floor(value / 1000);
    return `${thousands}K`;
  }

  if (value > 99) {
    return '99+';
  }

  return value.toString();
};
