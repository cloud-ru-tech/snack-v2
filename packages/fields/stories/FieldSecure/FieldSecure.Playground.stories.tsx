import { FieldSecure, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../_shared';

const meta: Meta<typeof FieldSecure> = {
  title: 'Components/Fields/FieldSecure',
  component: FieldSecure,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Password',
    caption: '',
    hint: 'Минимум 8 символов',
    error: '',
    placeholder: '••••••••',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: true,
    background: true,
    disabled: false,
    readonly: false,
    showHideButton: true,
    showCopyButton: true,
    allowMoreThanMaxLength: false,
    maxLength: 32,
    defaultValue: '',
    'data-test-id': TEST_IDS.fieldSecure,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    // Кнопка копирования появляется только в readonly-поле с непустым значением.
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    // value/onChange — controlled-партнёры uncontrolled `defaultValue`; в панели лишние.
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    // hidden — uncontrolled (кнопка «глаз» переключает маскирование в Playground);
    // hidden/onHiddenChange — controlled-партнёры, в панели лишние.
    hidden: { table: { disable: true } },
    onHiddenChange: { table: { disable: true } },
    onCopyButtonClick: { table: { disable: true } },
    // asyncValueGetter — функция, не URL-arg-driveable; раскрыта в tests/AsyncReveal.
    asyncValueGetter: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поле для пароля с маскированием и кнопкой показать/скрыть.</DemoHint>
        <DemoActions block>
          <ResizableWrapper>
            <FieldSecure {...args} />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldSecure>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSecure)).toBeVisible();
  },
};
