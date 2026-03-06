import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import dropzoneReadme from '../../README.md?raw';
import { HiddenDropZone, HiddenDropZoneProps, UPLOAD_MODE } from '../../src';
import styles from './styles.module.scss';

const defaultContent = (
  <>
    <h4 data-test-id='title' className={styles.contentTitle}>
      Загрузите вложения
    </h4>
    <div data-test-id='description' className={styles.contentDescription}>
      Перетащите файлы на форму, чтобы прикрепить их
    </div>
  </>
);

const meta: Meta<HiddenDropZoneProps> = {
  title: 'Components/Dropzone/HiddenDropZone',
  component: HiddenDropZone,
  parameters: {
    readme: { content: dropzoneReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=4971-5434&m=dev',
    },
  },
  args: {
    content: defaultContent,
    disabled: false,
    mode: UPLOAD_MODE.Multiple,
  },
  argTypes: {
    content: { table: { disable: true } },
    children: { table: { disable: true } },
    disabled: { control: 'boolean', description: 'Деактивирован' },
    mode: {
      control: 'select',
      options: Object.values(UPLOAD_MODE),
      description: 'Режим загрузки',
    },
    accept: { control: 'text', description: 'Типы файлов' },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
    _storybookForceOver: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<HiddenDropZoneProps>;

function HiddenDropZoneWithFiles(args: HiddenDropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className={styles.wrapper}>
      <HiddenDropZone {...args} onFilesUpload={setFiles}>
        <div id='form' className={styles.card} data-test-id='hidden-dropzone-form'>
          <form className={styles.form}>
            <label htmlFor='firstName'>Имя</label>
            <input id='firstName' type='text' />
            <label htmlFor='lastName'>Фамилия</label>
            <input id='lastName' type='text' />
          </form>
        </div>
      </HiddenDropZone>
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
  render: args => <HiddenDropZoneWithFiles {...args} />,
};
