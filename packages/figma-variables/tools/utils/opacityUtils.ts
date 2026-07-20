import { isOpacityVariable } from '../types.js';

/**
 * Нормализует значение opacity из шкалы Figma (0–100%) в шкалу CSS/SCSS (0–1).
 * Если variableName не относится к opacity или value не число — возвращает value без изменений.
 */
export function normalizeOpacityForCss(value: string | number, kebabVariableName: string): string | number {
  if (!isOpacityVariable(kebabVariableName)) {
    return value;
  }
  if (typeof value === 'number') {
    return value / 100;
  }
  if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) {
    return Number(value) / 100;
  }
  return value;
}
