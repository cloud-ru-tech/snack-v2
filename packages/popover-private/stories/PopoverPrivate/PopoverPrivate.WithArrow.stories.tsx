import { PLACEMENT, PopoverPrivate, type PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';
import { POPOVER_PRIVATE_CONTENT_TEST_ID } from './testIds';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

const PopoverContent = () => <div className={styles.popoverContent}>Popover</div>;

export const WithArrow: Story = {
  tags: ['!dev', 'autodocs'],
  args: {
    hasArrow: true,
    placement: PLACEMENT.Right,
    trigger: TRIGGER.Click,
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
    arrowElementClassName: {
      table: { disable: true },
    },
    arrowContainerClassName: {
      table: { disable: true },
    },
  },
  render: (args: PopoverPrivateProps) => (
    <div className={styles.pageWrapper}>
      <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
        <button type='button'>Open</button>
      </PopoverPrivate>
    </div>
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
