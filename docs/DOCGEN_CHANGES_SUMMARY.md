# Итоговые изменения в системе генерации документации

## Что было сделано

### 1. Переработана система генерации документации

**До:**
- Docgen вставлял таблицу пропсов в README.md
- README был смешением вручную написанного контента и автогенерированных пропсов
- Сложно было поддерживать консистентность

**После:**
- Docgen вставляет таблицу пропсов в `docs/index.mdx` (полная документация)
- README генерируется автоматически из документации (краткая версия)
- Четкое разделение: docs - полная документация, README - краткий обзор

### 2. Новые инструменты

#### Docgen (обновлен)
- **Источник:** TypeScript типы из `src/index.ts`
- **Цель:** `docs/index.mdx` между плейсхолдерами
- **Команда:** `npm run docgen`

#### ReadmeGenerator (новый)
- **Источник:** `docs/index.mdx` + `src/index.ts`
- **Цель:** `README.md`
- **Извлекает:**
  - Краткое описание
  - Список экспортов
  - 3 примера из Usage секции
  - Best practices
- **Команда:** `npm run docgen:readme`

#### Полная генерация
- **Команда:** `npm run docgen:all`
- Генерирует и таблицу пропсов, и README

### 3. Обновлена команда создания пакетов

При создании нового пакета через `npm run add-package`:

✅ Автоматически создается `docs/index.mdx` с плейсхолдерами для docgen  
✅ Создается минималистичный README с инструкцией по генерации  
✅ Настроена правильная структура для автоматической документации  

### 4. Обновлены существующие пакеты

#### Avatar
- ✅ Плейсхолдеры добавлены в `docs/index.mdx`
- ✅ Таблица пропсов сгенерирована в документации
- ✅ README сгенерирован автоматически

#### Counter
- ✅ Плейсхолдеры добавлены в `docs/index.mdx`
- ✅ Таблица пропсов сгенерирована в документации
- ✅ README сгенерирован автоматически

## Структура файлов

```
packages/component-name/
├── src/
│   ├── index.ts              # Экспорты с TypeScript типами
│   └── ComponentName.tsx     # Компонент с JSDoc комментариями
├── docs/
│   └── index.mdx            # Полная документация (с автогенерируемой таблицей пропсов)
└── README.md                # Краткий README (автогенерируется из docs)
```

## Плейсхолдеры в документации

В `docs/index.mdx` должна быть секция Props с плейсхолдерами:

```markdown
## Props

[//]: DOCUMENTATION_SECTION_START
[//]: DOCUMENTATION_SECTION_END
```

## Примеры использования

### Разработка компонента

1. Создайте типизированный компонент с JSDoc комментариями:

```typescript
export type ButtonProps = {
  /** Текст кнопки */
  label: string;
  /** Размер кнопки */
  size?: 's' | 'm' | 'l';
};
```

2. Заполните документацию в `docs/index.mdx`:
   - Overview секция
   - Live examples
   - Usage секция с примерами
   - Best practices

3. Запустите генерацию:

```bash
npm run docgen:all
```

4. Проверьте результаты:
   - Таблица пропсов в `docs/index.mdx`
   - Обновленный `README.md`

### Автоматическая генерация при коммитах

При коммите изменений в пакете автоматически:
1. Обновляется таблица пропсов в `docs/index.mdx`
2. Обновляется `README.md`
3. Оба файла добавляются в commit

```bash
git add packages/button/src/Button.tsx
git commit -m "feat(button): add new size option"
# Pre-commit hook автоматически обновит документацию
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run docgen` | Генерация таблицы пропсов в docs/index.mdx |
| `npm run docgen:readme` | Генерация README.md из документации |
| `npm run docgen:all` | Полная генерация (props + README) |
| `npm run docgen:staged` | Генерация для staged файлов (автоматически в pre-commit) |

## Что изменилось в файлах

### Новые файлы

- `scripts/docgen/ReadmeGenerator.ts` - Генератор README из документации
- `scripts/docgen/generateReadmeForAllPackages.ts` - Скрипт генерации README
- `scripts/docgen/generateAllDocs.ts` - Скрипт полной генерации
- `scripts/utils/filesDocgenPatches.ts` - Обновленные функции для создания пакетов
- `docs/DOCGEN_README.md` - Подробное руководство
- `docs/DOCGEN_CHANGES_SUMMARY.md` - Этот файл

### Обновленные файлы

- `scripts/docgen/Docgen.ts` - Добавлена поддержка targetFile (docs/index.mdx)
- `scripts/docgen/Markdown.ts` - Добавлен публичный метод renderPropsTable()
- `scripts/docgen/index.ts` - Экспорт generateReadme
- `scripts/docgen/docgenForStagedPackages.ts` - Генерация и docs, и README
- `scripts/utils/files.ts` - Использование новых функций из filesDocgenPatches
- `scripts/npm-init.ts` - Обновлены инструкции после создания пакета
- `package.json` - Добавлены новые скрипты

### Обновленные компоненты

- `packages/avatar/docs/index.mdx` - Добавлены плейсхолдеры
- `packages/avatar/README.md` - Автогенерирован
- `packages/counter/docs/index.mdx` - Добавлены плейсхолдеры
- `packages/counter/README.md` - Автогенерирован

## Преимущества новой системы

1. ✅ **Единственный источник правды** - документация в docs/index.mdx
2. ✅ **Автоматизация** - README генерируется автоматически
3. ✅ **Консистентность** - одинаковая структура во всех пакетах
4. ✅ **DRY** - не нужно дублировать примеры и best practices
5. ✅ **Типобезопасность** - таблица пропсов генерируется из TypeScript типов
6. ✅ **Актуальность** - документация всегда соответствует коду

## Миграция существующих пакетов

Для миграции существующего пакета:

1. Добавьте плейсхолдеры в `docs/index.mdx`:
   ```markdown
   ## Props
   
   [//]: DOCUMENTATION_SECTION_START
   [//]: DOCUMENTATION_SECTION_END
   ```

2. Убедитесь, что есть секции Usage и Best practices

3. Запустите генерацию:
   ```bash
   npm run docgen:all
   ```

4. Проверьте результаты и откорректируйте документацию при необходимости

## Troubleshooting

### Таблица пропсов не генерируется

Проверьте:
- ✅ Плейсхолдеры в `docs/index.mdx` присутствуют
- ✅ Компонент экспортируется из `src/index.ts`
- ✅ Типы имеют JSDoc комментарии

### README пустой или неполный

Проверьте:
- ✅ В документации есть секция Usage с примерами
- ✅ В документации есть секция Best practices
- ✅ Примеры имеют заголовки ### и блоки кода ```tsx

### Генерация не срабатывает при коммите

Проверьте:
- ✅ Pre-commit hook настроен
- ✅ Файл `.husky/pre-commit` имеет права на исполнение
- ✅ В package.json есть скрипт `docgen:staged`

## Дополнительные ресурсы

- [Полное руководство по docgen](./DOCGEN_README.md)
- [Руководство по миграции docgen](./DOCGEN_MIGRATION_GUIDE.md)
