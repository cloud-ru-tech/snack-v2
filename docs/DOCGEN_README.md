# Система генерации документации

Система автоматической генерации документации для компонентов дизайн-системы.

## Обзор

Система состоит из двух основных частей:

1. **Docgen** - генерирует таблицу пропсов в `docs/index.mdx` из TypeScript типов
2. **ReadmeGenerator** - генерирует краткий `README.md` из документации

## Структура файлов

```
packages/avatar/
├── src/
│   └── index.ts          # Экспорты компонента с типами
├── docs/
│   └── index.mdx         # Полная документация с примерами
└── README.md             # Краткий README (автогенерируемый)
```

## Процесс генерации

### 1. Таблица пропсов в документацию

**Источник:** TypeScript типы из `src/index.ts`  
**Цель:** `docs/index.mdx` между плейсхолдерами

В документации должны быть плейсхолдеры:

```markdown
## Props

[//]: DOCUMENTATION_SECTION_START
[//]: DOCUMENTATION_SECTION_END
```

Запуск: `npm run docgen`

### 2. Генерация README

**Источник:** `docs/index.mdx` и `src/index.ts`  
**Цель:** `README.md`

README автоматически извлекает:
- Краткое описание из frontmatter или первого параграфа
- Список экспортов из `src/index.ts`
- Примеры использования из секции Usage
- Best practices из документации

Запуск: `npm run docgen:readme`

### 3. Полная генерация

Генерирует и таблицу пропсов, и README:

```bash
npm run docgen:all
```

## Автоматическая генерация при коммитах

При коммите изменений в пакете автоматически:

1. Обновляется таблица пропсов в `docs/index.mdx`
2. Обновляется `README.md`
3. Оба файла добавляются в commit

Это происходит через pre-commit hook:

```bash
npm run docgen:staged
```

## Структура README

Автоматически генерируемый README содержит:

```markdown
# ComponentName

Краткое описание компонента

## Installation

npm/yarn/pnpm команды

## Exports

```typescript
import { Component, types, constants } from '@design-system/package';
```

## Usage

### Example 1
```tsx
// код примера из документации
```

### Example 2
```tsx
// еще примеры
```

## Best Practices

1. Рекомендация 1
2. Рекомендация 2
...

## Additional Resources

Ссылки на документацию, changelog, migration guide
```

## Требования к компонентам

### TypeScript типы

Компоненты должны быть типизированы с JSDoc комментариями:

```typescript
export type AvatarProps = {
  /** Имя пользователя для генерации аббревиатуры */
  name: string;
  /** URL изображения аватара */
  src?: string;
  /** Размер */
  size?: Size;
};
```

### Документация

В `docs/index.mdx` должны быть секции:

```markdown
---
description: Краткое описание компонента
---

# ComponentName

Полное описание

## Usage

### Basic example
```tsx
// код
```

### With props
```tsx
// код
```

## Props

[//]: DOCUMENTATION_SECTION_START
[//]: DOCUMENTATION_SECTION_END

## Best practices

1. Рекомендация 1
2. Рекомендация 2
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run docgen` | Генерация таблицы пропсов в docs/index.mdx |
| `npm run docgen:readme` | Генерация README.md из документации |
| `npm run docgen:all` | Полная генерация (props + README) |
| `npm run docgen:staged` | Генерация для staged файлов (автоматически в pre-commit) |

## Пример для нового компонента

1. Создайте типизированный компонент с JSDoc комментариями
2. Создайте `docs/index.mdx` с секциями Usage, Props (с плейсхолдерами), Best practices
3. Запустите `npm run docgen:all`
4. Проверьте сгенерированные файлы

## Кастомизация

Для особых случаев можно создать `doc.config.ts` в корне пакета:

```typescript
import { ParserOptions } from 'react-docgen-typescript';

export const config: ParserOptions = {
  propFilter: (prop) => {
    // Кастомная фильтрация пропсов
    return !prop.name.startsWith('data-');
  },
};
```

## Отладка

Если генерация не работает, проверьте:

1. ✅ Есть плейсхолдеры в `docs/index.mdx`
2. ✅ Компонент экспортируется из `src/index.ts`
3. ✅ Типы имеют JSDoc комментарии
4. ✅ В документации есть секции Usage и Best practices
5. ✅ Формат секций соответствует ожидаемому (заголовки ###, блоки кода)
