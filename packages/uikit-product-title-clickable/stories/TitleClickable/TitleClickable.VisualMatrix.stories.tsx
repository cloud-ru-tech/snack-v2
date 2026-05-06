import { PlaceholderSVG } from '@ds/icons';
import { TitleClickable, TitleClickableAvatar, TitleClickableIcon } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

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
        sectionTitle='`before` slot — presets'
        firstColumnHeader='preset'
        columnHeaders={['rendered']}
        rows={[
          {
            variantLabel: 'TitleClickableIcon',
            cells: [
              <TitleClickable
                key='icon'
                href='#'
                title='With icon preset'
                before={<TitleClickableIcon icon={<PlaceholderSVG />} />}
              />,
            ],
          },
          {
            variantLabel: 'TitleClickableAvatar',
            cells: [
              <div key='avatar' className={styles.fullWidthCell}>
                <TitleClickable
                  href='#'
                  fullWidth
                  before={<TitleClickableAvatar name='John Doe' subtitle='jdoe@example.com' />}
                />
              </div>,
            ],
          },
          {
            variantLabel: 'custom node',
            cells: [
              <TitleClickable
                key='custom'
                href='#'
                before={<span data-test-id='custom-before'> Custom before </span>}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
