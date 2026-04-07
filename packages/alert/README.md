# Alert

Пакет содержит **Alert** (встраиваемое сообщение в контенте с опциональной обводкой) и **AlertTop** (полноширинный баннер под шапкой). Оба разделяют общую разметку и пропсы (кроме `outline`, только у `Alert`).

## Installation

```bash
npm install @design-system/alert
# or
yarn add @design-system/alert
# or
pnpm add @design-system/alert
```

## Exports

```typescript
import {
  ALIGN,
  APPEARANCE,
  SIZE,
  type Align,
  type Appearance,
  type Size
} from '@design-system/alert';
```

## Live examples

### Appearance

```tsx
import { AlertAppearanceExamples } from '@design-system/alert';

<AlertAppearanceExamples client:load />
```

### С обводкой и кнопками

```tsx
import { AlertWithActionsExample } from '@design-system/alert';

<AlertWithActionsExample client:load />
```

### Appearance

```tsx
import { AlertTopAppearanceExamples } from '@design-system/alert';

<AlertTopAppearanceExamples client:load />
```

### С закрытием и действиями

```tsx
import { AlertTopWithActionsExample } from '@design-system/alert';

<AlertTopWithActionsExample client:load />
```


## Usage

### Базовый пример

```tsx
import { Alert, APPEARANCE, SIZE } from '@design-system/alert';

export function Example() {
  return (
    <Alert appearance={APPEARANCE.Neutral} size={SIZE.M} title='Заголовок' description='Текст сообщения' outline />
  );
}
```

### С закрытием и действиями

```tsx
import { Alert, APPEARANCE, SIZE } from '@design-system/alert';

export function Example() {
  return (
    <Alert
      appearance={APPEARANCE.Info}
      size={SIZE.M}
      title='Обновление'
      description='Доступна новая версия.'
      outline
      onClose={() => {}}
      actions={{
        primary: { label: 'Обновить', onClick: () => {} },
        secondary: { label: 'Позже', onClick: () => {} },
      }}
    />
  );
}
```

### Горизонтальное выравнивание

```tsx
<Alert
  align='horizontal'
  appearance={APPEARANCE.Neutral}
  size={SIZE.M}
  title='Заголовок'
  description='Описание'
  outline
  actions={{
    primary: { label: 'Ок', onClick: () => {} },
  }}
/>
```

## Props

### AlertProps
| name | type | default value | description |
|------|------|---------------|-------------|
| description* | `ReactNode` | - | Описание |
| icon | `boolean` | - | Отображать иконку |
| title | `string` | - | Заголовок |
| truncate | `{ title?: number; }` | title: 1 | Максимальное кол-во строк (только при `collapsible={false}`). |
| onClose | `() => void` | - | Колбек закрытия |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"error"`, `"warning"`, `"success"`, `"info"` | - | Внешний вид |
| size | enum Size: `"s"`, `"m"` | - | Размер |
| className | `string` | - | CSS-класс |
| actions | `{ primary: Omit<AlertButtonProps, "size" \| "variant">; secondary?: Omit<AlertButtonProps, "size" \| "variant">; }` | - | Кнопки в футере |
| collapsible | `boolean` | - | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop). При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| align | enum Align: `"vertical"`, `"horizontal"` | - | Выравнивание контента |
| outline | `boolean` | - | Внешний бордер |

### AlertTopProps
| name | type | default value | description |
|------|------|---------------|-------------|
| description* | `ReactNode` | - | Описание |
| icon | `boolean` | - | Отображать иконку |
| title | `string` | - | Заголовок |
| truncate | `{ title?: number; }` | title: 1 | Максимальное кол-во строк (только при `collapsible={false}`). |
| onClose | `() => void` | - | Колбек закрытия |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"error"`, `"warning"`, `"success"`, `"info"` | - | Внешний вид |
| size | enum Size: `"s"`, `"m"` | - | Размер |
| className | `string` | - | CSS-класс |
| actions | `{ primary: Omit<AlertButtonProps, "size" \| "variant">; secondary?: Omit<AlertButtonProps, "size" \| "variant">; }` | - | Кнопки в футере |
| collapsible | `boolean` | - | Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop). При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию. |
| align | enum Align: `"vertical"`, `"horizontal"` | - | Выравнивание контента |

## Best Practices

1. **Один фокус сообщения** — заголовок короткий, детали в `description`.
2. **Семантика appearance** — error / warning / success / info согласованы с ситуацией; neutral / primary — нейтральные и акцентные информационные блоки.
3. **Collapsible** — не комбинируйте с `TruncateString` на том же измеряемом узле, что и внутренняя логика коллапса; при `align=horizontal` collapsible не используйте.
4. **Действия** — одна основная (`primary`) и при необходимости вторичная (`secondary`); избегайте дублирования сценария закрытия и основного действия без необходимости.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
