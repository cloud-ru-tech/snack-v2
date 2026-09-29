import { Accordion } from '@ds/accordion';
import { memo, useCallback, useMemo, useState } from 'react';

import { noop } from '../../../../../../../../utils/noop';
import { InnerLink } from '../../../../../../types';
import { getNestedServiceGroupId, getSubCategoryId } from '../../../../../../utils/innerLink';
import { GridServiceCard } from '../../../../../ServiceCard';
import { useCardsContext } from '../../../../cardsContext';
import { TEST_IDS } from '../../../../constants';
import baseGroupStyles from '../../styles.module.scss';
import styles from './styles.module.scss';
import { SubCategoryTitle } from './SubCategoryTitle';

const TITLE_ONLY_EXPANDABLE = { value: true, onClick: noop };

type SubCategoryBodyProps = {
  nestedGroupId: string;
  items: InnerLink[];
  variant: 'expanded' | 'expandable';
};

const SubCategoryBody = memo(function SubCategoryBody({ nestedGroupId, items, variant }: SubCategoryBodyProps) {
  const { isMobile, showDescription, dragEnabled, favoriteIds, onFavoriteChange, onServiceClick } = useCardsContext();

  const cardFavoriteChange = favoriteIds ? onFavoriteChange : undefined;

  return (
    <div
      className={baseGroupStyles.groupBody}
      data-subcategory-body={variant === 'expanded' ? 'expanded' : true}
      data-mobile={isMobile || undefined}
      data-show-description={showDescription || undefined}
    >
      {items.map(nestedService => (
        <GridServiceCard
          key={nestedGroupId + nestedService.id}
          groupId={nestedGroupId}
          service={nestedService}
          favoriteChecked={favoriteIds?.has(nestedService.id)}
          onFavoriteChange={cardFavoriteChange}
          isMobile={isMobile}
          onServiceClick={onServiceClick}
          showDescription={showDescription}
          dragEnabled={dragEnabled}
        />
      ))}
    </div>
  );
});

export type SubCategoryProps = {
  /** Id группы-предка. */
  groupId: string;
  /** Карточка подкатегории (с непустым {@link InnerLink.items}). */
  service: InnerLink;
  /** Разрешено ли добавление карточек группы в избранное. */
  groupFavoritesEnabled?: boolean;
};

function SubCategoryBase({ groupId, service, groupFavoritesEnabled }: SubCategoryProps) {
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

  const expandable = useMemo(
    () => ({ value: Boolean(isExpanded), onClick: handleExpandedChange }),
    [isExpanded, handleExpandedChange],
  );

  const testId = `${TEST_IDS.subcategory}-${service.id}`;

  const title = (
    <SubCategoryTitle
      groupId={groupId}
      service={service}
      expandable={viewMode === 'group-title-only' ? TITLE_ONLY_EXPANDABLE : expandable}
      groupFavoritesEnabled={groupFavoritesEnabled}
    />
  );

  // 'group-title-only' — только заголовок подкатегории, без раскрываемого тела и кнопки
  // переключения: карточка ведёт себя как обычная ссылка (см. isSubCategoryCard в utils/innerLink).
  if (viewMode === 'group-title-only') {
    return (
      <div className={styles.subcategory} data-title-only data-test-id={testId}>
        {title}
      </div>
    );
  }

  if (viewMode === 'expanded') {
    return (
      <div className={styles.subcategory} data-test-id={testId}>
        {title}

        <SubCategoryBody nestedGroupId={nestedGroupId} items={nestedItems} variant='expanded' />
      </div>
    );
  }

  return (
    <div className={styles.subcategory} data-test-id={testId}>
      <Accordion selectionMode='single' expanded={isExpanded} onExpandedChange={handleExpandedChange}>
        <Accordion.CollapseBlockTertiary
          id={subcategoryId}
          showChevron={false}
          className={styles.subcategoryAccordion}
          afterTitle={title}
        >
          <SubCategoryBody nestedGroupId={nestedGroupId} items={nestedItems} variant='expandable' />
        </Accordion.CollapseBlockTertiary>
      </Accordion>
    </div>
  );
}

export const SubCategory = memo(SubCategoryBase);
