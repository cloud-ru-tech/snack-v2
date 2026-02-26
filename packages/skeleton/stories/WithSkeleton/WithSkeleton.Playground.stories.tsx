import { Typography } from '@design-system/typography';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import skeletonReadme from '../../README.md?raw';
import { Skeleton, SkeletonText, WithSkeleton } from '../../src';
import styles from '../styles.module.scss';

type WithSkeletonProps = ComponentProps<typeof WithSkeleton>;
type WithSkeletonPlaygroundArgs = WithSkeletonProps & {
  skeletonVariant?: 'text' | 'block';
};

const meta: Meta<WithSkeletonPlaygroundArgs> = {
  title: 'Components/Skeleton/WithSkeleton',
  component: WithSkeleton,
  parameters: {
    readme: { content: skeletonReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2750-77960',
    },
    docs: {
      description: {
        component: `
Обёртка для условного отображения скелетона или контента. При \`loading={true}\` отображается \`skeleton\`, при \`loading={false}\` — \`children\`.
Позволяет задать произвольный JSX скелетона.

## Installation

\`\`\`bash
pnpm add @design-system/skeleton
\`\`\`

## Quick Start

\`\`\`tsx
import { WithSkeleton, SkeletonText } from '@design-system/skeleton';

function Example() {
  return (
    <WithSkeleton
      loading={isLoading}
      skeleton={<SkeletonText loading lines={3} />}
    >
      <p>Контент после загрузки</p>
    </WithSkeleton>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    loading: true,
    skeletonVariant: 'text',
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Флаг состояния загрузки. true — skeleton, false — children.',
      table: { category: 'Props' },
    },
    skeletonVariant: {
      options: ['text', 'block'],
      control: 'radio',
      description: 'Вариант скелетона для демонстрации',
      table: { category: 'Playground' },
    },
  },
};

export default meta;
type Story = StoryObj<WithSkeletonPlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
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
          <br />
          Текст заменяет скелетон,
          <br />
          когда loading=false.
        </Typography>
      ) : (
        <div className={styles.contentCard}>Блок контента</div>
      );
    return (
      <div className={styles.wrapper}>
        <WithSkeleton loading={loading} skeleton={skeleton}>
          {content}
        </WithSkeleton>
      </div>
    );
  },
};
