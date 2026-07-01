import { AdaptiveContextValue, AdaptiveStore } from '../context/adaptiveContext';
import { LayoutType } from '../types/layoutTypes';

export type CreateAdaptiveStoreOptions = {
  /** Текущая раскладка из внешнего источника. */
  getLayoutType(): LayoutType;
  /** Подписка на изменения внешнего источника; возвращает функцию отписки. */
  subscribe(onChange: () => void): () => void;
  /** Раскладка для SSR (request-scoped). Нужен только при server-render; в чистом CSR — нет. */
  getServerLayoutType?(): LayoutType;
};

/**
 * Адаптер внешнего реактивного источника раскладки (redux / zustand / signals / observable) в
 * `AdaptiveStore` (формат `useSyncExternalStore`) для `<AdaptiveProvider store={...} />`.
 * Кэширует snapshot по `layoutType` ради стабильной ссылки.
 *
 * @example
 * const adaptiveStore = createAdaptiveStore({
 *   getLayoutType: () => layoutSource.current,
 *   subscribe: (onChange) => layoutSource.on('change', onChange),
 * });
 */
export function createAdaptiveStore(options: CreateAdaptiveStoreOptions): AdaptiveStore {
  let cache: AdaptiveContextValue | undefined;

  const read = (layoutType: LayoutType): AdaptiveContextValue => {
    if (!cache || cache.layoutType !== layoutType) {
      cache = { layoutType };
    }

    return cache;
  };

  const { getServerLayoutType } = options;

  return {
    subscribe: options.subscribe,
    getSnapshot: () => read(options.getLayoutType()),
    getServerSnapshot: getServerLayoutType ? () => read(getServerLayoutType()) : undefined,
  };
}
