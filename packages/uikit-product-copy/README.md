# Copy

`@ds/uikit-product-copy` — Пакет копирования значений в буфер — компоненты CopyButton и CopyLine с единой логикой clipboard и иконкой подтверждения.

Пакет `@ds/uikit-product-copy` предоставляет два готовых паттерна копирования: одиночную кнопку `CopyButton` и строку с inline-кнопкой `CopyLine`. Оба используют общий хук `useCopyToClipboard` — на 1 секунду меняют иконку на «галочку» после успешного копирования.

- ****CopyButton**** — icon-only `Button` с состоянием подтверждения, для тулбаров и таблиц.
- ****CopyLine**** — строка контента с truncate'ом и встроенной кнопкой копирования, для карточек ID/IP/токенов.

## Установка

```bash
pnpm add @ds/uikit-product-copy
```

```ts
import { CopyButton, CopyLine } from '@ds/uikit-product-copy'
```

## Figma

Оба компонента живут в одном Figma-фрейме `Snack UI Kit · Copy`. Ссылки на конкретные узлы — на страницах компонентов.

## CopyButton

Icon-only кнопка копирования значения в буфер обмена с состоянием подтверждения через иконку галочки.

Тонкая обёртка над `Button` (`view='function'`, `appearance='neutral'`), которая копирует строку или число в системный буфер обмена и на 1 секунду показывает иконку-галочку как подтверждение действия.

### Когда использовать
- Рядом с identifier-ами, токенами, IP, URL — когда нужно одно действие «скопировать» без визуального шума.
- В таблицах, тулбарах, ячейках карточек — где места хватает только под иконку.
- Для составных строк нужна и подпись, и кнопка:
  - используйте **`CopyLine`**.

### Анатомия

#### Size (default `s`)

Размер задаётся пропом `size` и пробрасывается в нижележащий `Button`:

- `s` — для плотных поверхностей и таблиц.
- `m` — дефолт форм.
- `l` — для крупных карточек.

#### Label (default отсутствует)

Необязательный проп `label` добавляет текст рядом с иконкой — кнопка перестаёт быть icon-only. Если `label` не задан, кнопка отображается только с иконкой и получает `aria-label='Copy'` для доступности; при наличии `label` атрибут не выставляется (текст уже доступен ассистивным технологиям).

#### State

Состояние подтверждения управляется внутренним хуком `useCopyToClipboard`: после успешного `navigator.clipboard.writeText` иконка `CopySVG` на 1 секунду заменяется на `CheckSVG`, затем возвращается обратно. Внешним пропсом не управляется.

### Примеры использования

#### Базовый случай

valueToCopy — строка или число

```tsx
import { CopyButton } from '@ds/uikit-product-copy';

export function CopyButtonBasic() {
  return <CopyButton valueToCopy='hello-world' />;
}
```

#### С подписью

label выводит текст рядом с иконкой

```tsx
import { CopyButton } from '@ds/uikit-product-copy';

export function CopyButtonWithLabel() {
  return <CopyButton valueToCopy='hello-world' label='Copy' />;
}
```

#### Три размера

```tsx
import { CopyButton } from '@ds/uikit-product-copy';

export function CopyButtonSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <CopyButton size='s' valueToCopy='small' />
      <CopyButton size='m' valueToCopy='medium' />
      <CopyButton size='l' valueToCopy='large' />
    </div>
  );
}
```

#### С внешним обработчиком

onClick вызывается дополнительно к копированию — логирование, аналитика

```tsx
import { CopyButton } from '@ds/uikit-product-copy';
import { useState } from 'react';

export function CopyButtonWithHandler() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <CopyButton valueToCopy='tracked-value' onClick={() => setCount(c => c + 1)} />
      <span>Скопировано раз: {count}</span>
    </div>
  );
}
```

