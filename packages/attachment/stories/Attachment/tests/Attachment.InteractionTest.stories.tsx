import { Attachment, SIZE } from '@ds/attachment';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SAMPLE_TEXT_FILE } from '../../sampleFiles';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Attachment> = {
  title: 'Components/Attachment/Attachment/Tests/Interaction',
  component: Attachment,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.S,
    file: SAMPLE_TEXT_FILE,
    onClick: fn(),
    onDownload: fn(),
    onDelete: fn(),
    onRetry: fn(),
    'data-test-id': TEST_IDS.attachment.root,
  },
};
export default meta;
type Story = StoryObj<typeof Attachment>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Action-кнопки видны всегда (Figma 5778:49170); клик не пробрасывает onClick корня.</DemoHint>
        <DemoActions align='center'>
          <Attachment {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: download triggers onDownload, не триггерит onClick корня', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.attachment.downloadAction));
      expect(args.onDownload).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(0);
    });

    await step('click: delete triggers onDelete, не триггерит onClick корня', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.attachment.deleteAction));
      expect(args.onDelete).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(0);
    });

    await step('default state: retry-кнопка отсутствует (видна только при error)', async () => {
      expect(canvas.queryByTestId(TEST_IDS.attachment.retryAction)).toBeNull();
    });
  },
};
