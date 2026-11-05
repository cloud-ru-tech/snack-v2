# SectionTitle

`@ds/site-section-title` — Заголовочный блок секции сайта — заголовок и описание в четырёх раскладках.

Заголовочный блок секции сайта: заголовок и описание. Типографика и положение описания зависят от `type` и раскладки. Используется в `@ds/site-section` и в секциях, собранных вручную.

## Когда использовать

- Заголовок секции лендинга или каталога.
- Заголовок блока внутри страницы сайта, когда нужен единый ритм с секциями.

Когда **не** нужен:

- Заголовок внутри карточки или формы:
  - используйте `Typography` из `@ds/typography`.

## Анатомия

- `title` — заголовок. Разметка вставляется прямо в тег заголовка, без вложенной обёртки, поэтому в строке допустима только строчная разметка (`a`, `strong`, `em`, `br`).
- `description` — описание, может содержать абзацы и списки.

Обе строки рендерятся через `@ds/site-rich-text`, который очищает HTML от XSS.

### Type (default `descriptionRight`)

- `descriptionRight` — на desktop описание справа, заголовок и описание делят ширину поровну; описание не шире 480 px.
- `descriptionUnderTitle` — описание под заголовком.
- `centered` — описание под заголовком, текст по центру.
- `small` — уменьшенная типографика, описание под заголовком.

На tablet и mobile описание всегда под заголовком.

### Тег заголовка (default `h2`)

`titleTag` — `h1`, `h2`, `h3` или `h4`. `h1` — для заголовка первой секции страницы.

## Установка

```bash
pnpm add @ds/site-section-title
```

```ts
import { SectionTitle } from '@ds/site-section-title'
```

## Примеры использования

### Описание справа

type='descriptionRight'

```tsx
import { SectionTitle } from '@ds/site-section-title';

export function DescriptionRight() {
  return (
    <SectionTitle
      type='descriptionRight'
      title='Облачные сервисы'
      description='Инфраструктура, данные и AI в одном облаке.'
    />
  );
}
```

### По центру

type='centered'

```tsx
import { SectionTitle } from '@ds/site-section-title';

export function Centered() {
  return (
    <SectionTitle type='centered' title='Облачные сервисы' description='Инфраструктура, данные и AI в одном облаке.' />
  );
}
```

### Уменьшенный

type='small', titleTag='h3'

```tsx
import { SectionTitle } from '@ds/site-section-title';

export function Small() {
  return (
    <SectionTitle
      type='small'
      titleTag='h3'
      title='Тарифы'
      description='Оплата по факту потребления, без минимального платежа.'
    />
  );
}
```

### HTML-разметка в строках

type='descriptionUnderTitle'

```tsx
import { SectionTitle } from '@ds/site-section-title';

export function HtmlTitle() {
  return (
    <SectionTitle
      type='descriptionUnderTitle'
      title='Облако для <a href="#">бизнеса</a>'
      description='Строки из CMS могут содержать <strong>HTML-разметку</strong>.'
    />
  );
}
```

## Props

**SectionTitleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корня. |
| `data-test-id` | `string` | — |  |
| `description` | `string` | — | Описание. Строка может содержать HTML-разметку. |
| `title` | `string` | — | Заголовок. Строка может содержать строчную HTML-разметку (`a`, `strong`, `em`, `br`). |
| `titleTag` | `"h1"` \| `"h2"` \| `"h3"` \| `"h4"` | `h2` | Тег заголовка. |
| `type` | `"centered"` \| `"descriptionRight"` \| `"descriptionUnderTitle"` \| `"small"` | `descriptionRight` | Раскладка блока. |

#### Related types

- `SectionTitleTag` = `"h1"` \| `"h2"` \| `"h3"` \| `"h4"`

- `SectionTitleType` = `"centered"` \| `"descriptionRight"` \| `"descriptionUnderTitle"` \| `"small"`

## Адаптивность

Раскладка читается из `AdaptiveProvider` (`@ds/adaptive`), пропа `layoutType` нет. Начертание везде `thin`.

| Type | desktop: заголовок / описание / шаг | tablet | mobile |
|---|---|---|---|
| `descriptionRight` | `display/m` / `headline/l` / 24 | `headline/l` / `title/l` / 8 | `headline/m` / `body/m` / 4 |
| `descriptionUnderTitle` | `display/m` / `headline/s` / 12 | `headline/l` / `title/l` / 8 | `headline/m` / `body/m` / 4 |
| `centered` | `display/m` / `headline/l` / 12 | `headline/l` / `title/l` / 8 | `headline/m` / `body/m` / 4 |
| `small` | `display/s` / `title/l` / 12 | `headline/l` / `title/m` / 8 | `headline/m` / `body/m` / 4 |

`desktopSmall` использует значения desktop.
