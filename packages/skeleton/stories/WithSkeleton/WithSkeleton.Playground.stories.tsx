import { Skeleton, SkeletonText, WithSkeleton } from '@ds/skeleton';
import { Typography } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from '../styles.module.scss';

type PlaygroundArgs = {
  loading?: boolean;
  skeletonVariant?: 'text' | 'block';
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Skeleton/WithSkeleton',
  component: WithSkeleton,
  parameters: { layout: 'centered' },
  args: {
    loading: true,
    skeletonVariant: 'text',
  },
  argTypes: {
    loading: { control: 'boolean', description: 'Флаг состояния загрузки' },
    skeletonVariant: {
      options: ['text', 'block'],
      control: 'radio',
      description: 'Вариант скелетона для демонстрации',
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ loading, skeletonVariant = 'text' }) => {
    const skeleton =
      skeletonVariant === 'text' ? (
        <SkeletonText loading lines={3} variant='body' size='m' />
      ) : (
        <Skeleton loading width={200} height={120} borderRadius={8} />
      );
    const content =
      skeletonVariant === 'text' ? (
        <Typography variant='body' size='m' as='div'>
          Контент после загрузки.
        </Typography>
      ) : (
        <div className={styles.contentCard}>Блок контента</div>
      );
    return (
      <div className={styles.wrapper} data-testid='with-skeleton-wrapper'>
        <WithSkeleton loading={loading} skeleton={skeleton}>
          {content}
        </WithSkeleton>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('with-skeleton-wrapper')).toBeVisible();
  },
};