### Props
**CopyButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс. |
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Текст рядом с иконкой. Если не задан — кнопка отображается только с иконкой. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | Доп. обработчик клика. |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер кнопки (s / m / l). По-умолчанию s. |
| `valueToCopy` | `string \| number` | — | Значение для копирования в буфер. |

### Смотри также
- **CopyLine** — строка с контентом и встроенной кнопкой копирования.
- **Button** — нижележащий компонент.

## CopyLine

Строка с truncate-контентом и inline-кнопкой копирования — для отображения identifier-ов, токенов и адресов.

Контейнер `<div>` с однострочным truncate-контентом слева и inline-кнопкой копирования справа. Кликабельна вся строка целиком — клик копирует `valueToCopy` (по умолчанию равно `content`, если он `string` или `number`). Внутри использует `TruncateString` для усечения длинных значений.

### Когда использовать
- Карточки ресурсов: ID, ARN, IP, URL, токены — где значение надо одновременно показать и дать скопировать.
- Detail view'ы и таблицы с длинными identifier-ами, не помещающимися в одну строку без усечения.
- Если нужна **только** кнопка без контента:
  - берите **`CopyButton`**.

### Анатомия

#### CopyButtonHideStrategy (default `hover`)

Управляет видимостью встроенной кнопки копирования. Значение прокидывается в DOM как `data-copy-button-hide-strategy` на корневом элементе:

- `hover` — кнопка показывается только при наведении на строку.
- `never` — кнопка видна всегда.

#### Content

Слот `content` принимает `ReactNode`:

- `string` или `number` — автоматически оборачивается в `TruncateString` (одна строка, троеточие при переполнении) и используется как `valueToCopy` по умолчанию.
- Произвольный JSX — truncate не применяется, `valueToCopy` нужно задавать явно.

### Примеры использования

#### Базовый случай

UUID, кнопка появляется по hover

```tsx
import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineBasic() {
  return <CopyLine content='550e8400-e29b-41d4-a716-446655440000' />;
}
```

#### Длинный контент с truncate

Строка усекается одной строкой, в буфер уходит полное значение

```tsx
import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineTruncated() {
  return (
    <div style={{ width: 280 }}>
      <CopyLine content='very-long-identifier-1234567890-abcdefghijklmnop' />
    </div>
  );
}
```

#### Кнопка всегда видна

copyButtonHideStrategy='never' для критичных значений — токенов, паролей

```tsx
import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineAlwaysVisible() {
  return <CopyLine content='persistent-token-9000' copyButtonHideStrategy='never' />;
}
```

#### Кастомное значение для копирования

content — человекочитаемая подпись, valueToCopy — машинный формат

```tsx
import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineCustomValue() {
  return <CopyLine content='IP: 192.168.0.1 (production)' valueToCopy='192.168.0.1' />;
}
```

#### JSX-контент

Произвольный ReactNode внутри content; valueToCopy задаём явно

```tsx
import { CopyLine } from '@ds/uikit-product-copy';

export function CopyLineRichContent() {
  return (
    <CopyLine
      content={
        <span>
          <strong>Token:</strong> <code>sk-prod-9000</code>
        </span>
      }
      valueToCopy='sk-prod-9000'
    />
  );
}
```

### Props
**CopyLineProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс корневого элемента. |
| `content` | `ReactNode` | — | Отображаемое содержимое. Если это строка/число — автоматически truncated и используется как значение для копирования по-умолчанию. |
| `copyButtonHideStrategy` | `"hover"` \| `"never"` | `hover` | Стратегия показа кнопки копирования: hover — только по наведению, never — всегда. |
| `data-test-id` | `string` | — |  |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | — | Обработчик клика по строке. |
| `valueToCopy` | `string \| number` | — | Значение, которое попадёт в буфер при клике. По-умолчанию равно content, если он string/number. |

##### Related types

- `CopyButtonHideStrategy` = `"hover"` \| `"never"`

### Смотри также
- **CopyButton** — только кнопка, без контента.
- **TruncateString** — нижележащий примитив усечения.
