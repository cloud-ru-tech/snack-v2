import { Sun, SUN_SIZE } from '@ds/loader';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Sun> = {
  title: 'Components/Loader/Sun',
  component: Sun,
  parameters: { layout: 'fullscreen' },
  args: { size: SUN_SIZE.M, 'data-test-id': TEST_IDS.sun.root },
  argTypes: {
    size: { control: 'radio', options: Object.values(SUN_SIZE), description: 'Размер' },
  },
};

export default meta;
type Story = StoryObj<typeof Sun>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Полноэкранный лоадер с двумя размерами.</DemoHint>
        <DemoActions align='center'>
          <Sun {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.sun.root)).toBeVisible();
  },
};
