import { staticStore } from '@ds/context-kit';
import { ReactNode, useMemo, useSyncExternalStore } from 'react';

import { DEFAULT_LANG } from '../../constants/lang';
import { LocaleStoreProvider, useLocaleContext } from '../../context/localeContext';
import { LangSnapshot, LangStore } from '../../store/globalStore';
import { Lang, LocaleContextValue, OverrideEntry } from '../../types/locale';
import { buildOverrideRegistry, mergeRegistries } from '../../utils/resolve';

// Стабильный snapshot обязателен: useSyncExternalStore зациклится, если getSnapshot отдаёт новую
// ссылку каждый вызов. Используется, когда `store` не задан (язык приходит пропом/из родителя).
const NOOP_SNAPSHOT: LangSnapshot = { lang: DEFAULT_LANG };
const NOOP_STORE: LangStore = {
  subscribe: () => () => {},
  getSnapshot: () => NOOP_SNAPSHOT,
  getServerSnapshot: () => NOOP_SNAPSHOT,
};

export type LocaleProviderProps = {
  /** Статический язык (одно-корневой app/SSR). Игнорируется, если задан `store`. */
  lang?: Lang;
  /** Язык, на который откатываемся при отсутствии перевода. По умолчанию `en-GB`. */
  fallbackLang?: Lang;
  /** Реактивный источник языка для MFE: `getGlobalLocaleStore().store`. */
  store?: LangStore;
  /** Оверрайды/новые языки — собираются через `<locale>.extend(lang, ...)`, app-static. */
  overrides?: OverrideEntry[];
  children: ReactNode;
};

/**
 * Провайдер локали. **Не держит словарей** — только текущий язык, fallback и реестр оверрайдов.
 * Строки живут в самих компонентах (`defineLocale`). Язык — из пропа `lang` (static) либо `store` (MFE).
 *
 * Провайдер опционален: без него консьюмеры читают язык из глобального стора (`getGlobalLocaleStore`),
 * который кормит шелл контейнера. Монтируется в дереве, когда нужен статический язык, собственный
 * реактивный источник или app-static оверрайды строк.
 */
export function LocaleProvider({ lang, fallbackLang, store, overrides, children }: LocaleProviderProps) {
  // Каскад: вложенный провайдер наследует язык/fallback/оверрайды ближайшего родителя и точечно их
  // переопределяет (как ChildThemeProvider). На корне родителя нет — это `globalLocaleDefaultStore`.
  const parent = useLocaleContext();

  const effectiveStore = store ?? NOOP_STORE;
  const snapshot = useSyncExternalStore(
    effectiveStore.subscribe,
    effectiveStore.getSnapshot,
    effectiveStore.getServerSnapshot ?? effectiveStore.getSnapshot,
  );

  const effectiveLang = store ? snapshot.lang : (lang ?? parent.lang);
  const effectiveFallback = fallbackLang ?? parent.fallbackLang ?? DEFAULT_LANG;
  const overrideRegistry = useMemo(
    () => mergeRegistries(parent.overrides, buildOverrideRegistry(overrides)),
    [parent.overrides, overrides],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ lang: effectiveLang, fallbackLang: effectiveFallback, overrides: overrideRegistry }),
    [effectiveLang, effectiveFallback, overrideRegistry],
  );

  // Контекст хранит внешний стор; статичное вычисленное значение заворачиваем в `staticStore`
  // (стабильный по ссылке snapshot), мемоизируя по `value`.
  const valueStore = useMemo(() => staticStore(value), [value]);

  return <LocaleStoreProvider store={valueStore}>{children}</LocaleStoreProvider>;
}
