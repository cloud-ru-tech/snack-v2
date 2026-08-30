import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { LinksGroup, MainMenuSegment, MainMenuSegmentPrefs } from '../../../types';

function mergeIdsPreservingOrder(prevIds: string[], nextIds: string[]) {
  const kept = prevIds.filter(id => nextIds.includes(id));
  const added = nextIds.filter(id => !prevIds.includes(id));

  if (added.length === 0 && kept.length === prevIds.length) {
    return prevIds;
  }

  return [...kept, ...added];
}

function resolveOrder(orderProp: string[] | undefined, ids: string[]) {
  if (!orderProp) {
    return ids;
  }

  return mergeIdsPreservingOrder(orderProp, ids);
}

function mergeExpandedIds(prevExpanded: string[], prevKnownIds: string[], nextIds: string[]) {
  const nextIdSet = new Set(nextIds);
  const prevKnownIdSet = new Set(prevKnownIds);
  const kept = prevExpanded.filter(id => nextIdSet.has(id));
  const added = nextIds.filter(id => !prevKnownIdSet.has(id));

  if (added.length === 0) {
    return kept;
  }

  return [...kept, ...added];
}

function resolveInitialExpanded(seedExpanded: string[], ids: string[]) {
  if (seedExpanded === ids) {
    return ids;
  }

  return mergeExpandedIds(seedExpanded, seedExpanded, ids);
}

type InternalSegmentPrefs = {
  order: string[];
  expanded: string[];
};

type UseContentSegmentsSortableProps = {
  segments?: MainMenuSegment[];

  activeSegmentId: string;

  isSearching: boolean;

  searchGroups: LinksGroup[];

  segmentPrefsById: Map<string, MainMenuSegmentPrefs>;

  onSegmentOrderChange?(segmentId: string, orderedGroupIds: string[]): void;

  onSegmentExpandedChange?(segmentId: string, expandedGroupIds: string[]): void;

  disabled?: boolean;

  isMobile?: boolean;
};

/**
 * Порядок и expanded для активного сегмента или поисковой выдачи.
 * Uncontrolled-состояние кэшируется по id сегмента, чтобы не сбрасываться при переключении.
 */
