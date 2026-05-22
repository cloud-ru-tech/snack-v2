import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HiddenDropZone, UPLOAD_MODE } from '../../../src';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

function makeFile(name: string, type = 'text/plain', content = 'hi') {
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

const ENABLED_ROOT = TEST_IDS.hiddenDropZone.root;
const DISABLED_ROOT = `${TEST_IDS.hiddenDropZone.root}-disabled`;
const ENABLED_FORM = TEST_IDS.hiddenDropZone.form;
const DISABLED_FORM = `${TEST_IDS.hiddenDropZone.form}-disabled`;

const onFilesUploadEnabled = fn();
const onFilesUploadDisabled = fn();

const meta: Meta = {
  title: 'Components/Dropzone/HiddenDropZone/Tests/Interaction',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>HiddenDropZone</DemoTitle>
        <DemoHint>
          {
            'Сценарии: enabled (dragover показывает overlay, drop вызывает onFilesUpload) и disabled (события игнорируются).'
          }
        </DemoHint>
        <DemoActions align='center'>
          <HiddenDropZone
            data-test-id={ENABLED_ROOT}
            mode={UPLOAD_MODE.Multiple}
            onFilesUpload={onFilesUploadEnabled}
            content={<div data-test-id={TEST_IDS.hiddenDropZone.overlayContent}>Drop files</div>}
          >
            <div data-test-id={ENABLED_FORM} className={styles.formArea}>
              Form area (enabled)
            </div>
          </HiddenDropZone>
          <HiddenDropZone
            data-test-id={DISABLED_ROOT}
            disabled
            onFilesUpload={onFilesUploadDisabled}
            content={<div data-test-id={`${TEST_IDS.hiddenDropZone.overlayContent}-disabled`}>Drop files</div>}
          >
            <div data-test-id={DISABLED_FORM} className={styles.formArea}>
              Form area (disabled)
            </div>
          </HiddenDropZone>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onFilesUploadEnabled.mockClear();
    onFilesUploadDisabled.mockClear();

    const canvas = within(canvasElement);
    const enabledRoot = canvas.getByTestId(ENABLED_ROOT);
    const disabledRoot = canvas.getByTestId(DISABLED_ROOT);

    await step('enabled: drag over wrapper reveals overlay with content', async () => {
      fireDragEvent(enabledRoot, 'dragover', [makeFile('a.txt')]);
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.hiddenDropZone.overlayContent)).toBeVisible());
    });

    await step('enabled: drop on overlay calls onFilesUpload, overlay disappears', async () => {
      const overlayContent = canvas.getByTestId(TEST_IDS.hiddenDropZone.overlayContent);
      // Drop event bubbles up — dispatch on overlay content directly.
      fireDragEvent(overlayContent, 'drop', [makeFile('a.txt'), makeFile('b.txt')]);
      await waitFor(() =>
        expect(onFilesUploadEnabled).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ name: 'a.txt' }),
            expect.objectContaining({ name: 'b.txt' }),
          ]),
        ),
      );
      await waitFor(() => expect(canvas.queryByTestId(TEST_IDS.hiddenDropZone.overlayContent)).toBeNull());
    });

    await step('disabled: dragover does not reveal overlay', async () => {
      fireDragEvent(disabledRoot, 'dragover', [makeFile('a.txt')]);
      await new Promise(r => setTimeout(r, 50));
      expect(canvas.queryByTestId(`${TEST_IDS.hiddenDropZone.overlayContent}-disabled`)).toBeNull();
    });

    await step('disabled: drop is ignored', async () => {
      fireDragEvent(disabledRoot, 'drop', [makeFile('a.txt')]);
      await new Promise(r => setTimeout(r, 50));
      expect(onFilesUploadDisabled).not.toHaveBeenCalled();
    });
  },
};
