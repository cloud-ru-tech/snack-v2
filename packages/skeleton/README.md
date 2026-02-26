# Skeleton

Пакет компонентов для плейсхолдеров загрузки: **Skeleton** (блок произвольной формы), **SkeletonText** (строки текста) и **WithSkeleton** (обёртка для условного отображения скелетона или контента). Стили — из design tokens (Figma variables).

## Installation

```bash
npm install @design-system/skeleton
# or
yarn add @design-system/skeleton
# or
pnpm add @design-system/skeleton
```

## Exports



## Live examples

### Basic

```tsx
import { Skeleton } from '@design-system/skeleton';

export function BasicExample() {
  return (
    <Skeleton loading width={200} height={24}>
      <span>Контент после загрузки</span>
    </Skeleton>
  );
}
```

### Разные формы

```tsx
import { Skeleton } from '@design-system/skeleton';

export function LoadingCard() {
  return (
    <Skeleton loading width={120} height={80} borderRadius={8}>
      <div>Карточка контента</div>
    </Skeleton>
  );
}

export function LoadingAvatar() {
  return (
    <Skeleton loading width={48} height={48} borderRadius="50%">
      <img src="/avatar.jpg" alt="" />
    </Skeleton>
  );
}
```

### Состояние контента

```tsx
import { Skeleton } from '@design-system/skeleton';

export function Example() {
  return (
    <>
      <Skeleton loading width={200} height={24}>
        <span>Контент</span>
      </Skeleton>
      <Skeleton loading={false} width={200} height={24}>
        <span>Контент после загрузки</span>
      </Skeleton>
    </>
  );
}
```

### Basic

```tsx
import { SkeletonText } from '@design-system/skeleton';

export function Example() {
  return (
    <SkeletonText loading width={200}>
      <p>Текст после загрузки</p>
    </SkeletonText>
  );
}
```

### Количество строк

```tsx
import { SkeletonText } from '@design-system/skeleton';

export function Example() {
  return (
    <>
      <SkeletonText loading lines={1} width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>

      <SkeletonText loading lines={5} width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>
    </>
  );
}
```

### Purpose и size

```tsx
import { SkeletonText } from '@design-system/skeleton';

export function Example() {
  return (
    <>
      <SkeletonText loading purpose="title" size="m" width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>
      <SkeletonText loading purpose="body" size="s" width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>
      <SkeletonText loading purpose="label" size="l" width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>
    </>
  );
}
```

### Выравнивание

```tsx
import { SkeletonText } from '@design-system/skeleton';

export function Example() {
  return (
    <>
      <SkeletonText loading align="left" width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>
      <SkeletonText loading align="right" width={200}>
        <p>Текст после загрузки</p>
      </SkeletonText>
    </>
  );
}
```

### Basic

```tsx
import { WithSkeleton, SkeletonText } from '@design-system/skeleton';

<WithSkeleton
  loading={isLoading}
  skeleton={<SkeletonText loading width={200} />}
>
  <span>Контент после загрузки</span>
</WithSkeleton>
```

### Композиция скелетона

```tsx
import { WithSkeleton, Skeleton, SkeletonText } from '@design-system/skeleton';

<WithSkeleton
  loading={true}
  skeleton={
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton loading width={48} height={48} borderRadius="50%" />
      <SkeletonText loading lines={2} purpose="body" size="m" width={180} />
      <Skeleton loading width={120} height={32} borderRadius={4} />
    </div>
  }
>
  <div>Карточка пользователя</div>
</WithSkeleton>
```


## Usage



## Props

### SkeletonProps
| name | type | default value | description |
|------|------|---------------|-------------|
| loading | `boolean` | - | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| width | `Width<string \| number>` | - | Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) |
| height | `Height<string \| number>` | - | Высота блока. Можно указать значение допустимое для CSSProperty.height (пример `'60%'`, `'400px'` и т.д) |
| borderRadius | `BorderRadius<string \| number>` | - | Радиус скругления. Можно указать значение допустимое для CSSProperty.borderRadius (пример `'10px'`, `'50%'` и т.д) |
| className | `string` | - | CSS-класс |

### SkeletonTextProps
| name | type | default value | description |
|------|------|---------------|-------------|
| loading | `boolean` | - | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |
| width | `Width<string \| number>` | - | Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) |
| className | `string` | - | CSS-класс |
| lines | `number` | 3 | Количество строк. |
| rowClassName | `string` | - | CSS-класс строки |
| lineClassName | `string` | - | CSS-класс линии |
| variant | enum Variant: `"display"`, `"headline"`, `"title"`, `"label"`, `"body"` | body | Роль типографики (размер по anatomy) |
| size | enum Size: `"l"`, `"m"`, `"s"` | m | Масштаб: s, m, l |
| align | enum Align: `"left"`, `"right"` | left | Выравнивание: left, right |

### WithSkeletonProps
| name | type | default value | description |
|------|------|---------------|-------------|
| skeleton* | `ReactNode` | - | JSX скелетон |
| loading | `boolean` | - | Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. |

## Best Practices

1. **Соответствие контенту** — ширина и высота скелетона должны примерно совпадать с размерами загружаемого контента.
2. **Используйте children** — передавайте `children` для корректного переключения между скелетоном и контентом.
3. **Контекст** — `loading` можно задавать через проп или через `SkeletonContextProvider` для вложенных компонентов.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
