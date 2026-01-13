# Быстрый старт: i18n для документации

## Проблема

Дублирование кода при документировании на нескольких языках:
- Та же структура повторяется в каждом языковом файле
- Те же примеры, только с другим текстом
- Сложно поддерживать согласованность

## Решение

**Единый каркас + Словари переводов**

## Структура

```
packages/avatar/docs/
  i18n/
    en.ts              # Английские переводы
    ru.ts              # Русские переводы
    index.ts           # Экспорт
  index.i18n.mdx       # Единый MDX файл
```

## Как использовать

### 1. Создайте файлы переводов

**`i18n/en.ts`:**

```typescript
export const en = {
  title: 'Avatar',
  description: 'Component description',
  overview: {
    title: 'Overview',
    text: 'Component overview...',
  },
};

export type AvatarTranslations = typeof en;
```

**`i18n/ru.ts`:**

```typescript
import type { AvatarTranslations } from './en';

export const ru: AvatarTranslations = {
  title: 'Avatar (Аватар)',
  description: 'Описание компонента',
  overview: {
    title: 'Обзор',
    text: 'Обзор компонента...',
  },
};
```

**`i18n/index.ts`:**

```typescript
import { en } from './en';
import { ru } from './ru';

export const translations = { en, ru };
```

### 2. Создайте единый MDX файл

**`index.i18n.mdx`:**

```mdx
---
title: Avatar
locale: en
---

import { translations } from './i18n';
import { LocaleProvider, LocaleSwitch, LocaleCase } from '../../../apps/docs/src/components/Trans';

export const t = translations;

<LocaleProvider locale={frontmatter.locale || 'en'}>

# {t[frontmatter.locale || 'en'].title}

{t[frontmatter.locale || 'en'].description}

## {t[frontmatter.locale || 'en'].overview.title}

{t[frontmatter.locale || 'en'].overview.text}

### Примеры с локализацией

<LocaleSwitch>
  <LocaleCase locale="en">
    <Avatar name="John Doe" />
  </LocaleCase>
  <LocaleCase locale="ru">
    <Avatar name="Иван Иванов" />
  </LocaleCase>
</LocaleSwitch>

</LocaleProvider>
```

## Компоненты

### LocaleProvider

Предоставляет контекст текущей локали:

```tsx
<LocaleProvider locale="en">
  {/* контент */}
</LocaleProvider>
```

### LocaleSwitch / LocaleCase

Условный рендеринг в зависимости от локали:

```tsx
<LocaleSwitch>
  <LocaleCase locale="en">Английский контент</LocaleCase>
  <LocaleCase locale="ru">Русский контент</LocaleCase>
</LocaleSwitch>
```

## Преимущества

### ✅ Нет дублирования

- Структура определена один раз
- Переводы хранятся отдельно
- Легко добавить новый язык

### ✅ Типобезопасность

```typescript
// TypeScript проверит что все ключи присутствуют
export const ru: AvatarTranslations = { ... };
```

### ✅ Легко поддерживать

- Изменяешь структуру в одном месте
- Обновляешь переводы независимо
- Четкое разделение ответственности

## Сравнение

### Старый подход

```
docs/
  en/index.mdx     # 400+ строк
  ru/index.mdx     # 400+ строк (90% дубликат)
```

**Итого:** ~800 строк, много дублирования

### Новый подход (i18n)

```
docs/
  i18n/
    en.ts          # 150 строк (только переводы)
    ru.ts          # 150 строк (только переводы)
  index.i18n.mdx   # 200 строк (структура)
```

**Итого:** ~500 строк, нет дублирования структуры

## Примеры использования

### Простой текст

```mdx
# {t[frontmatter.locale].title}

{t[frontmatter.locale].description}
```

### Вложенные ключи

```mdx
## {t[frontmatter.locale].overview.title}

- {t[frontmatter.locale].overview.features.feature1}
- {t[frontmatter.locale].overview.features.feature2}
```

### Локализованные примеры

```mdx
<LocaleSwitch>
  <LocaleCase locale="en">
    <Avatar name="John Doe" />
  </LocaleCase>
  <LocaleCase locale="ru">
    <Avatar name="Иван Иванов" />
  </LocaleCase>
</LocaleSwitch>
```

### Код (универсальный)

```mdx
### {t[frontmatter.locale].usage.basicExample}

\`\`\`tsx
import { Avatar } from '@design-system/avatar';

export function UserProfile() {
  return <Avatar name="John Doe" />;
}
\`\`\`
```

## Лучшие практики

### 1. Организуй переводы иерархически

```typescript
export const translations = {
  title: '...',
  sections: {
    overview: { ... },
    examples: { ... },
  },
  useCases: {
    case1: { ... },
    case2: { ... },
  },
};
```

### 2. Используй типобезопасность

```typescript
// Экспортируй тип из en.ts
export type MyTranslations = typeof en;

// Используй в других локалях
export const ru: MyTranslations = { ... };
```

### 3. Одинаковая структура для всех языков

```typescript
// ✅ Правильно
en: { title: 'Hello', subtitle: 'World' }
ru: { title: 'Привет', subtitle: 'Мир' }

// ❌ Неправильно (нет subtitle)
en: { title: 'Hello', subtitle: 'World' }
ru: { title: 'Привет' }
```

## Что дальше?

1. **Посмотрите пример:** `packages/avatar/docs/index.i18n.mdx`
2. **Изучите переводы:** `packages/avatar/docs/i18n/`
3. **Читайте подробнее:** `I18N_APPROACH.md`

## Миграция существующей документации

1. Создай `i18n/` директорию
2. Извлеки весь текст из `en/index.mdx` в `i18n/en.ts`
3. Переведи в `i18n/ru.ts`
4. Создай единый `index.i18n.mdx`
5. Замени хардкод на `t[locale].key`
6. Используй `LocaleSwitch` для примеров с реальными данными

## Вопросы?

Смотрите подробное руководство в `I18N_APPROACH.md`
