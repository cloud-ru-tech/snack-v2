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

export const ClickTest: Story = {
  tags: ['test', 'dev'],
  args: {
    label: 'Click me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('Click button once', async () => {
      await userEvent.click(button);
    });

    await step('onClick fired exactly once', async () => {
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Click again — fires twice total', async () => {
      await userEvent.click(button);
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};
