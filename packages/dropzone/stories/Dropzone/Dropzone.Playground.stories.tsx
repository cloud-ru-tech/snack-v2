import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import dropzoneReadme from '../../README.md?raw';
import { Dropzone, DropzoneProps, SIZE, UPLOAD_MODE } from '../../src';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';

const defaultChildren = <SlotContent />;

const meta: Meta<DropzoneProps> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
  parameters: {
    readme: { content: dropzoneReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=4971-5434&m=dev',
    },
  },
  args: {
    children: defaultChildren,
    disabled: false,
    mode: UPLOAD_MODE.Multiple,
    size: SIZE.M,
  },
  argTypes: {
    children: { table: { disable: true } },
    disabled: { control: 'boolean', description: 'Деактивирован' },
    mode: {
      control: 'select',
      options: Object.values(UPLOAD_MODE),
      description: 'Режим загрузки',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    accept: { control: 'text', description: 'Типы файлов (например image/*)' },
    _storybookForceOver: {
      table: { disable: true },
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;

type Story = StoryObj<DropzoneProps>;

function DropzoneWithFiles(args: DropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className={styles.wrapper}>
      <Dropzone {...args} onFilesUpload={setFiles}>
        {args.children}
      </Dropzone>

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
  render: args => <DropzoneWithFiles {...args} />,
};
