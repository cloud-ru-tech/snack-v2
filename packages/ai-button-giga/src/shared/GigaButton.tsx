import { AiIconGiga, VARIANT } from '@ds/ai-icon-giga';
import { Sun } from '@ds/loader';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, useCallback } from 'react';

import { APPEARANCE, ICON_POSITION, SIZE, TEST_IDS } from '../constants';
import { ICON_SIZES } from './constants';
import styles from './styles.module.scss';
import { GigaButtonProps } from './types';
import { getContentVariant } from './utils';

export function GigaButton({
  appearance = APPEARANCE.Primary,
  loading = false,
  disabled = false,
  label,
  icon,
  iconPosition = ICON_POSITION.Before,
  size,
  view,
  rootTestId,
  className,
  innerRef,
  onClick,
  type = 'button',
  'data-test-id': dataTestId = rootTestId,
  ...rest
}: GigaButtonProps) {
  const isDisabled = disabled && !loading;
  const hasLabel = Boolean(label);
  const hasIcon = view !== 'outline' || icon !== null;
  const contentVariant = getContentVariant(hasLabel, hasIcon, iconPosition);
  const labelOnlyLoading = loading && contentVariant === 'label-only';

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [loading, onClick],
  );

  const loader = <Sun size={size === SIZE.Xs ? 'xs' : 's'} className={styles.loader} data-test-id={TEST_IDS.loader} />;
  const resolvedIcon =
    icon === undefined ? (
      <AiIconGiga size={ICON_SIZES[size]} variant={VARIANT.LogoLight} data-test-id={TEST_IDS.logo} />
    ) : (
      icon
    );
  const iconElement = hasIcon && (
    <span className={styles.icon} data-test-id={TEST_IDS.icon} aria-hidden>
      {loading ? loader : resolvedIcon}
    </span>
  );

  return (
    <button
      {...rest}
      ref={innerRef}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || loading || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      className={cn(styles.root, className)}
      data-test-id={dataTestId}
      data-size={size}
      data-appearance={appearance}
      data-view={view}
      data-variant={contentVariant}
      data-disabled={isDisabled || undefined}
      data-loading={loading || undefined}
    >
      <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
      <span className={styles.content} data-test-id={TEST_IDS.content}>
        {iconPosition === ICON_POSITION.Before && iconElement}
        {hasLabel && (
          <span
            className={styles.label}
            data-text-opacity
            data-hidden={labelOnlyLoading || undefined}
            data-test-id={TEST_IDS.label}
          >
            {label}
          </span>
        )}
        {iconPosition === ICON_POSITION.After && iconElement}
      </span>
      {labelOnlyLoading && (
        <span className={styles.centeredLoader} aria-hidden>
          {loader}
        </span>
      )}
    </button>
  );
}

withInnerRefSupport(GigaButton);
