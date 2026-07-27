import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useRef } from 'react';

import { useDraggable } from '#storybook/hooks/useDraggable';

import { SvgCloud } from './components/CloudIcon';
import { SampleBlock, SampleBlockProps, SIZE, VARIANT } from './components/SampleBlock';
import { STATE } from './constants';
import styles from './styles.module.scss';

const meta: Meta<SampleBlockProps> = {
  title: 'Components/Materials',
  component: SampleBlock,
  args: {},
  argTypes: {
    state: {
      control: 'select',
      options: Object.values(STATE),
      description: 'Состояние',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант',
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
  },
};

export default meta;

type StoryProps = SampleBlockProps & {
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
    <div
      ref={wrapperRef}
      className={cn(styles.externalWrapper, styles.withResize)}
      data-show-background={showBackground || undefined}
    >
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
        <SampleBlock {...args}>
          <div className={styles.sampleContent}>
            <span className={styles.sampleText} data-text-opacity>
              {customText}
            </span>
            <SvgCloud className={styles.sampleIcon} data-text-opacity />
          </div>
        </SampleBlock>
      </div>
    </div>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    state: undefined,
    showBackground: true,
    variant: VARIANT.Simple,
    customText: '# slot content',
    isDraggable: true,
    size: SIZE.L,
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
