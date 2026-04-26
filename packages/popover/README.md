# Popover

`@ds/popover` — Плавающая панель с произвольным содержимым рядом с триггером — для меню, подсказок, форм и вложенных действий.

Плавающий контейнер со стрелкой-указателем, открывающийся рядом с элементом-триггером. Используется для дополнительных действий, форм, подсказок и вложенных меню. Позиционирование — через `@ds/popover-private` (Floating UI), со стрелкой и auto-flip при нехватке места.

## Когда использовать

- Выпадающий блок действий над таблицей или карточкой.
- Inline-форма («Переименовать», «Добавить метку»).
- Контекстная подсказка, которой мало пространства Tooltip'а.

Когда **не** нужен: модальный диалог (берите Modal), статичная подсказка с коротким текстом (берите Tooltip), выпадающее меню выбора (берите Select/DropdownMenu).

### Placement

| Placement | Сценарий |
|-----------|----------|
| `top` / `bottom` | По умолчанию — поповер над или под триггером |
| `left` / `right` | В боковых панелях, когда есть свободное пространство по горизонтали |
| `top-start`, `bottom-end` и т.п. | Выравнивание по краю триггера — для меню действий |

Компонент автоматически «переворачивается» (flip), если в выбранной стороне нет места.

### Trigger

| Trigger | Поведение |
|---------|-----------|
| `click` | Открытие по клику, закрытие по клику вне или Escape (по умолчанию) |
| `hover` | Открытие по наведению — для информационных карточек |

### Do / Don't

- ✅ Клик как триггер для действий и форм — пользователь контролирует открытие.
- ❌ Hover-триггер для форм и меню — легко случайно открыть/закрыть.
- ✅ Стрелка включена (`hasArrow=true` по умолчанию) — визуальная связь с триггером.
- ❌ Дублирование информации между триггером и поповером.
- ✅ Закрытие по Escape и клику вне — поведение по умолчанию, не отключайте без причины.

### Установка

```bash
pnpm add @ds/popover
```

```ts
import { Popover, PLACEMENT, TRIGGER } from '@ds/popover'
import '@ds/popover/style.css'
```

### Примеры использования

<Example title='Базовый Popover' description='Клик-триггер, placement=top.' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='Триггер по наведению' description='trigger="hover" — подходит для информационных карточек.' code={HoverTriggerSrc}>
  <HoverTrigger client:load />
</Example>

<Example title='Placement bottom-end' description='Выравнивание поповера по правому краю триггера.' code={PlacementSrc}>
  <Placement client:load />
</Example>

### Props

<PropsTable data={popoverDoc.Popover} />

### Storybook

<StorybookEmbed storyId='components-popover--playground' height={480} client:load />

## Доступность

- Триггер и содержимое поповера — обычные DOM-узлы: реализуйте `aria-haspopup`, `aria-expanded` на триггере самостоятельно, если компонент используется как меню.
- Закрытие по Escape и клик-outside включено по умолчанию (`closeOnEscapeKey`, `outsideClick`).
- Фокус после открытия остаётся на триггере — вложенные интерактивные элементы достигаются Tab'ом.
- Стрелка (`hasArrow`) помечена `aria-hidden` — не озвучивается скринридерами.

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
