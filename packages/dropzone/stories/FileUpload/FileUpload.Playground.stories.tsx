import { Button } from '@ds/button';
import { UploadSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { FileUpload, FileUploadProps, UPLOAD_MODE } from '../../src';
import styles from './styles.module.scss';
import { FILE_UPLOAD_TEST_ID, FILE_UPLOAD_TRIGGER_TEST_ID } from './testIds';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload',
  component: FileUpload,
  args: {
    mode: UPLOAD_MODE.Multiple,
    'data-test-id': FILE_UPLOAD_TEST_ID,
  },
  argTypes: {
    mode: {
      control: 'select',
      options: Object.values(UPLOAD_MODE),
      description: 'Режим загрузки',
    },
    accept: { control: 'text', description: 'Типы файлов (например image/*)' },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
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
        <Button data-test-id={FILE_UPLOAD_TRIGGER_TEST_ID} type='button' label='Загрузить' icon={<UploadSVG />} />
      </FileUpload>

      {files.length > 0 && (
        <div className={styles.filesList} data-test-id='files-list'>
          Загружено: {files.map(f => f.name).join(', ')}
        </div>
      )}
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <FileUploadWithFiles {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(FILE_UPLOAD_TRIGGER_TEST_ID)).toBeVisible();
  },
};
