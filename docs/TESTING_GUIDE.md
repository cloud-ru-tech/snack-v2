# Testing Architecture Guide

Детальная инструкция по организации E2E и Unit тестирования в монорепозитории на основе Playwright и Vitest.

## Содержание

- [E2E тестирование (Playwright)](#e2e-тестирование-playwright)
- [Unit тестирование (Vitest)](#unit-тестирование-vitest)
- [Структура проекта](#структура-проекта)
- [Примеры тестов](#примеры-тестов)

---

## E2E тестирование (Playwright)

### Конфигурация Playwright

#### Основной конфиг (`playwright.config.ts`)

```typescript
import { resolve } from 'path';
import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

config();

export default defineConfig({
  // Директория с пакетами, где будут искаться тесты
  testDir: './packages',
  
  // Паттерн для поиска тестовых файлов
  testMatch: ['**/__test__/**/*.spec.ts'],
  
  // Директория для результатов тестов
  outputDir: resolve(PLAYWRIGHT_ROOT_DIR, 'test-results'),
  
  // Игнорируемые директории
  testIgnore: ['**/node_modules/**'],
  
  // Запуск тестов параллельно
  fullyParallel: true,
  
  // Общие настройки для всех тестов
  use: {
    baseURL: UIKIT_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test-id',
    actionTimeout: 10000,
    navigationTimeout: 20000,
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: getCustomHeaders(),
  },
  
  // Проекты для разных браузеров
  projects: PROJECTS,
});
```

### Структура директории `playwright/`

```
playwright/
├── constants/
│   ├── common.ts          # Общие константы и окружение
│   └── projects.ts        # Конфигурация браузеров
├── utils/
│   ├── dataTestIdSelector.ts              # Селектор для data-test-id
│   ├── getCustomHeaders.ts                # HTTP заголовки для веток
│   ├── getEnvironmentDependentConfigPart.ts # CI/локальная конфигурация
│   ├── getStorybookUrl.ts                 # Генератор URL для Storybook
│   ├── getWorkers.ts                      # Расчет количества воркеров
│   └── index.ts                           # Экспорт утилит
└── fixtures.ts            # Кастомные fixtures для тестов
```

### Константы и окружение (`constants/common.ts`)

```typescript
import { config } from 'dotenv';

config();

const { TEST_LOCAL, UIKIT_SNACK_URL, BRANCH_NAME, TEST_ON_BRANCH, PW_CI_WORKERS, CI } = process.env;

// Определение окружения
export const IS_CI = Boolean(CI);
export const IS_LOCAL = TEST_LOCAL === 'true' || !IS_CI;

// URL приложения (локально или удаленно)
export const UIKIT_URL = TEST_LOCAL === 'true' || !UIKIT_SNACK_URL 
  ? 'https://localhost:6006/' 
  : UIKIT_SNACK_URL;

// Директория для результатов Playwright
export const PLAYWRIGHT_ROOT_DIR = `${process.cwd()}/playwright`;

// Атрибут для тестовых ID
export const TEST_ID_ATTRIBUTE = 'data-test-id';

// Константы для работы с ветками
export const CURRENT_BRANCH_NAME = BRANCH_NAME;
export const IS_TESTED_ON_BRANCH = TEST_ON_BRANCH;
export const CI_WORKERS = PW_CI_WORKERS;
export const DEPLOY_NAMESPACE = 'ui-uikit-snack';
```

### Конфигурация браузеров (`constants/projects.ts`)

```typescript
import { Config, devices } from '@playwright/test';

export const PROJECTS: Config['projects'] = [
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'mobile',
    use: {
      ...devices['Pixel 7'],
    },
  },
];
```

### Утилиты

#### Селектор для data-test-id (`utils/dataTestIdSelector.ts`)

```typescript
export function dataTestIdSelector(value: string): string {
  return `[data-test-id="${value}"]`;
}
```

#### Генератор URL для Storybook (`utils/getStorybookUrl.ts`)

```typescript
import { IStringifyOptions, stringify } from 'qs';

const HEX_REGEXP = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
const COLOR_REGEXP = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;

const encodeSpecialValues = (value: unknown): any => {
  if (value === undefined) return '!undefined';
  if (value === null) return '!null';
  if (typeof value === 'string') {
    if (HEX_REGEXP.test(value)) return `!hex(${value.slice(1)})`;
    if (COLOR_REGEXP.test(value)) return `!${value.replace(/[\s%]/g, '')}`;
    return value;
  }
  if (Array.isArray(value)) return value.map(encodeSpecialValues);
  if (typeof value === 'object') {
    return Object.entries(value).reduce(
      (acc, [key, val]) => Object.assign(acc, { [key]: encodeSpecialValues(val) }),
      {},
    );
  }
  return value;
};

const QS_OPTIONS: IStringifyOptions<true> = {
  encode: false,
  delimiter: ';',
  allowDots: true,
  format: 'RFC1738',
  serializeDate: (date: Date) => `!date(${date.toISOString()})`,
};

const buildArgsParam = (args: Record<string, unknown>): string =>
  stringify(encodeSpecialValues(args), QS_OPTIONS)
    .replace(/ /g, '+')
    .split(';')
    .map((part: string) => part.replace('=', ':'))
    .join(';');

export type StorybookUrlOptions = {
  name: string;
  group?: string;
  props?: Record<string, unknown>;
  story?: string;
  category?: string;
  globals?: Record<string, unknown>;
};

export function getStorybookUrl({
  name,
  group,
  props,
  story = name,
  category = 'components',
  globals,
}: StorybookUrlOptions): string {
  let propsString = '';
  let globalsString = '';

  if (props) {
    propsString = buildArgsParam(props);
  }

  if (globals) {
    globalsString = buildArgsParam(globals);
  }

  return `iframe.html?id=${category}${group ? `-${group}` : ''}-${name}--${story}&viewMode=story${
    globalsString ? `&globals=${globalsString}` : ''
  }${propsString ? `&args=${propsString}` : ''}`;
}
```

#### HTTP заголовки для веток (`utils/getCustomHeaders.ts`)

```typescript
import { exec } from 'shelljs';

function getBranchName(): string {
  let branchName = CURRENT_BRANCH_NAME || '';

  if (IS_TESTED_ON_BRANCH === 'true') {
    const currentBranch = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.replace('\n', '');

    if (currentBranch) {
      const isBranchExistsInRemote = exec(`git ls-remote origin ${currentBranch}`, { silent: true }).stdout.length !== 0;

      if (!isBranchExistsInRemote) {
        logError(`Branch ${currentBranch} does not exist in remote`);
        process.exit(1);
      }

      const mainBranch = exec('git rev-parse --abbrev-ref origin/HEAD', { silent: true })
        .stdout.replace(/(origin\/)|\n/g, '');

      if (mainBranch === currentBranch) {
        logDebug(`You are on ${mainBranch}. No headers will be applied`);
      } else {
        branchName = currentBranch;
      }
    }
  }

  return branchName;
}

export function getCustomHeaders(): Record<string, string> {
  const branchName = getBranchName();
  const headers: Record<string, string> = {};

  if (branchName) {
    headers[DEPLOY_NAMESPACE] = branchName;
  }

  return headers;
}
```

#### Конфигурация в зависимости от окружения (`utils/getEnvironmentDependentConfigPart.ts`)

```typescript
import { resolve } from 'path';
import { Config as PlaywrightConfig, ReporterDescription } from '@playwright/test';

export function getEnvironmentDependentConfigPart({ outputDir }: { outputDir: string }): PlaywrightConfig {
  const junitReporter: ReporterDescription = ['junit', { outputFile: resolve(outputDir, 'reports/results.xml') }];

  if (IS_CI) {
    return {
      forbidOnly: true,
      retries: 3,
      workers: getWorkers(),
      reporter: [['list'], ['blob', { outputDir: resolve(outputDir, 'reports/blob') }], junitReporter],
    };
  }

  return {
    retries: 0,
    workers: 3,
    reporter: [['list'], junitReporter],
  };
}
```

#### Расчет количества воркеров (`utils/getWorkers.ts`)

```typescript
export function getWorkers(): string | number {
  if (!CI_WORKERS) return 2;

  const value = CI_WORKERS.trim();

  if (value.endsWith('%')) {
    const percentage = parseInt(value);
    return percentage ? `${percentage}%` : 2;
  }

  return parseInt(value) || 2;
}
```

### Кастомные Fixtures (`fixtures.ts`)

Расширяют возможности Playwright специфичными для проекта функциями:

```typescript
import { expect as playwrightExpect, Locator, test as base } from '@playwright/test';

type DragOptions = {
  targetPosition?: { x: number; y: number };
  target?: Locator;
  steps?: number;
};

type PlaywrightFixtures = {
  // Переход на конкретную Storybook-историю
  gotoStory(options: StorybookUrlOptions): Promise<void>;
  
  // Получение элемента по data-test-id
  getByTestId(testId: string): Locator;
  
  // Скролл элемента
  scrollBy(locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }): Promise<void>;
  
  // Получение позиции скролла
  getScrollTop(locator: Locator): Promise<number>;
  
  // Ожидание навигации
  waitForNavigation(expectedPath: string, options?: { timeout?: number }): Promise<void>;
  
  // Drag and drop
  dragTo(locator: Locator, options?: DragOptions): Promise<void>;
};

export const test = base.extend<PlaywrightFixtures>({
  // Реализация gotoStory - переход на Storybook с ожиданием загрузки
  gotoStory: async ({ page }, customUse) => {
    await customUse(async (options: StorybookUrlOptions) => {
      const url = getStorybookUrl(options);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('load');

      // Ожидание скрытия лоадера Storybook
      const storybookLoaderLocator = page.locator('.sb-preparing-story .sb-loader');
      await playwrightExpect(storybookLoaderLocator).toBeHidden({ timeout: 10000 });

      // Проверка на ошибки загрузки истории
      const errorMessage = page.locator("text=/Couldn't find story|Unable to find story|Story not found/i");
      const errorVisible = await errorMessage.isVisible().catch(() => false);
      if (errorVisible) {
        throw new Error(`Story not found: ${url}`);
      }

      // Ожидание рендера story-root
      await playwrightExpect(page.locator('#story-root')).toBeAttached({ timeout: 15000 });
    });
  },
  
  getByTestId: async ({ page }, customUse) => {
    await customUse((testId: string) => page.locator(dataTestIdSelector(testId)));
  },
  
  scrollBy: async ({}, customUse) => {
    await customUse(async (locator: Locator, options?) => {
      const isScrollable = await locator.evaluate(el => el.scrollHeight > el.clientHeight);

      if (!isScrollable) {
        throw new Error('Content is not scrollable - scrollHeight should be greater than clientHeight');
      }

      await locator.evaluate((el, opts) => {
        el.scrollBy({ top: opts?.top ?? 0, left: opts?.left ?? 0, behavior: opts?.behavior ?? 'auto' });
      }, options);
    });
  },
  
  getScrollTop: async ({}, customUse) => {
    await customUse(async (locator: Locator) => await locator.evaluate(el => el.scrollTop));
  },
  
  waitForNavigation: async ({ page }, customUse) => {
    await customUse(async (expectedPath: string, options?) => {
      await page
        .waitForFunction(
          (path: string) => {
            const url = window.location.pathname + window.location.search + window.location.hash;
            return url.includes(path);
          },
          expectedPath,
          { timeout: options?.timeout ?? 5000 },
        )
        .catch(() => {});
    });
  },
  
  dragTo: async ({ page }, customUse) => {
    await customUse(async (locator: Locator, options?: DragOptions) => {
      const elementBox = await locator.boundingBox();
      if (!elementBox) {
        throw new Error('Element is not visible or has no bounding box');
      }

      const startX = elementBox.x + elementBox.width / 2;
      const startY = elementBox.y + elementBox.height / 2;

      let endX: number;
      let endY: number;

      if (options?.target) {
        const targetBox = await options.target.boundingBox();
        if (!targetBox) {
          throw new Error('Target element is not visible or has no bounding box');
        }
        endX = targetBox.x + targetBox.width / 2;
        endY = targetBox.y + targetBox.height / 2;
      } else if (options?.targetPosition) {
        endX = startX + options.targetPosition.x;
        endY = startY + options.targetPosition.y;
      } else {
        throw new Error('Either target or targetPosition must be provided');
      }

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY, { steps: options?.steps ?? 10 });
      await page.mouse.up();
    });
  },
});

export { expect, type Locator, type Page } from '@playwright/test';
```

---

## Unit тестирование (Vitest)

### Конфигурация Vitest

#### Основной конфиг (`vitest.config.ts`)

```typescript
import createConfig from '@cloud-ru/ft-config-vitest';

export default createConfig(
  {
    test: {
      // Паттерн для поиска unit-тестов
      include: ['**/__unit__/**/*.spec.(ts|tsx)'],
    },
  },
  { useAliases: false },
);
```

### Особенности

- Используется готовая конфигурация из внутреннего пакета `@cloud-ru/ft-config-vitest`
- Тесты размещаются в папках `__unit__` внутри каждого пакета
- Поддержка как TypeScript, так и TSX файлов

---

## Структура проекта

```
project-root/
├── playwright/                    # E2E тестовые утилиты
│   ├── constants/
│   │   ├── common.ts             # Константы окружения
│   │   └── projects.ts           # Браузеры и устройства
│   ├── utils/
│   │   ├── dataTestIdSelector.ts
│   │   ├── getCustomHeaders.ts
│   │   ├── getEnvironmentDependentConfigPart.ts
│   │   ├── getStorybookUrl.ts
│   │   ├── getWorkers.ts
│   │   └── index.ts
│   └── fixtures.ts               # Кастомные Playwright fixtures
├── playwright.config.ts           # Конфигурация Playwright
├── vitest.config.ts              # Конфигурация Vitest
└── packages/
    ├── avatar/
    │   ├── __test__/             # E2E тесты для компонента Avatar
    │   │   └── avatar.spec.ts
    │   └── src/
    │       └── components/
    └── utils/
        ├── __unit__/             # Unit тесты для утилит
        │   └── componentPropsProcessors.spec.ts
        └── src/
```

### Соглашения по именованию

- **E2E тесты**: `packages/[package-name]/__test__/**/*.spec.ts`
- **Unit тесты**: `packages/[package-name]/__unit__/**/*.spec.(ts|tsx)`

---

## Примеры тестов

### E2E тест компонента Avatar (`packages/avatar/__test__/avatar.spec.ts`)

```typescript
import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/components/constants';

const TEST_ID = 'avatar';
const ABBREVIATION_TEST_ID = 'abbreviation';
const IMAGE_TEST_ID = 'image';
const INDICATOR_TEST_ID = 'indicator';

test.describe('Avatar', () => {
  // Базовый тест рендера
  test('should render', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    const avatar = getByTestId(TEST_ID);

    await expect(avatar).toBeVisible();
    await expect(avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`)).toBeVisible();
    await expect(avatar.locator(`[data-test-id="${IMAGE_TEST_ID}"]`)).not.toBeVisible();
    await expect(avatar.locator(`[data-test-id="${INDICATOR_TEST_ID}"]`)).not.toBeVisible();
  });

  // Тест с индикатором
  test('should render with indicator', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        indicator: 'red',
      },
    });
    const avatar = getByTestId(TEST_ID);
    const indicator = avatar.locator(`[data-test-id="${INDICATOR_TEST_ID}"]`);

    await expect(indicator).toBeVisible();
  });

  // Тест с изображением
  test('should render with image', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showImage: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const image = avatar.locator(`[data-test-id="${IMAGE_TEST_ID}"]`);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(image).toBeVisible();
    await expect(abbreviation).not.toBeVisible();
  });

  // Тест fallback при битой ссылке
  test('should fallback to abbreviation when the link is broken', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showImage: true,
        customSrc: 'x',
      },
    });
    const avatar = getByTestId(TEST_ID);
    const image = avatar.locator(`[data-test-id="${IMAGE_TEST_ID}"]`);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(image).not.toBeVisible();
    await expect(abbreviation).toBeVisible();
  });

  // Тест с 1 символом
  test('should render with 1 symbol', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showTwoSymbols: false,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);
    const text = await abbreviation.textContent();

    expect(text?.length).toEqual(1);
  });

  // Тест с 2 символами
  test('should render with 2 symbols', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);
    const text = await abbreviation.textContent();

    expect(text?.length).toEqual(2);
  });

  // Тест ограничения для xxs размера
  test('should always render with 1 symbol for size = xxs', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        size: SIZE.Xxs,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);
    const text = await abbreviation.textContent();

    expect(text?.length).toEqual(1);
  });
});
```

### Unit тест утилиты (`packages/utils/__unit__/componentPropsProcessors.spec.ts`)

```typescript
import { extractSupportProps } from '../src';

