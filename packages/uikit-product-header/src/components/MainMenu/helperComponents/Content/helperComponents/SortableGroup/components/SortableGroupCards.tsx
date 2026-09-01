import { InnerLink } from '../../../../../types';
import { hasNestedItems } from '../../../../../utils/innerLink';
import { DraggableServiceCard, ServiceCardProps } from '../../../../ServiceCard';
import styles from '../styles.module.scss';
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
  return (
    <div className={styles.groupBody} data-mobile={isMobile || undefined}>
      {items.map(service => {
        if (service.hidden) {
          return null;
        }

        const key = String(groupId) + service.id;

        if (hasNestedItems(service)) {
          return (
            <SubCategory
              key={key}
              groupId={groupId}
              service={service}
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
          <DraggableServiceCard
            key={key}
            groupId={groupId}
            service={service}
            favorite={favorite}
            isMobile={isMobile}
            onServiceClick={onServiceClick}
            showDescription={showDescription}
            dragDisabled={!enableServiceDrag}
          />
        );
      })}
    </div>
  );
}
