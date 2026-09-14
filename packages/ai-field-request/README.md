# AiFieldRequest

`@ds/ai-field-request` — Панель запроса ответа человека вместо AI-поля ввода: заголовок, слот контента, раскрытие и кнопки действий.

`AiFieldRequest` — обезличенная панель вместо AI-поля ввода, когда системе нужен ответ человека: заголовок, слот контента, раскрытие длинного текста и две кнопки действий.

Компонент не решает, когда появиться, не хранит ответ и не отправляет его — только показывает содержимое и сообщает о нажатии. Анимация замены поля ввода и Escape остаются на стороне чата.

## Когда использовать

- Нужна панель подтверждения / опросника на месте AI-поля ввода.
- Контент приходит снаружи (текст сейчас, форма или шаги опросника позже).

### Когда не нужен

- Инлайн-баннер подсказки у поля — `@ds/ai-field-banner` / `@ds/ai-field-notice`.
- Модалка или drawer с произвольным футером — `@ds/modal` / `@ds/drawer`.

## Анатомия

### Title

`title` — вопрос к человеку. Заголовок строится по формуле «действие + тип объекта» и заканчивается знаком вопроса: «Удалить виртуальную машину?», «Добавить правило в группу безопасности?», «Остановить кластер?». Так человек с первой строки понимает, что именно подтверждает; подробности живут в `content`. Максимум две строки, дальше обрезка по последнему целому слову.

### Actions

`primaryAction` и `secondaryAction` — объекты кнопок: `label` (подпись) и `onClick` (клик). У `primaryAction` есть ещё `loading` — состояние отправки. Оба пропса обязательны, подписи задаёт потребитель.

### Appearance (default `primary`)

Цвет основной кнопки:

- `primary` — зелёная filled-кнопка.
- `destructive` — красная filled-кнопка (для удаления).

Вторичная кнопка всегда outline neutral. Подписи обеих кнопок задаёт потребитель.

### Content slot

`content` — тело панели, любой ReactNode: сейчас текст, позже форма или шаги опросника. Поэтому предел свёрнутого состояния задаётся высотой `maxHeight` (по умолчанию `88` px), а не числом строк. Строка обрезается через `TruncateString`: число строк вычисляется из `maxHeight` с округлением вниз до целых строк, чтобы не резать глифы. Любое другое содержимое ограничивается по `maxHeight` как есть. Кнопка «Показать» появляется автоматически, если контент не влезает; «Скрыть» в раскрытом виде видна всегда. Подписи кнопки раскрытия — «Показать» / «Скрыть».

### Hint

`hint` — подпись под карточкой. Не рендерится, если не задана.

### Loading

`primaryAction.loading` — индикатор на основной кнопке, вторичная кнопка недоступна, повторный клик по основной отсекается; раскрытие описания остаётся доступным.

### Height

Корень не выше родителя (`max-height: 100%`). Заголовок и футер с кнопками остаются на месте; в раскрытом виде скроллится только слот контента.

## Установка

```bash
pnpm add @ds/ai-field-request
```

```ts
import { AiFieldRequest } from '@ds/ai-field-request';
```

## Примеры использования

### Default

Свёрнутое состояние: длинный текст обрезан по `maxHeight`, кнопка «Показать» появилась сама

```tsx
import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';

const CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Снимки и резервные копии останутся доступны в хранилище, восстановить машину из них можно в любой момент.';

export function Default() {
  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content={CONTENT}
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Primary}
      primaryAction={{ label: 'Подтвердить' }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
```

### Destructive

`appearance="destructive"` — красная основная кнопка

```tsx
import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';

export function Destructive() {
  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content='Диски будут удалены вместе с машиной. Операция необратима.'
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Destructive}
      primaryAction={{ label: 'Удалить' }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
```

### Expanded

Раскрытое состояние: содержимое целиком, кнопка «Скрыть»

```tsx
import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';
import { useState } from 'react';

const CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Снимки и резервные копии останутся доступны в хранилище, восстановить машину из них можно в любой момент. Сетевые интерфейсы и публичные адреса освободятся сразу после удаления.';

export function Expanded() {
  const [open, setOpen] = useState(true);

  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content={CONTENT}
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Primary}
      open={open}
      onOpenChange={setOpen}
      primaryAction={{ label: 'Подтвердить' }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
```

### Loading

`primaryAction.loading` — индикатор на основной кнопке, вторичная кнопка недоступна

```tsx
import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';

export function Loading() {
  return (
    <AiFieldRequest
      title='Удалить виртуальную машину?'
      content='Диски будут удалены вместе с машиной.'
      hint='Подсказка под панелью'
      appearance={APPEARANCE.Primary}
      primaryAction={{ label: 'Подтвердить', loading: true }}
      secondaryAction={{ label: 'Отмена' }}
    />
  );
}
```

## Props

**AiFieldRequestProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"destructive"` \| `"primary"` | `primary` | Цвет основной кнопки: `primary` или `destructive`. По умолчанию `primary`. |
| `className` | `string` | — | Доп. класс корня. |
| `content` | `ReactNode` | — | Слот тела панели (текст, форма, опросник). |
| `data-test-id` | `string` | `ai-field-request` |  |
| `hint` | `ReactNode` | — | Подпись под карточкой. Не рендерится, если не задана. |
| `maxHeight` | `number` | `88` | Максимальная высота свёрнутого содержимого в px. По умолчанию `88`. <br/> Слот принимает любой ReactNode, поэтому предел задаётся высотой, а не числом строк. <br/> Для строкового `content` высота округляется вниз до целого числа строк, чтобы не резать глифы; <br/> для любого другого содержимого это обычный предел по высоте. |
| `onOpenChange` | `((open: boolean) => void)` | — | Колбэк смены раскрытия. |
| `open` | `boolean` | — | Controlled — раскрыто содержимое. Без `open` компонент uncontrolled, стартует свёрнутым. |
| `primaryAction` | `AiFieldRequestAction` \| `AiFieldRequestPrimaryAction` | — | Основная кнопка действий: подпись, клик и состояние отправки. Обязательный пропс. |
| `secondaryAction` | `AiFieldRequestAction` | — | Вторичная кнопка действий: подпись и клик. Обязательный пропс. |
| `title` | `ReactNode` | — | Заголовок панели. Максимум две строки с обрезкой. Обязательный пропс. |

#### Related types

**AiFieldRequestAction**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Подпись кнопки. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement>) => void) \| undefined` | — | Клик по кнопке. |

**AiFieldRequestPrimaryAction**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Подпись кнопки. |
| `loading` | `boolean \| undefined` | — | Состояние отправки: индикатор на основной кнопке, вторичная кнопка недоступна. <br/> Раскрытие содержимого остаётся доступным. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement>) => void) \| undefined` | — | Клик по кнопке. |

- `Appearance` = `"destructive"` \| `"primary"`
