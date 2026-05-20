# AiSuggestion

`@ds/ai-suggestion` — Компактная AI-подсказка в виде pill-чипа с иконкой и текстом.

Компонент **Suggestion / Simple** — pill-чип для AI-сценариев: быстрый выбор подсказки с иконкой и коротким текстом.

## Когда использовать

- Подсказки в AI-чате или поиске с генерацией.
- Быстрые действия рядом с полем ввода (suggested prompts).

## Анатомия

### Appearance

- `neutral` — нейтральная обводка и серый текст (Figma: Primary=Off).
- `primary` — акцентная обводка и зелёный текст (Figma: Primary=On).

### Size

- `s` — компактный размер, 32px по высоте (Figma: Mobile=Off).
- `m` — увеличенный размер, 40px по высоте (Figma: Mobile=On).

Состояния hover и focus реализованы через CSS (`:hover`, `:focus-visible`), а не через пропы.

## Установка

```bash
pnpm add @ds/ai-suggestion
```

```ts
import { AiSuggestionSimple, APPEARANCE, SIZE } from '@ds/ai-suggestion'
```

## Примеры

### Базовый

```tsx
import { AiSuggestionSimple, APPEARANCE, SIZE } from '@ds/ai-suggestion'
import { PlaceholderSVG } from '@ds/icons'

export function Basic() {
  return (
    <AiSuggestionSimple
      label='Label text'
      icon={<PlaceholderSVG />}
      appearance={APPEARANCE.Primary}
      size={SIZE.M}
    />
  )
}
```

## AiSuggestionSimple

```tsx
import { AiSuggestionSimple, APPEARANCE, SIZE } from '@ds/ai-suggestion'
import { PlaceholderSVG } from '@ds/icons'

export function Basic() {
  return (
    <AiSuggestionSimple
      label='Label text'
      icon={<PlaceholderSVG />}
      appearance={APPEARANCE.Primary}
      size={SIZE.M}
    />
  )
}
```

### Props `AiSuggestionSimpleProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"neutral"` \| `"primary"` | `neutral` | Внешний вид (Figma: Primary On/Off) |
| `className` | `string` | — | Дополнительный CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Блокирует взаимодействие |
| `icon` | `ReactNode` | — | Иконка слева от текста |
| `label` | `string` | `Label text` | Текст подсказки |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбэк при выборе подсказки |
| `size` | `"m"` \| `"s"` | `s` | Размер (Figma: Mobile Off → `s`, Mobile On → `m`) |

#### Related types

- `Appearance` = `"neutral"` \| `"primary"`

- `Size` = `"m"` \| `"s"`
