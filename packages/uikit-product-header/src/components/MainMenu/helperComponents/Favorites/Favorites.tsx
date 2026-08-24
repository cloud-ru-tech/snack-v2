import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { Scroll } from '@ds/scroll';
import { SegmentControl, WIDTH } from '@ds/segment-control';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, useMemo } from 'react';

import { headerLocale } from '../../../../locale';
import { FavoriteProps, InnerLink, LinksGroup } from '../../types';
import { resolveInnerLinksByIds } from '../../utils';
import { EmptyState, FavoritesItemsSkeleton, FavoritesSortable } from './components';
import { FAVORITES_SEGMENT, FAVORITES_TEST_IDS, FavoritesSegment } from './constants';
import styles from './styles.module.scss';
import { getCommonCardProps } from './utils';

export type FavoritesProps = {
  /** Список избранных сервисов */
  favorite: FavoriteProps;
  /** Группы сервисов для разрешения id в карточки */
  allServiceGroups: LinksGroup[];
  /** CSS-класс строки заголовка (segment + кнопка настроек) */
  headerClassName?: string;
  /** Флаг мобильной раскладки */
  isMobile?: boolean;
};

export function Favorites({ favorite, allServiceGroups, headerClassName, isMobile }: FavoritesProps) {
  const { t } = headerLocale.useTranslations();
  const loading = favorite.loading;

  const [segment, setSegment] = useValueControl<FavoritesSegment>({
    value: favorite.segment,
    defaultValue: FAVORITES_SEGMENT.Favorites,
    onChange: favorite.onSegmentChange,
  });

  const segmentControlItems = useMemo(
    () => [
      { value: FAVORITES_SEGMENT.Favorites, label: t('favorite.title'), disabled: loading },
      { value: FAVORITES_SEGMENT.Recent, label: t('recent.title'), disabled: loading },
    ],
    [t, loading],
  );

  const favoriteItems = useMemo(
    () => resolveInnerLinksByIds(favorite.value, allServiceGroups),
    [favorite.value, allServiceGroups],
  );

  const recentItems = useMemo(
    () => resolveInnerLinksByIds(favorite.recentServices ?? [], allServiceGroups),
    [favorite.recentServices, allServiceGroups],
  );

  const resolvedSegment = segment ?? FAVORITES_SEGMENT.Favorites;
  const isFavoritesSegment = resolvedSegment === FAVORITES_SEGMENT.Favorites;
  const isEmpty = (isFavoritesSegment ? favoriteItems : recentItems).length === 0;

  const handleRecentServiceClick = (service: InnerLink) => (event: MouseEvent<HTMLElement>) => {
    favorite.onRecentServiceClick?.(service.id, event);
    service.onClick(event);
  };

  const handleFavoriteServiceClick = (service: InnerLink) => (event: MouseEvent<HTMLElement>) => {
    favorite.onFavoriteServiceClick?.(service.id, event);
    service.onClick(event);
  };

  const recentCards = recentItems.map(service => (
    <CardServiceLight
      key={service.id}
      as='a'
      className={styles.card}
      favorite={{
        enabled: true,
        checked: favorite.value.includes(service.id),
        onChange: favorite.onChange(service.id),
      }}
      {...getCommonCardProps(service, handleRecentServiceClick(service))}
    />
  ));

  const content = (() => {
    if (loading) {
      return <FavoritesItemsSkeleton />;
    }

    /* Drag&drop реордер и приём карточек из сетки — только на desktop (требует
      <DndContext>-предка). На mobile нет reorder-жеста, добавление/удаление
      избранного идёт через звёздочку на карточке. */
    return isMobile ? (
      <div className={styles.listScroll}>
        <Scroll className={styles.listScrollInner} overflow={{ x: 'hidden' }}>
          <div className={styles.list} data-test-id={FAVORITES_TEST_IDS.list}>
            {isEmpty && <EmptyState isFavoritesSegment={isFavoritesSegment} isMobile />}

            {!isEmpty &&
              isFavoritesSegment &&
              favoriteItems.map(service => (
                <CardServiceLight
                  key={service.id}
                  as='a'
                  className={styles.card}
                  actionsVisibility='always'
                  actionsSize='s'
                  favorite={{
                    enabled: true,
                    checked: true,
                    onChange: favorite.onChange(service.id),
                  }}
                  {...getCommonCardProps(service, handleFavoriteServiceClick(service))}
                />
              ))}

            {!isEmpty && !isFavoritesSegment && recentCards}
          </div>
        </Scroll>
      </div>
    ) : (
      <FavoritesSortable
        favorite={favorite}
        favoriteItems={favoriteItems}
        segment={resolvedSegment}
        setSegment={setSegment}
        isEmpty={isEmpty}
        recentCards={recentCards}
        onFavoriteServiceClick={handleFavoriteServiceClick}
      />
    );
  })();

  return (
    <div className={styles.root} data-test-id={FAVORITES_TEST_IDS.root}>
      <div className={cn(styles.header, headerClassName)} data-test-id={FAVORITES_TEST_IDS.header}>
        <SegmentControl
          size='m'
          width={WIDTH.Full}
          value={loading ? undefined : segment}
          onChange={setSegment}
          className={styles.segmentControl}
          data-test-id={FAVORITES_TEST_IDS.segmentControl}
          items={segmentControlItems}
        />

        {favorite.actions && (
          <Droplist size='m' {...favorite.actions} closeDroplistOnItemClick>
            <Button
              view='function'
              size='m'
              appearance='neutral'
              icon={<KebabSVG size={24} />}
              data-test-id={FAVORITES_TEST_IDS.settingsButton}
              disabled={loading}
            />
          </Droplist>
        )}
      </div>

      {content}
    </div>
  );
}