describe('extractSupportProps', () => {
  it('should extract support props', () => {
    const extractedProps = {
      'data-test-id': 'button',
      'data-test-x': 2,
      'aria-role': 'button',
      'aria-x': 2,
      'data-other-attr': 'text',
    };

    const otherProps = {
      'some-other-prop': 'text',
    };

    expect(extractSupportProps({ ...otherProps, ...extractedProps })).toEqual(extractedProps);
  });
});
```

---

## Ключевые принципы

### E2E тесты (Playwright)

1. **Storybook как среда тестирования**: Все компоненты тестируются через Storybook stories
2. **Кастомные fixtures**: Упрощают работу с типичными операциями (переход на story, получение элементов по test-id)
3. **data-test-id атрибут**: Основной способ получения элементов в тестах
4. **Мультибраузерность**: Тесты запускаются в Chrome, Firefox и на мобильных устройствах
5. **Изоляция окружения**: Поддержка локального и CI окружения с разными настройками
6. **Поддержка веток**: Возможность тестировать на разных ветках через HTTP заголовки

### Unit тесты (Vitest)

1. **Изоляция**: Каждый unit-тест проверяет одну конкретную функцию/модуль
2. **Простота**: Используется готовая конфигурация, минимум настроек
3. **Быстрота**: Unit-тесты выполняются быстрее E2E тестов

---

## Переменные окружения

```bash
# Локальное тестирование
TEST_LOCAL=true

