import { APPEARANCE, PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'fullscreen' },
  args: {
    progress: 50,
    size: PROGRESS_BAR_SIZE.S,
    appearance: APPEARANCE.Primary,
    'data-test-id': TEST_IDS.progressBar.root,
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
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Линейный индикатор прогресса.</DemoHint>
        <DemoActions block>
          <ProgressBar {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.progressBar.root)).toBeVisible();
  },
};
