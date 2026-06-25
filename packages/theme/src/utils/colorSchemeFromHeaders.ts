import { COLOR_SCHEME, THEME_OVERRIDE, THEME_OVERRIDE_STORAGE_KEY } from '../constants/colorScheme';
import { ColorScheme, ThemeOverride } from '../types/colorScheme';
import { resolveColorScheme } from './resolveColorScheme';

function isOverride(value: string | undefined): value is ThemeOverride {
  return value === THEME_OVERRIDE.Light || value === THEME_OVERRIDE.Dark || value === THEME_OVERRIDE.System;
}

function parseOverrideFromCookie(
  cookieHeader: string | null | undefined,
  storageKey: string,
): ThemeOverride | undefined {
  if (!cookieHeader) {
    return undefined;
  }

  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === storageKey) {
      const value = decodeURIComponent(rest.join('='));
      if (isOverride(value)) {
        return value;
      }
    }
  }

  return undefined;
}

type HeadersLike = { get(name: string): string | null };

/**
 * SSR-резолв override из cookie заголовка запроса (стенд-ин бэкенд-сессии: в сервисе тут читается
 * сохранённая тема пользователя). Прокидывается в `useColorScheme({ initialOverride })` —
 * детерминированный первый рендер без hydration mismatch и без прыжка подсветки переключателя.
 */
export function getThemeOverrideFromHeaders(
  headers: HeadersLike,
  options?: { storageKey?: string },
): ThemeOverride | undefined {
  const storageKey = options?.storageKey ?? THEME_OVERRIDE_STORAGE_KEY;

  return parseOverrideFromCookie(headers.get('cookie'), storageKey);
}

/**
 * SSR-резолв итоговой схемы из заголовков (зеркало `getAdaptive(userAgent)` для adaptive):
 * cookie `snack-uikit-theme` даёт override, `Sec-CH-Prefers-Color-Scheme` (client hint) — системную тему.
 * Включите client hint ответными заголовками `Accept-CH`/`Critical-CH`, иначе на первом визите
 * хинта нет (системная вернётся `light`), а корректную тему доставит inline-bootstrap до отрисовки.
 */
export function getColorSchemeFromHeaders(headers: HeadersLike, options?: { storageKey?: string }): ColorScheme {
  const override = getThemeOverrideFromHeaders(headers, options);
  const systemPrefersDark = headers.get('sec-ch-prefers-color-scheme') === COLOR_SCHEME.Dark;

  return resolveColorScheme(override, systemPrefersDark);
}
