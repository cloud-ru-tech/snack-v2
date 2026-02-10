import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { Tooltip, TooltipProps } from '../../src';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const InteractionTest: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <Tooltip content='Test tooltip content'>
      <button type='button'>Hover me</button>
    </Tooltip>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Tooltip is not visible initially', async () => {
      expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    await step('User hovers trigger, tooltip appears', async () => {
      const trigger = canvas.getByRole('button', { name: 'Hover me' });
      await userEvent.hover(trigger);
    });

    await step('Tooltip is visible after hover', async () => {
      const tooltip = await canvas.findByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Test tooltip content');
    });

    await step('User unhovers, tooltip hides', async () => {
      await userEvent.unhover(canvas.getByRole('button', { name: 'Hover me' }));
    });

    await step('Tooltip is hidden after unhover', async () => {
      await waitFor(() => {
        expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  },
};
