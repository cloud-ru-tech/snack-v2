import { Button } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist } from '@ds/list';
import { SegmentControl, WIDTH } from '@ds/segment-control';
import { useEventHandler, useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, useMemo } from 'react';

import { useDesktopComfortClassName } from '../../../../hooks/useDesktopComfortClassName';
import { headerLocale } from '../../../../locale';
import { FavoriteProps, InnerLink } from '../../types';
import { resolveInnerLinksByIds } from '../../utils';
import { Content, FavoritesItemsSkeleton } from './components';
import { FAVORITES_SEGMENT, FAVORITES_TEST_IDS, FavoritesSegment } from './constants';
import styles from './styles.module.scss';

export type FavoritesProps = {
  /** Список избранных сервисов */
  favorite: FavoriteProps;
  /** Сервисы каталога по id для разрешения id в карточки */
  servicesById: ReadonlyMap<string, InnerLink>;
  /** CSS-класс строки заголовка (segment + кнопка настроек) */
  headerClassName?: string;
  /** Флаг мобильной раскладки */
  isMobile?: boolean;
};

export function Favorites({ favorite, servicesById, headerClassName, isMobile }: FavoritesProps) {
  const { t } = headerLocale.useTranslations();
  const loading = favorite.loading;
  const comfortClassName = useDesktopComfortClassName();

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
    () => resolveInnerLinksByIds(favorite.value, servicesById),
    [favorite.value, servicesById],
  );

  const recentItems = useMemo(
    () => resolveInnerLinksByIds(favorite.recentServices ?? [], servicesById),
    [favorite.recentServices, servicesById],
  );

  const resolvedSegment = segment ?? FAVORITES_SEGMENT.Favorites;

  // Стабильные по ссылке колбэки: иначе `memo` карточек и списков-по-сегменту ломается
  // при каждом рендере `Favorites` — см. `FavoritesReorderList`/`RecentList`/`FavoritesList`.
  const handleRecentServiceClick = useEventHandler((service: InnerLink) => (event: MouseEvent<HTMLElement>) => {
    favorite.onRecentServiceClick?.(service.id, event);
    service.onClick(event);
  });

  const handleFavoriteServiceClick = useEventHandler((service: InnerLink) => (event: MouseEvent<HTMLElement>) => {
    favorite.onFavoriteServiceClick?.(service.id, event);
    service.onClick(event);
  });

  return (
    <div className={styles.root} data-test-id={FAVORITES_TEST_IDS.root}>
      <div className={cn(styles.header, headerClassName)} data-test-id={FAVORITES_TEST_IDS.header}>
        <SegmentControl
          size='m'
          width={WIDTH.Full}
          value={segment}
          onChange={setSegment}
          className={styles.segmentControl}
          data-test-id={FAVORITES_TEST_IDS.segmentControl}
          items={segmentControlItems}
        />

        {favorite.actions && (
          <Droplist size='m' {...favorite.actions} className={comfortClassName} closeDroplistOnItemClick>
            <Button
              view='simple'
              size='m'
              appearance='neutral'
              icon={<KebabSVG size={24} />}
              data-test-id={FAVORITES_TEST_IDS.settingsButton}
              disabled={loading}
            />
          </Droplist>
        )}
      </div>

      {loading ? (
        <FavoritesItemsSkeleton />
      ) : (
        <Content
          isMobile={isMobile}
          favoriteIds={favorite.value}
          onFavoriteChange={favorite.onChange}
          favoriteItems={favoriteItems}
          recentItems={recentItems}
          segment={resolvedSegment}
          setSegment={setSegment}
          onFavoriteServiceClick={handleFavoriteServiceClick}
          onRecentServiceClick={handleRecentServiceClick}
        />
      )}
    </div>
  );
}
