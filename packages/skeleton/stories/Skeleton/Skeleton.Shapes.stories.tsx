import { Skeleton } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';

import styles from '../styles.module.scss';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Shapes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.linesContainer}>
      <Skeleton loading width={280} height={24} borderRadius={4} />
      <Skeleton loading width={280} height={32} borderRadius={8} />
      <Skeleton loading width={56} height={56} borderRadius='50%' />
    </div>
  ),
};
