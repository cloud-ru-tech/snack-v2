import { createSharedStoreContext, ExternalStore } from '@ds/context-kit';

import { THEME_KEYS } from '../keys';
import { getGlobalThemeStore } from '../store/globalStore';
import { ThemeAppearance } from '../types/appearance';

/**
 * Значение контекста оформления: слитые оси (`appearance`) + опциональный сеттер. Сеттер задаёт
 * только корневой провайдер (`RootThemeProvider`) — у `ChildThemeProvider` он `undefined` (детям
 * менять глобальное значение нельзя, они только локально переопределяют оси).
 */
export type ThemeAppearanceContextValue = {
  appearance: ThemeAppearance;
  setAppearance?: (patch: Partial<ThemeAppearance>) => void;
};

/** Внешний стор оформления (формат `useSyncExternalStore`). Mutable-global — см. `getGlobalThemeStore`. */
export type ThemeAppearanceStore = ExternalStore<ThemeAppearanceContextValue>;

// Отдельный домен `theme-appearance` — НЕ пересекается с `providerKey('theme', 1)` старого
// `ThemeContext` (themeMap/changeTheme). Объект контекста — `Symbol.for`-синглтон, общий для всех
// версий пакета, поэтому потребитель в микрофронте читает ближайший провайдер независимо от версии.
//
// Дефолт контекста = глобальный singleton-стор оформления. Поэтому компонент, вызывающий
// `useThemeClassnames` (мобильная обёртка, `ChildThemeProvider`, портал вне `<body>`) БЕЗ
// `RootThemeProvider` в своём корне, реэмитит полный набор `sn-*` не с пустым оформлением
// (теряя `colorScheme`/`density`), а с тем, что shell выставил в `getGlobalThemeStore` из источника
// истины. Так микрофронту не нужен провайдер. Явный `RootThemeProvider` затеняет дефолт (back-compat).
const { StoreProvider, useStoreValue } = createSharedStoreContext<ThemeAppearanceContextValue>(
  THEME_KEYS.context,
  getGlobalThemeStore().store,
);

export { StoreProvider as ThemeAppearanceStoreProvider };

/** Возвращает ближайшее (уже слитое по цепочке провайдеров) значение оформления. Реактивно к стору. */
export function useThemeAppearance(): ThemeAppearanceContextValue {
  return useStoreValue();
}
