# Testing Implementation Summary

Реализована полная инфраструктура E2E тестирования компонентов с помощью Playwright против Storybook stories.

## ✅ Что было сделано

### 1. Конфигурация Playwright

- ✅ **`playwright.config.ts`** - основной конфиг с поддержкой:
  - Мультибраузерное тестирование (Chrome, Firefox, Mobile)
  - Автоматический запуск Storybook для локальной разработки
  - Разные настройки для CI и локального окружения
  - Интеграция с кастомными HTTP заголовками для тестирования на ветках

### 2. Тестовая инфраструктура

#### Fixtures (`playwright/fixtures.ts`)
Расширенные возможности Playwright:
- `gotoStory()` - переход на Storybook story с ожиданием загрузки
- `getByTestId()` - получение элементов по data-test-id
- `scrollBy()` - прокрутка элементов
- `getScrollTop()` - получение позиции скролла
- `waitForNavigation()` - ожидание навигации
- `dragTo()` - drag and drop операции

#### Утилиты (`playwright/utils/`)
- ✅ `getStorybookUrl()` - генерация URL для stories с поддержкой props и globals
- ✅ `dataTestIdSelector()` - селектор для data-test-id
- ✅ `getCustomHeaders()` - HTTP заголовки для тестирования на ветках
- ✅ `getEnvironmentDependentConfigPart()` - конфигурация под CI/локально
- ✅ `getWorkers()` - расчет оптимального количества воркеров

#### Константы (`playwright/constants/`)
- ✅ `common.ts` - переменные окружения и общие константы
- ✅ `projects.ts` - конфигурация браузеров и устройств

### 3. Тесты для компонентов

#### Avatar (`packages/avatar/__test__/avatar.spec.ts`)
Покрытие:
- ✅ Базовый рендер с default props
- ✅ Отображение аббревиатуры (1 и 2 символа)
- ✅ Отображение изображения
- ✅ Fallback на аббревиатуру при ошибке загрузки
- ✅ Все размеры (xs, s, m, l, 3xl, 6xl, 10xl)
- ✅ Все формы (round, square)
- ✅ Все appearances (neutral, primary, red, orange, yellow, green, blue, violet, pink)
- ✅ Кастомный className
- ✅ Обработка длинных имен

**Итого: 26 тестов** для Avatar

#### Counter (`packages/counter/__test__/counter.spec.ts`)
Покрытие:
- ✅ Базовый рендер с default props
- ✅ Отображение числовых значений
- ✅ Вариант count (обычное отображение)
- ✅ Вариант count-plus (с символом +)
- ✅ Вариант count-k (с сокращением в тысячах)
- ✅ Все размеры (xs, s)
- ✅ Все appearances (primary, neutral, red)
- ✅ Все цвета (accent, decor)
- ✅ Обработка нулевого значения
- ✅ Использование default plus limit
- ✅ Кастомный className
- ✅ Обработка больших чисел
- ✅ Форматирование с K

**Итого: 19 тестов** для Counter

**Всего: 45 E2E тестов**

### 4. Документация

- ✅ **`PLAYWRIGHT_QUICKSTART.md`** - быстрый старт и команды запуска
- ✅ **`HOW_TO_ADD_TESTS.md`** - подробное руководство по добавлению тестов
- ✅ **`playwright/README.md`** - документация по fixtures и утилитам
- ✅ **`.env.example`** - пример переменных окружения
- ✅ **`TESTING_GUIDE.md`** - обновлен с актуальной информацией

### 5. NPM Scripts

Добавлены в `package.json`:
```bash
pnpm test:e2e             # Все E2E тесты
pnpm test:e2e:ui          # UI Mode
pnpm test:e2e:chrome      # Только Chrome
pnpm test:e2e:firefox     # Только Firefox
pnpm test:e2e:mobile      # Только Mobile
pnpm test:e2e:debug       # Режим отладки
pnpm test:e2e:headed      # С видимым браузером
pnpm test:e2e:report      # Просмотр отчета
```

### 6. Зависимости

Установлены:
- ✅ `@playwright/test@1.58.0`
- ✅ `qs@6.14.1`
- ✅ `dotenv@17.2.3`
- ✅ `shelljs@0.8.5` (уже был)

## 🎯 Архитектура

```
project-root/
├── playwright/                    # Тестовая инфраструктура
│   ├── constants/
│   │   ├── common.ts             # Переменные окружения
│   │   └── projects.ts           # Браузеры
│   ├── utils/
│   │   ├── dataTestIdSelector.ts
│   │   ├── getCustomHeaders.ts
│   │   ├── getEnvironmentDependentConfigPart.ts
│   │   ├── getStorybookUrl.ts
│   │   ├── getWorkers.ts
│   │   └── index.ts
│   ├── fixtures.ts               # Кастомные fixtures
│   └── README.md                 # Документация
├── playwright.config.ts           # Конфигурация Playwright
├── packages/
│   ├── avatar/
│   │   ├── __test__/             # ✨ E2E тесты
│   │   │   └── avatar.spec.ts
│   │   └── src/
│   └── counter/
│       ├── __test__/             # ✨ E2E тесты
│       │   └── counter.spec.ts
│       └── src/
├── .env.example                   # Пример переменных
├── PLAYWRIGHT_QUICKSTART.md       # Быстрый старт
├── HOW_TO_ADD_TESTS.md           # Руководство
└── TESTING_GUIDE.md              # Полная документация
```

