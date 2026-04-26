# Drawer

`@ds/drawer` — Пакет выезжающих панелей — компоненты Drawer и DrawerCustom с едиными токенами позиции и ширины.

Пакет `@ds/drawer` предоставляет два компонента для боковых/нижних панелей: готовую сборку `Drawer` с пресетной шапкой, телом и футером и низкоуровневый `DrawerCustom` для ручной композиции.

- ****Drawer**** — готовая панель с шапкой, прокручиваемым телом и опциональным футером. Покрывает 90% сценариев.
- ****DrawerCustom**** — низкоуровневая версия без предопределённой структуры: собирайте из `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

## Установка

```bash
pnpm add @ds/drawer
```

```ts
import { Drawer, DrawerCustom, POSITION, WIDTH } from '@ds/drawer'
```

## Смотри также

- **Modal** — центрированное модальное окно для блокирующих подтверждений.
- **Popover** — всплывающий слой рядом с триггером.

## Drawer

Панель, выезжающая со стороны экрана — пресетная шапка, прокручиваемое тело и опциональный футер.

Панель, выезжающая со стороны экрана — для дополнительного контекста, фильтров, форм и пошаговых сценариев. `Drawer` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Для ручной композиции используйте [`DrawerCustom`](./drawer-custom).

## Когда использовать
- Форма, фильтры или детали, которые не помещаются в основной поток и требуют отдельного контекста.
- Пошаговый сценарий с кнопкой «назад» в шапке — возвращение между экранами без потери контекста.
- Нижний лист (bottom sheet) для компактных действий и подтверждений на мобильных устройствах.
- Стек из двух-трёх связанных панелей через `nestedDrawer`.

Когда **не** нужен: критическое подтверждение, блокирующее остальной интерфейс (берите `Modal`), всплывающий поповер рядом с элементом (`Popover`), тост-уведомление (не блокирует UI).

## Figma
<FigmaEmbed node={FIGMA_DRAWER} title='Drawer — Snack Ui Kit variables' />

## Установка
```bash
pnpm add @ds/drawer
```

```ts
import { Drawer, POSITION, WIDTH } from '@ds/drawer'
```

## Примеры использования
<Example title='Базовое использование' description='Контролируемое open/onClose, footer из `ButtonGroup`.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Критическое действие' description='Critical primary, neutral outline secondary.' code={WithFooterSrc}>
  <WithFooter client:visible />
</Example>

<Example title='С медиа-слотом' description='`media` рендерится над шапкой на всю ширину панели.' code={WithMediaSrc}>
  <WithMedia client:visible />
</Example>

<Example title='Bottom sheet' description='`position="bottom"` + `heightAuto` — высота по контенту.' code={HeightAutoSrc}>
  <HeightAuto client:visible />
</Example>

<Example title='Вложенный Drawer' description='Родитель сдвигается влево при открытии дочернего.' code={NestedDrawerSrc}>
  <NestedDrawer client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `position` | `"left"` \| `"right"` \| `"top"` \| `"bottom"` | — | Расположение |
| `width` | `string | number` | `'s'` | Ширина (только при position: "left" | "right") |
| `heightAuto` | `boolean` | `false` | Высота панели по контенту (только при `position: "top" | "bottom"`).
При `position: "left" | "right"` не используется — поведение и ширина задаются только `width` (`'s' | 'm' | 'l'` или число/строка). |
| `className` | `string` | — | CSS-класс для элемента с контентом
CSS-класс |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `push` | `boolean | PushConfig` | — | Смещение при открытии "вложенного" компонента |
| `container` | `string | HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `nestedDrawer` | `(ReactElement<DrawerCustomProps, string | JSXElementConstructor<any>> & ReactElement<DrawerProps, string | JSXElementConstructor<...>>)` | — | Вложенный Drawer |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `footer` | `(ReactElement<any, string | JSXElementConstructor<any>> & (string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<...> | ReactPortal | null))` | — | Футер |
| `title` | `ReactNode` | — | Заголовок |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке "назад". Отсутствие скрывает кнопку |
| `content` | `ReactNode` | — | Контент |
| `media` | `ReactNode` | — | Медиа-контент |

## Storybook
<StorybookEmbed storyId='components-drawer-drawer--playground' height={480} />

## DrawerCustom

