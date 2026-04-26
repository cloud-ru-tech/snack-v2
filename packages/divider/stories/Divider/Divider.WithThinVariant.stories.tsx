import { Divider, ORIENTATION, VARIANT } from '@ds/divider';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const WithThinVariant: Story = {
  tags: ['dev'],
  args: {
    variant: VARIANT.Thin,
    orientation: ORIENTATION.Horizontal,
    'data-test-id': 'divider',
  },
  render: args => (
    <div className={styles.horizontalWrapper}>
      <Divider {...args} />
    </div>
  ),
};
