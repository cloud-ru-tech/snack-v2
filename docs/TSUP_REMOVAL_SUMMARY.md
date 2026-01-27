# Удаление tsup: Переход на чистый TypeScript Compiler

## ✅ Выполнено

### 1. Удален tsup
- ✅ Удален `packages/avatar/tsup.config.ts`
- ✅ Заменены скрипты сборки на `tsc -b`

### 2. Обновлены TypeScript конфиги
- ✅ Добавлен `composite: true` для project references
- ✅ Настроены `references` в базовых конфигах
- ✅ Убраны лишние опции из базовых конфигов

### 3. Созданы скрипты сборки
- ✅ `scripts/build-css.js` - компиляция SCSS → CSS
- ✅ `scripts/rename-esm-files.js` - переименование .js → .mjs и .d.ts → .d.mts

### 4. Обновлены скрипты в package.json

**Root package.json:**
```json
{
  "build:packages": "pnpm compile:packages && pnpm build:ts && pnpm build:css",
  "build:packages:esm": "tsc -b ./packages/tsconfig.esm.json",
  "build:packages:cjs": "tsc -b ./packages/tsconfig.cjs.json",
  "build:css": "pnpm -r --filter \"@design-system/*\" run build:css"
}
```

**Пакет package.json:**
```json
{
  "build": "pnpm build:esm && pnpm build:cjs && pnpm build:css",
  "build:esm": "tsc -b tsconfig.esm.json && node ../../scripts/rename-esm-files.js",
  "build:cjs": "tsc -b tsconfig.cjs.json",
  "build:css": "node ../../scripts/build-css.js"
}
```

## 📊 Структура сборки

### Процесс сборки:
1. **Pre-compile** (`lerna run compile`) - опциональные compile скрипты
2. **TypeScript компиляция** (`tsc -b`):
   - ESM: `tsc -b ./packages/tsconfig.esm.json` → `dist/esm/*.js`
   - Переименование: `.js` → `.mjs`, `.d.ts` → `.d.mts`
   - CJS: `tsc -b ./packages/tsconfig.cjs.json` → `dist/cjs/*.js`
3. **CSS компиляция** (`build:css`):
   - SCSS → CSS через sass
   - Копирование в `dist/esm/` и `dist/cjs/`

### Итоговая структура:
```
packages/avatar/dist/
├── esm/
│   ├── index.mjs          ✅ ESM код
│   ├── index.d.mts         ✅ ESM типы
│   ├── styles.module.css   ✅ Стили
│   └── *.map               ✅ Sourcemaps
└── cjs/
    ├── index.js            ✅ CJS код
    ├── index.d.ts          ✅ CJS типы
    ├── styles.module.css   ✅ Стили
    └── *.map               ✅ Sourcemaps
```

## 🎯 Преимущества

### ✅ Чистый TypeScript
- Используется стандартный `tsc` без дополнительных инструментов
- Project references для инкрементальной сборки
- Полный контроль над процессом компиляции

### ✅ Соответствие инструкции
- Структура как в `MONOREPO_ARCHITECTURE.md`
- Раздельная сборка ESM и CJS
- Отдельная компиляция CSS

### ✅ Меньше зависимостей
- Не нужен tsup
- Используются только стандартные инструменты

## 📝 Зависимости

**Требуются:**
- `typescript` - уже установлен ✅
- `sass` (sass-embedded) - уже установлен ✅
- `glob` - уже установлен ✅

**Удалены:**
- `tsup` - больше не нужен

## 🚀 Использование

```bash
# Собрать все пакеты
pnpm -w run build:packages

# Собрать только ESM
pnpm -w run build:packages:esm

# Собрать только CJS
pnpm -w run build:packages:cjs

# Собрать только CSS
pnpm -w run build:css

# Очистить все пакеты
pnpm -w run clean:packages
```

## ✨ Результат

Успешно перешли на чистый TypeScript compiler без tsup:
- ✅ Сборка работает
- ✅ Структура соответствует инструкции
- ✅ Меньше зависимостей
- ✅ Полный контроль над процессом