# URL для тестирования (если не локально)
UIKIT_SNACK_URL=https://your-app.com

# Тестирование на конкретной ветке
TEST_ON_BRANCH=true
BRANCH_NAME=feature/my-feature

# CI окружение
CI=true

# Количество воркеров в CI (число или процент, например "50%")
PW_CI_WORKERS=2
```

---

## Команды для запуска

### E2E тесты

```bash
# Все E2E тесты
npx playwright test

# Конкретный браузер
npx playwright test --project=chrome

# С UI
npx playwright test --ui

# Конкретный файл
npx playwright test packages/avatar/__test__/avatar.spec.ts
```

### Unit тесты

```bash
# Все unit-тесты
npx vitest

# Watch mode
npx vitest --watch

# Coverage
npx vitest --coverage

# Конкретный файл
npx vitest packages/utils/__unit__/componentPropsProcessors.spec.ts
```

---

## Best Practices

### E2E тесты

1. Всегда используйте `data-test-id` для поиска элементов
2. Используйте кастомные fixtures (`gotoStory`, `getByTestId`) вместо прямых вызовов Playwright API
3. Группируйте тесты через `test.describe()`
4. Проверяйте как положительные, так и негативные сценарии
5. Дожидайтесь загрузки Storybook перед взаимодействием с элементами
6. Используйте `expect` из кастомных fixtures для консистентности

### Unit тесты

1. Один тест - одна проверка (или связанная группа проверок)
2. Понятные названия тестов (`it('should extract support props')`)
3. Минимум моков - тестируйте реальное поведение
4. Группируйте тесты через `describe()`
5. Изолируйте тесты друг от друга

---

## Адаптация для другого проекта

### Шаги по внедрению

1. **Установить зависимости**:
   ```bash
   npm install -D @playwright/test vitest
   npm install -D qs shelljs
   ```

2. **Скопировать структуру**:
   - Директорию `playwright/` с утилитами и fixtures
   - Конфигурации `playwright.config.ts` и `vitest.config.ts`

3. **Настроить под свой проект**:
   - Изменить `baseURL` в Playwright конфигурации
   - Адаптировать `PROJECTS` под нужные браузеры
   - Настроить переменные окружения
   - Изменить `testDir` и `testMatch` паттерны при необходимости

4. **Создать структуру тестов**:
   - `__test__/` для E2E тестов
   - `__unit__/` для unit-тестов

5. **Написать первые тесты** по примерам выше

---

## Заключение

Данная архитектура тестирования обеспечивает:

- ✅ Четкое разделение E2E и Unit тестов
- ✅ Переиспользуемые утилиты и fixtures
- ✅ Мультибраузерное тестирование
- ✅ Поддержку разных окружений (локально, CI, разные ветки)
- ✅ Простоту добавления новых тестов
- ✅ Интеграцию со Storybook для визуальных компонентов
- ✅ Быстрые unit-тесты и полноценные E2E тесты

Эта структура легко масштабируется и адаптируется под различные проекты.
