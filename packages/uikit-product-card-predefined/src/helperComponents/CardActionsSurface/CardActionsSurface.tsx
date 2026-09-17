import { Button } from '@ds/button';
import { InfoOutlineSVG } from '@ds/icons/interface/product';
import { CollapseVerticalSVG, ExpandVerticalSVG, StarFilledSVG, StarSVG } from '@ds/icons/interface/system';
import { Tooltip, TooltipProps, TRIGGER } from '@ds/tooltip';
import { preventEventDefault, preventEventDefaultAndPropagation } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactElement, RefObject, useCallback, useState } from 'react';

import { TOOLTIP_HOVER_DELAY_OPEN_MS, VISIBILITY_STRATEGY } from '../../constants';
import { cardPredefinedLocale } from '../../locale';
import { CardSize, FavoriteProps, VisibilityStrategy } from '../../types';
import styles from './styles.module.scss';

type TooltipType = 'info' | 'favorite' | 'expandable';

export type CardActionsSurfaceProps = {
  /**
   * Формат отображения действий: всегда или при наведении и фокусе
   * @default 'hover'
   */
  actionsVisibility?: VisibilityStrategy;
  /** Кнопка info с тултипом */
  tooltip?: Omit<TooltipProps, 'children'> & {
    buttonRef?: RefObject<HTMLButtonElement>;
    'data-test-id'?: string;
  };
  /** Кнопка «Избранное» */
  favorite?: FavoriteProps & {
    buttonRef?: RefObject<HTMLButtonElement>;
    'data-test-id'?: string;
  };
  /** Кнопка раскрытия */
  expandable?: {
    value: boolean;
    onClick(): void;
    buttonRef?: RefObject<HTMLButtonElement>;
  };
  /** Размер кнопок действий, для мобильного вида предполагается использовать `s` */
  actionsSize?: CardSize;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Callback, вызываемый при открытии тултипа */
  onTooltipOpenChange?(isOpen: boolean): void;
};

export function CardActionsSurface({
  actionsVisibility = VISIBILITY_STRATEGY.hover,
  tooltip,
  favorite,
  expandable,
  actionsSize = 'm',
  className,
  onTooltipOpenChange,
}: CardActionsSurfaceProps): ReactElement | null {
  const { t } = cardPredefinedLocale.useTranslations();

  const [visibleTooltip, setVisibleTooltip] = useState<TooltipType | undefined>(undefined);

  const getHandleTooltipOpenChange = useCallback(
    (tooltipType: TooltipType) => (isOpen: boolean) => {
      setVisibleTooltip(isOpen ? tooltipType : undefined);
      onTooltipOpenChange?.(isOpen);
    },
    [onTooltipOpenChange],
  );

  if (!tooltip && !favorite && !expandable) {
    return null;
  }

  const tooltipTrigger =
    tooltip?.trigger ??
    (actionsVisibility === VISIBILITY_STRATEGY.always ? TRIGGER.Click : TRIGGER.HoverAndFocusVisible);

  const handleExpandButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    preventEventDefaultAndPropagation(e);
    expandable?.onClick();
  };

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    preventEventDefaultAndPropagation(e);
    favorite?.onChange?.(!favorite.checked);
  };

  const { buttonRef: tooltipButtonRef, 'data-test-id': tooltipTestId, ...tooltipProps } = tooltip ?? {};

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={preventEventDefaultAndPropagation}
      className={cn(styles.root, className)}
      data-actions-visibility={actionsVisibility}
    >
      {tooltip && (
        <Tooltip
          {...tooltipProps}
          open={visibleTooltip === 'info'}
          onOpenChange={getHandleTooltipOpenChange('info')}
          tip={tooltip.tip}
          trigger={tooltipTrigger}
          hoverDelayOpen={TOOLTIP_HOVER_DELAY_OPEN_MS}
          triggerClassName={styles.tooltipTrigger}
        >
          {/* Кнопки действий — `as='span'` внутри интерактивной карточки (вложенный `<button>` невалиден),
              поэтому роль и доступное имя проставляем руками. */}
          <Button
            as='span'
            role='button'
            aria-label={t('actions.info')}
            size={actionsSize}
            appearance='neutral'
            view='simple'
            icon={<InfoOutlineSVG />}
            tabIndex={-1}
            onClick={preventEventDefault}
            innerRef={tooltipButtonRef}
            data-test-id={tooltipTestId}
          />
        </Tooltip>
      )}

      {favorite?.enabled && (
        <Tooltip
          tip={favorite.checked ? t('actions.favoriteRemove') : t('actions.favoriteAdd')}
          trigger={tooltipTrigger}
          triggerClassName={styles.tooltipTrigger}
          hoverDelayOpen={TOOLTIP_HOVER_DELAY_OPEN_MS}
          open={visibleTooltip === 'favorite'}
          onOpenChange={getHandleTooltipOpenChange('favorite')}
        >
          <Button
            as='span'
            role='button'
            aria-pressed={Boolean(favorite.checked)}
            size={actionsSize}
            appearance='neutral'
            view='simple'
            icon={favorite.checked ? <StarFilledSVG /> : <StarSVG />}
            onClick={handleFavoriteClick}
            className={styles.favorite}
            innerRef={favorite.buttonRef}
            tabIndex={-1}
            data-test-id={favorite['data-test-id']}
            data-checked={favorite.checked || undefined}
          />
        </Tooltip>
      )}

      {expandable && (
        <Tooltip
          tip={expandable.value ? t('actions.collapse') : t('actions.expand')}
          trigger={tooltipTrigger}
          triggerClassName={styles.tooltipTrigger}
          hoverDelayOpen={TOOLTIP_HOVER_DELAY_OPEN_MS}
          open={visibleTooltip === 'expandable'}
          onOpenChange={getHandleTooltipOpenChange('expandable')}
        >
          <Button
            as='span'
            role='button'
            aria-expanded={expandable.value}
            size={actionsSize}
            appearance='neutral'
            view='simple'
            icon={expandable.value ? <CollapseVerticalSVG /> : <ExpandVerticalSVG />}
            onClick={handleExpandButtonClick}
            className={styles.expandButton}
            innerRef={expandable.buttonRef}
            tabIndex={-1}
          />
        </Tooltip>
      )}
    </div>
  );
}
