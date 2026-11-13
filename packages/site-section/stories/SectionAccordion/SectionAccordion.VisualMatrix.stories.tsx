import { LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import { SectionAccordion } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import layoutStyles from '../SectionBasic/styles.module.scss';
import { ITEMS, TITLE } from './fixtures';

const meta: Meta<typeof SectionAccordion> = {
  title: 'Site/SectionAccordion',
  component: SectionAccordion,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SectionAccordion>;

const LAYOUT_CELLS: { layoutType: LayoutType; className: string }[] = [
  { layoutType: LAYOUT_TYPE.Desktop, className: layoutStyles.desktopCell },
  { layoutType: LAYOUT_TYPE.Tablet, className: layoutStyles.tabletCell },
  { layoutType: LAYOUT_TYPE.Mobile, className: layoutStyles.mobileCell },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      cellAlign='start'
      sectionTitle='device'
      firstColumnHeader='layout'
      columnHeaders={['collapsed']}
      rows={LAYOUT_CELLS.map(({ layoutType, className }) => ({
        variantLabel: layoutType,
        cells: [
          <LayoutScope key={layoutType} layoutType={layoutType}>
            <div className={className}>
              <SectionAccordion title={TITLE} items={ITEMS} />
            </div>
          </LayoutScope>,
        ],
      }))}
    />
  ),
};
