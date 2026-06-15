import { Button } from '@ds/button';
import { FieldTextArea, FieldTextAreaProps, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

type StoryProps = FieldTextAreaProps & {
  /** Story-only: показать footer-слот под полем (нода, не сериализуемая через args). */
  showFooter: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Fields/FieldTextArea',
  component: FieldTextArea,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Comment',
    caption: 'Опишите детали запроса',
    labelTooltip: undefined,
    hint: 'Hint text',
    error: '',
    placeholder: 'Type your message',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    background: true,
    disabled: false,
    readonly: false,
    minRows: 3,
    maxRows: 8,
    maxLength: 200,
    allowMoreThanMaxLength: true,
    resizable: false,
    showClearButton: true,
    showCopyButton: true,
    showFooter: false,
    defaultValue: '',
    'data-test-id': TEST_IDS.fieldTextArea,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    labelTooltip: {
      control: 'select',
      options: ['none', 'short'],
      mapping: {
        none: undefined,
        short: { tip: 'Подсказка к заголовку' },
      },
    },
    minRows: { control: { type: 'number', min: 1, max: 20 } },
    maxRows: { control: { type: 'number', min: 1, max: 50 } },
    maxLength: { control: { type: 'number', min: 0, max: 1000 } },
    // Clear виден только в editable-режиме (value && !readonly && !disabled) — контрол прячем при readonly.
    showClearButton: { if: { arg: 'readonly', eq: false } },
    // Copy не завязан на readonly (виден при value && !disabled в любом режиме) — контрол доступен всегда.
    showFooter: { name: '[Stories]: showFooter', control: 'boolean' },
    // Uncontrolled-режим: панель крутит только defaultValue, controlled-партнёры спрятаны.
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  render: ({ showFooter, ...args }) => {
    const footer = showFooter ? (
      <Button size='s' label='Отправить' data-test-id='field-textarea-footer-button' />
    ) : undefined;

    return (
      <PortalContextProvider>
        <DemoPage>
          <DemoPanel width='narrow'>
            <DemoTitle>Playground</DemoTitle>
            <DemoHint>Многострочное поле с auto-resize (min/maxRows) и опциональным resize-handle.</DemoHint>
            <DemoActions block>
              <FieldTextArea {...args} footer={footer} />
            </DemoActions>
          </DemoPanel>
        </DemoPage>
      </PortalContextProvider>
    );
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldTextArea)).toBeVisible();
  },
};
