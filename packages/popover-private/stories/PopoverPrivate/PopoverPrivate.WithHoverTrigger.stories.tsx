import type { Meta, StoryObj } from '@storybook/react';

import { PLACEMENT, PopoverPrivate, PopoverPrivateProps, TRIGGER } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/Popover Private',
  component: PopoverPrivate,
};

export default meta;

type Story = StoryObj<PopoverPrivateProps>;

const PopoverContent = () => <div className={styles.popoverContent}>Opens on hover</div>;

export const WithHoverTrigger: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    trigger: TRIGGER.Hover,
    placement: PLACEMENT.Top,
    hoverDelayOpen: 200,
    hoverDelayClose: 100,
  },
  render: (args: PopoverPrivateProps) => (
    <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
      <button type='button'>Hover me</button>
    </PopoverPrivate>
  ),
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
  },
  parameters: {
    docs: {
      description: {
        story:
          'Поповер открывается по наведению курсора. Задержки открытия и закрытия можно настроить через hoverDelayOpen и hoverDelayClose.',
      },
    },
  },
};
