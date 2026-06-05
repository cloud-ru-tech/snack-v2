# AiIconGiga

`@ds/ai-icon-giga` — Иконка-логотип GigaChat в монохроме и брендовых градиентах для тёмного и светлого фона.

`AiIconGiga` — иконка-логотип GigaChat из набора AI Components. Рендерится как `<svg>` и переиспользуется в составных компонентах стриминга. Поддерживает монохромный вариант (`neutral`) и два брендовых градиента — для тёмного и светлого фона.

## Когда использовать

- Маркировка GigaChat-сценариев в стриминг-компонентах (заголовки чатов, превью генераций, аватары ассистента).
- Брендовый акцент рядом с AI-функциональностью.

### Когда не нужен

- Произвольная интерфейсная иконка:
  - используйте `@ds/icons`.
- Кликабельный триггер:
  - оборачивайте `AiIconGiga` в `@ds/button` или ставьте обработчик на родителя.

## Анатомия

### Variant (default `neutral`)

- `neutral` — монохром через `currentColor` (по умолчанию вторичный текстовый токен). Цвет наследуется от родителя.
- `logoDark` — брендовый зелёно-голубой градиент, рассчитанный на тёмный фон.
- `logoLight` — брендовый градиент, рассчитанный на светлый фон.

### Size (default `80`)

Квадратный размер в пикселях. Глиф логотипа центрирован с отступом 12.5% от размера бокса.

## Установка

```bash
pnpm add @ds/ai-icon-giga
```

```ts
import { AiIconGiga } from '@ds/ai-icon-giga'
```

## Примеры использования

### Neutral

Монохром через currentColor

```tsx
import { AiIconGiga, VARIANT } from '@ds/ai-icon-giga';

export function Neutral() {
  return <AiIconGiga variant={VARIANT.Neutral} />;
}
```

### Branded

Брендовые градиенты logoLight / logoDark

```tsx
import { AiIconGiga, VARIANT } from '@ds/ai-icon-giga';

export function Branded() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiIconGiga variant={VARIANT.LogoLight} />
      <AiIconGiga variant={VARIANT.LogoDark} />
    </div>
  );
}
```

### Sizes

Настраиваемый размер через `size`

```tsx
import { AiIconGiga } from '@ds/ai-icon-giga';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiIconGiga size={24} />
      <AiIconGiga size={48} />
      <AiIconGiga size={80} />
    </div>
  );
}
```

## Props

**AiIconGigaProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-icon-giga` |  |
| `size` | `number` | `80` | Размер иконки в px (квадрат). По умолчанию `80`. |
| `variant` | `"logoDark"` \| `"logoLight"` \| `"neutral"` | `neutral` | Вариант логотипа GigaChat: <br/> - `neutral` — монохром (`currentColor`, по умолчанию вторичный текстовый токен); <br/> - `logoDark` — брендовый градиент для тёмного фона; <br/> - `logoLight` — брендовый градиент для светлого фона. <br/> По умолчанию `neutral`. |

#### Related types

- `AiIconGigaVariant` = `"logoDark"` \| `"logoLight"` \| `"neutral"`
