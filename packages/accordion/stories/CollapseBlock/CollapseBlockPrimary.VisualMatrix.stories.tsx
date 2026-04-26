import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Accordion, type CollapseBlockPrimaryProps } from '../../src';
import { APPEARANCE, CHEVRON, VIEW } from '../../src/constants';

const meta: Meta<CollapseBlockPrimaryProps> = {
  title: 'Components/Accordion/CollapseBlockPrimary',
  component: Accordion.CollapseBlockPrimary,
  parameters: {},
};

export default meta;

type Story = StoryObj<CollapseBlockPrimaryProps>;

const views = Object.values(VIEW);
const appearances = Object.values(APPEARANCE);
const chevrons = Object.values(CHEVRON);

type MatrixCellProps = Pick<CollapseBlockPrimaryProps, 'view' | 'appearance' | 'chevron'> & { id: string };

function CollapseBlockMatrixCell({ id, view, appearance, chevron = CHEVRON.After }: MatrixCellProps) {
  return (
    <Accordion>
      <Accordion.CollapseBlockPrimary
        id={id}
        title='Title'
        subTitle='Subtitle'
        view={view}
        appearance={appearance}
        chevron={chevron}
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
        sectionTitle='Appearance × View'
        firstColumnHeader='Appearance'
        columnHeaders={[...views]}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: views.map(view => (
            <CollapseBlockMatrixCell
              key={`${appearance}-${view}`}
              id={`vm-${appearance}-${view}`}
              view={view}
              appearance={appearance}
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
                appearance={APPEARANCE.Neutral}
                chevron={chevron}
              />
            )),
          },
        ]}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Сводная сетка вариантов CollapseBlockPrimary: appearance по строкам и view по столбцам, затем расположение шеврона при нейтральной simple-обложке.',
      },
    },
  },
};
