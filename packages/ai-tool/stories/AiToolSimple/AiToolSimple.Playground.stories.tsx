import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiToolSimple } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { badgesPreset, SIMPLE_DESCRIPTION, SIMPLE_NAME } from './presets';

const meta: Meta<typeof AiToolSimple> = {
  title: 'AI/AiTool/AiToolSimple',
  component: AiToolSimple,
  parameters: { layout: 'fullscreen' },
  args: {
    name: SIMPLE_NAME,
    icon: AI_TOOL_ICON_TYPE.Search,
    state: AI_TOOL_STATUS_STATE.Pending,
    description: SIMPLE_DESCRIPTION,
    defaultOpened: false,
    connector: false,
    children: 'badges',
    'data-test-id': TEST_IDS.simple,
  },
  argTypes: {
    opened: { table: { disable: true } },
    onToggle: { table: { disable: true } },
    name: { control: 'text' },
    icon: { control: 'select', options: Object.values(AI_TOOL_ICON_TYPE) },
    description: { control: 'text' },
    children: {
      control: 'select',
      options: ['none', 'badges'],
      mapping: { none: undefined, badges: badgesPreset },
    },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Компактный инструмент стриминга: иконка типа, имя и chevron; раскрытие показывает описание и бейджи ресурсов.
        </DemoHint>
        <DemoActions block>
          <AiToolSimple {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiToolSimple>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.simple)).toBeVisible();
  },
};
