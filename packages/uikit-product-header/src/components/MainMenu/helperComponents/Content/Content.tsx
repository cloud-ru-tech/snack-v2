import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Accordion } from '@ds/accordion';
import { CrossSVG, SearchSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';
import { useEventHandler, useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactNode, useCallback, useDeferredValue, useMemo } from 'react';

import { headerLocale } from '../../../../locale';
import { EMPTY_ARRAY } from '../../../../utils/emptyArray';
import { noop } from '../../../../utils/noop';
import { shouldBeOpenedInNewTab } from '../../../../utils/shouldBeOpenedInNewTab';
import {
  FavoriteProps,
  InnerLink,
  LinksGroup,
  MainMenuPreferencesProps,
  MainMenuSegment,
  MainMenuSegmentPrefs,
} from '../../types';
import { getLinksGroupVisibleItemsCount, resolveGroupBlockColor } from '../../utils';
import { MountAnimation } from '../MountAnimation';
import { CardsContext, CardsContextValue } from './cardsContext';
import { TEST_IDS } from './constants';
import { ContentToolbar } from './helperComponents/ContentToolbar';
import { SortableGroup, SortableGroupSkeleton } from './helperComponents/SortableGroup';
import { useContentSegmentsSortable } from './hooks/useContentSegmentsSortable';
import { useProgressiveCount } from './hooks/useProgressiveCount';
import { useSegmentDnd } from './hooks/useSegmentDnd';
import styles from './styles.module.scss';

export type ContentProps = {
  /**
   * Сегменты правой панели (сетка карточек) — только каталог.
   *
   * При поиске: совпадения из сегментов без `pinBottomOnSearch` → `platformGroups` → сегменты с `pinBottomOnSearch`.
   * Если один и тот же {@link InnerLink.id} совпал сразу в нескольких сегментах — остаётся только
   * первое по этому приоритету вхождение, остальные (и опустевшие после этого группы) не показываются.
   * При `segments.length > 1` показывается SegmentControl (скрывается во время поиска).
   * Порядок и раскрытие групп — через `segmentPrefs` и колбэки ниже.
   */
  segments?: MainMenuSegment[];

  /** Результаты поиска (уже смерженные); в обычном режиме не используются. */
  searchGroups?: LinksGroup[];

  /**
   * Пользовательские prefs сегментов (порядок / раскрытие групп).
   *
   * Нет записи для сегмента или omit `order` / `expanded` → uncontrolled для этого поля.
   */
  segmentPrefs?: MainMenuSegmentPrefs[];

  /**
   * Активный сегмент правой панели (значение SegmentControl, см. {@link MainMenuSegment.id}).
   *
   * Не передано — неуправляемое состояние (дефолт — первый сегмент с видимыми карточками).
   */
  activeSegmentId?: string;

  /** Колбэк смены активного сегмента правой панели. */
  onActiveSegmentChange?(segmentId: string): void;

  /**
   * Колбэк после DnD групп в сегменте (без id синтетической группы избранного).
   */
  onSegmentOrderChange?(segmentId: string, orderedGroupIds: string[]): void;

  /**
   * Колбэк при изменении набора раскрытых групп сегмента
   * (без id синтетической группы избранного).
   */
  onSegmentExpandedChange?(segmentId: string, expandedGroupIds: string[]): void;

  /**
   * Колбэк клика по карточке сервиса в сегменте.
   */
  onSegmentServiceClick?(service: InnerLink, e?: MouseEvent<HTMLElement>): void;

  /** Избранное. Без пропа группа-предок карточек драга из избранного не активируется. */
  favorite?: FavoriteProps;

  /**
   * Настройки меню (модалка по кнопке в тулбаре): описания карточек, цвета групп.
   *
   * Не передано — кнопка настроек в тулбаре не отображается.
   */
  preferences?: MainMenuPreferencesProps;

  /** Текущее значение поисковой строки — переключает контент между каталогом и результатами поиска. */
  searchValue?: string;

  /** Слот поисковой строки — рендерится над контентом. */
  search?: ReactNode;

  /** Слот над тулбаром правой колонки (например, баннеры) */
  rightTop?: ReactNode;

  /** Слот под сеткой карточек. */
  footer?: ReactNode;

  /** Мобильная раскладка. */
  isMobile?: boolean;

  /** CSS-класс корневого элемента. */
  className?: string;
  /** Флаг загрузки данных */
  loading?: boolean;
};

export function Content({
  searchValue,
  search,
  rightTop,
  segments,
  searchGroups = EMPTY_ARRAY,
  segmentPrefs,
  activeSegmentId,
  onActiveSegmentChange,
  onSegmentOrderChange,
  onSegmentExpandedChange,
  onSegmentServiceClick,
  className,
  footer,
  favorite,
  isMobile,
  preferences,
  loading,
}: ContentProps) {
  const { t } = headerLocale.useTranslations();

  const showDescription = useDeferredValue(preferences?.showDescription.value ?? false);

  const segmentPrefsById = useMemo(() => new Map((segmentPrefs ?? []).map(prefs => [prefs.id, prefs])), [segmentPrefs]);

  const defaultSegmentId = activeSegmentId ?? segments?.[0]?.id ?? '';

  const [segmentId = defaultSegmentId, setSegmentId] = useValueControl<string>({
    value: activeSegmentId,
    defaultValue: defaultSegmentId,
    onChange: onActiveSegmentChange,
  });

  const isSearching = Boolean(searchValue);
  const enableServiceDrag = Boolean(favorite) && !isMobile && !isSearching;

  // Ссылки на обработчики стабильны: иначе `memo` карточек ломается при каждом рендере потребителя.
  const handleLinkClick = useEventHandler((service: InnerLink, e?: MouseEvent<HTMLElement>) => {
    if (service.disabled) {
      e?.preventDefault();
      return;
    }

    if (!shouldBeOpenedInNewTab(e)) {
      e?.preventDefault();
    }

    onSegmentServiceClick?.(service, e);
    service.onClick?.(e);
  });

  const handleFavoriteChange = useEventHandler((productId: string) => (favorite ? favorite.onChange(productId) : noop));

  const favoriteValue = favorite?.value;
  const favoriteIds = useMemo(() => (favoriteValue ? new Set(favoriteValue) : undefined), [favoriteValue]);
  const showGroupsColors = preferences?.showGroupsColors?.value;

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
    showGroupsColors,
    favoriteIds,
    onFavoriteChange: handleFavoriteChange,
  });

  // Первый экран монтируется сразу, остальные группы дорисовываются порциями (см. `useProgressiveCount`).
  const renderedGroupsCount = useProgressiveCount(visibleGroups.length, `${segmentId}|${isSearching}`, !loading);
  const renderedGroups = useMemo(
    () => (renderedGroupsCount < visibleGroups.length ? visibleGroups.slice(0, renderedGroupsCount) : visibleGroups),
    [visibleGroups, renderedGroupsCount],
  );

  const expandedIdsSet = useMemo(() => new Set(expandedIds), [expandedIds]);
  const visibleGroupIds = useMemo(() => visibleGroups.map(({ id }) => id), [visibleGroups]);

  const allGroupsExpanded = visibleGroups.length > 0 && visibleGroupIds.every(id => expandedIdsSet.has(id));

  const handleToggleAllGroupsExpanded = useCallback(() => {
    if (allGroupsExpanded) {
      const visibleIdsSet = new Set(visibleGroupIds);

      onExpandedChange(expandedIds.filter(id => !visibleIdsSet.has(id)));
      return;
    }

    onExpandedChange([...new Set([...expandedIds, ...visibleGroupIds])]);
  }, [allGroupsExpanded, expandedIds, onExpandedChange, visibleGroupIds]);

  const cardsContext = useMemo<CardsContextValue>(
    () => ({
      showDescription,
      isMobile,
      dragEnabled: enableServiceDrag,
      favoriteIds,
      onFavoriteChange: favoriteIds ? handleFavoriteChange : undefined,
      onServiceClick: handleLinkClick,
    }),
    [showDescription, isMobile, enableServiceDrag, favoriteIds, handleFavoriteChange, handleLinkClick],
  );

  const segmentItems = useMemo(
    () =>
      segments?.map(segment => ({
        value: segment.id,
        label: segment.label,
        icon: segment.icon,
      })),
    [segments],
  );

  const hasCards = visibleGroups.length > 0;

  const mountAnimationType = isMobile ? undefined : 'fade-slide-up-right';

  const cards = (() => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => <SortableGroupSkeleton key={index} isMobile={isMobile} />);
    }

    if (hasCards) {
      return (
        <SortableContext items={visibleGroupIds} strategy={verticalListSortingStrategy}>
          <CardsContext.Provider value={cardsContext}>
            <Accordion selectionMode='multiple' expanded={expandedIds} onExpandedChange={onExpandedChange}>
              {renderedGroups.map(({ id, label, icon, items, favoritesEnabled, blockColor, highlight }) => (
                <SortableGroup
                  key={id}
                  id={id}
                  icon={icon}
                  label={label}
                  items={items}
                  isExpanded={expandedIdsSet.has(id)}
                  blockColor={resolveGroupBlockColor(blockColor, showGroupsColors)}
                  isMobile={isMobile}
                  enableServiceDrag={enableServiceDrag}
                  groupFavoritesEnabled={favoritesEnabled}
                  appear={!isMobile}
                  highlight={highlight}
                />
              ))}
            </Accordion>
          </CardsContext.Provider>
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

      <div
        className={cn(styles.content, className)}
        data-mobile={isMobile || undefined}
        data-empty={(!loading && !hasCards) || undefined}
      >
        {!isSearching && (
          <>
            <MountAnimation type={mountAnimationType} className={styles.top}>
              <ContentToolbar
                segment={segmentId}
                onSegmentChange={setSegmentId}
                segmentItems={segmentItems}
                allGroupsExpanded={allGroupsExpanded}
                onToggleAllGroupsExpanded={handleToggleAllGroupsExpanded}
                preferences={preferences}
                isMobile={isMobile}
                loading={loading}
              />

              {rightTop}
            </MountAnimation>
          </>
        )}

        {cards}

        {footer}
      </div>
    </>
  );
}
