import { FieldText, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { CalendarSVG, SearchSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

const meta: Meta<typeof FieldText> = {
  title: 'Components/Fields/FieldText',
  component: FieldText,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Label',
    caption: 'Caption',
    hint: 'Hint',
    error: '',
    placeholder: 'Введите значение',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    background: true,
    outline: true,
    disabled: false,
    readonly: false,
    showClearButton: true,
    showCopyButton: true,
    prefix: '$',
    postfix: 'USD',
    maxLength: 40,
    allowMoreThanMaxLength: false,
    iconBefore: 'search',
    iconAfter: 'none',
    defaultValue: '',
    'data-test-id': TEST_IDS.fieldText,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    // Кнопка очистки актуальна только в редактируемом поле.
    showClearButton: { if: { arg: 'readonly', neq: true } },
    // Кнопка копирования появляется только в readonly-поле с непустым значением.
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    iconBefore: {
      control: 'select',
      options: ['none', 'search', 'calendar'],
      mapping: { none: undefined, search: <SearchSVG />, calendar: <CalendarSVG /> },
    },
    iconAfter: {
      control: 'select',
      options: ['none', 'search', 'calendar'],
      mapping: { none: undefined, search: <SearchSVG />, calendar: <CalendarSVG /> },
    },
    labelTooltip: {
      control: 'select',
      options: ['none', 'hint'],
      mapping: { none: undefined, hint: { tip: 'Подсказка к заголовку поля' } },
    },
    // value/onChange — controlled-партнёры uncontrolled `defaultValue`; в панели лишние.
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Текстовое поле с настраиваемой валидацией, размером и слотами.</DemoHint>
        <DemoActions block>
          <DemoResizable width='narrow'>
            <FieldText {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldText>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldText)).toBeVisible();
  },
};
