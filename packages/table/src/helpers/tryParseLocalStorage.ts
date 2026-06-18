import { isBrowser } from '@ds/utils';

/** Безопасно читает значение из localStorage и парсит JSON. При ошибке возвращает `null`. */
export function tryParseLocalStorage(key: string): unknown {
  if (isBrowser()) {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  }

  return null;
}
