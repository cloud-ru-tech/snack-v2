import { LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import { CONTAINER, MEDIA_TYPE, SectionMedia } from '@ds/site-section';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { LayoutScope, StoryTable } from '#storybook/components';

import { DESCRIPTION, FILTERS, POSTER, TABS, TITLE, VIDEO } from './fixtures';
import styles from './styles.module.scss';

const meta: Meta<typeof SectionMedia> = {
  title: 'Site/Section/SectionMedia',
  component: SectionMedia,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof SectionMedia>;

const LAYOUTS: { layoutType: LayoutType; className: string }[] = [
  { layoutType: LAYOUT_TYPE.Desktop, className: styles.desktop },
  { layoutType: LAYOUT_TYPE.Tablet, className: styles.tablet },
  { layoutType: LAYOUT_TYPE.Mobile, className: styles.mobile },
];

export const VisualMatrix: Story = {
  tags: ['dev', 'test', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      {LAYOUTS.map(({ layoutType, className }) => (
        <StoryTable
          key={layoutType}
          sectionTitle={layoutType}
          firstColumnHeader='media.type'
          columnHeaders={['container=new', 'container=old']}
          cellAlign='start'
          rows={[
            {
              variantLabel: 'video',
              cells: Object.values(CONTAINER).map(container => (
                <LayoutScope key={container} layoutType={layoutType}>
                  <div className={className}>
                    <SectionMedia container={container} title={TITLE} media={{ type: MEDIA_TYPE.Video, ...VIDEO }} />
                  </div>
                </LayoutScope>
              )),
            },
            {
              variantLabel: 'image',
              cells: Object.values(CONTAINER).map(container => (
                <LayoutScope key={container} layoutType={layoutType}>
                  <div className={className}>
                    <SectionMedia
                      container={container}
                      title={TITLE}
                      media={{ type: MEDIA_TYPE.Image, src: POSTER, loading: 'eager', alt: 'Изображение' }}
                    />
                  </div>
                </LayoutScope>
              )),
            },
          ]}
        />
      ))}
      <StoryTable
        sectionTitle='Композиция'
        firstColumnHeader='props'
        columnHeaders={['desktop']}
        cellAlign='start'
        rows={[
          {
            variantLabel: 'title / description / tabs / filters / footer',
            cells: [
              <LayoutScope key='composition' layoutType={LAYOUT_TYPE.Desktop}>
                <div className={styles.desktop}>
                  <SectionMedia
                    container={CONTAINER.New}
                    title={TITLE}
                    description={DESCRIPTION}
                    tabBarItems={TABS}
                    filterItems={FILTERS}
                    pagination={{ total: 5, page: 1, onChange: fn() }}
                    moreButton={{ label: 'Все материалы', href: '#' }}
                    media={{ type: MEDIA_TYPE.Image, src: POSTER, loading: 'eager', alt: '' }}
                  />
                </div>
              </LayoutScope>,
            ],
          },
        ]}
      />
    </div>
  ),
};
