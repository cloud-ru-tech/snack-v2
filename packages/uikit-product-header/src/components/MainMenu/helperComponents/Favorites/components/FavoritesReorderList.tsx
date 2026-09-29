import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DropTarget } from '@ds/drag-and-drop';
import { Scroll } from '@ds/scroll';
import { memo, MouseEvent } from 'react';

import { FavoriteProps, InnerLink } from '../../../types';
import { FAVORITES_TEST_IDS } from '../constants';
import { useFavoritesReorder } from '../hooks/useFavoritesReorder';
import styles from '../styles.module.scss';
import { getCommonCardProps } from '../utils';
import { EmptyState } from './EmptyState';
import { SortableFavoriteCard } from './SortableFavoriteCard';

type FavoritesReorderListProps = {
  /** Id избранных сервисов (`FavoriteProps['value']`). */
  favoriteIds: string[];
  /** Колбэк переключения избранного (`FavoriteProps['onChange']`). */
  onFavoriteChange: FavoriteProps['onChange'];
  /** Карточки избранных сервисов. */
  items: InnerLink[];
  /** Колбэк клика по карточке. */
  onServiceClick(service: InnerLink): (event: MouseEvent<HTMLElement>) => void;
};

/**
 * Desktop-тело сегмента «Избранное»: реордер drag&drop + приём карточек из общей сетки.
 * Требует `<DndContext>`-предка, поэтому {@link useFavoritesReorder} вызывается только здесь —
 * монтируется, только пока активен этот сегмент (см. `Favorites`/`FavoritesDesktop`).
 * Mobile-аналог без реордера — {@link FavoritesList}.
 *
 * Принимает только реально используемые поля `FavoriteProps` (`value`/`onChange`), а не весь
 * объект — иначе `memo` бьётся о смену несвязанных полей (`loading`, `actions`, `segment`, …).
 */
function FavoritesReorderListBase({ favoriteIds, onFavoriteChange, items, onServiceClick }: FavoritesReorderListProps) {
  const { setNodeRef, listEndRef, favoriteSortableIds, insertIndex, isInsertingToEnd, showDropOver, showInsertNew } =
    useFavoritesReorder({ favoriteIds, favoriteItems: items });

  const isEmpty = items.length === 0;

  return (
    <div className={styles.listScroll} data-insert-new={showInsertNew}>
      <DropTarget active={Boolean(showDropOver)} className={styles.dropTarget} aria-hidden />

      <Scroll className={styles.listScrollInner} overflow={{ x: 'hidden' }}>
        <div ref={setNodeRef} className={styles.list} data-test-id={FAVORITES_TEST_IDS.list}>
          {isEmpty ? (
            <EmptyState isFavoritesSegment />
          ) : (
            <SortableContext items={favoriteSortableIds} strategy={verticalListSortingStrategy}>
              {items.map((service, index) => (
                <SortableFavoriteCard
                  key={service.id}
                  serviceId={service.id}
                  showInsertIndicatorBefore={insertIndex === index}
                  showInsertIndicatorAfter={isInsertingToEnd && index === items.length - 1}
                  isFirst={index === 0}
                  favorite={{
                    enabled: true,
                    checked: true,
                    onChange: onFavoriteChange(service.id),
                  }}
                  {...getCommonCardProps(service, onServiceClick(service))}
                />
              ))}

              <div ref={listEndRef} className={styles.listEnd} aria-hidden />
            </SortableContext>
          )}
        </div>
      </Scroll>
    </div>
  );
}

export const FavoritesReorderList = memo(FavoritesReorderListBase);
