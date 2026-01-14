# Design System Documentation

Документация компонентов дизайн-системы на базе Astro Starlight.

## Структура документации

**Важно:** Документация по компонентам должна описываться **только** рядом с компонентом в `packages/<package-name>/docs/**/*.mdx`. Файлы в `apps/docs/src/content/docs/components/` генерируются автоматически и не должны редактироваться вручную.

### 1. Рядом с компонентом (единственный источник)

Документация описывается в `packages/<package-name>/docs/**/*.mdx` рядом с компонентом. Это позволяет держать документацию рядом с кодом и версионировать её вместе с компонентом.

**Пример:**

```
packages/button/docs/
  ├── index.mdx          # Основная документация Button
  └── icon-button.mdx    # Документация IconButton
```

**Импорты в документации:**

```mdx
import { Button } from '../src';
```

Интеграция `sync-package-docs` автоматически синхронизирует эти файлы в `src/content/docs/components/<package-name>/` и преобразует импорты в `@packages/<package-name>/src`.

### 2. В Astro проекте (паттерны, гайдлайны, общая документация)

Документация может быть описана напрямую в `src/content/docs/guides/**/*.mdx` для документации, которая:

- Относится к нескольким компонентам одновременно (паттерны использования)
- Описывает общие принципы и гайдлайны дизайн-системы
- Не привязана к конкретному пакету

**Важно:**

- НЕ создавайте файлы в `src/content/docs/components/` — эта директория полностью управляется автоматической синхронизацией из `packages/*/docs/`
- Используйте `src/content/docs/guides/` для документации паттернов и гайдлайнов

**Пример:**

```
src/content/docs/
  ├── index.mdx                              # Главная страница
  ├── guides/                                # Паттерны и гайдлайны
  │   ├── button-layout-patterns.mdx        # Паттерны использования кнопок
  │   └── accessibility-guidelines.mdx      # Гайдлайны по доступности
  └── components/                            # ⚠️ Автогенерируется из packages/*/docs/
      ├── button/
      └── link/
```

**Пример документации паттерна:**

```mdx
---
title: Паттерны использования кнопок в layout
description: Рекомендации по размещению и группировке кнопок
order: 1
---

# Паттерны использования кнопок в layout

Рекомендации по правильному размещению кнопок...

## Основные принципы

[Содержание гайдлайна]

## См. также

- [Button](/components/button/) — документация компонента
- [Icon Button](/components/button/icon-button/) — документация компонента
```

## Автоматическая синхронизация

Интеграция `sync-package-docs` автоматически:

1. Сканирует все `packages/*/docs/**/*.mdx`
2. Читает версию из `package.json` каждого пакета
3. Добавляет или обновляет поле `version` в frontmatter документации
4. **Генерирует `README.md`** из `docs/index.mdx` (усеченная версия без интерактивных компонентов)
5. Синхронизирует `CHANGELOG.md` из корня пакета в `CHANGELOG.mdx` с frontmatter
6. Синхронизирует `MIGRATION.md` из корня пакета в `MIGRATION.mdx` с frontmatter (если существует)
7. Копирует файлы в `src/content/docs/components/<package-name>/`
8. Преобразует относительные импорты (`../src`) в алиасы (`@packages/<name>/src`)
9. Отслеживает изменения и пересинхронизирует при обновлении

Синхронизация происходит:

- При запуске `astro dev` или `astro build`
- При изменении файлов в `packages/*/docs/` (watch mode)

**Примечание:**

- Синхронизированные файлы в `src/content/docs/components/` генерируются автоматически
- Эти файлы добавлены в `.gitignore` и не попадают в git
- **Не редактируйте их напрямую** — изменения будут потеряны при следующей синхронизации
- **Всегда редактируйте исходные файлы в `packages/*/docs/`**

### Changelog

Если в корне пакета есть `CHANGELOG.md`, он автоматически синхронизируется в документацию:

```
packages/button/
  ├── CHANGELOG.md          # ← Исходный файл
  └── docs/
      └── index.mdx
```

