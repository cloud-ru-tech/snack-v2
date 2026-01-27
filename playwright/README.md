# Playwright E2E Testing

Структура и утилиты для E2E тестирования компонентов через Storybook с помощью Playwright.

## Структура директории

```
playwright/
├── constants/
│   ├── common.ts          # Общие константы и переменные окружения
│   └── projects.ts        # Конфигурация браузеров и устройств
├── utils/
│   ├── dataTestIdSelector.ts              # Селектор для data-test-id
│   ├── getCustomHeaders.ts                # HTTP заголовки для тестирования на ветках
│   ├── getEnvironmentDependentConfigPart.ts # CI/локальная конфигурация
│   ├── getStorybookUrl.ts                 # Генератор URL для Storybook stories
│   ├── getWorkers.ts                      # Расчет количества воркеров
│   └── index.ts                           # Экспорт утилит
├── fixtures.ts            # Кастомные fixtures для тестов
└── README.md             # Эта документация
```

## Fixtures

Кастомные fixtures расширяют возможности Playwright:

### `gotoStory(options)`

Переходит на конкретную Storybook story с ожиданием полной загрузки.

```typescript
await gotoStory({
  name: 'avatar',        // Имя компонента
  story: 'playground',   // Имя story (по умолчанию = name)
  category: 'components', // Категория (по умолчанию 'components')
  props: {               // Props для компонента
    'data-test-id': 'avatar',
    size: 'm',
  },
  globals: {             // Глобальные параметры Storybook
    theme: 'dark',
  },
});
```

### `getByTestId(testId)`

Получает элемент по атрибуту `data-test-id`.

```typescript
const button = getByTestId('submit-button');
await expect(button).toBeVisible();
```

### `scrollBy(locator, options)`

Скроллит элемент на указанное количество пикселей.

```typescript
const container = page.locator('.scrollable-container');
await scrollBy(container, { top: 100, behavior: 'smooth' });
```

### `getScrollTop(locator)`

Получает текущую позицию скролла элемента.

```typescript
const scrollTop = await getScrollTop(container);
expect(scrollTop).toBeGreaterThan(0);
```

### `waitForNavigation(expectedPath, options)`

Ожидает навигацию на указанный путь.

```typescript
await waitForNavigation('/new-page', { timeout: 5000 });
```

### `dragTo(locator, options)`

Выполняет drag and drop операцию.

```typescript
// Drag к целевому элементу
await dragTo(sourceElement, { target: targetElement });

// Drag на указанную позицию
await dragTo(sourceElement, { 
  targetPosition: { x: 100, y: 50 },
  steps: 20 
});
```

## Утилиты

### `getStorybookUrl(options)`

Генерирует URL для Storybook story с правильным форматированием параметров.

Поддерживает:
- Специальные значения: `undefined`, `null`
- HEX цвета: `#ff0000` → `!hex(ff0000)`
- RGB/RGBA цвета: `rgb(255, 0, 0)` → `!rgb(255,0,0)`
- Даты: `new Date()` → `!date(ISO string)`
- Вложенные объекты и массивы

### `dataTestIdSelector(value)`

Создает CSS-селектор для `data-test-id` атрибута.

```typescript
const selector = dataTestIdSelector('my-element');
// Результат: '[data-test-id="my-element"]'
```

### `getCustomHeaders()`

Возвращает HTTP заголовки для тестирования на разных ветках.

Автоматически определяет текущую git-ветку и добавляет соответствующий заголовок, если `TEST_ON_BRANCH=true`.

### `getEnvironmentDependentConfigPart()`

Возвращает конфигурацию Playwright в зависимости от окружения (CI/локально).

**CI окружение:**
- 3 повтора при падении тестов
- Динамическое количество воркеров
- Репортеры: list, blob, junit

**Локальное окружение:**
- 0 повторов
- 3 воркера
- Репортеры: list, junit

## Переменные окружения

Смотрите `.env.example` для списка доступных переменных.

## Примеры использования

### Базовый тест

```typescript
import { expect, test } from '../../../playwright/fixtures';

test('should render component', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'button',
    story: 'playground',
    props: {
      'data-test-id': 'button',
    },
  });

  const button = getByTestId('button');
  await expect(button).toBeVisible();
});
```

### Тест взаимодействия

```typescript
test('should handle click', async ({ gotoStory, getByTestId, page }) => {
  await gotoStory({
    name: 'button',
    story: 'playground',
    props: {
      'data-test-id': 'button',
    },
  });

  const button = getByTestId('button');
  await button.click();
  
  // Проверка результата
  const result = getByTestId('result');
  await expect(result).toHaveText('Clicked!');
});
```

### Тест с разными размерами

```typescript
import { SIZE } from '../src/constants';

test.describe('Sizes', () => {
  for (const size of Object.values(SIZE)) {
    test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'button',
        story: 'playground',
        props: {
          'data-test-id': 'button',
          size,
        },
      });

      const button = getByTestId('button');
      await expect(button).toHaveAttribute('data-size', size);
    });
  }
});
```

## Best Practices

1. **Всегда используйте `data-test-id`** для идентификации элементов
2. **Используйте fixtures** вместо прямых вызовов Playwright API
3. **Группируйте тесты** через `test.describe()`
4. **Проверяйте позитивные и негативные сценарии**
5. **Ожидайте загрузки** элементов перед взаимодействием
6. **Избегайте хардкода таймаутов** - используйте expect с автоматическими ожиданиями

## Запуск тестов

```bash
# Все E2E тесты
pnpm test:e2e

# С UI интерфейсом
pnpm test:e2e:ui

# Конкретный браузер
pnpm test:e2e:chrome
pnpm test:e2e:firefox
pnpm test:e2e:mobile

# Режим отладки
pnpm test:e2e:debug

# С видимым браузером
pnpm test:e2e:headed

# Просмотр отчета
pnpm test:e2e:report
```

## Отладка

### Playwright Inspector

```bash
pnpm test:e2e:debug
```

Позволяет пошагово выполнять тесты и исследовать элементы.

### UI Mode

```bash
pnpm test:e2e:ui
```

Интерактивный режим с визуальной отладкой и возможностью просмотра traces.

### VS Code Extension

Установите [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) для запуска и отладки тестов прямо из редактора.

## CI/CD

В CI окружении тесты автоматически:
- Запускаются с 3 повторами при падении
- Используют оптимизированное количество воркеров
- Генерируют отчеты в форматах blob и junit
- Создают screenshots и videos при падении тестов

Artifacts сохраняются в `playwright/test-results/`.
