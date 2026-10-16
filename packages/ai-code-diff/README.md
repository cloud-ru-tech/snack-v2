# AiCodeDiff

`@ds/ai-code-diff` — Количество добавленных и удаленных строк кода

`AiCodeDiff` показывает сводку изменений: число добавленных и удалённых строк. Компонент не считает diff и не открывает просмотр кода — целые количества передаёт потребитель, знаки `+` и `-` ставит компонент.

## Когда использовать

- Компактная сводка рядом с файлом, коммитом или строкой истории.
- Нужны только два числа и разделитель, без тела diff.

### Когда не нужен

- Нужно показать сами строки кода:
  - соберите просмотр отдельно, `AiCodeDiff` остаётся подписью.
- Нужно сократить большие числа (`1.2k`) или показать дробное значение:
  - `added` и `removed` — целые неотрицательные числа, компонент показывает их как есть.

## Анатомия

Горизонтальная строка из трёх текстов: добавленные строки, разделитель, удалённые строки. Ширина зависит от текста.

### Size (default `m`)

- `m` — типографика body 14/20.
- `s` — типографика body 12/16.

Цвета фиксированы: добавленные строки зелёные, удалённые красные, разделитель третичный.

## Установка

```bash
pnpm add @ds/ai-code-diff
```

```ts
import { AiCodeDiff } from '@ds/ai-code-diff';
```

## Примеры использования

### Размеры

m и s на одних и тех же строках

```tsx
import { AiCodeDiff, SIZE } from '@ds/ai-code-diff';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiCodeDiff added={83} removed={26} size={SIZE.M} />
      <AiCodeDiff added={83} removed={26} size={SIZE.S} />
    </div>
  );
}
```

### Длинные значения

Крупные целые числа

```tsx
import { AiCodeDiff } from '@ds/ai-code-diff';

export function LongCounts() {
  return <AiCodeDiff added={1200} removed={48} />;
}
```

### Свой разделитель

По умолчанию «/», его можно заменить

```tsx
import { AiCodeDiff } from '@ds/ai-code-diff';

export function CustomSeparator() {
  return <AiCodeDiff added={83} removed={26} separator='·' />;
}
```

## Props

**AiCodeDiffProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `added` | `number` | — | Количество добавленных строк. Целое неотрицательное число, знак `+` ставит компонент. |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `removed` | `number` | — | Количество удалённых строк. Целое неотрицательное число, знак `-` ставит компонент. |
| `separator` | `string` | `/` | Разделитель между added и removed. |
| `size` | `"m"` \| `"s"` | `m` | Типографика. |

#### Related types

- `Size` = `"m"` \| `"s"`
