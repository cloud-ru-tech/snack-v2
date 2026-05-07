import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Accordion, type CollapseBlockSecondaryProps } from '../../src';
import { CHEVRON, VIEW } from '../../src/constants';

const meta: Meta<CollapseBlockSecondaryProps> = {
  title: 'Components/Accordion/CollapseBlockSecondary',
  component: Accordion.CollapseBlockSecondary,
  parameters: {},
};

export default meta;

type Story = StoryObj<CollapseBlockSecondaryProps>;

const views = Object.values(VIEW);
const chevrons = Object.values(CHEVRON);

const matrixBackgroundFills = Object.values(BACKGROUND_PREDEFINED_FILL);

type MatrixCellProps = Pick<CollapseBlockSecondaryProps, 'view' | 'backgroundPredefined' | 'chevron'> & {
  id: string;
};

function CollapseBlockMatrixCell({ id, view, backgroundPredefined, chevron = CHEVRON.After }: MatrixCellProps) {
  return (
    <Accordion>
      <Accordion.CollapseBlockSecondary
        id={id}
        title='Title'
        subTitle='Subtitle'
        view={view}
        backgroundPredefined={backgroundPredefined}
        chevron={chevron}
      >
        Content
      </Accordion.CollapseBlockSecondary>
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
        sectionTitle='Chevron placement'
        firstColumnHeader='Variant'
        columnHeaders={chevrons.map(c => c)}
        rows={[
          {
            variantLabel: 'Default',
            cells: chevrons.map(chevron => (
              <CollapseBlockMatrixCell
                key={chevron}
                id={`vm-chevron-${chevron}`}
                view={VIEW.Simple}
                backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
                chevron={chevron}
              />
            )),
          },
        ]}
      />
    </>
  ),
  parameters: {
    controls: { disable: true },
  },
};
