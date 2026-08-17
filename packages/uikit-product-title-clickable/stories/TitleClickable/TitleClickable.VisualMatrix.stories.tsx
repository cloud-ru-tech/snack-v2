import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { STORY_TEST_IDS } from './testIds';

const meta: Meta<typeof TitleClickable> = {
  title: 'Uikit Product/TitleClickable',
  component: TitleClickable,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TitleClickable>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Width × Icon'
        firstColumnHeader='width'
        columnHeaders={['no icon', 'with icon']}
        rows={(['auto', 'full'] as const).map(width => ({
          variantLabel: width,
          cells: [undefined, <PlaceholderSVG key='icon' />].map((icon, idx) => (
            <div key={idx} className={width === 'full' ? styles.fullWidthCell : undefined}>
              <TitleClickable href='#' title='Title' icon={icon} fullWidth={width === 'full'} />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='showArrow × long title (truncation)'
        firstColumnHeader='showArrow'
        columnHeaders={['short', 'long']}
        rows={[true, false].map(showArrow => ({
          variantLabel: String(showArrow),
          cells: ['Title', 'Very long title that should definitely truncate on a single line'].map((title, idx) => (
            <div key={idx} className={styles.fullWidthCell}>
              <TitleClickable href='#' title={title} fullWidth showArrow={showArrow} icon={<PlaceholderSVG />} />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Arrow icon (auto: chevron / external by target)'
        firstColumnHeader='target'
        columnHeaders={['no icon', 'with icon']}
        rows={(['_self', '_blank'] as const).map(target => ({
          variantLabel: target,
          cells: [undefined, <PlaceholderSVG key='icon' />].map((icon, idx) => (
            <TitleClickable key={idx} href='#' target={target} title='Title' icon={icon} />
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='icon and children after title'
        firstColumnHeader='variant'
        columnHeaders={['rendered']}
        rows={[
          {
            variantLabel: 'icon before title',
            cells: [<TitleClickable key='icon' href='#' title='With icon' icon={<PlaceholderSVG />} />],
          },
          {
            variantLabel: 'custom children',
            cells: [
              <TitleClickable key='custom' href='#' title='With custom children'>
                <span data-test-id={STORY_TEST_IDS.customChildren}>Custom children</span>
              </TitleClickable>,
            ],
          },
        ]}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='avatar after title'
        firstColumnHeader='variant'
        columnHeaders={['rendered']}
        rows={[
          {
            variantLabel: 'title + avatar',
            cells: [
              <div key='avatar' className={styles.fullWidthCell}>
                <TitleClickable
                  href='#'
                  title='With avatar'
                  fullWidth
                  avatar={{ name: 'John Doe', subtitle: 'jdoe@example.com' }}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
