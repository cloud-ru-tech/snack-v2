# Изменения архитектуры: Гибридный подход

## Обзор

Реализован **гибридный подход**, объединяющий лучшее из классической архитектуры (как в `MONOREPO_ARCHITECTURE.md`) и современных инструментов сборки.

## Ключевые изменения

### 1. Структура TypeScript конфигурации ✅

**Добавлено:**
- `packages/tsconfig.esm.json` - общая конфигурация для ESM сборки
- `packages/tsconfig.cjs.json` - общая конфигурация для CJS сборки
- `packages/{package}/tsconfig.esm.json` - ESM конфиг пакета
- `packages/{package}/tsconfig.cjs.json` - CJS конфиг пакета

**Преимущества:**
- Раздельная конфигурация для ESM и CJS
- Возможность точной настройки под каждый формат
- Соответствие структуре из инструкции

### 2. Dual package структура ✅

**Было:**
```
dist/
  ├── index.js      (CJS)
  ├── index.mjs     (ESM)
  └── index.d.ts
```

**Стало (как в инструкции):**
```
dist/
  ├── esm/
  │   ├── index.mjs
  │   ├── index.d.mts
  │   ├── index.css
  │   └── *.map
  └── cjs/
      ├── index.js
      ├── index.d.ts
      ├── index.css
      └── *.map
```

### 3. Сборка пакетов ✅

**Инструмент:** `tsup` (современный, быстрый)

**Процесс:**
1. `build:esm` - сборка ESM в `dist/esm/`
2. `build:cjs` - сборка CJS в `dist/cjs/`

**Скрипты:**
```json
{
  "build": "pnpm build:esm && pnpm build:cjs",
  "build:esm": "tsup --format esm --outDir dist/esm --tsconfig tsconfig.esm.json",
  "build:cjs": "tsup --format cjs --outDir dist/cjs --tsconfig tsconfig.cjs.json"
}
```

### 4. package.json exports ✅

**Обновлена структура:**
```json
{
  "types": "./dist/esm/index.d.mts",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.mjs",
  "exports": {
    ".": {
      "types": "./dist/esm/index.d.mts",
      "import": "./dist/esm/index.mjs",
      "require": "./dist/cjs/index.js"
    }
  },
  "files": ["dist/cjs", "dist/esm", "src"]
}
```

### 5. Storybook директория ✅

**Изменено:**
- `.storybook/` → `storybook/`
- Обновлены пути в скриптах и конфигах

### 6. Конфигурация monorepo ✅

**pnpm-workspace.yaml:**
```yaml
shamefullyHoist: true
sideEffectsCache: false
linkWorkspacePackages: true
saveWorkspaceProtocol: false

packages:
  - "packages/*"
  - "astro"
```

**lerna.json:**
- Добавлены `ignoreChanges` для версионирования
- Настроен conventional commits
- Игнорирование stories и тестов при версионировании

## Преимущества гибридного подхода

### ✅ От классической архитектуры:
1. Раздельная структура `dist/esm/` и `dist/cjs/`
2. Отдельные TypeScript конфиги для каждого формата
3. Структура директорий как в инструкции
4. Правильные exports в package.json

### ✅ От современных инструментов:
1. **Скорость**: tsup на основе esbuild - быстрая сборка
2. **Простота**: один конфиг вместо множества скриптов
3. **CSS**: автоматическая обработка SCSS → CSS
4. **Tree-shaking**: встроенная оптимизация
5. **Sourcemaps**: автоматическая генерация
6. **DX**: лучший developer experience

## Что НЕ изменилось

- React, TypeScript, Storybook остались прежними
- Структура исходного кода в `src/` не изменилась
- Зависимости между пакетами через workspace остались
- Lerna для версионирования остался

## Следующие шаги

### Для миграции других пакетов:
1. Прочитайте `MIGRATION_GUIDE.md`
2. Используйте `packages/avatar/` как эталон
3. Копируйте `packages/.template-tsup.config.ts` для новых пакетов

### Для создания новых пакетов:
1. Используйте `pnpm add-package` (нужно обновить скрипт)
2. Или скопируйте структуру из `packages/avatar/`

## Проверка изменений

```bash
# Собрать все пакеты
pnpm build:packages

# Запустить Storybook
pnpm storybook

# Проверить структуру
ls -la packages/avatar/dist/esm
ls -la packages/avatar/dist/cjs
```

## Совместимость

- ✅ Node.js: поддержка через CJS (`require`)
- ✅ Modern bundlers: поддержка через ESM (`import`)
- ✅ TypeScript: правильные типы для обоих форматов
- ✅ Tree-shaking: работает через ESM
- ✅ CSS Modules: поддерживается в обоих форматах

## Технический стек

| Компонент | Инструмент | Версия |
|-----------|-----------|--------|
| Package manager | pnpm | 10.23.0 |
| Monorepo tool | lerna | 9.0.3 |
| TypeScript | tsc + tsup | 5.9.3 |
| Bundler | tsup (esbuild) | 8.5.1 |
| Storybook | @storybook/react-vite | 10.1.4 |
| CSS | SCSS → CSS | sass-embedded |

## Итог

Успешно реализован гибридный подход, который:
- ✅ Соответствует структуре из `MONOREPO_ARCHITECTURE.md`
- ✅ Использует современные инструменты для ускорения разработки
- ✅ Обеспечивает dual package (ESM + CJS)
- ✅ Готов к масштабированию на другие пакеты
