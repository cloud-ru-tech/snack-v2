import { LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import { CONTAINER, SectionTable } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import styles from '../SectionBasic/styles.module.scss';
import { CAPTION, COLUMN_DEFINITIONS, DESCRIPTION, ROWS, TITLE } from './fixtures';

const meta: Meta<typeof SectionTable> = {
  title: 'Site/Section/SectionTable',
  component: SectionTable,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SectionTable>;

const LAYOUT_CELLS: { layoutType: LayoutType; className: string }[] = [
  { layoutType: LAYOUT_TYPE.Desktop, className: styles.desktopCell },
  { layoutType: LAYOUT_TYPE.Tablet, className: styles.tabletCell },
  { layoutType: LAYOUT_TYPE.Mobile, className: styles.mobileCell },
];

const ROWS_BY_LAYOUT = [
  { label: 'title + table', title: TITLE, description: DESCRIPTION, caption: undefined },
  { label: 'table', title: undefined, description: undefined, caption: undefined },
  { label: 'caption', title: TITLE, description: DESCRIPTION, caption: CAPTION },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {LAYOUT_CELLS.map(({ layoutType, className }) => (
        <StoryTable
          key={layoutType}
          cellAlign='start'
          sectionTitle={`layoutType=${layoutType}`}
          firstColumnHeader='composition'
          columnHeaders={[layoutType]}
          rows={ROWS_BY_LAYOUT.map(({ label, title, description, caption }) => ({
            variantLabel: label,
            cells: [
              <LayoutScope key={label} layoutType={layoutType}>
                <div className={className}>
                  <SectionTable
                    container={CONTAINER.New}
                    title={title}
                    description={description}
                    columnDefinitions={COLUMN_DEFINITIONS}
                    data={ROWS}
                    caption={caption}
                  />
                </div>
              </LayoutScope>,
            ],
          }))}
        />
      ))}
    </div>
  ),
};
