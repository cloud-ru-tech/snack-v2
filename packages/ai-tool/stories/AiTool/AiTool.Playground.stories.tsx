import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { callPreset, resultPreset, TOOL_DURATION, TOOL_NAME } from './presets';

const meta: Meta<typeof AiTool> = {
  title: 'AI/AiTool/AiTool',
  component: AiTool,
  parameters: { layout: 'fullscreen' },
  args: {
    name: TOOL_NAME,
    icon: AI_TOOL_ICON_TYPE.Search,
    state: AI_TOOL_STATUS_STATE.Loading,
    duration: TOOL_DURATION,
    defaultOpen: false,
    connector: false,
    callLabel: 'Запрос',
    resultLabel: 'Ответ',
    call: 'json',
    result: 'keyValue',
    'data-test-id': TEST_IDS.tool,
  },
  argTypes: {
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    name: { control: 'text' },
    icon: { control: 'select', options: Object.values(AI_TOOL_ICON_TYPE) },
    duration: { control: 'number' },
    callLabel: { control: 'text' },
    resultLabel: { control: 'text' },
    call: {
      control: 'select',
      options: ['none', 'json'],
      mapping: { none: undefined, json: callPreset },
    },
    result: {
      control: 'select',
      options: ['none', 'keyValue'],
      mapping: { none: undefined, keyValue: resultPreset },
    },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Составной инструмент стриминга: статус, иконка, имя, длительность и chevron; раскрытие показывает блоки
          запроса и ответа.
        </DemoHint>
        <DemoActions block>
          <AiTool {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiTool>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tool)).toBeVisible();
  },
};