export function useContentSegmentsSortable({
  segments,
  activeSegmentId,
  isSearching,
  searchGroups,
  segmentPrefsById,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  disabled,
  isMobile,
}: UseContentSegmentsSortableProps) {
  const activeSegment = useMemo(
    () => segments?.find(segment => segment.id === activeSegmentId) ?? segments?.[0],
    [activeSegmentId, segments],
  );

  const activePrefs = activeSegment ? segmentPrefsById.get(activeSegment.id) : undefined;

  const groups = useMemo(
    () => (isSearching ? searchGroups : (activeSegment?.items ?? [])),
    [activeSegment?.items, isSearching, searchGroups],
  );
  const ids = useMemo(() => groups.map(({ id }) => id), [groups]);
  const idsKey = ids.join('\u0000');
  const cacheKey = isSearching ? '__search__' : (activeSegment?.id ?? '');

  const orderControlled = !isSearching && activePrefs?.order !== undefined;
  const expandedControlled = !isSearching && activePrefs?.expanded !== undefined;

  const [cache, setCache] = useState<Record<string, InternalSegmentPrefs>>({});
  const knownIdsByCacheKeyRef = useRef<Record<string, string[]>>({});

  useEffect(() => {
    const prevKnownIds = knownIdsByCacheKeyRef.current[cacheKey] ?? ids;

    setCache(prev => {
      const existing = prev[cacheKey];

      let seedOrder = existing?.order ?? ids;
      if (isSearching) {
        seedOrder = ids;
      } else if (orderControlled) {
        seedOrder = activePrefs?.order ?? ids;
      }

      const seedExpanded = expandedControlled ? (activePrefs?.expanded ?? ids) : (existing?.expanded ?? ids);

      const nextOrder = isSearching ? ids : resolveOrder(seedOrder, ids);
      const nextExpanded = existing
        ? mergeExpandedIds(seedExpanded, prevKnownIds, ids)
        : resolveInitialExpanded(seedExpanded, ids);

      if (
        existing &&
        existing.order.length === nextOrder.length &&
        existing.order.every((id, index) => id === nextOrder[index]) &&
        existing.expanded.length === nextExpanded.length &&
        existing.expanded.every((id, index) => id === nextExpanded[index])
      ) {
        return prev;
      }

      return {
        ...prev,
        [cacheKey]: { order: nextOrder, expanded: nextExpanded },
      };
    });

    knownIdsByCacheKeyRef.current[cacheKey] = ids;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, idsKey, isSearching, orderControlled, expandedControlled, activePrefs?.order, activePrefs?.expanded]);

  const cached = cache[cacheKey] ?? { order: resolveOrder(undefined, ids), expanded: ids };

  // В поиске порядок задаёт useMenuItems (regular → platform → pinned).
  // Кэш order иначе «залипает» между нажатиями и поднимает platform выше новых совпадений.
  const order = useMemo(() => {
    if (isSearching) {
      return ids;
    }

    if (orderControlled) {
      return resolveOrder(activePrefs?.order, ids);
    }

    return resolveOrder(cached.order, ids);
  }, [activePrefs?.order, cached.order, ids, isSearching, orderControlled]);

  // Controlled expanded: knownIds — из ref (уже виденные группы), не из самого expanded.
  // Иначе collapse-all (`expanded: []`) трактует все id как «новые» и снова раскрывает их.
  // Ссылку стабилизируем: новый массив на каждом рендере ломает анимацию sortable / DragOverlay.
  const expandedIds = useMemo(() => {
    if (!expandedControlled) {
      return cached.expanded;
    }

    const knownIds = knownIdsByCacheKeyRef.current[cacheKey] ?? ids;

    return mergeExpandedIds(activePrefs?.expanded ?? ids, knownIds, ids);
  }, [activePrefs?.expanded, cacheKey, cached.expanded, expandedControlled, ids]);

  const groupsById = useMemo(() => new Map(groups.map(group => [group.id, group])), [groups]);

  const orderedGroups = useMemo(() => {
    if (isSearching) {
      return groups;
    }

    return order.map(id => groupsById.get(id)).filter((group): group is LinksGroup => Boolean(group));
  }, [groups, groupsById, isSearching, order]);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (disabled || !over || active.id === over.id) {
        return;
      }

      const oldIndex = order.indexOf(String(active.id));
      const newIndex = order.indexOf(String(over.id));

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const nextOrder = resolveOrder(arrayMove(order, oldIndex, newIndex), ids);

      if (!orderControlled) {
        setCache(prev => ({
          ...prev,
          [cacheKey]: {
            order: nextOrder,
            expanded: prev[cacheKey]?.expanded ?? expandedIds,
          },
        }));
      }

      if (!isSearching && activeSegment) {
        onSegmentOrderChange?.(activeSegment.id, nextOrder);
      }
    },
    [activeSegment, cacheKey, disabled, expandedIds, ids, isSearching, onSegmentOrderChange, order, orderControlled],
  );

  const onExpandedChange = useCallback(
    (value?: string[]) => {
      if (isMobile) {
        return;
      }

      const nextExpanded = value ?? [];

      if (!expandedControlled) {
        setCache(prev => ({
          ...prev,
          [cacheKey]: {
            order: prev[cacheKey]?.order ?? order,
            expanded: nextExpanded,
          },
        }));
      }

      if (!isSearching && activeSegment) {
        onSegmentExpandedChange?.(activeSegment.id, nextExpanded);
      }
    },
    [activeSegment, cacheKey, expandedControlled, isSearching, isMobile, onSegmentExpandedChange, order],
  );

  return {
    orderedGroups,
    expandedIds,
    onExpandedChange,
    handleDragEnd,
  };
}
