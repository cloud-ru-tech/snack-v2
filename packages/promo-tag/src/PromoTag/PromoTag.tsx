import { TruncateString } from '@ds/truncate-string';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, ReactElement } from 'react';

import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '../constants';
import styles from './styles.module.scss';
import { PromoTagProps } from './types';
import { getSpreadProps } from './utils';

export function PromoTag<T extends ElementType = 'button'>({
  appearance = APPEARANCE.Primary,
  size = SIZE.S,
  roleAppearance = ROLE_APPEARANCE.Accent,
  className,
  label,
  truncate,
  beforeContent = null,
  afterContent = null,
  onClick,
  as,
  innerRef,
  ...rest
}: PromoTagProps<T>): ReactElement | null {
  const isInteractive = Boolean(onClick) || Boolean(as);
  const Component: ElementType = isInteractive ? (as ?? 'button') : 'div';

  const spreadProps = isInteractive
    ? getSpreadProps({ Component, rest: rest as Record<string, unknown>, onClick })
    : rest;

  return (
    <Component
      ref={innerRef}
      className={cn(styles.container, className)}
      data-appearance={appearance}
      data-role-appearance={roleAppearance}
      data-truncate={truncate ? true : undefined}
      data-size={size}
      data-clickable={isInteractive || undefined}
      {...spreadProps}
    >
      {isInteractive && <span className={styles.stateLayer} aria-hidden data-state='emptyDarkOnAccent' />}
      {beforeContent && <span className={styles.element}>{beforeContent}</span>}
      {label && (
        <span className={styles.labelWrapper}>
          {truncate ? (
            <TruncateString
              variant={truncate.variant}
              text={label}
              placement={truncate.tooltipPlacement}
              hideTooltip={isInteractive}
            />
          ) : (
            label
          )}
        </span>
      )}
      {afterContent && <span className={styles.element}>{afterContent}</span>}
    </Component>
  );
}

withInnerRefSupport(PromoTag);
