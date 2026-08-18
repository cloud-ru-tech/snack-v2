import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolBadge> = {
  title: 'AI/AiTool/Atoms/AiToolBadge',
  component: AiToolBadge,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolBadge>;

const types = Object.values(AI_TOOL_BADGE_TYPE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='BadgeType'
      firstColumnHeader='—'
      columnHeaders={[...types.map(t => t.toUpperCase()), 'NO ICON']}
      rows={[
        {
          variantLabel: 'badge',
          cells: [
            ...types.map(badgeType => (
              <AiToolBadge
                key={badgeType}
                badgeType={badgeType}
                label='resource-name'
                data-test-id={`${TEST_IDS.badge}-${badgeType}`}
              />
            )),
            <AiToolBadge key='no-icon' label='resource-name' data-test-id={`${TEST_IDS.badge}-no-icon`} />,
          ],
        },
      ]}
    />
  ),
};
