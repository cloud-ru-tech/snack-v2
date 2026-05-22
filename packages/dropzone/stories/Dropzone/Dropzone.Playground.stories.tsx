import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Dropzone, DropzoneProps, SIZE, UPLOAD_MODE } from '../../src';
import { TEST_IDS } from '../testIds';
import { SlotContent } from './SlotContent';
import styles from './styles.module.scss';

const defaultChildren = <SlotContent />;

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
  parameters: { layout: 'fullscreen' },
  args: {
    children: defaultChildren,
    disabled: false,
    mode: UPLOAD_MODE.Multiple,
    size: SIZE.M,
    'data-test-id': TEST_IDS.dropzone.root,
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
        <div className={styles.filesList} data-test-id={TEST_IDS.dropzone.filesList}>
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
        <DemoHint>Зона загрузки файлов с поддержкой drag-and-drop.</DemoHint>
        <DemoActions align='center'>
          <DropzoneWithFiles {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.dropzone.slotContent)).toBeVisible();
  },
};
