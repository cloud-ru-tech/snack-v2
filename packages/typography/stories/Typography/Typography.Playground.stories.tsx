import type { Meta, StoryObj } from '@storybook/react';

import typographyReadme from '../../README.md?raw';
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_WEIGHT,
  SIZE,
  Typography,
  TypographyProps,
  VARIANT,
  WEIGHT,
} from '../../src';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    readme: { content: typographyReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: `
# Typography Component

Компонент типографики, использующий стили из \`@sbercloud/figma-variables\`. Поддерживает различные варианты, размеры и начертания шрифтов.

## Features

- **Варианты типографики**: display, headline, title, label, body
- **Размеры**: s (small), m (medium), l (large)
- **Начертания**: regular, thin, mono
- **Семантические HTML теги**: автоматический выбор тега на основе варианта
- **Стили из Figma Variables**: все стили берутся из \`@sbercloud/figma-variables\`

## Installation

\`\`\`bash
pnpm add @design-system/typography
\`\`\`

## Quick Start

\`\`\`tsx
import { Typography, VARIANT, SIZE } from '@design-system/typography';

function Example() {
  return (
    <>
      <Typography variant={VARIANT.headline} size={SIZE.l}>
        Заголовок
      </Typography>
      <Typography variant={VARIANT.body} size={SIZE.m}>
        Основной текст
      </Typography>
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    children: 'Typography text',
    variant: DEFAULT_VARIANT,
    size: DEFAULT_SIZE,
    weight: DEFAULT_WEIGHT,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст для отображения',
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANT),
      description: 'Вариант типографики',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер типографики',
    },
    weight: {
      control: 'select',
      options: Object.values(WEIGHT),
      description: 'Начертание шрифта',
    },
    as: {
      control: 'text',
      description: 'HTML тег для рендеринга (по умолчанию выбирается автоматически)',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
  },
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
