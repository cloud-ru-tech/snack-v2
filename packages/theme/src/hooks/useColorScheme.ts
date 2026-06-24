'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { COLOR_SCHEME, THEME_OVERRIDE, THEME_OVERRIDE_STORAGE_KEY } from '../constants/colorScheme';
import { ColorScheme, ThemeOverride } from '../types/colorScheme';
import { resolveColorScheme } from '../utils/resolveColorScheme';

/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- guarded by isBrowser(); хук помечен 'use client' */

function isBrowser(): boolean {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

function getSystemPrefersDark(): boolean {
  return isBrowser() && window.matchMedia(SYSTEM_DARK_QUERY).matches;
}

function applyColorScheme(target: HTMLElement, colorScheme: ColorScheme): void {
  target.classList.toggle('sn-dark', colorScheme === COLOR_SCHEME.Dark);
  target.classList.toggle('sn-light', colorScheme === COLOR_SCHEME.Light);
}

function isOverride(value: string | undefined): value is ThemeOverride {
  return value === THEME_OVERRIDE.Light || value === THEME_OVERRIDE.Dark || value === THEME_OVERRIDE.System;
}

/**
 * Точка расширения персиста цветовой схемы. Дефолт — cookie (`createCookieColorSchemeStorage`),
 * чего достаточно для SSR-резолва без бэкенда. Сервис подменяет адаптер, чтобы хранить тему на
 * бэкенде: `read()` возвращает `undefined` (начальное даёт `initialOverride` из server-сессии),
 * `write()` шлёт POST, `subscribe()` — push (SSE/ws). Модель `useColorScheme` при этом не меняется.
 */
export type ColorSchemeStorage = {
  /** Синхронно прочитать сохранённый override. Для бэкенд-адаптера — `undefined` (см. `initialOverride`). */
  read(): ThemeOverride | undefined;
  /** Персистнуть выбор (cookie / POST на бэкенд). */
  write(next: ThemeOverride): void;
  /** Подписка на внешние изменения (кросс-таб / push). Возвращает отписку. */
  subscribe(onChange: () => void): () => void;
};

function readCookieOverride(storageKey: string): ThemeOverride | undefined {
  if (!isBrowser()) {
    return undefined;
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${storageKey}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : undefined;

  return isOverride(value) ? value : undefined;
}

/**
 * Дефолтный storage-адаптер: cookie как источник истины (читается и на сервере, и inline-bootstrap'ом)
 * + `BroadcastChannel` для живой кросс-таб синхронизации. Создание SSR-безопасно: DOM/Channel
 * трогаются только при вызове методов, не в фабрике.
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

export type UseColorSchemeOptions = {
  /**
   * Server-resolved начальный override (например, `getThemeOverrideFromHeaders(headers)` из cookie
   * или из бэкенд-сессии). Делает первый рендер детерминированным и совпадающим с SSR — без
   * hydration mismatch и без прыжка подсветки переключателя. Если не задан — старт с `system`.
   */
  initialOverride?: ThemeOverride;
  /** Адаптер персиста. По умолчанию cookie + BroadcastChannel (`createCookieColorSchemeStorage`). */
  storage?: ColorSchemeStorage;
  /** Ключ персиста (имя cookie). По умолчанию `'ds-theme'`. Игнорируется, если задан `storage`. */
  storageKey?: string;
  /** Корень, на который вешается `sn-light`/`sn-dark`. По умолчанию `<html>`. */
  target?: HTMLElement;
};

export type UseColorSchemeResult = {
  /** Итоговая применённая схема (override ?? система). */
  colorScheme: ColorScheme;
  /** Текущий выбор пользователя: `light` / `dark` / `system`. */
  override: ThemeOverride;
  /** Системная тема (`prefers-color-scheme: dark`). */
  systemPrefersDark: boolean;
  /** Сменить выбор: персистит через `storage.write` (cookie / бэкенд). */
  setOverride(next: ThemeOverride): void;
};

/**
 * Управляет цветовой схемой DS: резолвит `override ?? prefers-color-scheme`, вешает `sn-light`/`sn-dark`
 * на корень, реагирует на живое переключение темы ОС (`matchMedia`) и внешние изменения override
 * (`storage.subscribe` — кросс-таб / бэкенд push). No-flash на reload обеспечивает inline
 * `getThemeBootstrapScript` в `<head>` (а на SSR — корректный класс из `getColorSchemeFromHeaders`);
 * хук синхронизирует состояние и переключатель override.
 * @function React hook
 */
export function useColorScheme(options?: UseColorSchemeOptions): UseColorSchemeResult {
  const { initialOverride, storageKey, target } = options ?? {};
  const providedStorage = options?.storage;

  const storage = useMemo(
    () => providedStorage ?? createCookieColorSchemeStorage({ storageKey }),
    [providedStorage, storageKey],
  );

  // override инициализируется СИНХРОННО из источника правды, чтобы SegmentControl не «прыгал» с
  // System на реальный выбор после mount: `initialOverride` (server-resolved — бэкенд-сессия / SSR
  // cookie, authoritative) → синхронное чтение store (`storage.read` — cookie) → `system`.
  // SSR-консистентность: на сервере `storage.read()` обязан вернуть undefined (cookie-адаптер так и
  // делает), поэтому и сервер, и первый клиентский рендер берут одно значение — мисматча нет. В чистом
  // клиенте (single-spa) `initialOverride` нет → cookie читается сразу при первом рендере, без прыжка.
  const [override, setOverrideState] = useState<ThemeOverride>(
    () => initialOverride ?? storage.read() ?? THEME_OVERRIDE.System,
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // matchMedia нельзя читать в initializer (на SSR-хосте рассинхронит colorScheme-readout) — системную
  // тему добираем после mount. override уже корректен из initializer, его здесь перечитывать не нужно.
  useEffect(() => {
    setSystemPrefersDark(getSystemPrefersDark());
    setMounted(true);
  }, []);

  const colorScheme = resolveColorScheme(override, systemPrefersDark);

  // Применяем класс к корню ТОЛЬКО после mount: до этого корректный класс уже стоит из SSR/bootstrap,
  // и детерминированный первый рендер не должен его перетереть (иначе моргание).
  useEffect(() => {
    if (!mounted || !isBrowser()) {
      return;
    }
    applyColorScheme(target ?? document.documentElement, colorScheme);
  }, [mounted, colorScheme, target]);

  // Живое переключение темы ОС.
  useEffect(() => {
    if (!isBrowser()) {
      return undefined;
    }
    const mql = window.matchMedia(SYSTEM_DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) => setSystemPrefersDark(event.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Внешняя синхронизация override (кросс-таб через BroadcastChannel / бэкенд push).
  useEffect(() => storage.subscribe(() => setOverrideState(storage.read() ?? THEME_OVERRIDE.System)), [storage]);

  const setOverride = useCallback(
    (next: ThemeOverride) => {
      setOverrideState(next);
      storage.write(next);
    },
    [storage],
  );

  return { colorScheme, override, systemPrefersDark, setOverride };
}

/* eslint-enable @cloud-ru/ssr-safe-react/domApi */
