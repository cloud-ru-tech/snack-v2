import { COLOR_SCHEME, THEME_OVERRIDE } from '../constants/colorScheme';
import { ColorScheme, ThemeOverride } from '../types/colorScheme';

/**
 * Резолв итоговой схемы: явный override (`light`/`dark`) побеждает; `system`/отсутствие — по
 * системному `prefers-color-scheme` (`systemPrefersDark`). Поэтому «всегда светлая» остаётся
 * светлой даже на тёмном устройстве.
 */
export function resolveColorScheme(override: ThemeOverride | undefined, systemPrefersDark: boolean): ColorScheme {
  if (override === THEME_OVERRIDE.Light || override === THEME_OVERRIDE.Dark) {
    return override;
  }

  return systemPrefersDark ? COLOR_SCHEME.Dark : COLOR_SCHEME.Light;
}
