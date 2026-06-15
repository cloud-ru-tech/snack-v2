import { FieldTime, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const meta: Meta<typeof FieldTime> = {
  title: 'Components/Fields/FieldTime',
  component: FieldTime,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Время',
    // placeholder не задаём — компонент показывает реальную RU-маску по умолчанию (чч:мм:сс / чч:мм).
    caption: 'Формат чч:мм:сс',
    hint: 'Введите время или выберите из дропдауна',
    error: '',
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
    closeOnApply: true,
    // Стартовое значение для uncontrolled-режима — поле сразу заполнено, и переключение showSeconds
    // видимо меняет маску (чч:мм:сс ↔ чч:мм).
    defaultValue: { hours: 9, minutes: 30, seconds: 0 },
    'data-test-id': TEST_IDS.fieldTime,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    labelTooltip: {
      control: 'select',
      options: ['none', 'hint'],
      mapping: { none: undefined, hint: { tip: 'Подсказка к заголовку поля' } },
    },
    // Кнопка копирования появляется только в readonly-поле с непустым значением.
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    // value/onChange — controlled-партнёры uncontrolled-режима; в панели лишние.
    // defaultValue несериализуемый (TimeValue) — контролом не выражается, скрываем, но держим в args.
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onClearButtonClick: { table: { disable: true } },
    onCopyButtonClick: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поле выбора времени с сегментной маской и time-picker дропдауном.</DemoHint>
        <DemoActions block>
          <FieldTime {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldTime>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldTime)).toBeVisible();
  },
};
