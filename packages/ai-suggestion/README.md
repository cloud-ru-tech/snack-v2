# AiSuggestion

`@ds/ai-suggestion` — AI-подсказки — простой чип и раскрывающаяся группа с вложенными подсказками.

Компонент **Suggestion / Simple** — pill-чип для AI-сценариев: быстрый выбор подсказки с иконкой и коротким текстом.

## Когда использовать

- Подсказки в AI-чате или поиске с генерацией.
- Быстрые действия рядом с полем ввода (suggested prompts).

## Анатомия

### Appearance

- `neutral` — нейтральная обводка и серый текст (Figma: Primary=Off).
- `primary` — акцентная обводка и зелёный текст (Figma: Primary=On).

### Size

- `s` — компактный размер, 32px по высоте (Figma: Mobile=Off).
- `m` — увеличенный размер, 40px по высоте (Figma: Mobile=On).

Состояния hover и focus реализованы через CSS (`:hover`, `:focus-visible`), а не через пропы.

## Установка

```bash
pnpm add @ds/ai-suggestion
```

```ts
import { AiSuggestionSimple, AiSuggestionParent, APPEARANCE, CHILD_TYPE, SIZE } from '@ds/ai-suggestion';
```

## Примеры

### Базовый

```tsx
import { AiSuggestionSimple, APPEARANCE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';

export function Basic() {
  return (
    <AiSuggestionSimple label='Label text' icon={<PlaceholderSVG />} appearance={APPEARANCE.Primary} size={SIZE.M} />
  );
}
```

## AiSuggestionParent

Компонент **Suggestion / Parent** — триггер с chevron; по клику в одну строку показывает вложенные `AiSuggestionSimple` и другие `AiSuggestionParent` (рекурсивно). Список задаётся пропом `items`. Повторный клик по триггеру сворачивает группу.

- `expanded` / `onExpandedChange` — controlled / uncontrolled раскрытие (без `expanded` по умолчанию свёрнут).
- В свёрнутом виде триггер `neutral` (Figma: Activated=Off), в раскрытом — `primary` (Activated=On).
- Вложенные подсказки в `items` всегда рендерятся как `AiSuggestionSimple` с `appearance="primary"`; проп `appearance` для элементов списка недоступен.
- Элемент `items`: без `type` или `type: 'suggestion'` → `AiSuggestionSimple`; `type: 'parent'` → вложенная группа.

### Раскрывающаяся группа

```tsx
import { AiSuggestionParent, CHILD_TYPE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';

export function ParentExpandable() {
  return (
    <AiSuggestionParent
      label='Label text'
      icon={<PlaceholderSVG />}
      items={[
        { label: 'Suggestion 1', icon: <PlaceholderSVG /> },
        { label: 'Suggestion 2' },
        {
          type: CHILD_TYPE.Parent,
          label: 'More',
          icon: <PlaceholderSVG />,
          items: [
            { label: 'Nested A' },
            {
              label: 'More nested',
              items: [{ label: 'Nested B' }, { label: 'Nested C' }],
            },
          ],
        },
      ]}
    />
  );
}
```

### Controlled parent

```tsx
import { AiSuggestionParent, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';
import { useState } from 'react';

export function ControlledParent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <AiSuggestionParent
      label='Suggested actions'
      icon={<PlaceholderSVG />}
      size={SIZE.S}
      expanded={expanded}
      onExpandedChange={setExpanded}
      items={[{ label: 'Summarize this thread' }, { label: 'Write follow-up email' }, { label: 'Create TODO list' }]}
    />
  );
}
```

### Nested groups

```tsx
import { AiSuggestionParent, CHILD_TYPE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';

export function NestedParent() {
  return (
    <AiSuggestionParent
      label='Label text'
      icon={<PlaceholderSVG />}
      size={SIZE.S}
      items={[
        { label: 'Simple suggestion A' },
        {
          type: CHILD_TYPE.Parent,
          key: 'group-a',
          label: 'Group A',
          icon: <PlaceholderSVG />,
          items: [{ label: 'A 1' }, { label: 'A 2' }],
        },
        {
          type: CHILD_TYPE.Parent,
          key: 'group-b',
          label: 'Group B',
          icon: <PlaceholderSVG />,
          items: [
            { label: 'B 1' },
            {
              type: CHILD_TYPE.Parent,
              key: 'group-b-2',
              label: 'Group B.2',
              icon: <PlaceholderSVG />,
              items: [{ label: 'B 2.1' }],
            },
          ],
        },
      ]}
    />
  );
}
```

## Свойства

#### AiSuggestionSimple

**AiSuggestionSimpleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"neutral"` \| `"primary"` | `neutral` | Внешний вид (Figma: Primary On/Off) |
| `className` | `string` | — | Дополнительный CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | `false` | Блокирует взаимодействие |
| `icon` | `ReactNode` | — | Иконка слева от текста |
| `label` | `string` | `Label text` | Текст подсказки |
| `size` | `"m"` \| `"s"` | `s` | Размер (Figma: Mobile Off → `s`, Mobile On → `m`) |

#### Related types

- `Appearance` = `"neutral"` \| `"primary"`

- `Size` = `"m"` \| `"s"`

#### AiSuggestionParent

**AiSuggestionParentInternalProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный CSS-класс |
| `data-test-id` | `string` | — |  |
| `defaultExpanded` | `boolean` | `false` | Uncontrolled — initial expanded |
| `disabled` | `boolean` | `false` | Блокирует взаимодействие |
| `expanded` | `boolean` | — | Controlled — раскрыт (Figma: Activated=On) |
| `icon` | `ReactNode` | — | Иконка слева от текста |
| `items` | `AiSuggestionParentItem` \| `AiSuggestionParentNestedItem` \| `AiSuggestionParentSuggestionItem` | `[]` | Вложенные подсказки и группы |
| `label` | `string` | `Label text` | Текст на триггере |
| `onExpandedChange` | `((expanded: boolean) => void)` | — | Колбэк toggle (controlled и uncontrolled) |
| `onItemClick` | `((index: number, event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Колбэк клика по вложенной подсказке |
| `shown` | `boolean` | `true` | Родительская группа раскрыта — управляет видимостью вложенной ветки |
| `size` | `"m"` \| `"s"` | `s` | Размер (Figma: Mobile Off → `s`, Mobile On → `m`) |

#### Related types

- `AiSuggestionParentItem` = `AiSuggestionParentSuggestionItem | AiSuggestionParentNestedItem`

**AiSuggestionParentNestedItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean \| undefined` | — |  |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `items` | `AiSuggestionParentItem` \| `AiSuggestionParentNestedItem` \| `AiSuggestionParentSuggestionItem` | — |  |
| `key` | `string \| undefined` | — |  |
| `label` | `string \| undefined` | — |  |
| `type` | `"parent"` | — |  |

**AiSuggestionParentSuggestionItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean \| undefined` | — |  |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `items` | `undefined` | — |  |
| `key` | `string \| undefined` | — |  |
| `label` | `string \| undefined` | — |  |
| `onClick` | `((event: MouseEvent<HTMLButtonElement>) => void) \| undefined` | — |  |
| `type` | `"suggestion"` | — |  |

- `Size` = `"m"` \| `"s"`
