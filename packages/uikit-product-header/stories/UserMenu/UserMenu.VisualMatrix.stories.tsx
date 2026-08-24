import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { UserMenu } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SETTING_ITEMS } from '../demoData';
import styles from './styles.module.scss';

const meta: Meta<typeof UserMenu> = {
  title: 'Uikit Product/Layout/Header/UserMenu',
  id: 'uikit-product-header-usermenu',
  component: UserMenu,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

const layouts = [
  { layoutType: LAYOUT_TYPE.Desktop, label: 'desktop', isMobile: false },
  { layoutType: LAYOUT_TYPE.Mobile, label: 'mobile', isMobile: true },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Layout'
      firstColumnHeader='layoutType'
      columnHeaders={['default']}
      rows={layouts.map(({ layoutType, label }) => ({
        variantLabel: label,
        cells: [
          <AdaptiveProvider key={label} layoutType={layoutType}>
            <div className={styles.cell}>
              <UserMenu
                profile={{ fullName: 'Ivan Petrov', email: 'ipetrov@cloud.ru' }}
                theme={{ value: 'light' }}
                settingItems={SETTING_ITEMS}
              />
            </div>
          </AdaptiveProvider>,
        ],
      }))}
    />
  ),
};
