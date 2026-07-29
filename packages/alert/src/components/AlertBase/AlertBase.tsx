import { ChevronDownSVG, ChevronUpSVG, CrossSVG } from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactElement, ReactNode, RefObject } from 'react';

import { ALIGN, APPEARANCE, APPEARANCE_TO_THEME_COLOR, TEST_IDS } from '../../constants';
import { Align, Appearance, Size } from '../../types';
import { AlertButton, AlertButtonProps } from '../AlertButton';
import { VARIANT } from '../AlertButton/constants';
import { Variant } from '../AlertButton/types';
import { useAlertCollapse } from './hooks';
import styles from './styles.module.scss';
import { getAlertAppearanceIcon } from './utils';

/** Общие поля `Alert` / `AlertTop` (без `variant`, `outline`, без обёртки `WithSupportProps`). */
export type AlertSharedFieldProps = {
  /** Отображать иконку */
  icon?: boolean;
  /** Заголовок */
  title?: string;
  /**
   * Максимальное кол-во строк (только при `collapsible={false}`).
   * @default title: 1
   */
  truncate?: {
    title?: number;
  };
  /** Описание */
  content: ReactNode;
  /** Колбек закрытия */
  onClose?: () => void;
  /** Внешний вид */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** CSS-класс */
  className?: string;
  /** Кнопки в футере */
  actions?: {
    primary: Omit<AlertButtonProps, 'variant' | 'size'>;
    secondary?: Omit<AlertButtonProps, 'variant' | 'size'>;
  };
  /**
   * Режим сворачивания: длинный текст, ссылка и кнопки скрыты до раскрытия (inline; как MobileAlertTop).
   * При `true` не используйте `TruncateString` на том же узле, что и измерение — см. документацию.
   */
  collapsible?: boolean;
  /** Выравнивание контента */
  align?: Align;
};

type AlertBaseCommonProps = WithSupportProps<AlertSharedFieldProps>;

type AlertBaseProps =
  | (AlertBaseCommonProps & { variant: 'inline'; outline?: boolean })
  | (AlertBaseCommonProps & { variant: 'top' });

type RenderFooterActionButtonsProps = {
  actions: NonNullable<AlertSharedFieldProps['actions']>;
  size: Size;
  buttonVariant: Variant;
  invertFocusOutlineColor: boolean;
};

function renderFooterActionButtons({
  actions,
  size,
  buttonVariant,
  invertFocusOutlineColor,
}: RenderFooterActionButtonsProps): ReactElement[] {
  return (['primary', 'secondary'] as const).flatMap(slot => {
    const cfg = actions[slot];
    if (!cfg) {
      return [];
    }
    return [
      <AlertButton
        key={slot}
        {...cfg}
        size={size}
        variant={buttonVariant}
        onClick={e => {
          e.stopPropagation();
          cfg.onClick?.(e);
        }}
        invertFocusOutlineColor={invertFocusOutlineColor}
      />,
    ];
  });
}

