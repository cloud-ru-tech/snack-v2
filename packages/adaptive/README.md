# Adaptive

`@ds/adaptive` — React Context текущей раскладки (layoutType) — переключает компоненты дизайн-системы между mobile и desktop поверхностями.

`@ds/adaptive` несёт через React Context текущую раскладку экрана — `layoutType` (`mobile` / `tablet` / `desktopSmall` / `desktop`). `AdaptiveProvider` ставится один раз в корне приложения, а адаптивные компоненты дизайн-системы (`Droplist`, `Modal`, `Drawer`, `Dropdown` и др.) сами читают раскладку из контекста и переключают поверхность: на `mobile` обычно открывается `BottomSheet`, иначе — десктопный popover / modal.

Полное руководство по модели — в паттерне [Адаптивность — руководство](/patterns/adaptive).

## Когда использовать

- Приложение использует адаптивные компоненты дизайн-системы и должно переключать их между mobile и desktop поверхностями. Провайдер ставится один раз в корне.
- Раскладка считается в корне через `useAdaptiveBootstrap()` (user-agent + media-query) и раздаётся вложенным компонентам без проброса пропа.
- Микрофронт получает раскладку из реактивного стора хост-приложения — провайдер подключается через `store` (адаптер собирается `createAdaptiveStore`).
- Серверный рендеринг: раскладка вычисляется из user-agent запроса через подпуть `@ds/adaptive/ssr` (чистые функции без React Context).

Точечно зафиксировать платформу для поддерева можно вложенным `<AdaptiveProvider layoutType=…>` или HOC `withLayoutType(Component, …)` — он затеняет внешний контекст. Пропа `layoutType` у самих компонентов нет: форс идёт только через контекст.

## Установка

```bash
pnpm add @ds/adaptive
```

```tsx
import { AdaptiveProvider, withLayoutType, useAdaptiveBootstrap, useAdaptiveLayout, isMobileLayout, LAYOUT_TYPE } from '@ds/adaptive'
```

## Примеры использования

### AdaptiveProvider в корне

Провайдер раздаёт `layoutType`; вложенный компонент читает его через `useAdaptiveLayout()` и `isMobileLayout()`.

```tsx
import { AdaptiveProvider, isMobileLayout, LAYOUT_TYPE, LayoutType, useAdaptiveLayout } from '@ds/adaptive';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const LAYOUT_ITEMS = Object.values(LAYOUT_TYPE).map(value => ({ value, label: value }));

// Потребитель берёт раскладку из AdaptiveProvider через useAdaptiveLayout() — без пропа и обёрток.
// Так же ведут себя Adaptive*-компоненты внутри (на mobile уходят в BottomSheet).
function LayoutSurface() {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);

  return (
    <Flex gap='2m' align='center' wrap>
      <Tag
        appearance={mobile ? 'blue' : 'green'}
        label={mobile ? 'Мобильная ветка → BottomSheet' : 'Десктопная ветка'}
      />
      <Typography variant='body' size='s'>
        useAdaptiveLayout(): {layoutType}
      </Typography>
    </Flex>
  );
}

export function ProviderBasic() {
  const [layoutType, setLayoutType] = useState<LayoutType>(LAYOUT_TYPE.Desktop);

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <Flex direction='column' gap='2m' align='flex-start'>
        <SegmentControl
          items={LAYOUT_ITEMS}
          value={layoutType}
          onChange={value => setLayoutType(value as LayoutType)}
        />
        <LayoutSurface />
      </Flex>
    </AdaptiveProvider>
  );
}
```

### Свои брейкпоинты приложения

`useAdaptiveBootstrap({ breakpoints })` переопределяет пороги раскладки; набор тиров остаётся прежним.

```tsx
import { AdaptiveProvider, isMobileLayout, useAdaptiveBootstrap, useAdaptiveLayout } from '@ds/adaptive';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';

// Раскладка приходит из контекста; Tag перекрашивается, когда ширина окна пересекает порог.
function LayoutSurface() {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);

  return <Tag appearance={mobile ? 'blue' : 'green'} label={`layoutType: ${layoutType}`} />;
}

export function CustomBreakpoints() {
  // Брейкпоинты переопределяются на уровне приложения: mobile-порог опущен с 767 до 480 px.
  // useAdaptiveBootstrap() читает ширину окна в корне приложения и передаёт результат в AdaptiveProvider.
  const { layoutType } = useAdaptiveBootstrap({ breakpoints: { mobile: 480 } });

  return (
    <AdaptiveProvider layoutType={layoutType}>
      <Flex direction='column' gap='2m' align='flex-start'>
        <Typography variant='body' size='s'>
          Порог mobile опущен до 480 px. Сузьте окно до этой ширины, чтобы раскладка стала мобильной.
        </Typography>
        <LayoutSurface />
      </Flex>
    </AdaptiveProvider>
  );
}
```

