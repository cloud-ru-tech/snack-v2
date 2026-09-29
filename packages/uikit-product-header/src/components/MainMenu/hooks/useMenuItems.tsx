import { useEffect, useMemo, useRef } from 'react';

import { LinksGroup, MainMenuProps } from '../types';
import {
  createLinksGroupsSearcher,
  dedupeSearchGroups,
  getLinksGroupVisibleItemsCount,
  pinGroupToBottom,
} from '../utils';

type UseMenuItemsProps = Pick<MainMenuProps, 'segments' | 'search' | 'platformGroups'>;

function getVisibleGroups(items: LinksGroup[]) {
  return items.filter(group => getLinksGroupVisibleItemsCount(group) > 0);
}

export function useMenuItems({ search, segments, platformGroups = [] }: UseMenuItemsProps) {
  const { value: searchValue = '', onSearchNoResult } = search || {};

  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const regularSegments = useMemo(() => segments?.filter(segment => !segment.pinBottomOnSearch) ?? [], [segments]);
  const pinnedSegments = useMemo(() => segments?.filter(segment => segment.pinBottomOnSearch) ?? [], [segments]);

  const isSearching = Boolean(searchValue);

  // Индексы строятся при первом вводе и живут, пока поиск активен и каталог не сменился: индексация
  // не зависит от строки поиска, поэтому пересоздавать `Fuse` на каждый символ не нужно. Пока поиска
  // нет, индексы не строятся — открытие меню их не оплачивает.
  const regularSearchers = useMemo(
    () =>
      isSearching ? regularSegments.map(segment => createLinksGroupsSearcher(getVisibleGroups(segment.items))) : [],
    [isSearching, regularSegments],
  );

  const pinnedSearchers = useMemo(
    () =>
      isSearching ? pinnedSegments.map(segment => createLinksGroupsSearcher(getVisibleGroups(segment.items))) : [],
    [isSearching, pinnedSegments],
  );

  const platformSearcher = useMemo(
    () => (isSearching && platformGroups.length > 0 ? createLinksGroupsSearcher(platformGroups) : undefined),
    [isSearching, platformGroups],
  );

  const regularGroups = useMemo(
    () => regularSegments.flatMap(segment => getVisibleGroups(segment.items)),
    [regularSegments],
  );

  const pinnedGroupIds = useMemo(
    () => pinnedSegments.flatMap(segment => getVisibleGroups(segment.items)).map(({ id }) => id),
    [pinnedSegments],
  );

  const resultItems = useMemo(() => {
    if (!searchValue) {
      return regularGroups;
    }

    const regularResults = regularSearchers.flatMap(search => search(searchValue));
    const platformResults = platformSearcher ? platformSearcher(searchValue) : [];
    const pinnedResults = pinnedSearchers.flatMap(search => search(searchValue));

    const combined = dedupeSearchGroups([...regularResults, ...platformResults, ...pinnedResults]);

    return pinnedGroupIds.length > 0 ? pinGroupToBottom(combined, pinnedGroupIds) : combined;
  }, [searchValue, regularGroups, regularSearchers, platformSearcher, pinnedSearchers, pinnedGroupIds]);

  useEffect(() => {
    if (searchValue && !resultItems.length) {
      onSearchNoResult?.(searchValue);
    }
  }, [searchValue, resultItems.length, onSearchNoResult]);

  return {
    resultItems,
    searchRef,
    scrollRef,
  };
}
