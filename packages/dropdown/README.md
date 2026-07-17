# Dropdown

`@ds/dropdown` — Выпадающий блок с произвольным контентом и встроенными состояниями loading / not-found / no-data / data-error.

Выпадающий блок над триггером: произвольный контент (меню, фильтры, справочная информация) + встроенные состояния `loading / not-found / no-data / data-error` через `state`. Поверх `PopoverPrivate` — те же пропсы позиционирования, плюс готовая визуальная обработка асинхронных случаев.

## Когда использовать
- Меню действий над кнопкой (экспорт, фильтры, настройки).
- Асинхронные подсказки и suggestions — встроенный `state` скрывает ручное ветвление UI.
- Композитные виджеты: селекторы, комбобоксы, авторасшифровки.

Когда **не** нужен `Dropdown`: для одиночного подсказывающего текста используйте `Tooltip`, для модального выбора — `Modal` или `Popover`.

## Анатомия

### State
Встроенные состояния контента, позволяющие не ветвить UI вручную: `loading` — идёт запрос (скелетон/спиннер), `no-data` — у источника пусто (первая загрузка), `not-found` — пользователь ввёл фильтр и ничего не нашлось, `data-error` — запрос упал (с опцией повтора).

## Установка
```bash
pnpm add @ds/dropdown
```

```ts
import { Dropdown, STATE } from '@ds/dropdown'
```

## Примеры использования
### Базовый Dropdown

```tsx
import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export function Basic() {
  return (
    <Dropdown content={<div style={{ padding: 12 }}>Контент меню</div>}>
      <Button label='Открыть' />
    </Dropdown>
  );
}
```

### Открытое меню для визуальной сверки

Управляемый режим — open

```tsx
import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';

export function OpenForReview() {
  return (
    <Dropdown content={<div style={{ padding: 12 }}>Видимое содержимое</div>}>
      <Button label='Триггер' />
    </Dropdown>
  );
}
```

### Состояние loading

```tsx
import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';

export function Loading() {
  return (
    <Dropdown state={{ type: STATE.Loading }} content={null}>
      <Button label='Загрузка' />
    </Dropdown>
  );
}
```

### Состояние not-found с действием

```tsx
import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';

export function NotFound() {
  return (
    <Dropdown
      state={{
        type: STATE.NotFound,
        content: 'Ничего не нашли',
        actionLabel: 'Сбросить фильтры',
        onActionClick: () => {},
      }}
      content={null}
    >
      <Button label='Поиск' />
    </Dropdown>
  );
}
```

## Props
**DropdownProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bodyPadding` | `boolean` | `true` | Паддинги body. `false` — убрать (контент во всю ширину; на mobile прокидывается в `BottomSheet`). |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `container` | `RefObject<HTMLElement \| null>` | — | Контейнер портала (ref). Переопределяет `PortalContext` для этого инстанса — <br/> по аналогии с `container` у Modal/Drawer. По умолчанию берётся из `PortalContextProvider`. |
| `content` | `ReactNode` | — | Содержимое внутри поповера (body) |
| `data-test-id` | `string` | — |  |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| `fallbackPlacements` | `Placement` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `footer` | `ReactNode` | — | Слот футера (bottomBar) |
| `footerDivider` | `boolean` | — | Divider между body и футером |
| `headerDivider` | `boolean` | — | Divider между шапкой и body |
| `headline` | `ReactNode` | — | Заголовок в шапке (topBar) |
| `headlineHint` | `ReactNode` | — | Подсказка-иконка рядом с заголовком (потребитель собирает, напр. `<QuestionTooltip />`) |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `outsideClick` | `OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `search` | `ReactNode` | — | Слот поиска в шапке (topBar) |
| `state` | `ActionButtonProps` \| `BlockProps` \| `BlockPropsWithIcon` \| `DropdownState` | — | Состояние |
| `stopPropagation` | `StopPropagationHandlers` | `{ onClick: true, onMouseDown: true, onMouseUp: true, onTouchStart: true, onTouchEnd: true, onTouchMove: true }` | Гасить всплытие pointer/touch-событий с floating-контейнера (`stopPropagation`). <br/> По умолчанию все хендлеры включены. Для drag&drop внутри поповера отключите <br/> `onMouseUp` / `onTouchEnd`, чтобы они дошли до `document`. |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `triggerRef` | `ForwardedRef<ReferenceType \| HTMLElement \| null>` | — | Ref ссылка на триггер |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `auto` | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |

#### Related types

**ActionButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionLabel` | `string \| undefined` | — | Лейбл кнопки-действия |
| `onActionClick` | `(() => void) \| undefined` | — | Действие при клике по кнопке |

**BlockProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подзаголовок |

**BlockPropsWithIcon**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подзаголовок |
| `icon` | `IconPredefinedProps` | — | Иконка |

- `DropdownState` = `{ type: typeof STATE.Loading; } | ({ type: typeof STATE.NotFound; } & ActionButtonProps & BlockProps) | ({ type: typeof STATE.NoData; } & ActionButtonProps & BlockPropsWithIcon) | ({ type: typeof STATE.DataError; } & ActionButtonProps & BlockPropsWithIcon)`

## Адаптивность

`Dropdown` — адаптивный компонент с переключением поверхности (surface-swap). Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — popover над триггером с позиционированием через floating-ui.
- **mobile** — контент рендерится в `BottomSheet` из `@ds/bottom-sheet` (панель снизу со свайпом для закрытия).

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <Dropdown content={…}>…</Dropdown>
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { Dropdown } from '@ds/dropdown'

  const MobileDropdown = withLayoutType(Dropdown, 'mobile')
  ```

### Платформенные пропы

Часть пропов управляет позиционированием desktop-popover'а и на mobile молча игнорируется (у `BottomSheet` своё позиционирование снизу). Таблица синхронизирована с type-level JSDoc у `DropdownProps`.

| Пропы | desktop | mobile |
|-------|---------|--------|
| `placement`, `widthStrategy`, `offset`, `fallbackPlacements` | используется | игнорируется |
| `hoverDelayOpen`, `hoverDelayClose`, `closeOnEscapeKey`, `triggerClickByKeys`, `outsideClick` | используется | игнорируется |
| `disableSpanWrapper`, `triggerClassName`, `triggerRef`, `container` | используется | игнорируется |
| `content`, `headline`, `headlineHint`, `search`, `footer`, `headerDivider`, `footerDivider` | используется | используется |
| `state`, `open`, `onOpenChange`, `closeOnPopstate`, `className` | используется | используется |

На mobile портал `BottomSheet` берётся из `@ds/portal-context`, поэтому `container` не действует.

Подробнее о модели адаптивности — **Adaptive**.
