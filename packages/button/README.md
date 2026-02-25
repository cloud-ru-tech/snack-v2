# Button

Кнопка для действий в интерфейсе. Поддерживает текст (label), иконку (icon + iconPosition: before | after), счётчик (counter), варианты оформления (view: filled, outline, simple, tonal, elevated, function) и семантические цвета (appearance: primary, neutral, red). Полиморфный проп **as** позволяет рендерить кнопку как ссылку (`as="a"`) или как компонент роутера (например `as={Link}` из react-router-dom). Состояния: disabled, loading, fullWidth.

## Installation

```bash
npm install @design-system/button
# or
yarn add @design-system/button
# or
pnpm add @design-system/button
```

## Exports



## Live examples

### Basic usage

```tsx
import { Button } from '@design-system/button';

<Button label='Button' view='filled' />
<Button label='Outline' view='outline' />
<Button label='Simple' view='simple' />
```

### Appearances

```tsx
import { Button } from '@design-system/button';

<Button label='Primary' view='filled' appearance='primary' />
<Button label='Neutral' view='filled' appearance='neutral' />
<Button label='Critical' view='filled' appearance='critical' />
```

### With counter (inline)

```tsx
import { Button } from '@design-system/button';

Счётчик без иконки или с iconPosition=before отображается инлайн после текста.
<Button label='Уведомления' counter={{ value: 5 }} view='filled' />
<Button label='Сообщения' counter={{ value: 12 }} view='filled' appearance='neutral' />
```

### States

```tsx
import { Button } from '@design-system/button';

<Button label='Default' view='filled' />
<Button label='Disabled' view='filled' disabled />
<Button label='Loading' view='filled' loading />
```

### As link

```tsx
import { Button } from '@design-system/button';

<Button as='a' href='#' label='О нас' view='filled' />
<Button as='a' href='#' label='Внешняя ссылка' view='outline' target='_blank' />
```


## Usage

### Basic example

```tsx
import { Button } from '@design-system/button';

export function Example() {
  return <Button label='Submit' />;
}
```

### View and appearance

```tsx
import { Button } from '@design-system/button';

export function Example() {
  return (
    <>
      <Button label='Filled' view='filled' appearance='primary' />
      <Button label='Outline' view='outline' appearance='neutral' />
    </>
  );
}
```

### With counter

```tsx
import { Button } from '@design-system/button';
import { SomeIcon } from '@design-system/icons';

// Инлайн после текста
<Button label="Уведомления" counter={{ value: 5 }} />

// Бейдж относительно иконки
<Button label="Уведомления" icon={<SomeIcon />} iconPosition="after" counter={{ value: 9 }} />
```

## Props

### ButtonProps
| name | type | default value | description |
|------|------|---------------|-------------|
| label | `string` | - | Текст кнопки |
| icon | `ReactNode` | - | Иконка |
| iconPosition | enum IconPosition: `"before"`, `"after"` | before | Позиция иконки относительно текста |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"critical"` | primary | Вариант оформления |
| size | enum Size: `"s"`, `"m"`, `"l"` | m | Размер |
| disabled | `boolean` | - | Отключена |
| loading | `boolean` | - | Состояние загрузки |
| fullWidth | `boolean` | - | На всю ширину |
| className | `string` | - | Дополнительный класс |
| view | enum View: `"function"`, `"filled"`, `"outline"`, `"simple"`, `"tonal"`, `"elevated"` | elevated | Вариант кнопки (Figma: filled, outline, function, simple, elevated) |
| counter | `Omit<CounterProps, "appearance" \| "size">` | - | Пропсы для counter |
| as | `ElementType` | - | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| innerRef | `any` | - | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |

## Best Practices

1. **Выбор view** — используйте filled для основного действия, outline или simple для вторичных, function для текстовых/иконковых действий в тулбарах.
2. **Counter** — передавайте counter только когда значение несёт смысл (уведомления, количество). Без иконки или с iconPosition=before счётчик идёт после текста; с iconPosition=after — бейдж у иконки, не перекрывая подпись.
3. **Loading** — включайте `loading` на время асинхронного действия (отправка формы, загрузка), чтобы избежать повторных кликов.
4. **Иконки** — используйте иконки из `@design-system/icons` одного размера; для icon-only задавайте `aria-label`.
5. **Кнопка как ссылка** — для навигации используйте `as="a"` с `href` или `as={Link}` с `to` (react-router-dom); при `disabled` ссылка не ведёт по адресу (preventDefault).

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
