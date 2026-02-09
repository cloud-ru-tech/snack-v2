import type { Meta, StoryObj } from '@storybook/react';

import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/Popover Private',
  component: PopoverPrivate,
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

const PopoverContent = () => <div className={styles.popoverContent}>Popover with arrow</div>;

export const WithArrow: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    hasArrow: true,
    placement: PLACEMENT.Right,
    trigger: TRIGGER.Click,
    arrowElementClassName: styles.popoverArrowElement,
    arrowContainerClassName: styles.popoverArrowContainer,
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
    arrowElementClassName: {
      table: { disable: true },
    },
    arrowContainerClassName: {
      table: { disable: true },
    },
  },
  render: (args: PopoverPrivateProps) => (
    <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
      <button type='button'>Open</button>
    </PopoverPrivate>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Поповер с отображаемой стрелкой, указывающей на триггер. Рекомендуется задать цвет стрелки через arrowElementClassName.',
      },
    },
  },
};
