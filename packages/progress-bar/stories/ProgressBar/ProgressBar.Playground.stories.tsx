import type { Meta, StoryObj } from '@storybook/react';

import progressbarReadme from '../../README.md?raw';
import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar, ProgressBarProps } from '../../src';

const meta: Meta<ProgressBarProps> = {
  title: 'Components/ProgressBar/ProgressBar',
  component: ProgressBar,
  parameters: {
    readme: { content: progressbarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: `
# ProgressBar

Индикатор загрузки для отображения прогресса операции (0–100%).

## Features

- Поддержка процентов от 0 до 100
- Два размера (XS, S)
- Несколько цветовых схем (appearance)
- Accessibility ready

## Installation

\`\`\`bash
pnpm add @design-system/progress-bar
\`\`\`

## Quick Start

\`\`\`tsx
import { ProgressBar, PROGRESS_BAR_SIZE, APPEARANCE } from '@design-system/progress-bar';

function Example() {
  return (
    <ProgressBar
      progress={50}
      size={PROGRESS_BAR_SIZE.S}
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
    progress: 50,
    size: PROGRESS_BAR_SIZE.S,
    appearance: APPEARANCE.Primary,
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Процент загрузки от 0 до 100',
    },
    size: {
      control: 'select',
      options: Object.values(PROGRESS_BAR_SIZE),
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
type Story = StoryObj<ProgressBarProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
