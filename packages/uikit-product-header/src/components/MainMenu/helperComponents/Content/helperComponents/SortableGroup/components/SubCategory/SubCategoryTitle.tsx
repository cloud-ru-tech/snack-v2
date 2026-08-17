import { Typography } from '@ds/typography';
import { CardActionsSurface, createCardActionsKeyDownHandler } from '@ds/uikit-product-card-predefined';
import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { stopEventPropagation } from '@ds/utils';
import { MouseEvent, useRef } from 'react';

import { getLinkEmblem } from '../../../../../../utils';
import { DraggableServiceCard, DraggableServiceCardProps } from '../../../../../ServiceCard';
import { TEST_IDS } from '../../../../constants';
import styles from './styles.module.scss';

export type SubCategoryTitleProps = {
  groupId: string;
} & Pick<
  DraggableServiceCardProps,
  'expandable' | 'service' | 'onServiceClick' | 'favorite' | 'showDescription' | 'isMobile' | 'dragDisabled'
>;

export function SubCategoryTitle({
  groupId,
  service,
  showDescription: showDescriptionProp,
  isMobile,
  dragDisabled,
  favorite,
  onServiceClick,
  expandable,
}: SubCategoryTitleProps) {
  const titleRef = useRef<HTMLAnchorElement>(null);
  const tooltipTriggerRef = useRef<HTMLButtonElement>(null);
  const favoriteRef = useRef<HTMLButtonElement>(null);

  const handleServiceClick = (event: MouseEvent<HTMLElement>) => {
    stopEventPropagation(event);
    onServiceClick?.(service, event);
  };

  const titleTestId = `${TEST_IDS.subcategoryTitle}-${service.id}`;

  const isFavorite = Boolean(favorite?.value.includes(service.id));
  const showDescription = showDescriptionProp && Boolean(service.description);
  const hasTooltip = !showDescription && service.description;

  const handleKeyDown = createCardActionsKeyDownHandler({
    cardRef: titleRef,
    items: [
      hasTooltip ? { ref: tooltipTriggerRef } : null,
      favorite
        ? {
            ref: favoriteRef,
            onActivate: () => favorite.onChange(service.id)(!isFavorite),
          }
        : null,
    ],
  });

  if (expandable?.value) {
    return (
      <div className={styles.subcategoryTitle}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className={styles.subcategoryTitleRow} onKeyDown={handleKeyDown}>
          <TitleClickable
            as='a'
            href={service.href}
            onClick={handleServiceClick}
            innerRef={titleRef}
            title={service.label}
            icon={getLinkEmblem(service)}
            className={styles.subcategoryTitleClickable}
            data-test-id={titleTestId}
          />

          <CardActionsSurface
            className={styles.subcategoryTitleActions}
            actionsVisibility='always'
            tooltip={
              hasTooltip
                ? {
                    tip: service.description,
                    buttonRef: tooltipTriggerRef,
                    trigger: isMobile ? 'click' : 'hoverAndFocusVisible',
                    'data-test-id': `${titleTestId}-tooltip`,
                  }
                : undefined
            }
            favorite={
              favorite
                ? {
                    enabled: true,
                    checked: isFavorite,
                    onChange: favorite.onChange(service.id),
                    buttonRef: favoriteRef,
                    'data-test-id': `${titleTestId}-favorite`,
                  }
                : undefined
            }
            /* Кнопка раскрытия в заголовке скрыта до проработки «мегасервисов» (FF-8674):
               раскрытие идёт кликом по самому заголовку. */
          />
        </div>

        {showDescription && (
          <Typography
            as='p'
            variant='body'
            size='s'
            className={styles.subcategoryDescription}
            data-test-id={`${titleTestId}-description`}
          >
            {service.description}
          </Typography>
        )}
      </div>
    );
  }

  return (
    <div className={styles.subcategoryTitleDraggable} onPointerDown={stopEventPropagation}>
      <DraggableServiceCard
        groupId={groupId}
        service={service}
        favorite={favorite}
        isMobile={isMobile}
        onServiceClick={onServiceClick}
        showDescription={showDescriptionProp}
        dragDisabled={dragDisabled}
        expandable={expandable}
      />
    </div>
  );
}
