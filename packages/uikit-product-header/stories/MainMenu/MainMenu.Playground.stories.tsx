import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Divider } from '@ds/divider';
import { ConfigurationSVG, ViewTileSVG } from '@ds/icons/interface/product';
import { KuberLogo, NginxLogo, NodejsLogo } from '@ds/icons/logos';
import { BaseItem } from '@ds/list';
import {
  LinksGroup,
  Logo,
  MainMenu,
  MainMenuProps,
  MainMenuSegment,
  MainMenuSegmentPrefs,
  MenuBanner,
} from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ADMINISTRATIVE_SECTIONS, MAIN_MENU_SIDEBAR_ITEMS, PLATFORM_GROUPS, SERVICE_GROUPS } from '../demoData';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const ALL_SERVICES_SEGMENT_ID = 'allServices';
const CONTROL_CENTER_SEGMENT_ID = 'controlCenter';

function reorderLinksGroups(groups: LinksGroup[], orderedGroupIds: string[]): LinksGroup[] {
  const groupsById = new Map(groups.map(group => [group.id, group]));

  return orderedGroupIds.map(id => groupsById.get(id)).filter((group): group is LinksGroup => Boolean(group));
}

function upsertSegmentPrefs(
  prev: MainMenuSegmentPrefs[],
  segmentId: string,
  patch: Omit<MainMenuSegmentPrefs, 'id'>,
): MainMenuSegmentPrefs[] {
  const existing = prev.find(prefs => prefs.id === segmentId);

  if (!existing) {
    return [...prev, { id: segmentId, ...patch }];
  }

  return prev.map(prefs => (prefs.id === segmentId ? { ...prefs, ...patch } : prefs));
}

