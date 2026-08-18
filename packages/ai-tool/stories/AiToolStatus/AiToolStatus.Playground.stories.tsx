import { AI_TOOL_STATUS_STATE, AiToolStatus, AiToolStatusProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolStatus> = {
  title: 'AI/AiTool/Atoms/AiToolStatus',
  component: AiToolStatus,
  parameters: { layout: 'fullscreen' },
  args: {
    state: AI_TOOL_STATUS_STATE.Loading,
    'data-test-id': TEST_IDS.status,
  },
  render: (args: AiToolStatusProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Индикатор состояния шага инструмента. Состояние loading пульсирует, остальные показывают статичную точку
          своего цвета: pending — серый, success — зелёный, error — красный.
        </DemoHint>
        <DemoActions align='center'>
          <AiToolStatus {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiToolStatus>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.status)).toBeVisible();
  },
};
