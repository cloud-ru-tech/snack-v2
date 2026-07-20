import { useCallback, useSyncExternalStore } from 'react';

import { CIMODE } from '../constants/lang';
import { getGlobalLocaleStore } from '../store/globalStore';
import { Lang } from '../types/locale';

export type UseLanguageResult = {
  /** Текущий язык из глобального стора локали. */
  lang: Lang;
  /** Сменить язык глобально — все подписанные корни/микрофронты обновятся. */
  changeLanguage(lang: Lang): void;
  /** Активен ли `cimode` (`t()` показывает ключи). */
  isCimode: boolean;
};

/**
 * Читает и меняет язык приложения через глобальный singleton-стор локали (`getGlobalLocaleStore`),
 * общий для всех React-корней процесса. `changeLanguage` пишет источник истины, язык реактивно
 * раздаётся подписанным консьюмерам. В отличие от `useLang` (язык ближайшего провайдера) работает
 * с глобальным источником — типичный сценарий — прокинуть его в провайдер:
 *
 * ```tsx
 * const { lang } = useLanguage();
 * return <LocaleProvider lang={lang}>{children}</LocaleProvider>;
 * ```
 *
 * Отладочный режим ключей — `changeLanguage(CIMODE)`.
 */
export function useLanguage(): UseLanguageResult {
  const { store, setLang } = getGlobalLocaleStore();
  const { lang } = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  const changeLanguage = useCallback((next: Lang) => setLang(next), [setLang]);

  return { lang, changeLanguage, isCimode: lang === CIMODE };
}
