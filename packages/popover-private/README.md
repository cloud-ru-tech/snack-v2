# PopoverPrivate

`@ds/popover-private` — Низкоуровневый popover на @floating-ui — позиционирование, стрелка, триггеры. Используется как фундамент для Tooltip, Popover, Dropdown.

`@ds/popover-private` — внутренний строительный блок: бесстилевая обёртка над `@floating-ui/react` с поддержкой `placement`, `offset`, авто-flip, стрелки и нескольких триггеров (`click`, `hover`, `focus`, controlled `open`). Поверх него собраны публичные `@ds/tooltip`, `@ds/popover`, `@ds/dropdown`. В продуктовом коде используйте их.

## Когда использовать

- Реализация нового публичного компонента, которому нужно всплывающее окно (например, контекстное меню новой формы).
- Очень специфический сценарий, который не покрыт `Tooltip`/`Popover`/`Dropdown`.

В обычной разработке — берите публичный компонент.

## Установка

```bash
pnpm add @ds/popover-private
```

```ts
import { PopoverPrivate, Arrow } from '@ds/popover-private'
```

## Props

### PopoverPrivate

**PopoverPrivateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `arrowContainerClassName` | `string` | — | CSS-класс контейнера стрелки поповера |
| `arrowElementClassName` | `string` | — | CSS-класс стрелки поповера |
| `children` | `ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `className` | `string` | — |  |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `container` | `RefObject<HTMLElement \| null>` | — | Контейнер портала (ref). Переопределяет `PortalContext` для этого инстанса — <br/> по аналогии с `container` у Modal/Drawer. По умолчанию берётся из `PortalContextProvider`. |
| `data-test-id` | `string` | — |  |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера <br/> Пригодится для элементов с `position: absolute` |
| `fallbackPlacements` | `Placement` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `hasArrow` | `boolean` | — | Параметр наличия стрелки у поповера. В размеры стрелки встроен отступ. Дополнительный отступ может быть задан параметром `offset`. У элемента стрелки нет цвета, необходимо задавать его через параметр `arrowClassName`. |
| `heightStrategy` | `"auto"` \| `"eq"` \| `"lte"` | `auto` | Стратегия управления высотой контейнера поповера <br/> - `auto` - соответствует высоте контента, <br/> - `lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше, <br/> - `eq` - Equal, строго равен высоте таргета. |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `outsideClick` | `OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `popoverContent` | `ReactNode \| ReactNode[]` | — | Контент поповера |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `triggerRef` | `ForwardedRef<HTMLElement \| ReferenceType \| null>` | — | Ref ссылка на триггер |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `auto` | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |

#### Related types

- `ChildrenFunction` = `(params: { getReferenceProps: GetReferencePropsFunc; ref: (node: ReferenceType | null) => void; }) => ReactNode`

- `OutsideClickHandler` = `(event: MouseEvent) => boolean`

- `Placement` = `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"`

- `PopoverHeightStrategy` = `"auto"` \| `"eq"` \| `"lte"`

- `PopoverWidthStrategy` = `"auto"` \| `"eq"` \| `"gte"`

- `Trigger` = `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"`

### Arrow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `arrowContainerClassName` | `string` | — |  |
| `arrowElementClassName` | `string` | — |  |
| `arrowRef` | `RefObject<HTMLDivElement \| null>` | — |  |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `x` | `number` | — |  |
| `y` | `number` | — |  |

## Смотри также

- **Tooltip**, **Popover**, **Dropdown** — публичные потребители.
