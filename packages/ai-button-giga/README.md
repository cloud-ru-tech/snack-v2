# AiButtonGiga

`@ds/ai-button-giga` — Кнопки Гига-помощника с обводкой, без обводки и увеличенная кнопка формы.

Пакет содержит три самостоятельные кнопки. Они показывают действие и сообщают о нажатии; результат действия, загрузку и доступность задаёт приложение.

## Анатомия

### Appearance (default `primary`)

- `primary` использует primary/text; Outline и Mama получают фирменную радиальную обводку.
- `neutral` использует neutral/text; Outline и Mama получают neutral/decor.

Глобус сохраняет цвет в обоих оформлениях и при недоступности. Прозрачность подписи задают токены материала: 100% в обычном состоянии и при фокусе, 85% при наведении, 70% при нажатии и загрузке. Недоступная подпись использует textDisabled с прозрачностью 100%.

### Loading и Disabled (default `false`)

Загрузка заменяет глобус индикатором и блокирует действие, сохраняя ширину и фокус. Загрузка имеет приоритет при одновременных loading=true и disabled=true. Когда loading=false, недоступность нативно отключает кнопку. Флаги задаёт потребитель. Компонент самостоятельно запросов не выполняет.

Кнопки по умолчанию имеют type=button. Для отправления формы передайте type=submit. Кнопка без видимой подписи требует aria-label или aria-labelledby. Фокус с клавиатуры виден на всей площади кнопки.

### Контраст заданных токенов

Владелец согласовал сохранение заданных neutral/text и прозрачности 100/85/70%. В части состояний их контраст ниже 4,5:1. Это расхождение вынесено на дизайн-ревью; соответствие уровню 4,5:1 для всех состояний не заявляется. Основание — решение Владимира Усатова в AIX-481 от 13.10.2026.

## Установка

```bash
pnpm add @ds/ai-button-giga
```

```tsx
import { AiButtonGigaOutline, AiButtonGigaFunction, AiButtonGigaMama } from '@ds/ai-button-giga';
```

## AiButtonGigaFunction

```tsx
import { AiButtonGigaFunction } from '@ds/ai-button-giga';
import { useState } from 'react';
export function FunctionExample() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setCount(previous => previous + 1);
    setLoading(true);
  }
  function handleComplete() {
    setLoading(false);
  }
  return (
    <div>
      <AiButtonGigaFunction label='Создать ресурс' loading={loading} onClick={handleClick} />
      <button type='button' onClick={handleComplete} disabled={!loading}>
        Завершить загрузку
      </button>
      <p role='status'>Количество запусков: {count}.</p>
    </div>
  );
}
```

### Props `AiButtonGigaFunctionProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"neutral"` \| `"primary"` | — | Оформление подписи: primary использует primary/text, neutral — neutral/text. Обводка есть у Outline и Mama. |
| `className` | `string` | — | Дополнительный CSS-класс корневой кнопки. |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Нативно отключает кнопку, когда loading=false; глобус сохраняет цвет. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ссылка на корневой HTMLButtonElement. |
| `label` | `string` | — | Однострочная подпись. Без подписи показывается квадратная кнопка с цветным глобусом. |
| `loading` | `boolean` | — | Показывает индикатор и блокирует действие, сохраняя фокус и ширину кнопки. Имеет приоритет над disabled. |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер: xs = 24, s = 32, m = 40, l = 48 px по высоте. По умолчанию s. |

#### Related types

- `Appearance` = `"neutral"` \| `"primary"`

- `Size` = `"l"` \| `"m"` \| `"s"` \| `"xs"`

## AiButtonGigaMama

```tsx
import { AiButtonGigaMama } from '@ds/ai-button-giga';
import { useState } from 'react';
export function MamaExample() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setCount(previous => previous + 1);
    setLoading(true);
  }
  function handleComplete() {
    setLoading(false);
  }
  return (
    <div>
      <AiButtonGigaMama label='Создать ресурс' loading={loading} onClick={handleClick} />
      <button type='button' onClick={handleComplete} disabled={!loading}>
        Завершить загрузку
      </button>
      <p role='status'>Количество запусков: {count}.</p>
    </div>
  );
}
```

### Props `AiButtonGigaMamaProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"neutral"` \| `"primary"` | — | Оформление подписи: primary использует primary/text, neutral — neutral/text. Обводка есть у Outline и Mama. |
| `className` | `string` | — | Дополнительный CSS-класс корневой кнопки. |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Нативно отключает кнопку, когда loading=false; глобус сохраняет цвет. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ссылка на корневой HTMLButtonElement. |
| `label` | `string` | — | Подпись действия. Длинный текст обрезается многоточием с учётом ширины кнопки и отступов. |
| `loading` | `boolean` | — | Показывает индикатор и блокирует действие, сохраняя фокус и ширину кнопки. Имеет приоритет над disabled. |

#### Related types

- `Appearance` = `"neutral"` \| `"primary"`

## AiButtonGigaOutline

```tsx
import { AiButtonGigaOutline } from '@ds/ai-button-giga';
import { useState } from 'react';
export function OutlineExample() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setCount(previous => previous + 1);
    setLoading(true);
  }
  function handleComplete() {
    setLoading(false);
  }
  return (
    <div>
      <AiButtonGigaOutline label='Создать ресурс' loading={loading} onClick={handleClick} />
      <button type='button' onClick={handleComplete} disabled={!loading}>
        Завершить загрузку
      </button>
      <p role='status'>Количество запусков: {count}.</p>
    </div>
  );
}
```

### Props `AiButtonGigaOutlineProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"neutral"` \| `"primary"` | — | Оформление подписи: primary использует primary/text, neutral — neutral/text. Обводка есть у Outline и Mama. |
| `className` | `string` | — | Дополнительный CSS-класс корневой кнопки. |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Нативно отключает кнопку, когда loading=false; глобус сохраняет цвет. |
| `icon` | `ReactNode` | — | Сменная иконка. По умолчанию — цветной глобус; null скрывает иконку. |
| `iconPosition` | `"after"` \| `"before"` | — | Положение иконки относительно подписи. По умолчанию before. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ссылка на корневой HTMLButtonElement. |
| `label` | `string` | — | Однострочная подпись. Без подписи показывается квадратная кнопка с иконкой. |
| `loading` | `boolean` | — | Показывает индикатор и блокирует действие, сохраняя фокус и ширину кнопки. Имеет приоритет над disabled. |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | `s` | Размер: xs = 24, s = 32, m = 40, l = 48 px по высоте. По умолчанию s. |

#### Related types

- `Appearance` = `"neutral"` \| `"primary"`

- `IconPosition` = `"after"` \| `"before"`

- `Size` = `"l"` \| `"m"` \| `"s"` \| `"xs"`
