import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

function WithAttachmentsScenario() {
  const [value, setValue] = useState('Прикладываю материалы по задаче');
  const [files, setFiles] = useState<File[]>(() => [
    new File(['report'], 'report.pdf', { type: 'application/pdf' }),
    new File(['data'], 'data.csv', { type: 'text/csv' }),
    new File(['notes'], 'notes.txt', { type: 'text/plain' }),
  ]);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>With attachments</DemoTitle>
        <DemoHint>
          Файлы уже прикреплены: удаление по крестику, добавление через скрепку, отправка очищает поле.
        </DemoHint>
        <DemoActions block>
          <div className={styles.panel}>
            <FieldChat
              data-test-id={TEST_IDS.fieldChat}
              value={value}
              onChange={setValue}
              handleSubmit={() => {
                setValue('');
                setFiles([]);
              }}
              attachment={{
                files,
                accept: 'image/*,.pdf',
                onFilesUpload: uploaded => setFiles(prev => [...prev, ...uploaded]),
                onFileDelete: file => setFiles(prev => prev.filter(item => item !== file)),
              }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldChat> = {
  title: 'Uikit Product/FieldsPredefined/FieldChat/Examples/WithAttachments',
  component: FieldChat,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldChat>;

export const WithAttachments: Story = {
  tags: ['dev', 'test'],
  render: () => <WithAttachmentsScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldChat)).toBeVisible();
  },
};
