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

export const KeyboardTest: Story = {
  tags: ['test', 'dev'],
  args: { onChange: fn() },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Tab focuses input', async () => {
      await userEvent.tab();
      expect(input).toHaveFocus();
    });

    await step('Space toggles', async () => {
      await userEvent.keyboard('[Space]');
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};
