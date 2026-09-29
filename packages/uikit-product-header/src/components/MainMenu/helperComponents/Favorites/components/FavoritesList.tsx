import { Scroll } from '@ds/scroll';
import { CardNavigation } from '@ds/uikit-product-card-predefined';
import { memo, MouseEvent } from 'react';

import { FavoriteProps, InnerLink } from '../../../types';
import { FAVORITES_TEST_IDS } from '../constants';
import styles from '../styles.module.scss';
import { getCommonCardProps } from '../utils';
import { EmptyState } from './EmptyState';

type FavoritesListProps = {
  /** Колбэк переключения избранного (`FavoriteProps['onChange']`). */
  onFavoriteChange: FavoriteProps['onChange'];
  /** Карточки избранных сервисов. */
  items: InnerLink[];
  /** Колбэк клика по карточке. */
  onServiceClick(service: InnerLink): (event: MouseEvent<HTMLElement>) => void;
};

/**
 * Mobile-тело сегмента «Избранное»: статичный список без drag&drop — на mobile нет
 * reorder-жеста, добавление/удаление избранного идёт через звёздочку на карточке.
 * Desktop-аналог с реордером — {@link FavoritesReorderList}.
 *
 * Принимает только `onChange` из `FavoriteProps` — `value` тут не нужен (все `items` уже
 * избранные), а весь объект `favorite` целиком сбивал бы `memo` на несвязанных полях.
 */
function FavoritesListBase({ onFavoriteChange, items, onServiceClick }: FavoritesListProps) {
  const isEmpty = items.length === 0;

  return (
    <div className={styles.listScroll}>
      <Scroll className={styles.listScrollInner} data-mobile overflow={{ x: 'hidden' }}>
        <div className={styles.list} data-test-id={FAVORITES_TEST_IDS.list}>
          {isEmpty ? (
            <EmptyState isFavoritesSegment isMobile />
          ) : (
            items.map(service => (
              <CardNavigation
                key={service.id}
                as='a'
                className={styles.card}
                actionsVisibility='always'
                favorite={{
                  enabled: true,
                  checked: true,
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

export const FavoritesList = memo(FavoritesListBase);
