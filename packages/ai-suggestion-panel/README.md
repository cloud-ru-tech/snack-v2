# AiSuggestionPanel

`@ds/ai-suggestion-panel` — Полоса вопросов-подсказок к ассистенту — кнопка Giga, вопросы, «+N» со скрытыми вопросами и кнопка закрытия.

Полоса коротких вопросов к ассистенту: пользователь задаёт вопрос одним нажатием, компонент сообщает, какой вопрос нажат. Полоса второстепенна на странице — цветной в ней только логотип Giga.

## Когда использовать

- Рядом с контекстом, по которому ассистент может ответить: алерт, ресурс, страница сервиса.
- Когда вопросы известны заранее и их немного — до нескольких штук в одну строку.

Когда **не** нужен:

- Вопрос нужно ввести свободным текстом:
  - используйте поле запроса `@ds/ai-field-request`.
- Подсказка одна и стоит отдельно от полосы:
  - используйте `AiSuggestionSimple` из `@ds/ai-suggestion`.

Компонент не решает, когда показываться и скрываться, не отправляет вопрос ассистенту и не включает загрузку сам — это делает потребитель.

## Анатомия

Слева направо:

- Кнопка Giga — открывает тултип со ссылкой на документацию ассистента, сообщает о нажатии через `onLogoClick`.
- Вопросы — по одному сегменту на элемент `items`, между сегментами разделители.
- «+N» — появляется, когда вопросы не помещаются по ширине: открывает список скрытых вопросов.
- Кнопка закрытия — справа от рамки. Показывается, если передан `onClose`.

### Size (default `s`)

- `s` — высота 32.
- `m` — высота 40.

### Размеры

```tsx
import { AiSuggestionPanel, SIZE } from '@ds/ai-suggestion-panel';

const ITEMS = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
];

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <AiSuggestionPanel items={ITEMS} size={SIZE.S} />
      <AiSuggestionPanel items={ITEMS} size={SIZE.M} />
    </div>
  );
}
```

### Состояния вопроса

- `disabled` — подпись блёклая, нажатие не обрабатывается.
- `loading` — после подписи индикатор загрузки, повторное нажатие не обрабатывается.

Hover, pressed и focus реализованы через CSS (`:hover`, `:active`, `:focus-visible`). Кнопка закрытия на устройствах с курсором появляется при наведении на полосу или фокусе внутри неё, на сенсорных устройствах видна всегда.

### Перенос в «+N»

Подпись вопроса занимает одну строку и не обрезается. Полоса не переносит сегменты и не прокручивает их: те, что не помещаются в ширину контейнера, уходят в список «+N». Хотя бы один вопрос остаётся в полосе всегда.

## Установка

```bash
pnpm add @ds/ai-suggestion-panel
```

```ts
import { AiSuggestionPanel, SIZE } from '@ds/ai-suggestion-panel';
```

## Примеры использования

### Базовый

Вопросы, которые не помещаются по ширине, уходят в «+N»

```tsx
import { AiSuggestionPanel } from '@ds/ai-suggestion-panel';
import { Typography } from '@ds/typography';
import { useState } from 'react';

const ITEMS = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-monitoring', label: 'Как настроить мониторинг всех ВМ?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
  { value: 'alert-vm-off', label: 'Как создать алерт, если ВМ выключена?' },
  { value: 'vm-metrics', label: 'Какие проблемы видны по метрикам ВМ?' },
];

export function Basic() {
  const [selected, setSelected] = useState<string>();
  const selectedLabel = ITEMS.find(item => item.value === selected)?.label;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <AiSuggestionPanel items={ITEMS} onItemClick={setSelected} />
      <Typography variant='body' size='s'>
        {selectedLabel ? `Выбран вопрос: ${selectedLabel}` : 'Нажмите на вопрос'}
      </Typography>
    </div>
  );
}
```

### Загрузка ответа

Нажатый вопрос переходит в loading, пока ассистент отвечает

```tsx
import { AiSuggestionPanel, AiSuggestionPanelItem } from '@ds/ai-suggestion-panel';
import { useEffect, useState } from 'react';

const QUESTIONS: AiSuggestionPanelItem[] = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-monitoring', label: 'Как настроить мониторинг всех ВМ?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
];

/** Время «ответа ассистента» в демо. */
const ANSWER_DELAY_MS = 2000;

export function LoadingFlow() {
  const [pendingValue, setPendingValue] = useState<string>();

  useEffect(() => {
    if (!pendingValue) return;

    const timer = setTimeout(() => setPendingValue(undefined), ANSWER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [pendingValue]);

  const items = QUESTIONS.map(question => ({ ...question, loading: question.value === pendingValue }));

  return <AiSuggestionPanel items={items} onItemClick={setPendingValue} />;
}
```

