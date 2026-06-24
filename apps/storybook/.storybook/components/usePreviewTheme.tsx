import { useThemeAppearance } from '@ds/theme';

import type { Theme } from './types';

/**
 * Цветовая схема текущей сцены из контекста `@ds/theme` (его задаёт `RootThemeProvider` в
 * `preview.tsx`). `?? 'light'` — страховка на случай рендера вне обёртки.
 */
export function usePreviewTheme(): Theme {
  return (useThemeAppearance().appearance.colorScheme as Theme | undefined) ?? 'light';
}
