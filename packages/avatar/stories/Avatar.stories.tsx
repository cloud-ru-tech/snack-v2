import type { Meta, StoryObj } from '@storybook/react';
import { APPEARANCE, Avatar, AvatarProps, SHAPE, SIZE } from '../src';

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
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Basic: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: `
Avatar с изображением. При ошибке загрузки автоматически отобразятся инициалы:

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

export const TwoSymbols: Story = {
  args: {
    name: 'John Doe',
    showTwoSymbols: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Отображение двух символов вместо одного:

\`\`\`tsx
<Avatar 
  name="John Doe"
  showTwoSymbols={true}
/>
// Отобразит "JD"
\`\`\`
        `,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="XS" size={SIZE.Xs} />
      <Avatar name="S" size={SIZE.S} />
      <Avatar name="M" size={SIZE.M} />
      <Avatar name="XL" size={SIZE.Xl} />
      <Avatar name="3XL" size={SIZE['3Xl']} />
      <Avatar name="6XL" size={SIZE['6Xl']} />
      <Avatar name="10XL" size={SIZE['10Xl']} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Все доступные размеры аватара:

\`\`\`tsx
import { Avatar, SIZE } from '@design-system/avatar';

// Extra Small (16px)
<Avatar name="User" size={SIZE.Xs} />

// Small (24px)
<Avatar name="User" size={SIZE.S} />

// Medium (32px) - default
<Avatar name="User" size={SIZE.M} />

// Extra Large (48px)
<Avatar name="User" size={SIZE.Xl} />

// 3XL (64px)
<Avatar name="User" size={SIZE['3Xl']} />

// 6XL (96px)
<Avatar name="User" size={SIZE['6Xl']} />

// 10XL (128px)
<Avatar name="User" size={SIZE['10Xl']} />
\`\`\`
        `,
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="Round" shape={SHAPE.Round} />
      <Avatar name="Square" shape={SHAPE.Square} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Две доступные формы аватара:

\`\`\`tsx
import { Avatar, SHAPE } from '@design-system/avatar';

// Круглый (для пользователей)
<Avatar name="John Doe" shape={SHAPE.Round} />

// Квадратный (для организаций/брендов)
<Avatar name="Company" shape={SHAPE.Square} />
\`\`\`
        `,
      },
    },
  },
};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="Neutral" appearance={APPEARANCE.Neutral} />
      <Avatar name="Primary" appearance={APPEARANCE.Primary} />
      <Avatar name="Red" appearance={APPEARANCE.Red} />
      <Avatar name="Orange" appearance={APPEARANCE.Orange} />
      <Avatar name="Yellow" appearance={APPEARANCE.Yellow} />
      <Avatar name="Green" appearance={APPEARANCE.Green} />
      <Avatar name="Blue" appearance={APPEARANCE.Blue} />
      <Avatar name="Violet" appearance={APPEARANCE.Violet} />
      <Avatar name="Pink" appearance={APPEARANCE.Pink} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Цветовые схемы для различных состояний или категорий:

\`\`\`tsx
import { Avatar, APPEARANCE } from '@design-system/avatar';

// Нейтральный (по умолчанию)
<Avatar name="User" appearance={APPEARANCE.Neutral} />

// Акцентный
<Avatar name="User" appearance={APPEARANCE.Primary} />

// Семантические цвета
<Avatar name="Error" appearance={APPEARANCE.Red} />
<Avatar name="Warning" appearance={APPEARANCE.Orange} />
<Avatar name="Info" appearance={APPEARANCE.Blue} />
<Avatar name="Success" appearance={APPEARANCE.Green} />

// Дополнительные цвета
<Avatar name="User" appearance={APPEARANCE.Yellow} />
<Avatar name="User" appearance={APPEARANCE.Violet} />
<Avatar name="User" appearance={APPEARANCE.Pink} />
\`\`\`
        `,
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ minWidth: 80, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <div
              key={appearance}
              style={{ display: 'flex', gap: 8, alignItems: 'center', flexDirection: 'column' }}
            >
              <Avatar name="JD" size={size} shape={SHAPE.Round} appearance={appearance} />
              <Avatar name="JD" size={size} shape={SHAPE.Square} appearance={appearance} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithLongName: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="John" />
      <Avatar name="John Doe" />
      <Avatar name="John Michael Doe" />
      <Avatar name="John Michael Doe" showTwoSymbols />
    </div>
  ),
};

export const ImageFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="John Doe" src="https://invalid-url.com/image.jpg" />
      <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
      <Avatar name="Bob Johnson" src="https://invalid-url.com/image.jpg" showTwoSymbols />
    </div>
  ),
};
