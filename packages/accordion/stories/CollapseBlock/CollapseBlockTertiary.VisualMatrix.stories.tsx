import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Accordion, type CollapseBlockTertiaryProps } from '../../src';
import { CHEVRON } from '../../src/constants';

const meta: Meta<CollapseBlockTertiaryProps> = {
  title: 'Components/Accordion/CollapseBlockTertiary',
  component: Accordion.CollapseBlockTertiary,
  parameters: {},
};

export default meta;

type Story = StoryObj<CollapseBlockTertiaryProps>;

const chevrons = Object.values(CHEVRON);

type MatrixCellProps = Pick<CollapseBlockTertiaryProps, 'chevron'> & { id: string };

function CollapseBlockMatrixCell({ id, chevron = CHEVRON.After }: MatrixCellProps) {
  return (
    <Accordion>
      <Accordion.CollapseBlockTertiary id={id} title='Title' subTitle='Subtitle' chevron={chevron}>
        Content
      </Accordion.CollapseBlockTertiary>
    </Accordion>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Chevron placement'
      firstColumnHeader='Variant'
      columnHeaders={[...chevrons]}
      rows={[
        {
          variantLabel: 'Default',
          cells: chevrons.map(chevron => (
            <CollapseBlockMatrixCell key={chevron} id={`vm-chevron-${chevron}`} chevron={chevron} />
          )),
        },
      ]}
    />
  ),
  parameters: {
    controls: { disable: true },
  },
};
