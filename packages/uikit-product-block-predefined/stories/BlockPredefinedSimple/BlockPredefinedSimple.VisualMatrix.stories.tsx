import { BlockPredefinedSimple } from '@ds/uikit-product-block-predefined';
import type { Meta, StoryObj } from '@storybook/react';

import { LayoutScope, StoryTable } from '#storybook/components';

import { actions } from './actions';
import styles from './styles.module.scss';

const meta: Meta<typeof BlockPredefinedSimple> = {
  title: 'Uikit Product/BlockPredefined/Simple',
  component: BlockPredefinedSimple,
};
export default meta;

export const VisualMatrix: StoryObj<typeof BlockPredefinedSimple> = {
  tags: ['test', 'dev'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <StoryTable
      className={styles.matrix}
      sectionTitle='Компоновка шапки'
      firstColumnHeader='Раскладка'
      columnHeaders={['Широкий контейнер', 'Узкий контейнер']}
      rows={(['desktop', 'mobile'] as const).map(layoutType => ({
        variantLabel: layoutType,
        cells: ['wide', 'narrow'].map(width => (
          <LayoutScope key={width} layoutType={layoutType}>
            <div className={styles[width]}>
              <BlockPredefinedSimple title='Участники проекта и управление доступом' actions={actions}>
                В проекте три участника.
              </BlockPredefinedSimple>
            </div>
          </LayoutScope>
        )),
      }))}
    />
  ),
};
