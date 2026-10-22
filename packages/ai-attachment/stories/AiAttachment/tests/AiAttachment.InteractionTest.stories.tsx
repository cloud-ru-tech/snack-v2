import { AiAttachment, AiAttachmentProps, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiAttachment> = {
  title: 'AI/AiAttachment/Tests/Interaction',
  component: AiAttachment,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    type: ATTACHMENT_TYPE.File,
    state: ATTACHMENT_STATE.Error,
    fileName: 'report.pdf',
    onRemove: fn(),
    onRetry: fn(),
    onClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiAttachment>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: (args: AiAttachmentProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Плитка сообщает о нажатии крестика, повтора и самой плитки отдельно.</DemoHint>
        <DemoActions align='center'>
          <AiAttachment {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('retry: fires onRetry only', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.retry));
      expect(args.onRetry).toHaveBeenCalledTimes(1);
      expect(args.onClick).not.toHaveBeenCalled();
    });

    await step('remove: fires onRemove only', async () => {
      await userEvent.hover(canvas.getByTestId(TEST_IDS.root));
      await userEvent.click(canvas.getByTestId(TEST_IDS.remove));
      expect(args.onRemove).toHaveBeenCalledTimes(1);
      expect(args.onClick).not.toHaveBeenCalled();
    });

    await step('keyboard: Enter on the tile fires onClick', async () => {
      canvas.getByTestId(TEST_IDS.root).focus();
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};
