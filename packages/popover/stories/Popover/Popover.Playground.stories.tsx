import {
  PLACEMENT,
  Popover,
  POPOVER_HEIGHT_STRATEGY,
  POPOVER_WIDTH_STRATEGY,
  type PopoverProps,
  TRIGGER,
} from '@design-system/popover';
import type { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const PopoverContentSlot = () => <div className={styles.popoverContent}>Popover content</div>;

const meta: Meta<PopoverProps> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2219-5414',
    },
  },
  args: {
    placement: PLACEMENT.Top,
    trigger: TRIGGER.Click,
    hasArrow: true,
    outsideClick: true,
    closeOnEscapeKey: true,
    widthStrategy: POPOVER_WIDTH_STRATEGY.Auto,
    heightStrategy: POPOVER_HEIGHT_STRATEGY.Auto,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Положение поповера относительно триггера',
    },
    trigger: {
      control: 'radio',
      options: Object.values(TRIGGER),
      description: 'Тип триггера для открытия',
    },
    hasArrow: {
      control: 'boolean',
      description: 'Отображать стрелку',
    },
    outsideClick: {
      control: 'boolean',
      description: 'Закрывать при клике вне поповера',
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'Закрывать по Escape',
    },
    widthStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_WIDTH_STRATEGY),
      description: 'Стратегия ширины контейнера',
    },
    heightStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_HEIGHT_STRATEGY),
      description: 'Стратегия высоты контейнера',
    },
    offset: {
      control: 'number',
      description: 'Отступ от триггера',
    },
    hoverDelayOpen: {
      control: 'number',
      description: 'Задержка открытия по hover',
    },
    hoverDelayClose: {
      control: 'number',
      description: 'Задержка закрытия по hover',
    },
    content: {
      control: 'text',
      description: 'Контент поповера (в stories — подставляется в слот)',
      table: {
        category: 'Slots',
      },
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
  render: args => {
    const { content: contentArg, ...rest } = args;
    const content = contentArg != null && contentArg !== '' ? contentArg : <PopoverContentSlot />;
    return (
      <div className={styles.pageWrapper}>
        <Popover {...rest} content={content}>
          <button type='button'>Open popover</button>
        </Popover>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
