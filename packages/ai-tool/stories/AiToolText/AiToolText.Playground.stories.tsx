import { AiToolText, AiToolTextProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolText> = {
  title: 'AI/AiTool/Content/AiToolText',
  component: AiToolText,
  parameters: { layout: 'fullscreen' },
  args: {
    children: 'TextBlock Text',
    error: false,
    mono: false,
    'data-test-id': TEST_IDS.text,
  },
  render: (args: AiToolTextProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Строка вывода инструмента. mono включает моноширинный шрифт для кода и данных, error подсвечивает текст
          красным.
        </DemoHint>
        <DemoActions align='start'>
          <AiToolText {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiToolText>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.text)).toBeVisible();
  },
};
