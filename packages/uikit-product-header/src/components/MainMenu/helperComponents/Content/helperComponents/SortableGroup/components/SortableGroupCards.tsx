import { memo, useMemo } from 'react';

import { InnerLink } from '../../../../../types';
import { GridServiceCard } from '../../../../ServiceCard';
import { useCardsContext } from '../../../cardsContext';
import styles from '../styles.module.scss';
import { splitIntoBlocks } from '../utils';
import { SubCategory } from './SubCategory';

export type SortableGroupCardsProps = {
  /** Id группы-предка. */
  groupId: string;
  /** Карточки сервисов группы. */
  items: InnerLink[];
  /** Разрешено ли добавление карточек группы в избранное. */
  groupFavoritesEnabled?: boolean;
};

function SortableGroupCardsBase({ groupId, items, groupFavoritesEnabled }: SortableGroupCardsProps) {
  const { isMobile, showDescription, dragEnabled, favoriteIds, onFavoriteChange, onServiceClick } = useCardsContext();

  const cardFavoriteChange = favoriteIds ? onFavoriteChange : undefined;

  const blocks = useMemo(() => splitIntoBlocks(items), [items]);

  return (
    <div className={styles.groupBlocks}>
      {blocks.map(block => {
        if (block.type === 'subcategory') {
          return (
            <SubCategory
              key={String(groupId) + block.service.id}
              groupId={groupId}
              service={block.service}
              groupFavoritesEnabled={groupFavoritesEnabled}
            />
          );
        }

        return (
          <div
            key={String(groupId) + block.services[0].id}
            className={styles.groupBody}
            data-mobile={isMobile || undefined}
            data-show-description={showDescription || undefined}
          >
            {block.services.map(service => (
              <GridServiceCard
                key={String(groupId) + service.id}
                groupId={groupId}
                service={service}
                favoriteChecked={favoriteIds?.has(service.id)}
                onFavoriteChange={cardFavoriteChange}
                isMobile={isMobile}
                onServiceClick={onServiceClick}
                showDescription={showDescription}
                dragEnabled={dragEnabled}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export const SortableGroupCards = memo(SortableGroupCardsBase);
