# Counter

- Пакет `@snack-uikit/counter` предоставляет компонент `Counter` для отображения числовых индикаторов (счётчиков уведомлений, количеств элементов, метрик и т.п.) в компактном виде.
- Компонент поддерживает несколько вариантов отображения значения: обычный счётчик (`count`), формат с плюсом при превышении порога (`count-plus`) и укороченную запись в тысячах (`count-k`), управляемую пропами `variant` и `plusLimit`.
- Размер (`size`) и внешний вид (`appearance`, `color`) позволяют адаптировать счётчик под разные сценарии — от базовых меток до критических состояний.
- Форматированное значение отображается в едином контейнере без дополнительных иконок или кнопок, за счёт чего компонент хорошо подходит для использования внутри других UI-элементов (кнопок, тегов, пунктов меню).
- Figma: [`Snack UI Kit — Counter`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=7%3A4148&mode=design).


**Version:** `0.1.0`

**Package:** `@design-system/counter`

## Installation

```bash
pnpm add @design-system/counter
```

## Usage

```tsx
import { Counter } from '@snack-uikit/counter';

function Example() {
  return (
    <>
      <Counter value={9} />

      <Counter
        value={10}
        variant='count-plus'
        plusLimit={9}
        appearance='red'
        size='m'
      />

      <Counter
        value={8500}
        variant='count-k'
        color='decor'
      />
    </>
  );
}
```

## Documentation

- [Storybook](../../storybook) - Interactive examples
- [Full Documentation](./docs/index.mdx) - Complete API reference
- [Changelog](./CHANGELOG.md) - Version history
- [Migration Guide](./MIGRATION.md) - Migration instructions
