import { Button } from '@ds/button';
import { UploadSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { FileRejection, FileUpload, UPLOAD_MODE } from '../../../src';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload/Examples/FormField',
  component: FileUpload,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

const MAX_SIZE = 5 * 1024 * 1024;

function FormFieldDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReject = (rejections: FileRejection[]) => {
    const [first] = rejections;
    setError(first?.reason === 'maxSize' ? 'Файл больше 5 МБ' : 'Недопустимый тип файла');
  };

  return (
    <div className={styles.wrapper}>
      <FileUpload
        data-test-id={TEST_IDS.fileUpload.root}
        name='resume'
        id='resume'
        required
        mode={UPLOAD_MODE.Single}
        accept={['.pdf', '.doc', '.docx']}
        maxSize={MAX_SIZE}
        onFilesReject={handleReject}
        onFilesUpload={files => {
          if (!files.length) return;
          setError(null);
          setFile(files[0]);
        }}
      >
        <Button
          data-test-id={TEST_IDS.fileUpload.trigger}
          type='button'
          label='Прикрепить резюме'
          icon={<UploadSVG />}
        />
      </FileUpload>

      {file && (
        <div className={styles.filesList} data-test-id={TEST_IDS.fileUpload.filesList}>
          {file.name}
        </div>
      )}
      {error && (
        <div className={styles.error} data-test-id={TEST_IDS.fileUpload.error}>
          {error}
        </div>
      )}
    </div>
  );
}

export const FormField: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>FormField</DemoTitle>
        <DemoHint>
          Поле формы: нативные <code>name</code>/<code>id</code>/<code>required</code>, валидация <code>accept</code> +{' '}
          <code>maxSize</code>, отказ через <code>onFilesReject</code>.
        </DemoHint>
        <DemoActions align='center'>
          <FormFieldDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fileUpload.trigger)).toBeVisible();
  },
};
