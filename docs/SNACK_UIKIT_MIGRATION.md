# Миграция системы сборки из snack-uikit

## ✅ Выполнено

### 1. Установлены зависимости
- ✅ `ts-patch` - для создания `tspc` команды
- ✅ `typescript-plugin-css-modules` - типизация CSS modules
- ✅ `@babel/core` + `babel-plugin-react-css-modules` - трансформация CSS modules
- ✅ `sass` - компиляция SCSS (используется `sass-embedded` для совместимости)
- ✅ `postcss` + `autoprefixer` + `postcss-discard-comments` - постобработка CSS
- ✅ `glob`, `minimist`, `rimraf` - утилиты

### 2. Скопированы скрипты компиляции

**Основные скрипты:**
- ✅ `scripts/compileCSS.ts` - компиляция SCSS → CSS
- ✅ `scripts/compileJsCssModules.ts` - трансформация CSS modules в CJS

**Вспомогательные скрипты:**
- ✅ `scripts/scss-extension-transformer.ts` - трансформация `.scss` → `.css` в импортах
- ✅ `scripts/compile/write-scss.ts` - компиляция SCSS файлов
- ✅ `scripts/compile/post-process-css.ts` - постобработка CSS (autoprefixer, discard-comments)
- ✅ `scripts/compile/simple-copy.ts` - копирование статических файлов
- ✅ `scripts/compile/sass-custom-renderer.js` - кастомный рендерер для typescript-plugin-css-modules
- ✅ `scripts/utils/getAllPackageFolders.ts` - получение списка пакетов

### 3. Обновлены TypeScript конфиги

**packages/tsconfig.esm.json и packages/tsconfig.cjs.json:**
- ✅ Добавлены `plugins` для трансформации SCSS импортов
- ✅ Настроен `typescript-plugin-css-modules` с кастомным рендерером
- ✅ Обновлены настройки компилятора (target: es6, lib: es2017)

**packages/avatar/tsconfig.esm.json и tsconfig.cjs.json:**
- ✅ Наследуют базовые конфиги с plugins
- ✅ Правильные пути для `outDir`

### 4. Обновлены скрипты сборки

**Root package.json:**
```json
{
  "build:packages": "pnpm compile:packages && pnpm build:ts && pnpm build:css",
  "build:packages:esm": "tspc -b ./packages/tsconfig.esm.json",
  "build:packages:cjs": "tspc -b ./packages/tsconfig.cjs.json",
  "build:css": "ts-node scripts/compileCSS && ts-node scripts/compileJsCssModules",
  "postinstall": "ts-patch install"
}
```

**Пакет package.json:**
- ✅ Убраны скрипты сборки (сборка управляется из корня)
- ✅ Обновлены exports (`.js` вместо `.mjs`, `.d.ts` вместо `.d.mts`)

### 5. Настроен ts-patch

- ✅ Установлен `ts-patch`
- ✅ Добавлен `postinstall` скрипт для автоматической установки патчей
- ✅ Команда `tspc` доступна и работает

## 📊 Процесс сборки

### Этапы:

1. **Pre-compile** (`lerna run compile`)
   - Опциональные compile скрипты в пакетах

2. **TypeScript компиляция** (`build:ts`)
   - **ESM**: `tspc -b ./packages/tsconfig.esm.json`
     - Трансформирует `.scss` → `.css` в импортах
     - Типизирует CSS modules
     - Output: `dist/esm/`
   - **CJS**: `tspc -b ./packages/tsconfig.cjs.json`
     - Аналогично ESM, но с `module: "CommonJS"`
     - Output: `dist/cjs/`

3. **CSS компиляция** (`build:css`)
   - **compileCSS.ts**: 
     - Компилирует SCSS → CSS через sass-embedded
     - Post-process через PostCSS (autoprefixer, discard-comments)
     - Копирует в `dist/esm/` и `dist/cjs/`
     - Копирует статические файлы (woff, woff2, png, css)
   - **compileJsCssModules.ts**:
     - Трансформирует CSS modules в CJS файлах
     - Использует `babel-plugin-react-css-modules`

## 🎯 Преимущества

### ✅ Полное соответствие snack-uikit
- Та же система сборки
- Те же скрипты и утилиты
- Та же структура конфигов

### ✅ TypeScript plugins
- Автоматическая трансформация `.scss` → `.css` в импортах
- Типизация CSS modules через typescript-plugin-css-modules
- Кастомный рендерер для SCSS

### ✅ Отдельная компиляция CSS
- SCSS компилируется отдельно от TypeScript
- PostCSS обработка (autoprefixer, discard-comments)
- CSS modules трансформация для CJS

### ✅ Project references
- Инкрементальная сборка
- Правильное разрешение зависимостей между пакетами

## 📝 Использование

```bash
# Полная сборка всех пакетов
pnpm -w run build:packages

# Только TypeScript
pnpm -w run build:ts

# Только CSS
pnpm -w run build:css

# Очистка
pnpm -w run clean:dist
pnpm -w run clean:buildinfo
```

## 🔧 Отличия от snack-uikit

1. **sass-embedded вместо sass**
   - Используется `sass-embedded` для совместимости с новым синтаксисом SCSS
   - Уже был установлен в проекте

2. **Упрощенная структура**
   - Пока только один пакет (avatar)
   - Project references будут расширяться по мере добавления пакетов

## ✨ Результат

Система сборки полностью перенесена из snack-uikit:
- ✅ `tspc` работает
- ✅ TypeScript plugins настроены
- ✅ CSS компиляция работает
- ✅ Структура соответствует snack-uikit
- ✅ Готово к масштабированию
