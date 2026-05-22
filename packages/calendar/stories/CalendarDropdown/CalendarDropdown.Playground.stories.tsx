import { Button } from '@ds/button';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import calendarReadme from '../../README.md?raw';
import { CALENDAR_MODE, CalendarDropdown, CalendarDropdownProps, SIZE } from '../../src';
import { TEST_IDS } from '../testIds';

type StoryProps = CalendarDropdownProps & {
  /** Только для `mode: date-range`: включает пресеты периода (как в Calendar Playground). */
  showPeriodPresets: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Calendar/Calendar Dropdown',
  component: CalendarDropdown,
  parameters: {
    readme: { content: calendarReadme },
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=19439-215955&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({ showPeriodPresets, ...args }) => {
  const presets = args.mode === CALENDAR_MODE.DateRange && showPeriodPresets ? { enabled: true } : undefined;

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кнопка-триггер с выпадающим календарём.</DemoHint>
        <DemoActions align='center'>
          <CalendarDropdown {...args} presets={presets}>
            <Button data-test-id={TEST_IDS.calendarDropdownTrigger} label='Открыть CalendarDropdown' />
          </CalendarDropdown>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    mode: CALENDAR_MODE.DateTime,
    size: SIZE.S,
    showPeriodPresets: false,
    showSeconds: true,
    trigger: 'click',
    closeOnApply: true,
    placement: 'bottom-start',
    fitToContainer: false,
    'data-test-id': TEST_IDS.calendarDropdown,
  },
  argTypes: {
    onChangeValue: { table: { disable: true } },
    onFocusLeave: { table: { disable: true } },
    navigationStartRef: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    today: { table: { disable: true } },
    bottomSlot: { table: { disable: true } },
    trigger: {
      control: 'radio',
      options: ['click', 'hover', 'focus'],
    },
    placement: {
      control: 'select',
      options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left', 'right'],
    },
    closeOnApply: { control: 'boolean' },
    showPeriodPresets: {
      name: '[Stories]: Show period presets for data-range mode',
      if: { arg: 'mode', eq: CALENDAR_MODE.DateRange },
    },
    mode: {
      control: 'select',
      options: Object.values(CALENDAR_MODE),
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
  },
  render: Template,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.calendarDropdownTrigger)).toBeVisible();
  },
};
