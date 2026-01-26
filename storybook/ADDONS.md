# Storybook Addons

Этот проект использует следующие аддоны для Storybook, которые расширяют функциональность и улучшают DX.

## Важно
Проект использует **Storybook 10.x**, который включает многие функции из предыдущих addon-essentials встроенными в ядро (controls, actions, viewport, backgrounds).

## Установленные аддоны

### 1. **@storybook/addon-docs**
Автоматическая генерация документации для компонентов.

**Возможности:**
- Автоматическое извлечение props из TypeScript
- Markdown документация
- DocsPage с интерактивной документацией

**Использование:**
```tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Описание компонента в Markdown',
      },
    },
  },
};
```

### 2. **@storybook/addon-designs**
Интеграция с дизайн-инструментами (Figma, Sketch, etc.).

**Использование с Figma:**
```tsx
export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=YOUR_NODE_ID',
    },
  },
};
```

**Поддерживаемые типы:**
- `figma` - Figma designs
- `figspec` - Figma spec (с API key)
- `sketch` - Sketch Cloud
- `image` - Простое изображение
- `link` - Внешняя ссылка
- `iframe` - Iframe embed
- `pdf` - PDF документ

**Пример с несколькими дизайнами:**
```tsx
export const Primary: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Desktop',
        url: 'https://www.figma.com/file/...',
      },
      {
        type: 'figma',
        name: 'Mobile',
        url: 'https://www.figma.com/file/...',
      },
    ],
  },
};
```

### 3. **Встроенные возможности Storybook 10.x**
В Storybook 10.x многие функции уже встроены в ядро и не требуют отдельных аддонов:

#### **Controls**
Динамическое изменение props компонентов.

**Использование:**
```tsx
export default {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};
```

#### **Actions**
Логирование событий (onClick, onChange и т.д.).

**Использование:**
```tsx
import { fn } from '@storybook/test';

export default {
  argTypes: {
    onClick: { action: 'clicked' },
    onChange: { action: 'changed' },
  },
  // Или используйте fn() для более гибкого контроля
  args: {
    onClick: fn(),
  },
};
```

#### **Viewport**
Тестирование различных размеров экрана.

Используйте иконку устройства в toolbar для переключения viewport.

#### **Backgrounds**
Изменение фона canvas.

Настроено в `.storybook/preview.tsx`:
```tsx
backgrounds: {
  default: 'light',
  values: [
    { name: 'light', value: '#ffffff' },
    { name: 'dark', value: '#1a1a1a' },
  ],
}
```

### 4. **@storybook/addon-links**
Навигация между stories.

**Использование:**
```tsx
import { linkTo } from '@storybook/addon-links';

export const Primary: Story = {
  render: () => (
    <button onClick={linkTo('Components/Button', 'Secondary')}>
      Go to Secondary Button
    </button>
  ),
};
```

### 5. **@storybook/addon-a11y**
Проверка доступности (accessibility) компонентов.

**Возможности:**
- Автоматическая проверка a11y правил
- Отчеты о нарушениях
- Интеграция с axe-core

**Настройка:**
```tsx
export default {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### 6. **@storybook/addon-vitest**
Интеграция с Vitest для тестирования stories.

**Использование:**
Stories можно использовать как тесты в Vitest.

## Просмотр исходного кода

### ⚠️ Важно: addon-storysource несовместим со Storybook 10.x

`@storybook/addon-storysource` не работает со Storybook 10.x (последняя версия для v8.x).

### ✅ Альтернативы:

#### 1. Встроенная Docs страница (рекомендуется)

Storybook 10.x автоматически показывает код в Docs:

1. Откройте любую story
2. Переключитесь на вкладку **"Docs"** (сверху)
3. Прокрутите вниз - там будет кнопка **"Show code"** под каждой story

#### 2. Добавить примеры кода в описание

```tsx
export const WithImage: Story = {
  args: {
    src: 'https://example.com/avatar.jpg',
    name: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: \`
Avatar с изображением:

\\\`\\\`\\\`tsx
<Avatar 
  name="John Doe"
  src="https://example.com/avatar.jpg"
/>
\\\`\\\`\\\`
        \`,
      },
    },
  },
};
```

#### 3. Ссылки на репозиторий

Добавьте ссылки на исходники в GitLab/GitHub в описании компонента.

📖 **[Подробнее об альтернативах](./SOURCE_CODE_ALTERNATIVES.md)**

## Быстрый старт

### Добавление Figma дизайна к story

1. Откройте ваш Figma файл
2. Выберите нужный frame/component
3. Скопируйте URL из адресной строки
4. Добавьте в story:

```tsx
export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'YOUR_FIGMA_URL',
    },
  },
};
```

### Использование Controls

1. Откройте любую story в Storybook
2. Панель Controls справа показывает все доступные props
3. Изменяйте значения в реальном времени
4. Просматривайте изменения в canvas

### Проверка accessibility

1. Откройте любую story
2. Перейдите на вкладку "Accessibility" в нижней панели
3. Просмотрите violations и passes
4. Кликните на violation для подробной информации

### Изменение фона (Backgrounds)

1. Найдите иконку сетки в toolbar (справа сверху)
2. Выберите нужный фон (light/dark/gray)
3. Фон применится к canvas

### Тестирование разных viewport

1. Найдите иконку устройства в toolbar
2. Выберите нужный размер экрана (mobile/tablet/desktop)
3. Canvas изменит размер соответственно

## Дополнительные ресурсы

- [Storybook Documentation](https://storybook.js.org/docs)
- [addon-designs](https://github.com/storybookjs/addon-designs)
- [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode)
- [addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)
