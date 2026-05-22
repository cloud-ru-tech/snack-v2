import { APPEARANCE, ProgressBarPage } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ProgressBarPage> = {
  title: 'Components/ProgressBar/ProgressBarPage',
  component: ProgressBarPage,
  parameters: { layout: 'fullscreen' },
  args: {
    inProgress: true,
    animationDuration: 200,
    incrementDuration: 800,
    appearance: APPEARANCE.Primary,
    'data-test-id': TEST_IDS.progressBarPage.root,
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
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          ProgressBarPage рендерится поверх viewport-а (fixed top), не внутри demo-панели — узкая полоска видна по
          верхнему краю экрана.
        </DemoHint>
        <DemoActions block>
          <ProgressBarPage {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.progressBarPage.root)).toBeVisible();
  },
};
