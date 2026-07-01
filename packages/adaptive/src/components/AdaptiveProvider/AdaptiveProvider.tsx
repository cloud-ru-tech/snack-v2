import { staticStore } from '@ds/context-kit';
import { ReactNode, useMemo } from 'react';

import { DEFAULT_LAYOUT_TYPE } from '../../constants/adaptive';
import { AdaptiveContextValue, AdaptiveStore, AdaptiveStoreProvider } from '../../context/adaptiveContext';
import { LayoutType } from '../../types/layoutTypes';

export type AdaptiveProviderProps = {
  /** Статичная раскладка (SSR — значение на запрос, либо `useAdaptiveBootstrap()` в корне CSR). Реактивный источник — через `store`. */
  layoutType?: LayoutType;
  /** Внешний реактивный стор раскладки; приоритетнее `layoutType`, обновляет подписчиков без перерендера провайдера. */
  store?: AdaptiveStore;
  children: ReactNode;
};

/**
 * Провайдер текущей раскладки для `Adaptive*`-компонентов. Ставится один раз в корне; вложенные
 * `Adaptive*` берут `layoutType` из контекста. Принимает статичный `layoutType` либо реактивный `store`.
 */
export function AdaptiveProvider({ layoutType, store, children }: AdaptiveProviderProps) {
  // Стабильный snapshot: новый объект только при смене layoutType, иначе useSyncExternalStore зациклится.
  const staticAdaptiveStore = useMemo(
    () => staticStore<AdaptiveContextValue>({ layoutType: layoutType ?? DEFAULT_LAYOUT_TYPE }),
    [layoutType],
  );

  return <AdaptiveStoreProvider store={store ?? staticAdaptiveStore}>{children}</AdaptiveStoreProvider>;
}
