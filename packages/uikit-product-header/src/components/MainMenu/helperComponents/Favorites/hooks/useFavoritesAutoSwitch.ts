import { useDndMonitor } from '@dnd-kit/core';

import { isServiceSourceDragId } from '../../../utils';
import { FAVORITES_SEGMENT, FavoritesSegment } from '../constants';

type UseFavoritesAutoSwitchParams = {
  segment: FavoritesSegment;
  setSegment(segment: FavoritesSegment): void;
};

/**
 * Переключает панель на сегмент «Избранное», когда пользователь начинает тащить карточку
 * сервиса из каталога — независимо от того, какой сегмент сейчас активен (в т.ч. с «Недавнего»).
 *
 * Лёгкий подписчик: следит только за `onDragStart`, не тянет insert-indicator/droppable
 * (см. {@link useFavoritesReorder}), поэтому остаётся смонтированным постоянно, пока панель
 * избранного на экране (desktop) — в отличие от `useFavoritesReorder`, который монтируется
 * только вместе с {@link FavoritesReorderList} на сегменте «Избранное».
 */
export function useFavoritesAutoSwitch({ segment, setSegment }: UseFavoritesAutoSwitchParams) {
  useDndMonitor({
    onDragStart({ active }) {
      // Форсим сегмент только для карточки из каталога: избранное уже показывается на
      // сегменте Favorites, и его же карточки только там и рендерятся — при реордере внутри
      // списка `setSegment` вызывался бы с тем же значением. `useValueControl` не сравнивает
      // значение с текущим и всё равно зовёт `onSegmentChange` — лишний колбэк на каждый drag.
      if (isServiceSourceDragId(active.id) && segment !== FAVORITES_SEGMENT.Favorites) {
        setSegment(FAVORITES_SEGMENT.Favorites);
      }
    },
  });
}
