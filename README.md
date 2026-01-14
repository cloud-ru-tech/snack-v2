# Design System - Storybook

React компонентная библиотека с современной документацией на базе Storybook.

## Возможности

- 🎨 **Design Tokens** - интеграция с Figma Variables
- 📚 **Storybook** - интерактивная документация компонентов
- ♿ **Accessibility** - встроенная проверка a11y с axe-core
- 🎨 **Figma Integration** - просмотр дизайнов рядом с компонентами
- 🧪 **Vitest** - тестирование компонентов
- 📦 **Monorepo** - организация пакетов с Lerna и pnpm
- 🚀 **CI/CD** - автоматическая сборка и деплой на GitLab Pages

## Быстрый старт

### Установка зависимостей

```bash
pnpm install
```

### Запуск Storybook

```bash
pnpm storybook
```

Storybook будет доступен по адресу: http://localhost:6006/

### Разработка компонентов

1. Создайте новый компонент в `packages/your-component/src/`
2. Добавьте story в `packages/your-component/YourComponent.stories.tsx`
3. Запустите Storybook для просмотра компонента

### Сборка

```bash
# Сборка всех пакетов
pnpm build:packages

# Сборка Storybook
pnpm build:storybook

# Сборка документации (по умолчанию для /snack-v2/)
pnpm build:docs

# Сборка документации для корня домена
pnpm build:docs:root

# Полная сборка (пакеты + docs + storybook)
pnpm build:all

# Сборка с кастомным базовым путем
BASE_PATH=/custom-path/ pnpm build:docs
```

## Storybook аддоны

Проект использует следующие аддоны для расширения возможностей Storybook:

### Установленные аддоны

- **[@storybook/addon-docs](https://storybook.js.org/docs/writing-docs/introduction)** - автоматическая документация
- **[@storybook/addon-designs](https://github.com/storybookjs/addon-designs)** - интеграция с Figma
- **[@storybook/addon-links](https://storybook.js.org/addons/@storybook/addon-links)** - навигация между stories
- **[@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)** - проверка accessibility
- **[@storybook/addon-vitest](https://storybook.js.org/addons/@storybook/addon-vitest)** - интеграция с Vitest
- **[@chromatic-com/storybook](https://www.chromatic.com/)** - visual regression testing

### Встроенные возможности (Storybook 10.x)

- **Controls** - динамическое изменение props
- **Actions** - логирование событий
- **Viewport** - тестирование разных размеров экрана
- **Backgrounds** - изменение фона canvas

📖 **[Подробная документация по аддонам](.storybook/ADDONS.md)**

## Структура проекта

```
.
├── .storybook/          # Конфигурация Storybook
│   ├── main.ts          # Основная конфигурация
│   ├── preview.tsx      # Глобальные декораторы
│   ├── ADDONS.md        # Документация по аддонам
│   └── README.md        # Документация Storybook
├── packages/            # React компоненты
│   ├── avatar/          # Компонент Avatar
│   ├── button/          # Компонент Button (coming soon)
│   └── link/            # Компонент Link (coming soon)
├── stories/             # Демонстрационные stories
│   └── AddonsDemo.stories.tsx
├── apps/                # Приложения (Astro docs site)
└── types/               # Глобальные TypeScript типы
```

## Создание нового компонента

```bash
# Создайте новую папку в packages/
mkdir -p packages/my-component/src

# Создайте компонент
touch packages/my-component/src/index.tsx
touch packages/my-component/src/styles.module.scss

# Создайте story
touch packages/my-component/MyComponent.stories.tsx

# Добавьте package.json
touch packages/my-component/package.json
```

### Пример story с Figma интеграцией

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './src';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    // Добавьте ссылку на Figma дизайн
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

## Тестирование

```bash
# Запуск всех тестов
pnpm test

# Запуск тестов с coverage
pnpm test:coverage
```

## CI/CD

Проект настроен для автоматического деплоя на GitLab Pages:

- **Storybook**: доступен по адресу `/storybook/`
- **Docs**: доступен по адресу `/docs/` (coming soon)

## Скрипты

```bash
# Разработка
pnpm storybook          # Запуск Storybook
pnpm dev                # Запуск Astro docs site

# Сборка
pnpm build:packages     # Сборка пакетов
pnpm build:storybook    # Сборка Storybook
pnpm build:all          # Полная сборка

# Тестирование
pnpm test               # Запуск тестов
pnpm lint               # Проверка кода

# Зависимости
pnpm deps               # Установка зависимостей
```

## Технологии

- **React 19** - UI библиотека
- **TypeScript 5.9** - типизация
- **Storybook 10.1** - документация компонентов
- **Vitest** - тестирование
- **SCSS Modules** - стилизация
- **Lerna** - управление monorepo
- **pnpm** - package manager
- **Figma Variables** - дизайн токены

## Документация

- [Документация по Storybook](.storybook/README.md)
- [Документация по аддонам](.storybook/ADDONS.md)
- [Демонстрация аддонов](./stories/AddonsDemo.stories.tsx)
- [Деплой инструкция](./DEPLOY.md)

## Ресурсы

- [Storybook Documentation](https://storybook.js.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [pnpm Documentation](https://pnpm.io/)

## Лицензия

MIT
