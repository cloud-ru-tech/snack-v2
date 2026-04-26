import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import calendarReadme from '../../README.md?raw';
import { RANGE_POSITION, SIZE } from '../../src/constants.ts';
import { CalendarItemProps, Item } from '../../src/helperComponents/Item';
import styles from './styles.module.scss';

const meta: Meta<CalendarItemProps> = {
  title: 'Components/Calendar/Item',
  component: Item,
  parameters: {
    readme: { content: calendarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3722-10703&m=dev',
    },
  },
  args: {},
};

export default meta;

type StoryProps = CalendarItemProps;

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = (args: StoryProps) => (
  <div className={styles.storyWrapper}>
    <Item {...args} />
  </div>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    size: 's',
    visible: true,
    checked: false,
    rangePosition: 'out',
    disabled: false,
    holiday: false,
    another: false,
    current: true,
    label: '00',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
    rangePosition: {
      control: 'radio',
      options: Object.values(RANGE_POSITION),
    },
  },
  render: Template,
};
