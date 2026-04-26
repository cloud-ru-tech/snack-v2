import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Radio } from '../../src';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const KeyboardTest: Story = {
  tags: ['test', 'dev'],
  args: { onChange: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('radio');

    await step('Tab focuses native input', async () => {
      await userEvent.tab();
      expect(input).toHaveFocus();
    });

    await step('Space selects', async () => {
      await userEvent.keyboard('[Space]');
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};
