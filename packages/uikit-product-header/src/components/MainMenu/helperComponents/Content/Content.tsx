import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Accordion } from '@ds/accordion';
import { CrossSVG, SearchSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactNode, useCallback, useDeferredValue, useEffect, useMemo } from 'react';

import { headerLocale } from '../../../../locale';
import { shouldBeOpenedInNewTab } from '../../../../utils/shouldBeOpenedInNewTab';
import {
  FavoriteProps,
  LinksGroup,
  MainMenuPreferencesProps,
  MainMenuSegment,
  MainMenuSegmentPrefs,
} from '../../types';
import { getLinksGroupVisibleItemsCount, resolveGroupBlockColor } from '../../utils';
import { TEST_IDS } from './constants';
import { ContentToolbar } from './helperComponents/ContentToolbar';
import { SortableGroup, SortableGroupSkeleton } from './helperComponents/SortableGroup';
import { useContentSegmentsSortable } from './hooks/useContentSegmentsSortable';
import { useSegmentDnd } from './hooks/useSegmentDnd';
import styles from './styles.module.scss';

export type ContentProps = {
  segments: MainMenuSegment[];

  /** Результаты поиска (уже смерженные); в обычном режиме не используются. */
  searchGroups?: LinksGroup[];

  segmentPrefs?: MainMenuSegmentPrefs[];

  /**
   * Активный сегмент правой панели. Не передано — неуправляемое состояние
   * (дефолт — первый сегмент с видимыми карточками).
   */
  activeSegmentId?: string;

  /** Колбэк смены активного сегмента правой панели. */
  onActiveSegmentChange?(segmentId: string): void;

  onSegmentOrderChange?(segmentId: string, orderedGroupIds: string[]): void;

  onSegmentExpandedChange?(segmentId: string, expandedGroupIds: string[]): void;

  favorite?: FavoriteProps;

  preferences?: MainMenuPreferencesProps;

  searchValue?: string;

  search?: ReactNode;

  /** Слот над тулбаром правой колонки (например, баннеры) */
  rightTop?: ReactNode;

  footer?: ReactNode;

  isMobile?: boolean;

  onClose?(): void;

  className?: string;
  /** Флаг загрузки данных */
  loading?: boolean;
};

export function Content({
  searchValue,
  search,
  rightTop,
  segments,
  searchGroups = [],
  segmentPrefs,
  activeSegmentId,
  onActiveSegmentChange,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  className,
  footer,
  favorite,
  isMobile,
  onClose,
  preferences,
  loading,
}: ContentProps) {
  const { t } = headerLocale.useTranslations();

  const showDescription = useDeferredValue(preferences?.showDescription.value ?? false);

  const segmentPrefsById = useMemo(() => new Map((segmentPrefs ?? []).map(prefs => [prefs.id, prefs])), [segmentPrefs]);

  const defaultSegmentId = activeSegmentId ?? segments[0]?.id ?? '';

  const [segmentId = defaultSegmentId, setSegmentId] = useValueControl<string>({
    value: activeSegmentId,
    defaultValue: defaultSegmentId,
    onChange: onActiveSegmentChange,
  });

  const isSearching = Boolean(searchValue);
  const enableServiceDrag = Boolean(favorite) && !isMobile && !isSearching;

  useEffect(() => {
    if (!segments.some(segment => segment.id === segmentId) && defaultSegmentId) {
      setSegmentId(defaultSegmentId);
    }
  }, [defaultSegmentId, segmentId, setSegmentId, segments]);

  const handleLinkClick = useCallback(
    (
      { disabled, onClick }: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void },
      e?: MouseEvent<HTMLElement>,
    ) => {
      if (disabled) {
        e?.preventDefault();
        return;
      }

      if (!shouldBeOpenedInNewTab(e)) {
        e?.preventDefault();
        onClose?.();
      }

      onClick?.(e);
    },
    [onClose],
  );

  const {
    orderedGroups,
    expandedIds,
    onExpandedChange,
    handleDragEnd: handleSortableDragEnd,
  } = useContentSegmentsSortable({
    segments,
    activeSegmentId: segmentId,
    isSearching,
    searchGroups,
    segmentPrefsById,
    onSegmentOrderChange,
    onSegmentExpandedChange,
    disabled: isSearching,
    isMobile,
  });

  const visibleGroups = useMemo(
    () => orderedGroups.filter(group => getLinksGroupVisibleItemsCount(group) > 0),
    [orderedGroups],
  );

  useSegmentDnd({
    visibleGroups,
    expandedIds,
    onSortableDragEnd: handleSortableDragEnd,
    showDescription,
    showGroupsColors: preferences?.showGroupsColors?.value,
    favorite,
  });

  const allGroupsExpanded = visibleGroups.length > 0 && visibleGroups.every(({ id }) => expandedIds.includes(id));

  const handleToggleAllGroupsExpanded = useCallback(() => {
    const visibleIds = visibleGroups.map(({ id }) => id);

    if (allGroupsExpanded) {
      onExpandedChange(expandedIds.filter(id => !visibleIds.includes(id)));
      return;
    }

    onExpandedChange([...new Set([...expandedIds, ...visibleIds])]);
  }, [allGroupsExpanded, expandedIds, onExpandedChange, visibleGroups]);

  const segmentItems = useMemo(
    () =>
      segments.map(segment => ({
        value: segment.id,
        label: segment.label,
        icon: segment.icon,
      })),
    [segments],
  );

  const hasCards = visibleGroups.length > 0;

  const cards = (() => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => <SortableGroupSkeleton key={index} isMobile={isMobile} />);
    }

    if (hasCards) {
      return (
        <SortableContext items={visibleGroups.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
          <Accordion selectionMode='multiple' expanded={expandedIds} onExpandedChange={onExpandedChange}>
            {visibleGroups.map(({ id, label, icon, items, favoritesEnabled = true, blockColor, highlight }) => (
              <SortableGroup
                key={id}
                id={id}
                icon={icon}
                label={label}
                items={items}
                isExpanded={expandedIds.includes(id)}
                blockColor={resolveGroupBlockColor(blockColor, preferences?.showGroupsColors?.value)}
                showDescription={showDescription}
                isMobile={isMobile}
                enableServiceDrag={enableServiceDrag}
                favorite={favoritesEnabled ? favorite : undefined}
                onServiceClick={handleLinkClick}
                highlight={highlight}
              />
            ))}
          </Accordion>
        </SortableContext>
      );
    }

    return (
      <InfoBlock
        size='m'
        icon={{
          icon: isSearching ? SearchSVG : CrossSVG,
          appearance: 'neutral',
        }}
        content={isSearching ? t('noDataFound') : t('noData')}
        data-test-id={isSearching ? TEST_IDS.noDataFound : TEST_IDS.noData}
        data-mobile={isMobile || undefined}
        className={styles.noData}
      />
    );
  })();

  return (
    <>
      {search}

      <div className={cn(styles.content, className)} data-empty={(!loading && !hasCards) || undefined}>
        {!isSearching && (
          <>
            {isMobile && rightTop}

            <ContentToolbar
              segment={segmentId}
              onSegmentChange={setSegmentId}
              segmentItems={segmentItems}
              allGroupsExpanded={allGroupsExpanded}
              onToggleAllGroupsExpanded={handleToggleAllGroupsExpanded}
              preferences={preferences}
              isMobile={isMobile}
            />

            {!isMobile && rightTop}
          </>
        )}

        {cards}

        {footer}
      </div>
    </>
  );
}
