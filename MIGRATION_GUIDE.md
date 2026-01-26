# Руководство по миграции пакетов на новую структуру сборки

> Это руководство описывает процесс миграции существующих пакетов на новую архитектуру с раздельной сборкой ESM и CJS

## Что изменилось

### 1. Структура сборки
**Было:**
```
dist/
  ├── index.js
  ├── index.mjs
  └── index.d.ts
```

**Стало:**
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

### 2. TypeScript конфигурация
- Добавлены общие `packages/tsconfig.esm.json` и `packages/tsconfig.cjs.json`
- Каждый пакет имеет свои `tsconfig.esm.json` и `tsconfig.cjs.json`
- Убраны `composite` и `incremental` для совместимости с tsup

### 3. Сборка
- Используется `tsup` с раздельной сборкой ESM и CJS
- SCSS компилируется автоматически в CSS
- Sourcemaps для обоих форматов

## Процесс миграции пакета

### Шаг 1: Создать TypeScript конфиги

Создайте `tsconfig.esm.json`:
```json
{
  "extends": "../tsconfig.esm.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/esm",
    "declarationDir": "./dist/esm"
  },
  "include": ["src/**/*", "../../types/**/*"],
  "exclude": ["dist", "stories", "__tests__", "node_modules"]
}
```

Создайте `tsconfig.cjs.json`:
```json
{
  "extends": "../tsconfig.cjs.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/cjs",
    "declarationDir": "./dist/cjs"
  },
  "include": ["src/**/*", "../../types/**/*"],
  "exclude": ["dist", "stories", "__tests__", "node_modules"]
}
```

### Шаг 2: Обновить tsup.config.ts

```typescript
import { defineConfig, Options } from 'tsup';

export default defineConfig((options): Options => {
  const isESM = options.format?.includes('esm');
  
  return {
    entry: ['src/index.ts'],
    format: options.format || ['esm'],
    outDir: options.outDir || 'dist/esm',
    dts: {
      resolve: true,
    },
    sourcemap: true,
    clean: isESM, // Only clean on ESM build (first build)
    treeshake: true,
    target: 'es2022',
    external: ['react', 'react-dom', 'classnames'],
    // CSS modules support
    loader: {
      '.scss': 'local-css',
      '.css': 'local-css',
    },
    esbuildOptions(opts) {
      opts.platform = isESM ? 'browser' : 'node';
      if (process.env.NODE_ENV === 'production') {
        opts.minify = true;
        opts.legalComments = 'none';
      }
    },
    minify: process.env.NODE_ENV === 'production',
  };
});
```

### Шаг 3: Обновить package.json

Обновите скрипты:
```json
{
  "scripts": {
    "build": "pnpm build:esm && pnpm build:cjs",
    "build:esm": "tsup --config tsup.config.ts --format esm --outDir dist/esm --tsconfig tsconfig.esm.json",
    "build:cjs": "tsup --config tsup.config.ts --format cjs --outDir dist/cjs --tsconfig tsconfig.cjs.json",
    "clean": "rm -rf dist",
    "lint": "eslint \"src/**/*.{ts,tsx}\""
  }
}
```

Обновите exports:
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
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist/cjs",
    "dist/esm",
    "src",
    "README.md",
    "CHANGELOG.md"
  ],
  "sideEffects": [
    "**/*.css",
    "**/*.scss"
  ]
}
```

### Шаг 4: Исправить SCSS комментарии

Замените `//` на `/* */` в SCSS файлах:
```scss
/* Было */
// Комментарий

/* Стало */
/* Комментарий */
```

### Шаг 5: Собрать и проверить

```bash
# Очистить старую сборку
pnpm clean

# Собрать пакет
pnpm build

# Проверить структуру
ls -la dist/esm
ls -la dist/cjs
```

## Проверка миграции

После миграции убедитесь, что:

1. ✅ Создана директория `dist/esm/` с `.mjs`, `.d.mts`, `.css`
2. ✅ Создана директория `dist/cjs/` с `.js`, `.d.ts`, `.css`
3. ✅ Нет ошибок TypeScript при сборке
4. ✅ CSS компилируется корректно
5. ✅ Sourcemaps создаются для обоих форматов
6. ✅ `package.json` exports указывают на правильные файлы

## Скрипты в root package.json

Используйте для сборки всех пакетов:

```bash
# Собрать все пакеты
pnpm build:packages

# Собрать только ESM
pnpm build:packages:esm

# Собрать только CJS
pnpm build:packages:cjs

# Очистить все пакеты
pnpm clean:packages
```

## Troubleshooting

### Ошибка: "File is not listed within the file list"
- Проверьте `include` в `tsconfig.esm.json` и `tsconfig.cjs.json`
- Убедитесь, что пути указаны правильно: `["src/**/*", "../../types/**/*"]`

### CSS warnings про "//" комментарии
- Замените все `//` на `/* */` в SCSS файлах

### TypeScript ошибка про "incremental"
- Убедитесь, что в конфигах нет `composite: true` и `incremental: true`

## Пример: Avatar пакет

Смотрите `packages/avatar/` как эталонный пример мигрированного пакета.
