import { PolymorphicRef } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';
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
  FocusEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  PointerEvent,
  ReactElement,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TEST_IDS, VISIBILITY_STRATEGY } from '../../constants';
import { CardActionsSurface, CardPromoTag, createCardActionsKeyDownHandler } from '../../helperComponents';
import { CardPromoTagProps, FavoriteProps, VisibilityStrategy } from '../../types';
import styles from './styles.module.scss';

const TARGET_BLANK = '_blank';

const { appearance: ACRYLIC_APPEARANCE, level: ACRYLIC_LEVEL } = backgroundPredefinedFillToAcrylic(
  BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
);

type BaseCardNavigationProps = {
  /** Иконка сервиса */
  icon?: ReactElement;
  /** Заголовок карточки */
  title: string;
  /**
   * Описание сервиса. Передано (в том числе пустой строкой) — карточка в подробном виде: с рамкой
   * и описанием под заголовком. Не передано — компактный вид в одну строку.
   *
   * Вид меняется без пересоздания DOM: переключение описания — обновление пропа, а не перемонтирование.
   */
  description?: string;
  /** Настройки promo tag. При отсутствии не отображается */
  promoTag?: CardPromoTagProps;
  /** Настройки обрезки текста заголовка. В подробном виде заголовок всегда в одну строку */
  truncate?: {
    /** Максимальное количество строк заголовка */
    title?: number;
  };
  /**
   * Формат отображения дополнительных действий: всегда или при наведении и фокусе
   * @default 'hover'
   */
  actionsVisibility?: VisibilityStrategy;
  /** Подсказка с иконкой «?» рядом с заголовком. Показывается только в компактном виде */
  tooltip?: Omit<TooltipProps, 'trigger' | 'size'>;
  /**
   * Настройки кнопки «Избранное».
   * Keyboard: ArrowRight на карточке → promo tag → tooltip (если есть) → Favorite → expand; ArrowLeft — в обратном порядке.
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

export type CardNavigationProps<T extends ElementType = 'button'> = BaseCardNavigationProps & {
  /** Полиморфный элемент: `'button'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardNavigationProps | 'as' | 'ref'>;

/**
 * Карточка навигации к сервису: объединяет `CardServiceLight` (компактный вид) и `CardServiceInfo`
 * (вид с описанием) в один компонент с одним деревом DOM.
 */
export function CardNavigation<T extends ElementType = 'button'>({
  as,
  innerRef,
  icon,
  title,
  description,
  promoTag,
  truncate,
  actionsVisibility: actionsVisibilityProp,
  favorite,
  tooltip,
  className,
  disabled = false,
  expandable,
  'data-test-id': dataTestId,
  ...rest
}: CardNavigationProps<T>): ReactElement | null {
  const Component: ElementType = as ?? 'button';
  const cardRef = useRef<HTMLElement>(null);
  const tooltipTriggerRef = useRef<HTMLButtonElement>(null);
  const promoTagTooltipTriggerRef = useRef<HTMLElement>(null);
  const favoriteRef = useRef<HTMLButtonElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  const compactThemeClassName = useThemeClassnames({ density: 'compact' });

  const isDetailed = description !== undefined;
  const actionsVisibility = actionsVisibilityProp ?? VISIBILITY_STRATEGY.hover;
  // Подсказка «?» есть только у компактного вида: в подробном её роль играет описание.
  const cardTooltip = isDetailed ? undefined : tooltip;
  const visibleActionsCount = Number(Boolean(favorite?.enabled)) + Number(Boolean(expandable));

  const [isFavorite, setIsFavorite] = useValueControl<boolean>({
    value: favorite?.checked,
    defaultValue: false,
    onChange: favorite?.onChange,
  });
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  // Панель действий (`Tooltip` на floating-ui + кнопки) в режиме `hover` скрыта до наведения, `always` показывает панель сразу.
  // При рендере большого количества карточек на одном экране может вызывать лаги, поэтому монтируем её при первом наведении или фокусе.
  const [isActionsRequested, setIsActionsRequested] = useState<boolean>(false);
  const shouldRenderActions = isActionsRequested || actionsVisibility === VISIBILITY_STRATEGY.always;

  const tooltipTrigger = actionsVisibility === VISIBILITY_STRATEGY.hover ? 'hoverAndFocusVisible' : 'click';

  const {
    onKeyDown: onKeyDownProp,
    onPointerEnter: onPointerEnterProp,
    onFocus: onFocusProp,
    ...restWithoutKeyDown
  } = rest as ComponentPropsWithoutRef<T> & {
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    onPointerEnter?(event: PointerEvent<HTMLElement>): void;
    onFocus?(event: FocusEvent<HTMLElement>): void;
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    setIsActionsRequested(true);
    onPointerEnterProp?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    setIsActionsRequested(true);
    onFocusProp?.(event);
  };

  const handleKeyDown = useMemo(
    () =>
      createCardActionsKeyDownHandler({
        disabled,
        cardRef,
        onKeyDown: onKeyDownProp,
        items: [
          promoTag && { ref: promoTagTooltipTriggerRef },
          cardTooltip && { ref: tooltipTriggerRef },
          favorite?.enabled && {
            ref: favoriteRef,
            onActivate: () => setIsFavorite(!isFavorite),
          },
          expandable && {
            ref: expandButtonRef,
            onActivate: () => expandable.onClick(),
          },
        ],
      }),
    [disabled, onKeyDownProp, promoTag, cardTooltip, favorite?.enabled, expandable, isFavorite, setIsFavorite],
  );

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
      data-test-id={dataTestId ?? TEST_IDS.cardNavigation}
      data-detailed={isDetailed || undefined}
      data-disabled={disabled || undefined}
      data-actions-visibility={actionsVisibility}
      data-visible-actions={visibleActionsCount}
      data-acrylic-appearance={ACRYLIC_APPEARANCE}
      data-acrylic-level={ACRYLIC_LEVEL}
      aria-disabled={Component !== 'button' && disabled ? true : undefined}
      tabIndex={Component !== 'button' && disabled ? -1 : undefined}
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      onFocus={handleFocus}
      data-tooltip-open={isTooltipOpen || undefined}
      {...polymorphicProps}
    >
      {/* Порядок узлов фиксирован: условные слои занимают свои позиции, остальные не пересоздаются. */}
      {isDetailed && <span className={styles.acrylic} aria-hidden data-acrylic-background />}
      <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />

      <div className={styles.container}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <div className={styles.textContent}>
          <div className={styles.titleRow}>
            <Typography
              as='span'
              variant='body'
              size='m'
              className={styles.title}
              data-test-id={TEST_IDS.cardNavigationTitle}
            >
              <TruncateString text={title} maxLines={isDetailed ? 1 : truncate?.title} variant='end' />
            </Typography>

            {promoTag && (
              <CardPromoTag
                promoTag={promoTag}
                tooltipTrigger={tooltipTrigger}
                innerRef={promoTagTooltipTriggerRef}
                data-test-id={TEST_IDS.cardNavigationPromoTag}
                className={compactThemeClassName}
              />
            )}
          </div>

          {isDetailed && (
            <Typography
              as='p'
              variant='body'
              size='s'
              className={styles.description}
              data-test-id={TEST_IDS.cardNavigationDescription}
            >
              <TruncateString text={description} maxLines={2} variant='end' />
            </Typography>
          )}
        </div>
      </div>

      {shouldRenderActions && (
        <CardActionsSurface
          actionsVisibility={actionsVisibility}
          className={styles.cardActions}
          onTooltipOpenChange={setIsTooltipOpen}
          tooltip={
            cardTooltip
              ? {
                  ...cardTooltip,
                  'data-test-id': TEST_IDS.cardNavigationTooltip,
                  buttonRef: tooltipTriggerRef,
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
                  'data-test-id': TEST_IDS.cardNavigationFavorite,
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
      )}

      {isDetailed && <span className={styles.outlineBorder} aria-hidden />}
    </Component>
  );
}

withInnerRefSupport(CardNavigation);
