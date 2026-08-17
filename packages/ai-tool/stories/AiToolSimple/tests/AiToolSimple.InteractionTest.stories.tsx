import { AI_TOOL_ICON_TYPE, AiToolSimple, AiToolSimpleProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { badgesPreset, SIMPLE_DESCRIPTION, SIMPLE_NAME } from '../presets';

const meta: Meta<typeof AiToolSimple> = {
  title: 'AI/AiTool/AiToolSimple/Tests/Interaction',
  component: AiToolSimple,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    name: SIMPLE_NAME,
    icon: AI_TOOL_ICON_TYPE.Search,
    defaultOpen: false,
    onOpenChange: fn(),
    'data-test-id': TEST_IDS.simple,
  },
};

export default meta;
type Story = StoryObj<typeof AiToolSimple>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: (args: AiToolSimpleProps) => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Проверяет раскрытие описания и бейджей chevron-кнопкой мышью и с клавиатуры.</DemoHint>
        <DemoActions block>
          <AiToolSimple {...args} description={SIMPLE_DESCRIPTION}>
            {badgesPreset}
          </AiToolSimple>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const chevron = canvas.getByTestId(TEST_IDS.simpleChevron);

    await step('closed: details are absent', async () => {
      expect(canvas.queryByTestId(TEST_IDS.simpleDescription)).toBeNull();
      expect(canvas.queryByTestId(TEST_IDS.simpleContent)).toBeNull();
    });

    await step('click chevron: description and content appear, onOpenChange(true)', async () => {
      await userEvent.click(chevron);
      await expect(canvas.getByTestId(TEST_IDS.simpleDescription)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.simpleContent)).toBeVisible();
      expect(args.onOpenChange).toHaveBeenCalledTimes(1);
      expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    });

    await step('keyboard: Enter on focused chevron collapses details', async () => {
      chevron.focus();
      await userEvent.keyboard('{Enter}');
      expect(canvas.queryByTestId(TEST_IDS.simpleDescription)).toBeNull();
      expect(args.onOpenChange).toHaveBeenCalledTimes(2);
      expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
    });
  },
};
