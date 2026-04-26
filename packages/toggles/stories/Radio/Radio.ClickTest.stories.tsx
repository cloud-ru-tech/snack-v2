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

export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: { onChange: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('radio');

    await step('Click selects radio', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledWith(true);
    });
  },
};
