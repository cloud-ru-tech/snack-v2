import type { Meta, StoryObj } from '@storybook/react';

import statusReadme from '../../README.md?raw';
import { APPEARANCE, STATUS_INDICATOR_SIZE, StatusIndicator, StatusIndicatorProps } from '../../src';

const meta: Meta<StatusIndicatorProps> = {
  title: 'Components/Status/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    readme: { content: statusReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: `
# StatusIndicator

Индикатор статуса (точка) для отображения состояния.

## Features

- Несколько размеров (XXS, XS, S, M, L)
- Несколько цветовых схем (appearance)
- Accessibility ready

## Installation

\`\`\`bash
pnpm add @design-system/status
\`\`\`

## Quick Start

\`\`\`tsx
import { StatusIndicator, STATUS_INDICATOR_SIZE, APPEARANCE } from '@design-system/status';

function Example() {
  return (
    <StatusIndicator
      size={STATUS_INDICATOR_SIZE.M}
      appearance={APPEARANCE.Primary}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    size: STATUS_INDICATOR_SIZE.S,
    appearance: APPEARANCE.Primary,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(STATUS_INDICATOR_SIZE),
      description: 'Размер индикатора',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (цветовая схема)',
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
type Story = StoryObj<StatusIndicatorProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
