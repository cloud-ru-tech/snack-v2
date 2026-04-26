import {
  PLACEMENT,
  POPOVER_HEIGHT_STRATEGY,
  POPOVER_WIDTH_STRATEGY,
  PopoverPrivate,
  type PopoverPrivateProps,
  TRIGGER,
} from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';
import { POPOVER_PRIVATE_CONTENT_TEST_ID } from './testIds';

const PopoverContent = () => <div className={styles.popoverContent}>Popover content</div>;

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
  args: {
    placement: PLACEMENT.Top,
    trigger: TRIGGER.Click,
    hasArrow: false,
    outsideClick: true,
    closeOnEscapeKey: true,
    widthStrategy: POPOVER_WIDTH_STRATEGY.Auto,
    heightStrategy: POPOVER_HEIGHT_STRATEGY.Auto,
    arrowElementClassName: styles.popoverArrowElement,
    arrowContainerClassName: styles.popoverArrowContainer,
    'data-test-id': POPOVER_PRIVATE_CONTENT_TEST_ID,
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
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
    arrowElementClassName: {
      table: { disable: true },
    },
    arrowContainerClassName: {
      table: { disable: true },
    },
  },
  render: args => (
    <div className={styles.pageWrapper}>
      <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
        <button type='button'>Open popover</button>
      </PopoverPrivate>
    </div>
  ),
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
