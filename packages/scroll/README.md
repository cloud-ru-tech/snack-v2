# Scroll

Контейнер с кастомными скроллбарами. Использует [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/), стили и размеры соответствуют дизайн-токенам из `@sbercloud/figma-variables`.

## Installation

```bash
npm install @design-system/scroll
# or
yarn add @design-system/scroll
# or
pnpm add @design-system/scroll
```

## Exports

```typescript
import {
  Scroll,
  setNonce,
  type ScrollProps,
  type Size,
  type BarHideStrategy,
  type Resize,
  type AutoscrollTo
} from '@design-system/scroll';
```

## Live examples

### Basic example

```tsx
import { Scroll } from '@design-system/scroll';

function Example() {
  return (
    <div style={{ height: 200 }}>
      <Scroll barHideStrategy='never'>
        <div>Long content...</div>
      </Scroll>
    </div>
  );
}
```

### Bar hide strategy

```tsx
import { Scroll, BAR_HIDE_STRATEGY } from '@design-system/scroll';

function Example() {
  return (
    <div style={{ height: 200 }}>
      <Scroll barHideStrategy='never'>
        <div>Scrollbars always visible.</div>
      </Scroll>

      <Scroll barHideStrategy='scroll'>
        <div>Visible only while scrolling.</div>
      </Scroll>
    </div>
  );
}
```

### Автоскролл вниз (логи, чат)

```tsx
import { Scroll, AUTOSCROLL_TO } from '@design-system/scroll';

function LogView({ entries }) {
  return (
    <div style={{ height: 300 }}>
      <Scroll
        barHideStrategy='never'
        autoscrollTo='bottom'
      >
        {entries.map((e, i) => (
          <div key={i}>{e.text}</div>
        ))}
      </Scroll>
    </div>
  );
}
```

### Resize контейнера

```tsx
import { Scroll, RESIZE } from '@design-system/scroll';

function ResizablePanel() {
  return (
    <div style={{ height: 400 }}>
      <Scroll resize='both'>
        <div>Resizable content — drag the corner to resize.</div>
      </Scroll>
    </div>
  );
}
```

### Событие скролла и инициализация

```tsx
import { Scroll } from '@design-system/scroll';

function Example() {
  return (
    <div style={{ height: 200 }}>
      <Scroll
        onScroll={(e) => console.log('scroll', e)}
        onInitialized={() => console.log('scroll ready')}
      >
        <div>Content</div>
      </Scroll>
    </div>
  );
}
```


## Usage



## Props

### ScrollProps
| name | type | default value | description |
|------|------|---------------|-------------|
| className | `string` | - | CSS-класс |
| size | enum Size: `"s"`, `"m"` | m | Размер скролбаров |
| clickScrolling | `boolean` | true | Скролить ли по клику в скроллбар. |
| autoscrollTo | enum AutoscrollTo: `"bottom"`, `"right"` | - | Включает автоскрол при маунте и изменении размера контента: <br /> - `bottom` - автоскрол вниз, <br /> - `right` - автоскрол вправо, |
| barHideStrategy | enum BarHideStrategy: `"never"`, `"leave"`, `"scroll"`, `"move"` | leave | Управление скрытием скролл баров: <br /> - `Never` - показывать всегда <br /> - `Leave` - скрывать когда курсор покидает компонент <br /> - `Scroll` - показывать только когда происходит скроллинг <br /> - `Move` - показывать при движении курсора над компонентом |
| onScroll | `(event?: Event) => void` | - | Колбек события скрола. |
| resize | enum Resize: `"none"`, `"horizontal"`, `"vertical"`, `"both"` | none | Настройка возможности регулировать Scroll-контейнер: <br /> - `None` - нельзя изменять размер <br /> - `Horizontal` - можно изменять размер только по горизонтали <br /> - `Vertical` - можно изменять размер только по вертикали <br /> - `Both` - можно изменять размер в обеих координатах |
| untouchableScrollbars | `boolean` | - | Отключает возможность взаимодействовать со скролбарами мышью. |
| paddingAbsolute | `boolean` | - | Должны ли паддинги быть абсолютными |
| onInitialized | `() => void` | - | Коллбэк вызывающийся на инициализацию скролла |
### nonceProps
| name | type | default value | description |
|------|------|---------------|-------------|

## Best Practices

1. **Задавайте высоту контейнеру** — у родителя `Scroll` должна быть явная высота (или размер через flex/grid), иначе прокрутка не появится.
2. **Автоскрол для потокового контента** — используйте `autoscrollTo="bottom"` или `autoscrollTo="right"` для логов и чатов; скролл к краю выполняется при маунте и при добавлении контента, если пользователь уже у края.
3. **Стратегия скрытия скроллбаров** — `barHideStrategy="leave"` по умолчанию уменьшает визуальный шум; для панелей настроек или таблиц можно использовать `barHideStrategy="never"`.
4. **CSP и nonce** — при строгой Content-Security-Policy используйте `setNonce(nonce)` из пакета перед первым рендером Scroll, чтобы разрешить инлайн-стили OverlayScrollbars.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
