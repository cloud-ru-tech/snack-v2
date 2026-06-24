import { ThemeAppearanceContextValue, ThemeAppearanceStore } from '../context/appearanceContext';
import { THEME_KEYS } from '../keys';
import { ThemeAppearance } from '../types/appearance';
import { mergeAppearance } from '../utils/mergeAppearance';

export type GlobalThemeStore = {
  /** Стор для `<RootThemeProvider store={...} />`. */
  store: ThemeAppearanceStore;
  /** Текущее оформление. */
  getAppearance(): ThemeAppearance;
  /** Слить патч в оформление и уведомить все подписанные провайдеры. */
  setAppearance(patch: Partial<ThemeAppearance>): void;
};

// Ключ — из локального keys.ts (одна точка бампа версии для контекста и стора домена).
const REGISTRY_KEY = Symbol.for(THEME_KEYS.store);

type Registry = { [REGISTRY_KEY]?: GlobalThemeStore };

// SSR-snapshot — пустое оформление без сеттера. Мутабельный глобал на сервере запрещён (утечёт
// между запросами), поэтому серверный рендер всегда отдаёт дефолт; реальные классы на SSR ставит
// строка на `<html>` (см. providers-standard.md).
const SERVER_VALUE: ThemeAppearanceContextValue = { appearance: {}, setAppearance: undefined };

const APPEARANCE_KEYS: (keyof ThemeAppearance)[] = ['colorScheme', 'brand', 'brandRole', 'density', 'acrylic'];

function isSameAppearance(a: ThemeAppearance, b: ThemeAppearance): boolean {
  return APPEARANCE_KEYS.every(key => a[key] === b[key]);
}

/**
 * Глобальный singleton-стор оформления, общий для всех React-корней процесса: микрофронтов
 * single-spa, островков Astro и любых сценариев, где один `RootThemeProvider` нельзя поставить
 * общим предком в одном дереве. Хранится в `globalThis` через `Symbol.for`, поэтому любой модуль
 * получает один экземпляр без проброса по импортам и переживает несколько копий пакета.
 *
 * Shell контейнера меняет оформление через `setAppearance({ colorScheme, density, ... })` — все
 * подписанные `RootThemeProvider` реэмитят полный набор `sn-*` классов. Когда у приложения один
 * React-корень — используйте `<RootThemeProvider value={…} />`, этот хелпер нужен только для multi-root.
 *
 * ```tsx
 * // там, где меняется тема (один раз):
 * getGlobalThemeStore().setAppearance({ colorScheme });
 *
 * // в каждом независимом корне:
 * <RootThemeProvider store={getGlobalThemeStore().store} rootRef={htmlRef}>{root}</RootThemeProvider>;
 * ```
 */
export function getGlobalThemeStore(): GlobalThemeStore {
  const registry = globalThis as Registry;

  if (!registry[REGISTRY_KEY]) {
    let appearance: ThemeAppearance = {};
    // Стабильный snapshot: новый объект только после смены оформления, иначе `useSyncExternalStore`
    // зациклится на «getSnapshot вернул новую ссылку».
    let cache: ThemeAppearanceContextValue | undefined;
    const listeners = new Set<() => void>();

    const setAppearance = (patch: Partial<ThemeAppearance>): void => {
      const next = mergeAppearance(appearance, patch);
      if (isSameAppearance(appearance, next)) return;
      appearance = next;
      cache = undefined;
      listeners.forEach(listener => listener());
    };

    const read = (): ThemeAppearanceContextValue => {
      if (!cache) {
        cache = { appearance, setAppearance };
      }

      return cache;
    };

    registry[REGISTRY_KEY] = {
      store: {
        subscribe: onChange => {
          listeners.add(onChange);

          return () => {
            listeners.delete(onChange);
          };
        },
        getSnapshot: read,
        getServerSnapshot: () => SERVER_VALUE,
      },
      getAppearance: () => appearance,
      setAppearance,
    };
  }

  return registry[REGISTRY_KEY];
}
