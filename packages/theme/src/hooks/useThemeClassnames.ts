import { useThemeAppearance } from '../context/appearanceContext';
import { ThemeAppearance } from '../types/appearance';
import { getThemeClassnames } from '../utils/getThemeClassnames';

/**
 * Возвращает полный набор `sn-*` классов = ближайшее оформление из контекста (`RootThemeProvider` +
 * цепочка `ChildThemeProvider`) ⊕ переданные `overrides`. Навешивается на DOM-границу компонента,
 * который хочет переопределить ось (например, мобильная обёртка с `density: 'comfort'`).
 *
 * Поскольку набор включает текущий `colorScheme`/`brand`/`brandRole` из контекста, такая обёртка —
 * самосогласованный scope и трекает переключение темы. Без провайдера в дереве оформление пустое,
 * и поведение совпадает со старым `getThemeClassnames({ density })`.
 */
export function useThemeClassnames(overrides?: Partial<ThemeAppearance>): string {
  const { appearance } = useThemeAppearance();

  return getThemeClassnames({ ...appearance, ...overrides });
}
