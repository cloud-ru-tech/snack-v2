# Popover

`@ds/popover` — Плавающая панель с произвольным содержимым рядом с триггером — для меню, подсказок, форм и вложенных действий.

Плавающий контейнер со стрелкой-указателем, открывающийся рядом с элементом-триггером. Используется для дополнительных действий, форм, подсказок и вложенных меню. Позиционирование — через `@ds/popover-private` (Floating UI), со стрелкой и auto-flip при нехватке места.

## Демо
<PopoverDemo client:visible />

## Когда использовать
- Выпадающий блок действий над таблицей или карточкой.
- Inline-форма («Переименовать», «Добавить метку»).
- Контекстная подсказка, которой мало пространства Tooltip'а.

Когда **не** нужен: модальный диалог (берите Modal), статичная подсказка с коротким текстом (берите Tooltip), выпадающее меню выбора (берите Select/DropdownMenu).

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
<Example title='Базовый Popover' description='Клик-триггер, placement=top.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Триггер по наведению' description='trigger="hover" — подходит для информационных карточек.' code={HoverTriggerSrc}>
  <HoverTrigger client:visible />
</Example>

<Example title='Placement bottom-end' description='Выравнивание поповера по правому краю триггера.' code={PlacementSrc}>
  <Placement client:visible />
</Example>

## Props
<PropsTable data={popoverDoc.Popover} />

## Storybook
<StorybookEmbed storyId='components-popover--playground' height={480} />

## Popover

```tsx
import { Popover } from '@ds/popover'

export function Example() {
  return <Popover placement="PLACEMENT.Top" offset="0" trigger="TRIGGER.Click" widthStrategy="auto" heightStrategy="auto" closeOnEscapeKey triggerClickByKeys>Click me</Popover>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `outsideClick` | `boolean | OutsideClickHandler` | — | Закрывать ли при клике вне поповера |
| `placement` | `"top"` \| `"left"` \| `"left-start"` \| `"left-end"` \| `"right"` \| `"right-start"` \| `"right-end"` \| `"top-start"` \| `"top-end"` \| `"bottom"` \| `"bottom-start"` \| `"bottom-end"` | `PLACEMENT.Top` | Положение поповера относительно своего триггера (children). |
| `className` | `string` | — |  |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `offset` | `number` | `0` | Отступ поповера от его триггер-элемента (в пикселях). |
| `trigger` | `"click"` \| `"hover"` \| `"focusVisible"` \| `"focus"` \| `"hoverAndFocusVisible"` \| `"hoverAndFocus"` \| `"clickAndFocusVisible"` | `TRIGGER.Click` | Условие отображения поповера:
<br/> - `click` - открывать по клику
<br/> - `hover` - открывать по ховеру
<br/> - `focusVisible` - открывать по focus-visible
<br/> - `focus` - открывать по фокусу
<br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible
<br/> - `hoverAndFocus` - открывать по ховеру и фокусу
<br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `hoverDelayOpen` | `number` | — | Задержка открытия по ховеру |
| `hoverDelayClose` | `number` | — | Задержка закрытия по ховеру |
| `widthStrategy` | `"auto"` \| `"gte"` \| `"eq"` | `auto` | Стратегия управления шириной контейнера поповера
<br/> - `auto` - соответствует ширине контента,
<br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
<br/> - `eq` - Equal, строго равен ширине таргета. |
| `heightStrategy` | `"auto"` \| `"eq"` \| `"lte"` | `auto` | Стратегия управления высотой контейнера поповера
<br/> - `auto` - соответствует высоте контента,
<br/> - `lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше,
<br/> - `eq` - Equal, строго равен высоте таргета. |
| `closeOnEscapeKey` | `boolean` | `true` | Закрывать ли по нажатию на кнопку `Esc` |
| `triggerClickByKeys` | `boolean` | `true` | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| `fallbackPlacements` | `Placement[]` | — | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| `disableSpanWrapper` | `boolean` | — | Отключает для `isValidElement` внешнюю обертку триггера
<br/>
Пригодится для элементов с `position: absolute` |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при пекреходе по истории браузера |
| `triggerRef` | `ForwardedRef<ReferenceType | HTMLElement | null>` | — | Ref ссылка на триггер |
| `children` | `ReactNode | ChildrenFunction` | — | Триггер поповера (подробнее читайте ниже) |
| `content` | `ReactNode` | — | Контент поповера (отображается внутри контейнера по макету) |
