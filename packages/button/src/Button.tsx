import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './styles.module.scss';
import type { ButtonProps } from './types';
import { getVariant } from './utils';

/**
 * Button — повторяет слоистую структуру из Figma:
 * - Контейнер (position: relative)
 * - Слой 1: фон (position: absolute; inset: 0)
 * - Слой 2: state layer hover/pressed (position: absolute; inset: 0)
 * - Слой 3: контент (position: relative; z-index: 1)
 * Стили из @sbercloud/figma-variables.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      label,
      children,
      iconBefore,
      iconAfter,
      appearance = 'primary',
      size = 'm',
      view = 'elevated',
      disabled = false,
      loading = false,
      fullWidth = false,
      type = 'button',
      onClick,
      ...rest
    },
    ref,
  ) => {
    const variant = getVariant({ label, children, iconBefore, iconAfter });
    const resolvedLabel = label ?? (typeof children === 'string' ? children : undefined);
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.root, className)}
        data-size={size}
        data-appearance={appearance}
        data-view={view}
        data-variant={variant}
        data-disabled={disabled || undefined}
        data-loading={loading || undefined}
        data-full-width={fullWidth || undefined}
        disabled={isDisabled}
        aria-disabled={disabled ?? undefined}
        aria-busy={loading ?? undefined}
        onClick={isDisabled ? undefined : onClick}
        {...rest}
      >
        {/* Слой 1: фон — absolute, заполняет контейнер */}
        <span className={styles.layerBackground} aria-hidden />
        {/* Слой 1b: бордер (только для outline) */}
        {view === 'outline' && <span className={styles.layerBorder} aria-hidden />}
        {/* Слой 2: state layer (hover/pressed) — токены material-stateLayer */}
        <span className={styles.layerState} aria-hidden />
        {/* Слой 3: контент */}
        {!loading && (
          <span className={styles.content}>
            {variant === 'icon-only' ? (
              (iconBefore ?? iconAfter) != null && (
                <span className={styles.icon} aria-hidden>
                  {iconBefore ?? iconAfter}
                </span>
              )
            ) : (
              <>
                {iconBefore != null && (
                  <span className={styles.icon} aria-hidden>
                    {iconBefore}
                  </span>
                )}
                {(resolvedLabel != null || children != null) && (
                  <span className={styles.label}>{resolvedLabel != null ? resolvedLabel : children}</span>
                )}
                {iconAfter != null && (
                  <span className={styles.icon} aria-hidden>
                    {iconAfter}
                  </span>
                )}
              </>
            )}
          </span>
        )}
        {loading && (
          <span className={styles.loadingSpinner} aria-hidden aria-label=''>
            {/* <Sun /> */}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
