import type { Meta, StoryObj } from '@storybook/react';

import { LOADER_SIZE, Spinner, SpinnerProps } from '../../src';

const meta: Meta<SpinnerProps> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables',
    },
    docs: {
      description: {
        component: `
# Spinner Component

Circular loading indicator for the design system.

## Features

- Multiple sizes: 2XS, XS, S, M, L
- SVG-based, scalable
- Supports className and data-test-id

## Installation

\`\`\`bash
pnpm add @design-system/loader
\`\`\`

## Quick Start

\`\`\`tsx
import { Spinner, LOADER_SIZE } from '@design-system/loader';

function LoadingState() {
  return <Spinner size={LOADER_SIZE.M} />;
}
\`\`\`
        `,
      },
    },
  },
  args: {
    size: LOADER_SIZE.S,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(LOADER_SIZE),
      description: 'Размер спиннера',
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
type Story = StoryObj<SpinnerProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
