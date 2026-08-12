import { MainMenu, MainMenuProps, useSearch } from '@ds/uikit-product-header-legacy';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { BannersSlot } from '../BannersSlot';
import { ADMINISTRATIVE_SECTION, NEW_NAVIGATION_BANNER_DEMO, PLATFORM_GROUPS, SERVICE_GROUPS } from '../constants';
import { NewNavigationBanner } from '../helperComponents/NewNavigationBanner';
import { LeftTopSlot } from '../LeftTopSlot';
import styles from '../styles.module.scss';

type WithSampleContentArgs = {
  showRightTop?: boolean;
  showLeftTop?: boolean;
  showServiceGroups?: boolean;
  showFavorite?: boolean;
  showSearch?: boolean;
  showSidebarBottomSlot?: boolean;
  open?: boolean;
  setOpen?: MainMenuProps['setOpen'];
};

const Template: StoryFn<WithSampleContentArgs> = ({
  showLeftTop,
  showSearch,
  showRightTop,
  showServiceGroups,
  showFavorite,
  showSidebarBottomSlot,
}) => {
  const search = useSearch();
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  const onFavoriteChange = (id: string) => (value: boolean) => {
    if (value) {
      setFavoriteItems([id, ...favoriteItems]);
    } else {
      setFavoriteItems(favoriteItems.filter(item => item !== id));
    }
  };

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithSampleContent</DemoTitle>
        <DemoHint>
          Слоты как в Figma `navigationOldDrawerMobile`: PlatformSelector (платформа) + на mobile второй
          PlatformSelector (проект), ReferralBanner + MarketplaceBanner, NewNavigationBanner. Toolbar layoutType=mobile
          — левый drawer с двумя селекторами в leftTop.
        </DemoHint>
        <div className={styles.scene}>
          <MainMenu
            leftTop={showLeftTop ? <LeftTopSlot /> : undefined}
            rightTop={showRightTop ? <BannersSlot /> : undefined}
            favorite={showFavorite ? { value: favoriteItems, onChange: onFavoriteChange } : undefined}
            search={showSearch ? search : undefined}
            settingItems={ADMINISTRATIVE_SECTION}
            serviceGroups={showServiceGroups ? SERVICE_GROUPS : []}
            platformGroups={PLATFORM_GROUPS}
            sidebarBottomSlot={
              showSidebarBottomSlot ? <NewNavigationBanner {...NEW_NAVIGATION_BANNER_DEMO} /> : undefined
            }
          />
        </div>
      </DemoPanel>
    </DemoPage>
  );
};

const meta = {
  title: 'Uikit Product/Layout/Header Legacy/Main Menu/Examples/WithSampleContent',
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/te3bVXwakjuUc3QTOfu9Mm/FF-8692--navigation-?node-id=11778-41494&m=dev',
    },
  },
  render: Template,
  args: {
    showLeftTop: true,
    showRightTop: true,
    showServiceGroups: true,
    showSearch: true,
    showFavorite: true,
    showSidebarBottomSlot: true,
  },
  argTypes: {
    open: { table: { disable: true } },
    setOpen: { table: { disable: true } },
  },
} satisfies Meta<WithSampleContentArgs>;

export default meta;
type Story = StoryObj<WithSampleContentArgs>;

export const WithSampleContent: Story = {
  tags: ['dev'],
};
