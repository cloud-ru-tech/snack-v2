# Альтернативы для просмотра исходного кода в Storybook 10.x

## Проблема
`@storybook/addon-storysource` несовместим со Storybook 10.x (последняя версия для Storybook 8.x).

## ✅ Решения

### 1. Использовать Docs страницу (встроенная функция)

Storybook 10.x автоматически показывает исходный код в Docs странице:

1. Откройте любую story в Storybook
2. Переключитесь на вкладку **"Docs"** (сверху, рядом с "Canvas")
3. Прокрутите вниз - там будет секция **"Show code"** под каждой story

**Пример:**
```tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
```

В Docs странице автоматически отобразится код story.

### 2. Добавить исходный код в MDX документацию

Создайте `.mdx` файл с исходным кодом:

```mdx
import { Meta, Story, Source } from '@storybook/blocks';
import * as AvatarStories from './Avatar.stories';

<Meta of={AvatarStories} />

# Avatar Component

## Usage

<Source
  language="tsx"
  code={`
import { Avatar, SIZE, SHAPE } from '@design-system/avatar';

<Avatar 
  name="John Doe" 
  size={SIZE.M}
  shape={SHAPE.Round}
/>
  `}
/>

<Story of={AvatarStories.Primary} />
```

### 3. Использовать GitHub/GitLab ссылки

Добавьте ссылку на исходный код в репозитории:

```tsx
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    componentSubtitle: 'Avatar component for user profiles',
    docs: {
      source: {
        type: 'code',
      },
    },
    // Добавить ссылку на GitHub
    githubUrl: 'https://github.com/your-org/repo/blob/main/packages/avatar/src/Avatar.tsx',
  },
};
```

### 4. Inline код в описании story

Используйте описание story для добавления примеров кода:

```tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: `
Базовый пример использования:

\`\`\`tsx
import { Avatar, SIZE } from '@design-system/avatar';

function App() {
  return <Avatar name="John Doe" size={SIZE.M} />;
}
\`\`\`
        `,
      },
    },
  },
};
```

### 5. Custom документация в отдельной story

Создайте специальную story для документации:

```tsx
export const Documentation: Story = {
  render: () => null,
  parameters: {
    docs: {
      description: {
        story: `
## Installation

\`\`\`bash
pnpm add @design-system/avatar
\`\`\`

## Basic Usage

\`\`\`tsx
import { Avatar, SIZE, SHAPE } from '@design-system/avatar';

// Simple avatar with initials
<Avatar name="John Doe" />

// Avatar with image
<Avatar 
  name="John Doe"
  src="https://example.com/avatar.jpg"
  size={SIZE.L}
/>

// Square avatar
<Avatar 
  name="Company Name"
  shape={SHAPE.Square}
/>
\`\`\`

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | - | User name for initials |
| src | string | - | Image URL |
| size | SIZE | SIZE.M | Avatar size |
| shape | SHAPE | SHAPE.Round | Avatar shape |
        `,
      },
    },
  },
};
```

## 🎯 Рекомендуемый подход

**Комбинация методов:**

1. **Для примеров использования** → используйте встроенную Docs страницу
2. **Для детальной документации** → создайте `.mdx` файлы
3. **Для ссылок на исходники** → добавьте ссылки на GitLab/GitHub

## 📝 Пример полной документации

```tsx
// Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, SIZE, SHAPE, APPEARANCE } from './src';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/...',
    },
    docs: {
      description: {
        component: `
# Avatar Component

Компонент для отображения аватара пользователя или организации.

## Features

- ✅ Автоматическая генерация инициалов из имени
- ✅ Поддержка изображений с fallback
- ✅ Несколько размеров и форм
- ✅ Цветовые схемы
- ✅ Accessibility ready

## Installation

\`\`\`bash
pnpm add @design-system/avatar
\`\`\`

## Quick Start

\`\`\`tsx
import { Avatar, SIZE } from '@design-system/avatar';

function UserProfile() {
  return (
    <Avatar 
      name="John Doe"
      size={SIZE.M}
    />
  );
}
\`\`\`

## Source Code

- [Avatar.tsx](https://git.sbercloud.tech/your-org/repo/-/blob/main/packages/avatar/src/Avatar.tsx)
- [styles.module.scss](https://git.sbercloud.tech/your-org/repo/-/blob/main/packages/avatar/src/styles.module.scss)
        `,
      },
    },
  },
  argTypes: {
    name: {
      description: 'Имя пользователя для генерации инициалов',
      table: {
        type: { summary: 'string' },
      },
    },
    // ... rest of argTypes
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Stories с примерами кода в описаниях
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: `
Avatar с изображением. При ошибке загрузки отобразятся инициалы:

\`\`\`tsx
<Avatar 
  name="John Doe"
  src="https://i.pravatar.cc/150?img=1"
/>
\`\`\`
        `,
      },
    },
  },
};
```

## 🔗 Полезные ссылки

- [Storybook Docs Configuration](https://storybook.js.org/docs/writing-docs/docs-page)
- [MDX Documentation](https://storybook.js.org/docs/writing-docs/mdx)
- [Source Code Addon (v8)](https://storybook.js.org/addons/@storybook/addon-storysource)

## ⚠️ Важно

В Storybook 10.x нет прямой замены для `addon-storysource`, но встроенная функциональность Docs страницы покрывает большинство use cases. Если вам критически нужен этот функционал, рассмотрите возможность остаться на Storybook 8.x или дождитесь выхода совместимой версии аддона.
