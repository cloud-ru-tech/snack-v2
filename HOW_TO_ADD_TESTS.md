# Как добавить тесты для нового компонента

Пошаговое руководство по добавлению E2E тестов для новых компонентов.

## 📋 Шаги

### 1. Создайте директорию для тестов

В папке вашего компонента создайте директорию `__test__`:

```bash
packages/
└── your-component/
    ├── __test__/           # ← Создайте эту директорию
    │   └── your-component.spec.ts
    ├── src/
    └── stories/
```

### 2. Создайте файл теста

Создайте файл `your-component.spec.ts` с базовой структурой:

```typescript
import { expect, test } from '../../../playwright/fixtures';
import { SIZE, APPEARANCE } from '../src/constants'; // Импортируйте константы если есть

const TEST_ID = 'your-component';

test.describe('YourComponent', () => {
  test('should render', async ({ gotoStory, getByTestId }) => {
    // Ваш тест здесь
  });
});
```

### 3. Напишите базовый тест рендера

```typescript
test('should render with default props', async ({ gotoStory, getByTestId }) => {
  // 1. Перейти на Storybook story
  await gotoStory({
    name: 'yourcomponent',      // Имя из Storybook (lowercase)
    story: 'playground',         // Имя story (обычно 'playground')
    props: {
      'data-test-id': TEST_ID,  // Передать test-id
    },
  });

  // 2. Получить элемент
  const component = getByTestId(TEST_ID);

  // 3. Проверить видимость
  await expect(component).toBeVisible();
});
```

### 4. Добавьте тесты для разных состояний

#### Тест с пропсами

```typescript
test('should display correct text', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'yourcomponent',
    story: 'playground',
    props: {
      'data-test-id': TEST_ID,
      text: 'Hello World',      // Передайте нужные props
      variant: 'primary',
    },
  });

  const component = getByTestId(TEST_ID);
  await expect(component).toHaveText('Hello World');
});
```

#### Тест взаимодействия

```typescript
test('should handle click', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'yourcomponent',
    story: 'playground',
    props: {
      'data-test-id': TEST_ID,
    },
  });

  const component = getByTestId(TEST_ID);
  
  // Кликнуть
  await component.click();
  
  // Проверить результат
  await expect(component).toHaveAttribute('aria-pressed', 'true');
});
```

#### Параметризованные тесты

Для тестирования всех вариантов размеров/цветов/и т.д.:

```typescript
test.describe('Sizes', () => {
  const sizes = Object.values(SIZE);

  for (const size of sizes) {
    test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'yourcomponent',
        story: 'playground',
        props: {
          'data-test-id': TEST_ID,
          size,
        },
      });

      const component = getByTestId(TEST_ID);
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('data-size', size);
    });
  }
});
```

### 5. Добавьте data-test-id в компонент

Убедитесь, что ваш компонент поддерживает `data-test-id`:

```typescript
export type YourComponentProps = {
  // ... другие props
} & React.HTMLAttributes<HTMLDivElement>; // Или HTMLButtonElement и т.д.

export function YourComponent({ 
  className,
  ...rest 
}: YourComponentProps) {
  return (
    <div
      className={className}
      {...rest}  // ← Это передаст data-test-id
    >
      {/* содержимое */}
    </div>
  );
}
```

Или используйте утилиту `extractSupportProps`:

```typescript
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

export type YourComponentProps = WithSupportProps<{
  // ... ваши props
}>;

export function YourComponent({ className, ...rest }: YourComponentProps) {
  return (
    <div
      className={className}
      {...extractSupportProps(rest)} // ← Извлечет data-test-id, aria-* и т.д.
    >
      {/* содержимое */}
    </div>
  );
}
```

### 6. Запустите тесты

```bash
# Все тесты
pnpm test:e2e

# Только ваш компонент
pnpm test:e2e packages/your-component/__test__

# С UI
pnpm test:e2e:ui
```

## 🎯 Шаблоны тестов

### Полный шаблон файла теста

