import { Typography } from '@ds/typography';
import cn from 'classnames';
import { ElementType, ReactElement } from 'react';

import { APPEARANCE, MAP_SIZE_TO_TYPOGRAPHY_SIZE, ROLE_APPEARANCE, SIZE } from '../constants';
import styles from './styles.module.scss';
import { PromoTagProps } from './types';
import { getSpreadProps } from './utils';

export function PromoTag<T extends ElementType = 'button'>({
  appearance = APPEARANCE.Primary,
  size = SIZE.S,
  role = ROLE_APPEARANCE.Accent,
  className,
  label,
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
      data-role={role}
      data-size={size}
      data-clickable={isInteractive || undefined}
      {...spreadProps}
    >
      {isInteractive && <span className={styles.stateLayer} aria-hidden data-state='regularFilled' />}
      {beforeContent}
      {Boolean(label) && (
        <Typography className={styles.labelWrapper} as='div' variant='label' size={MAP_SIZE_TO_TYPOGRAPHY_SIZE[size]}>
          {label}
        </Typography>
      )}
      {afterContent}
    </Component>
  );
}
