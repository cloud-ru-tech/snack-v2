# Accordion

Пакет `@design-system/accordion` предоставляет контейнер **`Accordion`**, который синхронизирует раскрытие дочерних секций **`Accordion.CollapseBlockPrimary`**, **`Accordion.CollapseBlockSecondary`** и **`Accordion.CollapseBlockTertiary`**. Состояние передаётся через `ToggleGroup` из `@design-system/toggles`. Секции оформлены по макету (акриловые уровни, типографика, шеврон).

## Installation

```bash
npm install @design-system/accordion
# or
yarn add @design-system/accordion
# or
pnpm add @design-system/accordion
```

## Exports



## Live examples

### CollapseBlockPrimary

```tsx
import { ExamplePrimary } from '@design-system/accordion';

<ExamplePrimary client:load />
```

### CollapseBlockSecondary

```tsx
import { ExampleSecondary } from '@design-system/accordion';

<ExampleSecondary client:load />
```

### CollapseBlockTertiary

```tsx
import { ExampleTertiary } from '@design-system/accordion';

<ExampleTertiary client:load />
```


## Usage

### Primary с видом обложки и шевроном

```tsx
import { Accordion } from '@design-system/accordion';

export function Example() {
  return (
    <Accordion>
      <Accordion.CollapseBlockPrimary
        id="section-1"
        title="Документы"
        view="outline"
        appearance="neutral"
        chevron="after"
      >
        Список документов
      </Accordion.CollapseBlockPrimary>
    </Accordion>
  );
}
```

### Tertiary (без view и appearance)

```tsx
import { Accordion } from '@design-system/accordion';

export function Example() {
  return (
    <Accordion>
      <Accordion.CollapseBlockTertiary id="sub-1" title="Пункт">
        Текст
      </Accordion.CollapseBlockTertiary>
    </Accordion>
  );
}
```

## Props



## Best Practices

1. **Уровень** — Primary для верхнего уровня страницы, Secondary для вложенных блоков, Tertiary для плотных списков и подпунктов.
2. **Подзаголовок** — используйте `subTitle` для вторичной информации, не дублируйте её в `title`.
3. **`keepMounted`** — отключайте (`false`), если тяжёлый контент не должен оставаться в DOM в свёрнутом виде (учитывайте задержку анимации).

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
