# Popover

`@ds/popover` — Плавающая панель с произвольным содержимым рядом с триггером — для меню, подсказок, форм и вложенных действий.

Плавающий контейнер со стрелкой-указателем, открывающийся рядом с элементом-триггером. Используется для дополнительных действий, форм, подсказок и вложенных меню. Позиционирование — через `@ds/popover-private` (Floating UI), со стрелкой и auto-flip при нехватке места.

## Когда использовать
- Выпадающий блок действий над таблицей или карточкой.
- Inline-форма («Переименовать», «Добавить метку»).
- Контекстная подсказка, которой мало пространства Tooltip'а.

Когда **не** нужен: модальный диалог (берите Modal), статичная подсказка с коротким текстом (берите Tooltip), выпадающее меню выбора (берите Select/DropdownMenu).

## Анатомия

### Placement
12 вариантов — базовая сторона (`top|right|bottom|left`) × выравнивание (`-start` по началу триггера, `-end` по концу, без суффикса — по центру). При нехватке места автоматически подменяется fallback из `DEFAULT_FALLBACK_PLACEMENTS`.

### Trigger
Источник открытия: `click` (дефолт), `hover`, `focus` / `focusVisible`, композиты `hoverAndFocus`, `hoverAndFocusVisible`, `clickAndFocusVisible` — для контролов, открываемых и мышью, и с клавиатуры.

### Popover width strategy
Ширина поповера относительно триггера: `auto` — по контенту; `gte` — не меньше триггера; `eq` — ровно как триггер.

### Popover height strategy
Высота поповера относительно доступного пространства: `auto` — по контенту; `lte` — не больше доступного; `eq` — точно по доступному.

## Установка
```bash
pnpm add @ds/popover
```

```ts
import { Popover, PLACEMENT, TRIGGER } from '@ds/popover'
```

## Примеры использования
### Базовый Popover

Клик-триггер, placement=top.

```tsx
import { Popover } from '@ds/popover';

export function Basic() {
  return (
    <Popover content='Подсказка для пользователя' placement='top' trigger='click'>
      <button type='button'>Открыть поповер</button>
    </Popover>
  );
}
```

### Триггер по наведению

trigger="hover" — подходит для информационных карточек.

```tsx
import { Popover } from '@ds/popover';

export function HoverTrigger() {
  return (
    <Popover content='Открывается при наведении' trigger='hover' placement='top'>
      <button type='button'>Наведи курсор</button>
    </Popover>
  );
}
```

### Placement bottom-end

Выравнивание поповера по правому краю триггера.

```tsx
import { Popover } from '@ds/popover';

export function Placement() {
  return (
    <Popover content='Снизу справа' placement='bottom-end' trigger='click'>
      <button type='button'>bottom-end</button>
    </Popover>
  );
}
```

## Props
**PopoverProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `className` | `string` | — |  |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `container` | `RefObject<HTMLElement \| null>` | — | Контейнер портала (ref). Переопределяет `PortalContext` для этого инстанса — <br/> по аналогии с `container` у Modal/Drawer. По умолчанию берётся из `PortalContextProvider`. |
| `content` | `ReactNode` | — | Контент поповера (отображается внутри контейнера по макету) |
| `data-test-id` | `string` | — |  |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` <br/> Работает для триггеров, которые умеют отдать свою DOM-ноду: нативные элементы, `forwardRef`-компоненты <br/> и компоненты, помеченные `withInnerRefSupport` из `@ds/utils`. Остальные всё равно получают `<span>` — <br/> без ноды поповеру не от чего считать позицию; в dev-режиме об этом печатается предупреждение. |
| `fallbackPlacements` | `Placement` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `heightStrategy` | `"auto"` \| `"eq"` \| `"lte"` | `auto` | Стратегия управления высотой контейнера поповера <br/> - `auto` - соответствует высоте контента, <br/> - `lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше, <br/> - `eq` - Equal, строго равен высоте таргета. |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `outsideClick` | `OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `stopPropagation` | `StopPropagationHandlers` | `{ onClick: true, onMouseDown: true, onMouseUp: true, onTouchStart: true, onTouchEnd: true, onTouchMove: true }` | Гасить всплытие pointer/touch-событий с floating-контейнера (`stopPropagation`). <br/> По умолчанию все хендлеры включены. Для drag&drop внутри поповера отключите <br/> `onMouseUp` / `onTouchEnd`, чтобы они дошли до `document`. |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | `click` | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `triggerRef` | `ForwardedRef<HTMLElement \| ReferenceType \| null>` | — | Ref ссылка на триггер |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `auto` | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |
