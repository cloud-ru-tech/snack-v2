# AiFieldBanner

`@ds/ai-field-banner` — Инлайн-баннер для поля ввода с семантическим типом, иконкой, описанием и действием.

`AiFieldBanner` — компактный баннер под полем ввода из набора AI Components. Показывает подсказку, предупреждение или контекст действия с опциональной иконкой, кнопкой справа и дополнительным слотом снизу.

Мастер-ширина баннера — 400px. Размеры по Figma: `s` — 400×72, `m` — 400×84.

## Когда использовать

- Подсказки и валидация у AI-полей (`information`, `help`, `warning`, `critical`).
- Контекст безопасности или агентного сценария (`security`, `agentic`).
- Дополнительный контент под основной строкой — ссылка, чип, короткий список (`children`).

### Когда не нужен

- Полноразмерный inline-alert в контенте страницы — используйте `@ds/alert`.
- Системный баннер по верхней кромке — используйте `AlertTop` из `@ds/alert`.

## Анатомия

### Type

Семантика фона: `information`, `security`, `help`, `agentic`, `warning`, `critical`. Иконка не подставляется автоматически — передайте `icon` явно.

### Size

Размер (Figma: Mobile Off → `s`, Mobile On → `m`).

- `s` — 400×72, компактная типографика и иконка.
- `m` — 400×84, увеличенные иконка, текст и кнопка действия.

### Description

Основной текст основной строки. Поддерживает перенос на несколько строк (`overflow-wrap`). Слот скрыт, если не задан.

### Icon

Опциональный `ReactNode` слева от описания. Без `icon` иконка не рендерится.

```ts
import { AiFieldBanner } from '@ds/ai-field-banner'
import { PlaceholderSVG } from '@ds/icons'

<AiFieldBanner icon={<PlaceholderSVG />} description='…' />
```

### Action

Текстовая кнопка справа рендерится через `AlertButton` из `@ds/alert` и использует его state layer (`:hover`, `:focus-visible`, `:active`). Рендерится только при `actionLabel`. `onActionClick` — обработчик клика.

### Additional slot

`children` под основной строкой — произвольный контент. Слот скрыт, если не задан.

## Установка

```bash
pnpm add @ds/ai-field-banner
```

```ts
import { AiFieldBanner, SIZE, TYPE } from '@ds/ai-field-banner'
```

## Примеры использования

### Default

Information с иконкой, описанием и действием

```tsx
import { AiFieldBanner, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Default() {
  return (
    <AiFieldBanner
      variant={TYPE.Information}
      description='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    />
  );
}
```

### Types

Все семантические типы

```tsx
import { AiFieldBanner, TYPE_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

const types = TYPE_ORDER;

export function Types() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      {types.map(type => (
        <AiFieldBanner
          key={type}
          variant={type}
          description='Description'
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
import { AiFieldBanner, SIZE, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Mobile() {
  return (
    <AiFieldBanner
      size={SIZE.M}
      variant={TYPE.Agentic}
      description='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
    />
  );
}
```

### Additional slot

Дополнительный контент под основной строкой

```tsx
import { AiFieldBanner, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function WithAdditionalSlot() {
  return (
    <AiFieldBanner
      variant={TYPE.Information}
      description='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    >
      Additional content
    </AiFieldBanner>
  );
}
```

## Props

**AiFieldBannerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionLabel` | `string` | — | Подпись кнопки действия справа. Кнопка не рендерится, если не задана. |
| `children` | `ReactNode` | — | Дополнительный слот под основной строкой. Не рендерится, если не задан. |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-banner` |  |
| `description` | `ReactNode` | — | Текст или контент основной строки. Не рендерится, если не задан. |
| `hasAdditional` | `boolean` | — | Принудительно добавляет высоту компонента на 12px, даже если `children` не задан. |
| `icon` | `ReactNode` | — | Иконка слева от текста |
| `onActionClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Обработчик клика по кнопке действия. |
| `size` | `"m"` \| `"s"` | `s` | Размер: без `children` — `s` 400×48, `m` 400×60; с `children` — `s` 400×72, `m` 400×84. |
| `variant` | `"agentic"` \| `"critical"` \| `"help"` \| `"information"` \| `"security"` \| `"warning"` | `information` | Семантический вариант баннера (ось `Type` в Figma). По умолчанию `information`. |

#### Related types

- `Size` = `"m"` \| `"s"`

- `Type` = `"agentic"` \| `"critical"` \| `"help"` \| `"information"` \| `"security"` \| `"warning"`
