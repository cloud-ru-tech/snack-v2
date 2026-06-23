import { ExternalStore } from '@ds/context-kit';

import { DEFAULT_LANG } from '../constants';
import { LOCALE_KEYS } from '../keys';
import { Lang } from '../types/locale';

export type LangSnapshot = { lang: Lang };
export type LangStore = ExternalStore<LangSnapshot>;

export type GlobalLocaleStore = {
  /** Стор для `<LocaleProvider store={...} />`. */
  store: LangStore;
  /** Текущий язык. */
  getLang(): Lang;
  /** Сменить язык и уведомить все подписанные провайдеры. */
  setLang(lang: Lang): void;
};

// Ключ — из локального keys.ts (одна точка бампа версии для контекста и стора домена).
const REGISTRY_KEY = Symbol.for(LOCALE_KEYS.store);

// SSR-snapshot — дефолтный язык. Мутабельный глобал на сервере запрещён (утечёт между запросами),
// поэтому серверный рендер всегда отдаёт дефолт; стартовый язык на SSR ставит сам app.
const SERVER_VALUE: LangSnapshot = { lang: DEFAULT_LANG };

type Registry = { [REGISTRY_KEY]?: GlobalLocaleStore };

/**
 * Глобальный singleton-стор языка, общий для всех React-корней процесса: микрофронтов single-spa,
 * островков Astro и сценариев, где один `LocaleProvider` нельзя поставить общим предком. Хранится в
 * `globalThis` через `Symbol.for` — один экземпляр без проброса по импортам, переживает несколько
 * копий пакета. Рецепт зеркалит `getGlobalThemeStore` (см. providers-standard.md).
 *
 * ```tsx
 * // там, где меняется язык (один раз):
 * getGlobalLocaleStore().setLang('de-DE');
 *
 * // в каждом независимом корне:
 * <LocaleProvider store={getGlobalLocaleStore().store} overrides={[...]}>{root}</LocaleProvider>;
 * ```
 *
 * Когда у приложения один React-корень — используйте `<LocaleProvider lang={…} />`.
 */
export function getGlobalLocaleStore(): GlobalLocaleStore {
  const registry = globalThis as Registry;

  if (!registry[REGISTRY_KEY]) {
    let lang = DEFAULT_LANG;
    // Стабильный snapshot: новая ссылка только после смены языка, иначе useSyncExternalStore зациклится.
    let cache: LangSnapshot | undefined;
    const listeners = new Set<() => void>();

    const setLang = (next: Lang): void => {
      if (next === lang) {
        return;
      }

      lang = next;
      cache = undefined;
      listeners.forEach(listener => listener());
    };

    const read = (): LangSnapshot => (cache ??= { lang });

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
      getLang: () => lang,
      setLang,
    };
  }

  return registry[REGISTRY_KEY];
}
