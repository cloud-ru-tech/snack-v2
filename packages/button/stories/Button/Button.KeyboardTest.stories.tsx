import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const KeyboardTest: Story = {
  tags: ['test', 'dev'],
  args: {
    label: 'Focusable',
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByRole('button');

    await step('Tab focuses button', async () => {
      await userEvent.tab();
      await expect(button).toHaveFocus();
    });

    await step('Enter triggers click', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Space triggers click', async () => {
      await userEvent.keyboard(' ');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};