type PlaygroundArgs = MainMenuProps & {
  showRightTop?: boolean;
  showLeftTop?: boolean;
  showSegmentsWithCards?: boolean;
  showFavorite?: boolean;
  showSearch?: boolean;
  favoritesLoading?: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/Layout/Header/MainMenu',
  id: 'uikit-product-header-mainmenu',
  component: MainMenu,
  parameters: { layout: 'fullscreen' },
  args: {
    showLeftTop: true,
    showSegmentsWithCards: true,
    showFavorite: true,
    showSearch: true,
    showRightTop: true,
    favoritesLoading: false,
  },
  argTypes: {
    showLeftTop: { name: '[Stories]: showLeftTop', control: 'boolean' },
    showRightTop: { name: '[Stories]: showRightTop', control: 'boolean' },
    showSegmentsWithCards: { name: '[Stories]: showSegmentsWithCards', control: 'boolean' },
    showFavorite: { name: '[Stories]: showFavorite', control: 'boolean' },
    showSearch: { name: '[Stories]: showSearch', control: 'boolean' },
    favoritesLoading: { name: '[Stories]: favoritesLoading', control: 'boolean' },
    open: { table: { disable: true } },
    setOpen: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

function MainMenuPlaygroundContent({
  showSearch,
  showSegmentsWithCards,
  showFavorite,
  showRightTop,
  loading,
  disabled,
  favoritesLoading,
}: PlaygroundArgs) {
  const [open, setOpen] = useState(false);
  const [searchValue, onSearchValueChange] = useState('');
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [serviceGroups, setServiceGroups] = useState(SERVICE_GROUPS);
  const [controlCenterGroups, setControlCenterGroups] = useState(ADMINISTRATIVE_SECTIONS);
  const [segmentPrefs, setSegmentPrefs] = useState<MainMenuSegmentPrefs[]>([]);
  const [showDescription, setShowDescription] = useState(false);
  const [showGroupsColors, setShowGroupsColors] = useState(true);
  const [showMarketplaceBanner, setShowMarketplaceBanner] = useState(true);
  const [showReferralBanner, setShowReferralBanner] = useState(true);

  const isMobile = isMobileLayout(useAdaptiveLayout().layoutType);

  const serviceGroupsItems = useMemo(
    () =>
      serviceGroups.map(group => ({
        ...group,
        items: group.items.map(service => ({
          ...service,
          onClick: (event: MouseEvent<HTMLElement>) => {
            event.preventDefault();
            setRecentItems(prev => [service.id, ...prev.filter(id => id !== service.id)].slice(0, 5));
          },
        })),
      })),
    [serviceGroups],
  );

  const onFavoriteChange = (id: string) => (value: boolean, position?: number) => {
    setFavoriteItems(prev => {
      const withoutId = prev.filter(item => item !== id);

      if (!value) {
        return withoutId;
      }

      if (position == null) {
        return [id, ...withoutId];
      }

      return [...withoutId.slice(0, position), id, ...withoutId.slice(position)];
    });
  };

  const onFavoriteOrderChange = useCallback((orderedIds: string[]) => {
    setFavoriteItems(orderedIds);
  }, []);

  const handleFavoriteServiceClick = useCallback((serviceId: string) => {
    setRecentItems(prev => [serviceId, ...prev.filter(id => id !== serviceId)].slice(0, 5));
  }, []);

  const handleRecentServiceClick = useCallback((serviceId: string) => {
    setRecentItems(prev => [serviceId, ...prev.filter(id => id !== serviceId)].slice(0, 5));
  }, []);

  const handleSegmentOrderChange = useCallback((segmentId: string, orderedGroupIds: string[]) => {
    setSegmentPrefs(prev => upsertSegmentPrefs(prev, segmentId, { order: orderedGroupIds }));

    if (segmentId === ALL_SERVICES_SEGMENT_ID) {
      setServiceGroups(prev => reorderLinksGroups(prev, orderedGroupIds));
      return;
    }

    if (segmentId === CONTROL_CENTER_SEGMENT_ID) {
      setControlCenterGroups(prev => reorderLinksGroups(prev, orderedGroupIds));
    }
  }, []);

  const handleSegmentExpandedChange = useCallback((segmentId: string, expandedGroupIds: string[]) => {
    setSegmentPrefs(prev => upsertSegmentPrefs(prev, segmentId, { expanded: expandedGroupIds }));
  }, []);

  const segments = useMemo((): MainMenuSegment[] => {
    const result: MainMenuSegment[] = [
      {
        id: ALL_SERVICES_SEGMENT_ID,
        label: 'Все сервисы',
        icon: <ViewTileSVG size={24} />,
        items: serviceGroupsItems,
      },
    ];

    if (controlCenterGroups.length > 0) {
      result.push({
        id: CONTROL_CENTER_SEGMENT_ID,
        label: 'Центр управления',
        icon: <ConfigurationSVG size={24} />,
        items: controlCenterGroups,
        pinBottomOnSearch: true,
      });
    }

    return result;
  }, [controlCenterGroups, serviceGroupsItems]);

  const favoriteSettingsItems: BaseItem[] = [
    {
      content: {
        label: 'Очистить избранное',
      },
      disabled: !favoriteItems.length,
      onClick: () => {
        setFavoriteItems([]);
      },
    },
    {
      content: {
        label: 'Очистить недавние',
      },
      disabled: !recentItems.length,
      onClick: () => {
        setRecentItems([]);
      },
    },
  ];

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Главное меню навигации по сервисам с поиском и избранным.</DemoHint>
        <DemoActions block>
          <MainMenu
            open={open}
            setOpen={setOpen}
            loading={loading}
            disabled={disabled}
            segments={showSegmentsWithCards ? segments : []}
            segmentPrefs={segmentPrefs}
            onSegmentOrderChange={handleSegmentOrderChange}
            onSegmentExpandedChange={handleSegmentExpandedChange}
            platformGroups={PLATFORM_GROUPS}
            settingItems={MAIN_MENU_SIDEBAR_ITEMS}
            draggerTooltip='Потяните, чтобы изменить ширину'
            logo={
              <>
                <Logo href='/' />
                <Divider orientation='vertical' />
                <div className={styles.logoPlug} />
              </>
            }
            rightTop={
              showRightTop && (showMarketplaceBanner || showReferralBanner) ? (
                <div className={styles.banners} data-mobile={isMobile || undefined}>
                  {showMarketplaceBanner && (
                    <MenuBanner
                      className={styles.banner}
                      href='https://cloud.ru/marketplace'
                      title='Маркетплейс'
                      promoTag={{ label: '120+ сервисов' }}
                      afterTitle={
                        <>
                          <NodejsLogo size={16} className={styles.bannerLogo} />
                          <KuberLogo size={16} className={styles.bannerLogo} />
                          <NginxLogo size={16} className={styles.bannerLogo} />
                        </>
                      }
                      onClose={() => setShowMarketplaceBanner(false)}
                      onClick={fn()}
                    />
                  )}
                  {showReferralBanner && (
                    <MenuBanner
                      className={styles.banner}
                      href='https://cloud.ru/referral'
                      title='Реферальная программа'
                      promoTag={{ label: '15%' }}
                      onClose={() => setShowReferralBanner(false)}
                      onClick={fn()}
                    />
                  )}
                </div>
              ) : undefined
            }
            favorite={
              showFavorite
                ? {
                    value: favoriteItems,
                    onChange: onFavoriteChange,
                    onOrderChange: onFavoriteOrderChange,
                    recentServices: recentItems,
                    onFavoriteServiceClick: handleFavoriteServiceClick,
                    onRecentServiceClick: handleRecentServiceClick,
                    actions: {
                      items: favoriteSettingsItems,
                    },
                    loading: favoritesLoading,
                  }
                : undefined
            }
            preferences={{
              showDescription: {
                value: showDescription,
                onChange: setShowDescription,
              },
              showGroupsColors: {
                value: showGroupsColors,
                onChange: setShowGroupsColors,
              },
            }}
            search={showSearch ? { value: searchValue, onChange: onSearchValueChange } : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],

  args: {
    disabled: false,
    loading: false,
    favoritesLoading: false,
  },

  render: args => <MainMenuPlaygroundContent {...args} />,

  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.mainMenu.drawerButton)).toBeVisible();
  },
};
