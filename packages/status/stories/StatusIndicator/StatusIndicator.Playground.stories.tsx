import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { APPEARANCE, STATUS_INDICATOR_SIZE, StatusIndicator, StatusIndicatorProps } from '../../src';
import { TEST_IDS } from '../testIds';

const meta: Meta<StatusIndicatorProps> = {
  title: 'Components/Status/StatusIndicator',
  component: StatusIndicator,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Точечный индикатор статуса без подписи, варианты по size и appearance.</DemoHint>
        <DemoActions align='center'>
          <StatusIndicator {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    size: STATUS_INDICATOR_SIZE.S,
    appearance: APPEARANCE.Neutral,
    'data-test-id': TEST_IDS.statusIndicator.root,
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
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StatusIndicatorProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.statusIndicator.root)).toBeVisible();
  },
};
