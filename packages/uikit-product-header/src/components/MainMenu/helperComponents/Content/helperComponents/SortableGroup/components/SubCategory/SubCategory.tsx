import { Accordion } from '@ds/accordion';
import { useCallback, useMemo, useState } from 'react';

import { getNestedServiceGroupId, getSubCategoryId } from '../../../../../../utils/innerLink';
import { DraggableServiceCard, ServiceCardProps } from '../../../../../ServiceCard';
import { TEST_IDS } from '../../../../constants';
import baseGroupStyles from '../../styles.module.scss';
import styles from './styles.module.scss';
import { SubCategoryTitle } from './SubCategoryTitle';

const noop = () => {};

export type SubCategoryProps = Pick<
  ServiceCardProps,
  'service' | 'onServiceClick' | 'favorite' | 'showDescription' | 'isMobile'
> & {
  groupId: string;
  dragDisabled?: boolean;
  groupFavoritesEnabled?: boolean;
};

export function SubCategory({
  groupId,
  service,
  showDescription,
  isMobile,
  dragDisabled,
  favorite,
  onServiceClick,
  groupFavoritesEnabled,
}: SubCategoryProps) {
  const subcategoryId = getSubCategoryId(groupId, service.id);
  const nestedGroupId = getNestedServiceGroupId(groupId, service.id);
  const nestedItems = useMemo(() => service.items?.filter(item => !item.hidden) ?? [], [service.items]);
  const hasItems = nestedItems.length > 0;

  const viewMode = service.viewMode ?? 'expanded';

  const isExpandableEnabled = hasItems && viewMode === 'expandable';

  // Раскрытие подкатегории — локальное uncontrolled состояние: наружу его пока не выводим.
  const [isExpanded, setIsExpanded] = useState<string | undefined>(hasItems ? subcategoryId : undefined);

  const handleExpandedChange = useCallback(() => {
    if (isExpandableEnabled) {
      setIsExpanded(isExpanded ? undefined : subcategoryId);
    }
  }, [isExpanded, subcategoryId, isExpandableEnabled]);

  // 'group-title-only' — только заголовок подкатегории, без раскрываемого тела и кнопки
  // переключения: карточка ведёт себя как обычная ссылка (см. isSubCategoryCard в utils/innerLink).
  if (viewMode === 'group-title-only') {
    return (
      <div className={styles.subcategory} data-title-only data-test-id={`${TEST_IDS.subcategory}-${service.id}`}>
        <SubCategoryTitle
          groupId={groupId}
          service={service}
          expandable={{ value: true, onClick: noop }}
          showDescription={showDescription}
          isMobile={isMobile}
          dragDisabled={dragDisabled}
          favorite={groupFavoritesEnabled ? favorite : undefined}
          onServiceClick={onServiceClick}
        />
      </div>
    );
  }

  if (viewMode === 'expanded') {
    return (
      <div className={styles.subcategory} data-test-id={`${TEST_IDS.subcategory}-${service.id}`}>
        <SubCategoryTitle
          groupId={groupId}
          service={service}
          expandable={{
            value: Boolean(isExpanded),
            onClick: handleExpandedChange,
          }}
          showDescription={showDescription}
          isMobile={isMobile}
          dragDisabled={dragDisabled}
          favorite={groupFavoritesEnabled ? favorite : undefined}
          onServiceClick={onServiceClick}
        />

        <div className={baseGroupStyles.groupBody} data-subcategory-body='expanded' data-mobile={isMobile || undefined}>
          {nestedItems.map(nestedService => (
            <DraggableServiceCard
              key={nestedGroupId + nestedService.id}
              groupId={nestedGroupId}
              service={nestedService}
              favorite={favorite}
              isMobile={isMobile}
              onServiceClick={onServiceClick}
              showDescription={showDescription}
              dragDisabled={dragDisabled}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.subcategory} data-test-id={`${TEST_IDS.subcategory}-${service.id}`}>
      <Accordion selectionMode='single' expanded={isExpanded} onExpandedChange={handleExpandedChange}>
        <Accordion.CollapseBlockTertiary
          id={subcategoryId}
          showChevron={false}
          className={styles.subcategoryAccordion}
          afterTitle={
            <SubCategoryTitle
              groupId={groupId}
              service={service}
              expandable={{
                value: Boolean(isExpanded),
                onClick: handleExpandedChange,
              }}
              showDescription={showDescription}
              isMobile={isMobile}
              dragDisabled={dragDisabled}
              favorite={groupFavoritesEnabled ? favorite : undefined}
              onServiceClick={onServiceClick}
            />
          }
        >
          <div className={baseGroupStyles.groupBody} data-subcategory-body data-mobile={isMobile || undefined}>
            {nestedItems.map(nestedService => (
              <DraggableServiceCard
                key={nestedGroupId + nestedService.id}
                groupId={nestedGroupId}
                service={nestedService}
                favorite={favorite}
                isMobile={isMobile}
                onServiceClick={onServiceClick}
                showDescription={showDescription}
                dragDisabled={dragDisabled}
              />
            ))}
          </div>
        </Accordion.CollapseBlockTertiary>
      </Accordion>
    </div>
  );
}
