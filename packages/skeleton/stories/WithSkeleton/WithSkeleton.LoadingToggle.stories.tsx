import { SkeletonText, WithSkeleton } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';

import styles from '../styles.module.scss';

const meta: Meta<typeof WithSkeleton> = {
  title: 'Components/Skeleton/WithSkeleton',
  component: WithSkeleton,
};

export default meta;
type Story = StoryObj<typeof WithSkeleton>;

export const LoadingToggle: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.linesContainer}>
      <div>
        <div className={styles.linesLabel}>loading=true</div>
        <WithSkeleton loading skeleton={<SkeletonText loading lines={2} variant='body' size='m' />}>
          <p>Реальный контент</p>
        </WithSkeleton>
      </div>
      <div>
        <div className={styles.linesLabel}>loading=false</div>
        <WithSkeleton loading={false} skeleton={<SkeletonText loading lines={2} variant='body' size='m' />}>
          <p>Реальный контент</p>
        </WithSkeleton>
      </div>
    </div>
  ),
};
