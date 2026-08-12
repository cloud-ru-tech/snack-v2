import { MainMenu, MainMenuProps, useSearch } from '@ds/uikit-product-header-legacy';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Banners, NewNavigationBanner, PlatformSelector } from '../PlugElement';
import { ADMINISTRATIVE_SECTION, PLATFORM_GROUPS, SERVICE_GROUPS } from './constants';
import styles from './styles.module.scss';

type PlaygroundArgs = MainMenuProps & {
  showRightTop?: boolean;
  showLeftTop?: boolean;
  showServiceGroups?: boolean;
  showFavorite?: boolean;
  showSearch?: boolean;
  showSidebarBottomSlot?: boolean;
};

/**
 * MainMenu со слот-заглушками (как в migration/header MainMenu.story):
 * PlatformSelector → leftTop, Banners → rightTop, NewNavigationBanner → sidebarBottomSlot.
 * Реальная композиция с DS-компонентами — в Examples/WithSampleContent.
 */
const Template: StoryFn<PlaygroundArgs> = ({
  showLeftTop,
  showSearch,
  showRightTop,
  showServiceGroups,
  showFavorite,
  showSidebarBottomSlot,
  settingItems,
  serviceGroups,
  platformGroups,
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
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Слоты leftTop / rightTop / sidebarBottomSlot заполнены заглушками — как в legacy Storybook MainMenu, без
          PlatformSelector, баннеров и NewNavigationBanner.
        </DemoHint>
        <div className={styles.scene}>
          <MainMenu
            leftTop={showLeftTop ? <PlatformSelector /> : undefined}
            rightTop={showRightTop ? <Banners /> : undefined}
            favorite={showFavorite ? { value: favoriteItems, onChange: onFavoriteChange } : undefined}
            search={showSearch ? search : undefined}
            settingItems={settingItems}
            serviceGroups={showServiceGroups ? serviceGroups : []}
            platformGroups={platformGroups}
            sidebarBottomSlot={showSidebarBottomSlot ? <NewNavigationBanner /> : undefined}
          />
        </div>
      </DemoPanel>
    </DemoPage>
  );
};

const meta = {
  title: 'Uikit Product/Layout/Header Legacy/Main Menu',
  component: MainMenu,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/te3bVXwakjuUc3QTOfu9Mm/FF-8692--navigation-?node-id=11755-155845&m=dev',
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
    settingItems: ADMINISTRATIVE_SECTION,
    serviceGroups: SERVICE_GROUPS,
    platformGroups: PLATFORM_GROUPS,
  },
  argTypes: {
    open: { table: { disable: true } },
    setOpen: { table: { disable: true } },
    showSidebarBottomSlot: {
      if: { global: 'layoutType', eq: 'desktop' },
    },
  },
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
