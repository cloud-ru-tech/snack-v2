import { ReactNode, useMemo } from 'react';

import { createSharedStoreContext, staticStore } from './sharedStoreContext';

export type CreateSharedContextOptions<T> = {
  /** Ключ реестра — собирай через `providerKey('<domain>', <contractVersion>)`. */
  key: string;
  /** Значение по умолчанию (SSR-baseline / когда провайдера нет в дереве). */
  defaultValue: T;
};

/**
 * Обёртка над `createSharedStoreContext` для **статических** провайдеров, у которых значение
 * приходит пропом (тема, локаль, portal-root), а не из внешнего реактивного стора. Оборачивает
 * `value` в `staticStore` (с мемоизацией по ссылке value), чтобы каждый провайдер не повторял это
 * вручную. MFE/SSR-свойства те же, что у `createSharedStoreContext`.
 *
 * ```tsx
 * const { Provider, useValue } = createSharedContext({
 *   key: providerKey('theme', 1),
 *   defaultValue: DEFAULT_THEME,
 * });
 * ```
 */
export function createSharedContext<T>({ key, defaultValue }: CreateSharedContextOptions<T>) {
  const { StoreProvider, useStoreValue } = createSharedStoreContext<T>(key, staticStore(defaultValue));

  function Provider({ value, children }: { value: T; children: ReactNode }) {
    const store = useMemo(() => staticStore(value), [value]);

    return <StoreProvider store={store}>{children}</StoreProvider>;
  }

  Provider.displayName = `SharedContextProvider(${key})`;

  return { Provider, useValue: useStoreValue };
}
