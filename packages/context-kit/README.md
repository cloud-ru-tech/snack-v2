# Context Kit

`@ds/context-kit` — Основа всех сквозных провайдеров дизайн-системы — версионно-устойчивый React-контекст-синглтон поверх useSyncExternalStore, безопасный для SSR и микрофронтов.

`@ds/context-kit` — низкоуровневый примитив, на котором построены все сквозные провайдеры дизайн-системы (`@ds/theme`, `@ds/adaptive`, `@ds/locale`, `@ds/portal-context`). Он решает три задачи, общие для всех контекстов в монорепо:

- **Синглтон контекста** — объект React-контекста хранится в реестре по ключу `Symbol.for`, поэтому остаётся единым даже при нескольких копиях пакета в дереве (частый случай в микрофронтах).
- **Реактивное значение через `useSyncExternalStore`** — статичный проп оборачивается в стор, внешний реактивный источник (стор хост-приложения) передаётся напрямую; изменение доходит до подписчиков без перерендера провайдера.
- **SSR-безопасность** — `getServerSnapshot` отдаёт request-scoped значение; на `globalThis` хранится только иммутабельный объект контекста, не значение, поэтому между запросами ничего не утекает.

Прикладной код обычно потребляет не этот примитив напрямую, а готовые провайдеры. `@ds/context-kit` нужен для создания **нового** сквозного провайдера.

## Когда использовать

- Нужен новый провайдер уровня приложения, значение которого должны читать компоненты из разных пакетов/микрофронтов.
- Провайдер обязан быть устойчивым к нескольким версиям пакета в одном бандле (MFE).
- Значение приходит либо пропом (статично, SSR), либо из внешнего реактивного стора (observable / redux / zustand).

Полная модель и рецепты подключения готовых провайдеров — в паттерне [Провайдеры — быстрый старт](/patterns/providers).

## Установка

```bash
pnpm add @ds/context-kit
```

```ts
import { createSharedContext, createSharedStoreContext, providerKey, staticStore } from '@ds/context-kit'
```

## Примеры использования

### Статический провайдер — `createSharedContext`

Для провайдеров, у которых значение приходит пропом (тема, локаль, portal-root). Обёртка заворачивает `value` в `staticStore` и мемоизирует его по ссылке.

```tsx
import { createSharedContext, providerKey } from '@ds/context-kit';

type Lang = { lang: string; fallbackLang: string };

const DEFAULT_LANG: Lang = { lang: 'en-GB', fallbackLang: 'en-GB' };

// Ключ собирается через providerKey('<домен>', <контракт-версия>).
const { Provider, useValue } = createSharedContext<Lang>({
  key: providerKey('locale', 1),
  defaultValue: DEFAULT_LANG,
});

// Провайдер в корне приложения:
<Provider value={{ lang: 'ru-RU', fallbackLang: 'en-GB' }}>{app}</Provider>;

// Чтение в любом компоненте ниже по дереву:
function Consumer() {
  const { lang } = useValue();
  return <span>{lang}</span>;
}
```

### Реактивный провайдер — `createSharedStoreContext`

Когда значение приходит из внешнего реактивного источника (стор хост-приложения). Обновление стора доходит до всех подписчиков во всех микрофронтах без перерендера провайдера.

```tsx
import { createSharedStoreContext, ExternalStore, providerKey } from '@ds/context-kit';

type LayoutType = 'mobile' | 'tablet' | 'desktopSmall' | 'desktop';

const fallbackStore: ExternalStore<LayoutType> = {
  subscribe: () => () => {},
  getSnapshot: () => 'desktop',
  getServerSnapshot: () => 'desktop', // детерминированный SSR-baseline
};

const { StoreProvider, useStoreValue } = createSharedStoreContext<LayoutType>(
  providerKey('adaptive-context', 1),
  fallbackStore,
);

// Адаптер внешнего реактивного источника в ExternalStore:
const store: ExternalStore<LayoutType> = {
  subscribe: onChange => layoutSource.subscribe(onChange),
  getSnapshot: () => layoutSource.get(),
};

<StoreProvider store={store}>{mfe}</StoreProvider>;

function Consumer() {
  const layoutType = useStoreValue();
  return <span>{layoutType}</span>;
}
```

### Статичное значение в стор — `staticStore`

Превращает фиксированное значение в `ExternalStore`: подписка — no-op, snapshot стабилен по ссылке. Используется внутри `createSharedContext` и как SSR-baseline.

```ts
import { staticStore } from '@ds/context-kit';

const store = staticStore({ colorScheme: 'light' });
store.getSnapshot(); // → { colorScheme: 'light' } (та же ссылка)
```

### Ключ контекста — `providerKey`

Строит стабильный ключ реестра `@cloud-ru/ds:<домен>:v<контракт-версия>`. Контракт-версия — версия **формы значения** контекста, ортогональная мажору пакета; повышается только при несовместимой смене значения. В dev-режиме выводит предупреждение, если в одном JS-контексте (один `globalThis`) зарегистрированы две разные контракт-версии одного домена (ранний сигнал о смешанных мажорах в MFE).

```ts
import { providerKey } from '@ds/context-kit';

providerKey('theme-appearance', 1); // → '@cloud-ru/ds:theme-appearance:v1'
```

## Как это работает

- **Синглтон.** `createSharedStoreContext` хранит объект React-контекста в `globalThis[Symbol.for(registryKey)]`. Любая копия пакета — любой версии, при любом неполном dedupe — резолвится в один и тот же объект контекста в пределах одного `globalThis`, поэтому провайдер из одной копии виден консьюмеру из другой.
- **Реактивность.** Консьюмеры читают значение через `useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)`. Статичное значение оборачивается в `staticStore`, реактивный источник передаётся напрямую.
- **Контракт-версия.** `providerKey('<домен>', N)` отделяет версию формы значения от мажора пакета: пока изменения значения аддитивны, ключ остаётся прежним, и разные мажоры пакета продолжают разделять контекст. Несовместимая смена формы → повышение `N` → изолированные контексты (fail-safe: значение по умолчанию, без сбоя).
