# Обновления скрипта npm-init

## ✅ Изменения

### Удалено создание ненужных файлов:
- ❌ `.sassrc.js` - не используется (настройки sass в скриптах)
- ❌ `postcss.config.js` - не используется (настройки PostCSS в скриптах)
- ❌ `tsup.config.ts` - заменено на систему сборки через `tspc`

### Обновлена структура:

**Было:**
- `tsconfig.json` (один файл)
- `tsup.config.ts`
- `.sassrc.js`
- `postcss.config.js`

**Стало:**
- ✅ `tsconfig.esm.json` - конфиг для ESM сборки
- ✅ `tsconfig.cjs.json` - конфиг для CJS сборки

### Обновлен package.json:

**Было:**
```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist", "src", ...],
  "scripts": {
    "build": "tsup",
    "clean": "tsup --clean"
  }
}
```

**Стало:**
```json
{
  "types": "./dist/esm/index.d.ts",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "exports": {
    ".": {
      "types": "./dist/esm/index.d.ts",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js"
    }
  },
  "files": ["dist/cjs", "dist/esm", "src", ...],
  "scripts": {}
}
```

## 📝 Примечания

1. **Сборка управляется из корня:**
   - `pnpm -w run build:packages` - собирает все пакеты
   - Скрипты сборки в пакетах не нужны

2. **Project references:**
   - После создания пакета нужно добавить его в `packages/tsconfig.esm.json` и `packages/tsconfig.cjs.json`
   - Это можно сделать вручную или через отдельный скрипт

3. **Структура соответствует snack-uikit:**
   - Та же система сборки
   - Те же конфиги TypeScript
   - Та же структура dist/

## 🚀 Использование

```bash
# Создать новый пакет
pnpm add-package

# Собрать все пакеты
pnpm -w run build:packages

# Запустить Storybook
pnpm storybook
```
