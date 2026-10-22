import { AiAttachment, AiAttachmentProps, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel, placeholderImage } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiAttachment> = {
  title: 'AI/AiAttachment',
  component: AiAttachment,
  parameters: { layout: 'fullscreen' },
  args: {
    type: ATTACHMENT_TYPE.File,
    state: ATTACHMENT_STATE.Default,
    fileName: 'quarterly-report-final.pdf',
    src: placeholderImage(88, 88, 'image'),
    tooltip: 'PDF, 2 МБ',
    onRemove: fn(),
    onRetry: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    type: { control: 'radio', options: Object.values(ATTACHMENT_TYPE) },
    state: { control: 'radio', options: Object.values(ATTACHMENT_STATE) },
    icon: { table: { disable: true } },
    onRemove: { table: { disable: true } },
    onRetry: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  render: (args: AiAttachmentProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='center'>
          <AiAttachment {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiAttachment>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
