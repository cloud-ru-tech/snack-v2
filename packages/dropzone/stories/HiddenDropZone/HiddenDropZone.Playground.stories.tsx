import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HiddenDropZone, HiddenDropZoneProps, UPLOAD_MODE } from '../../src';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const defaultContent = (
  <div data-test-id={TEST_IDS.hiddenDropZone.description} className={styles.contentDescription}>
    Перетащите файлы на форму, чтобы прикрепить их
  </div>
);

const meta: Meta<typeof HiddenDropZone> = {
  title: 'Components/Dropzone/HiddenDropZone',
  component: HiddenDropZone,
  parameters: { layout: 'fullscreen' },
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
  },
};

export default meta;

type Story = StoryObj<typeof HiddenDropZone>;

function HiddenDropZoneWithFiles(args: HiddenDropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className={styles.wrapper}>
      <HiddenDropZone {...args} onFilesUpload={setFiles}>
        <div id='form' className={styles.card} data-test-id={TEST_IDS.hiddenDropZone.form}>
          <form className={styles.form}>
            <label htmlFor='firstName'>Имя</label>
            <input id='firstName' type='text' />
            <label htmlFor='lastName'>Фамилия</label>
            <input id='lastName' type='text' />
          </form>
        </div>
      </HiddenDropZone>

      <div className={styles.dropHint}>Перетащите файлы на форму чтобы прикрепить вложения</div>

      {files.length > 0 && (
        <div className={styles.filesList} data-test-id={TEST_IDS.hiddenDropZone.filesList}>
          Прикреплено: {files.map(f => f.name).join(', ')}
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
        <DemoHint>Скрытая зона загрузки поверх произвольного контента.</DemoHint>
        <DemoActions align='center'>
          <HiddenDropZoneWithFiles {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.hiddenDropZone.form)).toBeVisible();
  },
};
