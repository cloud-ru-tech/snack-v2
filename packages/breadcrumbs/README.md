# Breadcrumbs

Навигационная цепочка «хлебных крошек»: показывает путь до текущей страницы. При узком контейнере сама подбирает отображение — полный текст, короткий ярлык (`shortLabel`), многоточие или свёртка средних пунктов в выпадающий список.

## Installation

```bash
npm install @design-system/breadcrumbs
# or
yarn add @design-system/breadcrumbs
# or
pnpm add @design-system/breadcrumbs
```

## Exports

```typescript
import {
  type Item,
  setNonce
} from '@design-system/breadcrumbs';
```

## Live examples

### Базовая цепочка

```tsx
import { Breadcrumbs } from '@design-system/breadcrumbs';

export function Example() {
  return (
    <Breadcrumbs
      items={[
        { id: '1', label: 'Главная', href: '#' },
        { id: '2', label: 'Раздел', href: '#' },
        { id: '3', label: 'Текущая страница' },
      ]}
    />
  );
}
```

### Размеры

```tsx
import { Breadcrumbs } from '@design-system/breadcrumbs';

const items = [
  { id: '1', label: 'Каталог', href: '#' },
  { id: '2', label: 'Страница' },
];

export function SizeS() {
  return <Breadcrumbs size="s" items={items} />;
}

export function SizeXs() {
  return <Breadcrumbs size="xs" items={items} />;
}
```

### Кастомный разделитель

```tsx
import { Breadcrumbs } from '@design-system/breadcrumbs';

export function Example() {
  return (
    <Breadcrumbs
      separator=" / "
      items={[
        { id: '1', label: 'A', href: '#' },
        { id: '2', label: 'B', href: '#' },
        { id: '3', label: 'C' },
      ]}
    />
  );
}
```

### Иконка у первого пункта

```tsx
import { Breadcrumbs } from '@design-system/breadcrumbs';
import { PlaceholderSVG } from '@design-system/icons';

export function FirstItemIconOnly() {
  return (
    <Breadcrumbs
      firstItemIconOnly
      items={[
        { id: '1', label: 'Главная', href: '#', icon: PlaceholderSVG },
        { id: '2', label: 'Проекты', href: '#' },
        { id: '3', label: 'Сводка' },
      ]}
    />
  );
}
```


## Usage



## Props

### BreadcrumbsProps
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `Item[]` | - | Массив айтемов |
| className | `string` | - | CSS-класс |
| separator | `string` | › | Разделитель между пунктами |
| size | enum Size: `"xs"`, `"s"` | s | Размер |
| firstItemIconOnly | `boolean` | false | Использовать иконку без лейбла в первом айтеме |
| inactiveLastItem | `boolean` | false | Делает некликабельным последний элемент, даже если для него переданы `href` или `onClick` |

## Best Practices

1. **Уникальные `id`** — стабильные ключи для внутренней логики и тестов.
2. **`shortLabel`** — задавайте для длинных названий, чтобы цепочка оставалась понятной в сжатом режиме.
3. **Текущая страница** — без `href`/`onClick`; не дублируйте заголовок страницы сомнительными ссылками на «саму себя», если это не нужно для SEO.
4. **`inactiveLastItem`** — когда последний элемент приходит из API с URL, но в UI он должен быть только текстом.
5. **Ширина контейнера** — крошки реагируют на ширину родителя; избегайте обрезки без учёта отступов макета.
6. **Разделитель** — держите строку короткой и нейтральной для скринридеров (визуальный символ, а не дублирование всей навигации текстом).

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
