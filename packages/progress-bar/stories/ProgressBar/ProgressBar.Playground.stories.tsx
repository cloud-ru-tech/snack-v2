import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  args: {
    progress: 50,
    size: PROGRESS_BAR_SIZE.S,
    appearance: APPEARANCE.Primary,
    'data-test-id': 'progress-bar',
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Процент загрузки от 0 до 100',
    },
    size: {
      control: 'radio',
      options: Object.values(PROGRESS_BAR_SIZE),
      description: 'Размер индикатора: xs / s',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема индикатора',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('progressbar')).toBeVisible();
  },
};
