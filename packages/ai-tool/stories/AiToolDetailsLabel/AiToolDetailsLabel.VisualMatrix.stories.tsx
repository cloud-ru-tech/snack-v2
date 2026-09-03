import { AI_TOOL_DETAILS_STATE, AiToolDetailsLabel } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolDetailsLabel> = {
  title: 'AI/AiTool/Atoms/AiToolDetailsLabel',
  component: AiToolDetailsLabel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolDetailsLabel>;

const states = Object.values(AI_TOOL_DETAILS_STATE);

const secretColumns = [
  {
    key: 'plain',
    header: 'COPY HIDDEN',
    copyValue: 'TextBlock Text',
    showCopyButton: false,
    showEyeButton: false,
    secretRevealed: false,
  },
  {
    key: 'copy',
    header: 'COPY',
    copyValue: 'TextBlock Text',
    showCopyButton: true,
    showEyeButton: false,
    secretRevealed: false,
  },
  {
    key: 'copy-empty',
    header: 'COPY VALUE EMPTY',
    copyValue: '',
    showCopyButton: true,
    showEyeButton: false,
    secretRevealed: false,
  },
  {
    key: 'hidden',
    header: 'SECRET HIDDEN',
    copyValue: undefined,
    showCopyButton: false,
    showEyeButton: true,
    secretRevealed: false,
  },
  {
    key: 'revealed',
    header: 'SECRET REVEALED',
    copyValue: undefined,
    showCopyButton: false,
    showEyeButton: true,
    secretRevealed: true,
  },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='State × Secret'
      firstColumnHeader='State'
      columnHeaders={secretColumns.map(c => c.header)}
      rows={states.map(state => ({
        variantLabel: state,
        cells: secretColumns.map(col => (
          <AiToolDetailsLabel
            key={`${state}-${col.key}`}
            label='part_name'
            state={state}
            copyValue={col.copyValue}
            showCopyButton={col.showCopyButton}
            showEyeButton={col.showEyeButton}
            secretRevealed={col.secretRevealed}
            data-test-id={`${TEST_IDS.detailsLabel}-${state}-${col.key}`}
          />
        )),
      }))}
    />
  ),
};
