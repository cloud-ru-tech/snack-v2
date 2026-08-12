import { MouseEvent, useEffect, useMemo, useRef } from 'react';

import { headerLegacyLocale } from '../../../locale';
import { InnerLink, LinksGroup, MainMenuProps, SearchHandler } from '../types';
import { pinAdminGroupToBottom } from '../utils';
import { useHighlight } from './useHighlight';

export type NavGroupItem = {
  id: string;
  label: string;
  onClick(e?: MouseEvent<HTMLElement>): void;
};

type UseMenuItemsProps = Pick<
  MainMenuProps,
  'favorite' | 'serviceGroups' | 'search' | 'settingItems' | 'platformGroups'
>;

export function useMenuItems({
  search,
  serviceGroups,
  favorite,
  settingItems,
  platformGroups = [],
}: UseMenuItemsProps) {
  const { t } = headerLegacyLocale.useTranslations();
  const { searchValue = '', searchFn, searchFunctions, onSearchValueChange, onSearchNoResult } = search || {};

  const searchRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const highlight = useHighlight();

  const groupWithFavorites = useMemo(() => {
    if (!favorite?.value) {
      return serviceGroups;
    }

    const flatMapItems = serviceGroups.flatMap(serviceGroup => serviceGroup.items);

    const favoriteServices = favorite.value.reduce((acc, cur) => {
      const item = flatMapItems.find(favItem => favItem.id === cur);
      if (item) {
        acc.push(item);
      }
      return acc;
    }, [] as InnerLink[]);

    return [
      {
        id: 'favorite',
        label: {
          text: t('mainMenu.favorite'),
        },
        items: favoriteServices,
      } as LinksGroup,
    ].concat(serviceGroups);
  }, [favorite, serviceGroups, t]);

  const navGroupItems: NavGroupItem[] = groupWithFavorites
    .filter(group => group.items.length > 0)
    .map(({ id, label: { text }, onClick: onGroupClickInSidebar }) => ({
      id,
      label: text,
      onClick(e?: MouseEvent<HTMLElement>) {
        onSearchValueChange?.('');

        setTimeout(() => {
          // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
          const element = document.getElementById(id);
          if (!element) {
            return;
          }

          // Search закреплён вне Scroll — компенсация высоты sticky-поиска не нужна.
          scrollRef.current?.scrollTo({
            left: 0,
            top: element.offsetTop,
            behavior: 'smooth',
          });

          setTimeout(() => {
            highlight(element);
          }, 500);
        }, 0);

        onGroupClickInSidebar?.(e);
      },
    }));

  const resultItems = useMemo(() => {
    const itemsWithoutEmptyGroups = groupWithFavorites.filter(group => group.items.length > 0);

    if (!searchValue) {
      return itemsWithoutEmptyGroups;
    }

    const searchFnMap = searchFunctions?.reduce(
      (acc, cur) => {
        acc[cur.id] = cur.handler;

        return acc;
      },
      {} as Record<string, SearchHandler>,
    );

    const handler = searchFn ? searchFnMap?.[searchFn] : searchFunctions?.[0]?.handler;

    const serviceResults = handler?.(searchValue, itemsWithoutEmptyGroups) ?? itemsWithoutEmptyGroups;

    const platformResults = platformGroups.length > 0 ? (handler?.(searchValue, platformGroups) ?? []) : [];

    const adminResults = settingItems?.items.length ? (handler?.(searchValue, [settingItems]) ?? []) : [];

    const combined = [...serviceResults, ...platformResults, ...adminResults];

    return settingItems ? pinAdminGroupToBottom(combined, settingItems.id) : combined;
  }, [searchFn, searchFunctions, searchValue, groupWithFavorites, platformGroups, settingItems]);

  useEffect(() => {
    if (searchValue && !resultItems.length) {
      onSearchNoResult?.(searchValue);
    }
  }, [searchValue, resultItems.length, onSearchNoResult]);

  return {
    resultItems,
    navGroupItems,
    searchRef,
    scrollRef,
  };
}
