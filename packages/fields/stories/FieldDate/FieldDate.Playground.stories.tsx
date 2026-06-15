import { DATE_MODE, FieldDate, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { CalendarSVG, WatchSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const meta: Meta<typeof FieldDate> = {
  title: 'Components/Fields/FieldDate',
  component: FieldDate,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Дата',
    // placeholder не задаём — компонент показывает реальную RU-маску по умолчанию (ДД.ММ.ГГГГ).
    caption: 'Формат ДД.ММ.ГГГГ',
    hint: 'Введите дату или выберите в календаре',
    mode: DATE_MODE.Date,
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    background: true,
    disabled: false,
    readonly: false,
    showClearButton: true,
    showCopyButton: true,
    showSeconds: true,
    iconBefore: 'none',
    'data-test-id': TEST_IDS.fieldDate,
  },
  argTypes: {
    mode: { control: 'radio', options: Object.values(DATE_MODE) },
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    iconBefore: {
      control: 'select',
      options: ['none', 'calendar', 'clock'],
      mapping: { none: undefined, calendar: <CalendarSVG />, clock: <WatchSVG /> },
    },
    labelTooltip: {
      control: 'select',
      options: ['none', 'hint'],
      mapping: { none: undefined, hint: { tip: 'Подсказка к заголовку поля' } },
    },
    // Кнопка копирования появляется только в readonly-поле с непустым значением.
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    // showSeconds действует только в режиме date-time (меняет маску чч:мм ↔ чч:мм:сс).
    showSeconds: { if: { arg: 'mode', eq: DATE_MODE.DateTime } },
    // value/onChange — controlled-партнёры uncontrolled-режима; в панели лишние.
    // defaultValue несериализуемый (Date / [Date, Date]) — контролом не выражается, скрываем.
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onCopyButtonClick: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поле с маской и календарём в popover. Режим переключается контролом mode.</DemoHint>
        <DemoActions block>
          <FieldDate {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldDate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  },
};
