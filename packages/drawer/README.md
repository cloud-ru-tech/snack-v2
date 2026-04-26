# Drawer

`@ds/drawer` — Боковая/нижняя панель поверх страницы с пресетной шапкой, телом и футером; низкоуровневая сборка — через DrawerCustom.

Панель, выезжающая со стороны экрана — для дополнительного контекста, фильтров, форм и пошаговых сценариев. `Drawer` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Полный контроль над разметкой — через `DrawerCustom` и его субкомпоненты `DrawerCustom.Header`, `.Body`, `.Footer`.

## Когда использовать

- Форма, фильтры или детали, которые не помещаются в основной поток и требуют отдельного контекста.
- Пошаговый сценарий с кнопкой «назад» в шапке — возвращение между экранами без потери контекста.
- Нижний лист (bottom sheet) для компактных действий и подтверждений на мобильных устройствах.
- Стек из двух-трёх связанных панелей через `nestedDrawer`.

Когда **не** нужен: критическое подтверждение, блокирующее остальной интерфейс (берите `Modal`), всплывающий поповер рядом с элементом (`Popover`), тост-уведомление (не блокирует UI).

### Расположение (`position`)

| Position | Когда |
|----------|-------|
| `right` | Дефолтная правая боковая панель — фильтры, детали, формы |
| `left` | Навигация, древовидные списки на десктопе |
| `bottom` | Bottom sheet на мобильных устройствах (с `heightAuto`) |
| `top` | Уведомления и баннеры, занимающие верхнюю область |

### Размер (`width`)

Предустановленные пресеты доступны только для `position: 'left' | 'right'`.

| Width | Когда |
|-------|-------|
| `s` | Подтверждения, короткие формы — один-два поля |
| `m` | Формы средней плотности, карточки с медиа |
| `l` | Сложные формы, двухколоночные макеты |

Для нестандартной ширины можно передать число (`width={480}`) или строку с единицами (`width='40rem'`).

### Высота по контенту (`heightAuto`)

Работает только при `position: 'top' | 'bottom'` — высота панели рассчитывается по содержимому, с максимумом в высоту контейнера. Подходит для bottom sheet'ов и верхних баннеров.

### Do / Don't

- ✅ Один `primary`-акцент в футере — основное действие.
- ❌ Два `primary`-акцента в футере.
- ✅ `position='bottom'` + `heightAuto` — для мобильных листов.
- ❌ `position='left' | 'right'` + `heightAuto` — проп игнорируется, создаёт ложные ожидания.
- ✅ Медиа в `media` — когда оно несёт смысл сценария (онбординг, пустое состояние).
- ❌ Декоративная иллюстрация в панели ради украшения.
- ✅ Кнопка «назад» (`onBackButtonClick`) — для многошаговых сценариев внутри одного Drawer.
- ❌ Кнопка «назад» там, где шага только один.
- ✅ Вложенный `nestedDrawer` — для связанных контекстов (список → детали).
- ❌ Трёх-уровневый стек вложенных Drawer: пользователь теряется в глубине.

### Figma

<FigmaEmbed node={FIGMA_DRAWER} title='Drawer — Snack Ui Kit variables' />

### Установка

```bash
pnpm add @ds/drawer
```

```ts
import { Drawer, DrawerCustom, POSITION, WIDTH } from '@ds/drawer'
```

### Примеры использования

<Example title='Базовое использование' description='Контролируемое open/onClose, footer из `ButtonGroup`.' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='Критическое действие' description='Critical primary, neutral outline secondary.' code={WithFooterSrc}>
  <WithFooter client:load />
</Example>

<Example title='С медиа-слотом' description='`media` рендерится над шапкой на всю ширину панели.' code={WithMediaSrc}>
  <WithMedia client:load />
</Example>

<Example title='Bottom sheet' description='`position="bottom"` + `heightAuto` — высота по контенту.' code={HeightAutoSrc}>
  <HeightAuto client:load />
</Example>

<Example title='Вложенный Drawer' description='Родитель сдвигается влево при открытии дочернего.' code={NestedDrawerSrc}>
  <NestedDrawer client:load />
</Example>

<Example title='DrawerCustom — ручная композиция' description='Произвольная разметка: Header + Body + Footer.' code={CustomCompositionSrc}>
  <CustomComposition client:load />
</Example>

### Портал и контейнер

Панель рендерится через портал `rc-drawer` в `document.body`. Переопределяется пропсом `container` (HTMLElement или CSS-селектор) — удобно при встраивании Drawer в ограниченную область (превью в дизайн-системе, storybook-матрицы).

### Закрытие

- Клик по затемнению (`showBlackout=true` — по умолчанию).
- Клавиша `Escape` (`showBlackout=true`).
- Кнопка закрытия в правом верхнем углу.
- `closeOnPopstate` (по умолчанию через `useModalOpenState`) — автоматическое закрытие при history navigation.

### Props

#### Drawer

<PropsTable data={drawerDoc.Drawer} />

#### DrawerCustom

Продвинутая сборка — см. [отдельную страницу](./drawer-custom).

### Storybook

<StorybookEmbed storyId='components-drawer--playground' height={480} client:load />

## Доступность

- Кнопка закрытия имеет `aria-label="close drawer"`.
- `keyboard=true` (при `showBlackout=true`) — закрытие по `Escape`.
- После закрытия фокус возвращается на элемент, с которого было открытие.
- Для `DrawerCustom` без видимого заголовка задайте доступное имя вручную: `aria-label` или `aria-labelledby`.
- Следите за видимым контрастом шапки — на медиа-изображении может потребоваться оверлей.

## DrawerCustom

Низкоуровневая сборка Drawer — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`DrawerCustom` — низкоуровневая версия `Drawer`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `DrawerCustom`, когда стандартной шапки из `Drawer` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

## Когда использовать

- Стандартная шапка / футер из `Drawer` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одной панели.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Drawer` — он дешевле в поддержке и даёт консистентные отступы.

## Пример

<Example title='Ручная композиция' description='Header + Body + Footer собираются вручную.' code={CustomCompositionSrc}>
  <CustomComposition client:load />
</Example>

## Субкомпоненты

### DrawerCustom.Header

Шапка с заголовком, подзаголовком, кнопкой «назад» и слотом после заголовка.

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

### DrawerCustom.Body

Прокручиваемое тело панели (использует `@ds/scroll`).

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

### DrawerCustom.Footer

Фиксированный футер для групп кнопок и основных действий.

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

<StorybookEmbed storyId='components-drawercustom--playground' height={480} client:load />

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

## Drawer

```tsx
import { Drawer } from '@ds/drawer'

export function Example() {
  return <Drawer showBlackout width="'s'">Click me</Drawer>
}
```

### Props

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
