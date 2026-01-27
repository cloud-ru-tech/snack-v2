# Playwright Testing - Quick Start

Быстрое руководство по запуску E2E тестов для компонентов Storybook с помощью Playwright.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Установка браузеров Playwright (если еще не установлены)

```bash
npx playwright install
```

### 3. Запуск Storybook

```bash
# В отдельном терминале
pnpm storybook
```

Дождитесь запуска Storybook на `https://localhost:6006/`

### 4. Запуск тестов

```bash
# Все тесты
pnpm test:e2e

# Или с UI интерфейсом (рекомендуется для первого запуска)
pnpm test:e2e:ui
```

## 📋 Доступные команды

```bash
# Запуск всех E2E тестов
pnpm test:e2e

# UI Mode - интерактивный режим с визуальной отладкой
pnpm test:e2e:ui

# Запуск только в Chrome
pnpm test:e2e:chrome

# Запуск только в Firefox
pnpm test:e2e:firefox

# Запуск мобильных тестов (Pixel 7)
pnpm test:e2e:mobile

# Режим отладки (пошаговое выполнение)
pnpm test:e2e:debug

# Запуск с видимым браузером
pnpm test:e2e:headed

# Просмотр отчета о последнем запуске
pnpm test:e2e:report
```

## 🧪 Структура тестов

Тесты расположены в `__test__` директориях каждого пакета:

```
packages/
├── avatar/
│   ├── __test__/
│   │   └── avatar.spec.ts     # E2E тесты для Avatar
│   └── src/
└── counter/
    ├── __test__/
    │   └── counter.spec.ts    # E2E тесты для Counter
    └── src/
```

## ✍️ Написание тестов

### Базовый пример

```typescript
import { expect, test } from '../../../playwright/fixtures';

test.describe('MyComponent', () => {
  test('should render', async ({ gotoStory, getByTestId }) => {
    // 1. Переход на Storybook story
    await gotoStory({
      name: 'mycomponent',
      story: 'playground',
      props: {
        'data-test-id': 'my-component',
      },
    });

    // 2. Получение элемента
    const component = getByTestId('my-component');

    // 3. Проверка
    await expect(component).toBeVisible();
  });
});
```

### Тест с взаимодействием

```typescript
test('should handle click', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'button',
    props: { 'data-test-id': 'btn' },
  });

  const button = getByTestId('btn');
  await button.click();
  
  await expect(button).toHaveAttribute('aria-pressed', 'true');
});
```

### Параметризованные тесты

```typescript
import { SIZE } from '../src/constants';

test.describe('Sizes', () => {
  for (const size of Object.values(SIZE)) {
    test(`renders size ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'component',
        props: { 
          'data-test-id': 'comp',
          size 
        },
      });

      const comp = getByTestId('comp');
      await expect(comp).toHaveAttribute('data-size', size);
    });
  }
});
```

## 🎯 Best Practices

### ✅ DO

- **Используйте `data-test-id`** для идентификации элементов
- **Используйте кастомные fixtures** (`gotoStory`, `getByTestId`)
- **Группируйте связанные тесты** через `test.describe()`
- **Тестируйте edge cases** (пустые значения, длинные строки, и т.д.)
- **Ожидайте состояний** через `expect().toBeVisible()` вместо `waitForTimeout()`

### ❌ DON'T

- ❌ Не используйте CSS селекторы напрямую - используйте `data-test-id`
- ❌ Не используйте `page.waitForTimeout()` - используйте автоматические ожидания
- ❌ Не дублируйте логику - создавайте helper функции
- ❌ Не тестируйте внутреннюю реализацию - тестируйте поведение

## 🔧 Конфигурация

### Переменные окружения

Создайте `.env` файл в корне проекта (см. `.env.example`):

```bash
# Локальное тестирование
TEST_LOCAL=true

# URL Storybook (если не локально)
UIKIT_SNACK_URL=https://your-storybook-url.com

# Количество воркеров в CI
PW_CI_WORKERS=2
```

### Настройка браузеров

Измените `playwright/constants/projects.ts` для настройки браузеров и устройств:

```typescript
export const PROJECTS: Config['projects'] = [
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1200, height: 871 },
    },
  },
  // Добавьте другие браузеры...
];
```

## 🐛 Отладка

### Playwright Inspector

Запустите тест в режиме отладки:

```bash
pnpm test:e2e:debug
```

Откроется Playwright Inspector с возможностью:
- Пошагового выполнения
- Инспектирования элементов
- Просмотра локаторов
- Записи действий

### UI Mode

Интерактивный режим с полной визуализацией:

```bash
pnpm test:e2e:ui
```

Возможности:
- Запуск отдельных тестов
- Просмотр traces
- Просмотр screenshots и videos
- Время выполнения каждого шага

### VS Code Extension

Установите расширение [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright):

- Запуск тестов прямо из редактора
- Точки останова
- Просмотр результатов inline
- Pick locator инструмент

## 📊 Отчеты

После выполнения тестов:

```bash
pnpm test:e2e:report
```

Откроется HTML отчет с:
- Статусом каждого теста
- Screenshots при падении
- Videos при падении  
- Traces для анализа
- Timing информацией

## 🏗️ CI/CD

В CI окружении (`CI=true`):

- ✅ Автоматически 3 повтора при падении
- ✅ Оптимизированное количество воркеров
- ✅ Screenshots и videos только при падении
- ✅ Генерация JUnit и blob отчетов
- ✅ Artifacts в `playwright/test-results/`

## 📚 Дополнительные ресурсы

- [Playwright Documentation](https://playwright.dev)
- [Storybook Test Runner](https://storybook.js.org/docs/react/writing-tests/test-runner)
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - детальная документация
- [playwright/README.md](./playwright/README.md) - документация по fixtures и утилитам

## 💡 Примеры

Посмотрите существующие тесты:
- `packages/avatar/__test__/avatar.spec.ts`
- `packages/counter/__test__/counter.spec.ts`

## ❓ Troubleshooting

### Проблема: Storybook не запускается

```bash
# Проверьте, запущен ли Storybook
curl https://localhost:6006/

# Если нет, запустите в отдельном терминале
pnpm storybook
```

### Проблема: Браузеры не установлены

```bash
npx playwright install
```

### Проблема: Тесты падают с timeout

Увеличьте timeout в `playwright.config.ts`:

```typescript
use: {
  actionTimeout: 20000,      // Увеличьте с 10000
  navigationTimeout: 30000,  // Увеличьте с 20000
}
```

### Проблема: SSL ошибки локально

Убедитесь, что `IS_LOCAL` установлен в `true` в конфиге:

```typescript
ignoreHTTPSErrors: IS_LOCAL,
```

## 🎉 Готово!

Теперь вы готовы писать и запускать E2E тесты для ваших компонентов!

Начните с простого теста и постепенно добавляйте более сложные сценарии.
