import { AiButtonChevron } from '@ds/ai-button-chevron';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiButtonChevron> = {
  title: 'AI/ButtonChevron',
  component: AiButtonChevron,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiButtonChevron>;

const openStates = [false, true] as const;
const stateRows = [
  { key: 'default', extra: {} as const },
  { key: 'disabled', extra: { disabled: true } as const },
] as const;

function renderCell(props: Parameters<typeof AiButtonChevron>[0], testId: string): ReactElement {
  return <AiButtonChevron {...props} data-test-id={testId} />;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='State × Open'
      firstColumnHeader='State'
      columnHeaders={openStates.map(o => (o ? 'OPEN' : 'CLOSED'))}
      rows={stateRows.map(({ key, extra }) => ({
        variantLabel: key,
        cells: openStates.map(open =>
          renderCell({ ...extra, open }, `${TEST_IDS.root}-${key}-${open ? 'open' : 'closed'}`),
        ),
      }))}
    />
  ),
};
