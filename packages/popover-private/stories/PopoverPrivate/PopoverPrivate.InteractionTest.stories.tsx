import { PLACEMENT, PopoverPrivate, type PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

const PopoverContent = () => (
  <div data-test-id='popover-content' className={styles.popoverContent}>
    Popover content
  </div>
);

export const InteractionTest: Story = {
  tags: ['test', '!dev'],
  args: {
    trigger: TRIGGER.Click,
    placement: PLACEMENT.Top,
    outsideClick: true,
    closeOnEscapeKey: true,
    arrowElementClassName: styles.popoverArrowElement,
    arrowContainerClassName: styles.popoverArrowContainer,
  },
  render: (args: PopoverPrivateProps) => (
    <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
      <button type='button'>Open popover</button>
    </PopoverPrivate>
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('User opens popover', async () => {
      const button = canvas.getByRole('button', { name: 'Open popover' });
      await userEvent.click(button);
    });

    await step('Popover content is visible', async () => {
      const content = canvas.getByTestId('popover-content');
      expect(content).toBeInTheDocument();
    });

    await step('User closes popover with Escape', async () => {
      await userEvent.keyboard('{Escape}');
    });

    await step('Popover is hidden', async () => {
      expect(canvas.queryByTestId('popover-content')).not.toBeInTheDocument();
    });
  },
};
