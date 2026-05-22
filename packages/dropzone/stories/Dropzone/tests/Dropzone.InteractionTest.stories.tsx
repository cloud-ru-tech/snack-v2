/* eslint-disable @typescript-eslint/no-non-null-assertion -- test fixtures intentionally assert preconditions */
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Dropzone, UPLOAD_MODE } from '../../../src';
import { TEST_IDS } from '../../testIds';
import { SlotContent } from '../SlotContent';

function makeFile(name: string, type = 'text/plain', content = 'hello') {
  return new File([content], name, { type });
}

function buildDataTransfer(files: File[]): DataTransfer {
  const dt = new DataTransfer();
  for (const f of files) dt.items.add(f);
  return dt;
}

function fireDragEvent(target: Element, type: 'dragover' | 'dragleave' | 'drop', files: File[]) {
  const dataTransfer = buildDataTransfer(files);
  const event = new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer });
  if (!event.dataTransfer) {
    Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
  }
  target.dispatchEvent(event);
}

const meta: Meta = {
  title: 'Components/Dropzone/Dropzone/Tests/Interaction',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

const SINGLE_TEST_ID = `${TEST_IDS.dropzone.root}-single`;
const DISABLED_TEST_ID = `${TEST_IDS.dropzone.root}-disabled`;

const onFilesUploadMultiple = fn();
const onFilesUploadSingle = fn();
const onFilesUploadDisabled = fn();

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Dropzone</DemoTitle>
        <DemoHint>
          {'Сценарии: multiple drop / single mode (берётся 1 файл) / disabled (события игнорируются).'}
        </DemoHint>
        <DemoActions align='center'>
          <Dropzone
            data-test-id={TEST_IDS.dropzone.root}
            mode={UPLOAD_MODE.Multiple}
            onFilesUpload={onFilesUploadMultiple}
          >
            <SlotContent />
          </Dropzone>
          <Dropzone data-test-id={SINGLE_TEST_ID} mode={UPLOAD_MODE.Single} onFilesUpload={onFilesUploadSingle}>
            <SlotContent />
          </Dropzone>
          <Dropzone data-test-id={DISABLED_TEST_ID} disabled onFilesUpload={onFilesUploadDisabled}>
            <SlotContent />
          </Dropzone>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onFilesUploadMultiple.mockClear();
    onFilesUploadSingle.mockClear();
    onFilesUploadDisabled.mockClear();

    const canvas = within(canvasElement);
    const dzMultiple = canvas.getByTestId(TEST_IDS.dropzone.root);
    const dzSingle = canvas.getByTestId(SINGLE_TEST_ID);
    const dzDisabled = canvas.getByTestId(DISABLED_TEST_ID);

    await step('multiple: drag over sets data-over=true', async () => {
      fireDragEvent(dzMultiple, 'dragover', [makeFile('a.txt')]);
      await waitFor(() => expect(dzMultiple).toHaveAttribute('data-over', 'true'));
    });

    await step('multiple: drag leave clears data-over', async () => {
      fireDragEvent(dzMultiple, 'dragleave', []);
      await waitFor(() => expect(dzMultiple).not.toHaveAttribute('data-over'));
    });

    await step('multiple: drop multiple files calls onFilesUpload with all files', async () => {
      const files = [makeFile('a.txt'), makeFile('b.txt')];
      fireDragEvent(dzMultiple, 'drop', files);
      await waitFor(() =>
        expect(onFilesUploadMultiple).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ name: 'a.txt' }),
            expect.objectContaining({ name: 'b.txt' }),
          ]),
        ),
      );
    });

    await step('single mode: drop multiple keeps only first file', async () => {
      const files = [makeFile('first.txt'), makeFile('second.txt'), makeFile('third.txt')];
      fireDragEvent(dzSingle, 'drop', files);
      await waitFor(() =>
        expect(onFilesUploadSingle).toHaveBeenCalledWith(
          expect.arrayContaining([expect.objectContaining({ name: 'first.txt' })]),
        ),
      );
      expect(onFilesUploadSingle.mock.calls[0]![0]).toHaveLength(1);
    });

    await step('disabled: data-disabled is set, aria-disabled engaged', async () => {
      await expect(dzDisabled).toHaveAttribute('data-disabled', 'true');
      await expect(dzDisabled).toBeDisabled();
    });

    await step('disabled: dragover does not flip data-over', async () => {
      fireDragEvent(dzDisabled, 'dragover', [makeFile('a.txt')]);
      await new Promise(r => setTimeout(r, 50));
      expect(dzDisabled).not.toHaveAttribute('data-over');
    });

    await step('disabled: drop is ignored, onFilesUpload not called', async () => {
      fireDragEvent(dzDisabled, 'drop', [makeFile('a.txt')]);
      await new Promise(r => setTimeout(r, 50));
      expect(onFilesUploadDisabled).not.toHaveBeenCalled();
    });

    await step('disabled: click does not open file picker', async () => {
      await userEvent.click(dzDisabled, { pointerEventsCheck: 0 });
      expect(onFilesUploadDisabled).not.toHaveBeenCalled();
    });
  },
};
