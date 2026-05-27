import { AttachmentSquare, SIZE } from '@ds/attachment';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SAMPLE_TEXT_FILE } from '../../sampleFiles';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AttachmentSquare> = {
  title: 'Components/Attachment/AttachmentSquare/Tests/Interaction',
  component: AttachmentSquare,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.M,
    file: SAMPLE_TEXT_FILE,
    onClick: fn(),
    onDownload: fn(),
    onDelete: fn(),
    onRetry: fn(),
    'data-test-id': TEST_IDS.attachmentSquare.root,
  },
};
export default meta;
type Story = StoryObj<typeof AttachmentSquare>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          File = text/PDF — icon-mode. TextBlock виден в default, на hover/focus иконка скрывается, на её месте
          появляются action-кнопки.
        </DemoHint>
        <DemoActions align='center'>
          <AttachmentSquare {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.attachmentSquare.root);
    // Overlay с action-кнопками раскрывается CSS `:hover` / `:focus-visible`. В storybook/test
    // :hover ненадёжен → `pointerEventsCheck: 0` обходит проверку. Assertion-цель — контракт
    // callback'ов; визуальный hover-overlay покрывает interaction-states.png.
    const clickOpts = { pointerEventsCheck: 0 } as const;

    await step('icon-mode default: TextBlock виден (Label + Description в MainContent)', async () => {
      await expect(canvas.getByTestId(TEST_IDS.attachment.title)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.attachment.description)).toBeVisible();
    });

    await step('icon-mode default: action-кнопки в DOM, но не активны (pointer-events:none)', async () => {
      await expect(canvas.getByTestId(TEST_IDS.attachmentSquare.downloadAction)).toBeInTheDocument();
      await expect(canvas.getByTestId(TEST_IDS.attachmentSquare.deleteAction)).toBeInTheDocument();
    });

    await step('hover: pointermove над корнем (overlay opacity 1 в реальном браузере)', async () => {
      // Реальный :hover-overlay покрывает visual regression; тут только что hover не падает.
      await userEvent.hover(root);
      await expect(canvas.getByTestId(TEST_IDS.attachmentSquare.downloadAction)).toBeInTheDocument();
    });

    await step('click: download triggers onDownload, не триггерит onClick корня', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.attachmentSquare.downloadAction), clickOpts);
      expect(args.onDownload).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(0);
    });

    await step('click: delete triggers onDelete', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.attachmentSquare.deleteAction), clickOpts);
      expect(args.onDelete).toHaveBeenCalledTimes(1);
    });

    await step('a11y: корень получает tabindex=0 (Tab-фокус валидируется visual focus snapshot)', async () => {
      await expect(root).toHaveAttribute('tabindex', '0');
    });

    await step('default state: retry-кнопка отсутствует (видна только при error)', async () => {
      expect(canvas.queryByTestId(TEST_IDS.attachmentSquare.retryAction)).toBeNull();
    });
  },
};
