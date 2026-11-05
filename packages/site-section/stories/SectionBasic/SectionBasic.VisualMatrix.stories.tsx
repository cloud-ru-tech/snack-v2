import { LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import {
  CONTAINER,
  SECTION_BACKGROUND_FILL,
  SECTION_CONTAINER_BACKGROUND_TYPE,
  SectionBasic,
  SectionBasicProps,
  SectionContainer,
} from '@ds/site-section';
import { COLOR_SCHEME } from '@ds/theme';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { LayoutScope, StoryTable } from '#storybook/components';

import { ContentPlaceholder, DESCRIPTION, FILTERS, SAMPLE_IMAGE, TABS, TITLE } from './fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof SectionBasic> = {
  title: 'Site/SectionBasic',
  component: SectionBasic,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SectionBasic>;

const LAYOUT_CELLS: { layoutType: LayoutType; className: string }[] = [
  { layoutType: LAYOUT_TYPE.Desktop, className: styles.desktopCell },
  { layoutType: LAYOUT_TYPE.Tablet, className: styles.tabletCell },
  { layoutType: LAYOUT_TYPE.Mobile, className: styles.mobileCell },
];

const COMPOSITIONS: { label: string; container: SectionContainer; props: Partial<SectionBasicProps> }[] = [
  {
    label: 'new / full',
    container: CONTAINER.New,
    props: {
      title: TITLE,
      description: DESCRIPTION,
      tabBarItems: TABS,
      filterItems: FILTERS,
      pagination: { total: 10, page: 1, onChange: fn() },
      moreButton: { onClick: fn() },
    },
  },
  { label: 'new / title + content', container: CONTAINER.New, props: { title: TITLE, description: DESCRIPTION } },
  {
    label: 'new / content + more button',
    container: CONTAINER.New,
    props: { moreButton: { label: 'Все сервисы', href: '#' } },
  },
  {
    label: 'old / title + tabs + content',
    container: CONTAINER.Old,
    props: { title: TITLE, description: DESCRIPTION, tabBarItems: TABS },
  },
];

type WideRow = { label: string; props: Omit<SectionBasicProps, 'children'> };

// На ширине больше блока виден внешний фон: ширина блока зависит от container, тема у фонов своя.
const WIDE_ROWS: WideRow[] = [
  { label: 'new', props: { container: CONTAINER.New } },
  { label: 'old', props: { container: CONTAINER.Old } },
  {
    label: 'new / containerBackground.theme dark',
    props: {
      container: CONTAINER.New,
      containerBackground: { type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg, theme: { colorScheme: COLOR_SCHEME.Dark } },
    },
  },
];

// Слои фона: заливка внешнего слоя (background.fill), заливка и тема блока (containerBackground, Figma bgLocal.type).
const BACKGROUND_ROWS: WideRow[] = [
  {
    label: 'background.fill=blueBackground',
    props: { container: CONTAINER.New, background: { fill: SECTION_BACKGROUND_FILL.BlueBackground } },
  },
  {
    label: 'background.fill=blueBackground, containerBackground.theme dark',
    props: {
      container: CONTAINER.New,
      background: { fill: SECTION_BACKGROUND_FILL.BlueBackground },
      containerBackground: { type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg, theme: { colorScheme: COLOR_SCHEME.Dark } },
    },
  },
  {
    label: 'containerBackground=bg / neutralBackground1Level',
    props: {
      container: CONTAINER.New,
      containerBackground: {
        type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg,
        fill: SECTION_BACKGROUND_FILL.NeutralBackground1Level,
      },
    },
  },
  {
    label: 'containerBackground=image',
    props: {
      container: CONTAINER.New,
      containerBackground: { type: SECTION_CONTAINER_BACKGROUND_TYPE.Image, src: SAMPLE_IMAGE },
    },
  },
  {
    label: 'containerBackground=accent',
    props: { container: CONTAINER.New, containerBackground: { type: SECTION_CONTAINER_BACKGROUND_TYPE.Accent } },
  },
];

function renderWideTable(sectionTitle: string, rows: WideRow[]) {
  return (
    <StoryTable
      cellAlign='start'
      sectionTitle={sectionTitle}
      firstColumnHeader='props'
      columnHeaders={['desktop']}
      rows={rows.map(({ label, props }) => ({
        variantLabel: label,
        cells: [
          <LayoutScope key={label} layoutType={LAYOUT_TYPE.Desktop}>
            <div className={styles.wideCell}>
              <SectionBasic {...props} title={TITLE} description={DESCRIPTION} tabBarItems={TABS}>
                <ContentPlaceholder />
              </SectionBasic>
            </div>
          </LayoutScope>,
        ],
      }))}
    />
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {LAYOUT_CELLS.map(({ layoutType, className }) => (
        <StoryTable
          key={layoutType}
          cellAlign='start'
          sectionTitle={`Composition × layoutType=${layoutType}`}
          firstColumnHeader='composition'
          columnHeaders={[layoutType]}
          rows={COMPOSITIONS.map(({ label, container, props }) => ({
            variantLabel: label,
            cells: [
              <LayoutScope key={layoutType} layoutType={layoutType}>
                <div className={className}>
                  <SectionBasic container={container} {...props}>
                    <ContentPlaceholder />
                  </SectionBasic>
                </div>
              </LayoutScope>,
            ],
          }))}
        />
      ))}
      {renderWideTable('Container × theme, layoutType=desktop, width=2000', WIDE_ROWS)}
      {renderWideTable('Background, layoutType=desktop, width=2000', BACKGROUND_ROWS)}
    </div>
  ),
};
