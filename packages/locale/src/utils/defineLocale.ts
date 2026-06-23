import { useCallback, useMemo } from 'react';

import { useLocaleContext } from '../context/localeContext';
import { InterpolationObject, Lang, LangMessages, MessageTree, OverrideEntry } from '../types/locale';
import { InterpolationArgs, PartialDeep, PathsToProps, ValueAtPath } from '../types/typeUtils';
import { buildLangDict, translate } from './resolve';

/**
 * Определяет locale компонента: из одного словаря выходят и хук переводов, и типизированный билдер
 * оверрайда/нового языка. Тип-истина (форма ключей) co-located со словарём → дрейф невозможен.
 *
 * ```ts
 * export const calendarLocale = defineLocale('Calendar', CALENDAR_MESSAGES);
 * // в компоненте:  const { t } = calendarLocale.useTranslations(); t('apply');
 * // в сервисе:     calendarLocale.extend('de-DE', { apply: 'Anwenden' });
 * ```
 */
/** Расширяет литеральные листья словаря (`'Apply'`) до `string` — оверрайд кладёт любой текст, не исходный литерал. */
export type WidenLeaves<T> = T extends string ? string : { [K in keyof T]: WidenLeaves<T[K]> };

/**
 * Результат `defineLocale`: хук переводов (`useTranslations`) + типизированный билдер оверрайда (`extend`).
 * Именованный (а не инференс-литерал), чтобы у потребителя `export const xLocale = defineLocale(...)` тип
 * назывался через корень `@ds/locale`, а не через глубокий путь dist — иначе TS2742 при declaration-emit.
 *
 * `NS` — литерал namespace, зафиксированный в типе: его подхватывает `LocaleOverride<typeof xLocale>`,
 * чтобы корень мог сверять строку namespace оверрайда с правдой пакета без рантайм-импорта.
 */
/**
 * Функция перевода. Дженерик по ключу `K`: из литерала значения по этому ключу выводятся имена
 * `{{placeholder}}` и становятся обязательным объектом интерполяции (или его нет — если плейсхолдеров нет).
 */
export type TranslateFn<M extends Record<string, object>> = <K extends PathsToProps<M[keyof M], string>>(
  key: K,
  ...interpolation: InterpolationArgs<ValueAtPath<M[keyof M], K>>
) => string;

export type DefinedLocale<M extends Record<string, object>, NS extends string = string> = {
  namespace: NS;
  useTranslations: () => {
    t: TranslateFn<M>;
    lang: Lang;
  };
  extend: (lang: Lang, partial: PartialDeep<WidenLeaves<M[keyof M]>>) => OverrideEntry;
};

/**
 * Тип одной записи оверрайда для конкретного компонента — для типобезопасной сборки оверрайдов на
 * **корне без рантайма из пакета**. Кейс: корневое приложение добавляет язык сразу для нескольких MFE,
 * а пакеты компонентов держит в `devDependencies` (нужны только типы). Использование:
 *
 * ```ts
 * // пакеты компонентов — devDep, `import type` стирается при компиляции:
 * import type { calendarLocale } from '@ds/calendar/locale';
 * import type { quotaLocale } from '@ds/uikit-product-quota/locale';
 * // @ds/locale — реальная dep (провайдер + хелперы):
 * import { composeOverrides, LocaleOverride, LocaleProvider } from '@ds/locale';
 *
 * const calendarDe: LocaleOverride<typeof calendarLocale> = {
 *   namespace: '@ds/calendar', // сверяется с литералом из типа locale-объекта
 *   lang: 'de-DE',
 *   messages: { apply: 'Anwenden' }, // deep-partial формы словаря, опечатка ключа — ошибка компиляции
 * };
 * const quotaDe: LocaleOverride<typeof quotaLocale> = {
 *   namespace: '@ds/uikit-product-quota',
 *   lang: 'de-DE',
 *   messages: { increaseQuota: 'Kontingent erhöhen' },
 * };
 * // <LocaleProvider overrides={composeOverrides(calendarDe, quotaDe)}> … </LocaleProvider>
 * ```
 */
export type LocaleOverride<D> =
  D extends DefinedLocale<infer M, infer NS>
    ? { namespace: NS; lang: Lang; messages: PartialDeep<WidenLeaves<M[keyof M]>> }
    : never;

export function defineLocale<M extends Record<string, object>, NS extends string>(
  namespace: NS,
  messages: M,
): DefinedLocale<M, NS> {
  type Shape = M[keyof M];

  const langMessages = messages as unknown as LangMessages;

  function useTranslations(): { t: TranslateFn<M>; lang: Lang } {
    const { lang, fallbackLang, overrides } = useLocaleContext();

    const dict = useMemo(
      () => buildLangDict(namespace, langMessages, lang, fallbackLang, overrides),
      [lang, fallbackLang, overrides],
    );

    const t = useCallback<TranslateFn<M>>(
      (key, ...interpolation) =>
        translate(dict, key as string, lang, interpolation[0] as InterpolationObject | undefined),
      [dict, lang],
    );

    return { t, lang };
  }

  /** Типизированный (по форме словаря) оверрайд языка `lang`: переопределить строки или завести новый язык. */
  function extend(lang: Lang, partial: PartialDeep<WidenLeaves<Shape>>): OverrideEntry {
    return { namespace, lang, messages: partial as PartialDeep<MessageTree> };
  }

  return { namespace, useTranslations, extend };
}

/** Сахар для сборки списка оверрайдов на провайдере. */
export function composeOverrides(...entries: (OverrideEntry | OverrideEntry[])[]): OverrideEntry[] {
  return entries.flat();
}
