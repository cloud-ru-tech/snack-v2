import { createSharedContext } from '@ds/context-kit';
import { RefObject } from 'react';

import { PORTAL_KEYS } from '../keys';
import { getGlobalPortalRoot } from '../store/globalStore';

// Общий контекст через @ds/context-kit: Symbol.for-синглтон — один инстанс на realm даже при
// нескольких копиях пакета (MFE), SSR-safe. Дефолт = глобальный singleton-ref, поэтому потребитель
// без `PortalContextProvider` монтирует порталы в корень, объявленный оболочкой контейнера (или в
// `document.body`).
//
// `PortalRootProvider` / `usePortalRootContext` — внутренние примитивы; публичны
// `PortalContextProvider` и `usePortalContext`.
export const { Provider: PortalRootProvider, useValue: usePortalRootContext } = createSharedContext<
  RefObject<HTMLElement | null>
>({
  key: PORTAL_KEYS.context,
  defaultValue: getGlobalPortalRoot(),
});
