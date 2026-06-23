import { providerKey } from '@ds/context-kit';

/**
 * `Symbol.for`-ключи домена locale — обе системы синглтонов в одном месте:
 * - `context` — объект React-контекста локали (через `providerKey` → dev-warn о смешанных версиях);
 * - `store` — глобальный мутабельный стор языка (кросс-root мост контейнер→MFE).
 *
 * Одна контракт-версия на домен бампается ТОЛЬКО при несовместимом сломе формы значения и двигает
 * ОБА ключа вместе. Ортогонально мажору ПАКЕТА. Строки менять НЕЛЬЗЯ (форк синглтона = случайный
 * `:v2`). Стор держит `{lang}`, контекст — `{lang,fallbackLang,overrides}`; обе формы под одной
 * версией — при раздельном сломе расщепить здесь. См. providers-standard.md.
 */
const CONTRACT_VERSION = 1;

export const LOCALE_KEYS = {
  context: providerKey('locale', CONTRACT_VERSION),
  store: `@cloud-ru/ds:global-locale-store:v${CONTRACT_VERSION}`,
} as const;
