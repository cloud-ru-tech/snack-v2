import { Actions } from '@ds/uikit-product-actions';
import { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import { items } from './items';
import styles from './styles.module.scss';

const meta: Meta<typeof Actions> = {
  title: 'Uikit Product/Actions',
  component: Actions,
  parameters: { figma: { disable: true } },
};
export default meta;
export const VisualMatrix: StoryObj<typeof Actions> = {
  tags: ['test', 'dev'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <StoryTable
      firstColumnHeader='Раскладка'
      columnHeaders={['Широкий контейнер', 'Узкий контейнер']}
      rows={(['desktop', 'mobile'] as const).map(layoutType => ({
        variantLabel: layoutType,
        cells: ['wide', 'narrow'].map(width => (
          <LayoutScope key={width} layoutType={layoutType}>
            <div className={styles[width]}>
              <Actions items={items} />
            </div>
          </LayoutScope>
        )),
      }))}
    />
  ),
};
