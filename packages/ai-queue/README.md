# ai-queue

`@ds/ai-queue` — 

## AiQueue

### Props `AiQueueProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный CSS-класс корня. |
| `data-test-id` | `string` | `ai-queue` |  |
| `defaultOpen` | `boolean` | `false` | Начальное состояние раскрытия в uncontrolled-режиме. |
| `labels` | `AiQueueLabels` | — | Тексты счётчика в заголовке. |
| `onOpenChange` | `((open: boolean) => void)` | — | Коллбек изменения раскрытия. |
| `open` | `boolean` | — | Контролируемое состояние раскрытия. |
| `steps` | `AiQueueStep` | `[]` | Шаги очереди. |
| `summary` | `AiQueueSummary` | — | Принудительные счётчики в заголовке; если не заданы, считаются по `steps`. |

#### Related types

**AiQueueLabels**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `done` | `string` | — |  |
| `inProgress` | `string` | — |  |
| `planned` | `string` | — |  |
| `tasks` | `string` | — |  |

**AiQueueStep**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number \| undefined` | — |  |
| `label` | `string` | — |  |
| `state` | `"done"` \| `"error"` \| `"planned"` \| `"progress"` | — |  |

- `AiQueueStepState` = `"done"` \| `"error"` \| `"planned"` \| `"progress"`

**AiQueueSummary**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `done` | `number \| undefined` | — |  |
| `planned` | `number \| undefined` | — |  |
| `progress` | `number \| undefined` | — |  |
| `total` | `number \| undefined` | — |  |

## AiQueueStepStatus

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `"done"` \| `"error"` \| `"planned"` \| `"progress"` | — |  |
