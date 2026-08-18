import { AI_TOOL_ICON_TYPE, AiToolIcon, AiToolIconProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolIcon> = {
  title: 'AI/AiTool/Atoms/AiToolIcon',
  component: AiToolIcon,
  parameters: { layout: 'fullscreen' },
  args: {
    variant: AI_TOOL_ICON_TYPE.Reasoning,
    'data-test-id': TEST_IDS.icon,
  },
  argTypes: {
    variant: { control: 'select', options: Object.values(AI_TOOL_ICON_TYPE) },
  },
  render: (args: AiToolIconProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Иконка типа инструмента — 16×16, цвет наследуется от текста. Переключайте variant, чтобы увидеть все типы:
          reasoning, search, read, act, security, wait.
        </DemoHint>
        <DemoActions align='center'>
          <AiToolIcon {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiToolIcon>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.icon)).toBeVisible();
  },
};
