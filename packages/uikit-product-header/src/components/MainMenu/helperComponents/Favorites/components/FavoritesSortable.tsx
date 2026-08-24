import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DropTarget } from '@ds/drag-and-drop';
import { Scroll } from '@ds/scroll';
import { MouseEvent, ReactNode } from 'react';

import { FavoriteProps, InnerLink } from '../../../types';
import { FAVORITES_SEGMENT, FAVORITES_TEST_IDS, FavoritesSegment } from '../constants';
import { useFavoritesDnd } from '../hooks/useFavoritesDnd';
import styles from '../styles.module.scss';
import { getCommonCardProps } from '../utils';
import { EmptyState } from './EmptyState';
import { SortableFavoriteCard } from './SortableFavoriteCard';

type FavoritesSortableProps = {
  favorite: FavoriteProps;
  favoriteItems: InnerLink[];
  segment: FavoritesSegment;
  setSegment(segment: FavoritesSegment): void;
  isEmpty: boolean;
  recentCards: ReactNode;
  onFavoriteServiceClick(service: InnerLink): (event: MouseEvent<HTMLElement>) => void;
};

/**
 * Desktop-обёртка тела списка: реордер drag&drop + приём карточек из общей
 * сетки. Требует `<DndContext>`-предка, поэтому `useFavoritesDnd` вызывается
 * только здесь — на mobile этот компонент не рендерится вовсе (см. `Favorites`).
 */
export function FavoritesSortable({
  favorite,
  favoriteItems,
  segment,
  setSegment,
  isEmpty,
  recentCards,
  onFavoriteServiceClick,
}: FavoritesSortableProps) {
  const isFavoritesSegment = segment === FAVORITES_SEGMENT.Favorites;

  const { setNodeRef, listEndRef, favoriteSortableIds, insertIndex, isInsertingToEnd, showDropOver, showInsertNew } =
    useFavoritesDnd({ favorite, favoriteItems, segment, setSegment });

  return (
    <div className={styles.listScroll} data-insert-new={showInsertNew}>
      <DropTarget active={Boolean(showDropOver)} className={styles.dropTarget} aria-hidden />

      <Scroll className={styles.listScrollInner} overflow={{ x: 'hidden' }}>
        <div ref={setNodeRef} className={styles.list} data-test-id={FAVORITES_TEST_IDS.list}>
          {isEmpty && <EmptyState isFavoritesSegment={isFavoritesSegment} />}

          {!isEmpty && isFavoritesSegment && (
            <SortableContext items={favoriteSortableIds} strategy={verticalListSortingStrategy}>
              {favoriteItems.map((service, index) => (
                <SortableFavoriteCard
                  key={service.id}
                  serviceId={service.id}
                  showInsertIndicatorBefore={insertIndex === index}
                  showInsertIndicatorAfter={isInsertingToEnd && index === favoriteItems.length - 1}
                  isFirst={index === 0}
                  favorite={{
                    enabled: true,
                    checked: true,
                    onChange: favorite.onChange(service.id),
                  }}
                  {...getCommonCardProps(service, onFavoriteServiceClick(service))}
                />
              ))}

              <div ref={listEndRef} className={styles.listEnd} aria-hidden />
            </SortableContext>
          )}

          {!isEmpty && !isFavoritesSegment && recentCards}
        </div>
      </Scroll>
    </div>
  );
}
