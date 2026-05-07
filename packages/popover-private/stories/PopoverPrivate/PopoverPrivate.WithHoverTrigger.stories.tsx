import { PLACEMENT, PopoverPrivate, type PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';
import { POPOVER_PRIVATE_CONTENT_TEST_ID } from './testIds';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
  parameters: { figma: { disable: true } },
};

export default meta;

type Story = StoryObj<PopoverPrivateProps>;

const PopoverContent = () => <div className={styles.popoverContent}>Opens on hover</div>;

export const WithHoverTrigger: Story = {
  tags: ['!dev', 'autodocs'],
  args: {
    trigger: TRIGGER.Hover,
    placement: PLACEMENT.Top,
    hoverDelayOpen: 200,
    hoverDelayClose: 100,
    'data-test-id': POPOVER_PRIVATE_CONTENT_TEST_ID,
  },
  render: (args: PopoverPrivateProps) => (
    <div className={styles.pageWrapper}>
      <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
        <button type='button'>Hover me</button>
      </PopoverPrivate>
    </div>
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
};