## Props

**AdaptiveProviderProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `layoutType` | `"desktop"` \| `"desktopSmall"` \| `"mobile"` \| `"tablet"` | — | Статичная раскладка (SSR — значение на запрос, либо `useAdaptiveBootstrap()` в корне CSR). Реактивный источник — через `store`. |
| `store` | `AdaptiveStore` | — | Внешний реактивный стор раскладки; приоритетнее `layoutType`, обновляет подписчиков без перерендера провайдера. |

#### Related types

**AdaptiveStore**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getServerSnapshot` | `(() => AdaptiveContextValue) \| undefined` | — | Значение для SSR/гидрации. Если не задан — используется `getSnapshot`. |
| `getSnapshot` | `() => AdaptiveContextValue` | — | Текущее значение. Обязан возвращать стабильную (по `Object.is`) ссылку, пока значение не менялось. |
| `subscribe` | `(onStoreChange: () => void) => () => void` | — | Подписка на изменения; возвращает функцию отписки. |

- `LayoutType` = `"desktop"` \| `"desktopSmall"` \| `"mobile"` \| `"tablet"`

## Смотри также

- [Адаптивность — руководство](/patterns/adaptive) — полная модель адаптивных компонентов `@ds`.
- [Оформление — тема, бренд, плотность](/patterns/theme) — модель провайдера темы.
- [Локализация — строки в пакетах](/patterns/localization) — модель провайдера локали.
- [Порталы — корневой DOM-узел](/patterns/portal-context) — модель провайдера портала.
- **Locale** — рантайм локализации.
- **PortalContext** — корневой DOM-узел для порталов.
## Раскладки и брейкпоинты

`layoutType` выбирается по ширине окна (`max-width` в px). Дефолтные пороги:

| layoutType | Порог | Назначение |
|---|---|---|
| `mobile` | ≤ 767 px | Телефон — единственный тир, уходящий в mobile-ветку (`BottomSheet`). |
| `tablet` | ≤ 1023 px | Планшет — десктопная ветка. |
| `desktopSmall` | ≤ 1279 px | Узкий десктоп — десктопная ветка. |
| `desktop` | ≤ 1439 px | Десктоп — десктопная ветка. SSR-baseline. |

Ширина ≥ 1440 px (`large`) достижима только через `useAdaptiveMatchMedia()` — в `layoutType` она не маппится. Пороги переопределяются на уровне приложения через `useAdaptiveBootstrap({ breakpoints })`.

На сервере и до монтирования раскладка равна `desktop` (`DEFAULT_LAYOUT_TYPE`) — это baseline без доступа к вьюпорту, а не «всегда desktop». На сервере её можно выбрать по request-User-Agent (см. рецепт «Сервер» ниже). Зафиксировать раскладку для поддерева можно вложенным `<AdaptiveProvider layoutType=…>` или `withLayoutType(...)` — он затеняет внешний контекст.

## Подписка на раскладку

Раскладку **вычисляют один раз в корне** и раздают через `AdaptiveProvider`; компоненты её только **читают**. Утилиты:

**Реактивный корень (CSR).** `useAdaptiveBootstrap()` вычисляет `layoutType` по user-agent + media-query и сам переподписывается на изменения вьюпорта (resize / поворот). Результат скармливается провайдеру:

```tsx
import { AdaptiveProvider, useAdaptiveBootstrap } from '@ds/adaptive'

function Root({ app }) {
  const { layoutType } = useAdaptiveBootstrap() // ре-вычисляется при смене ширины окна
  return <AdaptiveProvider layoutType={layoutType}>{app}</AdaptiveProvider>
}
```

**Чтение в компоненте.** `useAdaptiveLayout()` берёт раскладку из ближайшего `AdaptiveProvider` и ре-рендерит потребителя при её смене:

```tsx
import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive'

const { layoutType } = useAdaptiveLayout()
if (isMobileLayout(layoutType)) { /* mobile-ветка */ }
```

**Произвольные media-query.** Для условий вне `layoutType` (например, тир `large` ≥ 1440 px) — `useAdaptiveMatchMedia()`.

**Сервер (SSR по User-Agent).** На сервере `navigator` недоступен, поэтому `useAdaptiveBootstrap` отдаёт `desktop`. Чтобы убрать flip при гидрации — резолвьте раскладку из request-UA через `getAdaptive` из серверобезопасного входа `@ds/adaptive/ssr` (без React-импортов) и передайте статикой:

```tsx
import { getAdaptive, INITIAL_ADAPTIVE_QUERIES_VALUE } from '@ds/adaptive/ssr'

const { layoutType } = getAdaptive(INITIAL_ADAPTIVE_QUERIES_VALUE, headers().get('user-agent'))
// <AdaptiveProvider layoutType={layoutType}>{children}</AdaptiveProvider>
```
