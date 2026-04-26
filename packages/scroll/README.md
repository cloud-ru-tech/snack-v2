# Scroll

`@ds/scroll` — Контейнер с кастомными скроллбарами, размерами s/m, стратегиями скрытия, автоскролом и опциональным ресайзом.

`Scroll` — контейнер с кастомными скроллбарами поверх [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/). Оборачивает любой контент и подменяет нативные скроллбары на стилизованные — в двух размерах, с управляемыми стратегиями скрытия, автоскролом к краю и опциональным ресайзом.

## Демо
<ScrollDemo client:visible />

## Когда использовать
- Прокручиваемые области внутри интерфейса: боковые панели, чаты, логи, списки, таблицы в карточках.
- Контент с динамической высотой, где нужно прилипание к низу (чат, live-лог) — через `autoscrollTo='bottom'`.
- Контейнер, размер которого пользователь регулирует сам — через `resize='both' | 'horizontal' | 'vertical'`.

Когда **не** использовать:

- На весь `<body>` — нативный скролл окна лучше для SEO, клавиатуры и системных жестов.
- Внутри виртуализированных списков — они уже управляют своим скроллом.
- Для коротких блоков, которые гарантированно помещаются — лишний контейнер и JS без выгоды.

### Size
Толщина скролл-бара: `s` — дефолт для панелей и плотных списков; `m` — для крупных поверхностей, где нужен более заметный/удобный для мыши бар.

### Bar hide strategy
Когда скрывать скролл-бар: `never` — всегда видим; `leave` — скрыть при уводе курсора; `scroll` — видим только во время прокрутки; `move` — видим при движении курсора над областью.

### Resize
Разрешение пользовательского resize через CSS `resize`: `none` (дефолт), `horizontal`, `vertical`, `both`.

### Autoscroll to
Автоприлипание к краю при появлении нового контента: `bottom` — для чатов и лент; `right` — для горизонтальных лент.

## Установка
```bash
pnpm add @ds/scroll
```

```ts
import { Scroll } from '@ds/scroll'
```

## Примеры использования
<Example title='Базовый скролл' description='Оборачивает любой контент; родитель задаёт высоту.' code={BasicSrc}>
  <Basic client:visible />
</Example>

<Example title='Компактный размер s' description='Для узких областей и popover-ов.' code={SmallSizeSrc}>
  <SmallSize client:visible />
</Example>

<Example title='Скроллбар появляется при наведении' description='`barHideStrategy="leave"` — спокойный, не отвлекающий UI.' code={HideOnLeaveSrc}>
  <HideOnLeave client:visible />
</Example>

<Example title='Ресайзируемый контейнер' description='`resize="both"` — пользователь тянет за угол.' code={ResizableSrc}>
  <Resizable client:visible />
</Example>

<Example title='Автоскрол вниз' description='Для чатов и live-логов — прилипание к низу при добавлении сообщений.' code={AutoscrollBottomSrc}>
  <AutoscrollBottom client:visible />
</Example>

## Props
<PropsTable data={scrollDoc.Scroll} />

## Storybook
<StorybookEmbed storyId='components-scroll--playground' height={480} />

## Scroll

```tsx
import { Scroll } from '@ds/scroll'

export function Example() {
  return <Scroll clickScrolling barHideStrategy="leave" resize="none">Click me</Scroll>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `className` | `string` | — |  |
| `size` | `"s"` \| `"m"` | `m` | Размер скролбаров |
| `clickScrolling` | `boolean` | `true` | Скролить ли по клику в скроллбар. |
| `autoscrollTo` | `"bottom"` \| `"right"` | — | Включает автоскрол при маунте и изменении размера контента:
<br /> - `bottom` - автоскрол вниз,
<br /> - `right` - автоскрол вправо, |
| `barHideStrategy` | `"never"` \| `"leave"` \| `"scroll"` \| `"move"` | `leave` | Управление скрытием скролл баров:
<br /> - `Never` - показывать всегда
<br /> - `Leave` - скрывать когда курсор покидает компонент
<br /> - `Scroll` - показывать только когда происходит скроллинг
<br /> - `Move` - показывать при движении курсора над компонентом |
| `onScroll` | `((event?: Event) => void)` | — | Колбек события скрола. |
| `resize` | `"none"` \| `"horizontal"` \| `"vertical"` \| `"both"` | `none` | Настройка возможности регулировать Scroll-контейнер:
<br /> - `None` - нельзя изменять размер
<br /> - `Horizontal` - можно изменять размер только по горизонтали
<br /> - `Vertical` - можно изменять размер только по вертикали
<br /> - `Both` - можно изменять размер в обеих координатах |
| `untouchableScrollbars` | `boolean` | `false` | Отключает возможность взаимодействовать со скролбарами мышью. |
| `paddingAbsolute` | `boolean` | — | Должны ли паддинги быть абсолютными |
| `onInitialized` | `(() => void)` | — | Коллбэк вызывающийся на инициализацию скролла |

## setNonce

```tsx
import { setNonce } from '@ds/scroll'

export function Example() {
  return <setNonce>Click me</setNonce>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
