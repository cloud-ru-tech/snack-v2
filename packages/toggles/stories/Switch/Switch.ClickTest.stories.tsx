import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Switch } from '../../src';

const meta: Meta<typeof Switch> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

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

    await step('Click toggles off', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenLastCalledWith(false);
    });
  },
};
