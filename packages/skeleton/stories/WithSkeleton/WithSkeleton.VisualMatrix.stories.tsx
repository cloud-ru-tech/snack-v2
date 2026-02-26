import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { StoryTable } from '#storybook/components';

import { Skeleton, SkeletonText, WithSkeleton } from '../../src';

type WithSkeletonProps = ComponentProps<typeof WithSkeleton>;

const meta: Meta<WithSkeletonProps> = {
  title: 'Components/Skeleton/WithSkeleton',
  component: WithSkeleton,
};

export default meta;
type Story = StoryObj<WithSkeletonProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Loading × Skeleton type'
      firstColumnHeader='State'
      columnHeaders={['SkeletonText', 'Skeleton block']}
      rows={[
        {
          variantLabel: 'Loading',
          cells: [
            <WithSkeleton
              key='text-loading'
              loading
              skeleton={<SkeletonText loading lines={3} variant='body' size='m' />}
            >
              <p>Content</p>
            </WithSkeleton>,
            <WithSkeleton
              key='block-loading'
              loading
              skeleton={<Skeleton loading width={120} height={80} borderRadius={8} />}
            >
              <div>Content</div>
            </WithSkeleton>,
          ],
        },
        {
          variantLabel: 'Content',
          cells: [
            <WithSkeleton
              key='text-content'
              loading={false}
              skeleton={<SkeletonText loading lines={3} variant='body' size='m' />}
            >
              <p>Content</p>
            </WithSkeleton>,
            <WithSkeleton
              key='block-content'
              loading={false}
              skeleton={<Skeleton loading width={120} height={80} borderRadius={8} />}
            >
              <div>Content</div>
            </WithSkeleton>,
          ],
        },
      ]}
    />
  ),
};
