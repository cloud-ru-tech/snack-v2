import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Accordion, CollapseBlockPrimaryProps } from '../../src';
import { CHEVRON_POSITION, VIEW } from '../../src/constants';

const meta: Meta<CollapseBlockPrimaryProps> = {
  title: 'Components/Accordion/CollapseBlockPrimary',
  component: Accordion.CollapseBlockPrimary,
  parameters: { controls: { disable: true } },
};

export default meta;

type Story = StoryObj<CollapseBlockPrimaryProps>;

const views = Object.values(VIEW);
const chevronPositions = Object.values(CHEVRON_POSITION);

const matrixBackgroundFills = Object.values(BACKGROUND_PREDEFINED_FILL);

type MatrixCellProps = Pick<
  CollapseBlockPrimaryProps,
  'view' | 'backgroundPredefined' | 'chevronPosition' | 'showChevron'
> & {
  id: string;
};

function CollapseBlockMatrixCell({
  id,
  view,
  backgroundPredefined,
  chevronPosition = CHEVRON_POSITION.After,
  showChevron,
}: MatrixCellProps) {
  return (
    <Accordion>
      <Accordion.CollapseBlockPrimary
        id={id}
        title='Title'
        subTitle='Subtitle'
        view={view}
        backgroundPredefined={backgroundPredefined}
        chevronPosition={chevronPosition}
        showChevron={showChevron}
      >
        Content
      </Accordion.CollapseBlockPrimary>
    </Accordion>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='backgroundPredefined × View'
        firstColumnHeader='Fill'
        columnHeaders={[...views]}
        rows={matrixBackgroundFills.map(fill => ({
          variantLabel: fill,
          cells: views.map(view => (
            <CollapseBlockMatrixCell
              key={`${fill}-${view}`}
              id={`vm-${fill}-${view}`}
              view={view}
              backgroundPredefined={fill}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Chevron position'
        firstColumnHeader='Variant'
        columnHeaders={chevronPositions.map(c => c)}
        rows={[
          {
            variantLabel: 'Default',
            cells: chevronPositions.map(chevronPosition => (
              <CollapseBlockMatrixCell
                key={chevronPosition}
                id={`vm-chevron-${chevronPosition}`}
                view={VIEW.Simple}
                backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
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
                view={VIEW.Simple}
                backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
                showChevron={showChevron}
              />
            )),
          },
        ]}
      />
    </>
  ),
};
