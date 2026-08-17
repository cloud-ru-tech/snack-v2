# AiFieldBanner

`@ds/ai-field-banner` — Инлайн-баннер для поля ввода с семантическим вариантом, иконкой, контентом и действием.

`AiFieldBanner` — компактный баннер под полем ввода из набора AI Components. Показывает подсказку, предупреждение или контекст действия с опциональной иконкой, кнопкой справа и дополнительным слотом снизу.

Мастер-ширина баннера — 400px. Размеры по Figma: `s` — 400×72, `m` — 400×84.

## Когда использовать

- Подсказки и валидация у AI-полей (`information`, `help`, `warning`, `critical`).
- Контекст безопасности или агентного сценария (`security`, `agentic`).
- Дополнительный контент под основной строкой — ссылка, чип, короткий список (`bottomContent`).

### Когда не нужен

- Полноразмерный inline-alert в контенте страницы — используйте `@ds/alert`.
- Системный баннер по верхней кромке — используйте `AlertTop` из `@ds/alert`.

## Анатомия

### Variant

Семантика фона (проп `variant`): `information`, `security`, `help`, `agentic`, `warning`, `critical`. Иконка не подставляется автоматически — передайте `icon` явно.

### Size

Размер (Figma: Mobile Off → `s`, Mobile On → `m`).

- `s` — 400×72, компактная типографика и иконка.
- `m` — 400×84, увеличенные иконка, текст и кнопка действия.

### Content

Основной текст основной строки. Поддерживает перенос на несколько строк (`overflow-wrap`). Слот скрыт, если не задан.

### Icon

Опциональный `ReactNode` слева от контента. Без `icon` иконка не рендерится.

```ts
import { AiFieldBanner } from '@ds/ai-field-banner'
import { PlaceholderSVG } from '@ds/icons'

<AiFieldBanner icon={<PlaceholderSVG />} content='…' />
```

### Action

Текстовая кнопка справа рендерится через `AlertButton` из `@ds/alert` и использует его state layer (`:hover`, `:focus-visible`, `:active`). Рендерится только при `actionLabel`. `onActionClick` — обработчик клика.

### Bottom content

`bottomContent` под основной строкой — произвольный контент. Слот скрыт, если не задан.

## Установка

```bash
pnpm add @ds/ai-field-banner
```

```ts
import { AiFieldBanner, SIZE, VARIANT } from '@ds/ai-field-banner'
```

## Примеры использования

### Default

Information с иконкой, описанием и действием

```tsx
import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Default() {
  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      content='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    />
  );
}
```

### Variants

Все семантические варианты

```tsx
import { AiFieldBanner, VARIANT_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

const variants = VARIANT_ORDER;

export function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      {variants.map(variant => (
        <AiFieldBanner
          key={variant}
          variant={variant}
          content='Description'
          actionLabel='Label text'
          icon={<PlaceholderSVG />}
        />
      ))}
    </div>
  );
}
```

### Mobile

Размер `m` (400×84)

```tsx
import { AiFieldBanner, SIZE, VARIANT } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Mobile() {
  return (
    <AiFieldBanner
      size={SIZE.M}
      variant={VARIANT.Agentic}
      content='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
    />
  );
}
```

### Bottom content

Дополнительный контент под основной строкой

```tsx
import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function WithBottomContent() {
  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      content='Description'
      bottomContent='Additional content'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    />
  );
}
```

## Props

**AiFieldBannerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionLabel` | `string` | — | Подпись кнопки действия справа. Кнопка не рендерится, если не задана. |
| `bottomContent` | `ReactNode` | — | Дополнительный слот под основной строкой. Не рендерится, если не задан. |
| `className` | `string` | — | Доп. класс корня. |
| `content` | `ReactNode` | — | Текст или контент основной строки. Не рендерится, если не задан. |
| `data-test-id` | `string` | `ai-field-banner` |  |
| `icon` | `ReactNode` | — | Иконка слева от текста |
| `onActionClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Обработчик клика по кнопке действия. |
| `size` | `"m"` \| `"s"` | `s` | Размер: без `bottomContent` — `s` 400×48, `m` 400×60; с ним — `s` 400×72, `m` 400×84. |
| `variant` | `"agentic"` \| `"critical"` \| `"help"` \| `"information"` \| `"security"` \| `"warning"` | `information` | Семантический вариант баннера (ось `Variant` в Figma). По умолчанию `information`. |

#### Related types

- `Size` = `"m"` \| `"s"`

- `Variant` = `"agentic"` \| `"critical"` \| `"help"` \| `"information"` \| `"security"` \| `"warning"`
