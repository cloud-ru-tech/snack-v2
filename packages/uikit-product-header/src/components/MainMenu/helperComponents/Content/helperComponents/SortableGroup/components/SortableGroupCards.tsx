import { useMemo } from 'react';

import { InnerLink } from '../../../../../types';
import { DraggableServiceCard, ServiceCardProps } from '../../../../ServiceCard';
import styles from '../styles.module.scss';
import { splitIntoBlocks } from '../utils';
import { SubCategory } from './SubCategory';

export type SortableGroupCardsProps = Pick<
  ServiceCardProps,
  'showDescription' | 'isMobile' | 'favorite' | 'onServiceClick'
> & {
  groupId: string;
  items: InnerLink[];
  enableServiceDrag?: boolean;
  groupFavoritesEnabled?: boolean;
};

export function SortableGroupCards({
  groupId,
  items,
  showDescription,
  isMobile,
  enableServiceDrag,
  favorite,
  groupFavoritesEnabled,
  onServiceClick,
}: SortableGroupCardsProps) {
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
              showDescription={showDescription}
              isMobile={isMobile}
              dragDisabled={!enableServiceDrag}
              favorite={favorite}
              groupFavoritesEnabled={groupFavoritesEnabled}
              onServiceClick={onServiceClick}
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
              <DraggableServiceCard
                key={String(groupId) + service.id}
                groupId={groupId}
                service={service}
                favorite={favorite}
                isMobile={isMobile}
                onServiceClick={onServiceClick}
                showDescription={showDescription}
                dragDisabled={!enableServiceDrag}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
