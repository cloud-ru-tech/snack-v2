import { providerKey } from '@ds/context-kit';

/**
 * `Symbol.for`-ключи домена adaptive — обе системы синглтонов в одном месте:
 * - `context` — объект React-контекста (через `providerKey` → есть dev-warn о смешанных версиях);
 * - `store` — глобальный мутабельный стор раскладки (кросс-root мост хост→MFE).
 *
 * Одна контракт-версия на домен повышается ТОЛЬКО при несовместимом сломе формы значения и двигает
 * ОБА ключа вместе — забыть половину нельзя. Ортогонально мажору ПАКЕТА (разные мажоры делят ключ,
 * пока shape аддитивен). Строки менять НЕЛЬЗЯ — это форк синглтона (случайный `:v2`). См.
 * providers-standard.md.
 */
const CONTRACT_VERSION = 1;

export const ADAPTIVE_KEYS = {
  context: providerKey('adaptive-context', CONTRACT_VERSION),
  store: `@cloud-ru/ds:global-adaptive-store:v${CONTRACT_VERSION}`,
} as const;
