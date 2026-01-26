# Quick Start: Новая структура сборки

## 🚀 Быстрый старт

### Сборка всех пакетов
```bash
pnpm build:packages
```

### Сборка конкретного пакета
```bash
cd packages/avatar
pnpm build
```

### Запуск Storybook
```bash
pnpm storybook
# Откроется на http://localhost:6006
```

### Очистка артефактов сборки
```bash
# Все пакеты
pnpm clean:packages

# Конкретный пакет
cd packages/avatar
pnpm clean
```

## 📦 Структура после сборки

```
packages/avatar/
├── src/              # Исходный код
│   ├── index.ts
│   ├── Avatar.tsx
│   └── styles.module.scss
├── dist/             # Собранные файлы ✨
│   ├── esm/         # ES Modules
│   │   ├── index.mjs
│   │   ├── index.d.mts
│   │   └── index.css
│   └── cjs/         # CommonJS
│       ├── index.js
│       ├── index.d.ts
│       └── index.css
├── stories/         # Storybook истории
├── tsconfig.esm.json  # ESM конфигурация
├── tsconfig.cjs.json  # CJS конфигурация
└── tsup.config.ts     # Конфигурация сборки
```

## 📖 Документация

- **MIGRATION_GUIDE.md** - Как мигрировать существующие пакеты
- **ARCHITECTURE_CHANGES.md** - Обзор изменений архитектуры
- **IMPLEMENTATION_SUMMARY.md** - Детальный отчет о реализации
- **MONOREPO_ARCHITECTURE.md** - Оригинальная инструкция (reference)

## ✅ Что работает

- ✅ Dual package: ESM + CJS
- ✅ TypeScript типы для обоих форматов
- ✅ SCSS → CSS компиляция
- ✅ CSS Modules
- ✅ Sourcemaps
- ✅ Tree-shaking
- ✅ Storybook с новой структурой
- ✅ Lerna independent versioning

## 🎯 Основные команды

```bash
# Разработка
pnpm dev                    # Запустить Astro docs
pnpm storybook              # Запустить Storybook

# Сборка
pnpm build:packages         # Собрать все пакеты
pnpm build:docs             # Собрать документацию
pnpm build:storybook        # Собрать Storybook
pnpm build:all              # Собрать всё

# Качество кода
pnpm lint                   # Проверить код
pnpm test                   # Запустить тесты

# Пакеты
pnpm add-package            # Создать новый пакет
pnpm clean:packages         # Очистить сборку

# Версионирование (Lerna)
lerna version               # Обновить версии
lerna publish               # Опубликовать пакеты
```

## 🔧 Разработка нового пакета

1. **Создать структуру**:
   ```bash
   pnpm add-package
   # Или скопировать из packages/avatar/
   ```

2. **Использовать templates**:
   - `packages/.template-tsup.config.ts` - конфиг сборки
   - Скопировать `tsconfig.esm.json` и `tsconfig.cjs.json` из avatar

3. **Обновить package.json**:
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
     }
   }
   ```

4. **Собрать и проверить**:
   ```bash
   cd packages/your-package
   pnpm build
   ls -la dist/esm dist/cjs
   ```

## 💡 Советы

- Используйте `packages/avatar/` как эталон
- Для SCSS используйте `/* */` комментарии вместо `//`
- В `external` добавляйте все peer dependencies
- TypeScript типы генерируются автоматически
- Sourcemaps помогают в отладке

## 🐛 Troubleshooting

**Ошибка сборки TypeScript?**
- Проверьте `include` в tsconfig.esm.json и tsconfig.cjs.json
- Убедитесь что пути правильные: `["src/**/*", "../../types/**/*"]`

**CSS warnings?**
- Замените `//` на `/* */` в SCSS файлах

**Пакет не найден?**
- Запустите `pnpm install` в корне проекта
- Проверьте что пакет есть в `pnpm-workspace.yaml`

## 📞 Поддержка

Если возникли вопросы:
1. Читайте MIGRATION_GUIDE.md
2. Смотрите на packages/avatar/ как на пример
3. Проверяйте MONOREPO_ARCHITECTURE.md для деталей

---

**Готово! Начинайте разработку** 🎉
