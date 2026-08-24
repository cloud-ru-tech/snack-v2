import { useEffect, useMemo, useRef } from 'react';

import { LinksGroup, MainMenuProps } from '../types';
import { dedupeSearchGroups, filterLinksGroupsFuzzy, getLinksGroupVisibleItemsCount, pinGroupToBottom } from '../utils';

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

  const regularGroups = useMemo(
    () => regularSegments.flatMap(segment => getVisibleGroups(segment.items)),
    [regularSegments],
  );

  const pinnedGroups = useMemo(
    () => pinnedSegments.flatMap(segment => getVisibleGroups(segment.items)),
    [pinnedSegments],
  );

  const resultItems = useMemo(() => {
    if (!searchValue) {
      return regularGroups;
    }

    const searchIn = (groups: LinksGroup[]) => filterLinksGroupsFuzzy(searchValue, groups);

    const regularResults = regularSegments.flatMap(segment => searchIn(getVisibleGroups(segment.items)));
    const platformResults = platformGroups.length > 0 ? searchIn(platformGroups) : [];
    const pinnedResults = pinnedSegments.flatMap(segment => searchIn(getVisibleGroups(segment.items)));

    const combined = dedupeSearchGroups([...regularResults, ...platformResults, ...pinnedResults]);
    const pinnedGroupIds = pinnedGroups.map(({ id }) => id);

    return pinnedGroupIds.length > 0 ? pinGroupToBottom(combined, pinnedGroupIds) : combined;
  }, [searchValue, regularSegments, regularGroups, platformGroups, pinnedSegments, pinnedGroups]);

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
