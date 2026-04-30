# popover-private

`@ds/popover-private` — 

## Arrow

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `arrowContainerClassName` | `string` | — |  |
| `arrowElementClassName` | `string` | — |  |
| `arrowRef` | `RefObject<HTMLDivElement \| null>` | — |  |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `x` | `number` | — |  |
| `y` | `number` | — |  |

## PopoverPrivate

### Props `PopoverPrivateProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `arrowContainerClassName` | `string` | — | CSS-класс контейнера стрелки поповера |
| `arrowElementClassName` | `string` | — | CSS-класс стрелки поповера |
| `children` | `ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `className` | `string` | — |  |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
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
