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

export const KeyboardTest: Story = {
  tags: ['test', 'dev'],
  args: { onChange: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Tab focuses native input', async () => {
      await userEvent.tab();
      expect(input).toHaveFocus();
    });

    await step('Space toggles', async () => {
      await userEvent.keyboard('[Space]');
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};