Низкоуровневая сборка Drawer — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`DrawerCustom` — низкоуровневая версия `Drawer`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `DrawerCustom`, когда стандартной шапки из `Drawer` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

## Когда использовать

- Стандартная шапка / футер из `Drawer` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одной панели.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Drawer` — он дешевле в поддержке и даёт консистентные отступы.

## Установка

```bash
pnpm add @ds/drawer
```

```ts
import { DrawerCustom } from '@ds/drawer'
```

## Анатомия

### Position
Сторона, с которой выезжает панель: `right` — стандартный side-panel (по умолчанию), `left` — для навигации и фильтров, `top`/`bottom` — для уведомлений и bottom-sheets на мобильных.

### Width
Предустановленная ширина панели для `position: left | right`: `s` — для узких форм и фильтров, `m` — дефолт, `l` — для сложных форм и просмотрщиков. Также принимает число или строку CSS для точного контроля.

## Примеры использования

<Example title='Ручная композиция' description='Header + Body + Footer собираются вручную.' code={CustomCompositionSrc}>
  <CustomComposition client:visible />
</Example>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `position` | `"left"` \| `"right"` \| `"top"` \| `"bottom"` | — | Расположение |
| `width` | `string | number` | `'s'` | Ширина (только при position: "left" | "right") |
| `heightAuto` | `boolean` | `false` | Высота панели по контенту (только при `position: "top" | "bottom"`).
При `position: "left" | "right"` не используется — поведение и ширина задаются только `width` (`'s' | 'm' | 'l'` или число/строка). |
| `className` | `string` | — | CSS-класс для элемента с контентом |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `push` | `boolean | PushConfig` | — | Смещение при открытии "вложенного" компонента |
| `container` | `string | HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `nestedDrawer` | `ReactElement<DrawerCustomProps, string | JSXElementConstructor<any>>` | — | Вложенный Drawer |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `footer` | `ReactElement<any, string | JSXElementConstructor<any>>` | — | Футер |

## Storybook

<StorybookEmbed storyId='components-drawer-drawercustom--playground' height={480} />

## ButtonClose

```tsx
import { ButtonClose } from '@ds/drawer'

export function Example() {
  return <ButtonClose>Click me</ButtonClose>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `onClick` | `() => void` | — | Действие при клике |
| `className` | `string` | — | CSS-класс |

## DrawerBody

```tsx
import { DrawerBody } from '@ds/drawer'

export function Example() {
  return <DrawerBody>Click me</DrawerBody>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `content` | `ReactNode` | — | Контент |
| `className` | `string` | — | CSS-класс |

## DrawerCustom.Body

```tsx
import { DrawerCustom.Body } from '@ds/drawer'

export function Example() {
  return <DrawerCustom.Body>Click me</DrawerCustom.Body>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `content` | `ReactNode` | — | Контент |
| `className` | `string` | — | CSS-класс |

## DrawerCustom.Footer

```tsx
import { DrawerCustom.Footer } from '@ds/drawer'

export function Example() {
  return <DrawerCustom.Footer>Click me</DrawerCustom.Footer>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS-класс |

## DrawerCustom.Header

```tsx
import { DrawerCustom.Header } from '@ds/drawer'

export function Example() {
  return <DrawerCustom.Header>Click me</DrawerCustom.Header>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `title` | `ReactNode` | — | Заголовок |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `className` | `string` | — | CSS-класс |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке "назад". Отсутствие скрывает кнопку |

## DrawerCustomLayoutProvider

```tsx
import { DrawerCustomLayoutProvider } from '@ds/drawer'

export function Example() {
  return <DrawerCustomLayoutProvider>Click me</DrawerCustomLayoutProvider>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DrawerCustomLayoutContextValue` | — |  |

## DrawerFooter

```tsx
import { DrawerFooter } from '@ds/drawer'

export function Example() {
  return <DrawerFooter>Click me</DrawerFooter>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — | CSS-класс |

## DrawerHeader

```tsx
import { DrawerHeader } from '@ds/drawer'

export function Example() {
  return <DrawerHeader>Click me</DrawerHeader>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `title` | `ReactNode` | — | Заголовок |
| `slotAfterHeadline` | `ReactNode` | — | Слот после заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `className` | `string` | — | CSS-класс |
| `onBackButtonClick` | `(() => void)` | — | Действие при клике по кнопке "назад". Отсутствие скрывает кнопку |
