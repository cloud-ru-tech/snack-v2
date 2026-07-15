import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Accordion, CollapseBlockTertiaryProps } from '../../src';
import { CHEVRON_POSITION } from '../../src/constants';

const meta: Meta<CollapseBlockTertiaryProps> = {
  title: 'Components/Accordion/CollapseBlockTertiary',
  component: Accordion.CollapseBlockTertiary,
  parameters: { controls: { disable: true } },
};

export default meta;

type Story = StoryObj<CollapseBlockTertiaryProps>;

const chevronPositions = Object.values(CHEVRON_POSITION);

type MatrixCellProps = Pick<CollapseBlockTertiaryProps, 'chevronPosition' | 'showChevron'> & { id: string };

function CollapseBlockMatrixCell({ id, chevronPosition = CHEVRON_POSITION.After, showChevron }: MatrixCellProps) {
  return (
    <Accordion>
      <Accordion.CollapseBlockTertiary
        id={id}
        title='Title'
        subTitle='Subtitle'
        chevronPosition={chevronPosition}
        showChevron={showChevron}
      >
        Content
      </Accordion.CollapseBlockTertiary>
    </Accordion>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Chevron position'
        firstColumnHeader='Variant'
        columnHeaders={[...chevronPositions]}
        rows={[
          {
            variantLabel: 'Default',
            cells: chevronPositions.map(chevronPosition => (
              <CollapseBlockMatrixCell
                key={chevronPosition}
                id={`vm-chevron-${chevronPosition}`}
                chevronPosition={chevronPosition}
              />
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Chevron visibility'
        firstColumnHeader='Variant'
        columnHeaders={['showChevron=true', 'showChevron=false']}
        rows={[
          {
            variantLabel: 'Default',
            cells: [true, false].map(showChevron => (
              <CollapseBlockMatrixCell
                key={String(showChevron)}
                id={`vm-show-chevron-${showChevron}`}
                showChevron={showChevron}
              />
            )),
          },
        ]}
      />
    </>
  ),
};
