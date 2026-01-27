# Очистка конфигурации TypeScript

## Проблемы, которые были исправлены

### 1. ❌ Слишком много конфигов TypeScript
**Было:**
- `tsconfig.json` (старый, не нужен)
- `tsconfig.esm.json` 
- `tsconfig.cjs.json`

**Стало:**
- ✅ `tsconfig.esm.json` - для ESM сборки
- ✅ `tsconfig.cjs.json` - для CJS сборки
- ✅ Удален `tsconfig.json`

### 2. ❌ Несоответствие с инструкцией
**Было:**
```json
{
  "include": ["src/**/*", "../../types/**/*"],
  "exclude": ["dist", "stories", "__tests__", "node_modules"],
  "compilerOptions": {
    "declarationDir": "./dist/esm"  // лишнее
  }
}
```

**Стало (как в инструкции):**
```json
{
  "include": ["./src", "../../types"],
  "exclude": ["./dist"]
}
```

### 3. ❌ Ошибка сборки из-за lerna
**Было:**
```json
{
  "useWorkspaces": true  // устаревшая опция в Lerna 9
}
```

**Стало:**
- ✅ Убрана опция `useWorkspaces` (Lerna автоматически использует workspaces)

### 4. ❌ Неправильные фильтры pnpm
**Было:**
```json
{
  "build:packages:esm": "pnpm -r --filter \"./packages/*\" run build:esm"
}
```

**Стало:**
```json
{
  "build:packages:esm": "pnpm -r --filter \"@design-system/*\" run build:esm"
}
```

## Итоговая структура конфигов

### Пакет avatar
```
packages/avatar/
├── tsconfig.esm.json    ✅ ESM конфиг (как в инструкции)
├── tsconfig.cjs.json    ✅ CJS конфиг (как в инструкции)
└── tsup.config.ts       ✅ Конфиг сборки
```

### Root
```
packages/
├── tsconfig.esm.json    ✅ Базовый ESM конфиг
└── tsconfig.cjs.json    ✅ Базовый CJS конфиг
```

## Проверка

```bash
# Сборка работает ✅
pnpm -w run build:packages

# Результат:
# ✅ ESM Build success
# ✅ CJS Build success
# ✅ DTS Build success
```

## Соответствие инструкции

Теперь структура полностью соответствует `MONOREPO_ARCHITECTURE.md`:
- ✅ Только `tsconfig.esm.json` и `tsconfig.cjs.json` в пакетах
- ✅ Правильные `include` и `exclude` как в инструкции
- ✅ Нет лишних опций в `compilerOptions`
- ✅ Правильные фильтры для сборки всех пакетов
