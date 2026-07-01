import { createSharedStoreContext, ExternalStore } from '@ds/context-kit';

import { DEFAULT_LANG } from '../constants/lang';
import { LOCALE_KEYS } from '../keys';
import { getGlobalLocaleStore } from '../store/globalStore';
import { Lang, LocaleContextValue } from '../types/locale';

const DEFAULT_CONTEXT: LocaleContextValue = {
  lang: DEFAULT_LANG,
  fallbackLang: DEFAULT_LANG,
  overrides: {},
};

// Дефолтный стор контекста = адаптер над глобальным singleton-стором языка. Поэтому консьюмер БЕЗ
// `LocaleProvider` в своём React-дереве (любой независимый корень: микрофронт single-spa, островок
// Astro) читает не статический `en-GB`, а язык, который шелл выставил в `getGlobalLocaleStore` из
// источника истины (реактивного стора хост-приложения). Так микрофронту не нужно оборачиваться в провайдер.
// Глобальный стор хранит только `{ lang }`; форму контекста (`+ fallbackLang + overrides`) достраиваем
// здесь. `getSnapshot` обязан возвращать стабильную ссылку, пока язык не менялся (иначе
// `useSyncExternalStore` зациклится), — кэшируем по `lang`.
const globalLocaleDefaultStore: ExternalStore<LocaleContextValue> = (() => {
  const langStore = getGlobalLocaleStore().store;
  let cache: LocaleContextValue | undefined;
  let cachedLang: Lang | undefined;

  const derive = (lang: Lang): LocaleContextValue => {
    if (!cache || cachedLang !== lang) {
      cache = { lang, fallbackLang: DEFAULT_LANG, overrides: {} };
      cachedLang = lang;
    }

    return cache;
  };

  return {
    subscribe: onChange => langStore.subscribe(onChange),
    getSnapshot: () => derive(langStore.getSnapshot().lang),
    getServerSnapshot: () => DEFAULT_CONTEXT,
  };
})();

// Стор-контекст (значение — внешний стор, не голое значение): консьюмер без провайдера читает
// `globalLocaleDefaultStore`, провайдер в дереве затеняет его собственным `staticStore(value)`.
// Объект контекста — `Symbol.for`-синглтон, общий для всех версий пакета.
//
// `LocaleStoreProvider` / `useStoreValue` — внутренние примитивы: публичны компонент `LocaleProvider`
// (components/), хуки `useLang` (hooks/) и `useLocaleContext`.
const { StoreProvider, useStoreValue } = createSharedStoreContext<LocaleContextValue>(
  LOCALE_KEYS.context,
  globalLocaleDefaultStore,
);

export { StoreProvider as LocaleStoreProvider };

/** Чтение значения контекста локали (lang + fallbackLang + overrides). Внутренний хук для `defineLocale`. */
export const useLocaleContext = useStoreValue;
