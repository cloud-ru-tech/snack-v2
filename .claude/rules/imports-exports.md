# Импорты и экспорты

**Область действия:** `**/*.ts`, `**/*.tsx`.

## Импорты типов

Не используй ключевое слово `type` при импорте типов. Импортируй значения и типы одним оператором `import { ... }`.

```ts
// ❌ Плохо
import type { Size, Orientation } from './types'
import { type TabBarProps } from './TabBar'

// ✅ Хорошо
import { Size, Orientation } from './types'
import { Tabs } from './components'
import { TabBarProps, TabProps } from './TabBar'
```

Типы и значения из одного модуля — один импорт, без `import type` и без `type` в списке.

## Экспорты

Не выделяй экспорт типов отдельной строкой или отдельным блоком `export type`. Экспортируй значения и типы вместе через `export *` или общим списком без `type`.

```ts
// ❌ Плохо
export { Tabs, TabBar } from './components'
export type { TabsProps, TabBarProps } from './components'

// ✅ Хорошо
export * from './components'
```

```ts
// ❌ Плохо
export { SIZE, ORIENTATION } from './constants'
export type { Size, Orientation } from './types'

// ✅ Хорошо
export * from './constants'
export * from './types'
```

## Экспорт компонентов

Для папки-бареля с компонентами используй реэкспорт через `export *` из каждого модуля.

```ts
// ✅ Хорошо — src/components/index.ts
export * from './Tabs'
export * from './Tab'
export * from './TabBar'
export * from './TabContent'
export * from './ScrollButton'
```

Корневой `src/index.ts` пакета — реэкспорт через `export *` по секциям.

```ts
// ✅ Хорошо — src/index.ts
export * from './components'
export * from './constants'
export * from './context'
export * from './types'
export * from './utils'
```

## Исключения

`export *` может раздувать публичный API. Если нужно прицельно ограничить экспорт (внутренние хелперы, совпадающие имена из разных модулей) — пиши явный список без `type`:

```ts
// ✅ Приемлемо, когда import * слишком широкий
export { Popover, PopoverProps } from './components/Popover'
export { TRIGGER, PLACEMENT } from './constants'
```

Связанное правило: никаких `React.*`-типов. См. [react-types.md](./react-types.md).
