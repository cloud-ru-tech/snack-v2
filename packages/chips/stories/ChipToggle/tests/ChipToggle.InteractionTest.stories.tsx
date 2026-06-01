import { ChipToggle, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof ChipToggle> = {
  title: 'Components/Chips/ChipToggle/Tests/Interaction',
  component: ChipToggle,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Chip',
    size: SIZE.S,
    checked: false,
    onChange: fn(),
    'data-test-id': TEST_IDS.chipToggle.root,
  },
};

export default meta;
type Story = StoryObj<typeof ChipToggle>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик и клавиатура вызывают onChange; disabled не пропускает события.</DemoHint>
        <DemoActions align='center'>
          <ChipToggle {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.chipToggle.root);

    await step('click: calls onChange once', async () => {
      await userEvent.click(root);
      expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Space calls onChange again', async () => {
      root.focus();
      await userEvent.keyboard(' ');
      expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};
