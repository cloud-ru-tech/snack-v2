import { Divider, ORIENTATION, VARIANT } from '@ds/divider';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';
import { DIVIDER_TEST_ID } from './testIds';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const WithVerticalOrientation: Story = {
  tags: ['dev'],
  args: {
    orientation: ORIENTATION.Vertical,
    variant: VARIANT.Regular,
    'data-test-id': DIVIDER_TEST_ID,
  },
  render: args => (
    <div className={styles.verticalRowCompact}>
      <span className={styles.verticalRowCompactLabel}>Left</span>
      <div className={styles.verticalRowDividerCell}>
        <Divider {...args} />
      </div>
      <span className={styles.verticalRowCompactLabel}>Right</span>
    </div>
  ),
};
