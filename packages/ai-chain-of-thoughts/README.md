# AiChainOfThoughts

`@ds/ai-chain-of-thoughts` — Цепочка рассуждений AI-агента (Chain of Thoughts) — сворачиваемый заголовок «Размышляю» с длительностью и список строк-инструментов.

`AiChainOfThoughts` — цепочка рассуждений AI-агента (Chain of Thoughts) для Гига-помощника: сворачиваемый заголовок «Размышляю» / «Размышлял» с длительностью и список строк-инструментов под ним.

Раскрытие — controlled (`open` + `onOpenChange`) либо uncontrolled (`defaultOpen`). Контент цепочки передаётся слотом `children` (строки `@ds/ai-tool`), сам компонент его не запоминает.

## Когда использовать

- Показ процесса рассуждения агента в чате: заголовок со статусом и список выполненных шагов-инструментов.
- Потоковое отображение размышлений (стриминг) — заголовок остаётся, контент дополняется по мере поступления шагов.

### Когда не нужен

- Одиночный шаг reasoning без заголовка-цепочки:
  - используйте `@ds/ai-reasoning`.
- Отдельный вызов инструмента вне цепочки:
  - используйте `AiTool` / `AiToolSimple` из `@ds/ai-tool`.

## Анатомия

### InProgress (default `true`)

- `true` — слева иконка (по умолчанию GigaChat), подпись «Размышляю» (настоящее время) и длительность. По умолчанию shimmer покрывает иконку Giga и подпись.
- `false` — без иконки, подпись «Размышлял» (прошедшее время), без shimmer.

### Icon (default `GigaChat`)

Слот `icon` в активном состоянии (`inProgress` или `broken`):

- не передан — иконка GigaChat;
- передан React-узел — кастомная иконка (например Sun Loader);
- `null` — иконка скрыта.

При включённом `shimmer` любая иконка заливается волной вместе с подписью, см. раздел «Shimmer».

Проп прокидывается с `AiChainOfThoughts` в `AiChainOfThoughtsHeadline`.

### Shimmer (default `true`)

В активном состоянии по строке заголовка идёт брендовая волна: сине-зелёная полоса проходит слева направо за 3 секунды, затем держит паузу 2 секунды. Параметры волны заданы в `@ds/ai-shimmer`.

Волна покрывает иконку, подпись и длительность одной сплошной полосой. Своя иконка из `icon` переливается наравне с GigaChat, а `Sun` из `@ds/loader` — ещё и с собственной анимацией внутри волны. `shimmer={false}` возвращает статичную строку с обычной иерархией цветов и не сдвигает ни один элемент ряда.

Проп прокидывается с `AiChainOfThoughts` в Headline.

### Broken (default `false`)

Поток рассуждения прерван: вместо длительности и chevron'а заголовок показывает сообщение `brokenMessage`, контент-цепочка не раскрывается.

### Open (default `false`)

Раскрытие контент-цепочки. Chevron в заголовке появляется только при наличии `children` и вне состояния `broken`.

## Установка

```bash
pnpm add @ds/ai-chain-of-thoughts
```

```ts
import { AiChainOfThoughts, AiChainOfThoughtsHeadline } from '@ds/ai-chain-of-thoughts'
```

## Примеры использования

### Default

Цепочка с раскрытым списком инструментов

```tsx
import { AiChainOfThoughts } from '@ds/ai-chain-of-thoughts';
import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolSimple } from '@ds/ai-tool';

export function Default() {
  return (
    <AiChainOfThoughts inProgress duration={31568949} defaultOpen>
      <AiToolSimple name='status_for_users' icon={AI_TOOL_ICON_TYPE.Search} connector />
      <AiTool
        name='status_for_users'
        icon={AI_TOOL_ICON_TYPE.Search}
        state={AI_TOOL_STATUS_STATE.Success}
        duration={9}
        call='{ "user_ids": [1, 2, 3] }'
      />
    </AiChainOfThoughts>
  );
}
```

### Broken

Прерванный поток рассуждения

```tsx
import { AiChainOfThoughts } from '@ds/ai-chain-of-thoughts';

export function Broken() {
  return <AiChainOfThoughts broken />;
}
```

### Headline

Заголовок в процессе и завершённый

