# Scripts

Набор утилитарных скриптов для работы с монорепозиторием дизайн-системы.

## Создание нового пакета

Для создания нового пакета компонента используйте команду:

```bash
pnpm add-package
```

### Что делает скрипт?

Скрипт интерактивно запросит:

1. **Название пакета** (например, "Button", "Modal Dialog")
   - Разрешены только латинские буквы, цифры и пробелы
   - Название должно быть уникальным
   - Автоматически приводится к PascalCase

2. **Описание пакета** (опционально)

### Что будет создано?

После ответа на вопросы скрипт создаст минимальную структуру пакета с комментариями TODO:

```
packages/[package-name]/
├── src/
│   ├── [ComponentName].tsx     # Минимальный компонент (возвращает null)
│   ├── index.ts                # Экспорты пакета
│   ├── types.ts                # TypeScript типы (заготовка с TODO)
│   ├── constants.ts            # Константы (заготовка с TODO)
│   └── styles.module.scss      # Стили с базовыми импортами из @sbercloud/figma-variables
├── docs/
│   ├── index.mdx               # Документация компонента с TODO комментариями
│   └── i18n/
│       ├── en.json             # Английская локализация
│       ├── ru.json             # Русская локализация
│       └── index.ts            # Экспорт переводов
├── [ComponentName].stories.tsx # Минимальная story с Figma блоком
├── package.json                # Конфигурация пакета
├── tsconfig.json              # TypeScript конфигурация
├── tsup.config.ts             # Конфигурация сборки
├── .sassrc.js                 # Sass конфигурация
├── postcss.config.js          # PostCSS конфигурация
├── README.md                  # Минимальная документация с TODO
├── CHANGELOG.md               # История изменений
└── MIGRATION.md               # Руководство по миграции
```

### Особенности структуры

**Минимальная реализация:**
- Компонент возвращает `null` - готов к реализации
- Файлы со стилями содержат импорты из `@sbercloud/figma-variables`
- Везде добавлены TODO комментарии для указания, что нужно доработать

**Документация с шаблоном:**
- `docs/index.mdx` создается с базовой структурой и TODO комментариями
- `README.md` минимальный с TODO комментариями для основного описания
- Stories содержат заготовку для Figma дизайна
- Готова интеграция с Astro docs

### Примеры использования

#### Создание компонента Button

```bash
$ pnpm add-package

? Package Title (e.g., "Button", "Modal Dialog"): Button
? Package Description (optional): Interactive button component with multiple variants

✔ Finished generating files!
✔ Dependencies installed!
✔ Your new package is located in packages/button

Next steps:
  1. Implement the component in packages/button/src/Button.tsx (follow TODO comments)
  2. Add styles in packages/button/src/styles.module.scss (Figma Variables imported)
  3. Update stories in packages/button/Button.stories.tsx
  4. Complete documentation in packages/button/docs/index.mdx
  5. Build the package: pnpm --filter @design-system/button build
  6. View in Storybook: pnpm storybook
```

#### Создание компонента Modal Dialog

```bash
$ pnpm add-package

? Package Title (e.g., "Button", "Modal Dialog"): Modal Dialog
? Package Description (optional): Modal dialog component for displaying content in overlay

✔ Finished generating files!
✔ Dependencies installed!
✔ Your new package is located in packages/modal-dialog

# Будет создан компонент ModalDialog в packages/modal-dialog
```

### Соглашения об именовании

Скрипт автоматически преобразует введённое название:

- **Package Title**: `"My Component"` → остаётся `"My Component"` для отображения
- **Package Name**: `"My Component"` → `"my-component"` для имени папки и npm пакета
- **Component Name**: `"My Component"` → `"MyComponent"` для имени React компонента

### После создания пакета

Следуйте TODO комментариям в созданных файлах:

1. **Реализуйте компонент** (`src/[ComponentName].tsx`)
   - Добавьте props в интерфейс `[ComponentName]Props`
   - Реализуйте логику компонента (сейчас возвращает `null`)
   - Добавьте JSDoc документацию

