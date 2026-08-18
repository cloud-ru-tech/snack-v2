import { AI_TOOL_KEY_VALUE_TYPE, AiToolKeyValue, AiToolKeyValueProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolKeyValue> = {
  title: 'AI/AiTool/Content/AiToolKeyValue',
  component: AiToolKeyValue,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Key',
    value: 'Value',
    variant: AI_TOOL_KEY_VALUE_TYPE.Line,
    'data-test-id': TEST_IDS.keyValue,
  },
  render: (args: AiToolKeyValueProps) => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Пара «ключ — значение» из аргументов инструмента. В режиме line значение выравнивается по правому краю, в
          column располагается под ключом.
        </DemoHint>
        <DemoActions block>
          <AiToolKeyValue {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiToolKeyValue>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.keyValue)).toBeVisible();
  },
};
