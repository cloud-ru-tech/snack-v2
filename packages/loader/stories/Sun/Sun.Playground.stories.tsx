import type { Meta, StoryObj } from '@storybook/react';

import loaderReadme from '../../README.md?raw';
import { Sun, SUN_SIZE, SunProps } from '../../src';

const meta: Meta<SunProps> = {
  title: 'Components/Loader/Sun',
  component: Sun,
  parameters: {
    readme: { content: loaderReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables',
    },
    docs: {
      description: {
        component: `
# Sun Component

Sunburst-style loading indicator for the design system.

## Features

- Multiple sizes: XS, S, M, L
- SVG-based, scalable
- Supports className and data-test-id

## Installation

\`\`\`bash
pnpm add @design-system/loader
\`\`\`

## Quick Start

\`\`\`tsx
import { Sun, SUN_SIZE } from '@design-system/loader';

function LoadingState() {
  return <Sun size={SUN_SIZE.M} />;
}
\`\`\`
        `,
      },
    },
  },
  args: {
    size: SUN_SIZE.S,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SUN_SIZE),
      description: 'Размер индикатора',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
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
type Story = StoryObj<SunProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
