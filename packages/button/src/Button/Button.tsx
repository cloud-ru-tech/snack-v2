import { Counter } from '@ds/counter';
import { Sun } from '@ds/loader';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType, MouseEvent, ReactElement } from 'react';

import { ICON_POSITION } from './constants';
import styles from './styles.module.scss';
import { ButtonProps } from './types';
import { getVariant } from './utils';

const TARGET_BLANK = '_blank';

export function Button<T extends ElementType = 'button'>({
  className,
  label,
  icon,
  iconPosition = ICON_POSITION.Before,
  appearance = 'primary',
  size = 'm',
  view = 'filled',
  disabled = false,
  loading = false,
  fullWidth = false,
  minWidth = true,
  counter,
  as,
  innerRef,
  ...rest
}: ButtonProps<T>): ReactElement | null {
  const Component: ElementType = as ?? 'button';
  const variant = getVariant({ label, icon, iconPosition });
  const isDisabled = disabled && !loading;

  let spreadProps: Record<string, unknown>;
  if (Component === 'a') {
    const { href, target, download, onClick, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'>;
    spreadProps = {
      ...anchorRest,
      href: href ?? '#',
      target,
      download,
      rel: target === TARGET_BLANK ? 'noopener noreferrer' : undefined,
      onClick: isDisabled
        ? (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onClick?.(e);
          }
        : onClick,
    };
  } else if (Component === 'button') {
    const { type = 'button', onClick, ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>;
    spreadProps = {
      type,
      disabled: isDisabled,
      onClick: isDisabled ? undefined : onClick,
      ...buttonRest,
    };
  } else {
    spreadProps = rest as Record<string, unknown>;
  }
  // Бейджем счётчик становится там же, где в макете: у iconAfter и у iconOnly.
  // У icon-only лейбла нет, поэтому iconPosition ни на что не влияет и требовать его нельзя.
  const showCounterAsBadge =
    Boolean(counter) && Boolean(icon) && (variant === 'icon-only' || iconPosition === ICON_POSITION.After);

  // appearance кнопки 'critical' соответствует appearance счётчика 'red'
  // (Counter переименовал critical → red); остальные значения совпадают.
  const mappedCounterAppearance = appearance === 'critical' ? 'red' : appearance;
  const counterAppearance = disabled ? 'neutral' : mappedCounterAppearance;

  const counterNode = counter && !loading && (
    <span className={styles.counterSlot} data-absolute={showCounterAsBadge || undefined} aria-hidden>
      {/* Явный counter.appearance имеет приоритет; иначе наследуется от appearance кнопки. */}
      <Counter {...counter} size='xs' appearance={counter.appearance ?? counterAppearance} />
    </span>
  );

  const iconNode = loading ? <Sun /> : icon;

  return (
    <Component
      ref={innerRef}
      className={cn(styles.root, className)}
      data-size={size}
      data-appearance={appearance}
      data-view={view}
      data-variant={variant}
      data-disabled={isDisabled || undefined}
      data-loading={loading || undefined}
      data-full-width={fullWidth || undefined}
      data-min-width={minWidth || undefined}
      data-counter={counter != null || undefined}
      aria-disabled={Component === 'a' && isDisabled ? true : undefined}
      aria-busy={loading ?? undefined}
      {...spreadProps}
    >
      {view === 'outline' && <span data-border-layer aria-hidden />}
      {view !== 'function' && <span className={styles.stateLayer} aria-hidden data-state='regularFilled' />}

      <span className={styles.content}>
        {variant === 'icon-only' ? (
          <span className={styles.iconWithCounter} aria-hidden>
            <span className={styles.icon} data-text-opacity>
              {iconNode}
            </span>
            {counterNode}
          </span>
        ) : (
          <>
            {icon && iconPosition === ICON_POSITION.Before && (
              <span className={styles.icon} aria-hidden data-text-opacity>
                {iconNode}
              </span>
            )}

            {label && (
              <span className={styles.label} data-text-opacity>
                {variant === 'label-only' && loading ? <Sun /> : label}
              </span>
            )}

            {!showCounterAsBadge && counterNode}

            {icon && iconPosition === ICON_POSITION.After && (
              <span className={styles.iconWithCounter} aria-hidden>
                <span className={styles.icon} data-text-opacity>
                  {iconNode}
                </span>
                {counterNode}
              </span>
            )}
          </>
        )}
      </span>
    </Component>
  );
}

withInnerRefSupport(Button);