```typescript
import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, SIZE } from '../src/constants';

const TEST_ID = 'component';

test.describe('Component', () => {
  // Базовый рендер
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'component',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const component = getByTestId(TEST_ID);
    await expect(component).toBeVisible();
  });

  // Тест с контентом
  test('should display correct content', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'component',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        title: 'Test Title',
        description: 'Test Description',
      },
    });

    const component = getByTestId(TEST_ID);
    await expect(component).toContainText('Test Title');
    await expect(component).toContainText('Test Description');
  });

  // Группа тестов для размеров
  test.describe('Sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'component',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            size,
          },
        });

        const component = getByTestId(TEST_ID);
        await expect(component).toHaveAttribute('data-size', size);
      });
    }
  });

  // Группа тестов для внешнего вида
  test.describe('Appearances', () => {
    for (const appearance of Object.values(APPEARANCE)) {
      test(`should render with appearance ${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'component',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            appearance,
          },
        });

        const component = getByTestId(TEST_ID);
        await expect(component).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  // Тест взаимодействия
  test('should handle user interaction', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'component',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const component = getByTestId(TEST_ID);
    const button = component.locator('button');
    
    await button.click();
    await expect(component).toHaveAttribute('data-active', 'true');
  });

  // Тест edge case
  test('should handle long text correctly', async ({ gotoStory, getByTestId }) => {
    const longText = 'A'.repeat(1000);
    
    await gotoStory({
      name: 'component',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        text: longText,
      },
    });

    const component = getByTestId(TEST_ID);
    await expect(component).toBeVisible();
  });

  // Тест кастомного класса
  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-test-class';

    await gotoStory({
      name: 'component',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        className: customClass,
      },
    });

    const component = getByTestId(TEST_ID);
    await expect(component).toHaveClass(new RegExp(customClass));
  });
});
```

## 🔍 Частые сценарии

### Тестирование формы

```typescript
test('should submit form with valid data', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'form',
    props: { 'data-test-id': 'form' },
  });

  const form = getByTestId('form');
  const input = form.locator('input[name="email"]');
  const submitBtn = form.locator('button[type="submit"]');

  await input.fill('test@example.com');
  await submitBtn.click();

  await expect(form).toHaveAttribute('data-submitted', 'true');
});
```

### Тестирование модального окна

```typescript
test('should open and close modal', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'modal',
    props: { 'data-test-id': 'modal-trigger' },
  });

  const trigger = getByTestId('modal-trigger');
  await trigger.click();

  const modal = getByTestId('modal');
  await expect(modal).toBeVisible();

  const closeBtn = modal.locator('[data-test-id="close-btn"]');
  await closeBtn.click();

  await expect(modal).not.toBeVisible();
});
```

### Тестирование выпадающего списка

```typescript
test('should select option from dropdown', async ({ gotoStory, getByTestId, page }) => {
  await gotoStory({
    name: 'dropdown',
    props: { 'data-test-id': 'dropdown' },
  });

  const dropdown = getByTestId('dropdown');
  await dropdown.click();

  const option = page.locator('[data-value="option-2"]');
  await option.click();

  await expect(dropdown).toHaveText('Option 2');
});
```

### Тестирование асинхронной загрузки

```typescript
test('should display data after loading', async ({ gotoStory, getByTestId }) => {
  await gotoStory({
    name: 'async-component',
    props: { 'data-test-id': 'async' },
  });

  const component = getByTestId('async');
  
  // Проверить loader
  await expect(component.locator('.loader')).toBeVisible();
  
  // Дождаться загрузки данных
  await expect(component.locator('.content')).toBeVisible({ timeout: 5000 });
  
  // Проверить, что loader скрыт
  await expect(component.locator('.loader')).not.toBeVisible();
});
```

### Тестирование скролла

```typescript
test('should load more items on scroll', async ({ gotoStory, getByTestId, scrollBy }) => {
  await gotoStory({
    name: 'infinite-list',
    props: { 'data-test-id': 'list' },
  });

  const list = getByTestId('list');
  const initialCount = await list.locator('.item').count();

  // Скроллить вниз
  await scrollBy(list, { top: 500 });

  // Дождаться загрузки новых элементов
  await expect(list.locator('.item').nth(initialCount)).toBeVisible();
  
  const newCount = await list.locator('.item').count();
  expect(newCount).toBeGreaterThan(initialCount);
});
```

## ✅ Checklist

Перед отправкой PR убедитесь, что:

- [ ] Создана директория `__test__` в пакете компонента
- [ ] Тест файл называется `component-name.spec.ts`
- [ ] Компонент поддерживает `data-test-id` prop
- [ ] Есть базовый тест рендера
- [ ] Протестированы основные варианты props (sizes, appearances, и т.д.)
- [ ] Протестированы взаимодействия (click, hover, focus)
- [ ] Протестированы edge cases
- [ ] Все тесты проходят локально: `pnpm test:e2e`
- [ ] Нет hardcoded timeouts (используются автоматические ожидания)
- [ ] Используются кастомные fixtures (`gotoStory`, `getByTestId`)

## 📚 Полезные ссылки

- [PLAYWRIGHT_QUICKSTART.md](./PLAYWRIGHT_QUICKSTART.md) - Быстрый старт
- [playwright/README.md](./playwright/README.md) - Документация по fixtures
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Полная архитектура тестирования
- [Playwright Assertions](https://playwright.dev/docs/test-assertions) - Доступные проверки
- [Playwright Locators](https://playwright.dev/docs/locators) - Работа с элементами

## 💡 Советы

1. **Начните с простого** - сначала базовый тест рендера, потом добавляйте сложность
2. **Используйте UI Mode** (`pnpm test:e2e:ui`) для отладки
3. **Копируйте существующие тесты** - смотрите `packages/avatar/__test__/avatar.spec.ts`
4. **Тестируйте поведение, а не реализацию** - проверяйте что видит пользователь
5. **Группируйте связанные тесты** - используйте `test.describe()`
6. **Не бойтесь параметризации** - один цикл вместо 10 копипаст

## 🎉 Готово!

Теперь вы можете добавлять тесты для любых компонентов. Удачи! 🚀
