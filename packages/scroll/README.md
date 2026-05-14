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

## Анатомия

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
### Базовый скролл

Оборачивает любой контент; родитель задаёт высоту.

```tsx
import { Scroll } from '@ds/scroll';

export function Basic() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Строка контента {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
```

### Компактный размер s

Для узких областей и popover-ов.

```tsx
import { Scroll } from '@ds/scroll';

export function SmallSize() {
  return (
    <div style={{ height: 180, width: 280 }}>
      <Scroll size='s'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i}>Пункт {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
```

### Скроллбар появляется при наведении

`barHideStrategy="leave"` — спокойный, не отвлекающий UI.

```tsx
import { Scroll } from '@ds/scroll';

export function HideOnLeave() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll barHideStrategy='leave'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Строка {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
```

### Ресайзируемый контейнер

`resize="both"` — пользователь тянет за угол.

```tsx
import { Scroll } from '@ds/scroll';

export function Resizable() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll resize='both'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Контент, который можно ресайзить — {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
```

### Автоскрол вниз

Для чатов и live-логов — прилипание к низу при добавлении сообщений.

```tsx
import { Scroll } from '@ds/scroll';

export function AutoscrollBottom() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll autoscrollTo='bottom'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i}>Сообщение {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
```

## Props
**ScrollProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoscrollTo` | `"bottom"` \| `"right"` | — | Включает автоскрол при маунте и изменении размера контента: <br/> <br /> - `bottom` - автоскрол вниз, <br/> <br /> - `right` - автоскрол вправо, |
| `barHideStrategy` | `"leave"` \| `"move"` \| `"never"` \| `"scroll"` | `leave` | Управление скрытием скролл баров: <br/> <br /> - `Never` - показывать всегда <br/> <br /> - `Leave` - скрывать когда курсор покидает компонент <br/> <br /> - `Scroll` - показывать только когда происходит скроллинг <br/> <br /> - `Move` - показывать при движении курсора над компонентом |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `clickScrolling` | `boolean` | `true` | Скролить ли по клику в скроллбар. |
| `data-test-id` | `string` | — |  |
| `onInitialized` | `(() => void)` | — | Коллбэк вызывающийся на инициализацию скролла |
| `onScroll` | `((event?: Event) => void)` | — | Колбек события скрола. |
| `overflow` | `{ x?: "scroll" \| "hidden" \| "visible" \| "visible-hidden" \| "visible-scroll"; y?: "scroll" \| "hidden" \| "visible" \| "visible-hidden" \| "visible-scroll"; } \| undefined` | — | Поведение overflow по осям. По умолчанию OverlayScrollbars выставляет `scroll` <br/> на обе оси; если контента по оси быть не должно — передавай `'hidden'`. |
| `paddingAbsolute` | `boolean` | — | Должны ли паддинги быть абсолютными |
| `resize` | `"both"` \| `"horizontal"` \| `"none"` \| `"vertical"` | `none` | Настройка возможности регулировать Scroll-контейнер: <br/> <br /> - `None` - нельзя изменять размер <br/> <br /> - `Horizontal` - можно изменять размер только по горизонтали <br/> <br /> - `Vertical` - можно изменять размер только по вертикали <br/> <br /> - `Both` - можно изменять размер в обеих координатах |
| `size` | `"m"` \| `"s"` | `m` | Размер скролбаров |
| `untouchableScrollbars` | `boolean` | `false` | Отключает возможность взаимодействовать со скролбарами мышью. |

#### Related types

- `AutoscrollTo` = `"bottom"` \| `"right"`

- `BarHideStrategy` = `"leave"` \| `"move"` \| `"never"` \| `"scroll"`

- `Resize` = `"both"` \| `"horizontal"` \| `"none"` \| `"vertical"`

- `Size` = `"m"` \| `"s"`
