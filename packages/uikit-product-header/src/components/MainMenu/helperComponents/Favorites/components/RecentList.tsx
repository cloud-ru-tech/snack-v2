import { Scroll } from '@ds/scroll';
import { CardNavigation } from '@ds/uikit-product-card-predefined';
import { memo, MouseEvent, useMemo } from 'react';

import { FavoriteProps, InnerLink } from '../../../types';
import { FAVORITES_TEST_IDS } from '../constants';
import styles from '../styles.module.scss';
import { getCommonCardProps } from '../utils';
import { EmptyState } from './EmptyState';

type RecentListProps = {
  /** Id избранных сервисов — для звёздочки «в избранном» на карточках недавнего (`FavoriteProps['value']`). */
  favoriteIds: string[];
  /** Колбэк переключения избранного (`FavoriteProps['onChange']`). */
  onFavoriteChange: FavoriteProps['onChange'];
  /** Карточки сегмента «Недавнее». */
  items: InnerLink[];
  /** Колбэк клика по карточке. */
  onServiceClick(service: InnerLink): (event: MouseEvent<HTMLElement>) => void;
  /** Мобильная раскладка. */
  isMobile?: boolean;
};

/**
 * Тело сегмента «Недавнее» — общее для mobile и desktop: плоский список без drag&drop,
 * поэтому не требует `<DndContext>`-предка (в отличие от `FavoritesReorderList`).
 *
 * Принимает только `value`/`onChange` из `FavoriteProps`, а не весь объект — иначе `memo`
 * бьётся о смену несвязанных полей (`loading`, `actions`, `segment`, …).
 */
function RecentListBase({ favoriteIds, onFavoriteChange, items, onServiceClick, isMobile }: RecentListProps) {
  const isEmpty = items.length === 0;
  const favoriteIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  return (
    <div className={styles.listScroll}>
      <Scroll className={styles.listScrollInner} data-mobile={isMobile || undefined} overflow={{ x: 'hidden' }}>
        <div className={styles.list} data-test-id={FAVORITES_TEST_IDS.list}>
          {isEmpty ? (
            <EmptyState isFavoritesSegment={false} isMobile={isMobile} />
          ) : (
            items.map(service => (
              <CardNavigation
                key={service.id}
                as='a'
                className={styles.card}
                actionsVisibility={isMobile ? 'always' : 'hover'}
                favorite={{
                  enabled: true,
                  checked: favoriteIdsSet.has(service.id),
                  onChange: onFavoriteChange(service.id),
                }}
                {...getCommonCardProps(service, onServiceClick(service))}
              />
            ))
          )}
        </div>
      </Scroll>
    </div>
  );
}

export const RecentList = memo(RecentListBase);
