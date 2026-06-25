'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { COLOR_SCHEME, THEME_OVERRIDE } from '../constants/colorScheme';
import { ColorScheme, ThemeOverride } from '../types/colorScheme';
import { ColorSchemeStorage, createInMemoryColorSchemeStorage } from '../utils/colorSchemeStorage';
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

// Общий синглтон in-memory-адаптера: несколько `useColorScheme` без своего `storage` смотрят в один
// источник, поэтому переключатели в разных поддеревьях синхронны в пределах сессии.
const defaultColorSchemeStorage = createInMemoryColorSchemeStorage();

export type UseColorSchemeOptions = {
  /**
   * Server-resolved начальный override (например, `getThemeOverrideFromHeaders(headers)` из cookie
   * или из бэкенд-сессии). Делает первый рендер детерминированным и совпадающим с SSR — без
   * hydration mismatch и без прыжка подсветки переключателя. Если не задан — старт с `system`.
   */
  initialOverride?: ThemeOverride;
  /**
   * Адаптер персиста. По умолчанию — in-memory (без персиста между перезагрузками): DS не пишет в
   * cookie/localStorage сам. Подключите явно: `createCookieColorSchemeStorage()` (no-flash SSR) или
   * собственный адаптер (localStorage / бэкенд-сессия).
   */
  storage?: ColorSchemeStorage;
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
  const { initialOverride, target } = options ?? {};
  const providedStorage = options?.storage;

  // Дефолт — общий in-memory-адаптер: DS не пишет в cookie/localStorage без явного `storage`.
  const storage = useMemo(() => providedStorage ?? defaultColorSchemeStorage, [providedStorage]);

  // override инициализируется СИНХРОННО из источника правды, чтобы SegmentControl не «прыгал» с
  // System на реальный выбор после mount: `initialOverride` (server-resolved — бэкенд-сессия / SSR
  // cookie, authoritative) → синхронное чтение store (`storage.read`) → `system`.
  // SSR-консистентность: на сервере `storage.read()` обязан вернуть undefined (in-memory- и cookie-
  // адаптеры так и делают), поэтому и сервер, и первый клиентский рендер берут одно значение — мисматча
  // нет. В чистом клиенте с персист-адаптером (cookie/localStorage) `read()` отдаёт сохранённый выбор
  // сразу при первом рендере, без прыжка; дефолтный in-memory стартует с `system`.
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
