import { AiCodeDiff, SIZE } from '@ds/ai-code-diff';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof AiCodeDiff> = {
  title: 'AI/AiCodeDiff',
  component: AiCodeDiff,
};

export default meta;
type Story = StoryObj<typeof AiCodeDiff>;

const sizes = [SIZE.M, SIZE.S] as const;

const examples = [
  { label: '+83 / -26', added: 83, removed: 26 },
  { label: '+1200 / -48', added: 1200, removed: 48 },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Size'
      firstColumnHeader='Example'
      columnHeaders={[...sizes]}
      rows={examples.map(example => ({
        variantLabel: example.label,
        cells: sizes.map(size => <AiCodeDiff key={size} size={size} added={example.added} removed={example.removed} />),
      }))}
    />
  ),
};
