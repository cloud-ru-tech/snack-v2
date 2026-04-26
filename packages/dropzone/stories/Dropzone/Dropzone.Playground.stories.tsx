import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { Dropzone, DropzoneProps, SIZE, UPLOAD_MODE } from '../../src';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';
import { DROPZONE_SLOT_CONTENT_TEST_ID, DROPZONE_TEST_ID } from './testIds';

const defaultChildren = <SlotContent />;

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
  args: {
    children: defaultChildren,
    disabled: false,
    mode: UPLOAD_MODE.Multiple,
    size: SIZE.M,
    'data-test-id': DROPZONE_TEST_ID,
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
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

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
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DROPZONE_SLOT_CONTENT_TEST_ID)).toBeVisible();
  },
};
