import { TEST_IDS as ATTACHMENT_TEST_IDS } from '@ds/attachment';
import { TEST_IDS as DROPZONE_TEST_IDS } from '@ds/dropzone';
import { UploadFiles } from '@ds/uikit-product-upload-files';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { mockUpload, PDF_TXT_ACCEPT, STORY_DEFAULTS } from '../helpers';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

function Render(args: React.ComponentProps<typeof UploadFiles>) {
  const [value, setValue] = useState(args.value ?? []);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Выбор файла валидирует его и рендерит вложение; неподдерживаемый формат даёт вложение с ошибкой; удаление убирает вложение.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.uploadFilesStory}>
            <UploadFiles
              {...args}
              value={value}
              onChange={items => {
                setValue(items);
                args.onChange?.(items);
              }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof UploadFiles> = {
  title: 'Uikit Product/UploadFiles/Tests/Interaction',
  component: UploadFiles,
  globals: { language: 'ru-RU' },
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: args => <Render {...args} />,
  args: {
    ...STORY_DEFAULTS,
    accept: PDF_TXT_ACCEPT,
    'data-test-id': TEST_IDS.root,
    onChange: fn(),
    upload: mockUpload,
  },
};

export default meta;
type Story = StoryObj<typeof UploadFiles>;

function fireFileSelect(input: HTMLInputElement, files: File[]) {
  const dt = new DataTransfer();
  for (const file of files) dt.items.add(file);
  Object.defineProperty(input, 'files', { configurable: true, value: dt.files });
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    (args.onChange as ReturnType<typeof fn>).mockClear();

    const canvas = within(canvasElement);
    const input = canvas.getByTestId(DROPZONE_TEST_IDS.dropzone.nativeInput) as HTMLInputElement;

    await step('selecting a valid file calls onChange and renders an attachment', async () => {
      fireFileSelect(input, [new File(['pdf'], 'report.pdf', { type: 'application/pdf' })]);
      expect(args.onChange).toHaveBeenCalled();
      await waitFor(() => expect(canvas.getAllByTestId(TEST_IDS.attachment).length).toBeGreaterThan(0));
    });

    await step('selecting an unsupported format renders an attachment with an error', async () => {
      fireFileSelect(input, [new File(['jpg'], 'photo.jpg', { type: 'image/jpeg' })]);
      await waitFor(() => {
        const errored = canvas
          .getAllByTestId(TEST_IDS.attachment)
          .filter(el => el.getAttribute('data-attachment-error') === 'true');
        expect(errored.length).toBeGreaterThan(0);
      });
    });

    await step('deleting an attachment removes it', async () => {
      const before = canvas.getAllByTestId(TEST_IDS.attachment).length;
      const deleteButtons = canvas.getAllByTestId(ATTACHMENT_TEST_IDS.deleteAction);
      await userEvent.click(deleteButtons[deleteButtons.length - 1]);
      await waitFor(() => expect(canvas.getAllByTestId(TEST_IDS.attachment).length).toBe(before - 1));
    });
  },
};
