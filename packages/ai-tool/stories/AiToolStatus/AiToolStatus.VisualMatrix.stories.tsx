import { AI_TOOL_STATUS_STATE, AiToolStatus } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolStatus> = {
  title: 'AI/AiTool/Atoms/AiToolStatus',
  component: AiToolStatus,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolStatus>;

const states = Object.values(AI_TOOL_STATUS_STATE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='State'
      firstColumnHeader='—'
      columnHeaders={states.map(s => s.toUpperCase())}
      rows={[
        {
          variantLabel: 'status',
          cells: states.map(state => (
            <AiToolStatus key={state} state={state} data-test-id={`${TEST_IDS.status}-${state}`} />
          )),
        },
      ]}
    />
  ),
};
