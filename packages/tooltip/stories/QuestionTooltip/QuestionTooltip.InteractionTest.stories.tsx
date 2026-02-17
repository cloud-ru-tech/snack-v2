import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { QuestionTooltip, type QuestionTooltipProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<QuestionTooltipProps> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
};

export default meta;
type Story = StoryObj<QuestionTooltipProps>;

export const InteractionTest: Story = {
  tags: ['test', '!dev'],
  args: {
    tip: 'Test tooltip content',
    triggerLabel: 'Hover me',
  },
  render: args => (
    <div className={styles.pageWrapper}>
      <QuestionTooltip {...args} />
    </div>
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
