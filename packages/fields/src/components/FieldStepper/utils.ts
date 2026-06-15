/** Начальное значение для uncontrolled-режима: выводится из `min`/`max`, иначе `0`. */
export function getDefaultValue(min?: number, max?: number): number {
  if (typeof min === 'number' && min > 0) {
    return min;
  }

  if (typeof max === 'number' && max < 0) {
    return max;
  }

  return 0;
}

/** Зажимает значение в диапазон `[min, max]` (границы опциональны). */
export function clamp(value: number, min?: number, max?: number): number {
  let next = value;
  if (typeof min === 'number') {
    next = Math.max(next, min);
  }
  if (typeof max === 'number') {
    next = Math.min(next, max);
  }
  return next;
}

/** Приращение значения на `step` с компенсацией погрешности float (округление до 10 знаков). */
export function applyStep(value: number, step: number): number {
  const sum = value + step;
  return Number(sum.toFixed(10));
}

/**
 * Дефолтный текст тултипа клампа для нижней границы.
 */
export function defaultClampMinText(value: number): string {
  return `Значение должно быть больше либо равно ${value}`;
}

/**
 * Дефолтный текст тултипа клампа для верхней границы.
 */
export function defaultClampMaxText(value: number): string {
  return `Значение должно быть меньше либо равно ${value}`;
}
