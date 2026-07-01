import { createSharedStoreContext, ExternalStore } from '@ds/context-kit';

import { ADAPTIVE_KEYS } from '../keys';
import { getGlobalAdaptiveStore } from '../store/globalStore';
import { LayoutType } from '../types/layoutTypes';

/** Значение adaptive-контекста: текущая раскладка. */
export type AdaptiveContextValue = {
  layoutType: LayoutType;
};

/** Внешний стор раскладки (формат `useSyncExternalStore`). Адаптер над любым реактивным источником — см. `createAdaptiveStore`. */
export type AdaptiveStore = ExternalStore<AdaptiveContextValue>;

// Дефолт контекста = глобальный singleton-стор: потребитель без `AdaptiveProvider` в своём дереве
// читает раскладку, выставленную шеллом в `getGlobalAdaptiveStore`. Явный `<AdaptiveProvider>` затеняет дефолт.
const { StoreProvider, useStoreValue } = createSharedStoreContext<AdaptiveContextValue>(
  ADAPTIVE_KEYS.context,
  getGlobalAdaptiveStore().store,
);

export { StoreProvider as AdaptiveStoreProvider };

/** Возвращает текущую раскладку из `AdaptiveProvider`. Реактивно к внешнему стору, если он задан. */
export function useAdaptiveLayout(): AdaptiveContextValue {
  return useStoreValue();
}
