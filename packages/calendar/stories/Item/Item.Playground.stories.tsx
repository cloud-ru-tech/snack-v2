import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import calendarReadme from '../../README.md?raw';
import { RANGE_POSITION, SIZE } from '../../src/constants.ts';
import { CalendarItemProps, Item } from '../../src/helperComponents/Item';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<CalendarItemProps & { 'data-test-id'?: string }> = {
  title: 'Components/Calendar/Item',
  component: Item,
  parameters: {
    layout: 'fullscreen',
    readme: { content: calendarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3722-10703&m=dev',
    },
  },
  args: {},
};

export default meta;

type StoryProps = CalendarItemProps & { 'data-test-id'?: string };

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = (args: StoryProps) => (
  <DemoPage>
    <DemoPanel>
      <DemoTitle>Playground</DemoTitle>
      <DemoHint>Атомарная ячейка календаря (день / месяц / год) во всех состояниях.</DemoHint>
      <DemoActions align='center'>
        <div className={styles.storyWrapper}>
          <Item {...args} />
        </div>
      </DemoActions>
    </DemoPanel>
  </DemoPage>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    'data-test-id': TEST_IDS.calendarItem,
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
