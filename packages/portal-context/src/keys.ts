import { providerKey } from '@ds/context-kit';

/**
 * `Symbol.for`-ключи домена portal-context: `context` — React-контекст корня порталов,
 * `store` — глобальный `RefObject` того же корня (мост контейнер→MFE).
 *
 * Версия повышается только при несовместимом изменении формы значения и двигает оба ключа вместе.
 * Строки менять нельзя — иначе синглтон расщепится. См. providers-standard.md.
 */
const CONTRACT_VERSION = 1;

export const PORTAL_KEYS = {
  context: providerKey('portal-context', CONTRACT_VERSION),
  store: `@cloud-ru/ds:global-portal-root:v${CONTRACT_VERSION}`,
} as const;
