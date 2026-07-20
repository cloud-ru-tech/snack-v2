import { CIMODE, DEFAULT_LANG } from '../constants/lang';
import { Lang } from '../types/locale';

/** Активен ли отладочный `cimode` (`t()` возвращает ключи). */
export function isCimode(lang: Lang): boolean {
  return lang === CIMODE;
}

/**
 * Сводит произвольный BCP-47 тег к набору языков, которые DS отдаёт из коробки: по префиксу `en`
 * → `en-GB`, `ru`/`be` → `ru-RU`, `cimode` сохраняется, остальное → `DEFAULT_LANG`.
 */
export function normalizeToBuiltinLang(lang: Lang): Lang {
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

  return DEFAULT_LANG;
}

/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- guarded by isBrowser(); navigator читается только в браузере */

function isBrowser(): boolean {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 * Определяет язык из окружения браузера (`navigator.language`) и нормализует к встроенному набору.
 * Вне браузера (SSR) → `DEFAULT_LANG`.
 */
export function detectBrowserLang(): Lang {
  if (!isBrowser()) {
    return DEFAULT_LANG;
  }

  return normalizeToBuiltinLang(navigator.language || DEFAULT_LANG);
}

/* eslint-enable @cloud-ru/ssr-safe-react/domApi */
