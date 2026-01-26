# Storybook Configuration

## Обзор

Проект использует **Storybook 10.1.4** для разработки и документирования React компонентов.

## Установленные аддоны

### Production-ready аддоны

1. **[@storybook/addon-docs](https://storybook.js.org/docs/writing-docs/introduction)** 
   - Автоматическая генерация документации из TypeScript types
   - Markdown документация
   - DocsPage с интерактивной документацией

2. **[@storybook/addon-designs](https://github.com/storybookjs/addon-designs)**
   - Интеграция с Figma, Sketch и другими дизайн-инструментами
   - Просмотр дизайнов рядом с компонентами
   - Поддержка нескольких дизайнов на одну story

3. **[@storybook/addon-links](https://storybook.js.org/addons/@storybook/addon-links)**
   - Навигация между stories
   - Создание интерактивных ссылок между компонентами

4. **[@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)**
   - Проверка доступности (accessibility) компонентов
   - Интеграция с axe-core
   - Автоматические отчеты о нарушениях a11y правил

5. **[@storybook/addon-vitest](https://storybook.js.org/addons/@storybook/addon-vitest)**
   - Интеграция с Vitest
   - Тестирование stories как unit-тестов

6. **[@chromatic-com/storybook](https://www.chromatic.com/)**
   - Интеграция с Chromatic для visual regression testing

### Встроенные возможности Storybook 10.x

Следующие возможности встроены в Storybook 10.x и не требуют отдельных аддонов:

- **Controls** - Динамическое изменение props компонентов
- **Actions** - Логирование событий (onClick, onChange и т.д.)
- **Viewport** - Тестирование различных размеров экрана
- **Backgrounds** - Изменение фона canvas
- **Measure** - Измерение размеров элементов
- **Outline** - Показ границ элементов

## Быстрый старт

### Запуск Storybook

```bash
pnpm storybook
```

Storybook будет доступен по адресу: http://localhost:6006/

### Создание новой story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    // Интеграция с Figma
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_ID/...',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
```

### Добавление Figma дизайна

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

### Несколько дизайнов

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

## Структура проекта

```
.storybook/
├── main.ts          # Основная конфигурация Storybook
├── preview.tsx      # Глобальные декораторы и параметры
├── global.scss      # Глобальные стили
├── ADDONS.md        # Подробная документация по аддонам
└── README.md        # Этот файл

stories/
└── AddonsDemo.stories.tsx  # Демонстрация возможностей аддонов

packages/
└── */
    └── *.stories.tsx        # Stories для каждого компонента
```

## Полезные ссылки

- [Документация Storybook](https://storybook.js.org/docs)
- [Подробная документация по аддонам](./ADDONS.md)
- [Демонстрационная story](../stories/AddonsDemo.stories.tsx)

## Известные проблемы

### Версии аддонов

Некоторые популярные аддоны еще не обновлены до Storybook 10.x:
- `@storybook/addon-essentials` - последняя версия 8.6.14
- `@storybook/addon-storysource` - последняя версия 8.6.14
- `storybook-dark-mode` - не совместим с версией 10.x

Эти аддоны не установлены, так как их функциональность уже встроена в Storybook 10.x или будут добавлены в будущих обновлениях.

## Обновление Storybook

Для обновления Storybook до последней версии:

```bash
npx storybook@latest upgrade
```

## Поддержка

Если у вас возникли вопросы или проблемы, смотрите:
- [ADDONS.md](./ADDONS.md) - подробная документация по аддонам
- [Официальная документация Storybook](https://storybook.js.org/docs)
- [GitHub Issues](https://github.com/storybookjs/storybook/issues)
