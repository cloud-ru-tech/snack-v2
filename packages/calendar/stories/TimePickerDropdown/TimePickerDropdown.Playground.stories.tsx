import { Button } from '@ds/button';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import calendarReadme from '../../README.md?raw';
import { SIZE, TimePickerDropdown, TimePickerDropdownProps } from '../../src';
import { TEST_IDS } from '../testIds';

const meta: Meta<TimePickerDropdownProps> = {
  title: 'Components/Calendar/Time Picker Dropdown',
  component: TimePickerDropdown,
  parameters: {
    readme: { content: calendarReadme },
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=23720-29347&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<TimePickerDropdownProps>;

const Template: StoryFn<TimePickerDropdownProps> = args => (
  <DemoPage>
    <DemoPanel>
      <DemoTitle>Playground</DemoTitle>
      <DemoHint>Кнопка-триггер с выпадающим выбором времени.</DemoHint>
      <DemoActions align='center'>
        <TimePickerDropdown {...args}>
          <Button data-test-id={TEST_IDS.timePickerDropdownTrigger} label='Открыть TimePickerDropdown' />
        </TimePickerDropdown>
      </DemoActions>
    </DemoPanel>
  </DemoPage>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    size: SIZE.S,
    showSeconds: true,
    trigger: 'click',
    closeOnApply: true,
    placement: 'bottom-start',
    'data-test-id': TEST_IDS.timePickerDropdown,
  },
  argTypes: {
    onChangeValue: { table: { disable: true } },
    onFocusLeave: { table: { disable: true } },
    navigationStartRef: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    today: { table: { disable: true } },
    fitToContainer: { table: { disable: true } },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
    trigger: {
      control: 'radio',
      options: ['click', 'hover', 'focus'],
    },
    placement: {
      control: 'select',
      options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left', 'right'],
    },
    closeOnApply: { control: 'boolean' },
  },
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('time-picker-dropdown-trigger')).toBeVisible();
  },
};
