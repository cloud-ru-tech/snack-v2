import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { FileUpload, UPLOAD_MODE } from '../../../src';
import { TEST_IDS } from '../../testIds';

const meta: Meta = {
  title: 'Components/Dropzone/FileUpload/Tests/Interaction',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj;

const MULTIPLE_TRIGGER = TEST_IDS.fileUpload.trigger;
const SINGLE_TRIGGER = `${TEST_IDS.fileUpload.trigger}-single`;

const onFilesUploadMultiple = fn();
const onFilesUploadSingle = fn();

function fireChangeWithFiles(input: HTMLInputElement, files: File[]) {
  const dt = new DataTransfer();
  for (const f of files) dt.items.add(f);
  Object.defineProperty(input, 'files', { configurable: true, value: dt.files });
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>FileUpload InteractionTest</DemoTitle>
        <DemoHint>
          {
            'Multiple: триггер кликает по hidden input + change event вызывает onFilesUpload со всеми файлами. Single: hidden input без multiple=true.'
          }
        </DemoHint>
        <DemoActions align='center'>
          <FileUpload mode={UPLOAD_MODE.Multiple} onFilesUpload={onFilesUploadMultiple}>
            <Button data-test-id={MULTIPLE_TRIGGER} type='button' label='Upload (multiple)' />
          </FileUpload>
          <FileUpload mode={UPLOAD_MODE.Single} onFilesUpload={onFilesUploadSingle}>
            <Button data-test-id={SINGLE_TRIGGER} type='button' label='Upload (single)' />
          </FileUpload>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onFilesUploadMultiple.mockClear();
    onFilesUploadSingle.mockClear();

    const canvas = within(canvasElement);
    const triggerMultiple = canvas.getByTestId(MULTIPLE_TRIGGER);
    const triggerSingle = canvas.getByTestId(SINGLE_TRIGGER);
    // Каждый FileUpload рендерит свой native input; находим оба через test-id публичного слота.
    const inputs = canvas.getAllByTestId(TEST_IDS.fileUpload.nativeInput) as HTMLInputElement[];
    const [inputMultiple, inputSingle] = inputs;

    await step('multiple: hidden input rendered with multiple=true', async () => {
      expect(inputMultiple).toBeInstanceOf(HTMLInputElement);
      expect(inputMultiple.type).toBe('file');
      expect(inputMultiple.multiple).toBe(true);
    });

    await step('multiple: click on trigger calls click() on hidden file input', async () => {
      const clickSpy = fn();
      const origClick = inputMultiple.click.bind(inputMultiple);
      inputMultiple.click = (() => {
        clickSpy();
      }) as typeof inputMultiple.click;
      try {
        await userEvent.click(triggerMultiple);
        expect(clickSpy).toHaveBeenCalledTimes(1);
      } finally {
        inputMultiple.click = origClick;
      }
    });

    await step('multiple: file selection change event calls onFilesUpload with all files', async () => {
      const files = [new File(['1'], 'a.txt'), new File(['2'], 'b.txt')];
      fireChangeWithFiles(inputMultiple, files);
      expect(onFilesUploadMultiple).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: 'a.txt' }),
          expect.objectContaining({ name: 'b.txt' }),
        ]),
      );
    });

    await step('single mode: hidden input has multiple=false', async () => {
      expect(inputSingle.multiple).toBe(false);
      // Triggering click on single trigger should also call native click — sanity check via spy.
      const clickSpy = fn();
      const origClick = inputSingle.click.bind(inputSingle);
      inputSingle.click = (() => {
        clickSpy();
      }) as typeof inputSingle.click;
      try {
        await userEvent.click(triggerSingle);
        expect(clickSpy).toHaveBeenCalledTimes(1);
      } finally {
        inputSingle.click = origClick;
      }
    });
  },
};
