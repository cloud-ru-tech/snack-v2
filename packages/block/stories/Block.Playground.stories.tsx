import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { useDraggable } from '#storybook/hooks/useDraggable';

import readme from '../README.md?raw';
import { Block, BlockProps, SIZE, VARIANT } from '../src';
import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=10940-24646&p=f&m=dev',
    },
    docs: {
      description: {
        component: `
# Block Component

Компонент–слот для отображения любого содержимого на подложке имитирующей материал (матовое/полупрозрачное стекло).

## Features

- Компонент поддерживает несколько вариантов отображения: обычный акрил (simple), акрил с обводкой (outline), акрил с тенью (shadow) и в стиле полупрозрачного матового стекла (transparent).
- Размер (size) и внешний вид (variant) позволяют использовать в разных сценариях.

## Installation

\`\`\`bash
pnpm add @design-system/block
\`\`\`

## Quick Start

\`\`\`tsx
import { Block } from '@snack-uikit/block';

function Example() {
  return (
    <>
      <Block size='l' variant='transparent'>
        <span># sample</span>
      </Block>
      
      <Block size='s' variant='outline'>
        <span>Some content</span>
      </Block>
      
      <Block size='m' variant='simple'>
        <span>Test</span>
      </Block>
    </>
  );
}
\`\`\`

## Source Code

- [GitLab Repository](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/variables/storybook/-/tree/main/packages/block)
`,
      },
    },
  },
  args: {
    size: SIZE.L,
    variant: VARIANT.Simple,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант',
    },
  },
};

export default meta;

type StoryProps = BlockProps & {
  showBackground: boolean;
  customText: string;
  isDraggable: boolean;
};

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({ showBackground, customText, isDraggable, ...args }: StoryProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const draggableElementRef = useRef<HTMLDivElement>(null);

  const { position, handlePointerMove, handlePointerUp, handlePointerDown } = useDraggable({
    isDraggable,
    draggableElementRef,
    wrapperRef,
  });

  return (
    <div ref={wrapperRef} className={styles.externalWrapper} data-show-background={showBackground || undefined}>
      <div
        ref={draggableElementRef}
        className={isDraggable ? styles.draggable : undefined}
        style={
          isDraggable && position
            ? {
                left: position.left,
                top: position.top,
              }
            : undefined
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Block {...args}>
          <span className={styles.sampleContent}>{customText}</span>
        </Block>
      </div>
    </div>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  args: {
    showBackground: true,
    size: SIZE.L,
    variant: VARIANT.Simple,
    customText: '# slot content',
    isDraggable: true,
  },
  argTypes: {
    showBackground: {
      name: '[Stories]: Show colorful background',
    },
    customText: {
      name: '[Stories]: Custom text',
    },
    isDraggable: {
      name: '[Stories]: Draggable',
    },
  },
  render: Template,
};
