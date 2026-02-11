import type { Meta, StoryObj } from '@storybook/react';

import progressbarReadme from '../../README.md?raw';
import { APPEARANCE, ProgressBarPage, ProgressBarPageProps } from '../../src';

const meta: Meta<ProgressBarPageProps> = {
  title: 'Components/ProgressBar/ProgressBarPage',
  component: ProgressBarPage,
  parameters: {
    readme: { content: progressbarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: `
# ProgressBarPage

Глобальный индикатор загрузки страницы (фиксированный вверху экрана). Использует анимацию прогресса при включённом состоянии.

## Features

- Показ прогресса загрузки страницы
- Настраиваемая длительность анимации и инкремента
- Опциональный минимальный порог (0–1)
- Цветовая схема (appearance)

## Installation

\`\`\`bash
pnpm add @design-system/progress-bar
\`\`\`

## Quick Start

\`\`\`tsx
import { ProgressBarPage, APPEARANCE } from '@design-system/progress-bar';

function Layout() {
  const [loading, setLoading] = useState(true);
  return (
    <ProgressBarPage
      inProgress={loading}
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
    inProgress: true,
    animationDuration: 200,
    incrementDuration: 800,
    appearance: APPEARANCE.Primary,
  },
  argTypes: {
    inProgress: {
      control: 'boolean',
      description: 'Включен/выключен индикатор',
    },
    animationDuration: {
      control: { type: 'number', min: 0, step: 50 },
      description: 'Длительность анимации (мс)',
    },
    incrementDuration: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Время между шагами прогресса (мс)',
    },
    minimum: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Минимальное значение прогресс-бара от 0 до 1',
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
type Story = StoryObj<ProgressBarPageProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
