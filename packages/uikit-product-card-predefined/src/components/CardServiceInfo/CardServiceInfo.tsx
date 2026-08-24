import { Card, PolymorphicRef } from '@ds/card';
import { useThemeClassnames } from '@ds/theme';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { useValueControl, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ComponentPropsWithoutRef, ElementType, KeyboardEventHandler, ReactElement, useRef } from 'react';

import { TEST_IDS, VISIBILITY_STRATEGY } from '../../constants';
import {
  CardActionsSurface,
  CardActionsSurfaceProps,
  CardPromoTag,
  createCardActionsKeyDownHandler,
} from '../../helperComponents';
import { CardPromoTagProps, FavoriteProps, VisibilityStrategy } from '../../types';
import styles from './styles.module.scss';

type BaseCardServiceInfoProps = Pick<CardActionsSurfaceProps, 'actionsSize'> & {
  /** Иконка сервиса */
  icon?: ReactElement;
  /** Заголовок карточки */
  title: string;
  /** Описание сервиса */
  description: string;
  /** Настройки promo tag. При отсутствии не отображается */
  promoTag?: CardPromoTagProps;
  /**
   * Формат отображения дополнительных действий: всегда или при наведении и фокусе
   * @default 'hover'
   */
  actionsVisibility?: VisibilityStrategy;
  /**
   * Настройки кнопки «Избранное».
   * Keyboard: ArrowRight на карточке → Favorite → expand; ArrowLeft — в обратном порядке.
   */
  favorite?: FavoriteProps;
  /** Неактивное состояние */
  disabled?: boolean;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
  /** Настройки кнопки раскрытия */
  expandable?: {
    value: boolean;
    onClick(): void;
  };
};

export type CardServiceInfoProps<T extends ElementType = 'button'> = BaseCardServiceInfoProps & {
  /** Полиморфный элемент: `'button'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardServiceInfoProps | 'as' | 'ref'>;

export function CardServiceInfo<T extends ElementType = 'button'>({
  as,
  innerRef,
  icon,
  title,
  description,
  promoTag,
  actionsVisibility: actionsVisibilityProp,
  favorite,
  actionsSize = 'm',
  className,
  disabled,
  expandable,
  'data-test-id': dataTestId,
  ...rest
}: CardServiceInfoProps<T>): ReactElement | null {
  const cardRef = useRef<HTMLElement>(null);
  const favoriteRef = useRef<HTMLButtonElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const promoTagTooltipTriggerRef = useRef<HTMLElement>(null);

  const compactThemeClassName = useThemeClassnames({ density: 'compact' });

  const actionsVisibility = actionsVisibilityProp ?? VISIBILITY_STRATEGY.hover;

  const visibleActions = [favorite?.enabled, expandable].filter(Boolean);

  const [isFavorite, setIsFavorite] = useValueControl<boolean>({
    value: favorite?.checked,
    defaultValue: false,
    onChange: favorite?.onChange,
  });

  const tooltipTrigger = actionsVisibility === VISIBILITY_STRATEGY.hover ? 'hoverAndFocusVisible' : 'click';

  const { onKeyDown: onKeyDownProp, ...restWithoutKeyDown } = rest as ComponentPropsWithoutRef<T> & {
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
  };

  const handleKeyDown = createCardActionsKeyDownHandler({
    disabled,
    cardRef,
    onKeyDown: onKeyDownProp,
    items: [
      promoTag && { ref: promoTagTooltipTriggerRef },
      favorite?.enabled && {
        ref: favoriteRef,
        onActivate: () => setIsFavorite(!isFavorite),
      },
      expandable && {
        ref: expandButtonRef,
        onActivate: () => expandable.onClick(),
      },
    ],
  });

  return (
    <Card<T>
      as={(as ?? 'button') as T}
      innerRef={mergeRefs(innerRef, cardRef)}
      disabled={disabled}
      interactive
      radius='s'
      view='outline'
      backgroundPredefined='neutralBackground1Level'
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? TEST_IDS.cardServiceInfo}
      onKeyDown={handleKeyDown}
      {...(restWithoutKeyDown as ComponentPropsWithoutRef<T>)}
    >
      <div className={styles.container}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <div className={styles.textContent}>
          <div className={styles.titleRow}>
            <div
              className={styles.titleContainer}
              data-actions-visibility={actionsVisibility}
              data-actions-size={actionsSize}
              data-visible-actions={visibleActions.length}
            >
              <Typography
                as='span'
                variant='body'
                size='m'
                className={styles.title}
                data-test-id={TEST_IDS.cardServiceInfoTitle}
              >
                <TruncateString text={title} maxLines={1} variant='end' />
              </Typography>

              {promoTag && (
                <CardPromoTag
                  promoTag={promoTag}
                  tooltipTrigger={tooltipTrigger}
                  innerRef={promoTagTooltipTriggerRef}
                  data-test-id={TEST_IDS.cardServiceInfoPromoTag}
                  className={cn(styles.promoTag, compactThemeClassName)}
                />
              )}
            </div>

            <CardActionsSurface
              actionsSize={actionsSize}
              actionsVisibility={actionsVisibility}
              className={styles.actions}
              favorite={
                favorite?.enabled
                  ? {
                      enabled: favorite.enabled,
                      checked: isFavorite,
                      onChange: setIsFavorite,
                      buttonRef: favoriteRef,
                      'data-test-id': TEST_IDS.cardServiceInfoFavorite,
                    }
                  : undefined
              }
              expandable={
                expandable
                  ? {
                      value: expandable.value,
                      onClick: expandable.onClick,
                      buttonRef: expandButtonRef,
                    }
                  : undefined
              }
            />
          </div>

          <Typography
            as='p'
            variant='body'
            size='s'
            className={styles.description}
            data-test-id={TEST_IDS.cardServiceInfoDescription}
          >
            <TruncateString text={description} maxLines={2} variant='end' />
          </Typography>
        </div>
      </div>
    </Card>
  );
}

withInnerRefSupport(CardServiceInfo);
