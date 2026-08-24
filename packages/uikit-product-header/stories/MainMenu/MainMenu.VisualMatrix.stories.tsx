import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { MAIN_MENU_SIDEBAR_ITEMS, SERVICE_GROUPS } from '../demoData';
import styles from './styles.module.scss';

const meta: Meta<typeof MainMenu> = {
  title: 'Uikit Product/Layout/Header/MainMenu',
  id: 'uikit-product-header-mainmenu',
  component: MainMenu,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof MainMenu>;

const SEGMENTS = [
  {
    id: 'allServices',
    label: 'Все сервисы',
    icon: <ViewTileSVG size={24} />,
    items: SERVICE_GROUPS,
  },
];

const layouts = [
  { layoutType: LAYOUT_TYPE.Desktop, label: 'desktop' },
  { layoutType: LAYOUT_TYPE.Mobile, label: 'mobile' },
] as const;

/**
 * В матрице только закрытое состояние триггера: дровер рендерится в portal и в `StoryTable`
 * перекрыл бы соседние ячейки. Открытое меню снимается отдельными `open-*` снимками
 * в `__test__/MainMenu/visual.spec.ts`.
 */
export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Trigger'
      firstColumnHeader='layoutType'
      columnHeaders={['default', 'disabled']}
      rows={layouts.map(({ layoutType, label }) => ({
        variantLabel: label,
        cells: [false, true].map(disabled => (
          <AdaptiveProvider key={`${label}-${disabled}`} layoutType={layoutType}>
            <div className={styles.cell}>
              <MainMenu open={false} disabled={disabled} segments={SEGMENTS} settingItems={MAIN_MENU_SIDEBAR_ITEMS} />
            </div>
          </AdaptiveProvider>
        )),
      }))}
    />
  ),
};
