import { Button } from '@ds/button';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import calendarReadme from '../../README.md?raw';
import { SIZE, TimePickerDropdown, TimePickerDropdownProps } from '../../src';

const meta: Meta<TimePickerDropdownProps> = {
  title: 'Components/Calendar/Time Picker Dropdown',
  component: TimePickerDropdown,
  parameters: {
    readme: { content: calendarReadme },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=23720-29347&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<TimePickerDropdownProps>;

const Template: StoryFn<TimePickerDropdownProps> = args => (
  <TimePickerDropdown {...args}>
    <Button data-test-id='time-picker-dropdown-trigger' label='Открыть TimePickerDropdown' />
  </TimePickerDropdown>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    size: SIZE.S,
    showSeconds: true,
    trigger: 'click',
    closeOnApply: true,
    placement: 'bottom-start',
    'data-test-id': 'time-picker-dropdown',
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
