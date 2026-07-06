import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const meta: Meta<typeof FieldChat> = {
  title: 'Uikit Product/FieldsPredefined/FieldChat',
  component: FieldChat,
  parameters: { layout: 'fullscreen' },
  args: {
    handleSubmit: fn(),
    'data-test-id': TEST_IDS.fieldChat,
  },
  argTypes: {
    // controlled-состояние живёт в render (useState) — контролы бессмысленны.
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    attachment: { table: { disable: true } },
    // технические пропсы без визуального эффекта в Playground.
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    className: { table: { disable: true } },
    fieldClassName: { table: { disable: true } },
    header: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    // copy-кнопка выключена внутри FieldChat — колбек не срабатывает.
    onCopyButtonClick: { table: { disable: true } },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    return (
      <DemoPage>
        <DemoPanel width='default'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Поле чата: Enter — отправка, Shift+Enter — перенос строки, скрепка — прикрепление файлов.</DemoHint>
          <DemoActions block>
            <FieldChat
              {...args}
              value={value}
              onChange={setValue}
              handleSubmit={submitted => {
                args.handleSubmit?.(submitted);
                setValue('');
                setFiles([]);
              }}
              attachment={{
                files,
                onFilesUpload: uploaded => setFiles(prev => [...prev, ...uploaded]),
                onFileDelete: file => setFiles(prev => prev.filter(item => item !== file)),
              }}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldChat>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldChat)).toBeVisible();
  },
};
