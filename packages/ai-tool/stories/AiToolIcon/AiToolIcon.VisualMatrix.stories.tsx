import { AI_TOOL_ICON_TYPE, AiToolIcon } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolIcon> = {
  title: 'AI/AiToolElements/Atoms/AiToolIcon',
  component: AiToolIcon,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolIcon>;

const types = Object.values(AI_TOOL_ICON_TYPE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Variant'
      firstColumnHeader='—'
      columnHeaders={types.map(t => t.toUpperCase())}
      rows={[
        {
          variantLabel: 'icon',
          cells: types.map(type => <AiToolIcon key={type} variant={type} data-test-id={`${TEST_IDS.icon}-${type}`} />),
        },
      ]}
    />
  ),
};
