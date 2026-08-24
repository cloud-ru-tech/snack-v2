import { Button } from '@ds/button';
import { InfoOutlineSVG } from '@ds/icons/interface/product';
import { CollapseVerticalSVG, ExpandVerticalSVG, StarFilledSVG, StarSVG } from '@ds/icons/interface/system';
import { Tooltip, TooltipProps, TRIGGER } from '@ds/tooltip';
import { preventEventDefault, preventEventDefaultAndPropagation } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactElement, RefObject } from 'react';

import { VISIBILITY_STRATEGY } from '../../constants';
import { cardPredefinedLocale } from '../../locale';
import { CardSize, FavoriteProps, VisibilityStrategy } from '../../types';
import styles from './styles.module.scss';

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
};

export function CardActionsSurface({
  actionsVisibility = VISIBILITY_STRATEGY.hover,
  tooltip,
  favorite,
  expandable,
  actionsSize = 'm',
  className,
}: CardActionsSurfaceProps): ReactElement | null {
  const { t } = cardPredefinedLocale.useTranslations();

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
        <Tooltip {...tooltipProps} tip={tooltip.tip} trigger={tooltipTrigger} triggerClassName={styles.tooltipTrigger}>
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
        <Button
          as='span'
          role='button'
          aria-label={favorite.checked ? t('actions.favoriteRemove') : t('actions.favoriteAdd')}
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
      )}

      {expandable && (
        <Button
          as='span'
          role='button'
          aria-label={expandable.value ? t('actions.collapse') : t('actions.expand')}
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
      )}
    </div>
  );
}
