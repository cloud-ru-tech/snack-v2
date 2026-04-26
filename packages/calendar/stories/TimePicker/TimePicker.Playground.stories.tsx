import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useArgs, useMemo } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import calendarReadme from '../../README.md?raw';
import { SIZE, Size, TimePicker, TimeValue } from '../../src';
import { parseTimeFromStoryParts } from './helpers.ts';
import styles from './styles.module.scss';

const meta = {
  title: 'Components/Calendar/Time Picker',
  component: TimePicker,
  parameters: {
    readme: { content: calendarReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3553-18435&m=dev',
    },
  },
} satisfies Meta;

export default meta;

const SCROLL_SIZE = {
  [SIZE.S]: styles.scrollS,
  [SIZE.M]: styles.scrollM,
  [SIZE.L]: styles.scrollL,
};

type StoryProps = {
  size: Size;
  showSeconds: boolean;
  fitToContainer: boolean;
  withFixedSizes: boolean;
  withBackground: boolean;
  valueHours?: number;
  valueMinutes?: number;
  valueSeconds?: number;
  defaultValueHours?: number;
  defaultValueMinutes?: number;
  defaultValueSeconds?: number;
};

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({
  size,
  showSeconds,
  fitToContainer,
  withFixedSizes,
  withBackground,
  valueHours,
  valueMinutes,
  valueSeconds,
  defaultValueHours,
  defaultValueMinutes,
  defaultValueSeconds,
}: StoryProps) => {
  const [, updateArgs] = useArgs<StoryProps>();

  const valueFromControls = useMemo(
    () => parseTimeFromStoryParts(valueHours, valueMinutes, valueSeconds),
    [valueHours, valueMinutes, valueSeconds],
  );

  const defaultFromControls = useMemo(
    () => parseTimeFromStoryParts(defaultValueHours, defaultValueMinutes, defaultValueSeconds),
    [defaultValueHours, defaultValueMinutes, defaultValueSeconds],
  );

  const onChangeValue = (next: TimeValue) => {
    updateArgs({
      valueHours: next.hours ?? undefined,
      valueMinutes: next.minutes ?? undefined,
      valueSeconds: next.seconds ?? undefined,
    });
  };

  const hours = String(valueHours).padStart(2, '0');
  const minutes = String(valueMinutes).padStart(2, '0');
  const seconds = String(valueSeconds).padStart(2, '0');

  return (
    <div
      className={cn(styles.story, withFixedSizes && SCROLL_SIZE[size || SIZE.S])}
      data-with-background={withBackground || undefined}
    >
      <TimePicker
        size={size}
        showSeconds={showSeconds}
        fitToContainer={fitToContainer}
        defaultValue={defaultFromControls}
        value={valueFromControls}
        onChangeValue={onChangeValue}
        data-test-id='timepicker-playground'
      />

      <div className={styles.valueHolder} data-test-id='timepicker-value-holder'>
        {valueFromControls ? `${hours}:${minutes}:${seconds}` : ''}
      </div>
    </div>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    showSeconds: true,
    size: SIZE.S,
    withFixedSizes: true,
    fitToContainer: true,
    withBackground: true,
    valueHours: undefined,
    valueMinutes: undefined,
    valueSeconds: undefined,
    defaultValueHours: undefined,
    defaultValueMinutes: undefined,
    defaultValueSeconds: undefined,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
    },
    valueHours: {
      name: '[value] hours',
      control: { type: 'number' },
    },
    valueMinutes: {
      name: '[value] minutes',
      control: { type: 'number' },
    },
    valueSeconds: {
      name: '[value] seconds',
      control: { type: 'number' },
    },
    defaultValueHours: {
      name: '[defaultValue] hours',
      control: { type: 'number' },
    },
    defaultValueMinutes: {
      name: '[defaultValue] minutes',
      control: { type: 'number' },
    },
    defaultValueSeconds: {
      name: '[defaultValue] seconds',
      control: { type: 'number' },
    },
    withFixedSizes: {
      name: '[Stories]: Fixed sizes of story',
    },
    withBackground: {
      name: '[Stories]: Enable white background for story wrapper',
      control: { type: 'boolean' },
    },
  },
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('timepicker-playground')).toBeVisible();
  },
};
