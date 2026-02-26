import { TruncateString } from '@design-system/truncate-string';
import { Typography } from '@design-system/typography';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

import skeletonReadme from '../../README.md?raw';
import { SkeletonText, SkeletonTextProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<SkeletonTextProps> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: {
    readme: { content: skeletonReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2750-77960',
    },
    docs: {
      description: {
        component: `
Плейсхолдер загрузки для текста. При \`loading={true}\` отображаются строки-скелетоны, при \`loading={false}\` — \`children\`.
Поддерживает \`purpose\`, \`size\`, \`align\` для типографики и \`lines\` для количества строк.

## Installation

\`\`\`bash
pnpm add @design-system/skeleton
\`\`\`

## Quick Start

\`\`\`tsx
import { SkeletonText } from '@design-system/skeleton';

function Example() {
  return (
    <SkeletonText loading purpose="body" size="m" align="left" lines={3}>
      <p>Текст после загрузки</p>
    </SkeletonText>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    loading: true,
    variant: 'body',
    size: 'm',
    align: 'left',
    lines: 3,
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Флаг состояния загрузки. true — скелетон, false — children.',
      table: { category: 'Props' },
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Количество строк',
      table: { category: 'Props' },
    },
    variant: {
      options: ['display', 'headline', 'title', 'label', 'body'],
      control: 'select',
      description: 'Роль типографики (размер по anatomy)',
      table: { category: 'Props' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: 'select',
      description: 'Масштаб',
      table: { category: 'Props' },
    },
    align: {
      options: ['left', 'right'],
      control: 'radio',
      description: 'Выравнивание',
      table: { category: 'Props' },
    },
    width: {
      control: { type: 'number' },
      description: 'Ширина контейнера (CSS)',
      table: { category: 'Props' },
    },
    rowClassName: {
      control: 'text',
      table: { category: 'Props' },
    },
    lineClassName: {
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
type Story = StoryObj<
  SkeletonTextProps & {
    text: string;
    textOpacity: number;
  }
>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  args: {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nesciunt consequuntur veniam libero aliquid perspiciatis earum quasi natus unde saepe provident, aliquam maiores dolor. Illum possimus modi saepe architecto voluptatibus!',
    textOpacity: 50,
  },
  argTypes: {
    textOpacity: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Прозрачность текста',
      table: { category: 'Props' },
    },
  },
  render: ({ textOpacity, text, ...args }) => (
    <Typography size={args.size} variant={args.variant} weight='regular'>
      <div className={styles.wrapper}>
        <div className={styles.textContainer}>
          <div
            className={styles.textContent}
            style={{ '--text-opacity': textOpacity / 100, width: args.width || undefined } as CSSProperties}
          >
            <TruncateString text={text} maxLines={args.lines} />
          </div>
          <div className={styles.skeletonOverlay}>
            <SkeletonText {...args}>
              <div data-test-id='children'>
                <TruncateString text={text} maxLines={args.lines} />
              </div>
            </SkeletonText>
          </div>
        </div>
      </div>
    </Typography>
  ),
};
