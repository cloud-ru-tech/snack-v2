import { CIMODE } from '../constants/lang';
import { InterpolationObject, LangMessages, MessageTree, OverrideRegistry } from '../types/locale';
import { deepMerge } from './deepMerge';
import { interpolateTranslation } from './interpolateTranslation';

/**
 * Чистый резолвер словаря для текущего языка.
 *
 * base = messages[lang] ?? messages[fallbackLang] ?? первый язык словаря.
 * Поверх base мёржится оверрайд `overrides[namespace][lang]` (его ключи побеждают).
 *
 * Для **нового** языка (нет в `messages`, есть только в `overrides`, напр. `de-DE`): base = язык
 * fallback (en-GB), оверрайд = немецкий → немецкий где есть, en-GB где не переведено. Инкрементально.
 */
export function buildLangDict(
  namespace: string,
  messages: LangMessages,
  lang: string,
  fallbackLang: string,
  overrides?: OverrideRegistry,
): MessageTree {
  const base = messages[lang] ?? messages[fallbackLang] ?? Object.values(messages)[0] ?? {};
  const override = overrides?.[namespace]?.[lang];

  return override ? deepMerge<MessageTree>(base, override) : base;
}

/** Достаёт строку по dotted-ключу, интерполирует. Если не найдена — dev-warn + возврат ключа. */
export function translate(dict: MessageTree, key: string, lang: string, interpolation?: InterpolationObject): string {
  // cimode (i18next): вместо перевода отдаём сам ключ — для отладки строк и скриншотов ключей.
  if (lang === CIMODE) {
    return key;
  }

  const node = key.split('.').reduce<string | MessageTree | undefined>((acc, part) => {
    if (acc == null || typeof acc === 'string') {
      return acc;
    }

    return acc[part];
  }, dict);

  if (typeof node !== 'string' || node.length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`@ds/locale: the '${key}' key is not found in the current locale '${lang}'.`);
    }

    return key;
  }

  return interpolateTranslation(node, interpolation);
}

/** Сливает два реестра оверрайдов (родительский ⊕ собственный) для каскада вложенных провайдеров. */
export function mergeRegistries(parent: OverrideRegistry, own: OverrideRegistry): OverrideRegistry {
  return deepMerge<OverrideRegistry>(parent, own);
}

/** Складывает плоский список `OverrideEntry` в реестр namespace → lang → дерево (deep-merge при дублях). */
export function buildOverrideRegistry(
  entries?: { namespace: string; lang: string; messages: object }[],
): OverrideRegistry {
  const registry: OverrideRegistry = {};

  if (!entries) {
    return registry;
  }

  for (const { namespace, lang, messages } of entries) {
    registry[namespace] ??= {};
    registry[namespace][lang] = deepMerge(registry[namespace][lang] ?? {}, messages);
  }

  return registry;
}
