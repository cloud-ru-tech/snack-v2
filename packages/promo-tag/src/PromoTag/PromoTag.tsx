import { Typography } from '@ds/typography';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, ReactElement } from 'react';

import { APPEARANCE, MAP_SIZE_TO_TYPOGRAPHY_SIZE, ROLE_APPEARANCE, SIZE } from '../constants';
import styles from './styles.module.scss';
import { PromoTagProps } from './types';
import { getSpreadProps } from './utils';

export function PromoTag<T extends ElementType = 'button'>({
  appearance = APPEARANCE.Primary,
  size = SIZE.S,
  roleAppearance = ROLE_APPEARANCE.Accent,
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
      data-role-appearance={roleAppearance}
      data-size={size}
      data-clickable={isInteractive || undefined}
      {...spreadProps}
    >
      {isInteractive && <span className={styles.stateLayer} aria-hidden data-state='emptyDarkOnAccent' />}
      {beforeContent}
      {Boolean(label) && (
        <span className={styles.labelWrapper}>
          <Typography as='span' variant='label' size={MAP_SIZE_TO_TYPOGRAPHY_SIZE[size]}>
            {label}
          </Typography>
        </span>
      )}
      {afterContent}
    </Component>
  );
}

withInnerRefSupport(PromoTag);
