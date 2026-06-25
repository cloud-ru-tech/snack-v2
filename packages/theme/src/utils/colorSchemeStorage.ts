import { THEME_OVERRIDE, THEME_OVERRIDE_STORAGE_KEY } from '../constants/colorScheme';
import { ThemeOverride } from '../types/colorScheme';

/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- guarded by isBrowser(); адаптеры трогают DOM только при вызове методов */

function isBrowser(): boolean {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

function isOverride(value: string | undefined): value is ThemeOverride {
  return value === THEME_OVERRIDE.Light || value === THEME_OVERRIDE.Dark || value === THEME_OVERRIDE.System;
}

function readCookieOverride(storageKey: string): ThemeOverride | undefined {
  if (!isBrowser()) {
    return undefined;
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${storageKey}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : undefined;

  return isOverride(value) ? value : undefined;
}

/**
 * Точка расширения персиста цветовой схемы. DS не «зашивает» хранилище: дефолт — in-memory
 * (`createInMemoryColorSchemeStorage`, без персиста между перезагрузками). Персист подключает
 * потребитель явным адаптером: `createCookieColorSchemeStorage` (no-flash SSR) или собственный
 * (localStorage / бэкенд-сессия — `read()` возвращает `undefined`, начальное даёт `initialOverride`
 * из server-сессии, `write()` шлёт POST, `subscribe()` — push через SSE/ws). Контракт намеренно про
 * одну ось `override`; brand/density персистит сам апп. Модель `useColorScheme` при любом адаптере
 * не меняется.
 */
export type ColorSchemeStorage = {
  /** Синхронно прочитать сохранённый override. Для бэкенд-адаптера — `undefined` (см. `initialOverride`). */
  read(): ThemeOverride | undefined;
  /** Персистнуть выбор (cookie / POST на бэкенд). */
  write(next: ThemeOverride): void;
  /** Подписка на внешние изменения (кросс-таб / push). Возвращает отписку. */
  subscribe(onChange: () => void): () => void;
};

/**
 * Дефолтный storage-адаптер: держит выбор в памяти модуля на время жизни страницы. Переживает
 * ремаунты и синхронит несколько хуков между собой, но НЕ персистит между перезагрузками — DS
 * намеренно не пишет в cookie/localStorage без явного согласия потребителя. Для персиста подключите
 * `createCookieColorSchemeStorage` (или свой адаптер) через проп `storage`.
 */
export function createInMemoryColorSchemeStorage(): ColorSchemeStorage {
  let value: ThemeOverride | undefined;
  const listeners = new Set<() => void>();

  return {
    read: () => value,
    write: next => {
      value = next;
      listeners.forEach(listener => listener());
    },
    subscribe: onChange => {
      listeners.add(onChange);

      return () => {
        listeners.delete(onChange);
      };
    },
  };
}

/**
 * Cookie storage-адаптер (opt-in): cookie как источник истины (читается и на сервере, и inline-
 * bootstrap'ом) + `BroadcastChannel` для живой кросс-таб синхронизации. Нужен для no-flash SSR —
 * подключается потребителем через `useColorScheme({ storage: createCookieColorSchemeStorage() })`.
 * Создание SSR-безопасно: DOM/Channel трогаются только при вызове методов, не в фабрике.
 */
export function createCookieColorSchemeStorage(options?: {
  storageKey?: string;
  channelName?: string;
}): ColorSchemeStorage {
  const storageKey = options?.storageKey ?? THEME_OVERRIDE_STORAGE_KEY;
  const channelName = options?.channelName ?? `${storageKey}-channel`;
  let channel: BroadcastChannel | null = null;

  const getChannel = (): BroadcastChannel | null => {
    if (channel) {
      return channel;
    }
    if (!isBrowser() || typeof BroadcastChannel === 'undefined') {
      return null;
    }
    channel = new BroadcastChannel(channelName);

    return channel;
  };

  return {
    read: () => readCookieOverride(storageKey),
    write: next => {
      if (!isBrowser()) {
        return;
      }
      // max-age ~1 год, lax — cookie уходит на сервер для SSR-резолва следующей загрузки.
      document.cookie = `${storageKey}=${encodeURIComponent(next)};path=/;max-age=31536000;samesite=lax`;
      getChannel()?.postMessage(next);
    },
    subscribe: onChange => {
      const ch = getChannel();
      if (!ch) {
        return () => {};
      }
      const handler = () => onChange();
      ch.addEventListener('message', handler);

      return () => ch.removeEventListener('message', handler);
    },
  };
}

/* eslint-enable @cloud-ru/ssr-safe-react/domApi */
