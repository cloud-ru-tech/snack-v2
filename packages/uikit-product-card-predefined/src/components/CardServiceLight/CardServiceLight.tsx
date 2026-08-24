import { PolymorphicRef } from '@ds/card';
import { useThemeClassnames } from '@ds/theme';
import { TooltipProps } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { useValueControl, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  ComponentPropsWithoutRef,
  ElementType,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useRef,
  useState,
} from 'react';

import { TEST_IDS, TOOLTIP_HOVER_DELAY_OPEN_MS, VISIBILITY_STRATEGY } from '../../constants';
import {
  CardActionsSurface,
  CardActionsSurfaceProps,
  CardPromoTag,
  createCardActionsKeyDownHandler,
} from '../../helperComponents';
import { CardPromoTagProps, FavoriteProps, VisibilityStrategy } from '../../types';
import styles from './styles.module.scss';

const TARGET_BLANK = '_blank';

type BaseCardServiceLightProps = Pick<CardActionsSurfaceProps, 'actionsSize'> & {
  /** Иконка сервиса */
  icon?: ReactElement;
  /** Заголовок карточки */
  title: string;
  /** Настройки promo tag. При отсутствии не отображается */
  promoTag?: CardPromoTagProps;
  /** Настройки обрезки текста заголовка */
  truncate?: {
    /** Максимальное количество строк заголовка */
    title?: number;
  };
  /**
   * Формат отображения дополнительных действий: всегда или при наведении и фокусе
   * @default 'hover'
   */
  actionsVisibility?: VisibilityStrategy;
  /** Подсказка с иконкой «?» рядом с заголовком */
  tooltip?: Omit<TooltipProps, 'trigger' | 'size'>;
  /**
   * Настройки кнопки «Избранное».
   * Keyboard: ArrowRight на карточке → tooltip (если есть) → Favorite; ArrowLeft — в обратном порядке.
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

export type CardServiceLightProps<T extends ElementType = 'button'> = BaseCardServiceLightProps & {
  /** Полиморфный элемент: `'button'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardServiceLightProps | 'as' | 'ref'>;

export function CardServiceLight<T extends ElementType = 'button'>({
  as,
  innerRef,
  icon,
  title,
  promoTag,
  truncate,
  actionsVisibility: actionsVisibilityProp,
  favorite,
  tooltip,
  actionsSize,
  className,
  disabled = false,
  expandable,
  'data-test-id': dataTestId,
  ...rest
}: CardServiceLightProps<T>): ReactElement | null {
  const Component: ElementType = as ?? 'button';
  const cardRef = useRef<HTMLElement>(null);
  const tooltipTriggerRef = useRef<HTMLButtonElement>(null);
  const promoTagTooltipTriggerRef = useRef<HTMLElement>(null);
  const favoriteRef = useRef<HTMLButtonElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  const compactThemeClassName = useThemeClassnames({ density: 'compact' });

  const actionsVisibility = actionsVisibilityProp ?? VISIBILITY_STRATEGY.hover;

  const [isFavorite, setIsFavorite] = useValueControl<boolean>({
    value: favorite?.checked,
    defaultValue: false,
    onChange: favorite?.onChange,
  });
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

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
      tooltip && { ref: tooltipTriggerRef },
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

  let polymorphicProps: Record<string, unknown>;
  if (Component === 'a') {
    const { href, target, onClick, ...anchorRest } = restWithoutKeyDown as ComponentPropsWithoutRef<'a'>;
    polymorphicProps = {
      ...anchorRest,
      href: href ?? '#',
      target,
      rel: target === TARGET_BLANK ? 'noopener noreferrer' : undefined,
      onClick: disabled
        ? (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onClick?.(e);
          }
        : onClick,
    };
  } else if (Component === 'button') {
    const { type = 'button', onClick, ...buttonRest } = restWithoutKeyDown as ComponentPropsWithoutRef<'button'>;
    polymorphicProps = {
      type,
      disabled,
      onClick: disabled ? undefined : onClick,
      ...buttonRest,
    };
  } else {
    // Кастомный компонент (роутерный Link и т.п.) нативный `disabled` не понимает: гасим переход
    // тем же preventDefault, что и на анкоре — иначе disabled-карточка остаётся кликабельной.
    const { onClick, ...componentRest } = restWithoutKeyDown as { onClick?: MouseEventHandler<HTMLElement> };
    polymorphicProps = {
      ...componentRest,
      onClick: disabled
        ? (e: MouseEvent<HTMLElement>) => {
            e.preventDefault();
          }
        : onClick,
    };
  }

  return (
    <Component
      ref={mergeRefs(innerRef, cardRef)}
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? TEST_IDS.cardServiceLight}
      data-disabled={disabled || undefined}
      aria-disabled={Component !== 'button' && disabled ? true : undefined}
      tabIndex={Component !== 'button' && disabled ? -1 : undefined}
      onKeyDown={handleKeyDown}
      data-tooltip-open={isTooltipOpen || undefined}
      {...polymorphicProps}
    >
      <span className={styles.outlineBorder} aria-hidden />
      <div className={styles.container}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <div className={styles.content}>
          <Typography
            as='span'
            variant='body'
            size='m'
            className={styles.title}
            data-test-id={TEST_IDS.cardServiceLightTitle}
          >
            <TruncateString text={title} maxLines={truncate?.title} variant='end' />
          </Typography>

          {promoTag && (
            <CardPromoTag
              promoTag={promoTag}
              tooltipTrigger={tooltipTrigger}
              innerRef={promoTagTooltipTriggerRef}
              data-test-id={TEST_IDS.cardServiceLightPromoTag}
              className={cn(styles.promoTag, compactThemeClassName)}
            />
          )}
        </div>
      </div>

      <CardActionsSurface
        actionsSize={actionsSize}
        actionsVisibility={actionsVisibility}
        className={styles.cardActions}
        tooltip={
          tooltip
            ? {
                ...tooltip,
                'data-test-id': TEST_IDS.cardServiceLightTooltip,
                buttonRef: tooltipTriggerRef,
                open: isTooltipOpen,
                onOpenChange: setIsTooltipOpen,
                hoverDelayOpen: TOOLTIP_HOVER_DELAY_OPEN_MS,
              }
            : undefined
        }
        favorite={
          favorite?.enabled
            ? {
                enabled: favorite.enabled,
                checked: isFavorite,
                onChange: setIsFavorite,
                buttonRef: favoriteRef,
                'data-test-id': TEST_IDS.cardServiceLightFavorite,
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
    </Component>
  );
}

withInnerRefSupport(CardServiceLight);
