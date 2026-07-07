import { Button } from '@ds/button';
import { UploadSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { FileUpload, FileUploadProps, UPLOAD_MODE } from '../../src';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload',
  component: FileUpload,
  parameters: { layout: 'fullscreen' },
  args: {
    mode: UPLOAD_MODE.Multiple,
    disabled: false,
    'data-test-id': TEST_IDS.fileUpload.root,
  },
  argTypes: {
    mode: {
      control: 'select',
      options: Object.values(UPLOAD_MODE),
    },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    disabled: { control: 'boolean' },
    onFilesReject: { table: { disable: true } },
    onChange: { table: { disable: true } },
    innerRef: { table: { disable: true } },
    'data-test-id': {
      control: 'text',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

function FileUploadWithFiles(args: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className={styles.wrapper}>
      <FileUpload {...args} onFilesUpload={setFiles}>
        <Button data-test-id={TEST_IDS.fileUpload.trigger} type='button' label='Загрузить' icon={<UploadSVG />} />
      </FileUpload>

      {files.length > 0 && (
        <div className={styles.filesList} data-test-id={TEST_IDS.fileUpload.filesList}>
          Загружено: {files.map(f => f.name).join(', ')}
        </div>
      )}
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кнопка-триггер загрузки файлов.</DemoHint>
        <DemoActions align='center'>
          <FileUploadWithFiles {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fileUpload.trigger)).toBeVisible();
  },
};
