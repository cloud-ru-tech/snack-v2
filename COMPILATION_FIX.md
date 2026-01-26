# Исправление компиляции: файлы только в dist/

## ✅ Проблема

При сборке пакетов скомпилированные файлы (.js, .d.ts, .d.ts.map) создавались в разных местах:
- ❌ `scripts/` - утилиты для сборки
- ❌ `storybook/` - конфигурация Storybook
- ❌ `astro/src/content/docs/` - документация Astro
- ❌ `packages/*/docs/` - документация пакетов
- ❌ `packages/*/stories/` - Storybook stories

## ✅ Решение

### 1. Обновлены конфиги TypeScript пакетов

**packages/avatar/tsconfig.esm.json и tsconfig.cjs.json:**
```json
{
  "exclude": ["./dist", "./stories", "./__tests__", "./__test__", "./docs"]
}
```

### 2. Обновлен tsconfig.base.json

Добавлены исключения:
```json
{
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "scripts/**/*.js",
    "scripts/**/*.d.ts",
    "astro/**/*.js",
    "astro/**/*.d.ts",
    "storybook/**/*.js",
    "storybook/**/*.d.ts",
    "packages/*/docs/**/*.js",
    "packages/*/docs/**/*.d.ts",
    "packages/*/stories/**/*.js",
    "packages/*/stories/**/*.d.ts"
  ]
}
```

### 3. Обновлен tsconfig.json (root)

Добавлены исключения для всех директорий, которые не должны компилироваться:
```json
{
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "scripts/**/*.js",
    "scripts/**/*.d.ts",
    "astro/**",
    "storybook/**/*.js",
    "storybook/**/*.d.ts",
    "packages/*/docs/**",
    "packages/*/stories/**",
    "packages/*/__tests__/**",
    "packages/*/__test__/**"
  ]
}
```

### 4. Создан storybook/tsconfig.json

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["./**/*.ts", "./**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

### 5. Обновлен scripts/tsconfig.json

- Удален `outDir`
- Добавлен `noEmit: true`

### 6. Обновлен astro/tsconfig.json

- Добавлен `noEmit: true`
- Добавлено исключение `.astro`

### 7. Обновлен скрипт npm-init

Теперь создает конфиги с правильными exclude, включая `docs`.

## 📊 Результат

### ✅ Файлы создаются ТОЛЬКО в:
- `packages/*/dist/esm/` - ESM сборка
- `packages/*/dist/cjs/` - CJS сборка

### ✅ Файлы НЕ создаются в:
- `scripts/` ✅
- `storybook/` ✅
- `astro/src/content/docs/` ✅
- `packages/*/docs/` ✅
- `packages/*/stories/` ✅
- `packages/*/__tests__/` ✅

## 🧪 Проверка

```bash
# Проверить, что нет скомпилированных файлов вне dist/
find . -type f \( -name "*.js" -o -name "*.d.ts" -o -name "*.d.ts.map" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/dist/*" \
  ! -path "*/.astro/*" \
  ! -path "*/storybook-static/*" \
  ! -path "*/types/*.d.ts" \
  ! -name "*.config.js" \
  ! -name "lint-staged.config.js" \
  ! -name "prettier.config.js" \
  | wc -l
# Должно быть: 0

# Проверить, что файлы есть только в dist/
find packages/avatar/dist -name "*.js" -o -name "*.d.ts" | head -5
# Должны быть файлы в dist/esm/ и dist/cjs/
```

## ✨ Итог

Теперь скомпилированные файлы создаются **только** в `dist/` директориях пакетов, что соответствует архитектуре monorepo и упрощает управление артефактами сборки.
