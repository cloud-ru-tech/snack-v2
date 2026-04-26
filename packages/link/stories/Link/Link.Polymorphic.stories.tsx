import { Link } from '@ds/link';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  args: { onClick: fn() },
  render: args => (
    <div className={styles.row}>
      <Link text='Anchor' href='#' data-test-id='link-anchor' />
      <Link as='button' type='button' text='Button' onClick={args.onClick} data-test-id='link-button' />
      <Link as='a' text='External' href='https://example.com' target='_blank' data-test-id='link-external' />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click polymorphic button', async () => {
      await userEvent.click(canvas.getByTestId('link-button'));
    });
    await step('onClick fires on as="button"', async () => {
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};