export function AlertBase(props: AlertBaseProps) {
  const {
    variant,
    icon = true,
    title,
    truncate,
    content,
    onClose,
    appearance = APPEARANCE.Neutral,
    className,
    actions,
    size = 'm',
    collapsible = false,
    align = ALIGN.Vertical,
    ...rest
  } = props;

  const isTop = variant === 'top';
  const themeColor = APPEARANCE_TO_THEME_COLOR[appearance];
  const testIds = isTop ? TEST_IDS.alertTop : TEST_IDS.alert;
  const buttonVariant = isTop ? VARIANT.OnAccent : VARIANT.OnColor;
  const inlineColorProps = !isTop ? { 'data-color': themeColor } : {};
  const invertFocusOutlineColor = isTop && appearance === APPEARANCE.Neutral;

  const hasFooterActions = Boolean(actions?.primary || actions?.secondary);

  const collapse = useAlertCollapse({
    collapsible,
    title,
    content,
    hasFooterActions,
  });

  const { titleRef, descriptionRef, isExpanded, canExpand, toggleExpand } = collapse;
  const isHorizontal = align === ALIGN.Horizontal;
  const showCloseButton = Boolean(onClose && (!collapsible || !canExpand || isExpanded));
  const showExpandChevron = collapsible && canExpand && !isHorizontal;
  const showFooterActions = Boolean(actions) && !isHorizontal && (!collapsible || isExpanded);
  const showFooter = showFooterActions || (showExpandChevron && showCloseButton);

  const handleAlertClick = () => {
    if (collapsible && canExpand) {
      toggleExpand();
    }
  };

  const handleOnClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.();
  };

  const titleCollapsed = collapsible && !isExpanded;
  const dataExpandedAttr = (collapsible && isExpanded) || undefined;

  let titleContent: ReactNode = null;
  if (title) {
    const titleShared = {
      className: styles.title,
      'data-size': size,
      'data-test-id': testIds.title,
      ...inlineColorProps,
    };
    titleContent = collapsible ? (
      <div ref={titleRef as RefObject<HTMLDivElement>} {...titleShared} data-collapsed={titleCollapsed || undefined}>
        {title}
      </div>
    ) : (
      <TruncateString maxLines={truncate?.title ?? 1} text={title} {...titleShared} />
    );
  }

  const descriptionShared = {
    className: styles.description,
    'data-size': size,
    'data-test-id': testIds.content,
    ...inlineColorProps,
  };

  const descriptionContent = collapsible ? (
    <div
      ref={descriptionRef as RefObject<HTMLDivElement>}
      {...descriptionShared}
      data-collapsed={titleCollapsed || undefined}
    >
      {content}
    </div>
  ) : (
    <div {...descriptionShared}>{content}</div>
  );

  const actionsContent = actions && (
    <>{renderFooterActionButtons({ actions, size, buttonVariant, invertFocusOutlineColor })}</>
  );

  const closeButton = onClose && showCloseButton && (
    <AlertButton
      data-test-id={testIds.closeButton}
      icon={<CrossSVG />}
      onClick={handleOnClose}
      size={size}
      variant={buttonVariant}
      invertFocusOutlineColor={invertFocusOutlineColor}
    />
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- раскрытие коллапса по клику (как MobileAlertTop)
    <div
      className={cn(styles.root, className)}
      {...extractSupportProps(rest)}
      data-outline={(variant === 'inline' && props.outline) || undefined}
      data-align={align}
      data-appearance={(isTop && appearance) || undefined}
      data-color={(!isTop && themeColor) || undefined}
      data-size={size}
      data-variant={variant}
      data-collapsible={(collapsible && canExpand) || undefined}
      onClick={(collapsible && canExpand && handleAlertClick) || undefined}
      role='alert'
    >
      <div className={cn(styles.body, { [styles.bodyInteractive]: collapsible && canExpand })} data-size={size}>
        {icon && (
          <div
            className={cn('sn-compact', styles.icon)}
            data-size={size}
            data-test-id={testIds.icon}
            {...inlineColorProps}
          >
            {getAlertAppearanceIcon(appearance)}
          </div>
        )}

        <div className={styles.contentLayout} data-size={size}>
          <div className={styles.textBlock} data-size={size}>
            <div className={styles.textLayout} data-expanded={dataExpandedAttr}>
              {titleContent}
              {descriptionContent}
            </div>
          </div>
        </div>

        <div className={styles.bodyActions} data-size={size}>
          {showExpandChevron && (
            <AlertButton
              data-test-id={testIds.expandingIcon}
              icon={isExpanded ? <ChevronUpSVG /> : <ChevronDownSVG />}
              size={size}
              variant={buttonVariant}
              invertFocusOutlineColor={invertFocusOutlineColor}
            />
          )}

          {!showExpandChevron && closeButton}

          {isHorizontal && actionsContent}
        </div>
      </div>

      {showFooter && (
        <div className={styles.footer} data-size={size}>
          {showExpandChevron && closeButton}
          {actionsContent}
        </div>
      )}
    </div>
  );
}