После синхронизации:

```
src/content/docs/components/button/
  ├── CHANGELOG.mdx         # ← Автоматически создан с frontmatter
  └── index.mdx
```

Changelog доступен по адресу `/components/<package-name>/CHANGELOG` и автоматически появляется в навигации Starlight.

**Формат CHANGELOG.md:**

Рекомендуется использовать формат [Keep a Changelog](https://keepachangelog.com/):

```markdown
# Changelog

## [0.1.0] - 2024-01-15

### Added

- Initial release
- Support for variants

## [Unreleased]

### Planned

- New features
```

**Использование в документации:**

```mdx
---
title: Button
version: '0.1.0'
---

import Changelog from '../../../../apps/docs/src/components/Changelog.astro';

# Button

<Changelog packageName="button" />
```

## Структура Starlight

Starlight автоматически генерирует навигацию в сайдбаре из двух источников:

1. **Guides** — из `src/content/docs/guides/` (паттерны и гайдлайны)
2. **Components** — из `src/content/docs/components/` (синхронизированные из пакетов)

Порядок определяется полем `order` в frontmatter:

```mdx
---
title: Button
description: Action trigger component
order: 1
---
```

## Добавление нового компонента

1. Создайте документацию в `packages/<package-name>/docs/index.mdx`
2. При необходимости добавьте дополнительные страницы в `packages/<package-name>/docs/`
3. Запустите dev сервер - документация синхронизируется автоматически
4. Документация появится в сайдбаре Starlight

## Переопределение документации

**Не рекомендуется.** Если нужно изменить документацию компонента, редактируйте исходный файл в `packages/<package-name>/docs/`. Синхронизация автоматически обновит файлы в Astro.

## README.md генерация

Для каждого пакета автоматически генерируется `README.md` из `docs/index.mdx`. README содержит усеченную версию документации:

- **Удаляются** интерактивные компоненты (ExampleContainer, ExampleRow, ExampleGrid, StorybookIframe, Changelog)
- **Сохраняются** текстовые описания, примеры кода, API документация
- **Добавляются** ссылки на CHANGELOG.md и MIGRATION.md

README.md синхронизируется автоматически при изменении `docs/index.mdx` и включается в npm пакет через поле `files` в `package.json`.

**Структура:**

```
packages/avatar/
  ├── package.json
  ├── README.md          # ← Автоматически генерируется из docs/index.mdx
  ├── CHANGELOG.md
  ├── MIGRATION.md
  └── docs/
      └── index.mdx      # ← Единственный источник правды
```

## Migration Guide

Для каждого пакета можно создать `MIGRATION.md` с инструкциями для LLM агентов по миграции между версиями:

```
packages/avatar/
  ├── MIGRATION.md       # ← Инструкции для LLM агентов
  └── docs/
      └── index.mdx
```

После синхронизации:

```
src/content/docs/components/avatar/
  ├── MIGRATION.mdx      # ← Автоматически создан с frontmatter
  └── index.mdx
```

Migration Guide доступен по адресу `/components/<package-name>/MIGRATION` и автоматически появляется в навигации Starlight.

**Формат MIGRATION.md:**

````markdown
# Migration Guide

## Migration from X.Y.Z to A.B.C

### Breaking Changes

1. **Prop Rename: `oldProp` → `newProp`**
   - **Reason:** Better naming convention
   - **Action Required:** Replace all instances
   - **Example:**

     ```tsx
     // Before
     <Component oldProp="value" />

     // After
     <Component newProp="value" />
     ```

### Migration Steps

1. Update package version
2. Apply code transformations
3. Run type checking
4. Test affected components
````

## Добавление гайдлайна или паттерна

1. Создайте файл в `src/content/docs/guides/<name>.mdx`
2. Добавьте frontmatter с `title`, `description` и `order`
3. Используйте импорты компонентов через `@packages/<name>/src` или ссылки на документацию компонентов
4. Файл автоматически появится в сайдбаре Starlight в разделе "Guides"

**Пример:**

```mdx
---
title: Паттерны использования форм
description: Рекомендации по созданию доступных форм
order: 2
---

import { Button } from '@packages/button/src';
import { Link } from '@packages/link/src';

# Паттерны использования форм

[Содержание гайдлайна с примерами использования нескольких компонентов]

## См. также

- [Button](/components/button/)
- [Link](/components/link/)
```

## Версионирование документации

Документация автоматически версионируется вместе с пакетами. Версия из `package.json` каждого пакета автоматически добавляется в frontmatter всех MDX файлов документации.

### Автоматическое версионирование

При синхронизации документации:

1. Интеграция `sync-package-docs` читает версию из `packages/<name>/package.json`
2. Автоматически добавляет поле `version` в frontmatter каждого MDX файла
3. Если версия уже есть в frontmatter, она обновляется до актуальной версии пакета

**Пример frontmatter после синхронизации:**

```mdx
---
title: Button
description: Action trigger component
version: '0.1.0'
---
```

### Использование версии в документации

Версия доступна через frontmatter и может использоваться в компонентах:

```mdx
---
title: Button
version: '0.1.0'
---

import VersionSwitcher from '../../components/VersionSwitcher.astro';

# Button

<VersionSwitcher />

Документация для версии {frontmatter.version}
```

### Стратегии версионирования

Подробная информация о различных подходах к версионированию документации описана в [VERSIONING.md](./VERSIONING.md).

**Рекомендуемый подход:**

- **В разработке:** Автоматическая синхронизация версии из `package.json`
- **В production:** Версионированные деплои через Git tags (опционально)
- **Version Switcher:** Компонент для переключения между версиями (см. `src/components/VersionSwitcher.astro`)

### Переключение версий

Для добавления возможности переключения версий в документацию используйте компонент `VersionSwitcher`:

```mdx
---
title: Button
version: '0.1.0'
---

import VersionSwitcher from '../../components/VersionSwitcher.astro';

# Button

<VersionSwitcher />

[Содержание документации]
```

**Примечание:** Для полноценной работы version switcher требуется настройка версионированных деплоев через Git tags (см. [VERSIONING.md](./VERSIONING.md)).

## LLM.txt генерация

Документация автоматически преобразуется в LLM-оптимизированный текстовый формат для AI-ассистентов и языковых моделей.

### Генерируемые файлы

При сборке проекта (`pnpm build`) автоматически создаются:

1. **Основные файлы** (в корне dist):
   - `llms.txt` — индекс всех страниц документации
   - `llms-full.txt` — полная версия документации
   - `llms-small.txt` — сокращенная версия
   - `llms-components.txt` — документация всех компонентов
   - `llms-guides.txt` — все руководства и гайды

2. **Компонент-специфичные файлы** (в `_llms-txt/components/`):
   - `llm-{component}.txt` — отдельный файл для каждого компонента
   - `index.txt` — индекс всех компонент-специфичных файлов

### Добавление LlmLink в документацию

Для отображения ссылки на компонент-специфичный LLM.txt файл используйте компонент `LlmLink`:

```mdx
---
title: Button
version: '0.1.0'
---

import Changelog from '../../../../apps/docs/src/components/Changelog.astro';
import LlmLink from '../../../../apps/docs/src/components/LlmLink.astro';

# Button

## Changelog

<Changelog packageName="button" />

<LlmLink component="button" />

## Overview

[Содержание документации]
```

### Шаблон для новых компонентов

Используйте `COMPONENT_DOC_TEMPLATE.mdx` при создании документации для новых компонентов. Шаблон уже включает:

- Правильную структуру frontmatter
- Интеграцию Changelog
- Компонент LlmLink
- Стандартные секции документации

### Подробная документация

Для детального описания системы генерации LLM.txt файлов см. [LLMS_COMPONENT_GENERATION.md](./LLMS_COMPONENT_GENERATION.md).
