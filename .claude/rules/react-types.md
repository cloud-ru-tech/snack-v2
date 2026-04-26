# Типы React

**Область действия:** `**/*.ts`, `**/*.tsx`.

Не используй доступ к типам через пространство имён `React.*`. Импортируй типы напрямую из `'react'` и используй их по имени.

## Примеры

```ts
// ❌ Плохо
children: React.ReactNode;
style: React.CSSProperties;
(Story: React.ComponentType) => ...
} & React.HTMLAttributes<HTMLDivElement>;
as?: React.ElementType;

// ✅ Хорошо
import { ReactNode, CSSProperties, ComponentType, HTMLAttributes, ElementType } from 'react'

children: ReactNode
style: CSSProperties
(Story: ComponentType) => ...
} & HTMLAttributes<HTMLDivElement>
as?: ElementType
```

## Частые типы

| Вместо | Импорт и использование |
|--------|------------------------|
| `React.ReactNode` | `import { ReactNode } from 'react'` → `ReactNode` |
| `React.CSSProperties` | `import { CSSProperties } from 'react'` → `CSSProperties` |
| `React.ComponentType` | `import { ComponentType } from 'react'` → `ComponentType` |
| `React.ElementType` | `import { ElementType } from 'react'` → `ElementType` |
| `React.HTMLAttributes<T>` | `import { HTMLAttributes } from 'react'` → `HTMLAttributes<T>` |
| `React.ComponentPropsWithoutRef<T>` | `import { ComponentPropsWithoutRef } from 'react'` → `ComponentPropsWithoutRef<T>` |
| `React.MouseEvent<T>` | `import { MouseEvent } from 'react'` → `MouseEvent<T>` |
| `React.FC` / `React.FunctionComponent` | Не использовать. Типизируй пропсы явным объектным типом. |

В комментариях и документации тоже не писать `React.HTMLAttributes` — писать «HTMLAttributes из `react`» или «HTML-атрибуты».

## Связанное правило

Импорт типов — без ключевого слова `type` (одним импортом вместе со значениями). См. [imports-exports.md](./imports-exports.md).
