import { SkeletonText } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';

import styles from '../styles.module.scss';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const Lines: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.linesContainer}>
      <SkeletonText loading lines={1} variant='body' size='m' />
      <SkeletonText loading lines={3} variant='body' size='m' />
      <SkeletonText loading lines={5} variant='body' size='m' />
    </div>
  ),
};
