import { Context, createContext, ReactNode, useContext, useSyncExternalStore } from 'react';

/**
 * Внешний стор в формате `useSyncExternalStore`. Источником может быть что угодно:
 * observable, redux/zustand, статичное значение. React подписывается на него и
 * перерисовывает только консьюмеров при изменении.
 */
export type ExternalStore<T> = {
  /** Подписка на изменения; возвращает функцию отписки. */
  subscribe(onStoreChange: () => void): () => void;
  /** Текущее значение. Обязан возвращать стабильную (по `Object.is`) ссылку, пока значение не менялось. */
  getSnapshot(): T;
  /** Значение для SSR/гидрации. Если не задан — используется `getSnapshot`. */
  getServerSnapshot?(): T;
};

/**
 * Фабрика общего реактивного контекста. Создаёт React-контекст-синглтон (через реестр
 * `Symbol.for`, чтобы он был общим для всех версий пакета — см. ниже), хранящий внешний стор,
 * а не само значение. Консьюмеры читают значение через `useSyncExternalStore`, поэтому:
 * - в браузере обновление внешнего стора реактивно передаётся всем компонентам
 *   во всех микрофронтах, подписанных на тот же стор, без перерендера провайдера;
 * - на сервере (Next SSR) `getServerSnapshot` отдаёт request-scoped значение, без утечки между
 *   запросами (на `globalThis` хранится только иммутабельный объект контекста, не значение).
 *
 * Синглтон через `Symbol.for(registryKey)`: при нескольких копиях пакета (разные версии или
 * неполный dedupe) каждая копия иначе создала бы свой объект контекста, и провайдер из одной версии
 * не был бы виден консьюмеру из другой. Общий ключ реестра гарантирует один объект на весь
 * JS-контекст (один `globalThis`).
 *
 * `registryKey` строится через `providerKey('<domain>', <contractVersion>)` — версия контракта
 * повышается только при несовместимой смене формы значения.
 */
export function createSharedStoreContext<T>(registryKey: string, defaultStore: ExternalStore<T>) {
  const CONTEXT_KEY = Symbol.for(registryKey);

  type Registry = Record<symbol, Context<ExternalStore<T>> | undefined>;

  const registry = globalThis as unknown as Registry;

  if (!registry[CONTEXT_KEY]) {
    registry[CONTEXT_KEY] = createContext<ExternalStore<T>>(defaultStore);
  }

  const StoreContext = registry[CONTEXT_KEY];

  function StoreProvider({ store, children }: { store: ExternalStore<T>; children: ReactNode }) {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  }

  function useStoreValue(): T {
    const store = useContext(StoreContext);

    return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot ?? store.getSnapshot);
  }

  return { StoreProvider, useStoreValue };
}

/** Статический стор из фиксированного значения: подписка — no-op, snapshot стабилен по ссылке. */
export function staticStore<T>(value: T): ExternalStore<T> {
  return {
    subscribe: () => () => {},
    getSnapshot: () => value,
    getServerSnapshot: () => value,
  };
}
