# Стратегия версионирования документации

## Проблема

В монорепозитории с независимым версионированием пакетов (Lerna `independent`) каждый пакет имеет свою версию. Документация должна отражать актуальное состояние компонентов для каждой версии пакета.

## Рекомендуемый подход: Версионирование через frontmatter + фильтрация

### Принцип

1. **Документация версионируется вместе с пакетом** — версия документации соответствует версии пакета
2. **Frontmatter содержит версию** — каждая страница документации знает, к какой версии пакета она относится
3. **По умолчанию показывается последняя версия** — для удобства пользователей
4. **Возможность переключения версий** — через UI можно выбрать нужную версию

### Структура

```
packages/button/
  ├── package.json          # version: "0.1.0"
  ├── docs/
  │   ├── index.mdx         # version: "0.1.0" в frontmatter
  │   └── icon-button.mdx   # version: "0.1.0" в frontmatter
  └── src/
```

### Реализация

#### 1. Автоматическое добавление версии в frontmatter

Модифицируем `sync-package-docs.js` для автоматического добавления версии из `package.json`:

```javascript
// Читаем версию из package.json
const pkgJsonPath = path.join(pkgPath, 'package.json');
const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath, 'utf-8'));
const pkgVersion = pkgJson.version;

// Добавляем версию в frontmatter, если её нет
const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
const hasVersion = content.match(frontmatterRegex)?.[1]?.includes('version:');

if (!hasVersion) {
  content = content.replace(frontmatterRegex, (match, frontmatter) => {
    return `---\n${frontmatter}\nversion: "${pkgVersion}"\n---\n`;
  });
} else {
  // Обновляем существующую версию
  content = content.replace(/version:\s*["']?[\d.]+["']?/, `version: "${pkgVersion}"`);
}
```

#### 2. Версионирование через структуру URL (альтернатива)

Если нужна более явная структура, можно синхронизировать документацию в версионированные директории:

```
src/content/docs/components/
  ├── button/
  │   ├── v0.1.0/
  │   │   └── index.mdx
  │   └── latest/  # symlink или копия последней версии
  │       └── index.mdx
```

**Плюсы:**

- Явная структура версий в URL
- Легко деплоить старые версии
- Понятные URL: `/components/button/v0.1.0/`

**Минусы:**

- Более сложная структура
- Нужно поддерживать symlinks или копии

#### 3. Версионирование через Git tags (для production)

Для production-деплоя можно использовать Git tags:

1. При создании тега `button@0.1.0` — собирать документацию для этой версии
2. Деплоить в `public/v0.1.0/` или `public/components/button/v0.1.0/`
3. Главная страница показывает последнюю версию

**Реализация в CI/CD:**

```yaml
# .gitlab-ci.yml
build-docs-version:
  script:
    - git checkout tags/button@0.1.0 -- packages/button/
    - pnpm run build:docs
    - mkdir -p public/v0.1.0
    - cp -r apps/docs/dist/* public/v0.1.0/
```

## Рекомендация: Гибридный подход

### Для разработки (dev mode)

- Показывать документацию текущей версии из `packages/*/docs/`
- Версия автоматически синхронизируется из `package.json`
- Frontmatter содержит актуальную версию

### Для production

1. **Последняя версия** — деплоится в корень `/`
2. **Исторические версии** — деплоятся в `/v<version>/` при создании Git tags
3. **Version switcher** — компонент для переключения между версиями

### Структура деплоя

```
public/
  ├── index.html              # Главная (последняя версия)
  ├── components/
  │   └── button/             # Последняя версия
  ├── v0.1.0/                 # Старая версия (из Git tag)
  │   └── components/
  │       └── button/
  └── storybook/
```

## Компонент Version Switcher

Добавить компонент для переключения версий в Starlight:

```astro
---
// src/components/VersionSwitcher.astro
const availableVersions = ['0.2.0', '0.1.0']; // Можно генерировать из Git tags
const currentVersion = Astro.url.pathname.match(/\/v(\d+\.\d+\.\d+)\//)?.[1] || 'latest';
---

<div class="version-switcher">
  <select>
    {availableVersions.map(version => (
      <option value={version} selected={version === currentVersion}>
        {version}
      </option>
    ))}
  </select>
</div>
```

## Миграция существующей документации

1. Добавить версию в frontmatter всех существующих MDX файлов
2. Обновить `sync-package-docs.js` для автоматического управления версиями
3. Настроить CI/CD для деплоя версионированных сборок

## Альтернативные подходы

### 1. Отдельный репозиторий для документации

**Плюсы:** Полный контроль над версионированием  
**Минусы:** Дублирование кода, сложность синхронизации

### 2. Storybook для каждой версии

**Плюсы:** Storybook уже поддерживает версионирование  
**Минусы:** Дублирование с Astro документацией

### 3. Версионирование только в production

**Плюсы:** Простота в разработке  
**Минусы:** Нет версионирования в dev mode

## Changelog в документации

### Автоматическая синхронизация CHANGELOG.md

Каждый пакет может содержать `CHANGELOG.md` в корне, который автоматически синхронизируется в документацию:

```
packages/button/
  ├── package.json
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

### Формат CHANGELOG.md

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

### Использование в документации

Changelog автоматически доступен по адресу `/components/<package-name>/CHANGELOG` и появляется в навигации Starlight.

Для встраивания ссылки на changelog в документацию компонента:

```mdx
---
title: Button
version: '0.1.0'
---

import Changelog from '../../../../apps/docs/src/components/Changelog.astro';

# Button

<Changelog packageName="button" />
```

Компонент `Changelog` автоматически создаст ссылку на страницу changelog.

### Пример: Button package

См. `packages/button/CHANGELOG.md` и `packages/button/docs/index.mdx` для полного примера версионирования с changelog.

## Вывод

Для вашего случая рекомендую **гибридный подход**:

- В разработке — автоматическая синхронизация версии из `package.json`
- В production — версионированные деплои через Git tags
- Version switcher для навигации между версиями
- Автоматическая синхронизация CHANGELOG.md для истории изменений

Это даст баланс между простотой разработки и возможностью поддерживать исторические версии документации.