```tsx
import { AiChainOfThoughtsHeadline } from '@ds/ai-chain-of-thoughts';

export function HeadlineStates() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AiChainOfThoughtsHeadline inProgress duration={31568949} />
      <AiChainOfThoughtsHeadline inProgress={false} duration={31568949} />
    </div>
  );
}
```

## Props

### AiChainOfThoughts

**AiChainOfThoughtsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `broken` | `boolean` | `false` | Поток рассуждения прерван. Заголовок показывает сообщение `brokenMessage`, <br/> контент-цепочка не раскрывается. По умолчанию `false`. |
| `brokenMessage` | `ReactNode` | — | Текст сообщения о прерванном потоке (показывается при `broken`). |
| `children` | `ReactNode` | — | Контент-цепочка рассуждения — строки `AiTool` / `AiToolSimple`. Рендерится <br/> под заголовком в раскрытом состоянии. |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-chain-of-thoughts` |  |
| `defaultOpen` | `boolean` | `false` | Начальное раскрытое состояние (uncontrolled). По умолчанию `false`. |
| `duration` | `number` | — | Длительность рассуждения в секундах. Форматируется в д/ч/м/с. |
| `icon` | `ReactNode` | — | Иконка слева от подписи в активном состоянии. По умолчанию — GigaChat, `null` скрывает. <br/> Ожидается SVG-иконка: из `@ds/icons`, `AiIconGiga` или `Sun`; при включённом `shimmer` <br/> она заливается волной вместе с подписью. |
| `inProgress` | `boolean` | `true` | Идёт ли рассуждение прямо сейчас. `true` — иконка GigaChat и подпись <br/> «Размышляю»; `false` — без иконки и «Размышлял». По умолчанию `true`. |
| `label` | `ReactNode` | — | Подпись заголовка. По умолчанию «Размышляю» / «Размышлял» — по `inProgress`. |
| `onOpenChange` | `((open: boolean) => void)` | — | Переключение раскрытия. Получает новое значение `open`. |
| `open` | `boolean` | — | Раскрытое состояние (controlled). Для uncontrolled-режима — `defaultOpen`. |
| `shimmer` | `boolean` | `true` | Shimmer на подписи «Размышляю» в активном состоянии. По умолчанию `true`. |

### AiChainOfThoughtsHeadline

**AiChainOfThoughtsHeadlineProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `broken` | `boolean` | `false` | Поток рассуждения прерван. Вместо длительности и chevron'а под подписью <br/> показывается сообщение `brokenMessage`. По умолчанию `false`. |
| `brokenMessage` | `ReactNode` | — | Текст сообщения о прерванном потоке (показывается при `broken`). |
| `className` | `string` | — | Доп. класс корня. |
| `collapsible` | `boolean` | `false` | Рендерить ли chevron-кнопку раскрытия. Управляется родителем <br/> (`AiChainOfThoughts` ставит `true`, когда есть раскрываемый контент). <br/> В состоянии `broken` chevron не рендерится. По умолчанию `false`. |
| `data-test-id` | `string` | `ai-chain-of-thoughts-headline` |  |
| `duration` | `number` | — | Длительность рассуждения в секундах. Форматируется в д/ч/м/с (ведущие <br/> нулевые единицы опускаются, секунды показываются всегда). |
| `icon` | `ReactNode` | — | Иконка слева от подписи в активном состоянии. По умолчанию — GigaChat, `null` скрывает. <br/> Ожидается SVG-иконка: из `@ds/icons`, `AiIconGiga` или `Sun`; при включённом `shimmer` <br/> она заливается волной вместе с подписью. |
| `inProgress` | `boolean` | `true` | Идёт ли рассуждение прямо сейчас. `true` — слева иконка GigaChat и подпись <br/> «Размышляю» (настоящее время); `false` — без иконки и «Размышлял» <br/> (прошедшее время). По умолчанию `true`. |
| `label` | `ReactNode` | — | Подпись заголовка. По умолчанию «Размышляю» / «Размышлял» — по `inProgress`. |
| `onOpenChange` | `((open: boolean) => void)` | — | Клик по chevron'у. Получает новое значение `open`. |
| `open` | `boolean` | `false` | Раскрытое состояние — задаёт направление chevron'а. По умолчанию `false`. |
| `shimmer` | `boolean` | `true` | Shimmer на подписи «Размышляю» в активном состоянии. По умолчанию `true`. |
