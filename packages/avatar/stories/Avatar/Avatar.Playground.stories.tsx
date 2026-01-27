import type { Meta, StoryObj } from '@storybook/react';

import { APPEARANCE, Avatar, AvatarProps, SHAPE, SIZE } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=4672-337&m=dev',
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
- ✅ Цветовые схемы для различных состояний
- ✅ Accessibility ready

## Installation

\`\`\`bash
pnpm add @design-system/avatar
\`\`\`

## Quick Start

\`\`\`tsx
import { Avatar, SIZE, SHAPE, APPEARANCE } from '@design-system/avatar';

function UserProfile() {
  return (
    <Avatar 
      name="John Doe"
      size={SIZE.M}
      shape={SHAPE.Round}
    />
  );
}
\`\`\`

## Source Code

- [GitLab Repository](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/variables/storybook/-/tree/main/packages/avatar)
        `,
      },
    },
  },
  args: {
    name: 'John Doe',
    size: SIZE.S,
    shape: SHAPE.Round,
    appearance: APPEARANCE.Neutral,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Имя пользователя для генерации аббревиатуры',
    },
    src: {
      control: 'text',
      description: 'URL изображения аватара',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер аватара',
    },
    shape: {
      control: 'radio',
      options: Object.values(SHAPE),
      description: 'Форма аватара',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    showTwoSymbols: {
      control: 'boolean',
      description: 'Отображать два символа вместо одного',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
