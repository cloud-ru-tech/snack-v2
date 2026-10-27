import { AiHistoryLineIndicator } from '@ds/ai-history-line';
import { Avatar } from '@ds/avatar';
import { BulletListSVG } from '@ds/icons/interface/system';
import { BranchSVG } from '@ds/icons/interface/web';
import { ClaudeSonnetLogo } from '@ds/icons/logos';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

const meta: Meta<typeof AiHistoryLineIndicator> = {
  title: 'Components/AiHistoryLine/AiHistoryLineIndicator',
  component: AiHistoryLineIndicator,
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineIndicator>;

function mark(label: string): ReactElement {
  if (label === 'Avatar') return <Avatar name='W' size='s' shape='rounded' appearance='neutral' />;
  if (label === 'Agent') return <ClaudeSonnetLogo size={16} aria-hidden />;
  if (label === 'Accordeon') return <BulletListSVG aria-hidden />;
  return <BranchSVG aria-hidden />;
}

const marks = ['Avatar', 'Agent', 'Accordeon', 'Checkpoint'];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='active'
      firstColumnHeader='Содержимое'
      columnHeaders={['no', 'yes']}
      rows={marks.map(label => ({
        variantLabel: label,
        cells: [
          <AiHistoryLineIndicator key={`${label}-no`} background={label !== 'Avatar'}>
            {mark(label)}
          </AiHistoryLineIndicator>,
          <AiHistoryLineIndicator key={`${label}-yes`} active background={label !== 'Avatar'}>
            {mark(label)}
          </AiHistoryLineIndicator>,
        ],
      }))}
    />
  ),
};
