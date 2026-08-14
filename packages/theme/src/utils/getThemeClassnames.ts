import { ThemeAppearance } from '../types/appearance';

/**
 * Чистая функция: собирает **полный** набор `sn-*` классов из осей оформления списком токенов.
 * Полный набор обязателен на каждой DOM-границе — токены `@cloud-ru/figma-variables` не
 * переопределяются по одной оси через CSS-каскад (см. providers-standard.md). Базовые слои
 * (`sn-base-styles`, `sn-figmaStyles`, `sn-components`) и материал (`sn-yes`/`sn-no`)
 * — всегда; `density`/`colorScheme`/`brand`/`brandRole` — если заданы.
 *
 * Списочная форма — источник истины для `getThemeClassnames` (строка через `join`) и для
 * `element.classList.add(...)`, которому нужны отдельные токены без промежуточного `split`.
 */
export function getThemeClassnameList(appearance: ThemeAppearance = {}): string[] {
  const { density, colorScheme, brand, brandRole, acrylic } = appearance;

  const classes = ['sn-base-styles', 'sn-figmaStyles', 'sn-components', acrylic ? 'sn-yes' : 'sn-no'];

  if (density) {
    classes.push(`sn-${density}`);
  }
  if (colorScheme) {
    classes.push(`sn-${colorScheme}`);
  }
  if (brand) {
    classes.push(`sn-${brand}`);
  }
  if (brandRole) {
    classes.push(`sn-${brandRole}`);
  }

  return classes;
}

/**
 * Строковая форма набора `sn-*` (через `join`). Используется на SSR (строка класса на `<html>`) и
 * как основа хука `useThemeClassnames`. Для `classList`-операций бери `getThemeClassnameList`.
 */
export function getThemeClassnames(appearance: ThemeAppearance = {}): string {
  return getThemeClassnameList(appearance).join(' ');
}
