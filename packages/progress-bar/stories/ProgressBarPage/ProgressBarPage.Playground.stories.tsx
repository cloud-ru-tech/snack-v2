import { APPEARANCE, ProgressBarPage } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof ProgressBarPage> = {
  title: 'Components/ProgressBar/ProgressBarPage',
  component: ProgressBarPage,
  args: {
    inProgress: true,
    animationDuration: 200,
    incrementDuration: 800,
    appearance: APPEARANCE.Primary,
    'data-test-id': 'progress-bar-page',
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
      description: 'Цветовая схема индикатора',
    },
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBarPage>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('progressbar')).toBeVisible();
  },
};
