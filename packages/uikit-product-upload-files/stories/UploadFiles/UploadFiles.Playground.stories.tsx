import { UploadFiles } from '@ds/uikit-product-upload-files';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { mockUpload, PDF_TXT_ACCEPT, STORY_DEFAULTS } from './helpers';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

function Render(args: React.ComponentProps<typeof UploadFiles>) {
  const [value, setValue] = useState(args.value ?? args.defaultValue);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Простой вариант: любые файлы, не более 3 файлов, до 5 МБ. Обязательная функция upload.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.uploadFilesStory}>
            <UploadFiles
              {...args}
              value={value}
              onChange={items => {
                setValue(items);
                args.onChange?.(items);
              }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof UploadFiles> = {
  title: 'Uikit Product/UploadFiles',
  component: UploadFiles,
  globals: { language: 'ru-RU' },
  parameters: { layout: 'fullscreen' },
  render: args => <Render {...args} />,
  args: {
    ...STORY_DEFAULTS,
    optional: true,
    'data-test-id': TEST_IDS.root,
    onChange: fn(),
    upload: mockUpload,
  },
  argTypes: {
    optional: { control: 'boolean' },
    onChange: { table: { disable: true } },
    upload: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof UploadFiles>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(within(canvasElement).getByTestId(TEST_IDS.dropzone)).toBeVisible();
  },
};

// Baked-args для e2e: через URL-args массив accept ненадёжно доходит до Storybook.
export const FormatRestricted: Story = {
  tags: ['test'],
  args: {
    accept: PDF_TXT_ACCEPT,
  },
};
