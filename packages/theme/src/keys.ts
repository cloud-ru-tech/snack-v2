import { providerKey } from '@ds/context-kit';

/**
 * `Symbol.for`-ключи домена theme-appearance — обе системы синглтонов в одном месте:
 * - `context` — объект React-контекста оформления (через `providerKey` → dev-warn о смешанных версиях);
 * - `store` — глобальный мутабельный стор оформления (кросс-root мост хост→MFE).
 *
 * Одна контракт-версия на домен бампается ТОЛЬКО при несовместимом сломе формы значения и двигает
 * ОБА ключа вместе. Ортогонально мажору ПАКЕТА. Строки менять НЕЛЬЗЯ (форк синглтона = случайный
 * `:v2`). НЕ путать с доменом `theme` старого `ThemeContext` (themeMap/changeTheme). См.
 * providers-standard.md.
 */
const CONTRACT_VERSION = 1;

export const THEME_KEYS = {
  context: providerKey('theme-appearance', CONTRACT_VERSION),
  store: `@cloud-ru/ds:global-theme-store:v${CONTRACT_VERSION}`,
} as const;
