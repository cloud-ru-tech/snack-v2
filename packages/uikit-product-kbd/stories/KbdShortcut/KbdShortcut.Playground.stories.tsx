import { KbdShortcut } from '@ds/uikit-product-kbd';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof KbdShortcut> = {
  title: 'Uikit Product/Kbd/KbdShortcut',
  component: KbdShortcut,
  parameters: { layout: 'fullscreen' },
  args: {
    keys: ['mod', 'K'],
    'data-test-id': TEST_IDS.kbdShortcut.root,
  },
  argTypes: {
    innerRef: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof KbdShortcut>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Сочетание клавиш: keyName из keys зависит от ОС, остальные клавиши выводятся текстом.</DemoHint>
        <DemoActions align='center'>
          <KbdShortcut {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.kbdShortcut.root)).toBeVisible();
  },
};
