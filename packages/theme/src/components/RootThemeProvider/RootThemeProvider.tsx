import { staticStore } from '@ds/context-kit';
import { ReactNode, RefObject, useMemo } from 'react';

import {
  ThemeAppearanceContextValue,
  ThemeAppearanceStore,
  ThemeAppearanceStoreProvider,
} from '../../context/appearanceContext';
import { ThemeAppearance } from '../../types/appearance';
import { ThemeScope } from '../ThemeScope';

export type RootThemeProviderProps = {
  /**
   * Оформление приложения. Используется в static-режиме (один React-корень: SSR — одно значение на
   * запрос, либо CSR с собственным state, напр. `colorScheme` из `useColorScheme`). Для multi-root
   * (single-spa) — см. `store`.
   */
  value?: ThemeAppearance;
  /**
   * Внешний реактивный стор оформления (`getGlobalThemeStore().store`). Если задан — приоритетнее
   * `value`; подписанные провайдеры обновляются при смене темы без перерендера провайдера. Так один
   * глобальный стор охватывает все микрофронты. Сеттер для shell — `getGlobalThemeStore().setAppearance`.
   */
  store?: ThemeAppearanceStore;
  /**
   * Внешний элемент для полного набора `sn-*` (обычно `<html>`/`<body>`). Если не задан — провайдер
   * оборачивает children в `<div>` с этим набором.
   */
  rootRef?: RefObject<HTMLElement | null>;
  /** Дополнительный класс на wrapper-`<div>` (паддинги/фон). Только в wrapper-режиме (без `rootRef`). */
  className?: string;
  children: ReactNode;
};

/**
 * Корневой провайдер оформления. Ставится один раз в корне приложения: задаёт контекст осей
 * (`colorScheme`/`brand`/`brandRole`/`density`/`acrylic`) и эмитит полный набор `sn-*` на корень
 * (`rootRef`) либо на собственный wrapper. Объект контекста — глобальный синглтон (`Symbol.for`),
 * поэтому провайдер работает даже при нескольких версиях пакета в разных микрофронтах, а потребитель
 * читает ближайший провайдер. Локальные переопределения осей в поддереве — через `ChildThemeProvider`.
 *
 * Этот провайдер НЕ управляет состоянием цветовой схемы (cookie/system/cross-tab) — это `useColorScheme`;
 * результат передаётся в `value.colorScheme`. Не путать со старым `ThemeProvider` (themeMap/changeTheme).
 */
export function RootThemeProvider({ value, store, rootRef, className, children }: RootThemeProviderProps) {
  const { colorScheme, brand, brandRole, density, acrylic } = value ?? {};

  // Мемо по значениям осей (не по идентичности объекта `value`): иначе литерал `value={{…}}` у
  // потребителя пересоздавал бы стор на каждом рендере. Сеттер в static-режиме не нужен — значением
  // владеет сам потребитель через проп `value`.
  const staticThemeStore = useMemo(
    () =>
      staticStore<ThemeAppearanceContextValue>({
        appearance: { colorScheme, brand, brandRole, density, acrylic },
        setAppearance: undefined,
      }),
    [colorScheme, brand, brandRole, density, acrylic],
  );

  return (
    <ThemeAppearanceStoreProvider store={store ?? staticThemeStore}>
      <ThemeScope rootRef={rootRef} className={className}>
        {children}
      </ThemeScope>
    </ThemeAppearanceStoreProvider>
  );
}

RootThemeProvider.displayName = 'RootThemeProvider';
