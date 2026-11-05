import { LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import { SECTION_TITLE_TYPE, SectionTitle } from '@ds/site-section-title';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import { DESCRIPTION, TITLE } from './content';
import styles from './styles.module.scss';

const meta: Meta<typeof SectionTitle> = {
  title: 'Site/SectionTitle',
  component: SectionTitle,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

const LAYOUT_CELLS: { layoutType: LayoutType; className: string }[] = [
  { layoutType: LAYOUT_TYPE.Desktop, className: styles.desktopCell },
  { layoutType: LAYOUT_TYPE.Tablet, className: styles.tabletCell },
  { layoutType: LAYOUT_TYPE.Mobile, className: styles.mobileCell },
];

const TYPES = Object.values(SECTION_TITLE_TYPE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {LAYOUT_CELLS.map(({ layoutType, className }) => (
        <StoryTable
          key={layoutType}
          cellAlign='start'
          sectionTitle={`Type × layoutType=${layoutType}`}
          firstColumnHeader='type'
          columnHeaders={['title + description', 'title']}
          rows={TYPES.map(type => ({
            variantLabel: type,
            cells: [true, false].map(withDescription => (
              <LayoutScope key={String(withDescription)} layoutType={layoutType}>
                <div className={className}>
                  <SectionTitle type={type} title={TITLE} description={withDescription ? DESCRIPTION : undefined} />
                </div>
              </LayoutScope>
            )),
          }))}
        />
      ))}
    </div>
  ),
};
