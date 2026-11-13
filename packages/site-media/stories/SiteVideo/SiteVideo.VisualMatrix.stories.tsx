import { LAYOUT_TYPE } from '@ds/adaptive';
import { SiteVideo } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import { VIDEO } from '../fixtures';
import styles from '../styles.module.scss';

const meta: Meta<typeof SiteVideo> = {
  title: 'Site/Media/SiteVideo',
  component: SiteVideo,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof SiteVideo>;
export const VisualMatrix: Story = {
  tags: ['dev', 'test', 'no-a11y'],
  render: () => (
    <StoryTable
      className={styles.matrix}
      sectionTitle='Оверлей × раскладка'
      firstColumnHeader='controls'
      columnHeaders={['desktop · 720px', 'tablet · 720px', 'mobile · 360px']}
      rows={[true, false].map(controls => ({
        variantLabel: String(controls),
        cells: [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Tablet, LAYOUT_TYPE.Mobile].map(layoutType => (
          <LayoutScope key={layoutType} layoutType={layoutType}>
            <div className={layoutType === LAYOUT_TYPE.Mobile ? styles.mobile : styles.player}>
              <SiteVideo video={{ ...VIDEO, controls }} />
            </div>
          </LayoutScope>
        )),
      }))}
    />
  ),
};
