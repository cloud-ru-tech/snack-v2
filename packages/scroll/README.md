# Scroll

`@ds/scroll` — Контейнер с кастомными скроллбарами, размерами s/m, стратегиями скрытия, автоскролом и опциональным ресайзом.

`Scroll` — контейнер с кастомными скроллбарами поверх [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/). Оборачивает любой контент и подменяет нативные скроллбары на стилизованные — в двух размерах, с управляемыми стратегиями скрытия, автоскролом к краю и опциональным ресайзом.

## Когда использовать

- Прокручиваемые области внутри интерфейса: боковые панели, чаты, логи, списки, таблицы в карточках.
- Контент с динамической высотой, где нужно прилипание к низу (чат, live-лог) — через `autoscrollTo='bottom'`.
- Контейнер, размер которого пользователь регулирует сам — через `resize='both' | 'horizontal' | 'vertical'`.

Когда **не** использовать:

- На весь `<body>` — нативный скролл окна лучше для SEO, клавиатуры и системных жестов.
- Внутри виртуализированных списков — они уже управляют своим скроллом.
- Для коротких блоков, которые гарантированно помещаются — лишний контейнер и JS без выгоды.

### Размеры

| Size | Когда                                                             |
| ---- | ----------------------------------------------------------------- |
| `s`  | Компактные области: дропдауны, popover, узкие сайдбары.            |
| `m`  | Основной размер: карточки, панели, основной контент (по умолчанию). |

<Example title='Размер s'>
  <SmallSize client:load />
</Example>

### Стратегии скрытия скроллбара

| Value    | Поведение                                            |
| -------- | ---------------------------------------------------- |
| `never`  | Скроллбары показаны всегда.                           |
| `leave`  | Скрываются, когда курсор покидает контейнер (по умолчанию). |
| `scroll` | Видны только во время прокрутки.                      |
| `move`   | Появляются при движении курсора внутри контейнера.    |

<Example title='Скрытие при уходе курсора'>
  <HideOnLeave client:load />
</Example>

### Do / Don't

- ✅ Один `Scroll` на логическую область (панель, карточка, лог).
- ❌ Вложенные `Scroll` друг в друга — ломают траектории курсора.
- ✅ Фиксированная высота/ширина родителя — без неё контейнер не знает, когда появляться.
- ❌ `Scroll` на корневом `<body>` — теряется нативный UX окна.
- ✅ `autoscrollTo='bottom'` для чатов и логов.
- ❌ `autoscrollTo` на статичном контенте — оно ничего не даст и усложнит код.

### Установка

```bash
pnpm add @ds/scroll
```

```ts
import { Scroll } from '@ds/scroll'
import '@ds/scroll/style.css'
```

### Примеры использования

<Example title='Базовый скролл' description='Оборачивает любой контент; родитель задаёт высоту.' code={BasicSrc}>
  <Basic client:load />
</Example>

<Example title='Компактный размер s' description='Для узких областей и popover-ов.' code={SmallSizeSrc}>
  <SmallSize client:load />
</Example>

<Example title='Скроллбар появляется при наведении' description='`barHideStrategy="leave"` — спокойный, не отвлекающий UI.' code={HideOnLeaveSrc}>
  <HideOnLeave client:load />
</Example>

<Example title='Ресайзируемый контейнер' description='`resize="both"` — пользователь тянет за угол.' code={ResizableSrc}>
  <Resizable client:load />
</Example>

<Example title='Автоскрол вниз' description='Для чатов и live-логов — прилипание к низу при добавлении сообщений.' code={AutoscrollBottomSrc}>
  <AutoscrollBottom client:load />
</Example>

### States

- **Без контента, влезающего в область** — скроллбары не рендерятся даже при `barHideStrategy='never'`.
- **Ресайз** — `resize` включает нативный CSS `resize` на корне. Компонент реагирует на изменения размера через OverlayScrollbars observers.
- **Автоскрол** — `autoscrollTo='bottom'` прилипает к низу при маунте и при росте контента, пока пользователь не отскроллил вверх. `autoscrollTo='right'` — аналогично для горизонтали.

### CSP и nonce

Для CSP с `nonce` прокиньте его в OverlayScrollbars через экспорт `setNonce`:

```ts
import { setNonce } from '@ds/scroll'

setNonce(window.__CSP_NONCE__)
```

### Props

<PropsTable data={scrollDoc.Scroll} />

### Storybook

<StorybookEmbed storyId='components-scroll--playground' height={480} />

## Доступность

- Контейнер сохраняет нативный клавиатурный скролл: `PageUp/Down`, `Home/End`, стрелки — работают внутри области прокрутки.
- Скроллбары кастомные, но viewport остаётся нативным — скринридеры видят содержимое без изменений.
- `untouchableScrollbars` отключает мышь на скроллбарах; клавиатурный и колесный скролл остаются доступны.
- Проверьте контраст хендла скроллбара на вашем фоне — при нестандартной подложке может потребоваться переопределить токены темы.

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
