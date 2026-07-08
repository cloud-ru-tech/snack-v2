import { Markdown } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const SAMPLE = `## Code block

\`\`\`ts
export function add(a: number, b: number) {
  return a + b
}
\`\`\`
`;

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown/Markdown/Tests/Interaction',
  component: Markdown,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    value: SAMPLE,
    skipHtml: true,
    onCodeCopyClick: fn(),
    'data-test-id': TEST_IDS.viewer,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по copy-кнопке code-блока вызывает onCodeCopyClick с сырым кодом.</DemoHint>
        <DemoActions align='start'>
          <Markdown {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof Markdown>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const copy = canvas.getAllByTestId(TEST_IDS.viewerCodeCopy)[0];

    await step('click: copy button fires onCodeCopyClick with the raw code', async () => {
      await expect(copy).toBeVisible();
      await userEvent.click(copy);
      expect(args.onCodeCopyClick).toHaveBeenCalledTimes(1);
      expect(args.onCodeCopyClick).toHaveBeenCalledWith(expect.stringContaining('export function add'));
    });
  },
};