2. **Добавьте типы и константы**
   - `src/types.ts` - типы для компонента
   - `src/constants.ts` - константы (размеры, варианты и т.д.)

3. **Напишите стили** (`src/styles.module.scss`)
   - Подключите нужный компонент из `@sbercloud/figma-variables`
   - Используйте миксины и функции из base
   - Добавьте стили с использованием дизайн-токенов

4. **Дополните документацию** (`docs/index.mdx`)
   - Замените TODO комментарии на реальный контент
   - Добавьте примеры использования
   - Документируйте API компонента

5. **Создайте истории** (`[ComponentName].stories.tsx`)
   - Замените URL в `parameters.design` на реальную ссылку Figma
   - Добавьте различные варианты использования
   - Настройте controls и argTypes

6. **Обновите README.md**
   - Заполните TODO комментарии
   - Добавьте описание компонента и примеры

7. **Соберите и протестируйте**
   ```bash
   pnpm --filter @design-system/[package-name] build
   pnpm storybook
   ```

### Добавление в билд

После создания пакета добавьте его в команду сборки в корневом `package.json`:

```json
{
  "scripts": {
    "build:packages": "pnpm -r --filter \"@design-system/button\" --filter \"@design-system/[new-package]\" run build"
  }
}
```

## Структура утилит

### `utils/console.ts`

Обертка над `@sbercloud/ft-logger` для цветного вывода в консоль:

```typescript
import { logInfo, logSuccess, logError, logWarning, logDebug, logHelp, logSilly } from './utils/console';

logInfo('Информационное сообщение');
logSuccess('Успешное выполнение');
logError('Ошибка');
logWarning('Предупреждение');
logDebug('Отладочная информация');
logHelp('Подсказка');
logSilly('Детальная отладка');
```

Модуль использует [@sbercloud/ft-logger](https://git.sbercloud.tech/sbercloud-ui/business-tools/frontend-tools/-/tree/master/packages/logger) для универсального логирования с поддержкой цветного вывода в терминале.

### `utils/ensureDirectory.ts`

Утилиты для работы с директориями:

```typescript
import { ensureDirectory, ensureParentDirectory } from './utils/ensureDirectory';

// Создаёт директорию, если она не существует
ensureDirectory('/path/to/dir');

// Создаёт родительскую директорию для файла
ensureParentDirectory('/path/to/file.txt');
```

### `utils/git.ts`

Утилиты для работы с Git:

```typescript
import { getGitUserName, getGitEmail, gitFetch, checkIfBehindMaster } from './utils/git';

const user = getGitUserName();      // Имя пользователя Git
const email = getGitEmail();        // Email пользователя Git
gitFetch();                         // Обновление из удалённого репозитория
checkIfBehindMaster();              // Проверка, не отстала ли ветка
```

### `utils/files.ts`

Главная утилита для создания структуры пакета:

```typescript
import { bootstrapFiles, getExistingPackageNames } from './utils/files';

// Получить список существующих пакетов
const packages = getExistingPackageNames();

// Создать структуру нового пакета
bootstrapFiles({
  packageRootFolderName: 'button',
  user: 'John Doe',
  email: 'john@example.com',
  packageTitle: 'Button',
  packageName: 'button',
  componentName: 'Button',
  packageDescription: 'Interactive button component',
});
```

## Устранение проблем

### Скрипт не запускается

Убедитесь, что установлены все зависимости:

```bash
pnpm install
```

### Ошибка "Package already exists"

Пакет с таким именем уже существует. Выберите другое название или используйте существующий пакет.

### Ошибка TypeScript

Проверьте, что `tsconfig.json` корректен и все типы правильно импортированы.

### Ошибка при сборке

После создания пакета запустите:

```bash
pnpm install
pnpm --filter @design-system/[package-name] build
```
