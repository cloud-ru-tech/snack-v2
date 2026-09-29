import { MouseEvent } from 'react';

import { FavoriteProps, InnerLink } from '../../../types';
import { FAVORITES_SEGMENT, FavoritesSegment } from '../constants';
import { useFavoritesAutoSwitch } from '../hooks/useFavoritesAutoSwitch';
import { FavoritesList } from './FavoritesList';
import { FavoritesReorderList } from './FavoritesReorderList';
import { RecentList } from './RecentList';

type ContentProps = {
  /** Мобильная раскладка — сегмент «Избранное» рендерится без drag&drop. */
  isMobile?: boolean;
  /** Id избранных сервисов (`FavoriteProps['value']`). */
  favoriteIds: string[];
  /** Колбэк переключения избранного (`FavoriteProps['onChange']`). */
  onFavoriteChange: FavoriteProps['onChange'];
  /** Карточки избранных сервисов. */
  favoriteItems: InnerLink[];
  /** Карточки сегмента «Недавнее». */
  recentItems: InnerLink[];
  /** Активный сегмент («Избранное» / «Недавнее»). */
  segment: FavoritesSegment;
  /** Колбэк смены активного сегмента. */
  setSegment(segment: FavoritesSegment): void;
  /** Колбэк клика по карточке сервиса в сегменте «Избранное». */
  onFavoriteServiceClick(service: InnerLink): (event: MouseEvent<HTMLElement>) => void;
  /** Колбэк клика по карточке сервиса в сегменте «Недавнее». */
  onRecentServiceClick(service: InnerLink): (event: MouseEvent<HTMLElement>) => void;
};

type SegmentContentBodyProps = Omit<ContentProps, 'setSegment'>;

/**
 * Тело списка — общее для mobile и desktop: сегмент «Недавнее» одинаков в обеих раскладках,
 * сегмент «Избранное» различается только реордером (`FavoritesReorderList` на desktop,
 * статичный `FavoritesList` на mobile — там нет reorder-жеста).
 */
function ContentBody({
  isMobile,
  favoriteIds,
  onFavoriteChange,
  favoriteItems,
  recentItems,
  segment,
  onFavoriteServiceClick,
  onRecentServiceClick,
}: SegmentContentBodyProps) {
  if (segment === FAVORITES_SEGMENT.Favorites) {
    return isMobile ? (
      <FavoritesList
        onFavoriteChange={onFavoriteChange}
        items={favoriteItems}
        onServiceClick={onFavoriteServiceClick}
      />
    ) : (
      <FavoritesReorderList
        favoriteIds={favoriteIds}
        onFavoriteChange={onFavoriteChange}
        items={favoriteItems}
        onServiceClick={onFavoriteServiceClick}
      />
    );
  }

  return (
    <RecentList
      favoriteIds={favoriteIds}
      onFavoriteChange={onFavoriteChange}
      items={recentItems}
      onServiceClick={onRecentServiceClick}
      isMobile={isMobile}
    />
  );
}

/**
 * Desktop-обёртка над телом списка: цепляет `useFavoritesAutoSwitch` (следит за стартом drag
 * карточки из каталога и переключает сегмент на «Избранное», даже если сейчас открыто
 * «Недавнее» — раньше, чем домонтируется `FavoritesReorderList`). Требует `<DndContext>`-предка,
 * поэтому существует отдельным компонентом от mobile-пути — иначе `useDndMonitor` внутри
 * упадёт при отсутствии `<DndContext>` (на mobile `<Favorites>` в него не обёрнут).
 */
function ContentWithAutoSwitch({ segment, setSegment, ...rest }: ContentProps) {
  useFavoritesAutoSwitch({ segment, setSegment });

  return <ContentBody segment={segment} {...rest} />;
}

/**
 * Выбирает DnD-обвязку по раскладке: `isMobile` рендерит тело без каких-либо DnD-хуков,
 * desktop — оборачивает в {@link SegmentContentWithAutoSwitch}. Сама развилка «что показать
 * на сегменте „Избранное“» живёт внутри {@link SegmentContentBody}, а не здесь — дублировать
 * компонент целиком ради одного отличающегося списка не нужно.
 */
export function Content({ isMobile, setSegment, ...rest }: ContentProps) {
  if (isMobile) {
    return <ContentBody isMobile {...rest} />;
  }

  return <ContentWithAutoSwitch setSegment={setSegment} {...rest} />;
}