### Кнопка закрытия

onClose только сообщает о нажатии — полосу скрывает потребитель

```tsx
import { AiSuggestionPanel } from '@ds/ai-suggestion-panel';
import { Button } from '@ds/button';
import { useState } from 'react';

const ITEMS = [
  { value: 'alert-reason', label: 'Почему сработал алерт?' },
  { value: 'vm-traffic', label: 'Где посмотреть трафик ВМ?' },
];

export function WithClose() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button label='Показать подсказки' view='outline' appearance='neutral' onClick={() => setVisible(true)} />;
  }

  return <AiSuggestionPanel items={ITEMS} onClose={() => setVisible(false)} />;
}
```

## Props

**AiSuggestionPanelProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корня. |
| `data-test-id` | `string` | — |  |
| `docsUrl` | `string` | `https://cloud.ru/docs/ai_assistant_cloudia/ug/index` | Ссылка «Документация» в тултипе кнопки Giga. |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ссылка на корневой элемент. |
| `items` | `AiSuggestionPanelItem` | — | Вопросы полосы. Те, что не помещаются по ширине, компонент переносит в сегмент «+N» <br/> со списком. |
| `layoutPresets` | `AiSuggestionPanelLayoutDefaults` \| `LayoutPresets` | — | Переопределение пресетов раскладки (`mobile`, `desktop`, …) для `size`. |
| `onClose` | `(() => void)` | — | Нажатие на кнопку закрытия. Без колбэка кнопка не показывается. Полосу компонент не скрывает. |
| `onItemClick` | `((value: string) => void)` | — | Нажатие на вопрос — в полосе или в списке «+N». |
| `onLogoClick` | `(() => void)` | — | Нажатие на кнопку Giga. |
| `size` | `"m"` \| `"s"` | — | Размер полосы: `s` — высота 32, `m` — высота 40. По умолчанию `s`, на mobile-раскладке — `m`. <br/> Явное значение задаёт desktop; mobile переопределяется через `layoutPresets.mobile`. |

#### Related types

**AiSuggestionPanelItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean \| undefined` | — | Неактивный вопрос: нажатие не обрабатывается. |
| `label` | `string` | — | Текст вопроса. Занимает одну строку и не обрезается. |
| `loading` | `boolean \| undefined` | — | Вопрос отправляется ассистенту: после подписи показывается индикатор загрузки, повторное <br/> нажатие не обрабатывается. Состояние выставляет потребитель. |
| `value` | `string` | — | Идентификатор вопроса; приходит в `onItemClick`. |

**AiSuggestionPanelLayoutDefaults**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"m"` \| `"s"` | — | Размер полосы. |

- `Size` = `"m"` \| `"s"`

## Смотри также

- **`@ds/ai-suggestion`** — отдельная подсказка-чип и раскрывающаяся группа.
- **`@ds/ai-button-giga`** — кнопка Giga, из которой собрана ячейка логотипа.
## Адаптивность

`AiSuggestionPanel` — адаптивный компонент класса preset-defaults: DOM один, по раскладке меняются только дефолты пропсов. Раскладку компонент читает из контекста **`@ds/adaptive`** — отдельного пропа `layoutType` нет.

На mobile полоса размера `m` и повторяет макет мобильной раскладки: высота 40, подпись 14/20, кнопка Giga 40, кнопка закрытия 32.

| Проп | desktop | mobile |
|------|---------|--------|
| `size` | `s` | `m` |

Источник mobile-дефолтов — экспортируемая константа `AI_SUGGESTION_PANEL_LAYOUT_PRESETS`.

### Как переопределить

Приоритет (от высшего к низшему): `layoutPresets[layout]` (инстанс) → DS-пресет `AI_SUGGESTION_PANEL_LAYOUT_PRESETS` → явный проп (= desktop-значение) → базовый дефолт.

```tsx
import { AiSuggestionPanel } from '@ds/ai-suggestion-panel'

// Явный проп задаёт desktop-значение, на mobile полоса остаётся размера m
<AiSuggestionPanel items={items} size='m' />

// Оставить размер s на mobile
<AiSuggestionPanel items={items} layoutPresets={{ mobile: { size: 's' } }} />
```
