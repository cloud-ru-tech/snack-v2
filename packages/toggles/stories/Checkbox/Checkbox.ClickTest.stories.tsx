import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Checkbox } from '../../src';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: { onChange: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Click toggles on', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('Click toggles off', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};
