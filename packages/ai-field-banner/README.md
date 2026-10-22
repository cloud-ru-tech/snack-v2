# AiFieldBanner

`@ds/ai-field-banner` — Инлайн-баннер для поля ввода с семантическим вариантом, иконкой, контентом и действием.

`AiFieldBanner` — компактный баннер под полем ввода из набора AI Components. Показывает подсказку, предупреждение или контекст действия с опциональной иконкой, кнопкой справа и дополнительным слотом снизу.

Ширину задаёт родитель (400px в макете — пример). Высота подстраивается под содержимое: при одной строке текста `s` — 40px, `m` — 48px; с нижним слотом 16px — 64px и 72px.

## Когда использовать

- Подсказки и валидация у AI-полей (`information`, `help`, `warning`, `critical`).
- Контекст безопасности или агентного сценария (`security`, `agentic`).
- Дополнительный контент под основной строкой — ссылка, чип, короткий список (`bottomContent`).

### Когда не нужен

- Полноразмерный inline-alert в контенте страницы — используйте `@ds/alert`.
- Системный баннер по верхней кромке — используйте `AlertTop` из `@ds/alert`.

## Анатомия

### Variant

Семантика фона (проп `variant`):

- `information`, `security`, `help`, `agentic` — полупрозрачная подложка с размытием фона;
- `warning`, `critical` — непрозрачная подложка, иконка окрашена акцентом варианта.

Иконка не подставляется автоматически — передайте `icon` явно. У всех вариантов обводка по периметру и одинаковое скругление.

### Size (default `s` на desktop, `m` на mobile)

Размер (Figma: Mobile Off → `s`, Mobile On → `m`). Как размер выбирается на mobile — раздел «Адаптивность».

- `s` — Field Banner: иконка 16, текст `body/s`, кнопка действия и крестик 24, промежутки 4.
- `m` — Field Banner Mobile: иконка 24, текст `body/m`, кнопка действия и крестик 32, промежутки 8.

### Content

Текст основной строки. Длинный текст переносится на две строки, дальше обрезается многоточием.

### Icon

Опциональный `ReactNode` слева от контента. Без `icon` иконка не рендерится.

```ts
import { AiFieldBanner } from '@ds/ai-field-banner'
import { PlaceholderSVG } from '@ds/icons'

<AiFieldBanner icon={<PlaceholderSVG />} content='…' />
```

### Action

Текстовая кнопка справа рендерится через `AlertButton` из `@ds/alert` и использует его state layer (`:hover`, `:focus-visible`, `:active`). Рендерится только при `actionLabel`. `onActionClick` — обработчик клика.

### Close

Крестик справа от кнопки действия (`AiButtonClose`: `s` для размера `s`, `m` для `m`). Показывается, когда передан `onClose`; убрать баннер решает потребитель. Крестик не зависит от варианта и не заменяет кнопку действия.

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

### Закрытие

Крестик скрывает баннер, состояние хранит родитель

```tsx
import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import { Button } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

export function Dismiss() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button label='Показать баннер' onClick={() => setVisible(true)} />;
  }

  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      content='Баннер закрывается крестиком'
      icon={<PlaceholderSVG />}
      onClose={() => setVisible(false)}
    />
  );
}
```

### Mobile

Размер `m` — Field Banner Mobile

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
| `layoutPresets` | `AiFieldBannerLayoutDefaults` \| `LayoutPresets` | — | Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `AI_FIELD_BANNER_LAYOUT_PRESETS`). <br/> Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`. |
| `onActionClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Обработчик клика по кнопке действия. |
| `onClose` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие на крестик. Крестик показывается, только если обработчик передан; убрать баннер решает потребитель. |
| `size` | `"m"` \| `"s"` | — | Размер на desktop: `s` — Field Banner, `m` — Field Banner Mobile. Высота по содержимому: при одной строке `s` 40, `m` 48. <br/> На mobile размер задаёт пресет `AI_FIELD_BANNER_LAYOUT_PRESETS` (`m`); изменить его — через `layoutPresets`. |
| `variant` | `"agentic"` \| `"critical"` \| `"help"` \| `"information"` \| `"security"` \| `"warning"` | `information` | Семантический вариант баннера (ось `Variant` в Figma). По умолчанию `information`. |

#### Related types

**AiFieldBannerLayoutDefaults**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"m"` \| `"s"` | — | Размер на desktop: `s` — Field Banner, `m` — Field Banner Mobile. Высота по содержимому: при одной строке `s` 40, `m` 48. <br/> На mobile размер задаёт пресет `AI_FIELD_BANNER_LAYOUT_PRESETS` (`m`); изменить его — через `layoutPresets`. |

- `Size` = `"m"` \| `"s"`

- `Variant` = `"agentic"` \| `"critical"` \| `"help"` \| `"information"` \| `"security"` \| `"warning"`

## Адаптивность

Размер баннера зависит от раскладки `AdaptiveProvider`. Обычный проп `size` задаёт размер на desktop, а на mobile действует пресет `AI_FIELD_BANNER_LAYOUT_PRESETS`:

| Раскладка | `size` без пропа | `size` с пропом |
|---|---|---|
| desktop | `s` (Field Banner) | значение пропа |
| mobile | `m` (Field Banner Mobile) | `m` |

Чтобы изменить размер на mobile, передайте `layoutPresets={{ mobile: { size: 's' } }}`. Пресет нужен потому, что макет задаёт отдельный мобильный баннер.
