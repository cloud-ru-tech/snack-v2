import { Kbd } from '@ds/uikit-product-kbd';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Kbd> = {
  title: 'Uikit Product/Kbd/Kbd',
  component: Kbd,
  parameters: { layout: 'fullscreen' },
  args: {
    children: 'K',
    'data-test-id': TEST_IDS.kbd.root,
  },
  argTypes: {
    children: { control: 'text' },
    innerRef: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Клавиша-подсказка: текст, символ или предопределённая клавиша через keyName.</DemoHint>
        <DemoActions align='center'>
          <Kbd {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.kbd.root)).toBeVisible();
  },
};
