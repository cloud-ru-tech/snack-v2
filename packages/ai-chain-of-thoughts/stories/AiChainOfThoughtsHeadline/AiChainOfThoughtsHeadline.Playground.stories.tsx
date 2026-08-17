import { AiChainOfThoughtsHeadline } from '@ds/ai-chain-of-thoughts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { CHAIN_DURATION } from '../AiChainOfThoughts/presets';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiChainOfThoughtsHeadline> = {
  title: 'AI/AiChainOfThoughts/AiChainOfThoughtsHeadline',
  component: AiChainOfThoughtsHeadline,
  parameters: { layout: 'fullscreen' },
  args: {
    inProgress: true,
    broken: false,
    duration: CHAIN_DURATION,
    collapsible: true,
    open: false,
    onOpenChange: fn(),
    'data-test-id': TEST_IDS.headline,
  },
  argTypes: {
    onOpenChange: { table: { disable: true } },
    label: { control: 'text' },
    brokenMessage: { control: 'text' },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Заголовок цепочки рассуждений: иконка GigaChat, подпись «Размышляю» / «Размышлял», длительность и chevron.
        </DemoHint>
        <DemoActions block>
          <AiChainOfThoughtsHeadline {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiChainOfThoughtsHeadline>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.headline)).toBeVisible();
  },
};
