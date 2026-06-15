import { FieldColor, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../_shared';

const meta: Meta<typeof FieldColor> = {
  title: 'Components/Fields/FieldColor',
  component: FieldColor,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Color',
    caption: 'Pick a color',
    hint: 'HEX/RGB/HSV',
    error: '',
    placeholder: '#000000',
    defaultValue: '#1976d2',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    background: true,
    disabled: false,
    readonly: false,
    showClearButton: true,
    showCopyButton: true,
    withAlpha: true,
    autoApply: false,
    availableModes: ['hex', 'rgb', 'hsv'],
    'data-test-id': TEST_IDS.fieldColor,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    // showClearButton — только для редактируемого поля; showCopyButton — только для readonly.
    showClearButton: { if: { arg: 'readonly', neq: true } },
    showCopyButton: { if: { arg: 'readonly', eq: true } },
    availableModes: { control: 'check', options: ['hex', 'rgb', 'hsv'] },
    // FieldColor сам uncontrolled через useValueControl + defaultValue —
    // controlled value/open прячем, в панели остаётся только defaultValue.
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  // {...args} прокидывается 1:1 (uncontrolled) — URL-args (gotoStory) достают
  // defaultValue/size/validationState без обёртки controlled-state.
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Поле выбора цвета с ColorPicker в дропдауне.</DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <FieldColor {...args} />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldColor>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldColor)).toBeVisible();
  },
};
