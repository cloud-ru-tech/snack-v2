import { AiChainOfThoughts, AiChainOfThoughtsProps } from '@ds/ai-chain-of-thoughts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { CHAIN_DURATION, chainContentPreset } from '../presets';

const meta: Meta<typeof AiChainOfThoughts> = {
  title: 'AI/AiChainOfThoughts/AiChainOfThoughts/Tests/Interaction',
  component: AiChainOfThoughts,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    inProgress: true,
    duration: CHAIN_DURATION,
    defaultOpen: false,
    onOpenChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiChainOfThoughts>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: (args: AiChainOfThoughtsProps) => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Проверяет раскрытие контент-цепочки chevron-кнопкой заголовка мышью и с клавиатуры.</DemoHint>
        <DemoActions block>
          <AiChainOfThoughts {...args}>{chainContentPreset}</AiChainOfThoughts>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const chevron = canvas.getByTestId(TEST_IDS.headlineChevron);

    await step('closed: content is absent', async () => {
      expect(canvas.queryByTestId(TEST_IDS.content)).toBeNull();
    });

    await step('click chevron: content appears, onOpenChange(true)', async () => {
      await userEvent.click(chevron);
      await expect(canvas.getByTestId(TEST_IDS.content)).toBeVisible();
      expect(args.onOpenChange).toHaveBeenCalledTimes(1);
      expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    });

    await step('keyboard: Enter on focused chevron collapses content', async () => {
      chevron.focus();
      await userEvent.keyboard('{Enter}');
      expect(canvas.queryByTestId(TEST_IDS.content)).toBeNull();
      expect(args.onOpenChange).toHaveBeenCalledTimes(2);
      expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
    });
  },
};
