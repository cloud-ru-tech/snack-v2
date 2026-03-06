import { Button } from '@design-system/button';
import { UploadSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import dropzoneReadme from '../../README.md?raw';
import { FileUpload, FileUploadProps, UPLOAD_MODE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<FileUploadProps> = {
  title: 'Components/Dropzone/FileUpload',
  component: FileUpload,
  parameters: {
    readme: { content: dropzoneReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=4971-5434&m=dev',
    },
  },
  args: {
    mode: UPLOAD_MODE.Multiple,
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

type Story = StoryObj<FileUploadProps>;

function FileUploadWithFiles(args: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className={styles.wrapper}>
      <FileUpload {...args} onFilesUpload={setFiles}>
        <Button type='button' label='Загрузить' icon={<UploadSVG />} />
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
};
