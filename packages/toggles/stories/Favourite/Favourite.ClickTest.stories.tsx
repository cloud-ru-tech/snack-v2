import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Favourite } from '../../src';

const meta: Meta<typeof Favourite> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Favourite>;

export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: { onChange: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Click toggles on', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledWith(true);
    });
  },
};
