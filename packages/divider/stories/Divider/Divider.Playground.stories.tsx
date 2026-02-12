import type { Meta, StoryObj } from '@storybook/react';

import { Divider, type DividerProps, ORIENTATION, VARIANT } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<DividerProps> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2932-6308',
    },
    docs: {
      description: {
        component: `
# Divider

Разделитель контента. Структура повторяет Figma: контейнер (relative) + слой линии (absolute).
Стили из \`@sbercloud/figma-variables\` (anatomy container + line regular/thin).

## Installation

\`\`\`bash
pnpm add @design-system/divider
\`\`\`

## Quick Start

\`\`\`tsx
import { Divider } from '@design-system/divider';

function Example() {
  return (
    <>
      <Divider />
      <div style={{ display: 'flex', height: 32 }}>
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    variant: VARIANT.Regular,
    orientation: ORIENTATION.Horizontal,
  },
  argTypes: {
    variant: {
      options: Object.values(VARIANT),
      control: 'radio',
      description: 'Толщина линии (regular: 1px, thin: 0.5px)',
    },
    orientation: {
      options: Object.values(ORIENTATION),
      control: 'radio',
      description: 'Ориентация разделителя',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DividerProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: args =>
    args.orientation === ORIENTATION.Vertical ? (
      <div className={styles.verticalRow}>
        <span className={styles.verticalRowLabel}>Left</span>
        <div className={styles.verticalRowDividerCell}>
          <Divider {...args} />
        </div>
        <span className={styles.verticalRowLabel}>Right</span>
      </div>
    ) : (
      <div className={styles.horizontalWrapper}>
        <Divider {...args} />
      </div>
    ),
};
