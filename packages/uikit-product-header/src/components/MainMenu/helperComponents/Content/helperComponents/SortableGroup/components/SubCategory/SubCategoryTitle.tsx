import { Typography } from '@ds/typography';
import { CardActionsSurface, createCardActionsKeyDownHandler } from '@ds/uikit-product-card-predefined';
import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { stopEventPropagation } from '@ds/utils';
import { memo, MouseEvent, useCallback, useMemo, useRef } from 'react';

import { getLinkEmblem } from '../../../../../../utils';
import { GridServiceCard, GridServiceCardProps } from '../../../../../ServiceCard';
import { useCardsContext } from '../../../../cardsContext';
import { TEST_IDS } from '../../../../constants';
import styles from './styles.module.scss';

export type SubCategoryTitleProps = {
  /** Id группы-предка. */
  groupId: string;

  /** Кнопка избранного показывается только если для группы избранное включено. */
  groupFavoritesEnabled?: boolean;
} & Pick<GridServiceCardProps, 'expandable' | 'service'>;

function SubCategoryTitleBase({ groupId, service, groupFavoritesEnabled, expandable }: SubCategoryTitleProps) {
  const {
    isMobile,
    showDescription: showDescriptionProp,
    dragEnabled,
    favoriteIds,
    onFavoriteChange,
    onServiceClick,
  } = useCardsContext();

  const titleRef = useRef<HTMLAnchorElement>(null);
  const tooltipTriggerRef = useRef<HTMLButtonElement>(null);
  const favoriteRef = useRef<HTMLButtonElement>(null);

  const { id, description, icon } = service;

  const handleServiceClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      stopEventPropagation(event);
      onServiceClick?.(service, event);
    },
    [onServiceClick, service],
  );

  const titleTestId = `${TEST_IDS.subcategoryTitle}-${id}`;

  const cardFavoriteChange = groupFavoritesEnabled && favoriteIds ? onFavoriteChange : undefined;
  const isFavorite = Boolean(favoriteIds?.has(id));
  const showDescription = showDescriptionProp && Boolean(description);
  const hasTooltip = !showDescription && Boolean(description);

  const handleKeyDown = useMemo(
    () =>
      createCardActionsKeyDownHandler({
        cardRef: titleRef,
        items: [
          hasTooltip ? { ref: tooltipTriggerRef } : null,
          cardFavoriteChange
            ? {
                ref: favoriteRef,
                onActivate: () => cardFavoriteChange(id)(!isFavorite),
              }
            : null,
        ],
      }),
    [hasTooltip, cardFavoriteChange, id, isFavorite],
  );

  const emblem = useMemo(() => getLinkEmblem({ icon }), [icon]);

  if (expandable?.value) {
    return (
      <div className={styles.subcategoryTitle} data-mobile={isMobile || undefined}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className={styles.subcategoryTitleRow} onKeyDown={handleKeyDown}>
          <TitleClickable
            as='a'
            href={service.href}
            onClick={handleServiceClick}
            innerRef={titleRef}
            title={service.label}
            icon={emblem}
            className={styles.subcategoryTitleClickable}
            data-test-id={titleTestId}
          />

          <CardActionsSurface
            className={styles.subcategoryTitleActions}
            actionsVisibility='always'
            tooltip={
              hasTooltip
                ? {
                    tip: description,
                    buttonRef: tooltipTriggerRef,
                    trigger: isMobile ? 'click' : 'hoverAndFocusVisible',
                    'data-test-id': `${titleTestId}-tooltip`,
                  }
                : undefined
            }
            favorite={
              cardFavoriteChange
                ? {
                    enabled: true,
                    checked: isFavorite,
                    onChange: (checked: boolean) => cardFavoriteChange(id)(checked),
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
            {description}
          </Typography>
        )}
      </div>
    );
  }

  return (
    // Карточка — ссылка `<a>`: клик по ней бы долетал до `onClick={toggleOpen}` заголовка
    // родительского CollapseBlockTertiary (см. TODO там) и лишний раз переключал аккордеон.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.subcategoryTitleDraggable}
      onPointerDown={stopEventPropagation}
      onClick={stopEventPropagation}
    >
      <GridServiceCard
        groupId={groupId}
        service={service}
        favoriteChecked={isFavorite}
        onFavoriteChange={cardFavoriteChange}
        isMobile={isMobile}
        onServiceClick={onServiceClick}
        showDescription={showDescriptionProp}
        dragEnabled={dragEnabled}
        expandable={expandable}
      />
    </div>
  );
}

export const SubCategoryTitle = memo(SubCategoryTitleBase);
