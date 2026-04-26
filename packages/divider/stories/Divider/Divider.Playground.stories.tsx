import { Divider, ORIENTATION, VARIANT } from '@ds/divider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  args: {
    variant: VARIANT.Regular,
    orientation: ORIENTATION.Horizontal,
    className: '',
    'data-test-id': 'divider',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Толщина линии (regular: 1px, thin: 0.5px)',
    },
    orientation: {
      control: 'radio',
      options: Object.values(ORIENTATION),
      description: 'Ориентация разделителя',
    },
    className: { control: 'text', table: { category: 'Testing' } },
    'data-test-id': { control: 'text', table: { category: 'Testing' } },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args =>
    args.orientation === ORIENTATION.Vertical ? (
      <div className={styles.verticalRow}>
        <span className={styles.verticalRowLabel}>Left</span>
        <div className={styles.verticalRowDividerCell}>
          <Divider {...args} />
        </div>
        <span className={styles.verticalRowLabel}>Right</span>
      </div>
    ) : (
      <div className={styles.horizontalWrapper}>
        <Divider {...args} />
      </div>
    ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('separator')).toBeVisible();
  },
};
