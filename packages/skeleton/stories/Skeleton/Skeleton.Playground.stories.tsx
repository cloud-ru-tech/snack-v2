import type { Meta, StoryObj } from '@storybook/react';

import skeletonReadme from '../../README.md?raw';
import { Skeleton, SkeletonProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<SkeletonProps> = {
  title: 'Components/Skeleton/Skeleton',
  component: Skeleton,
  parameters: {
    readme: { content: skeletonReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2750-77960',
    },
    docs: {
      description: {
        component: `
Плейсхолдер загрузки. При \`loading={true}\` отображается блок-скелетон, при \`loading={false}\` — \`children\`.
Размеры задаются через \`width\`, \`height\`, \`borderRadius\`.

## Installation

\`\`\`bash
pnpm add @design-system/skeleton
\`\`\`

## Quick Start

\`\`\`tsx
import { Skeleton } from '@design-system/skeleton';

function Example() {
  return (
    <Skeleton loading width={200} height={24} borderRadius={4}>
      <span>Контент после загрузки</span>
    </Skeleton>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    loading: true,
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Флаг состояния загрузки. true — скелетон, false — children.',
      table: { category: 'Props' },
    },
    width: {
      control: { type: 'number' },
      description: 'Ширина блока (CSS width)',
      table: { category: 'Props' },
    },
    height: {
      control: { type: 'number' },
      description: 'Высота блока (CSS height)',
      table: { category: 'Props' },
    },
    borderRadius: {
      control: { type: 'number' },
      description: 'Радиус скругления (CSS borderRadius)',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      table: { category: 'Props' },
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: args => (
    <div className={styles.wrapper}>
      <Skeleton {...args}>
        <span>Контент после загрузки</span>
      </Skeleton>
    </div>
  ),
};
