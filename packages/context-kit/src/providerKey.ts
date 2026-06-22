const SEEN_KEY = Symbol.for('@cloud-ru/ds:context-kit:contract-versions');

type SeenRegistry = { [SEEN_KEY]?: Record<string, number> };

/**
 * Строит стабильный ключ реестра контекста: `@cloud-ru/ds:<domain>:v<contractVersion>`.
 *
 * `contractVersion` — версия **формы значения** контекста, ортогональная мажору пакета. Повышается
 * только при несовместимом изменении значения; пока изменения аддитивны, версия и ключ остаются
 * прежними, и разные мажоры пакета продолжают разделять контекст. Разные `contractVersion` одного
 * домена дают изолированные контексты (fail-safe: возвращается значение по умолчанию, без сбоя).
 *
 * В dev-режиме выводит предупреждение, если в одном JS-контексте (один `globalThis`) зарегистрированы
 * две разные контракт-версии одного домена — ранний сигнал о смешанных мажорах в MFE.
 */
export function providerKey(domain: string, contractVersion: number): string {
  if (process.env.NODE_ENV !== 'production') {
    const registry = globalThis as unknown as SeenRegistry;
    const seen = (registry[SEEN_KEY] ??= {});
    const prev = seen[domain];

    if (prev !== undefined && prev !== contractVersion) {
      console.warn(
        `[@ds/context-kit] domain "${domain}" registered with two contract versions (v${prev} and v${contractVersion}). ` +
          'Each version gets its own context, so they will not share state. Pin a single provider major.',
      );
    }

    seen[domain] = contractVersion;
  }

  return `@cloud-ru/ds:${domain}:v${contractVersion}`;
}
