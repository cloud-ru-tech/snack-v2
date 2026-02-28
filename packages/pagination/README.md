# Pagination

Компоненты пагинации для постраничной навигации: выбор страницы по номерам с стрелками и опциональным троеточием, либо индикатор в виде точек (слайдер).

## Installation

```bash
npm install @design-system/pagination
# or
yarn add @design-system/pagination
# or
pnpm add @design-system/pagination
```

## Exports



## Live examples

### Pagination (номера страниц)

```tsx
import { Pagination } from '@design-system/pagination';

<Pagination
  total={10}
  page={1}
  onChange={(page) => console.log('Page:', page)}
/>
```

### PaginationSlider (точки)

```tsx
import { PaginationSlider } from '@design-system/pagination';

<PaginationSlider
  total={5}
  page={1}
  onChange={(page) => console.log('Slide:', page)}
/>
```


## Usage

### Pagination (базовый пример)

```tsx
import { useState } from 'react';
import { Pagination } from '@design-system/pagination';

export function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      total={100}
      page={page}
      onChange={setPage}
    />
  );
}
```

### Pagination с размерами и вариантом link

```tsx
import { Pagination, PAGINATION_SIZE, VARIANT } from '@design-system/pagination';

<Pagination
  total={20}
  page={5}
  size={PAGINATION_SIZE.M}
  variant={VARIANT.Link}
  hrefFormatter={(page) => `/posts?page=${page}`}
  onChange={(page) => router.push(`/posts?page=${page}`)}
/>
```

### PaginationSlider

```tsx
import { useState } from 'react';
import { PaginationSlider, PAGINATION_SLIDER_SIZE } from '@design-system/pagination';

export function CarouselExample() {
  const [slide, setSlide] = useState(0);
  return (
    <>
      {/* Контент карусели */}
      <PaginationSlider
        total={7}
        page={slide}
        size={PAGINATION_SLIDER_SIZE.S}
        onChange={setSlide}
      />
    </>
  );
}
```

## Props



## Best Practices

1. **Контролируемое состояние** — храните `page` в состоянии родителя и передавайте в `page` + `onChange`, чтобы синхронизировать пагинацию с данными (список, таблица).
2. **Pagination для списков/таблиц** — используйте `Pagination`, когда важно показывать номера страниц и переходить «в середину» (например, в каталогах, админках).
3. **PaginationSlider для каруселей** — используйте `PaginationSlider`, когда страниц немного и нужен компактный индикатор (слайдеры, онбординг).
4. **SEO** — для индексации страниц используйте `variant="link"` и `hrefFormatter`, чтобы номера были ссылками с осмысленными URL.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
