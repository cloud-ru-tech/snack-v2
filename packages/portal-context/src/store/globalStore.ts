import { isBrowser } from '@ds/utils';
import { MutableRefObject } from 'react';

import { PORTAL_KEYS } from '../keys';

const REGISTRY_KEY = Symbol.for(PORTAL_KEYS.store);

type Registry = { [REGISTRY_KEY]?: MutableRefObject<HTMLElement | null> };

/**
 * Глобальный singleton-ref корня порталов, общий для всех React-корней процесса (микрофронты
 * single-spa, островки Astro), где один `PortalContextProvider` нельзя поставить общим предком.
 * Хранится в `globalThis` через `Symbol.for`, поэтому переживает несколько копий пакета; это
 * мутабельный `RefObject`, а не реактивный стор — порталы читают `.current` лениво при открытии.
 *
 * Дефолт — `document.body` (браузер) либо `null` (SSR). Оболочка контейнера может один раз задать
 * целевой корень, и все микрофронты без своего `PortalContextProvider` примонтируют порталы туда:
 *
 * ```tsx
 * getGlobalPortalRoot().current = document.body; // или выделенный themed-root
 * ```
 *
 * Для одного React-корня с нестандартным таргетом — `<PortalContextProvider root={ref} />`.
 */
export function getGlobalPortalRoot(): MutableRefObject<HTMLElement | null> {
  const registry = globalThis as Registry;

  return (registry[REGISTRY_KEY] ??= { current: isBrowser() ? document.body : null });
}