## 🚀 Как запустить

### 1. Установите браузеры (первый раз)

```bash
npx playwright install
```

### 2. Запустите Storybook

```bash
pnpm storybook
```

### 3. Запустите тесты

```bash
# Все тесты
pnpm test:e2e

# Или UI Mode для интерактивной работы
pnpm test:e2e:ui
```

## 📋 Чеклист для новых компонентов

Чтобы добавить тесты для нового компонента:

1. Создать директорию `packages/[component]/__test__/`
2. Создать файл `[component].spec.ts`
3. Убедиться что компонент поддерживает `data-test-id` prop
4. Написать тесты используя fixtures:
   - Базовый рендер
   - Различные пропсы (sizes, appearances, и т.д.)
   - Взаимодействия (click, hover, и т.д.)
   - Edge cases
5. Запустить тесты: `pnpm test:e2e packages/[component]/__test__`

Подробнее см. [HOW_TO_ADD_TESTS.md](./HOW_TO_ADD_TESTS.md)

## 🎨 Примеры использования

### Базовый тест

```typescript
test('should render', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'component',
    story: 'playground',
    props: { 'data-test-id': 'comp' },
  });

  const comp = getByTestId('comp');
  await expect(comp).toBeVisible();
});
```

### Параметризованный тест

```typescript
test.describe('Sizes', () => {
  for (const size of Object.values(SIZE)) {
    test(`renders ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'component',
        props: { 'data-test-id': 'comp', size },
      });

      const comp = getByTestId('comp');
      await expect(comp).toHaveAttribute('data-size', size);
    });
  }
});
```

## 🔧 Конфигурация

### Переменные окружения

Создайте `.env` файл (см. `.env.example`):

```bash
# Локальное тестирование
TEST_LOCAL=true

# URL Storybook (если не локально)
UIKIT_SNACK_URL=https://your-storybook.com

# Тестирование на ветках
TEST_ON_BRANCH=false
BRANCH_NAME=

# CI настройки
CI=false
PW_CI_WORKERS=2
```

### Браузеры

Настраиваются в `playwright/constants/projects.ts`:

- Chrome (Desktop, 1200x871)
- Firefox (Desktop, 1200x871)
- Mobile (Pixel 7)

## 📊 CI/CD

В CI окружении (`CI=true`):
- 3 повтора при падении тестов
- Динамическое количество воркеров
- Screenshots и videos только при падении
- JUnit и blob отчеты
- Artifacts в `playwright/test-results/`

## 🐛 Отладка

### Playwright Inspector
```bash
pnpm test:e2e:debug
```

### UI Mode
```bash
pnpm test:e2e:ui
```

### VS Code Extension
Установите [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## 📚 Документация

- [PLAYWRIGHT_QUICKSTART.md](./PLAYWRIGHT_QUICKSTART.md) - Быстрый старт
- [HOW_TO_ADD_TESTS.md](./HOW_TO_ADD_TESTS.md) - Добавление новых тестов
- [playwright/README.md](./playwright/README.md) - Fixtures и утилиты
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Полная архитектура
- [Playwright Docs](https://playwright.dev) - Официальная документация

## ✨ Best Practices

1. ✅ Используйте `data-test-id` для идентификации элементов
2. ✅ Используйте кастомные fixtures вместо прямых вызовов Playwright API
3. ✅ Группируйте тесты через `test.describe()`
4. ✅ Тестируйте поведение, а не реализацию
5. ✅ Избегайте hardcoded timeouts
6. ✅ Проверяйте как позитивные, так и негативные сценарии
7. ✅ Параметризуйте тесты для разных вариантов props

## 🎉 Готово!

Инфраструктура E2E тестирования полностью настроена и готова к использованию.

Примеры тестов:
- `packages/avatar/__test__/avatar.spec.ts` (26 тестов)
- `packages/counter/__test__/counter.spec.ts` (19 тестов)

Запустите тесты:
```bash
pnpm test:e2e
```

Или начните с UI Mode для интерактивной работы:
```bash
pnpm test:e2e:ui
```

---

**Следующие шаги:**
1. Запустить тесты и убедиться что все работает
2. Добавить тесты для остальных компонентов
3. Интегрировать в CI/CD pipeline
4. Настроить coverage reporting при необходимости
