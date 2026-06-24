import { staticStore } from '@ds/context-kit';
import { ReactNode, RefObject, useMemo } from 'react';

import {
  ThemeAppearanceContextValue,
  ThemeAppearanceStoreProvider,
  useThemeAppearance,
} from '../../context/appearanceContext';
import { ThemeAppearance } from '../../types/appearance';
import { mergeAppearance } from '../../utils/mergeAppearance';
import { ThemeScope } from '../ThemeScope';

export type ChildThemeProviderProps = {
  /** Оси, переопределяемые в поддереве. Остальные наследуются от ближайшего родителя (слияние). */
  value: Partial<ThemeAppearance>;
  /**
   * Внешний элемент для полного слитого набора `sn-*`. Если не задан — провайдер оборачивает
   * children в `<div>` с этим набором.
   */
  rootRef?: RefObject<HTMLElement | null>;
  /** Дополнительный класс на wrapper-`<div>` (паддинги/фон). Только в wrapper-режиме (без `rootRef`). */
  className?: string;
  children: ReactNode;
};

/**
 * Вложенный провайдер оформления (Figma-цепочка модификаторов): читает ближайшее оформление, сливает
 * свои `value`-переопределения и реэмитит полный слитый набор `sn-*` на границе. Потребители ниже
 * читают уже слитое значение. Read-only — глобальное значение менять нельзя (это умеет только
 * `RootThemeProvider`/`getGlobalThemeStore`).
 */
export function ChildThemeProvider({ value, rootRef, className, children }: ChildThemeProviderProps) {
  const { appearance: parent } = useThemeAppearance();
  const { colorScheme, brand, brandRole, density, acrylic } = value;

  const childStore = useMemo(
    () =>
      staticStore<ThemeAppearanceContextValue>({
        appearance: mergeAppearance(parent, { colorScheme, brand, brandRole, density, acrylic }),
        setAppearance: undefined,
      }),
    [parent, colorScheme, brand, brandRole, density, acrylic],
  );

  return (
    <ThemeAppearanceStoreProvider store={childStore}>
      <ThemeScope rootRef={rootRef} className={className}>
        {children}
      </ThemeScope>
    </ThemeAppearanceStoreProvider>
  );
}

ChildThemeProvider.displayName = 'ChildThemeProvider';
