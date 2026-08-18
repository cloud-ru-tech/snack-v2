import { AI_TOOL_DETAILS_STATE, AiToolDetailsLabel, AiToolDetailsLabelProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolDetailsLabel> = {
  title: 'AI/AiTool/Atoms/AiToolDetailsLabel',
  component: AiToolDetailsLabel,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Ответ',
    state: AI_TOOL_DETAILS_STATE.Default,
    showSecret: true,
    secretRevealed: false,
    'data-test-id': TEST_IDS.detailsLabel,
  },
  argTypes: {
    onToggleSecret: { table: { disable: true } },
  },
  render: function Render(args: AiToolDetailsLabelProps) {
    const [{ secretRevealed }, updateArgs] = useArgs<AiToolDetailsLabelProps>();
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Заголовок части блока деталей — обычно «Запрос» или «Ответ». Кнопка-глаз переключает показ секретных
            значений в теле блока: зачёркнутый глаз — секреты скрыты, открытый — показаны.
          </DemoHint>
          <DemoActions align='start'>
            <AiToolDetailsLabel
              {...args}
              secretRevealed={secretRevealed}
              onToggleSecret={() => updateArgs({ secretRevealed: !secretRevealed })}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiToolDetailsLabel>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.detailsLabel)).toBeVisible();
  },
};
