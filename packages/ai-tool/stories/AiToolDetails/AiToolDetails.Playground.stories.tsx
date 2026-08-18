import { AI_TOOL_DETAILS_STATE, AiToolDetails, AiToolDetailsProps, AiToolKeyValue } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SECRET_MASK, SECRET_VALUE } from '../secrets';
import { TEST_IDS } from '../testIds';

const BODY_ROWS = [
  ['region', 'ru-central1'],
  ['zone', 'ru-central1-a'],
  ['instance_type', 'standard-v3'],
  ['vcpu', '4'],
  ['ram', '8 GB'],
  ['disk', '100 GB SSD'],
  ['image', 'ubuntu-22-04-lts'],
  ['status', 'running'],
  ['created_at', '2026-06-08T17:00:00Z'],
  ['public_ip', '84.201.10.42'],
] as const;

const meta: Meta<typeof AiToolDetails> = {
  title: 'AI/AiTool/Atoms/AiToolDetails',
  component: AiToolDetails,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'create_instance',
    state: AI_TOOL_DETAILS_STATE.Default,
    scroll: true,
    showSecret: true,
    secretRevealed: false,
    'data-test-id': TEST_IDS.details,
  },
  argTypes: {
    onToggleSecret: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render(args: AiToolDetailsProps) {
    const [{ secretRevealed }, updateArgs] = useArgs<AiToolDetailsProps>();
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Свёрнутый блок инструмента. Тело выше 140px: при `scroll=true` оно прокручивается под фиксированной высотой,
            при `scroll=false` карточка растягивается по контенту. Кнопка-глаз раскрывает значение `token`.
          </DemoHint>
          <DemoActions block>
            <AiToolDetails
              {...args}
              secretRevealed={secretRevealed}
              onToggleSecret={() => updateArgs({ secretRevealed: !secretRevealed })}
            >
              {BODY_ROWS.map(([key, value]) => (
                <AiToolKeyValue key={key} label={key} value={value} />
              ))}
              <AiToolKeyValue label='token' value={secretRevealed ? SECRET_VALUE : SECRET_MASK} />
            </AiToolDetails>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiToolDetails>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.details)).toBeVisible();
  },
};
