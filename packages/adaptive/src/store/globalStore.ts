import { DEFAULT_LAYOUT_TYPE } from '../constants/adaptive';
import { AdaptiveStore } from '../context/adaptiveContext';
import { ADAPTIVE_KEYS } from '../keys';
import { LayoutType } from '../types/layoutTypes';
import { createAdaptiveStore } from './createAdaptiveStore';

export type GlobalAdaptiveStore = {
  /** Стор для `<AdaptiveProvider store={...} />`. */
  store: AdaptiveStore;
  /** Текущая раскладка. */
  getLayoutType(): LayoutType;
  /** Установить раскладку и уведомить все подписанные `AdaptiveProvider`. */
  setLayoutType(layoutType: LayoutType): void;
};

const REGISTRY_KEY = Symbol.for(ADAPTIVE_KEYS.store);

type Registry = { [REGISTRY_KEY]?: GlobalAdaptiveStore };

/**
 * Глобальный singleton-стор раскладки, общий для всех React-корней процесса (микрофронты single-spa,
 * острова Astro). Хранится в `globalThis` через `Symbol.for`, переживает несколько копий пакета.
 * Нужен только для multi-root; при одном корне — обычный `AdaptiveProvider` или `createAdaptiveStore`.
 *
 * @example
 * getGlobalAdaptiveStore().setLayoutType(useAdaptiveBootstrap().layoutType);
 * <AdaptiveProvider store={getGlobalAdaptiveStore().store}>{root}</AdaptiveProvider>;
 */
export function getGlobalAdaptiveStore(): GlobalAdaptiveStore {
  const registry = globalThis as Registry;

  if (!registry[REGISTRY_KEY]) {
    let currentLayout: LayoutType = DEFAULT_LAYOUT_TYPE;
    const listeners = new Set<() => void>();

    registry[REGISTRY_KEY] = {
      store: createAdaptiveStore({
        getLayoutType: () => currentLayout,
        subscribe: onChange => {
          listeners.add(onChange);
          return () => {
            listeners.delete(onChange);
          };
        },
        getServerLayoutType: () => DEFAULT_LAYOUT_TYPE,
      }),
      getLayoutType: () => currentLayout,
      setLayoutType: layoutType => {
        if (layoutType === currentLayout) return;
        currentLayout = layoutType;
        listeners.forEach(listener => listener());
      },
    };
  }

  return registry[REGISTRY_KEY];
}
