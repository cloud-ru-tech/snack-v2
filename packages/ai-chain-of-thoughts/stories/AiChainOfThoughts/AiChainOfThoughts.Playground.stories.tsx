import { AiChainOfThoughts } from '@ds/ai-chain-of-thoughts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { CHAIN_DURATION, chainContentPreset } from './presets';

const meta: Meta<typeof AiChainOfThoughts> = {
  title: 'AI/AiChainOfThoughts/AiChainOfThoughts',
  component: AiChainOfThoughts,
  parameters: { layout: 'fullscreen' },
  args: {
    inProgress: true,
    broken: false,
    duration: CHAIN_DURATION,
    defaultOpen: true,
    children: 'content',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    label: { control: 'text' },
    brokenMessage: { control: 'text' },
    children: {
      control: 'select',
      options: ['none', 'content'],
      mapping: { none: undefined, content: chainContentPreset },
    },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Цепочка рассуждений агента: сворачиваемый заголовок «Размышляю» с длительностью и список строк-инструментов
          под ним.
        </DemoHint>
        <DemoActions block>
          <AiChainOfThoughts {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiChainOfThoughts>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
