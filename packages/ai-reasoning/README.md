# AiReasoning

`@ds/ai-reasoning` — Строка reasoning в AI-цепочке со степпер-линией, иконкой и текстовым описанием шага.

`AiReasoning` — презентационный элемент для показа промежуточного шага reasoning в AI-цепочке: иконка, вертикальная степпер-линия и краткое описание текущего шага.

## Когда использовать

- В timeline/chain-of-thought интерфейсах, где нужно компактно показать служебный reasoning-шаг.
- Перед или между блоками выполнения tool-вызовов.

## Анатомия

### Description + Children

`description` рендерится верхней строкой, а `children` можно прокинуть как вложенный контент ниже (например карточку с деталями запроса/ответа).  
Высота шага вычисляется по всему контенту, поэтому линия степпера растягивается вместе с `children`.

### Icon

Иконка шага фиксированная: `ProductIcons.DotSmallSVG`.

### Stepper line (default `true`)

- `true` — показывает продолжение степпера вниз (промежуточный шаг).
- `false` — скрывает продолжение (последний шаг цепочки).

### Connector (default `stepperLine`)

`connector` позволяет явно переопределить видимость нижнего коннектора:

- `true` — коннектор виден всегда.
- `false` — коннектор скрыт даже при `stepperLine=true`.
- не передан — поведение наследуется от `stepperLine`.

## Установка

```bash
pnpm add @ds/ai-reasoning
```

```ts
import { AiReasoning } from '@ds/ai-reasoning'
```

## Примеры использования

### Default

Базовый reasoning шаг

```tsx
import { AiReasoning } from '@ds/ai-reasoning';

export function Default() {
  return <AiReasoning description='Tool is reasoning about the next action' />;
}
```

## AiReasoning

```tsx
import { AiReasoning } from '@ds/ai-reasoning';

export function Default() {
  return <AiReasoning description='Tool is reasoning about the next action' />;
}
```

### Props `AiReasoningProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Дополнительный контент под описанием (например, карточка с деталями). |
| `className` | `string` | — | Дополнительный CSS-класс корневого контейнера. |
| `connector` | `boolean` | — | Явно управляет нижним коннектором. Если не передан, совпадает с `stepperLine`. |
| `data-test-id` | `string` | `ai-reasoning` |  |
| `description` | `ReactNode` | — | Текстовый контент блока reasoning. |
| `stepperLine` | `boolean` | `true` | Показывает продолжение степпера вниз (для промежуточного шага). |
