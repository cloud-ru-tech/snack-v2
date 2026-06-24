import { ThemeAppearance } from '../types/appearance';

/**
 * Сливает оформление родителя с переопределениями: незаданные (`undefined`) оси `overrides` НЕ
 * затирают унаследованные (`??` сохраняет, в т.ч. `acrylic: false`). Используется `ChildThemeProvider`
 * для Figma-цепочки модификаторов.
 */
export function mergeAppearance(parent: ThemeAppearance, overrides: Partial<ThemeAppearance>): ThemeAppearance {
  return {
    colorScheme: overrides.colorScheme ?? parent.colorScheme,
    brand: overrides.brand ?? parent.brand,
    brandRole: overrides.brandRole ?? parent.brandRole,
    density: overrides.density ?? parent.density,
    acrylic: overrides.acrylic ?? parent.acrylic,
  };
}
