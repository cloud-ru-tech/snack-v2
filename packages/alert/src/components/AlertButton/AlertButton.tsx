import { Sun } from '@ds/loader';
import { getThemeClassnames } from '@ds/utils';
import cn from 'classnames';
import { type ComponentPropsWithoutRef, type ElementType, type MouseEvent, type ReactElement } from 'react';

import { ICON_POSITION, VARIANT } from './constants';
import styles from './styles.module.scss';
import { type AlertButtonProps } from './types';
import { getVariant } from './utils';

const TARGET_BLANK = '_blank';

export function AlertButton<T extends ElementType = 'button'>({
  className,
  label,
  icon,
  iconPosition = ICON_POSITION.Before,
  variant: variantProp = VARIANT.OnColor,
  size = 'm',
  disabled = false,
  loading = false,
  as,
  innerRef,
  invertFocusOutlineColor,
  ...rest
}: AlertButtonProps<T>): ReactElement | null {
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

  const iconNode = loading ? <Sun /> : icon;

  return (
    <Component
      ref={innerRef}
      className={cn(styles.root, className, getThemeClassnames({ density: 'compact' }))}
      data-size={size}
      data-view={variantProp}
      data-variant={variant}
      data-disabled={isDisabled || undefined}
      data-loading={loading || undefined}
      data-invert-focus-outline-color={invertFocusOutlineColor || undefined}
      aria-disabled={Component === 'a' && isDisabled ? true : undefined}
      aria-busy={loading ?? undefined}
      {...spreadProps}
    >
      <span
        className={styles.stateLayer}
        aria-hidden
        data-state={variantProp === 'onColor' ? 'onColorFilled' : 'onAccentFilled'}
      />

      <span className={styles.content}>
        {variant === 'icon-only' ? (
          <>
            <span className={styles.icon} aria-hidden>
              {iconNode}
            </span>
          </>
        ) : (
          <>
            {icon && iconPosition === ICON_POSITION.Before && <span className={styles.icon}>{iconNode}</span>}
            {label && <span className={styles.label}>{variant === 'label-only' && loading ? <Sun /> : label}</span>}
            {icon && iconPosition === ICON_POSITION.After && <span className={styles.icon}>{iconNode}</span>}
          </>
        )}
      </span>
    </Component>
  );
}
