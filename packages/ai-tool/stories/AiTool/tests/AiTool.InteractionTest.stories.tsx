import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { callPreset, resultPreset, TOOL_NAME } from '../presets';

const meta: Meta<typeof AiTool> = {
  title: 'AI/AiTool/AiTool/Tests/Interaction',
  component: AiTool,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    name: TOOL_NAME,
    icon: AI_TOOL_ICON_TYPE.Search,
    state: AI_TOOL_STATUS_STATE.Success,
    duration: 9,
    defaultOpened: false,
    onToggle: fn(),
    'data-test-id': TEST_IDS.tool,
  },
};

export default meta;
type Story = StoryObj<typeof AiTool>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: (args: AiToolProps) => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Проверяет раскрытие блоков запроса и ответа chevron-кнопкой мышью и с клавиатуры.</DemoHint>
        <DemoActions block>
          <AiTool {...args} call={callPreset} result={resultPreset} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const chevron = canvas.getByTestId(TEST_IDS.toolChevron);

    await step('closed: details are absent', async () => {
      expect(canvas.queryByTestId(TEST_IDS.toolCall)).toBeNull();
      expect(canvas.queryByTestId(TEST_IDS.toolResult)).toBeNull();
    });

    await step('click chevron: details appear, onToggle(true)', async () => {
      await userEvent.click(chevron);
      await expect(canvas.getByTestId(TEST_IDS.toolCall)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.toolResult)).toBeVisible();
      expect(args.onToggle).toHaveBeenCalledTimes(1);
      expect(args.onToggle).toHaveBeenLastCalledWith(true);
    });

    await step('keyboard: Enter on focused chevron collapses details', async () => {
      chevron.focus();
      await userEvent.keyboard('{Enter}');
      expect(canvas.queryByTestId(TEST_IDS.toolCall)).toBeNull();
      expect(args.onToggle).toHaveBeenCalledTimes(2);
      expect(args.onToggle).toHaveBeenLastCalledWith(false);
    });
  },
};
