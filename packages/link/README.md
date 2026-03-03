# Link

Компонент стилизованной ссылки для использования в интерфейсе и внутри текста. Поддерживает разные варианты внешнего вида (appearance), роли (role), обрезку длинного текста и полиморфный рендер через `as` (например, для роутеров).

## Installation

```bash
npm install @design-system/link
# or
yarn add @design-system/link
# or
pnpm add @design-system/link
```

## Exports

```typescript
import {
  Link,
  type LinkProps,
  type Appearance,
  type Role,
  APPEARANCE,
  ROLE
} from '@design-system/link';
```

## Live examples

### Basic usage

```tsx
import { APPEARANCE, Link } from '@design-system/link';

<Link text="Обычная ссылка" href="#" />
<Link text="Primary" appearance={APPEARANCE.Primary} href="#" />
<Link text="On accent" role={ROLE.OnAccent} appearance={APPEARANCE.Primary} href="#" />
```

### Appearances

```tsx
import { APPEARANCE, Link } from '@design-system/link';

<Link text="Neutral link" appearance={APPEARANCE.Neutral} href="#" />
<Link text="Primary link" appearance={APPEARANCE.Primary} href="#" />
<Link text="Blue link" appearance={APPEARANCE.Blue} href="#" />
<Link text="Подчёркнутая ссылка" href="#" underlined />
<p>
  Текст абзаца с <Link text="ссылкой внутри" href="#" insideText /> и продолжением.
</p>
```


## Usage

### Basic example

```tsx
import { Link } from '@design-system/link';

export function Example() {
  return <Link text="Перейти" href="https://example.com" />;
}
```

### With role and appearance

```tsx
import { Link, APPEARANCE, ROLE } from '@design-system/link';

export function Example() {
  return (
    <Link
      text="Ссылка на акценте"
      href="/path"
      role={ROLE.OnAccent}
      appearance={APPEARANCE.Primary}
    />
  );
}
```

### Underlined

```tsx
import { Link } from '@design-system/link';

export function Example() {
  return <Link text="Подчёркнутая ссылка" href="#" underlined />;
}
```

## Props

### LinkProps
| name | type | default value | description |
|------|------|---------------|-------------|
| text | `string` | - | Текст ссылки |
| role | enum Role: `"regular"`, `"onAccent"` | regular | Роль |
| appearance | enum Appearance: `"neutral"`, `"invertNeutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Стилизует ссылку для размещения на цветном фоне |
| insideText | `boolean` | - | Находится ли ссылка внутри текста (и можно ли её переносить) |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания строки: <br/> - `end` - с конца; <br/> - `middle` - посередине |
| underlined | `boolean` | - | Наличие нижнего подчеркивания |
| as | `ComponentType \| ElementType` | 'a' | Полиморфный компонент.  Оформить переданный компонент или html элемент в стиль ссылки.  Список атрибутов, которые переданный компонент должен принять: <br/> - `className` <br/> - `data-size` <br/> - `data-text-mode` <br/> - `data-appearance` <br/> - `data-inside-text` |

## Best Practices

1. **Текст ссылки** — используйте осмысленный текст вместо «здесь» или «подробнее» без контекста.
2. **Appearance и фон** — подбирайте `appearance` под фон (neutral/primary на светлом, onAccent на акцентном блоке).
3. **Внутри текста** — для ссылок в абзаце задавайте `insideText={true}`.
4. **Длинный текст** — при ограниченной ширине используйте `truncateVariant="end"` или `"middle"`.
5. **Роутеры** — для SPA-навигации используйте `as={RouterLink}` (или аналог) с пропом `to` вместо `href`.
6. **Внешние ссылки** — оставляйте `target="_blank"` по умолчанию или явно; `rel="noopener noreferrer"` выставляется автоматически.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
