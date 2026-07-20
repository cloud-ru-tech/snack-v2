import { CIMODE, DEFAULT_LANG } from '../constants/lang';
import { Lang } from '../types/locale';

/** Активен ли отладочный `cimode` (`t()` возвращает ключи). */
export function isCimode(lang: Lang): boolean {
  return lang === CIMODE;
}

/**
 * Сводит произвольный BCP-47 тег к набору языков, которые DS отдаёт из коробки: по префиксу `en`
 * → `en-GB`, `ru`/`be` → `ru-RU`, `cimode` сохраняется, нераспознанное → `fallback` (по умолчанию
 * `DEFAULT_LANG`). `fallback` позволяет приложению задать свой язык-по-умолчанию снаружи, не завязываясь
 * на встроенный `en-GB`.
 */
export function normalizeToBuiltinLang(lang: Lang, fallback: Lang = DEFAULT_LANG): Lang {
  if (isCimode(lang)) {
    return CIMODE;
  }

  const prefix = lang.toLowerCase().split('-')[0];

  if (prefix === 'en') {
    return 'en-GB';
  }

  if (prefix === 'ru') {
    return 'ru-RU';
  }

  return fallback;
}

/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- guarded by isBrowser(); navigator читается только в браузере */

function isBrowser(): boolean {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 * Определяет язык из окружения браузера (`navigator.language`) и нормализует к встроенному набору.
 * Нераспознанный язык и SSR (вне браузера) → `fallback` (по умолчанию `DEFAULT_LANG`). Приложение может
 * передать собственный язык-по-умолчанию, если `en-GB` не подходит.
 */
export function detectBrowserLang(fallback: Lang = DEFAULT_LANG): Lang {
  if (!isBrowser()) {
    return fallback;
  }

  return normalizeToBuiltinLang(navigator.language || fallback, fallback);
}

/* eslint-enable @cloud-ru/ssr-safe-react/domApi */
